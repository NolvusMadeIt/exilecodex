var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
      reject.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const proxyMarker = Symbol("Comlink.proxy");
const createEndpoint = Symbol("Comlink.endpoint");
const releaseProxy = Symbol("Comlink.releaseProxy");
const finalizer = Symbol("Comlink.finalizer");
const throwMarker = Symbol("Comlink.thrown");
const isObject = (val) => typeof val === "object" && val !== null || typeof val === "function";
const proxyTransferHandler = {
  canHandle: (val) => isObject(val) && val[proxyMarker],
  serialize(obj) {
    const { port1, port2 } = new MessageChannel();
    expose(obj, port1);
    return [port2, [port2]];
  },
  deserialize(port) {
    port.start();
    return wrap(port);
  }
};
const throwTransferHandler = {
  canHandle: (value) => isObject(value) && throwMarker in value,
  serialize({ value }) {
    let serialized;
    if (value instanceof Error) {
      serialized = {
        isError: true,
        value: {
          message: value.message,
          name: value.name,
          stack: value.stack
        }
      };
    } else {
      serialized = { isError: false, value };
    }
    return [serialized, []];
  },
  deserialize(serialized) {
    if (serialized.isError) {
      throw Object.assign(new Error(serialized.value.message), serialized.value);
    }
    throw serialized.value;
  }
};
const transferHandlers = /* @__PURE__ */ new Map([
  ["proxy", proxyTransferHandler],
  ["throw", throwTransferHandler]
]);
function isAllowedOrigin(allowedOrigins, origin) {
  for (const allowedOrigin of allowedOrigins) {
    if (origin === allowedOrigin || allowedOrigin === "*") {
      return true;
    }
    if (allowedOrigin instanceof RegExp && allowedOrigin.test(origin)) {
      return true;
    }
  }
  return false;
}
function expose(obj, ep = globalThis, allowedOrigins = ["*"]) {
  ep.addEventListener("message", function callback(ev) {
    if (!ev || !ev.data) {
      return;
    }
    if (!isAllowedOrigin(allowedOrigins, ev.origin)) {
      console.warn(`Invalid origin '${ev.origin}' for comlink proxy`);
      return;
    }
    const { id, type, path } = Object.assign({ path: [] }, ev.data);
    const argumentList = (ev.data.argumentList || []).map(fromWireValue);
    let returnValue;
    try {
      const parent = path.slice(0, -1).reduce((obj2, prop) => obj2[prop], obj);
      const rawValue = path.reduce((obj2, prop) => obj2[prop], obj);
      switch (type) {
        case "GET":
          {
            returnValue = rawValue;
          }
          break;
        case "SET":
          {
            parent[path.slice(-1)[0]] = fromWireValue(ev.data.value);
            returnValue = true;
          }
          break;
        case "APPLY":
          {
            returnValue = rawValue.apply(parent, argumentList);
          }
          break;
        case "CONSTRUCT":
          {
            const value = new rawValue(...argumentList);
            returnValue = proxy(value);
          }
          break;
        case "ENDPOINT":
          {
            const { port1, port2 } = new MessageChannel();
            expose(obj, port2);
            returnValue = transfer(port1, [port1]);
          }
          break;
        case "RELEASE":
          {
            returnValue = void 0;
          }
          break;
        default:
          return;
      }
    } catch (value) {
      returnValue = { value, [throwMarker]: 0 };
    }
    Promise.resolve(returnValue).catch((value) => {
      return { value, [throwMarker]: 0 };
    }).then((returnValue2) => {
      const [wireValue, transferables] = toWireValue(returnValue2);
      ep.postMessage(Object.assign(Object.assign({}, wireValue), { id }), transferables);
      if (type === "RELEASE") {
        ep.removeEventListener("message", callback);
        closeEndPoint(ep);
        if (finalizer in obj && typeof obj[finalizer] === "function") {
          obj[finalizer]();
        }
      }
    }).catch((error) => {
      const [wireValue, transferables] = toWireValue({
        value: new TypeError("Unserializable return value"),
        [throwMarker]: 0
      });
      ep.postMessage(Object.assign(Object.assign({}, wireValue), { id }), transferables);
    });
  });
  if (ep.start) {
    ep.start();
  }
}
function isMessagePort(endpoint) {
  return endpoint.constructor.name === "MessagePort";
}
function closeEndPoint(endpoint) {
  if (isMessagePort(endpoint))
    endpoint.close();
}
function wrap(ep, target) {
  const pendingListeners = /* @__PURE__ */ new Map();
  ep.addEventListener("message", function handleMessage(ev) {
    const { data } = ev;
    if (!data || !data.id) {
      return;
    }
    const resolver = pendingListeners.get(data.id);
    if (!resolver) {
      return;
    }
    try {
      resolver(data);
    } finally {
      pendingListeners.delete(data.id);
    }
  });
  return createProxy(ep, pendingListeners, [], target);
}
function throwIfProxyReleased(isReleased) {
  if (isReleased) {
    throw new Error("Proxy has been released and is not useable");
  }
}
function releaseEndpoint(ep) {
  return requestResponseMessage(ep, /* @__PURE__ */ new Map(), {
    type: "RELEASE"
  }).then(() => {
    closeEndPoint(ep);
  });
}
const proxyCounter = /* @__PURE__ */ new WeakMap();
const proxyFinalizers = "FinalizationRegistry" in globalThis && new FinalizationRegistry((ep) => {
  const newCount = (proxyCounter.get(ep) || 0) - 1;
  proxyCounter.set(ep, newCount);
  if (newCount === 0) {
    releaseEndpoint(ep);
  }
});
function registerProxy(proxy2, ep) {
  const newCount = (proxyCounter.get(ep) || 0) + 1;
  proxyCounter.set(ep, newCount);
  if (proxyFinalizers) {
    proxyFinalizers.register(proxy2, ep, proxy2);
  }
}
function unregisterProxy(proxy2) {
  if (proxyFinalizers) {
    proxyFinalizers.unregister(proxy2);
  }
}
function createProxy(ep, pendingListeners, path = [], target = function() {
}) {
  let isProxyReleased = false;
  const proxy2 = new Proxy(target, {
    get(_target, prop) {
      throwIfProxyReleased(isProxyReleased);
      if (prop === releaseProxy) {
        return () => {
          unregisterProxy(proxy2);
          releaseEndpoint(ep);
          pendingListeners.clear();
          isProxyReleased = true;
        };
      }
      if (prop === "then") {
        if (path.length === 0) {
          return { then: () => proxy2 };
        }
        const r = requestResponseMessage(ep, pendingListeners, {
          type: "GET",
          path: path.map((p) => p.toString())
        }).then(fromWireValue);
        return r.then.bind(r);
      }
      return createProxy(ep, pendingListeners, [...path, prop]);
    },
    set(_target, prop, rawValue) {
      throwIfProxyReleased(isProxyReleased);
      const [value, transferables] = toWireValue(rawValue);
      return requestResponseMessage(ep, pendingListeners, {
        type: "SET",
        path: [...path, prop].map((p) => p.toString()),
        value
      }, transferables).then(fromWireValue);
    },
    apply(_target, _thisArg, rawArgumentList) {
      throwIfProxyReleased(isProxyReleased);
      const last = path[path.length - 1];
      if (last === createEndpoint) {
        return requestResponseMessage(ep, pendingListeners, {
          type: "ENDPOINT"
        }).then(fromWireValue);
      }
      if (last === "bind") {
        return createProxy(ep, pendingListeners, path.slice(0, -1));
      }
      const [argumentList, transferables] = processArguments(rawArgumentList);
      return requestResponseMessage(ep, pendingListeners, {
        type: "APPLY",
        path: path.map((p) => p.toString()),
        argumentList
      }, transferables).then(fromWireValue);
    },
    construct(_target, rawArgumentList) {
      throwIfProxyReleased(isProxyReleased);
      const [argumentList, transferables] = processArguments(rawArgumentList);
      return requestResponseMessage(ep, pendingListeners, {
        type: "CONSTRUCT",
        path: path.map((p) => p.toString()),
        argumentList
      }, transferables).then(fromWireValue);
    }
  });
  registerProxy(proxy2, ep);
  return proxy2;
}
function myFlat(arr) {
  return Array.prototype.concat.apply([], arr);
}
function processArguments(argumentList) {
  const processed = argumentList.map(toWireValue);
  return [processed.map((v) => v[0]), myFlat(processed.map((v) => v[1]))];
}
const transferCache = /* @__PURE__ */ new WeakMap();
function transfer(obj, transfers) {
  transferCache.set(obj, transfers);
  return obj;
}
function proxy(obj) {
  return Object.assign(obj, { [proxyMarker]: true });
}
function toWireValue(value) {
  for (const [name, handler] of transferHandlers) {
    if (handler.canHandle(value)) {
      const [serializedValue, transferables] = handler.serialize(value);
      return [
        {
          type: "HANDLER",
          name,
          value: serializedValue
        },
        transferables
      ];
    }
  }
  return [
    {
      type: "RAW",
      value
    },
    transferCache.get(value) || []
  ];
}
function fromWireValue(value) {
  switch (value.type) {
    case "HANDLER":
      return transferHandlers.get(value.name).deserialize(value.value);
    case "RAW":
      return value.value;
  }
}
function requestResponseMessage(ep, pendingListeners, msg, transfers) {
  return new Promise((resolve) => {
    const id = generateUUID();
    pendingListeners.set(id, resolve);
    if (ep.start) {
      ep.start();
    }
    ep.postMessage(Object.assign({ id }, msg), transfers);
  });
}
function generateUUID() {
  return new Array(4).fill(0).map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)).join("-");
}
/**
 * @author Ray Martone
 * @copyright Copyright (c) 2019-2022 Ray Martone
 * @license MIT
 * @description log adapter that provides level based filtering and tagging
 */
var Level = /* @__PURE__ */ ((Level2) => {
  Level2[Level2["DEBUG"] = 1] = "DEBUG";
  Level2[Level2["TRACE"] = 2] = "TRACE";
  Level2[Level2["INFO"] = 3] = "INFO";
  Level2[Level2["WARN"] = 4] = "WARN";
  Level2[Level2["ERROR"] = 5] = "ERROR";
  Level2[Level2["OFF"] = 6] = "OFF";
  return Level2;
})(Level || {});
const tag = {};
class Log {
  constructor() {
    /**
     * init assigns tags a level or they default to INFO
     * _tagToLevel hash that maps tags to their level
     */
    __publicField(this, "_tagToLevel", {});
    /**
     * callback that supports logging whatever way works best for you!
     */
    __publicField(this, "_callback");
  }
  /**
   * init
   * @param config? JSON that assigns tags levels. If uninitialized,
   *    a tag's level defaults to INFO where ERROR > WARN > INFO.
   * @param callback? supports logging whatever way works best for you
   *  - style terminal output with chalk
   *  - send JSON to a cloud logging service like Splunk
   *  - log strings and objects to the browser console
   *  - combine any of the above based on your app's env
   * @return {this} supports chaining
   */
  init(config, callback) {
    for (const k in config) {
      this._tagToLevel[k] = Level[config[k]] || 1;
    }
    if (callback !== void 0) {
      this._callback = callback;
    }
    for (const key in this._tagToLevel) {
      tag[key] = key;
    }
    return this;
  }
  /**
   * Writes an error to the log
   * @param tag string categorizes a message
   * @param message object to log
   * @param optionalParams optional list of objects to log
   */
  error(tag2, message, ...optionalParams) {
    this.log(5, tag2, message, optionalParams);
  }
  /**
   * Writes a warning to the log
   * @param tag string categorizes a message
   * @param message object to log
   * @param optionalParams optional list of objects to log
   */
  warn(tag2, message, ...optionalParams) {
    this.log(4, tag2, message, optionalParams);
  }
  /**
   * Writes info to the log
   * @param tag string categorizes a message
   * @param message object to log
   * @param optionalParams optional list of objects to log
   */
  info(tag2, message, ...optionalParams) {
    this.log(3, tag2, message, optionalParams);
  }
  /**
   * Writes trace to the log
   * @param tag string categorizes a message
   * @param message object to log
   * @param optionalParams optional list of objects to log
   */
  trace(tag2, message, ...optionalParams) {
    this.log(2, tag2, message, optionalParams);
  }
  /**
   * Writes debug to the log
   * @param tag string categorizes a message
   * @param message object to log
   * @param optionalParams optional list of objects to log
   */
  debug(tag2, message, ...optionalParams) {
    this.log(1, tag2, message, optionalParams);
  }
  log(level, tag2, message, optionalParams) {
    if (this._callback && level >= (this._tagToLevel[tag2] ?? 1)) {
      this._callback(Level[level], tag2, message, optionalParams);
    }
  }
}
const logger = {
  [
    "ERROR"
    /* ERROR */
  ]: (tag2, msg, params) => console.error(`%c${tag2}%c`, "background:red;border-radius:5px;padding:0 4px;", "", msg, ...params),
  [
    "WARN"
    /* WARN */
  ]: (tag2, msg, params) => console.warn(`%c${tag2}%c`, "color:black;background:yellow;border-radius:5px;padding:0 4px;", "", msg, ...params),
  [
    "INFO"
    /* INFO */
  ]: (tag2, msg, params) => console.info(`%c${tag2}%c`, "background:green;border-radius:5px;padding:0 4px;", "", msg, ...params),
  [
    "DEBUG"
    /* DEBUG */
  ]: (tag2, msg, params) => console.debug(`%c${tag2}%c`, "color:black;background:grey;border-radius:5px;padding:0 4px;", "", msg, ...params),
  [
    "TRACE"
    /* TRACE */
  ]: (tag2, msg, params) => console.trace(`%c${tag2}%c`, "color:black;background:cyan;border-radius:5px;padding:0 4px;", "", msg, ...params)
};
const log = new Log().init(
  {
    kvfs: "INFO",
    subscript: "INFO",
    backend: "DEBUG",
    texture: "DEBUG"
  },
  (level, tag2, msg, params) => {
    logger[level](tag2, msg, params);
  }
);
class SubScriptWorker {
  constructor() {
    __publicField(this, "onFinished", () => {
    });
    __publicField(this, "onError", () => {
    });
    __publicField(this, "onFetch", async () => ({ body: void 0, headers: {}, status: void 0, error: void 0 }));
  }
  async start(script, data, onFinished, onError, onFetch) {
    const build = "release";
    this.onFinished = onFinished;
    this.onError = onError;
    this.onFetch = onFetch;
    log.debug(tag.subscript, "start", { script });
    const driver = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../../dist/release/driver.mjs": () => import("./driver-ftvsJzzb.js") }), `../../dist/${build}/driver.mjs`, 5);
    const module = await driver.default({
      print: console.log,
      // TODO: log.info
      printErr: console.warn
      // TODO: log.info
    });
    module.bridge = this.resolveExports(module);
    const imports = this.resolveImports(module);
    const wasmData = module._malloc(data.length);
    module.HEAPU8.set(data, wasmData);
    try {
      const ret = await imports.subStart(script, "", "", data.length, wasmData);
      log.info(tag.subscript, `finished: ret=${ret}`);
    } finally {
      module._free(wasmData);
    }
  }
  resolveImports(module) {
    return {
      subStart: module.cwrap("sub_start", "number", ["string", "string", "string", "number", "number"], {
        async: true
      })
    };
  }
  resolveExports(module) {
    return {
      onSubScriptError: (message) => {
        log.error(tag.subscript, "onSubScriptError", { message });
        this.onError(message);
      },
      onSubScriptFinished: (data, size) => {
        const result = module.HEAPU8.slice(data, data + size);
        log.debug(tag.subscript, "onSubScriptFinished", { result });
        this.onFinished(result);
      },
      fetch: async (url, header, body) => {
        if (header == null ? void 0 : header.includes("POESESSID")) {
          return JSON.stringify({ error: "POESESSID is not allowed to be sent to the server" });
        }
        try {
          log.debug(tag.subscript, "fetch request", { url, header, body });
          const headers = header ? header.split("\n").map((_) => _.split(":")).filter((_) => _.length === 2).reduce((acc, [k, v]) => Object.assign(acc, { [k.trim()]: v.trim() }), {}) : {};
          if (!headers["Content-Type"]) {
            headers["Content-Type"] = "application/x-www-form-urlencoded";
          }
          const r = await this.onFetch(url, headers, body);
          log.debug(tag.subscript, "fetch", r.body, r.status, r.error);
          const headerText = Object.entries((r == null ? void 0 : r.headers) ?? {}).map(([k, v]) => `${k}: ${v}`).join("\n");
          return JSON.stringify({
            body: r == null ? void 0 : r.body,
            status: r == null ? void 0 : r.status,
            header: headerText,
            error: r == null ? void 0 : r.error
          });
        } catch (e) {
          log.error(tag.subscript, "fetch error", { error: e });
          return JSON.stringify({ error: e.message });
        }
      }
    };
  }
}
const worker = new SubScriptWorker();
expose(worker);
//# sourceMappingURL=sub-CnsX6MZA.js.map
