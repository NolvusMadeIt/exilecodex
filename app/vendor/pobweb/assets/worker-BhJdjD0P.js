var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __publicField = (obj, key2, value) => __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
var _a2, _b2;
var fs = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get BigIntStatsFs() {
    return BigIntStatsFs;
  },
  get Dir() {
    return Dir;
  },
  get Dirent() {
    return Dirent;
  },
  get ReadStream() {
    return ReadStream;
  },
  get Stats() {
    return Stats;
  },
  get StatsFs() {
    return StatsFs;
  },
  get WriteStream() {
    return WriteStream;
  },
  get access() {
    return access;
  },
  get accessSync() {
    return accessSync;
  },
  get appendFile() {
    return appendFile;
  },
  get appendFileSync() {
    return appendFileSync;
  },
  get chmod() {
    return chmod;
  },
  get chmodSync() {
    return chmodSync;
  },
  get chown() {
    return chown;
  },
  get chownSync() {
    return chownSync;
  },
  get chroot() {
    return chroot;
  },
  get close() {
    return close;
  },
  get closeSync() {
    return closeSync;
  },
  get constants() {
    return constants;
  },
  get copyFile() {
    return copyFile;
  },
  get copyFileSync() {
    return copyFileSync;
  },
  get cp() {
    return cp;
  },
  get cpSync() {
    return cpSync;
  },
  get createReadStream() {
    return createReadStream;
  },
  get createWriteStream() {
    return createWriteStream;
  },
  get exists() {
    return exists;
  },
  get existsSync() {
    return existsSync;
  },
  get fchmod() {
    return fchmod;
  },
  get fchmodSync() {
    return fchmodSync;
  },
  get fchown() {
    return fchown;
  },
  get fchownSync() {
    return fchownSync;
  },
  get fdatasync() {
    return fdatasync;
  },
  get fdatasyncSync() {
    return fdatasyncSync;
  },
  get fstat() {
    return fstat;
  },
  get fstatSync() {
    return fstatSync;
  },
  get fsync() {
    return fsync;
  },
  get fsyncSync() {
    return fsyncSync;
  },
  get ftruncate() {
    return ftruncate;
  },
  get ftruncateSync() {
    return ftruncateSync;
  },
  get futimes() {
    return futimes;
  },
  get futimesSync() {
    return futimesSync;
  },
  get glob() {
    return glob;
  },
  get globSync() {
    return globSync;
  },
  get lchmod() {
    return lchmod;
  },
  get lchmodSync() {
    return lchmodSync;
  },
  get lchown() {
    return lchown;
  },
  get lchownSync() {
    return lchownSync;
  },
  get link() {
    return link;
  },
  get linkSync() {
    return linkSync;
  },
  get lopenSync() {
    return lopenSync;
  },
  get lstat() {
    return lstat;
  },
  get lstatSync() {
    return lstatSync;
  },
  get lutimes() {
    return lutimes;
  },
  get lutimesSync() {
    return lutimesSync;
  },
  get mkdir() {
    return mkdir;
  },
  get mkdirSync() {
    return mkdirSync;
  },
  get mkdtemp() {
    return mkdtemp;
  },
  get mkdtempSync() {
    return mkdtempSync;
  },
  get mount() {
    return mount$1;
  },
  get mountObject() {
    return mountObject;
  },
  get mounts() {
    return mounts;
  },
  get open() {
    return open;
  },
  get openAsBlob() {
    return openAsBlob;
  },
  get openSync() {
    return openSync;
  },
  get opendir() {
    return opendir;
  },
  get opendirSync() {
    return opendirSync;
  },
  get promises() {
    return promises;
  },
  get read() {
    return read;
  },
  get readFile() {
    return readFile;
  },
  get readFileSync() {
    return readFileSync;
  },
  get readSync() {
    return readSync;
  },
  get readdir() {
    return readdir;
  },
  get readdirSync() {
    return readdirSync;
  },
  get readlink() {
    return readlink;
  },
  get readlinkSync() {
    return readlinkSync;
  },
  get readv() {
    return readv;
  },
  get readvSync() {
    return readvSync;
  },
  get realpath() {
    return realpath;
  },
  get realpathSync() {
    return realpathSync;
  },
  get rename() {
    return rename;
  },
  get renameSync() {
    return renameSync;
  },
  get rm() {
    return rm;
  },
  get rmSync() {
    return rmSync;
  },
  get rmdir() {
    return rmdir;
  },
  get rmdirSync() {
    return rmdirSync;
  },
  get stat() {
    return stat;
  },
  get statSync() {
    return statSync;
  },
  get statfs() {
    return statfs;
  },
  get statfsSync() {
    return statfsSync;
  },
  get symlink() {
    return symlink;
  },
  get symlinkSync() {
    return symlinkSync;
  },
  get truncate() {
    return truncate;
  },
  get truncateSync() {
    return truncateSync;
  },
  get umount() {
    return umount;
  },
  get unlink() {
    return unlink;
  },
  get unlinkSync() {
    return unlinkSync;
  },
  get unwatchFile() {
    return unwatchFile;
  },
  get utimes() {
    return utimes;
  },
  get utimesSync() {
    return utimesSync;
  },
  get watch() {
    return watch;
  },
  get watchFile() {
    return watchFile;
  },
  get write() {
    return write;
  },
  get writeFile() {
    return writeFile;
  },
  get writeFileSync() {
    return writeFileSync;
  },
  get writeSync() {
    return writeSync;
  },
  get writev() {
    return writev;
  },
  get writevSync() {
    return writevSync;
  }
});
var __variableDynamicImportRuntimeHelper = (glob2, path, segs) => {
  const v = glob2[path];
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
var Errno;
(function(Errno2) {
  Errno2[Errno2["EPERM"] = 1] = "EPERM";
  Errno2[Errno2["ENOENT"] = 2] = "ENOENT";
  Errno2[Errno2["EINTR"] = 4] = "EINTR";
  Errno2[Errno2["EIO"] = 5] = "EIO";
  Errno2[Errno2["ENXIO"] = 6] = "ENXIO";
  Errno2[Errno2["EBADF"] = 9] = "EBADF";
  Errno2[Errno2["EAGAIN"] = 11] = "EAGAIN";
  Errno2[Errno2["ENOMEM"] = 12] = "ENOMEM";
  Errno2[Errno2["EACCES"] = 13] = "EACCES";
  Errno2[Errno2["EFAULT"] = 14] = "EFAULT";
  Errno2[Errno2["ENOTBLK"] = 15] = "ENOTBLK";
  Errno2[Errno2["EBUSY"] = 16] = "EBUSY";
  Errno2[Errno2["EEXIST"] = 17] = "EEXIST";
  Errno2[Errno2["EXDEV"] = 18] = "EXDEV";
  Errno2[Errno2["ENODEV"] = 19] = "ENODEV";
  Errno2[Errno2["ENOTDIR"] = 20] = "ENOTDIR";
  Errno2[Errno2["EISDIR"] = 21] = "EISDIR";
  Errno2[Errno2["EINVAL"] = 22] = "EINVAL";
  Errno2[Errno2["ENFILE"] = 23] = "ENFILE";
  Errno2[Errno2["EMFILE"] = 24] = "EMFILE";
  Errno2[Errno2["ETXTBSY"] = 26] = "ETXTBSY";
  Errno2[Errno2["EFBIG"] = 27] = "EFBIG";
  Errno2[Errno2["ENOSPC"] = 28] = "ENOSPC";
  Errno2[Errno2["ESPIPE"] = 29] = "ESPIPE";
  Errno2[Errno2["EROFS"] = 30] = "EROFS";
  Errno2[Errno2["EMLINK"] = 31] = "EMLINK";
  Errno2[Errno2["EPIPE"] = 32] = "EPIPE";
  Errno2[Errno2["EDOM"] = 33] = "EDOM";
  Errno2[Errno2["ERANGE"] = 34] = "ERANGE";
  Errno2[Errno2["EDEADLK"] = 35] = "EDEADLK";
  Errno2[Errno2["ENAMETOOLONG"] = 36] = "ENAMETOOLONG";
  Errno2[Errno2["ENOLCK"] = 37] = "ENOLCK";
  Errno2[Errno2["ENOSYS"] = 38] = "ENOSYS";
  Errno2[Errno2["ENOTEMPTY"] = 39] = "ENOTEMPTY";
  Errno2[Errno2["ELOOP"] = 40] = "ELOOP";
  Errno2[Errno2["ENOMSG"] = 42] = "ENOMSG";
  Errno2[Errno2["EBADE"] = 52] = "EBADE";
  Errno2[Errno2["EBADR"] = 53] = "EBADR";
  Errno2[Errno2["EXFULL"] = 54] = "EXFULL";
  Errno2[Errno2["ENOANO"] = 55] = "ENOANO";
  Errno2[Errno2["EBADRQC"] = 56] = "EBADRQC";
  Errno2[Errno2["ENOSTR"] = 60] = "ENOSTR";
  Errno2[Errno2["ENODATA"] = 61] = "ENODATA";
  Errno2[Errno2["ETIME"] = 62] = "ETIME";
  Errno2[Errno2["ENOSR"] = 63] = "ENOSR";
  Errno2[Errno2["ENONET"] = 64] = "ENONET";
  Errno2[Errno2["EREMOTE"] = 66] = "EREMOTE";
  Errno2[Errno2["ENOLINK"] = 67] = "ENOLINK";
  Errno2[Errno2["ECOMM"] = 70] = "ECOMM";
  Errno2[Errno2["EPROTO"] = 71] = "EPROTO";
  Errno2[Errno2["EBADMSG"] = 74] = "EBADMSG";
  Errno2[Errno2["EOVERFLOW"] = 75] = "EOVERFLOW";
  Errno2[Errno2["EBADFD"] = 77] = "EBADFD";
  Errno2[Errno2["ESTRPIPE"] = 86] = "ESTRPIPE";
  Errno2[Errno2["ENOTSOCK"] = 88] = "ENOTSOCK";
  Errno2[Errno2["EDESTADDRREQ"] = 89] = "EDESTADDRREQ";
  Errno2[Errno2["EMSGSIZE"] = 90] = "EMSGSIZE";
  Errno2[Errno2["EPROTOTYPE"] = 91] = "EPROTOTYPE";
  Errno2[Errno2["ENOPROTOOPT"] = 92] = "ENOPROTOOPT";
  Errno2[Errno2["EPROTONOSUPPORT"] = 93] = "EPROTONOSUPPORT";
  Errno2[Errno2["ESOCKTNOSUPPORT"] = 94] = "ESOCKTNOSUPPORT";
  Errno2[Errno2["ENOTSUP"] = 95] = "ENOTSUP";
  Errno2[Errno2["ENETDOWN"] = 100] = "ENETDOWN";
  Errno2[Errno2["ENETUNREACH"] = 101] = "ENETUNREACH";
  Errno2[Errno2["ENETRESET"] = 102] = "ENETRESET";
  Errno2[Errno2["ETIMEDOUT"] = 110] = "ETIMEDOUT";
  Errno2[Errno2["ECONNREFUSED"] = 111] = "ECONNREFUSED";
  Errno2[Errno2["EHOSTDOWN"] = 112] = "EHOSTDOWN";
  Errno2[Errno2["EHOSTUNREACH"] = 113] = "EHOSTUNREACH";
  Errno2[Errno2["EALREADY"] = 114] = "EALREADY";
  Errno2[Errno2["EINPROGRESS"] = 115] = "EINPROGRESS";
  Errno2[Errno2["ESTALE"] = 116] = "ESTALE";
  Errno2[Errno2["EREMOTEIO"] = 121] = "EREMOTEIO";
  Errno2[Errno2["EDQUOT"] = 122] = "EDQUOT";
})(Errno || (Errno = {}));
const errorMessages = {
  [Errno.EPERM]: "Operation not permitted",
  [Errno.ENOENT]: "No such file or directory",
  [Errno.EINTR]: "Interrupted system call",
  [Errno.EIO]: "Input/output error",
  [Errno.ENXIO]: "No such device or address",
  [Errno.EBADF]: "Bad file descriptor",
  [Errno.EAGAIN]: "Resource temporarily unavailable",
  [Errno.ENOMEM]: "Cannot allocate memory",
  [Errno.EACCES]: "Permission denied",
  [Errno.EFAULT]: "Bad address",
  [Errno.ENOTBLK]: "Block device required",
  [Errno.EBUSY]: "Resource busy or locked",
  [Errno.EEXIST]: "File exists",
  [Errno.EXDEV]: "Invalid cross-device link",
  [Errno.ENODEV]: "No such device",
  [Errno.ENOTDIR]: "File is not a directory",
  [Errno.EISDIR]: "File is a directory",
  [Errno.EINVAL]: "Invalid argument",
  [Errno.ENFILE]: "Too many open files in system",
  [Errno.EMFILE]: "Too many open files",
  [Errno.ETXTBSY]: "Text file busy",
  [Errno.EFBIG]: "File is too big",
  [Errno.ENOSPC]: "No space left on disk",
  [Errno.ESPIPE]: "Illegal seek",
  [Errno.EROFS]: "Cannot modify a read-only file system",
  [Errno.EMLINK]: "Too many links",
  [Errno.EPIPE]: "Broken pipe",
  [Errno.EDOM]: "Numerical argument out of domain",
  [Errno.ERANGE]: "Numerical result out of range",
  [Errno.EDEADLK]: "Resource deadlock would occur",
  [Errno.ENAMETOOLONG]: "File name too long",
  [Errno.ENOLCK]: "No locks available",
  [Errno.ENOSYS]: "Function not implemented",
  [Errno.ENOTEMPTY]: "Directory is not empty",
  [Errno.ELOOP]: "Too many levels of symbolic links",
  [Errno.ENOMSG]: "No message of desired type",
  [Errno.EBADE]: "Invalid exchange",
  [Errno.EBADR]: "Invalid request descriptor",
  [Errno.EXFULL]: "Exchange full",
  [Errno.ENOANO]: "No anode",
  [Errno.EBADRQC]: "Invalid request code",
  [Errno.ENOSTR]: "Device not a stream",
  [Errno.ENODATA]: "No data available",
  [Errno.ETIME]: "Timer expired",
  [Errno.ENOSR]: "Out of streams resources",
  [Errno.ENONET]: "Machine is not on the network",
  [Errno.EREMOTE]: "Object is remote",
  [Errno.ENOLINK]: "Link has been severed",
  [Errno.ECOMM]: "Communication error on send",
  [Errno.EPROTO]: "Protocol error",
  [Errno.EBADMSG]: "Bad message",
  [Errno.EOVERFLOW]: "Value too large for defined data type",
  [Errno.EBADFD]: "File descriptor in bad state",
  [Errno.ESTRPIPE]: "Streams pipe error",
  [Errno.ENOTSOCK]: "Socket operation on non-socket",
  [Errno.EDESTADDRREQ]: "Destination address required",
  [Errno.EMSGSIZE]: "Message too long",
  [Errno.EPROTOTYPE]: "Protocol wrong type for socket",
  [Errno.ENOPROTOOPT]: "Protocol not available",
  [Errno.EPROTONOSUPPORT]: "Protocol not supported",
  [Errno.ESOCKTNOSUPPORT]: "Socket type not supported",
  [Errno.ENOTSUP]: "Operation is not supported",
  [Errno.ENETDOWN]: "Network is down",
  [Errno.ENETUNREACH]: "Network is unreachable",
  [Errno.ENETRESET]: "Network dropped connection on reset",
  [Errno.ETIMEDOUT]: "Connection timed out",
  [Errno.ECONNREFUSED]: "Connection refused",
  [Errno.EHOSTDOWN]: "Host is down",
  [Errno.EHOSTUNREACH]: "No route to host",
  [Errno.EALREADY]: "Operation already in progress",
  [Errno.EINPROGRESS]: "Operation now in progress",
  [Errno.ESTALE]: "Stale file handle",
  [Errno.EREMOTEIO]: "Remote I/O error",
  [Errno.EDQUOT]: "Disk quota exceeded"
};
class ErrnoError extends Error {
  static fromJSON(json) {
    const err2 = new ErrnoError(json.errno, json.message, json.path, json.syscall);
    err2.code = json.code;
    err2.stack = json.stack;
    return err2;
  }
  static With(code, path, syscall) {
    return new ErrnoError(Errno[code], errorMessages[Errno[code]], path, syscall);
  }
  constructor(errno, message = errorMessages[errno], path, syscall = "") {
    super(message);
    this.errno = errno;
    this.message = message;
    this.path = path;
    this.syscall = syscall;
    this.code = Errno[errno];
  }
  /**
   * @returns A friendly error message.
   */
  toString() {
    return this.code + ": " + this.message + (this.path ? `, '${this.path}'` : "");
  }
  toJSON() {
    return {
      errno: this.errno,
      code: this.code,
      path: this.path,
      stack: this.stack,
      message: this.message,
      syscall: this.syscall
    };
  }
  /**
   * The size of the API error in buffer-form in bytes.
   */
  bufferSize() {
    return 4 + JSON.stringify(this.toJSON()).length;
  }
}
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var eventemitter3 = { exports: {} };
var hasRequiredEventemitter3;
function requireEventemitter3() {
  if (hasRequiredEventemitter3) return eventemitter3.exports;
  hasRequiredEventemitter3 = 1;
  (function(module) {
    var has = Object.prototype.hasOwnProperty, prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }
    function EventEmitter2() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      var names = [], events2, name;
      if (this._eventsCount === 0) return names;
      for (name in events2 = this._events) {
        if (has.call(events2, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events2));
      }
      return names;
    };
    EventEmitter2.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter2.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter2.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter2.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events2 = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events2.push(listeners[i]);
          }
        }
        if (events2.length) this._events[evt] = events2.length === 1 ? events2[0] : events2;
        else clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
    EventEmitter2.prefixed = prefix;
    EventEmitter2.EventEmitter = EventEmitter2;
    {
      module.exports = EventEmitter2;
    }
  })(eventemitter3);
  return eventemitter3.exports;
}
var eventemitter3Exports = requireEventemitter3();
var EventEmitter = /* @__PURE__ */ getDefaultExportFromCjs(eventemitter3Exports);
class List extends EventEmitter {
  constructor(values) {
    super();
    __publicField(this, _a2, "List");
    __publicField(this, "data", /* @__PURE__ */ new Set());
    if (values) {
      this.push(...values);
    }
  }
  toSet() {
    return new Set(this.data);
  }
  toArray() {
    return Array.from(this.data);
  }
  toJSON() {
    return JSON.stringify(Array.from(this.data));
  }
  toString() {
    return this.join(",");
  }
  _set(index, value, _delete = false) {
    if (Math.abs(index) > this.data.size) {
      throw new ReferenceError("Can not set an element outside the bounds of the list");
    }
    const data = Array.from(this.data);
    data.splice(index, +_delete, value);
    this.data = new Set(data);
    this.emit("update");
  }
  set(index, value) {
    this._set(index, value, true);
  }
  deleteAt(index) {
    if (Math.abs(index) > this.data.size) {
      throw new ReferenceError("Can not delete an element outside the bounds of the list");
    }
    this.delete(Array.from(this.data).at(index));
  }
  insert(value, index = this.data.size) {
    this._set(index, value, false);
  }
  // Array methods
  at(index) {
    if (Math.abs(index) > this.data.size) {
      throw new ReferenceError("Can not access an element outside the bounds of the list");
    }
    return Array.from(this.data).at(index);
  }
  pop() {
    const item = Array.from(this.data).pop();
    if (item !== void 0) {
      this.delete(item);
    }
    return item;
  }
  push(...items) {
    for (const item of items) {
      this.add(item);
    }
    return this.data.size;
  }
  join(separator) {
    return Array.from(this.data).join(separator);
  }
  splice(start, deleteCount, ...items) {
    if (Math.abs(start) > this.data.size) {
      throw new ReferenceError("Can not splice elements outside the bounds of the list");
    }
    const data = Array.from(this.data);
    const deleted = data.splice(start, deleteCount, ...items);
    this.data = new Set(data);
    this.emit("update");
    return deleted;
  }
  // Set methods
  add(value) {
    this.data.add(value);
    this.emit("update");
    this.emit("add", value);
    return this;
  }
  clear() {
    this.data.clear();
    this.emit("update");
  }
  delete(value) {
    const success = this.data.delete(value);
    this.emit("update");
    return success;
  }
  has(value) {
    return this.data.has(value);
  }
  get size() {
    return this.data.size;
  }
  // Iteration
  entries() {
    return this.toArray().entries();
  }
  keys() {
    return this.toArray().keys();
  }
  values() {
    return this.data.values();
  }
  [(_a2 = Symbol.toStringTag, Symbol.iterator)]() {
    return this.data[Symbol.iterator]();
  }
}
function canary(error = new Error()) {
  const timeout = setTimeout(() => {
    throw error;
  }, 5e3);
  return () => clearTimeout(timeout);
}
function _throw(e) {
  throw e;
}
const __formatter = Intl.NumberFormat("en", { notation: "compact" });
__formatter.format.bind(__formatter);
function pick(object, ...keys) {
  const picked = {};
  for (const key2 of keys.flat()) {
    picked[key2] = object[key2];
  }
  return picked;
}
function isJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}
function* getAllPrototypes(object) {
  for (let prototype = object; prototype; prototype = Object.getPrototypeOf(prototype)) {
    yield prototype;
  }
}
function randomInt(min = 0, max2 = 1) {
  return Math.round(Math.random() * (max2 - min) + min);
}
function capitalize(value) {
  return value.at(0).toUpperCase() + value.slice(1);
}
const types$1 = [
  "int8",
  "uint8",
  "int16",
  "uint16",
  "int32",
  "uint32",
  "int64",
  "uint64",
  "int128",
  "uint128",
  "float32",
  "float64",
  "float128"
];
const valids = [...types$1, ...types$1.map((t) => capitalize(t)), "char"];
const regex = /^(u?int|float)(8|16|32|64|128)$/i;
function normalize$1(type) {
  return type == "char" ? "uint8" : type.toLowerCase();
}
function isType(type) {
  return regex.test(type.toString());
}
function isValid(type) {
  return type == "char" || regex.test(type.toString().toLowerCase());
}
function checkValid(type) {
  if (!isValid(type)) {
    throw new TypeError("Not a valid primitive type: " + type);
  }
}
const mask64 = BigInt("0xffffffffffffffff");
Symbol.struct_init || (Symbol.struct_init = Symbol("struct_init"));
Symbol.struct_metadata || (Symbol.struct_metadata = Symbol("struct_metadata"));
function isValidMetadata(arg) {
  return arg != null && typeof arg == "object" && Symbol.struct_metadata in arg;
}
Symbol.metadata ?? (Symbol.metadata = Symbol.for("Symbol.metadata"));
function _polyfill_contextMetadata(target) {
  if (!(Symbol == null ? void 0 : Symbol.metadata)) {
    return;
  }
  if (Symbol.metadata in target) {
    return;
  }
  Object.defineProperty(target, Symbol.metadata, {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /* @__PURE__ */ Object.create(null)
  });
}
function symbol_metadata(arg) {
  const symbol_metadata2 = Symbol.metadata || Object.getOwnPropertySymbols(arg).find((s) => s.description == "Symbol.metadata");
  _polyfill_contextMetadata(arg);
  if (!symbol_metadata2) {
    throw new ReferenceError("Could not get a reference to Symbol.metadata");
  }
  return symbol_metadata2;
}
function isStatic(arg) {
  return typeof arg == "function" && symbol_metadata(arg) in arg && isValidMetadata(arg[symbol_metadata(arg)]);
}
function isInstance(arg) {
  return arg != null && typeof arg == "object" && isStatic(arg.constructor);
}
function checkInstance(arg) {
  if (!isInstance(arg)) {
    throw new TypeError((typeof arg == "function" ? arg.name : typeof arg == "object" && arg ? arg.constructor.name : arg) + " is not a struct instance");
  }
}
function isStruct(arg) {
  return isInstance(arg) || isStatic(arg);
}
function checkStruct(arg) {
  if (!isStruct(arg)) {
    throw new TypeError((typeof arg == "function" ? arg.name : typeof arg == "object" && arg ? arg.constructor.name : arg) + " is not a struct");
  }
}
function sizeof(type) {
  if (typeof type == "string") {
    checkValid(type);
    return +normalize$1(type).match(regex)[2] / 8;
  }
  checkStruct(type);
  const struct2 = isStatic(type) ? type : type.constructor;
  return struct2[symbol_metadata(struct2)][Symbol.struct_metadata].size;
}
function offsetof(type, memberName) {
  checkStruct(type);
  const struct2 = isStatic(type) ? type : type.constructor;
  const metadata = struct2[symbol_metadata(struct2)][Symbol.struct_metadata];
  const member2 = metadata.members.get(memberName);
  if (!member2)
    throw new Error("Struct does not have member: " + memberName);
  return member2.offset;
}
function align(value, alignment) {
  return Math.ceil(value / alignment) * alignment;
}
function struct(options = {}) {
  return function _decorateStruct(target, context) {
    var _a3, _b3;
    context.metadata ?? (context.metadata = {});
    (_a3 = context.metadata)[_b3 = Symbol.struct_init] || (_a3[_b3] = []);
    let size = 0;
    const members = /* @__PURE__ */ new Map();
    for (const _ of context.metadata[Symbol.struct_init]) {
      const { name, type, length } = _;
      if (!isValid(type) && !isStatic(type)) {
        throw new TypeError("Not a valid type: " + type);
      }
      members.set(name, {
        offset: options.isUnion ? 0 : size,
        type: isValid(type) ? normalize$1(type) : type,
        length
      });
      const memberSize = sizeof(type) * (length || 1);
      size = options.isUnion ? Math.max(size, memberSize) : size + memberSize;
      size = align(size, options.align || 1);
    }
    context.metadata[Symbol.struct_metadata] = { options, members, size };
    return target;
  };
}
function member(type, length) {
  return function(value, context) {
    var _a3, _b3;
    let name = context.name;
    if (typeof name == "symbol") {
      console.warn("Symbol used for struct member name will be coerced to string: " + name.toString());
      name = name.toString();
    }
    if (!name) {
      throw new ReferenceError("Invalid name for struct member");
    }
    context.metadata ?? (context.metadata = {});
    (_a3 = context.metadata)[_b3 = Symbol.struct_init] || (_a3[_b3] = []);
    context.metadata[Symbol.struct_init].push({ name, type, length });
    return value;
  };
}
function serialize(instance) {
  checkInstance(instance);
  const { options, members } = instance.constructor[symbol_metadata(instance.constructor)][Symbol.struct_metadata];
  const buffer2 = new Uint8Array(sizeof(instance));
  const view = new DataView(buffer2.buffer);
  for (const [name, { type, length, offset }] of members) {
    for (let i = 0; i < (length || 1); i++) {
      const iOff = offset + sizeof(type) * i;
      let value = length > 0 ? instance[name][i] : instance[name];
      if (typeof value == "string") {
        value = value.charCodeAt(0);
      }
      if (!isType(type)) {
        buffer2.set(value ? serialize(value) : new Uint8Array(sizeof(type)), iOff);
        continue;
      }
      const fn = `set${capitalize(type)}`;
      if (fn == "setInt64") {
        view.setBigInt64(iOff, BigInt(value), !options.bigEndian);
        continue;
      }
      if (fn == "setUint64") {
        view.setBigUint64(iOff, BigInt(value), !options.bigEndian);
        continue;
      }
      if (fn == "setInt128") {
        view.setBigUint64(iOff + (!options.bigEndian ? 0 : 8), value & mask64, !options.bigEndian);
        view.setBigInt64(iOff + (!options.bigEndian ? 8 : 0), value >> BigInt(64), !options.bigEndian);
        continue;
      }
      if (fn == "setUint128") {
        view.setBigUint64(iOff + (!options.bigEndian ? 0 : 8), value & mask64, !options.bigEndian);
        view.setBigUint64(iOff + (!options.bigEndian ? 8 : 0), value >> BigInt(64), !options.bigEndian);
        continue;
      }
      if (fn == "setFloat128") {
        view.setFloat64(iOff + (!options.bigEndian ? 0 : 8), Number(value), !options.bigEndian);
        view.setBigUint64(iOff + (!options.bigEndian ? 8 : 0), BigInt(0), !options.bigEndian);
        continue;
      }
      view[fn](iOff, Number(value), !options.bigEndian);
    }
  }
  return buffer2;
}
function deserialize(instance, _buffer) {
  checkInstance(instance);
  const { options, members } = instance.constructor[symbol_metadata(instance.constructor)][Symbol.struct_metadata];
  const buffer2 = _buffer instanceof Uint8Array ? _buffer : new Uint8Array("buffer" in _buffer ? _buffer.buffer : _buffer);
  const view = new DataView(buffer2.buffer, buffer2.byteOffset, buffer2.byteLength);
  for (const [name, { type, offset, length }] of members) {
    for (let i = 0; i < (length || 1); i++) {
      let object = length > 0 ? instance[name] : instance;
      const key2 = length > 0 ? i : name, iOff = offset + sizeof(type) * i;
      if (typeof instance[name] == "string") {
        instance[name] = instance[name].slice(0, i) + String.fromCharCode(view.getUint8(iOff)) + instance[name].slice(i + 1);
        continue;
      }
      if (!isType(type)) {
        if (object[key2] === null || object[key2] === void 0) {
          continue;
        }
        deserialize(object[key2], new Uint8Array(buffer2.slice(iOff, iOff + sizeof(type))));
        continue;
      }
      if (length > 0) {
        object || (object = []);
      }
      const fn = `get${capitalize(type)}`;
      if (fn == "getInt64") {
        object[key2] = view.getBigInt64(iOff, !options.bigEndian);
        continue;
      }
      if (fn == "getUint64") {
        object[key2] = view.getBigUint64(iOff, !options.bigEndian);
        continue;
      }
      if (fn == "getInt128") {
        object[key2] = view.getBigInt64(iOff + (!options.bigEndian ? 8 : 0), !options.bigEndian) << BigInt(64) | view.getBigUint64(iOff + (!options.bigEndian ? 0 : 8), !options.bigEndian);
        continue;
      }
      if (fn == "getUint128") {
        object[key2] = view.getBigUint64(iOff + (!options.bigEndian ? 8 : 0), !options.bigEndian) << BigInt(64) | view.getBigUint64(iOff + (!options.bigEndian ? 0 : 8), !options.bigEndian);
        continue;
      }
      if (fn == "getFloat128") {
        object[key2] = view.getFloat64(iOff + (!options.bigEndian ? 0 : 8), !options.bigEndian);
        continue;
      }
      object[key2] = view[fn](iOff, !options.bigEndian);
    }
  }
}
function _member(type) {
  function _structMemberDecorator(valueOrLength, context) {
    if (typeof valueOrLength == "number") {
      return member(type, valueOrLength);
    }
    return member(type)(valueOrLength, context);
  }
  return _structMemberDecorator;
}
const types = Object.fromEntries(valids.map((t) => [t, _member(t)]));
let cwd = "/";
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = "\0";
  for (let i = 0; i <= path.length; ++i) {
    if (i < path.length) {
      char = path[i];
    } else if (char == "/") {
      break;
    } else {
      char = "/";
    }
    if (char == "/") {
      if (lastSlash === i - 1 || dots === 1) ;
      else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.at(-1) !== "." || res.at(-2) !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = i;
            dots = 0;
            continue;
          } else if (res.length !== 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += "/" + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
function resolve(...parts) {
  let resolved = "";
  for (const part of [...parts.reverse(), cwd]) {
    if (!part.length) {
      continue;
    }
    resolved = `${part}/${resolved}`;
    if (part.startsWith("/")) {
      break;
    }
  }
  const absolute = resolved.startsWith("/");
  resolved = normalizeString(resolved, !absolute);
  if (absolute) {
    return `/${resolved}`;
  }
  return resolved.length ? resolved : "/";
}
function normalize(path) {
  if (!path.length)
    return ".";
  const isAbsolute = path.startsWith("/");
  const trailingSeparator = path.endsWith("/");
  path = normalizeString(path, !isAbsolute);
  if (!path.length) {
    if (isAbsolute)
      return "/";
    return trailingSeparator ? "./" : ".";
  }
  if (trailingSeparator)
    path += "/";
  return isAbsolute ? `/${path}` : path;
}
function join(...parts) {
  if (!parts.length)
    return ".";
  const joined = parts.join("/");
  if (!(joined === null || joined === void 0 ? void 0 : joined.length))
    return ".";
  return normalize(joined);
}
function relative(from, to) {
  if (from === to)
    return "";
  from = resolve(from);
  to = resolve(to);
  if (from === to)
    return "";
  const fromStart = 1;
  const fromEnd = from.length;
  const fromLen = fromEnd - fromStart;
  const toStart = 1;
  const toLen = to.length - toStart;
  const length = fromLen < toLen ? fromLen : toLen;
  let lastCommonSep = -1;
  let i = 0;
  for (; i < length; i++) {
    const fromCode = from[fromStart + i];
    if (fromCode !== to[toStart + i])
      break;
    else if (fromCode === "/")
      lastCommonSep = i;
  }
  if (i === length) {
    if (toLen > length) {
      if (to[toStart + i] === "/") {
        return to.slice(toStart + i + 1);
      }
      if (i === 0) {
        return to.slice(toStart + i);
      }
    } else if (fromLen > length) {
      if (from[fromStart + i] === "/") {
        lastCommonSep = i;
      } else if (i === 0) {
        lastCommonSep = 0;
      }
    }
  }
  let out = "";
  for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
    if (i === fromEnd || from[i] === "/") {
      out += out.length === 0 ? ".." : "/..";
    }
  }
  return `${out}${to.slice(toStart + lastCommonSep)}`;
}
function dirname(path) {
  if (path.length === 0)
    return ".";
  const hasRoot = path[0] === "/";
  let end = -1;
  let matchedSlash = true;
  for (let i = path.length - 1; i >= 1; --i) {
    if (path[i] === "/") {
      if (!matchedSlash) {
        end = i;
        break;
      }
    } else {
      matchedSlash = false;
    }
  }
  if (end === -1)
    return hasRoot ? "/" : ".";
  if (hasRoot && end === 1)
    return "//";
  return path.slice(0, end);
}
function basename(path, suffix) {
  let start = 0;
  let end = -1;
  let matchedSlash = true;
  for (let i = path.length - 1; i >= 0; --i) {
    if (path[i] === "/") {
      if (!matchedSlash) {
        start = i + 1;
        break;
      }
    } else if (end === -1) {
      matchedSlash = false;
      end = i + 1;
    }
  }
  if (end === -1)
    return "";
  return path.slice(start, end);
}
function parse(path) {
  const isAbsolute = path.startsWith("/");
  const ret = { root: isAbsolute ? "/" : "", dir: "", base: "", ext: "", name: "" };
  if (path.length === 0)
    return ret;
  const start = isAbsolute ? 1 : 0;
  let startDot = -1;
  let startPart = 0;
  let end = -1;
  let matchedSlash = true;
  let i = path.length - 1;
  let preDotState = 0;
  for (; i >= start; --i) {
    if (path[i] === "/") {
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      matchedSlash = false;
      end = i + 1;
    }
    if (path[i] === ".") {
      if (startDot === -1)
        startDot = i;
      else if (preDotState !== 1)
        preDotState = 1;
    } else if (startDot !== -1) {
      preDotState = -1;
    }
  }
  if (end !== -1) {
    const start2 = startPart === 0 && isAbsolute ? 1 : startPart;
    if (startDot === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      ret.base = ret.name = path.slice(start2, end);
    } else {
      ret.name = path.slice(start2, startDot);
      ret.base = path.slice(start2, end);
      ret.ext = path.slice(startDot, end);
    }
  }
  if (startPart > 0)
    ret.dir = path.slice(0, startPart - 1);
  else if (isAbsolute)
    ret.dir = "/";
  return ret;
}
var Level$1;
(function(Level2) {
  Level2[Level2["EMERG"] = 0] = "EMERG";
  Level2[Level2["ALERT"] = 1] = "ALERT";
  Level2[Level2["CRIT"] = 2] = "CRIT";
  Level2[Level2["ERR"] = 3] = "ERR";
  Level2[Level2["WARN"] = 4] = "WARN";
  Level2[Level2["NOTICE"] = 5] = "NOTICE";
  Level2[Level2["INFO"] = 6] = "INFO";
  Level2[Level2["DEBUG"] = 7] = "DEBUG";
})(Level$1 || (Level$1 = {}));
const levels = {
  [Level$1.EMERG]: "emergency",
  [Level$1.ALERT]: "alert",
  [Level$1.CRIT]: "critical",
  [Level$1.ERR]: "error",
  [Level$1.WARN]: "warning",
  [Level$1.NOTICE]: "notice",
  [Level$1.INFO]: "info",
  [Level$1.DEBUG]: "debug"
};
function levelOf(value) {
  return Object.values(levels).indexOf(value);
}
const entries$2 = new List();
function log$1(level, message) {
  if (!isEnabled)
    return;
  const entry = {
    level,
    message,
    timestamp: /* @__PURE__ */ new Date(),
    elapsedMs: performance.now()
  };
  entries$2.add(entry);
  output(entry);
}
function _messageString(msg, options) {
  var _a3, _b3;
  if (!(msg instanceof ErrnoError))
    return msg.toString();
  const beforePath = msg.code + ": " + msg.message;
  if (!msg.path)
    return beforePath;
  const mountPoint = typeof options.fs == "string" ? options.fs : (_b3 = (_a3 = options.fs) === null || _a3 === void 0 ? void 0 : _a3._mountPoint) !== null && _b3 !== void 0 ? _b3 : "<unknown>";
  return beforePath + ": " + join(mountPoint, msg.path);
}
function _shortcut(level) {
  return function(message, options = {}) {
    log$1(level, _messageString(message, options));
    return message;
  };
}
_shortcut(Level$1.EMERG);
const alert = _shortcut(Level$1.ALERT);
const crit = _shortcut(Level$1.CRIT);
const err$2 = _shortcut(Level$1.ERR);
const warn = _shortcut(Level$1.WARN);
const notice = _shortcut(Level$1.NOTICE);
const info = _shortcut(Level$1.INFO);
const debug = _shortcut(Level$1.DEBUG);
function log_deprecated(symbol) {
  log$1(Level$1.WARN, symbol + " is deprecated and should not be used.");
}
function ansi(text, format2) {
  return `\x1B[${format2}m${text}\x1B[0m`;
}
function _prettyMs(entry, style) {
  const text = "[" + (entry.elapsedMs / 1e3).toFixed(3).padStart(10) + "] ";
  switch (style) {
    case "ansi":
      return ansi(text, "2;37");
    case "css":
      return ["%c" + text, "opacity: 0.8; color: white;"];
    default:
      return text;
  }
}
({
  [Level$1.EMERG]: "1;4;37;41",
  [Level$1.ALERT]: "1;37;41",
  [Level$1.CRIT]: "1;35",
  [Level$1.ERR]: "1;31",
  [Level$1.WARN]: "1;33",
  [Level$1.NOTICE]: "1;36",
  [Level$1.INFO]: "1;37",
  [Level$1.DEBUG]: "0;2;37"
});
({
  [Level$1.EMERG]: "1;31",
  [Level$1.ALERT]: "1;31",
  [Level$1.CRIT]: "1;31",
  [Level$1.ERR]: "31",
  [Level$1.WARN]: "33",
  [Level$1.NOTICE]: "1;37",
  [Level$1.INFO]: "37",
  [Level$1.DEBUG]: "2;37"
});
({
  [Level$1.EMERG]: "font-weight: bold; text-decoration: underline; color: white; background-color: red;",
  [Level$1.ALERT]: "font-weight: bold; color: white; background-color: red;",
  [Level$1.CRIT]: "font-weight: bold; color: magenta;",
  [Level$1.ERR]: "font-weight: bold; color: red;",
  [Level$1.WARN]: "font-weight: bold; color: yellow;",
  [Level$1.NOTICE]: "font-weight: bold; color: cyan;",
  [Level$1.INFO]: "font-weight: bold; color: white;",
  [Level$1.DEBUG]: "opacity: 0.8; color: white;"
});
({
  [Level$1.EMERG]: "font-weight: bold; color: red;",
  [Level$1.ALERT]: "font-weight: bold; color: red;",
  [Level$1.CRIT]: "font-weight: bold; color: red;",
  [Level$1.ERR]: "color: red;",
  [Level$1.WARN]: "color: yellow;",
  [Level$1.NOTICE]: "font-weight: bold; color: white;",
  [Level$1.INFO]: "color: white;",
  [Level$1.DEBUG]: "opacity: 0.8; color: white;"
});
const formats = {
  default(entry) {
    return [_prettyMs(entry), entry.message];
  }
};
let _format = formats.default;
function format(entry) {
  const formatted = _format(entry);
  return Array.isArray(formatted) ? formatted : [formatted];
}
let _output = console.error;
function output(entry) {
  if (entry.level > minLevel)
    return;
  _output(...format(entry));
}
let minLevel = Level$1.ALERT;
let isEnabled = true;
function configure$1(options) {
  var _a3, _b3, _c2, _d;
  _format = (_a3 = options.format) !== null && _a3 !== void 0 ? _a3 : _format;
  _output = (_b3 = options.output) !== null && _b3 !== void 0 ? _b3 : _output;
  minLevel = typeof options.level == "string" ? levelOf(options.level) : (_c2 = options.level) !== null && _c2 !== void 0 ? _c2 : minLevel;
  isEnabled = (_d = options.enabled) !== null && _d !== void 0 ? _d : isEnabled;
  if (!options.dumpBacklog)
    return;
  for (const entry of entries$2) {
    output(entry);
  }
}
function isBackend(arg) {
  return arg != null && typeof arg == "object" && "create" in arg && typeof arg.create == "function";
}
async function checkOptions(backend, options) {
  if (typeof options != "object" || options === null) {
    throw err$2(new ErrnoError(Errno.EINVAL, "Invalid options"));
  }
  for (const [optName, opt] of Object.entries(backend.options)) {
    const value = options === null || options === void 0 ? void 0 : options[optName];
    if (value === void 0 || value === null) {
      if (!opt.required) {
        debug("Missing non-required option: " + optName);
        continue;
      }
      throw err$2(new ErrnoError(Errno.EINVAL, "Missing required option: " + optName));
    }
    const isType2 = (type, _ = value) => typeof type == "function" ? value instanceof type : typeof value === type;
    if (Array.isArray(opt.type) ? !opt.type.some((v) => isType2(v)) : !isType2(opt.type)) {
      const type = typeof value == "object" && "constructor" in value ? value.constructor.name : typeof value;
      const name = (type2) => typeof type2 == "function" ? type2.name : type2;
      const expected = Array.isArray(opt.type) ? `one of ${opt.type.map(name).join(", ")}` : name(opt.type);
      throw err$2(new ErrnoError(Errno.EINVAL, `Incorrect type for "${optName}": ${type} (expected ${expected})`));
    }
    debug("Using custom validator for option: " + optName);
    if (opt.validator)
      await opt.validator(value);
  }
}
function isBackendConfig(arg) {
  return arg != null && typeof arg == "object" && "backend" in arg && isBackend(arg.backend);
}
function extendBuffer(buffer2, newByteLength) {
  if (buffer2.byteLength >= newByteLength)
    return buffer2;
  if (ArrayBuffer.isView(buffer2)) {
    const newBuffer = extendBuffer(buffer2.buffer, newByteLength);
    return new buffer2.constructor(newBuffer, buffer2.byteOffset, newByteLength);
  }
  const isShared = typeof SharedArrayBuffer !== "undefined" && buffer2 instanceof SharedArrayBuffer;
  if (buffer2.maxByteLength > newByteLength) {
    isShared ? buffer2.grow(newByteLength) : buffer2.resize(newByteLength);
    return buffer2;
  }
  if (isShared) {
    const newBuffer = new SharedArrayBuffer(newByteLength);
    new Uint8Array(newBuffer).set(new Uint8Array(buffer2));
    return newBuffer;
  }
  try {
    return buffer2.transfer(newByteLength);
  } catch {
    const newBuffer = new ArrayBuffer(newByteLength);
    new Uint8Array(newBuffer).set(new Uint8Array(buffer2));
    return newBuffer;
  }
}
const credentials = {
  uid: 0,
  gid: 0,
  suid: 0,
  sgid: 0,
  euid: 0,
  egid: 0,
  groups: []
};
function createCredentials(source) {
  return {
    suid: source.uid,
    sgid: source.gid,
    euid: source.uid,
    egid: source.gid,
    groups: [],
    ...source
  };
}
function useCredentials(source) {
  Object.assign(credentials, createCredentials(source));
}
const F_OK = 0;
const R_OK = 4;
const W_OK = 2;
const X_OK = 1;
const COPYFILE_EXCL = 1;
const COPYFILE_FICLONE = 2;
const COPYFILE_FICLONE_FORCE = 4;
const O_RDONLY = 0;
const O_WRONLY = 1;
const O_RDWR = 2;
const O_CREAT = 64;
const O_EXCL = 128;
const O_NOCTTY = 256;
const O_TRUNC = 512;
const O_APPEND = 1024;
const O_DIRECTORY = 65536;
const O_NOATIME = 262144;
const O_NOFOLLOW = 131072;
const O_SYNC = 1052672;
const O_DSYNC = 4096;
const O_SYMLINK = 32768;
const O_DIRECT = 16384;
const O_NONBLOCK = 2048;
const S_IFMT = 61440;
const S_IFSOCK = 49152;
const S_IFLNK = 40960;
const S_IFREG = 32768;
const S_IFBLK = 24576;
const S_IFDIR = 16384;
const S_IFCHR = 8192;
const S_IFIFO = 4096;
const S_ISUID = 2048;
const S_ISGID = 1024;
const S_ISVTX = 512;
const S_IRWXU = 448;
const S_IRUSR = 256;
const S_IWUSR = 128;
const S_IXUSR = 64;
const S_IRWXG = 56;
const S_IRGRP = 32;
const S_IWGRP = 16;
const S_IXGRP = 8;
const S_IRWXO = 7;
const S_IROTH = 4;
const S_IWOTH = 2;
const S_IXOTH = 1;
const UV_FS_O_FILEMAP = 0;
const size_max = 4294967295;
var constants = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  COPYFILE_EXCL,
  COPYFILE_FICLONE,
  COPYFILE_FICLONE_FORCE,
  F_OK,
  O_APPEND,
  O_CREAT,
  O_DIRECT,
  O_DIRECTORY,
  O_DSYNC,
  O_EXCL,
  O_NOATIME,
  O_NOCTTY,
  O_NOFOLLOW,
  O_NONBLOCK,
  O_RDONLY,
  O_RDWR,
  O_SYMLINK,
  O_SYNC,
  O_TRUNC,
  O_WRONLY,
  R_OK,
  S_IFBLK,
  S_IFCHR,
  S_IFDIR,
  S_IFIFO,
  S_IFLNK,
  S_IFMT,
  S_IFREG,
  S_IFSOCK,
  S_IRGRP,
  S_IROTH,
  S_IRUSR,
  S_IRWXG,
  S_IRWXO,
  S_IRWXU,
  S_ISGID,
  S_ISUID,
  S_ISVTX,
  S_IWGRP,
  S_IWOTH,
  S_IWUSR,
  S_IXGRP,
  S_IXOTH,
  S_IXUSR,
  UV_FS_O_FILEMAP,
  W_OK,
  X_OK,
  size_max
});
var __esDecorate$7 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key2 = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context.access[p] = contextIn.access[p];
    context.addInitializer = function(f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key2], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field") initializers.unshift(_);
      else descriptor[key2] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers$7 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};
var __setFunctionName$1 = function(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
const rootIno = 0;
const _inode_fields = ["ino", "data", "size", "mode", "flags", "nlink", "uid", "gid", "atimeMs", "birthtimeMs", "mtimeMs", "ctimeMs"];
const _inode_version = 3;
let Inode = (() => {
  var _a3, _b3, _c2, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _data_decorators;
  let _data_initializers = [];
  let _data_extraInitializers = [];
  let ___data_old_decorators;
  let ___data_old_initializers = [];
  let ___data_old_extraInitializers = [];
  let _size_decorators;
  let _size_initializers = [];
  let _size_extraInitializers = [];
  let _mode_decorators;
  let _mode_initializers = [];
  let _mode_extraInitializers = [];
  let _nlink_decorators;
  let _nlink_initializers = [];
  let _nlink_extraInitializers = [];
  let _uid_decorators;
  let _uid_initializers = [];
  let _uid_extraInitializers = [];
  let _gid_decorators;
  let _gid_initializers = [];
  let _gid_extraInitializers = [];
  let _atimeMs_decorators;
  let _atimeMs_initializers = [];
  let _atimeMs_extraInitializers = [];
  let _birthtimeMs_decorators;
  let _birthtimeMs_initializers = [];
  let _birthtimeMs_extraInitializers = [];
  let _mtimeMs_decorators;
  let _mtimeMs_initializers = [];
  let _mtimeMs_extraInitializers = [];
  let _ctimeMs_decorators;
  let _ctimeMs_initializers = [];
  let _ctimeMs_extraInitializers = [];
  let _ino_decorators;
  let _ino_initializers = [];
  let _ino_extraInitializers = [];
  let ___ino_old_decorators;
  let ___ino_old_initializers = [];
  let ___ino_old_extraInitializers = [];
  let _flags_decorators;
  let _flags_initializers = [];
  let _flags_extraInitializers = [];
  let ___padding_decorators;
  let ___padding_initializers = [];
  let ___padding_extraInitializers = [];
  _classThis = class {
    constructor(data) {
      this.data = __runInitializers$7(this, _data_initializers, randomInt(0, size_max));
      this.__data_old = (__runInitializers$7(this, _data_extraInitializers), __runInitializers$7(this, ___data_old_initializers, 0));
      this.size = (__runInitializers$7(this, ___data_old_extraInitializers), __runInitializers$7(this, _size_initializers, 0));
      this.mode = (__runInitializers$7(this, _size_extraInitializers), __runInitializers$7(this, _mode_initializers, 0));
      this.nlink = (__runInitializers$7(this, _mode_extraInitializers), __runInitializers$7(this, _nlink_initializers, 1));
      this.uid = (__runInitializers$7(this, _nlink_extraInitializers), __runInitializers$7(this, _uid_initializers, 0));
      this.gid = (__runInitializers$7(this, _uid_extraInitializers), __runInitializers$7(this, _gid_initializers, 0));
      this.atimeMs = (__runInitializers$7(this, _gid_extraInitializers), __runInitializers$7(this, _atimeMs_initializers, Date.now()));
      this.birthtimeMs = (__runInitializers$7(this, _atimeMs_extraInitializers), __runInitializers$7(this, _birthtimeMs_initializers, Date.now()));
      this.mtimeMs = (__runInitializers$7(this, _birthtimeMs_extraInitializers), __runInitializers$7(this, _mtimeMs_initializers, Date.now()));
      this.ctimeMs = (__runInitializers$7(this, _mtimeMs_extraInitializers), __runInitializers$7(this, _ctimeMs_initializers, Date.now()));
      this.ino = (__runInitializers$7(this, _ctimeMs_extraInitializers), __runInitializers$7(this, _ino_initializers, randomInt(0, size_max)));
      this.__ino_old = (__runInitializers$7(this, _ino_extraInitializers), __runInitializers$7(this, ___ino_old_initializers, 0));
      this.flags = (__runInitializers$7(this, ___ino_old_extraInitializers), __runInitializers$7(this, _flags_initializers, 0));
      this.__padding = (__runInitializers$7(this, _flags_extraInitializers), __runInitializers$7(this, ___padding_initializers, 0));
      __runInitializers$7(this, ___padding_extraInitializers);
      if (!data)
        return;
      if (!("byteLength" in data)) {
        Object.assign(this, data);
        return;
      }
      if (data.byteLength < 58) {
        throw crit(new RangeError("Can not create an inode from a buffer less than 58 bytes"));
      }
      if (data.byteLength < __inode_sz) {
        const buf = ArrayBuffer.isView(data) ? data.buffer : data;
        const newBuffer = new Uint8Array(__inode_sz);
        newBuffer.set(new Uint8Array(buf));
        debug("Extending undersized buffer for inode");
        data = newBuffer;
      }
      deserialize(this, data);
    }
    toString() {
      return `<Inode ${this.ino}>`;
    }
    toJSON() {
      return pick(this, _inode_fields);
    }
    /**
     * Handy function that converts the Inode to a Node Stats object.
     */
    toStats() {
      return new Stats(this);
    }
    /**
     * Updates the Inode using information from the stats object. Used by file
     * systems at sync time, e.g.:
     * - Program opens file and gets a File object.
     * - Program mutates file. File object is responsible for maintaining
     *   metadata changes locally -- typically in a Stats object.
     * - Program closes file. File object's metadata changes are synced with the
     *   file system.
     * @returns whether any changes have occurred.
     */
    update(data) {
      if (!data)
        return false;
      let hasChanged = false;
      for (const key2 of _inode_fields) {
        if (data[key2] === void 0)
          continue;
        if (key2 == "ino" || key2 == "data")
          continue;
        if (this[key2] === data[key2])
          continue;
        this[key2] = data[key2];
        hasChanged = true;
      }
      return hasChanged;
    }
  };
  __setFunctionName$1(_classThis, "Inode");
  (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _data_decorators = [(_a3 = types).uint32.bind(_a3)];
    ___data_old_decorators = [(_b3 = types).uint32.bind(_b3)];
    _size_decorators = [(_c2 = types).uint32.bind(_c2)];
    _mode_decorators = [(_d = types).uint16.bind(_d)];
    _nlink_decorators = [(_e = types).uint32.bind(_e)];
    _uid_decorators = [(_f = types).uint32.bind(_f)];
    _gid_decorators = [(_g = types).uint32.bind(_g)];
    _atimeMs_decorators = [(_h = types).float64.bind(_h)];
    _birthtimeMs_decorators = [(_j = types).float64.bind(_j)];
    _mtimeMs_decorators = [(_k = types).float64.bind(_k)];
    _ctimeMs_decorators = [(_l = types).float64.bind(_l)];
    _ino_decorators = [(_m = types).uint32.bind(_m)];
    ___ino_old_decorators = [(_o = types).uint32.bind(_o)];
    _flags_decorators = [(_p = types).uint32.bind(_p)];
    ___padding_decorators = [(_q = types).uint16.bind(_q)];
    __esDecorate$7(null, null, _data_decorators, { kind: "field", name: "data", static: false, private: false, access: { has: (obj) => "data" in obj, get: (obj) => obj.data, set: (obj, value) => {
      obj.data = value;
    } }, metadata: _metadata }, _data_initializers, _data_extraInitializers);
    __esDecorate$7(null, null, ___data_old_decorators, { kind: "field", name: "__data_old", static: false, private: false, access: { has: (obj) => "__data_old" in obj, get: (obj) => obj.__data_old, set: (obj, value) => {
      obj.__data_old = value;
    } }, metadata: _metadata }, ___data_old_initializers, ___data_old_extraInitializers);
    __esDecorate$7(null, null, _size_decorators, { kind: "field", name: "size", static: false, private: false, access: { has: (obj) => "size" in obj, get: (obj) => obj.size, set: (obj, value) => {
      obj.size = value;
    } }, metadata: _metadata }, _size_initializers, _size_extraInitializers);
    __esDecorate$7(null, null, _mode_decorators, { kind: "field", name: "mode", static: false, private: false, access: { has: (obj) => "mode" in obj, get: (obj) => obj.mode, set: (obj, value) => {
      obj.mode = value;
    } }, metadata: _metadata }, _mode_initializers, _mode_extraInitializers);
    __esDecorate$7(null, null, _nlink_decorators, { kind: "field", name: "nlink", static: false, private: false, access: { has: (obj) => "nlink" in obj, get: (obj) => obj.nlink, set: (obj, value) => {
      obj.nlink = value;
    } }, metadata: _metadata }, _nlink_initializers, _nlink_extraInitializers);
    __esDecorate$7(null, null, _uid_decorators, { kind: "field", name: "uid", static: false, private: false, access: { has: (obj) => "uid" in obj, get: (obj) => obj.uid, set: (obj, value) => {
      obj.uid = value;
    } }, metadata: _metadata }, _uid_initializers, _uid_extraInitializers);
    __esDecorate$7(null, null, _gid_decorators, { kind: "field", name: "gid", static: false, private: false, access: { has: (obj) => "gid" in obj, get: (obj) => obj.gid, set: (obj, value) => {
      obj.gid = value;
    } }, metadata: _metadata }, _gid_initializers, _gid_extraInitializers);
    __esDecorate$7(null, null, _atimeMs_decorators, { kind: "field", name: "atimeMs", static: false, private: false, access: { has: (obj) => "atimeMs" in obj, get: (obj) => obj.atimeMs, set: (obj, value) => {
      obj.atimeMs = value;
    } }, metadata: _metadata }, _atimeMs_initializers, _atimeMs_extraInitializers);
    __esDecorate$7(null, null, _birthtimeMs_decorators, { kind: "field", name: "birthtimeMs", static: false, private: false, access: { has: (obj) => "birthtimeMs" in obj, get: (obj) => obj.birthtimeMs, set: (obj, value) => {
      obj.birthtimeMs = value;
    } }, metadata: _metadata }, _birthtimeMs_initializers, _birthtimeMs_extraInitializers);
    __esDecorate$7(null, null, _mtimeMs_decorators, { kind: "field", name: "mtimeMs", static: false, private: false, access: { has: (obj) => "mtimeMs" in obj, get: (obj) => obj.mtimeMs, set: (obj, value) => {
      obj.mtimeMs = value;
    } }, metadata: _metadata }, _mtimeMs_initializers, _mtimeMs_extraInitializers);
    __esDecorate$7(null, null, _ctimeMs_decorators, { kind: "field", name: "ctimeMs", static: false, private: false, access: { has: (obj) => "ctimeMs" in obj, get: (obj) => obj.ctimeMs, set: (obj, value) => {
      obj.ctimeMs = value;
    } }, metadata: _metadata }, _ctimeMs_initializers, _ctimeMs_extraInitializers);
    __esDecorate$7(null, null, _ino_decorators, { kind: "field", name: "ino", static: false, private: false, access: { has: (obj) => "ino" in obj, get: (obj) => obj.ino, set: (obj, value) => {
      obj.ino = value;
    } }, metadata: _metadata }, _ino_initializers, _ino_extraInitializers);
    __esDecorate$7(null, null, ___ino_old_decorators, { kind: "field", name: "__ino_old", static: false, private: false, access: { has: (obj) => "__ino_old" in obj, get: (obj) => obj.__ino_old, set: (obj, value) => {
      obj.__ino_old = value;
    } }, metadata: _metadata }, ___ino_old_initializers, ___ino_old_extraInitializers);
    __esDecorate$7(null, null, _flags_decorators, { kind: "field", name: "flags", static: false, private: false, access: { has: (obj) => "flags" in obj, get: (obj) => obj.flags, set: (obj, value) => {
      obj.flags = value;
    } }, metadata: _metadata }, _flags_initializers, _flags_extraInitializers);
    __esDecorate$7(null, null, ___padding_decorators, { kind: "field", name: "__padding", static: false, private: false, access: { has: (obj) => "__padding" in obj, get: (obj) => obj.__padding, set: (obj, value) => {
      obj.__padding = value;
    } }, metadata: _metadata }, ___padding_initializers, ___padding_extraInitializers);
    __esDecorate$7(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers$7(_classThis, _classExtraInitializers);
  })();
  return _classThis;
})();
const __inode_sz = sizeof(Inode);
const n1000 = BigInt(1e3);
class StatsCommon {
  _convert(arg) {
    return this._isBigint ? BigInt(arg) : Number(arg);
  }
  get blocks() {
    return this._convert(Math.ceil(Number(this.size) / 512));
  }
  set blocks(value) {
  }
  get atime() {
    return new Date(Number(this.atimeMs));
  }
  set atime(value) {
    this.atimeMs = this._convert(value.getTime());
  }
  get mtime() {
    return new Date(Number(this.mtimeMs));
  }
  set mtime(value) {
    this.mtimeMs = this._convert(value.getTime());
  }
  get ctime() {
    return new Date(Number(this.ctimeMs));
  }
  set ctime(value) {
    this.ctimeMs = this._convert(value.getTime());
  }
  get birthtime() {
    return new Date(Number(this.birthtimeMs));
  }
  set birthtime(value) {
    this.birthtimeMs = this._convert(value.getTime());
  }
  /**
   * Creates a new stats instance from a stats-like object. Can be used to copy stats (note)
   */
  constructor({ atimeMs, mtimeMs, ctimeMs, birthtimeMs, uid, gid, size, mode, ino, ...rest } = {}) {
    this.dev = this._convert(0);
    this.ino = this._convert(0);
    this.rdev = this._convert(0);
    this.nlink = this._convert(1);
    this.blksize = this._convert(4096);
    this.uid = this._convert(0);
    this.gid = this._convert(0);
    const now = Date.now();
    this.atimeMs = this._convert(atimeMs !== null && atimeMs !== void 0 ? atimeMs : now);
    this.mtimeMs = this._convert(mtimeMs !== null && mtimeMs !== void 0 ? mtimeMs : now);
    this.ctimeMs = this._convert(ctimeMs !== null && ctimeMs !== void 0 ? ctimeMs : now);
    this.birthtimeMs = this._convert(birthtimeMs !== null && birthtimeMs !== void 0 ? birthtimeMs : now);
    this.uid = this._convert(uid !== null && uid !== void 0 ? uid : 0);
    this.gid = this._convert(gid !== null && gid !== void 0 ? gid : 0);
    this.size = this._convert(size !== null && size !== void 0 ? size : 0);
    this.ino = this._convert(ino !== null && ino !== void 0 ? ino : 0);
    this.mode = this._convert(mode !== null && mode !== void 0 ? mode : 420 & S_IFREG);
    if ((this.mode & S_IFMT) == 0) {
      this.mode = this.mode | this._convert(S_IFREG);
    }
    Object.assign(this, rest);
  }
  isFile() {
    return (this.mode & S_IFMT) === S_IFREG;
  }
  isDirectory() {
    return (this.mode & S_IFMT) === S_IFDIR;
  }
  isSymbolicLink() {
    return (this.mode & S_IFMT) === S_IFLNK;
  }
  isSocket() {
    return (this.mode & S_IFMT) === S_IFSOCK;
  }
  isBlockDevice() {
    return (this.mode & S_IFMT) === S_IFBLK;
  }
  isCharacterDevice() {
    return (this.mode & S_IFMT) === S_IFCHR;
  }
  isFIFO() {
    return (this.mode & S_IFMT) === S_IFIFO;
  }
  toJSON() {
    return pick(this, _inode_fields);
  }
  /**
   * Checks if a given user/group has access to this item
   * @param mode The requested access, combination of W_OK, R_OK, and X_OK
   * @returns True if the request has access, false if the request does not
   * @internal
   */
  hasAccess(mode, context) {
    const creds = (context === null || context === void 0 ? void 0 : context.credentials) || credentials;
    if (this.isSymbolicLink() || creds.euid === 0 || creds.egid === 0)
      return true;
    let perm = 0;
    if (creds.uid === this.uid) {
      if (this.mode & S_IRUSR)
        perm |= R_OK;
      if (this.mode & S_IWUSR)
        perm |= W_OK;
      if (this.mode & S_IXUSR)
        perm |= X_OK;
    }
    if (creds.gid === this.gid || creds.groups.includes(Number(this.gid))) {
      if (this.mode & S_IRGRP)
        perm |= R_OK;
      if (this.mode & S_IWGRP)
        perm |= W_OK;
      if (this.mode & S_IXGRP)
        perm |= X_OK;
    }
    if (this.mode & S_IROTH)
      perm |= R_OK;
    if (this.mode & S_IWOTH)
      perm |= W_OK;
    if (this.mode & S_IXOTH)
      perm |= X_OK;
    return (perm & mode) === mode;
  }
  /* node:coverage disable */
  /**
   * Change the mode of the file.
   * We use this helper function to prevent messing up the type of the file.
   * @internal @deprecated
   */
  chmod(mode) {
    log_deprecated("StatsCommon#chmod");
    this.mode = this._convert(this.mode & S_IFMT | mode);
  }
  /**
   * Change the owner user/group of the file.
   * This function makes sure it is a valid UID/GID (that is, a 32 unsigned int)
   * @internal @deprecated
   */
  chown(uid, gid) {
    log_deprecated("StatsCommon#chown");
    uid = Number(uid);
    gid = Number(gid);
    if (!isNaN(uid) && 0 <= uid && uid < 2 ** 32) {
      this.uid = this._convert(uid);
    }
    if (!isNaN(gid) && 0 <= gid && gid < 2 ** 32) {
      this.gid = this._convert(gid);
    }
  }
  /* node:coverage enable */
  get atimeNs() {
    return BigInt(this.atimeMs) * n1000;
  }
  get mtimeNs() {
    return BigInt(this.mtimeMs) * n1000;
  }
  get ctimeNs() {
    return BigInt(this.ctimeMs) * n1000;
  }
  get birthtimeNs() {
    return BigInt(this.birthtimeMs) * n1000;
  }
}
function _chown(stats, uid, gid) {
  if (!isNaN(uid) && 0 <= uid && uid < size_max) {
    stats.uid = uid;
  }
  if (!isNaN(gid) && 0 <= gid && gid < 2 ** 32) {
    stats.gid = gid;
  }
}
class Stats extends StatsCommon {
  constructor() {
    super(...arguments);
    this._isBigint = false;
  }
}
class BigIntStats extends StatsCommon {
  constructor() {
    super(...arguments);
    this._isBigint = true;
  }
}
function isStatsEqual(left, right) {
  return left.size == right.size && +left.atime == +right.atime && +left.mtime == +right.mtime && +left.ctime == +right.ctime && left.mode == right.mode;
}
class StatsFs {
  constructor() {
    this.type = 525687744115;
    this.bsize = 4096;
    this.blocks = 0;
    this.bfree = 0;
    this.bavail = 0;
    this.files = size_max;
    this.ffree = size_max;
  }
}
class BigIntStatsFs {
  constructor() {
    this.type = BigInt("0x7a656e6673");
    this.bsize = BigInt(4096);
    this.blocks = BigInt(0);
    this.bfree = BigInt(0);
    this.bavail = BigInt(0);
    this.files = BigInt(size_max);
    this.ffree = BigInt(size_max);
  }
}
const config = {
  /**
   * Whether to perform access checks
   */
  checkAccess: true,
  /**
   * Whether to mark a file as dirty after updating its `atime` when read from
   */
  updateOnRead: true,
  /**
   * Whether to immediately sync when files are changed
   */
  syncImmediately: true,
  /**
   * If a file's buffer is not large enough to store content when writing and the buffer can't be resized, reuse the buffer passed to write()
   */
  unsafeBufferReplace: false
};
var _a$1, _b$1, _c;
(_a$1 = Promise.withResolvers) !== null && _a$1 !== void 0 ? _a$1 : Promise.withResolvers = (warn("Using a polyfill of Promise.withResolvers"), function() {
  let _resolve2, _reject;
  const promise = new Promise((resolve2, reject) => {
    _resolve2 = resolve2;
    _reject = reject;
  });
  return { promise, resolve: _resolve2, reject: _reject };
});
(_b$1 = Symbol["dispose"]) !== null && _b$1 !== void 0 ? _b$1 : Symbol["dispose"] = (warn("Using a polyfill of Symbol.dispose"), Symbol("Symbol.dispose"));
(_c = Symbol["asyncDispose"]) !== null && _c !== void 0 ? _c : Symbol["asyncDispose"] = (warn("Using a polyfill of Symbol.asyncDispose"), Symbol("Symbol.asyncDispose"));
const maxByteLength = 65535;
const validFlags = ["r", "r+", "rs", "rs+", "w", "wx", "w+", "wx+", "a", "ax", "a+", "ax+"];
function parseFlag(flag) {
  if (typeof flag === "number") {
    return flagToString(flag);
  }
  if (!validFlags.includes(flag)) {
    throw new Error("Invalid flag string: " + flag);
  }
  return flag;
}
function flagToString(flag) {
  switch (flag) {
    case O_RDONLY:
      return "r";
    case O_RDONLY | O_SYNC:
      return "rs";
    case O_RDWR:
      return "r+";
    case O_RDWR | O_SYNC:
      return "rs+";
    case O_TRUNC | O_CREAT | O_WRONLY:
      return "w";
    case O_TRUNC | O_CREAT | O_WRONLY | O_EXCL:
      return "wx";
    case O_TRUNC | O_CREAT | O_RDWR:
      return "w+";
    case O_TRUNC | O_CREAT | O_RDWR | O_EXCL:
      return "wx+";
    case O_APPEND | O_CREAT | O_WRONLY:
      return "a";
    case O_APPEND | O_CREAT | O_WRONLY | O_EXCL:
      return "ax";
    case O_APPEND | O_CREAT | O_RDWR:
      return "a+";
    case O_APPEND | O_CREAT | O_RDWR | O_EXCL:
      return "ax+";
    default:
      throw new Error("Invalid flag number: " + flag);
  }
}
function flagToMode(flag) {
  let mode = 0;
  mode <<= 1;
  mode += +isReadable(flag);
  mode <<= 1;
  mode += +isWriteable(flag);
  mode <<= 1;
  return mode;
}
function isReadable(flag) {
  return flag.indexOf("r") !== -1 || flag.indexOf("+") !== -1;
}
function isWriteable(flag) {
  return flag.indexOf("w") !== -1 || flag.indexOf("a") !== -1 || flag.indexOf("+") !== -1;
}
function isTruncating(flag) {
  return flag.indexOf("w") !== -1;
}
function isAppendable(flag) {
  return flag.indexOf("a") !== -1;
}
function isExclusive(flag) {
  return flag.indexOf("x") !== -1;
}
class File {
  constructor(fs2, path) {
    this.fs = fs2;
    this.path = path;
  }
  async [Symbol.asyncDispose]() {
    await this.close();
  }
  [Symbol.dispose]() {
    this.closeSync();
  }
  /**
   * Default implementation maps to `sync`.
   */
  datasync() {
    return this.sync();
  }
  /**
   * Default implementation maps to `syncSync`.
   */
  datasyncSync() {
    return this.syncSync();
  }
}
class PreloadFile extends File {
  /**
   * Creates a file with `path` and, optionally, the given contents.
   * Note that, if contents is specified, it will be mutated by the file.
   */
  constructor(fs2, path, flag, stats, _buffer = new Uint8Array(new ArrayBuffer(0, fs2.attributes.has("no_buffer_resize") ? {} : { maxByteLength }))) {
    super(fs2, path);
    this.flag = flag;
    this.stats = stats;
    this._buffer = _buffer;
    this._position = 0;
    this.dirty = false;
    this.closed = false;
    if (this.stats.size == _buffer.byteLength)
      return;
    if (!isWriteable(this.flag)) {
      throw err$2(new ErrnoError(Errno.EIO, `Size mismatch: buffer length ${_buffer.byteLength}, stats size ${this.stats.size}`, path));
    }
    this.stats.size = _buffer.byteLength;
    this.dirty = true;
  }
  /**
   * Get the underlying buffer for this file. Mutating not recommended and will mess up dirty tracking.
   */
  get buffer() {
    return this._buffer;
  }
  /**
   * Get the current file position.
   *
   * We emulate the following bug mentioned in the Node documentation:
   *
   * On Linux, positional writes don't work when the file is opened in append mode.
   * The kernel ignores the position argument and always appends the data to the end of the file.
   * @returns The current file position.
   */
  get position() {
    if (isAppendable(this.flag)) {
      return this.stats.size;
    }
    return this._position;
  }
  set position(value) {
    this._position = value;
  }
  async sync() {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "sync");
    if (!this.dirty)
      return;
    if (!this.fs.attributes.has("no_write"))
      await this.fs.sync(this.path, this._buffer, this.stats);
    this.dirty = false;
  }
  syncSync() {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "sync");
    if (!this.dirty)
      return;
    if (!this.fs.attributes.has("no_write"))
      this.fs.syncSync(this.path, this._buffer, this.stats);
    this.dirty = false;
  }
  async close() {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "close");
    await this.sync();
    this.dispose();
  }
  closeSync() {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "close");
    this.syncSync();
    this.dispose();
  }
  /**
   * Cleans up. This will *not* sync the file data to the FS
   */
  dispose(force) {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "dispose");
    if (this.dirty && !force) {
      throw ErrnoError.With("EBUSY", this.path, "dispose");
    }
    this.closed = true;
  }
  stat() {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "stat");
    return Promise.resolve(new Stats(this.stats));
  }
  statSync() {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "stat");
    return new Stats(this.stats);
  }
  _truncate(length) {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "truncate");
    this.dirty = true;
    if (!isWriteable(this.flag)) {
      throw new ErrnoError(Errno.EPERM, "File not opened with a writeable mode");
    }
    this.stats.mtimeMs = Date.now();
    if (length > this._buffer.length) {
      const data = new Uint8Array(length - this._buffer.length);
      this._write(data, 0, data.length, this._buffer.length);
      return;
    }
    this.stats.size = length;
    this._buffer = length ? this._buffer.subarray(0, length) : new Uint8Array();
  }
  async truncate(length) {
    this._truncate(length);
    if (config.syncImmediately)
      await this.sync();
  }
  truncateSync(length) {
    this._truncate(length);
    if (config.syncImmediately)
      this.syncSync();
  }
  _write(buffer2, offset = 0, length = buffer2.byteLength - offset, position = this.position) {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "write");
    if (!isWriteable(this.flag)) {
      throw new ErrnoError(Errno.EPERM, "File not opened with a writeable mode");
    }
    this.dirty = true;
    const end = position + length;
    const slice = buffer2.subarray(offset, offset + length);
    this._buffer = extendBuffer(this._buffer, end);
    if (end > this.stats.size)
      this.stats.size = end;
    this._buffer.set(slice, position);
    this.stats.mtimeMs = Date.now();
    this.position = position + slice.byteLength;
    return slice.byteLength;
  }
  /**
   * Write buffer to the file.
   * @param buffer Uint8Array containing the data to write to the file.
   * @param offset Offset in the buffer to start reading data from.
   * @param length The amount of bytes to write to the file.
   * @param position Offset from the beginning of the file where this data should be written.
   * If position is null, the data will be written at  the current position.
   */
  async write(buffer2, offset, length, position) {
    const bytesWritten = this._write(buffer2, offset, length, position);
    if (config.syncImmediately)
      await this.sync();
    return bytesWritten;
  }
  /**
   * Write buffer to the file.
   * @param buffer Uint8Array containing the data to write to the file.
   * @param offset Offset in the buffer to start reading data from.
   * @param length The amount of bytes to write to the file.
   * @param position Offset from the beginning of the file where this data should be written.
   * If position is null, the data will be written at  the current position.
   * @returns bytes written
   */
  writeSync(buffer2, offset, length, position) {
    const bytesWritten = this._write(buffer2, offset, length, position);
    if (config.syncImmediately)
      this.syncSync();
    return bytesWritten;
  }
  _read(buffer2, offset = 0, length = buffer2.byteLength - offset, position) {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "read");
    if (!isReadable(this.flag)) {
      throw new ErrnoError(Errno.EPERM, "File not opened with a readable mode");
    }
    if (config.updateOnRead) {
      this.dirty = true;
    }
    this.stats.atimeMs = Date.now();
    position !== null && position !== void 0 ? position : position = this.position;
    let end = position + length;
    if (end > this.stats.size) {
      end = position + Math.max(this.stats.size - position, 0);
    }
    this._position = end;
    const bytesRead = end - position;
    if (bytesRead == 0) {
      return bytesRead;
    }
    const slice = this._buffer.subarray(position, end);
    new Uint8Array(buffer2.buffer, buffer2.byteOffset, buffer2.byteLength).set(slice, offset);
    return bytesRead;
  }
  /**
   * Read data from the file.
   * @param buffer The buffer that the data will be written to.
   * @param offset The offset within the buffer where writing will start.
   * @param length An integer specifying the number of bytes to read.
   * @param position An integer specifying where to begin reading from in the file.
   * If position is null, data will be read from the current file position.
   */
  async read(buffer2, offset, length, position) {
    const bytesRead = this._read(buffer2, offset, length, position);
    if (config.syncImmediately)
      await this.sync();
    return { bytesRead, buffer: buffer2 };
  }
  /**
   * Read data from the file.
   * @param buffer The buffer that the data will be written to.
   * @param offset The offset within the buffer where writing will start.
   * @param length An integer specifying the number of bytes to read.
   * @param position An integer specifying where to begin reading from in the file.
   * If position is null, data will be read from the current file position.
   * @returns number of bytes written
   */
  readSync(buffer2, offset, length, position) {
    const bytesRead = this._read(buffer2, offset, length, position);
    if (config.syncImmediately)
      this.syncSync();
    return bytesRead;
  }
  async chmod(mode) {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "chmod");
    this.dirty = true;
    this.stats.mode = this.stats.mode & (mode > S_IFMT ? -61441 : S_IFMT) | mode;
    if (config.syncImmediately || mode > S_IFMT)
      await this.sync();
  }
  chmodSync(mode) {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "chmod");
    this.dirty = true;
    this.stats.mode = this.stats.mode & (mode > S_IFMT ? -61441 : S_IFMT) | mode;
    if (config.syncImmediately || mode > S_IFMT)
      this.syncSync();
  }
  async chown(uid, gid) {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "chown");
    this.dirty = true;
    _chown(this.stats, uid, gid);
    if (config.syncImmediately)
      await this.sync();
  }
  chownSync(uid, gid) {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "chown");
    this.dirty = true;
    _chown(this.stats, uid, gid);
    if (config.syncImmediately)
      this.syncSync();
  }
  async utimes(atime, mtime) {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "utimes");
    this.dirty = true;
    this.stats.atimeMs = atime;
    this.stats.mtimeMs = mtime;
    if (config.syncImmediately)
      await this.sync();
  }
  utimesSync(atime, mtime) {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "utimes");
    this.dirty = true;
    this.stats.atimeMs = atime;
    this.stats.mtimeMs = mtime;
    if (config.syncImmediately)
      this.syncSync();
  }
}
class LazyFile extends File {
  /**
   * Get the current file position.
   *
   * We emulate the following bug mentioned in the Node documentation:
   *
   * On Linux, positional writes don't work when the file is opened in append mode.
   * The kernel ignores the position argument and always appends the data to the end of the file.
   * @returns The current file position.
   */
  get position() {
    return isAppendable(this.flag) ? this.stats.size : this._position;
  }
  set position(value) {
    this._position = value;
  }
  /**
   * Creates a file with `path` and, optionally, the given contents.
   * Note that, if contents is specified, it will be mutated by the file.
   */
  constructor(fs2, path, flag, stats) {
    super(fs2, path);
    this.flag = flag;
    this.stats = stats;
    this._position = 0;
    this.dirty = false;
    this.closed = false;
  }
  async sync() {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "sync");
    if (!this.dirty)
      return;
    if (!this.fs.attributes.has("no_write"))
      await this.fs.sync(this.path, void 0, this.stats);
    this.dirty = false;
  }
  syncSync() {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "sync");
    if (!this.dirty)
      return;
    if (!this.fs.attributes.has("no_write"))
      this.fs.syncSync(this.path, void 0, this.stats);
    this.dirty = false;
  }
  async close() {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "close");
    await this.sync();
    this.dispose();
  }
  closeSync() {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "close");
    this.syncSync();
    this.dispose();
  }
  /**
   * Cleans up. This will *not* sync the file data to the FS
   */
  dispose(force) {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "dispose");
    if (this.dirty && !force)
      throw ErrnoError.With("EBUSY", this.path, "dispose");
    this.closed = true;
  }
  stat() {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "stat");
    return Promise.resolve(new Stats(this.stats));
  }
  statSync() {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "stat");
    return new Stats(this.stats);
  }
  async truncate(length) {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "truncate");
    this.dirty = true;
    if (!isWriteable(this.flag)) {
      throw new ErrnoError(Errno.EPERM, "File not opened with a writeable mode");
    }
    this.stats.mtimeMs = Date.now();
    this.stats.size = length;
    if (config.syncImmediately)
      await this.sync();
  }
  truncateSync(length) {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "truncate");
    this.dirty = true;
    if (!isWriteable(this.flag)) {
      throw new ErrnoError(Errno.EPERM, "File not opened with a writeable mode");
    }
    this.stats.mtimeMs = Date.now();
    this.stats.size = length;
    if (config.syncImmediately)
      this.syncSync();
  }
  prepareWrite(buffer2, offset, length, position) {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "write");
    if (!isWriteable(this.flag)) {
      throw new ErrnoError(Errno.EPERM, "File not opened with a writeable mode");
    }
    this.dirty = true;
    const end = position + length;
    const slice = buffer2.subarray(offset, offset + length);
    if (end > this.stats.size)
      this.stats.size = end;
    this.stats.mtimeMs = Date.now();
    this._position = position + slice.byteLength;
    return slice;
  }
  /**
   * Write buffer to the file.
   * @param buffer Uint8Array containing the data to write to the file.
   * @param offset Offset in the buffer to start reading data from.
   * @param length The amount of bytes to write to the file.
   * @param position Offset from the beginning of the file where this data should be written.
   * If position is null, the data will be written at  the current position.
   */
  async write(buffer2, offset = 0, length = buffer2.byteLength - offset, position = this.position) {
    const slice = this.prepareWrite(buffer2, offset, length, position);
    await this.fs.write(this.path, slice, position);
    if (config.syncImmediately)
      await this.sync();
    return slice.byteLength;
  }
  /**
   * Write buffer to the file.
   * @param buffer Uint8Array containing the data to write to the file.
   * @param offset Offset in the buffer to start reading data from.
   * @param length The amount of bytes to write to the file.
   * @param position Offset from the beginning of the file where this data should be written.
   * If position is null, the data will be written at  the current position.
   * @returns bytes written
   */
  writeSync(buffer2, offset = 0, length = buffer2.byteLength - offset, position = this.position) {
    const slice = this.prepareWrite(buffer2, offset, length, position);
    this.fs.writeSync(this.path, slice, position);
    if (config.syncImmediately)
      this.syncSync();
    return slice.byteLength;
  }
  /**
   * Computes position information for reading
   */
  prepareRead(length, position) {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "read");
    if (!isReadable(this.flag))
      throw new ErrnoError(Errno.EPERM, "File not opened with a readable mode");
    if (config.updateOnRead)
      this.dirty = true;
    this.stats.atimeMs = Date.now();
    let end = position + length;
    if (end > this.stats.size) {
      end = position + Math.max(this.stats.size - position, 0);
    }
    this._position = end;
    return end;
  }
  /**
   * Read data from the file.
   * @param buffer The buffer that the data will be written to.
   * @param offset The offset within the buffer where writing will start.
   * @param length An integer specifying the number of bytes to read.
   * @param position An integer specifying where to begin reading from in the file.
   * If position is unset, data will be read from the current file position.
   */
  async read(buffer2, offset = 0, length = buffer2.byteLength - offset, position = this.position) {
    const end = this.prepareRead(length, position);
    const uint8 = new Uint8Array(buffer2.buffer, buffer2.byteOffset, buffer2.byteLength);
    await this.fs.read(this.path, uint8.subarray(offset, offset + length), position, end);
    if (config.syncImmediately)
      await this.sync();
    return { bytesRead: end - position, buffer: buffer2 };
  }
  /**
   * Read data from the file.
   * @param buffer The buffer that the data will be written to.
   * @param offset The offset within the buffer where writing will start.
   * @param length An integer specifying the number of bytes to read.
   * @param position An integer specifying where to begin reading from in the file.
   * If position is null, data will be read from the current file position.
   * @returns number of bytes written
   */
  readSync(buffer2, offset = 0, length = buffer2.byteLength - offset, position = this.position) {
    const end = this.prepareRead(length, position);
    const uint8 = new Uint8Array(buffer2.buffer, buffer2.byteOffset, buffer2.byteLength);
    this.fs.readSync(this.path, uint8.subarray(offset, offset + length), position, end);
    if (config.syncImmediately)
      this.syncSync();
    return end - position;
  }
  async chmod(mode) {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "chmod");
    this.dirty = true;
    this.stats.mode = this.stats.mode & (mode > S_IFMT ? -61441 : S_IFMT) | mode;
    if (config.syncImmediately || mode > S_IFMT)
      await this.sync();
  }
  chmodSync(mode) {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "chmod");
    this.dirty = true;
    this.stats.mode = this.stats.mode & (mode > S_IFMT ? -61441 : S_IFMT) | mode;
    if (config.syncImmediately || mode > S_IFMT)
      this.syncSync();
  }
  async chown(uid, gid) {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "chown");
    this.dirty = true;
    _chown(this.stats, uid, gid);
    if (config.syncImmediately)
      await this.sync();
  }
  chownSync(uid, gid) {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "chown");
    this.dirty = true;
    _chown(this.stats, uid, gid);
    if (config.syncImmediately)
      this.syncSync();
  }
  async utimes(atime, mtime) {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "utimes");
    this.dirty = true;
    this.stats.atimeMs = atime;
    this.stats.mtimeMs = mtime;
    if (config.syncImmediately)
      await this.sync();
  }
  utimesSync(atime, mtime) {
    if (this.closed)
      throw ErrnoError.With("EBADF", this.path, "utimes");
    this.dirty = true;
    this.stats.atimeMs = atime;
    this.stats.mtimeMs = mtime;
    if (config.syncImmediately)
      this.syncSync();
  }
}
const _chunkSize = 4096;
class FileSystem {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.attributes = /* @__PURE__ */ new Map();
    if (this.streamRead === FileSystem.prototype.streamRead)
      this.attributes.set("default_stream_read");
    if (this.streamWrite === FileSystem.prototype.streamWrite)
      this.attributes.set("default_stream_write");
  }
  toString() {
    var _a3;
    return `${this.name} ${(_a3 = this.label) !== null && _a3 !== void 0 ? _a3 : ""} (${this._mountPoint ? "mounted on " + this._mountPoint : "unmounted"})`;
  }
  /**
   * Default implementation.
   * @todo Implement
   * @experimental
   */
  usage() {
    return {
      totalSpace: 0,
      freeSpace: 0
    };
  }
  /* node:coverage disable */
  /**
   * Get metadata about the current file system
   * @deprecated
   */
  metadata() {
    return {
      ...this.usage(),
      name: this.name,
      readonly: this.attributes.has("no_write"),
      noResizableBuffers: this.attributes.has("no_buffer_resize"),
      noAsyncCache: this.attributes.has("no_async"),
      features: Array.from(this.attributes.keys()),
      type: this.id
    };
  }
  /* node:coverage enable */
  async ready() {
  }
  /**
   * Test whether or not `path` exists.
   */
  async exists(path) {
    try {
      await this.stat(path);
      return true;
    } catch (e) {
      return e.code != "ENOENT";
    }
  }
  /**
   * Test whether or not `path` exists.
   */
  existsSync(path) {
    try {
      this.statSync(path);
      return true;
    } catch (e) {
      return e.code != "ENOENT";
    }
  }
  /**
   * Read a file using a stream.
   * @privateRemarks The default implementation of `streamRead` uses "chunked" `read`s
   */
  streamRead(path, options) {
    return new ReadableStream({
      start: async (controller) => {
        const { size } = await this.stat(path);
        const { start = 0, end = size } = options;
        for (let offset = start; offset < end; offset += _chunkSize) {
          const bytesRead = offset + _chunkSize > end ? end - offset : _chunkSize;
          const buffer2 = new Uint8Array(bytesRead);
          await this.read(path, buffer2, offset, offset + bytesRead).catch(controller.error.bind(controller));
          controller.enqueue(buffer2);
        }
        controller.close();
      },
      type: "bytes"
    });
  }
  /**
   * Write a file using stream.
   * @privateRemarks The default implementation of `streamWrite` uses "chunked" `write`s
   */
  streamWrite(path, options) {
    var _a3;
    let position = (_a3 = options.start) !== null && _a3 !== void 0 ? _a3 : 0;
    return new WritableStream({
      write: async (chunk, controller) => {
        await this.write(path, chunk, position).catch(controller.error.bind(controller));
        position += chunk.byteLength;
      }
    });
  }
}
const version$2 = 1;
class Index extends Map {
  constructor() {
    super(...arguments);
    this.maxSize = size_max;
  }
  /**
   * Converts the index to JSON
   */
  toJSON() {
    return {
      version: version$2,
      maxSize: this.maxSize,
      entries: Object.fromEntries([...this].map(([k, v]) => [k, v.toJSON()]))
    };
  }
  /**
   * Converts the index to a string
   */
  toString() {
    return JSON.stringify(this.toJSON());
  }
  /**
   * Get the size in bytes of the index (including the size reported for each entry)
   */
  get byteSize() {
    let size = this.size * __inode_sz;
    for (const entry of this.values())
      size += entry.size;
    return size;
  }
  usage() {
    return {
      totalSpace: this.maxSize,
      freeSpace: this.maxSize - this.byteSize
    };
  }
  pathOf(id) {
    for (const [path, inode] of this) {
      if (inode.ino == id || inode.data == id)
        return path;
    }
  }
  getByID(id) {
    var _a3;
    return (_a3 = this.entryByID(id)) === null || _a3 === void 0 ? void 0 : _a3.inode;
  }
  entryByID(id) {
    for (const [path, inode] of this) {
      if (inode.ino == id || inode.data == id)
        return { path, inode };
    }
  }
  directoryEntries(path) {
    const node = this.get(path);
    if (!node)
      throw ErrnoError.With("ENOENT", path);
    if ((node.mode & S_IFMT) != S_IFDIR)
      throw ErrnoError.With("ENOTDIR", path);
    const entries2 = {};
    for (const entry of this.keys()) {
      if (dirname(entry) == path && entry != path) {
        entries2[basename(entry)] = this.get(entry).ino;
      }
    }
    return entries2;
  }
  /**
   * Get the next available ID in the index
   * @internal
   */
  _alloc() {
    return Math.max(...[...this.values()].flatMap((i) => [i.ino, i.data])) + 1;
  }
  /**
   * Gets a list of entries for each directory in the index.
   * Use
   */
  directories() {
    const dirs = /* @__PURE__ */ new Map();
    for (const [path, node] of this) {
      if ((node.mode & S_IFMT) != S_IFDIR)
        continue;
      const entries2 = {};
      for (const entry of this.keys()) {
        if (dirname(entry) == path && entry != path)
          entries2[basename(entry)] = this.get(entry).ino;
      }
      dirs.set(path, entries2);
    }
    return dirs;
  }
  /**
   * Loads the index from JSON data
   */
  fromJSON(json) {
    var _a3;
    if (json.version != version$2) {
      throw new ErrnoError(Errno.EINVAL, "Index version mismatch");
    }
    this.clear();
    for (const [path, node] of Object.entries(json.entries)) {
      (_a3 = node.data) !== null && _a3 !== void 0 ? _a3 : node.data = randomInt(1, size_max);
      if (path == "/")
        node.ino = 0;
      this.set(path, new Inode(node));
    }
    return this;
  }
  /**
   * Parses an index from a string
   */
  static parse(data) {
    if (!isJSON(data))
      throw new ErrnoError(Errno.EINVAL, "Invalid JSON");
    const json = JSON.parse(data);
    const index = new Index();
    index.fromJSON(json);
    return index;
  }
}
function encodeRaw(input) {
  if (typeof input != "string") {
    throw new ErrnoError(Errno.EINVAL, "Can not encode a non-string");
  }
  return new Uint8Array(Array.from(input).map((char) => char.charCodeAt(0)));
}
function decodeRaw(input) {
  if (!(input instanceof Uint8Array)) {
    throw new ErrnoError(Errno.EINVAL, "Can not decode a non-Uint8Array");
  }
  return Array.from(input).map((char) => String.fromCharCode(char)).join("");
}
const encoder = new TextEncoder();
function encodeUTF8(input) {
  if (typeof input != "string") {
    throw new ErrnoError(Errno.EINVAL, "Can not encode a non-string");
  }
  return encoder.encode(input);
}
const decoder = new TextDecoder();
function decodeUTF8(input) {
  if (!(input instanceof Uint8Array)) {
    throw new ErrnoError(Errno.EINVAL, "Can not decode a non-Uint8Array");
  }
  return decoder.decode(input);
}
function decodeDirListing(data) {
  return JSON.parse(decodeUTF8(data), (k, v) => k == "" ? v : typeof v == "string" ? BigInt(v).toString(16).slice(0, Math.min(v.length, 8)) : v);
}
function encodeDirListing(data) {
  return encodeUTF8(JSON.stringify(data));
}
function normalizeMode(mode, def) {
  if (typeof mode == "number")
    return mode;
  if (typeof mode == "string") {
    const parsed = parseInt(mode, 8);
    if (!isNaN(parsed)) {
      return parsed;
    }
  }
  if (typeof def == "number")
    return def;
  throw new ErrnoError(Errno.EINVAL, "Invalid mode: " + (mode === null || mode === void 0 ? void 0 : mode.toString()));
}
function normalizeTime(time) {
  if (time instanceof Date)
    return time.getTime();
  try {
    return Number(time);
  } catch {
    throw new ErrnoError(Errno.EINVAL, "Invalid time.");
  }
}
function normalizePath(p, noResolve = false) {
  if (p instanceof URL) {
    if (p.protocol != "file:")
      throw new ErrnoError(Errno.EINVAL, "URLs must use the file: protocol");
    p = p.pathname;
  }
  p = p.toString();
  if (p.startsWith("file://"))
    p = p.slice("file://".length);
  if (p.includes("\0")) {
    throw new ErrnoError(Errno.EINVAL, "Path can not contain null character");
  }
  if (p.length == 0) {
    throw new ErrnoError(Errno.EINVAL, "Path can not be empty");
  }
  p = p.replaceAll(/[/\\]+/g, "/");
  return noResolve ? p : resolve(p);
}
function normalizeOptions(options, encoding = "utf8", flag, mode = 0) {
  if (typeof options != "object" || options === null) {
    return {
      encoding: typeof options == "string" ? options : encoding !== null && encoding !== void 0 ? encoding : null,
      flag,
      mode
    };
  }
  return {
    encoding: typeof (options === null || options === void 0 ? void 0 : options.encoding) == "string" ? options.encoding : encoding !== null && encoding !== void 0 ? encoding : null,
    flag: typeof (options === null || options === void 0 ? void 0 : options.flag) == "string" ? options.flag : flag,
    mode: normalizeMode("mode" in options ? options === null || options === void 0 ? void 0 : options.mode : null, mode)
  };
}
class Resource {
  constructor(id, _size, options, resources) {
    __publicField(this, "id");
    __publicField(this, "_size");
    __publicField(this, "options");
    /** Regions used to reduce unneeded allocations. Think of sparse arrays. */
    __publicField(this, "regions", []);
    this.id = id;
    this._size = _size;
    this.options = options;
    options.sparse ?? (options.sparse = true);
    if (!options.sparse)
      this.regions.push({ offset: 0, data: new Uint8Array(_size), ranges: [] });
    resources == null ? void 0 : resources.set(id, this);
  }
  /** The full size of the resource */
  get size() {
    return this._size;
  }
  set size(value) {
    if (value >= this._size) {
      this._size = value;
      return;
    }
    this._size = value;
    for (let i = this.regions.length - 1; i >= 0; i--) {
      const region = this.regions[i];
      if (region.offset >= value) {
        this.regions.splice(i, 1);
        continue;
      }
      const maxLength = value - region.offset;
      if (region.data.byteLength > maxLength) {
        region.data = region.data.subarray(0, maxLength);
      }
      region.ranges = region.ranges.filter((range) => range.start < value).map((range) => {
        if (range.end > value) {
          return { start: range.start, end: value };
        }
        return range;
      });
    }
  }
  /** Combines adjacent regions and combines adjacent ranges within a region */
  collect() {
    if (!this.options.sparse)
      return;
    const { regionGapThreshold = 4095 } = this.options;
    for (let i = 0; i < this.regions.length - 1; ) {
      const current = this.regions[i];
      const next = this.regions[i + 1];
      if (next.offset - (current.offset + current.data.byteLength) > regionGapThreshold) {
        i++;
        continue;
      }
      current.ranges.push(...next.ranges);
      current.ranges.sort((a, b) => a.start - b.start);
      current.ranges = current.ranges.reduce((acc, range) => {
        if (!acc.length || acc.at(-1).end < range.start) {
          acc.push(range);
        } else {
          acc.at(-1).end = Math.max(acc.at(-1).end, range.end);
        }
        return acc;
      }, []);
      current.data = extendBuffer(current.data, next.offset + next.data.byteLength);
      current.data.set(next.data, next.offset - current.offset);
      this.regions.splice(i + 1, 1);
    }
  }
  /** Takes an initial range and finds the sub-ranges that are not in the cache */
  missing(start, end) {
    const missingRanges = [];
    for (const region of this.regions) {
      if (region.offset >= end)
        break;
      for (const range of region.ranges) {
        if (range.end <= start)
          continue;
        if (range.start >= end)
          break;
        if (range.start > start) {
          missingRanges.push({ start, end: Math.min(range.start, end) });
        }
        if (range.end > start)
          start = Math.max(start, range.end);
        if (start >= end)
          break;
      }
      if (start >= end)
        break;
    }
    if (start < end)
      missingRanges.push({ start, end });
    return missingRanges;
  }
  /**
   * Get the cached sub-ranges of an initial range.
   * This is conceptually the inverse of `missing`.
   */
  cached(start, end) {
    const cachedRanges = [];
    for (const region of this.regions) {
      if (region.offset >= end)
        break;
      for (const range of region.ranges) {
        if (range.end <= start)
          continue;
        if (range.start >= end)
          break;
        cachedRanges.push({
          start: Math.max(start, range.start),
          end: Math.min(end, range.end)
        });
      }
    }
    cachedRanges.sort((a, b) => a.start - b.start);
    const merged = [];
    for (const curr of cachedRanges) {
      const last = merged.at(-1);
      if (last && curr.start <= last.end) {
        last.end = Math.max(last.end, curr.end);
      } else {
        merged.push(curr);
      }
    }
    return merged;
  }
  /** Get the region who's ranges include an offset */
  regionAt(offset) {
    if (!this.regions.length)
      return;
    for (const region of this.regions) {
      if (region.offset > offset)
        break;
      if (offset >= region.offset && offset < region.offset + region.data.byteLength)
        return region;
    }
  }
  /** Add new data to the cache at given specified offset */
  add(data, offset) {
    const end = offset + data.byteLength;
    const region = this.regionAt(offset);
    if (region) {
      region.data = extendBuffer(region.data, end);
      region.data.set(data, offset);
      region.ranges.push({ start: offset, end });
      region.ranges.sort((a, b) => a.start - b.start);
      this.collect();
      return this;
    }
    const newRegion = { data, offset, ranges: [{ start: offset, end }] };
    const insertIndex = this.regions.findIndex((region2) => region2.offset > offset);
    if (insertIndex == -1) {
      this.regions.push(newRegion);
    } else {
      this.regions.splice(insertIndex, 0, newRegion);
    }
    this.collect();
    return this;
  }
}
class Transaction {
  constructor(store) {
    this.store = store;
  }
}
class SyncTransaction extends Transaction {
  /* eslint-disable @typescript-eslint/require-await */
  async get(id, offset, end) {
    return this.getSync(id, offset, end);
  }
  async set(id, data, offset) {
    return this.setSync(id, data, offset);
  }
  async remove(id) {
    return this.removeSync(id);
  }
}
class AsyncTransaction extends Transaction {
  constructor() {
    super(...arguments);
    this.asyncDone = Promise.resolve();
  }
  /**
   * Run a asynchronous operation from a sync context. Not magic and subject to (race) conditions.
   * @internal
   */
  async(promise) {
    this.asyncDone = this.asyncDone.then(() => promise);
  }
  /**
   * Gets a cache resource
   * If `info` is set and the resource doesn't exist, it will be created
   * @internal
   */
  _cached(id, info2) {
    var _a3;
    var _b3;
    (_a3 = (_b3 = this.store).cache) !== null && _a3 !== void 0 ? _a3 : _b3.cache = /* @__PURE__ */ new Map();
    const resource = this.store.cache.get(id);
    if (!resource)
      return !info2 ? void 0 : new Resource(id, info2.size, {}, this.store.cache);
    if (info2)
      resource.size = info2.size;
    return resource;
  }
  getSync(id, offset, end) {
    var _a3;
    const resource = this._cached(id);
    if (!resource)
      return;
    end !== null && end !== void 0 ? end : end = resource.size;
    const missing = resource.missing(offset, end);
    for (const { start, end: end2 } of missing) {
      this.async(this.get(id, start, end2));
    }
    if (missing.length)
      throw err$2(ErrnoError.With("EAGAIN", (_a3 = this.store._fs) === null || _a3 === void 0 ? void 0 : _a3._path(id)));
    const region = resource.regionAt(offset);
    if (!region) {
      warn("Missing cache region for " + id);
      return;
    }
    return region.data.subarray(offset - region.offset, end - region.offset);
  }
  setSync(id, data, offset) {
    this.async(this.set(id, data, offset));
  }
  removeSync(id) {
    var _a3;
    this.async(this.remove(id));
    (_a3 = this.store.cache) === null || _a3 === void 0 ? void 0 : _a3.delete(id);
  }
}
class WrappedTransaction {
  flag(flag) {
    var _a3, _b3;
    return (_b3 = (_a3 = this.raw.store.flags) === null || _a3 === void 0 ? void 0 : _a3.includes(flag)) !== null && _b3 !== void 0 ? _b3 : false;
  }
  constructor(raw, fs2) {
    this.raw = raw;
    this.fs = fs2;
    this.done = false;
    this.originalData = /* @__PURE__ */ new Map();
    this.modifiedKeys = /* @__PURE__ */ new Set();
  }
  keys() {
    return this.raw.keys();
  }
  async get(id, offset = 0, end) {
    const data = await this.raw.get(id, offset, end);
    this.stash(id);
    return data;
  }
  getSync(id, offset = 0, end) {
    const data = this.raw.getSync(id, offset, end);
    this.stash(id);
    return data;
  }
  async set(id, data, offset = 0) {
    await this.markModified(id, offset, data.byteLength);
    await this.raw.set(id, data, offset);
  }
  setSync(id, data, offset = 0) {
    this.markModifiedSync(id, offset, data.byteLength);
    this.raw.setSync(id, data, offset);
  }
  async remove(id) {
    await this.markModified(id, 0, void 0);
    await this.raw.remove(id);
  }
  removeSync(id) {
    this.markModifiedSync(id, 0, void 0);
    this.raw.removeSync(id);
  }
  commit() {
    this.done = true;
    return Promise.resolve();
  }
  commitSync() {
    this.done = true;
  }
  async abort() {
    if (this.done)
      return;
    for (const [id, entries2] of this.originalData) {
      if (!this.modifiedKeys.has(id))
        continue;
      if (entries2.some((ent) => !ent.data)) {
        await this.raw.remove(id);
        this.fs._remove(id);
        continue;
      }
      for (const entry of entries2.reverse()) {
        await this.raw.set(id, entry.data, entry.offset);
      }
    }
    this.done = true;
  }
  abortSync() {
    if (this.done)
      return;
    for (const [id, entries2] of this.originalData) {
      if (!this.modifiedKeys.has(id))
        continue;
      if (entries2.some((ent) => !ent.data)) {
        this.raw.removeSync(id);
        this.fs._remove(id);
        continue;
      }
      for (const entry of entries2.reverse()) {
        this.raw.setSync(id, entry.data, entry.offset);
      }
    }
    this.done = true;
  }
  async [Symbol.asyncDispose]() {
    if (this.done)
      return;
    await this.abort();
  }
  [Symbol.dispose]() {
    if (this.done)
      return;
    this.abortSync();
  }
  /**
   * Stashes given key value pair into `originalData` if it doesn't already exist.
   * Allows us to stash values the program is requesting anyway to
   * prevent needless `get` requests if the program modifies the data later
   * on during the transaction.
   */
  stash(id, data, offset = 0) {
    if (!this.originalData.has(id))
      this.originalData.set(id, []);
    this.originalData.get(id).push({ data, offset });
  }
  /**
   * Marks an id as modified, and stashes its value if it has not been stashed already.
   */
  async markModified(id, offset, length) {
    this.modifiedKeys.add(id);
    const end = length ? offset + length : void 0;
    try {
      this.stash(id, await this.raw.get(id, offset, end), offset);
    } catch (e) {
      if (!(this.raw instanceof AsyncTransaction))
        throw e;
      const tx = this.raw;
      const resource = tx._cached(id);
      if (!resource)
        throw e;
      for (const range of resource.cached(offset, end !== null && end !== void 0 ? end : offset)) {
        this.stash(id, await this.raw.get(id, range.start, range.end), range.start);
      }
    }
  }
  /**
   * Marks an id as modified, and stashes its value if it has not been stashed already.
   */
  markModifiedSync(id, offset, length) {
    this.modifiedKeys.add(id);
    const end = length ? offset + length : void 0;
    try {
      this.stash(id, this.raw.getSync(id, offset, end), offset);
    } catch (e) {
      if (!(this.raw instanceof AsyncTransaction))
        throw e;
      const tx = this.raw;
      const resource = tx._cached(id);
      if (!resource)
        throw e;
      for (const range of resource.cached(offset, end !== null && end !== void 0 ? end : offset)) {
        this.stash(id, this.raw.getSync(id, range.start, range.end), range.start);
      }
    }
  }
}
var __addDisposableResource$4 = function(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async });
  } else if (async) {
    env.stack.push({ async: true });
  }
  return value;
};
var __disposeResources$4 = /* @__PURE__ */ (function(SuppressedError2) {
  return function(env) {
    function fail(e) {
      env.error = env.hasError ? new SuppressedError2(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  };
})(typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
class StoreFS extends FileSystem {
  /**
   * Gets the first path associated with an inode
   */
  _path(id) {
    var _a3;
    const [path] = (_a3 = this._paths.get(id)) !== null && _a3 !== void 0 ? _a3 : [];
    return path;
  }
  /**
   * Add a inode/path pair
   */
  _add(ino, path) {
    if (!this._paths.has(ino))
      this._paths.set(ino, /* @__PURE__ */ new Set());
    this._paths.get(ino).add(path);
    this._ids.set(path, ino);
  }
  /**
   * Remove a inode/path pair
   */
  _remove(ino) {
    var _a3;
    for (const path of (_a3 = this._paths.get(ino)) !== null && _a3 !== void 0 ? _a3 : []) {
      this._ids.delete(path);
    }
    this._paths.delete(ino);
  }
  /**
   * Move paths in the tables
   */
  _move(from, to) {
    const toMove = [];
    for (const [path, ino] of this._ids) {
      const rel = relative(from, path);
      if (rel.startsWith(".."))
        continue;
      let newKey = join(to, rel);
      if (newKey.endsWith("/"))
        newKey = newKey.slice(0, -1);
      toMove.push({ oldKey: path, newKey, ino });
    }
    for (const { oldKey, newKey, ino } of toMove) {
      this._ids.delete(oldKey);
      this._ids.set(newKey, ino);
      const p = this._paths.get(ino);
      if (!p) {
        warn("Missing paths in table for ino " + ino);
        continue;
      }
      p.delete(oldKey);
      p.add(newKey);
    }
  }
  async ready() {
    if (this._initialized)
      return;
    this.checkRootSync();
    await this.checkRoot();
    await this._populate();
    this._initialized = true;
  }
  constructor(store) {
    var _a3, _b3;
    super((_a3 = store.id) !== null && _a3 !== void 0 ? _a3 : 1802921587, store.name);
    this.store = store;
    this._ids = /* @__PURE__ */ new Map([["/", 0]]);
    this._paths = /* @__PURE__ */ new Map([[0, new Set("/")]]);
    this._initialized = false;
    this.attributes.set("setid");
    store._fs = this;
    debug(this.name + ": supports features: " + ((_b3 = this.store.flags) === null || _b3 === void 0 ? void 0 : _b3.join(", ")));
  }
  /**
   * @experimental
   */
  usage() {
    var _a3, _b3;
    return ((_b3 = (_a3 = this.store).usage) === null || _b3 === void 0 ? void 0 : _b3.call(_a3)) || {
      totalSpace: 0,
      freeSpace: 0
    };
  }
  /* node:coverage disable */
  /**
   * Delete all contents stored in the file system.
   * @deprecated
   */
  async empty() {
    log_deprecated("StoreFS#empty");
    await this.checkRoot();
  }
  /**
   * Delete all contents stored in the file system.
   * @deprecated
   */
  emptySync() {
    log_deprecated("StoreFS#emptySync");
    this.checkRootSync();
  }
  /* node:coverage enable */
  /**
   * Load an index into the StoreFS.
   * You *must* manually add non-directory files
   */
  async loadIndex(index) {
    const env_1 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource$4(env_1, this.transaction(), true);
      const dirs = index.directories();
      for (const [path, inode] of index) {
        this._add(inode.ino, path);
        await tx.set(inode.ino, serialize(inode));
        if (dirs.has(path))
          await tx.set(inode.data, encodeDirListing(dirs.get(path)));
      }
      await tx.commit();
    } catch (e_1) {
      env_1.error = e_1;
      env_1.hasError = true;
    } finally {
      const result_1 = __disposeResources$4(env_1);
      if (result_1)
        await result_1;
    }
  }
  /**
   * Load an index into the StoreFS.
   * You *must* manually add non-directory files
   */
  loadIndexSync(index) {
    const env_2 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource$4(env_2, this.transaction(), false);
      const dirs = index.directories();
      for (const [path, inode] of index) {
        this._add(inode.ino, path);
        tx.setSync(inode.ino, serialize(inode));
        if (dirs.has(path))
          tx.setSync(inode.data, encodeDirListing(dirs.get(path)));
      }
      tx.commitSync();
    } catch (e_2) {
      env_2.error = e_2;
      env_2.hasError = true;
    } finally {
      __disposeResources$4(env_2);
    }
  }
  async createIndex() {
    var _a3;
    const env_3 = { stack: [], error: void 0, hasError: false };
    try {
      const index = new Index();
      const tx = __addDisposableResource$4(env_3, this.transaction(), true);
      const queue = [["/", 0]];
      const silence = canary(ErrnoError.With("EDEADLK"));
      while (queue.length) {
        const [path, ino] = queue.shift();
        const inode = new Inode(await tx.get(ino));
        index.set(path, inode);
        if (inode.mode & S_IFDIR) {
          const dir = decodeDirListing((_a3 = await tx.get(inode.data)) !== null && _a3 !== void 0 ? _a3 : _throw(ErrnoError.With("ENODATA", path)));
          for (const [name, id] of Object.entries(dir)) {
            queue.push([join(path, name), id]);
          }
        }
      }
      silence();
      return index;
    } catch (e_3) {
      env_3.error = e_3;
      env_3.hasError = true;
    } finally {
      const result_2 = __disposeResources$4(env_3);
      if (result_2)
        await result_2;
    }
  }
  createIndexSync() {
    var _a3;
    const env_4 = { stack: [], error: void 0, hasError: false };
    try {
      const index = new Index();
      const tx = __addDisposableResource$4(env_4, this.transaction(), false);
      const queue = [["/", 0]];
      const silence = canary(ErrnoError.With("EDEADLK"));
      while (queue.length) {
        const [path, ino] = queue.shift();
        const inode = new Inode(tx.getSync(ino));
        index.set(path, inode);
        if (inode.mode & S_IFDIR) {
          const dir = decodeDirListing((_a3 = tx.getSync(inode.data)) !== null && _a3 !== void 0 ? _a3 : _throw(ErrnoError.With("ENODATA", path)));
          for (const [name, id] of Object.entries(dir)) {
            queue.push([join(path, name), id]);
          }
        }
      }
      silence();
      return index;
    } catch (e_4) {
      env_4.error = e_4;
      env_4.hasError = true;
    } finally {
      __disposeResources$4(env_4);
    }
  }
  /**
   * @todo Make rename compatible with the cache.
   */
  async rename(oldPath, newPath) {
    var _a3, _b3, _c2;
    const env_5 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource$4(env_5, this.transaction(), true);
      const _old = parse(oldPath), _new = parse(newPath), oldDirNode = await this.findInode(tx, _old.dir, "rename"), oldDirList = decodeDirListing((_a3 = await tx.get(oldDirNode.data)) !== null && _a3 !== void 0 ? _a3 : _throw(ErrnoError.With("ENODATA", _old.dir, "rename")));
      if (!oldDirList[_old.base])
        throw ErrnoError.With("ENOENT", oldPath, "rename");
      const ino = oldDirList[_old.base];
      if (ino != this._ids.get(oldPath))
        err$2(`Ino mismatch while renaming ${oldPath} to ${newPath}`);
      delete oldDirList[_old.base];
      if ((_new.dir + "/").startsWith(oldPath + "/"))
        throw new ErrnoError(Errno.EBUSY, _old.dir);
      const sameParent = _new.dir == _old.dir;
      const newDirNode = sameParent ? oldDirNode : await this.findInode(tx, _new.dir, "rename");
      const newDirList = sameParent ? oldDirList : decodeDirListing((_b3 = await tx.get(newDirNode.data)) !== null && _b3 !== void 0 ? _b3 : _throw(ErrnoError.With("ENODATA", _new.dir, "rename")));
      if (newDirList[_new.base]) {
        const existing = new Inode((_c2 = await tx.get(newDirList[_new.base])) !== null && _c2 !== void 0 ? _c2 : _throw(ErrnoError.With("ENOENT", newPath, "rename")));
        if (!existing.toStats().isFile())
          throw ErrnoError.With("EPERM", newPath, "rename");
        await tx.remove(existing.data);
        await tx.remove(newDirList[_new.base]);
      }
      newDirList[_new.base] = ino;
      await tx.set(oldDirNode.data, encodeDirListing(oldDirList));
      await tx.set(newDirNode.data, encodeDirListing(newDirList));
      await tx.commit();
      this._move(oldPath, newPath);
    } catch (e_5) {
      env_5.error = e_5;
      env_5.hasError = true;
    } finally {
      const result_3 = __disposeResources$4(env_5);
      if (result_3)
        await result_3;
    }
  }
  renameSync(oldPath, newPath) {
    var _a3, _b3, _c2;
    const env_6 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource$4(env_6, this.transaction(), false);
      const _old = parse(oldPath), _new = parse(newPath), oldDirNode = this.findInodeSync(tx, _old.dir, "rename"), oldDirList = decodeDirListing((_a3 = tx.getSync(oldDirNode.data)) !== null && _a3 !== void 0 ? _a3 : _throw(ErrnoError.With("ENODATA", _old.dir, "rename")));
      if (!oldDirList[_old.base])
        throw ErrnoError.With("ENOENT", oldPath, "rename");
      const ino = oldDirList[_old.base];
      if (ino != this._ids.get(oldPath))
        err$2(`Ino mismatch while renaming ${oldPath} to ${newPath}`);
      delete oldDirList[_old.base];
      if ((_new.dir + "/").startsWith(oldPath + "/"))
        throw new ErrnoError(Errno.EBUSY, _old.dir);
      const sameParent = _new.dir === _old.dir;
      const newDirNode = sameParent ? oldDirNode : this.findInodeSync(tx, _new.dir, "rename");
      const newDirList = sameParent ? oldDirList : decodeDirListing((_b3 = tx.getSync(newDirNode.data)) !== null && _b3 !== void 0 ? _b3 : _throw(ErrnoError.With("ENODATA", _new.dir, "rename")));
      if (newDirList[_new.base]) {
        const existing = new Inode((_c2 = tx.getSync(newDirList[_new.base])) !== null && _c2 !== void 0 ? _c2 : _throw(ErrnoError.With("ENOENT", newPath, "rename")));
        if (!existing.toStats().isFile())
          throw ErrnoError.With("EPERM", newPath, "rename");
        tx.removeSync(existing.data);
        tx.removeSync(newDirList[_new.base]);
      }
      newDirList[_new.base] = ino;
      tx.setSync(oldDirNode.data, encodeDirListing(oldDirList));
      tx.setSync(newDirNode.data, encodeDirListing(newDirList));
      tx.commitSync();
      this._move(oldPath, newPath);
    } catch (e_6) {
      env_6.error = e_6;
      env_6.hasError = true;
    } finally {
      __disposeResources$4(env_6);
    }
  }
  async stat(path) {
    const env_7 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource$4(env_7, this.transaction(), true);
      return (await this.findInode(tx, path, "stat")).toStats();
    } catch (e_7) {
      env_7.error = e_7;
      env_7.hasError = true;
    } finally {
      const result_4 = __disposeResources$4(env_7);
      if (result_4)
        await result_4;
    }
  }
  statSync(path) {
    const env_8 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource$4(env_8, this.transaction(), false);
      return this.findInodeSync(tx, path, "stat").toStats();
    } catch (e_8) {
      env_8.error = e_8;
      env_8.hasError = true;
    } finally {
      __disposeResources$4(env_8);
    }
  }
  async createFile(path, flag, mode, options) {
    const node = await this.commitNew(path, { mode: mode | S_IFREG, ...options }, new Uint8Array(), "createFile");
    return new LazyFile(this, path, flag, node.toStats());
  }
  createFileSync(path, flag, mode, options) {
    const node = this.commitNewSync(path, { mode: mode | S_IFREG, ...options }, new Uint8Array(), "createFile");
    return new LazyFile(this, path, flag, node.toStats());
  }
  async openFile(path, flag) {
    const env_9 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource$4(env_9, this.transaction(), true);
      const node = await this.findInode(tx, path, "openFile");
      return new LazyFile(this, path, flag, node.toStats());
    } catch (e_9) {
      env_9.error = e_9;
      env_9.hasError = true;
    } finally {
      const result_5 = __disposeResources$4(env_9);
      if (result_5)
        await result_5;
    }
  }
  openFileSync(path, flag) {
    const env_10 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource$4(env_10, this.transaction(), false);
      const node = this.findInodeSync(tx, path, "openFile");
      return new LazyFile(this, path, flag, node.toStats());
    } catch (e_10) {
      env_10.error = e_10;
      env_10.hasError = true;
    } finally {
      __disposeResources$4(env_10);
    }
  }
  async unlink(path) {
    return this.remove(path, false);
  }
  unlinkSync(path) {
    this.removeSync(path, false);
  }
  async rmdir(path) {
    if ((await this.readdir(path)).length) {
      throw ErrnoError.With("ENOTEMPTY", path, "rmdir");
    }
    await this.remove(path, true);
  }
  rmdirSync(path) {
    if (this.readdirSync(path).length) {
      throw ErrnoError.With("ENOTEMPTY", path, "rmdir");
    }
    this.removeSync(path, true);
  }
  async mkdir(path, mode, options) {
    await this.commitNew(path, { mode: mode | S_IFDIR, ...options }, encodeUTF8("{}"), "mkdir");
  }
  mkdirSync(path, mode, options) {
    this.commitNewSync(path, { mode: mode | S_IFDIR, ...options }, encodeUTF8("{}"), "mkdir");
  }
  async readdir(path) {
    var _a3;
    const env_11 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource$4(env_11, this.transaction(), true);
      const node = await this.findInode(tx, path, "readdir");
      return Object.keys(decodeDirListing((_a3 = await tx.get(node.data)) !== null && _a3 !== void 0 ? _a3 : _throw(ErrnoError.With("ENOENT", path, "readdir"))));
    } catch (e_11) {
      env_11.error = e_11;
      env_11.hasError = true;
    } finally {
      const result_6 = __disposeResources$4(env_11);
      if (result_6)
        await result_6;
    }
  }
  readdirSync(path) {
    var _a3;
    const env_12 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource$4(env_12, this.transaction(), false);
      const node = this.findInodeSync(tx, path, "readdir");
      return Object.keys(decodeDirListing((_a3 = tx.getSync(node.data)) !== null && _a3 !== void 0 ? _a3 : _throw(ErrnoError.With("ENOENT", path, "readdir"))));
    } catch (e_12) {
      env_12.error = e_12;
      env_12.hasError = true;
    } finally {
      __disposeResources$4(env_12);
    }
  }
  /**
   * Updated the inode and data node at `path`
   * @todo Ensure mtime updates properly, and use that to determine if a data update is required.
   */
  async sync(path, data, metadata) {
    const env_13 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource$4(env_13, this.transaction(), true);
      const inode = await this.findInode(tx, path, "sync");
      if (data)
        await tx.set(inode.data, data);
      if (inode.update(metadata)) {
        this._add(inode.ino, path);
        await tx.set(inode.ino, serialize(inode));
      }
      await tx.commit();
    } catch (e_13) {
      env_13.error = e_13;
      env_13.hasError = true;
    } finally {
      const result_7 = __disposeResources$4(env_13);
      if (result_7)
        await result_7;
    }
  }
  /**
   * Updated the inode and data node at `path`
   * @todo Ensure mtime updates properly, and use that to determine if a data update is required.
   */
  syncSync(path, data, metadata) {
    const env_14 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource$4(env_14, this.transaction(), false);
      const inode = this.findInodeSync(tx, path, "sync");
      if (data)
        tx.setSync(inode.data, data);
      if (inode.update(metadata)) {
        this._add(inode.ino, path);
        tx.setSync(inode.ino, serialize(inode));
      }
      tx.commitSync();
    } catch (e_14) {
      env_14.error = e_14;
      env_14.hasError = true;
    } finally {
      __disposeResources$4(env_14);
    }
  }
  async link(target, link2) {
    var _a3;
    const env_15 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource$4(env_15, this.transaction(), true);
      const newDir = dirname(link2), newDirNode = await this.findInode(tx, newDir, "link"), listing = decodeDirListing((_a3 = await tx.get(newDirNode.data)) !== null && _a3 !== void 0 ? _a3 : _throw(ErrnoError.With("ENOENT", newDir, "link")));
      const inode = await this.findInode(tx, target, "link");
      inode.nlink++;
      listing[basename(link2)] = inode.ino;
      this._add(inode.ino, link2);
      await tx.set(inode.ino, serialize(inode));
      await tx.set(newDirNode.data, encodeDirListing(listing));
      await tx.commit();
    } catch (e_15) {
      env_15.error = e_15;
      env_15.hasError = true;
    } finally {
      const result_8 = __disposeResources$4(env_15);
      if (result_8)
        await result_8;
    }
  }
  linkSync(target, link2) {
    var _a3;
    const env_16 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource$4(env_16, this.transaction(), false);
      const newDir = dirname(link2), newDirNode = this.findInodeSync(tx, newDir, "link"), listing = decodeDirListing((_a3 = tx.getSync(newDirNode.data)) !== null && _a3 !== void 0 ? _a3 : _throw(ErrnoError.With("ENOENT", newDir, "link")));
      const inode = this.findInodeSync(tx, target, "link");
      inode.nlink++;
      listing[basename(link2)] = inode.ino;
      this._add(inode.ino, link2);
      tx.setSync(inode.ino, serialize(inode));
      tx.setSync(newDirNode.data, encodeDirListing(listing));
      tx.commitSync();
    } catch (e_16) {
      env_16.error = e_16;
      env_16.hasError = true;
    } finally {
      __disposeResources$4(env_16);
    }
  }
  async read(path, buffer2, offset, end) {
    var _a3;
    const env_17 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource$4(env_17, this.transaction(), true);
      const inode = await this.findInode(tx, path, "read");
      if (inode.size == 0)
        return;
      const data = (_a3 = await tx.get(inode.data, offset, end)) !== null && _a3 !== void 0 ? _a3 : _throw(ErrnoError.With("ENODATA", path, "read"));
      const _ = tx.flag("partial") ? data : data.subarray(offset, end);
      if (_.byteLength > buffer2.byteLength)
        err$2(`Trying to place ${_.byteLength} bytes into a ${buffer2.byteLength} byte buffer on read`);
      buffer2.set(_);
    } catch (e_17) {
      env_17.error = e_17;
      env_17.hasError = true;
    } finally {
      const result_9 = __disposeResources$4(env_17);
      if (result_9)
        await result_9;
    }
  }
  readSync(path, buffer2, offset, end) {
    var _a3;
    const env_18 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource$4(env_18, this.transaction(), false);
      const inode = this.findInodeSync(tx, path, "read");
      if (inode.size == 0)
        return;
      const data = (_a3 = tx.getSync(inode.data, offset, end)) !== null && _a3 !== void 0 ? _a3 : _throw(ErrnoError.With("ENODATA", path, "read"));
      const _ = tx.flag("partial") ? data : data.subarray(offset, end);
      if (_.byteLength > buffer2.byteLength)
        err$2(`Trying to place ${_.byteLength} bytes into a ${buffer2.byteLength} byte buffer on read`);
      buffer2.set(_);
    } catch (e_18) {
      env_18.error = e_18;
      env_18.hasError = true;
    } finally {
      __disposeResources$4(env_18);
    }
  }
  async write(path, data, offset) {
    var _a3;
    const env_19 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource$4(env_19, this.transaction(), true);
      const inode = await this.findInode(tx, path, "write");
      let buffer2 = data;
      if (!tx.flag("partial")) {
        buffer2 = extendBuffer((_a3 = await tx.get(inode.data)) !== null && _a3 !== void 0 ? _a3 : new Uint8Array(), offset + data.byteLength);
        buffer2.set(data, offset);
        offset = 0;
      }
      await tx.set(inode.data, buffer2, offset);
      inode.update({ mtimeMs: Date.now(), size: Math.max(inode.size, data.byteLength + offset) });
      this._add(inode.ino, path);
      await tx.set(inode.ino, serialize(inode));
      await tx.commit();
    } catch (e_19) {
      env_19.error = e_19;
      env_19.hasError = true;
    } finally {
      const result_10 = __disposeResources$4(env_19);
      if (result_10)
        await result_10;
    }
  }
  writeSync(path, data, offset) {
    var _a3;
    const env_20 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource$4(env_20, this.transaction(), false);
      const inode = this.findInodeSync(tx, path, "write");
      let buffer2 = data;
      if (!tx.flag("partial")) {
        buffer2 = extendBuffer((_a3 = tx.getSync(inode.data)) !== null && _a3 !== void 0 ? _a3 : new Uint8Array(), offset + data.byteLength);
        buffer2.set(data, offset);
        offset = 0;
      }
      tx.setSync(inode.data, buffer2, offset);
      inode.update({ mtimeMs: Date.now(), size: Math.max(inode.size, data.byteLength + offset) });
      this._add(inode.ino, path);
      tx.setSync(inode.ino, serialize(inode));
      tx.commitSync();
    } catch (e_20) {
      env_20.error = e_20;
      env_20.hasError = true;
    } finally {
      __disposeResources$4(env_20);
    }
  }
  /**
   * Wraps a transaction
   * @internal @hidden
   */
  transaction() {
    return new WrappedTransaction(this.store.transaction(), this);
  }
  /**
   * Checks if the root directory exists. Creates it if it doesn't.
   */
  async checkRoot() {
    const env_21 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource$4(env_21, this.transaction(), true);
      if (await tx.get(rootIno))
        return;
      const inode = new Inode({ ino: rootIno, data: 1, mode: 511 | S_IFDIR });
      await tx.set(inode.data, encodeUTF8("{}"));
      this._add(rootIno, "/");
      await tx.set(rootIno, serialize(inode));
      await tx.commit();
    } catch (e_21) {
      env_21.error = e_21;
      env_21.hasError = true;
    } finally {
      const result_11 = __disposeResources$4(env_21);
      if (result_11)
        await result_11;
    }
  }
  /**
   * Checks if the root directory exists. Creates it if it doesn't.
   */
  checkRootSync() {
    const env_22 = { stack: [], error: void 0, hasError: false };
    try {
      const tx = __addDisposableResource$4(env_22, this.transaction(), false);
      if (tx.getSync(rootIno))
        return;
      const inode = new Inode({ ino: rootIno, data: 1, mode: 511 | S_IFDIR });
      tx.setSync(inode.data, encodeUTF8("{}"));
      this._add(rootIno, "/");
      tx.setSync(rootIno, serialize(inode));
      tx.commitSync();
    } catch (e_22) {
      env_22.error = e_22;
      env_22.hasError = true;
    } finally {
      __disposeResources$4(env_22);
    }
  }
  /**
   * Populates the `_ids` and `_paths` maps with all existing files stored in the underlying `Store`.
   */
  async _populate() {
    const env_23 = { stack: [], error: void 0, hasError: false };
    try {
      if (this._initialized) {
        warn("Attempted to populate tables after initialization");
        return;
      }
      debug("Populating tables with existing store metadata");
      const tx = __addDisposableResource$4(env_23, this.transaction(), true);
      const rootData = await tx.get(rootIno);
      if (!rootData) {
        notice("Store does not have a root inode");
        const inode = new Inode({ ino: rootIno, data: 1, mode: 511 | S_IFDIR });
        await tx.set(inode.data, encodeUTF8("{}"));
        this._add(rootIno, "/");
        await tx.set(rootIno, serialize(inode));
        await tx.commit();
        return;
      }
      if (rootData.length != __inode_sz) {
        crit("Store contains an invalid root inode. Refusing to populate tables");
        return;
      }
      const visitedDirectories = /* @__PURE__ */ new Set();
      let i = 0;
      const queue = [["/", rootIno]];
      while (queue.length > 0) {
        i++;
        const [path, ino] = queue.shift();
        this._add(ino, path);
        const inodeData = await tx.get(ino);
        if (!inodeData) {
          warn("Store is missing data for inode: " + ino);
          continue;
        }
        if (inodeData.length != __inode_sz) {
          warn(`Invalid inode size for ino ${ino}: ${inodeData.length}`);
          continue;
        }
        const inode = new Inode(inodeData);
        if ((inode.mode & S_IFDIR) != S_IFDIR || visitedDirectories.has(ino)) {
          continue;
        }
        visitedDirectories.add(ino);
        const dirData = await tx.get(inode.data);
        if (!dirData) {
          warn("Store is missing directory data: " + inode.data);
          continue;
        }
        const dirListing = decodeDirListing(dirData);
        for (const [entryName, childIno] of Object.entries(dirListing)) {
          queue.push([join(path, entryName), childIno]);
        }
      }
      debug(`Added ${i} existing inode(s) from store`);
    } catch (e_23) {
      env_23.error = e_23;
      env_23.hasError = true;
    } finally {
      const result_12 = __disposeResources$4(env_23);
      if (result_12)
        await result_12;
    }
  }
  /**
   * Finds the Inode of `path`.
   * @param path The path to look up.
   * @todo memoize/cache
   */
  async findInode(tx, path, syscall) {
    var _a3;
    const ino = this._ids.get(path);
    if (ino === void 0)
      throw ErrnoError.With("ENOENT", path, syscall);
    return new Inode((_a3 = await tx.get(ino)) !== null && _a3 !== void 0 ? _a3 : _throw(ErrnoError.With("ENOENT", path, syscall)));
  }
  /**
   * Finds the Inode of `path`.
   * @param path The path to look up.
   * @return The Inode of the path p.
   * @todo memoize/cache
   */
  findInodeSync(tx, path, syscall) {
    var _a3;
    const ino = this._ids.get(path);
    if (ino === void 0)
      throw ErrnoError.With("ENOENT", path, syscall);
    return new Inode((_a3 = tx.getSync(ino)) !== null && _a3 !== void 0 ? _a3 : _throw(ErrnoError.With("ENOENT", path, syscall)));
  }
  /**
   * Allocates a new ID and adds the ID/path
   */
  allocNew(path, syscall) {
    var _a3;
    (_a3 = this._lastID) !== null && _a3 !== void 0 ? _a3 : this._lastID = Math.max(...this._paths.keys());
    this._lastID += 2;
    const id = this._lastID;
    if (id > size_max)
      throw err$2(new ErrnoError(Errno.ENOSPC, "No IDs available", path, syscall), { fs: this });
    this._add(id, path);
    return id;
  }
  /**
   * Commits a new file (well, a FILE or a DIRECTORY) to the file system with `mode`.
   * Note: This will commit the transaction.
   * @param path The path to the new file.
   * @param options The options to create the new file with.
   * @param data The data to store at the file's data node.
   */
  async commitNew(path, options, data, syscall) {
    var _a3;
    const env_24 = { stack: [], error: void 0, hasError: false };
    try {
      if (path == "/")
        throw ErrnoError.With("EEXIST", path, syscall);
      const tx = __addDisposableResource$4(env_24, this.transaction(), true);
      const { dir: parentPath, base: fname } = parse(path);
      const parent = await this.findInode(tx, parentPath, syscall);
      const listing = decodeDirListing((_a3 = await tx.get(parent.data)) !== null && _a3 !== void 0 ? _a3 : _throw(ErrnoError.With("ENOENT", parentPath, syscall)));
      if (listing[fname])
        throw ErrnoError.With("EEXIST", path, syscall);
      const id = this.allocNew(path, syscall);
      const inode = new Inode({
        ino: id,
        data: id + 1,
        mode: options.mode,
        size: data.byteLength,
        uid: parent.mode & S_ISUID ? parent.uid : options.uid,
        gid: parent.mode & S_ISGID ? parent.gid : options.gid
      });
      await tx.set(inode.ino, serialize(inode));
      await tx.set(inode.data, data);
      listing[fname] = inode.ino;
      await tx.set(parent.data, encodeDirListing(listing));
      await tx.commit();
      return inode;
    } catch (e_24) {
      env_24.error = e_24;
      env_24.hasError = true;
    } finally {
      const result_13 = __disposeResources$4(env_24);
      if (result_13)
        await result_13;
    }
  }
  /**
   * Commits a new file (well, a FILE or a DIRECTORY) to the file system with `mode`.
   * Note: This will commit the transaction.
   * @param path The path to the new file.
   * @param options The options to create the new file with.
   * @param data The data to store at the file's data node.
   * @return The Inode for the new file.
   */
  commitNewSync(path, options, data, syscall) {
    var _a3;
    const env_25 = { stack: [], error: void 0, hasError: false };
    try {
      if (path == "/")
        throw ErrnoError.With("EEXIST", path, syscall);
      const tx = __addDisposableResource$4(env_25, this.transaction(), false);
      const { dir: parentPath, base: fname } = parse(path);
      const parent = this.findInodeSync(tx, parentPath, syscall);
      const listing = decodeDirListing((_a3 = tx.getSync(parent.data)) !== null && _a3 !== void 0 ? _a3 : _throw(ErrnoError.With("ENOENT", parentPath, syscall)));
      if (listing[fname])
        throw ErrnoError.With("EEXIST", path, syscall);
      const id = this.allocNew(path, syscall);
      const inode = new Inode({
        ino: id,
        data: id + 1,
        mode: options.mode,
        size: data.byteLength,
        uid: parent.mode & S_ISUID ? parent.uid : options.uid,
        gid: parent.mode & S_ISGID ? parent.gid : options.gid
      });
      tx.setSync(inode.ino, serialize(inode));
      tx.setSync(inode.data, data);
      listing[fname] = inode.ino;
      tx.setSync(parent.data, encodeDirListing(listing));
      tx.commitSync();
      return inode;
    } catch (e_25) {
      env_25.error = e_25;
      env_25.hasError = true;
    } finally {
      __disposeResources$4(env_25);
    }
  }
  /**
   * Remove all traces of `path` from the file system.
   * @param path The path to remove from the file system.
   * @param isDir Does the path belong to a directory, or a file?
   * @todo Update mtime.
   */
  async remove(path, isDir) {
    var _a3, _b3;
    const env_26 = { stack: [], error: void 0, hasError: false };
    try {
      const syscall = isDir ? "rmdir" : "unlink";
      const tx = __addDisposableResource$4(env_26, this.transaction(), true);
      const { dir: parent, base: fileName } = parse(path), parentNode = await this.findInode(tx, parent, syscall), listing = decodeDirListing((_a3 = await tx.get(parentNode.data)) !== null && _a3 !== void 0 ? _a3 : _throw(ErrnoError.With("ENOENT", parent, syscall)));
      if (!listing[fileName]) {
        throw ErrnoError.With("ENOENT", path, syscall);
      }
      const fileIno = listing[fileName];
      const fileNode = new Inode((_b3 = await tx.get(fileIno)) !== null && _b3 !== void 0 ? _b3 : _throw(ErrnoError.With("ENOENT", path, syscall)));
      delete listing[fileName];
      if (!isDir && fileNode.toStats().isDirectory())
        throw ErrnoError.With("EISDIR", path, syscall);
      await tx.set(parentNode.data, encodeDirListing(listing));
      if (--fileNode.nlink < 1) {
        await tx.remove(fileNode.data);
        await tx.remove(fileIno);
        this._remove(fileIno);
      }
      await tx.commit();
    } catch (e_26) {
      env_26.error = e_26;
      env_26.hasError = true;
    } finally {
      const result_14 = __disposeResources$4(env_26);
      if (result_14)
        await result_14;
    }
  }
  /**
   * Remove all traces of `path` from the file system.
   * @param path The path to remove from the file system.
   * @param isDir Does the path belong to a directory, or a file?
   * @todo Update mtime.
   */
  removeSync(path, isDir) {
    var _a3, _b3;
    const env_27 = { stack: [], error: void 0, hasError: false };
    try {
      const syscall = isDir ? "rmdir" : "unlink";
      const tx = __addDisposableResource$4(env_27, this.transaction(), false);
      const { dir: parent, base: fileName } = parse(path), parentNode = this.findInodeSync(tx, parent, syscall), listing = decodeDirListing((_a3 = tx.getSync(parentNode.data)) !== null && _a3 !== void 0 ? _a3 : _throw(ErrnoError.With("ENOENT", parent, syscall))), fileIno = listing[fileName];
      if (!fileIno)
        throw ErrnoError.With("ENOENT", path, syscall);
      const fileNode = new Inode((_b3 = tx.getSync(fileIno)) !== null && _b3 !== void 0 ? _b3 : _throw(ErrnoError.With("ENOENT", path, syscall)));
      delete listing[fileName];
      if (!isDir && fileNode.toStats().isDirectory()) {
        throw ErrnoError.With("EISDIR", path, syscall);
      }
      tx.setSync(parentNode.data, encodeDirListing(listing));
      if (--fileNode.nlink < 1) {
        tx.removeSync(fileNode.data);
        tx.removeSync(fileIno);
        this._remove(fileIno);
      }
      tx.commitSync();
    } catch (e_27) {
      env_27.error = e_27;
      env_27.hasError = true;
    } finally {
      __disposeResources$4(env_27);
    }
  }
}
class SyncMapTransaction extends SyncTransaction {
  // eslint-disable-next-line @typescript-eslint/require-await
  async keys() {
    return this.store.keys();
  }
  async get(id) {
    var _a3, _b3, _c2;
    return await ((_c2 = (_b3 = (_a3 = this.store).getAsync) === null || _b3 === void 0 ? void 0 : _b3.call(_a3, id)) !== null && _c2 !== void 0 ? _c2 : this.store.get(id));
  }
  getSync(id) {
    return this.store.get(id);
  }
  setSync(id, data) {
    this.store.set(id, data);
  }
  removeSync(id) {
    this.store.delete(id);
  }
}
class InMemoryStore extends Map {
  constructor(maxSize = size_max, label) {
    super();
    this.maxSize = maxSize;
    this.label = label;
    this.flags = [];
    this.name = "tmpfs";
  }
  async sync() {
  }
  transaction() {
    return new SyncMapTransaction(this);
  }
  get bytes() {
    let size = this.size * 4;
    for (const data of this.values())
      size += data.byteLength;
    return size;
  }
  usage() {
    return {
      totalSpace: this.maxSize,
      freeSpace: this.maxSize - this.bytes
    };
  }
}
const _InMemory = {
  name: "InMemory",
  options: {
    maxSize: { type: "number", required: false },
    label: { type: "string", required: false },
    name: { type: "string", required: false }
  },
  create({ maxSize, label, name }) {
    const fs2 = new StoreFS(new InMemoryStore(maxSize, label !== null && label !== void 0 ? label : name));
    fs2.checkRootSync();
    return fs2;
  }
};
const InMemory = _InMemory;
var __addDisposableResource$3 = function(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async });
  } else if (async) {
    env.stack.push({ async: true });
  }
  return value;
};
var __disposeResources$3 = /* @__PURE__ */ (function(SuppressedError2) {
  return function(env) {
    function fail(e) {
      env.error = env.hasError ? new SuppressedError2(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  };
})(typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
class DeviceFile extends File {
  constructor(fs2, path, device) {
    super(fs2, path);
    this.fs = fs2;
    this.device = device;
    this.position = 0;
    this.stats = new Inode({
      mode: (this.driver.isBuffered ? S_IFBLK : S_IFCHR) | 438
    });
  }
  get driver() {
    return this.device.driver;
  }
  async stat() {
    return Promise.resolve(new Stats(this.stats));
  }
  statSync() {
    return new Stats(this.stats);
  }
  readSync(buffer2, offset = 0, length = buffer2.byteLength - offset, position = this.position) {
    this.stats.atimeMs = Date.now();
    const end = position + length;
    this.position = end;
    const uint8 = new Uint8Array(buffer2.buffer, buffer2.byteOffset, buffer2.byteLength);
    this.driver.readD(this.device, uint8.subarray(offset, length), position, end);
    return length;
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async read(buffer2, offset, length) {
    return { bytesRead: this.readSync(buffer2, offset, length), buffer: buffer2 };
  }
  writeSync(buffer2, offset = 0, length = buffer2.byteLength - offset, position = this.position) {
    const end = position + length;
    if (end > this.stats.size)
      this.stats.size = end;
    this.stats.mtimeMs = Date.now();
    this.position = end;
    const data = buffer2.subarray(offset, offset + length);
    this.driver.writeD(this.device, data, position);
    return length;
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async write(buffer2, offset, length, position) {
    return this.writeSync(buffer2, offset, length, position);
  }
  async truncate(length) {
    const { size } = await this.stat();
    const buffer2 = new Uint8Array(length > size ? length - size : 0);
    await this.write(buffer2, 0, buffer2.length, length > size ? size : length);
  }
  truncateSync(length) {
    const { size } = this.statSync();
    const buffer2 = new Uint8Array(length > size ? length - size : 0);
    this.writeSync(buffer2, 0, buffer2.length, length > size ? size : length);
  }
  closeSync() {
    var _a3, _b3;
    (_b3 = (_a3 = this.driver).close) === null || _b3 === void 0 ? void 0 : _b3.call(_a3, this);
  }
  close() {
    this.closeSync();
    return Promise.resolve();
  }
  syncSync() {
    var _a3, _b3;
    (_b3 = (_a3 = this.driver).sync) === null || _b3 === void 0 ? void 0 : _b3.call(_a3, this);
  }
  sync() {
    this.syncSync();
    return Promise.resolve();
  }
  chown() {
    throw ErrnoError.With("ENOTSUP", this.path, "chown");
  }
  chownSync() {
    throw ErrnoError.With("ENOTSUP", this.path, "chown");
  }
  chmod() {
    throw ErrnoError.With("ENOTSUP", this.path, "chmod");
  }
  chmodSync() {
    throw ErrnoError.With("ENOTSUP", this.path, "chmod");
  }
  utimes() {
    throw ErrnoError.With("ENOTSUP", this.path, "utimes");
  }
  utimesSync() {
    throw ErrnoError.With("ENOTSUP", this.path, "utimes");
  }
}
class DeviceFS extends StoreFS {
  /* node:coverage disable */
  /**
   * Creates a new device at `path` relative to the `DeviceFS` root.
   * @deprecated
   */
  createDevice(path, driver, options = {}) {
    var _a3;
    log_deprecated("DeviceFS#createDevice");
    if (this.existsSync(path)) {
      throw ErrnoError.With("EEXIST", path, "mknod");
    }
    let ino = 1;
    const silence = canary(ErrnoError.With("EDEADLK", path, "mknod"));
    while (this.store.has(ino))
      ino++;
    silence();
    const dev = {
      driver,
      ino,
      data: {},
      minor: 0,
      major: 0,
      ...(_a3 = driver.init) === null || _a3 === void 0 ? void 0 : _a3.call(driver, ino, options)
    };
    this.devices.set(path, dev);
    return dev;
  }
  /* node:coverage enable */
  devicesWithDriver(driver, forceIdentity) {
    if (forceIdentity && typeof driver == "string") {
      throw err$2(new ErrnoError(Errno.EINVAL, "Can not fetch devices using only a driver name"), { fs: this });
    }
    const devs = [];
    for (const device of this.devices.values()) {
      if (forceIdentity && device.driver != driver)
        continue;
      const name = typeof driver == "string" ? driver : driver.name;
      if (name == device.driver.name)
        devs.push(device);
    }
    return devs;
  }
  /**
   * @internal
   */
  _createDevice(driver, options = {}) {
    var _a3;
    let ino = 1;
    while (this.store.has(ino))
      ino++;
    const dev = {
      driver,
      ino,
      data: {},
      minor: 0,
      major: 0,
      ...(_a3 = driver.init) === null || _a3 === void 0 ? void 0 : _a3.call(driver, ino, options)
    };
    const path = "/" + (dev.name || driver.name) + (driver.singleton ? "" : this.devicesWithDriver(driver).length);
    if (this.existsSync(path))
      throw ErrnoError.With("EEXIST", path, "mknod");
    this.devices.set(path, dev);
    info("Initialized device: " + this._mountPoint + path);
    return dev;
  }
  /**
   * Adds default devices
   */
  addDefaults() {
    this._createDevice(nullDevice);
    this._createDevice(zeroDevice);
    this._createDevice(fullDevice);
    this._createDevice(randomDevice);
    this._createDevice(consoleDevice);
    debug("Added default devices");
  }
  constructor() {
    super(new InMemoryStore(16777216, "devfs"));
    this.devices = /* @__PURE__ */ new Map();
  }
  async rename(oldPath, newPath) {
    if (this.devices.has(oldPath)) {
      throw ErrnoError.With("EPERM", oldPath, "rename");
    }
    if (this.devices.has(newPath)) {
      throw ErrnoError.With("EEXIST", newPath, "rename");
    }
    return super.rename(oldPath, newPath);
  }
  renameSync(oldPath, newPath) {
    if (this.devices.has(oldPath)) {
      throw ErrnoError.With("EPERM", oldPath, "rename");
    }
    if (this.devices.has(newPath)) {
      throw ErrnoError.With("EEXIST", newPath, "rename");
    }
    return super.renameSync(oldPath, newPath);
  }
  async stat(path) {
    if (this.devices.has(path)) {
      const env_1 = { stack: [], error: void 0, hasError: false };
      try {
        const file = __addDisposableResource$3(env_1, await this.openFile(path, "r"), true);
        return file.stat();
      } catch (e_1) {
        env_1.error = e_1;
        env_1.hasError = true;
      } finally {
        const result_1 = __disposeResources$3(env_1);
        if (result_1)
          await result_1;
      }
    }
    return super.stat(path);
  }
  statSync(path) {
    if (this.devices.has(path)) {
      const env_2 = { stack: [], error: void 0, hasError: false };
      try {
        const file = __addDisposableResource$3(env_2, this.openFileSync(path, "r"), false);
        return file.statSync();
      } catch (e_2) {
        env_2.error = e_2;
        env_2.hasError = true;
      } finally {
        __disposeResources$3(env_2);
      }
    }
    return super.statSync(path);
  }
  async openFile(path, flag) {
    if (this.devices.has(path)) {
      return new DeviceFile(this, path, this.devices.get(path));
    }
    return await super.openFile(path, flag);
  }
  openFileSync(path, flag) {
    if (this.devices.has(path)) {
      return new DeviceFile(this, path, this.devices.get(path));
    }
    return super.openFileSync(path, flag);
  }
  async createFile(path, flag, mode, options) {
    if (this.devices.has(path)) {
      throw ErrnoError.With("EEXIST", path, "createFile");
    }
    return super.createFile(path, flag, mode, options);
  }
  createFileSync(path, flag, mode, options) {
    if (this.devices.has(path)) {
      throw ErrnoError.With("EEXIST", path, "createFile");
    }
    return super.createFileSync(path, flag, mode, options);
  }
  async unlink(path) {
    if (this.devices.has(path)) {
      throw ErrnoError.With("EPERM", path, "unlink");
    }
    return super.unlink(path);
  }
  unlinkSync(path) {
    if (this.devices.has(path)) {
      throw ErrnoError.With("EPERM", path, "unlink");
    }
    return super.unlinkSync(path);
  }
  async rmdir(path) {
    return super.rmdir(path);
  }
  rmdirSync(path) {
    return super.rmdirSync(path);
  }
  async mkdir(path, mode, options) {
    if (this.devices.has(path)) {
      throw ErrnoError.With("EEXIST", path, "mkdir");
    }
    return super.mkdir(path, mode, options);
  }
  mkdirSync(path, mode, options) {
    if (this.devices.has(path)) {
      throw ErrnoError.With("EEXIST", path, "mkdir");
    }
    return super.mkdirSync(path, mode, options);
  }
  async readdir(path) {
    const entries2 = await super.readdir(path);
    for (const dev of this.devices.keys()) {
      if (dirname(dev) == path) {
        entries2.push(basename(dev));
      }
    }
    return entries2;
  }
  readdirSync(path) {
    const entries2 = super.readdirSync(path);
    for (const dev of this.devices.keys()) {
      if (dirname(dev) == path) {
        entries2.push(basename(dev));
      }
    }
    return entries2;
  }
  async link(target, link2) {
    if (this.devices.has(target)) {
      throw ErrnoError.With("EPERM", target, "rmdir");
    }
    if (this.devices.has(link2)) {
      throw ErrnoError.With("EEXIST", link2, "link");
    }
    return super.link(target, link2);
  }
  linkSync(target, link2) {
    if (this.devices.has(target)) {
      throw ErrnoError.With("EPERM", target, "rmdir");
    }
    if (this.devices.has(link2)) {
      throw ErrnoError.With("EEXIST", link2, "link");
    }
    return super.linkSync(target, link2);
  }
  async sync(path, data, stats) {
    if (this.devices.has(path)) {
      throw alert(new ErrnoError(Errno.EINVAL, "Attempted to sync a device incorrectly (bug)", path, "sync"), { fs: this });
    }
    return super.sync(path, data, stats);
  }
  syncSync(path, data, stats) {
    if (this.devices.has(path)) {
      throw alert(new ErrnoError(Errno.EINVAL, "Attempted to sync a device incorrectly (bug)", path, "sync"), { fs: this });
    }
    return super.syncSync(path, data, stats);
  }
  async read(path, buffer2, offset, end) {
    const device = this.devices.get(path);
    if (!device) {
      await super.read(path, buffer2, offset, end);
      return;
    }
    device.driver.readD(device, buffer2, offset, end);
  }
  readSync(path, buffer2, offset, end) {
    const device = this.devices.get(path);
    if (!device) {
      super.readSync(path, buffer2, offset, end);
      return;
    }
    device.driver.readD(device, buffer2, offset, end);
  }
  async write(path, data, offset) {
    const device = this.devices.get(path);
    if (!device) {
      return await super.write(path, data, offset);
    }
    device.driver.writeD(device, data, offset);
  }
  writeSync(path, data, offset) {
    const device = this.devices.get(path);
    if (!device) {
      return super.writeSync(path, data, offset);
    }
    device.driver.writeD(device, data, offset);
  }
}
function defaultWrite(device, data, offset) {
  return;
}
const emptyBuffer = new Uint8Array();
const nullDevice = {
  name: "null",
  singleton: true,
  init() {
    return { major: 1, minor: 3 };
  },
  read() {
    return 0;
  },
  readD() {
    return emptyBuffer;
  },
  writeD: defaultWrite
};
const zeroDevice = {
  name: "zero",
  singleton: true,
  init() {
    return { major: 1, minor: 5 };
  },
  readD(device, buffer2, offset, end) {
    buffer2.fill(0, offset, end);
  },
  writeD: defaultWrite
};
const fullDevice = {
  name: "full",
  singleton: true,
  init() {
    return { major: 1, minor: 7 };
  },
  readD(device, buffer2, offset, end) {
    buffer2.fill(0, offset, end);
  },
  write(file) {
    throw ErrnoError.With("ENOSPC", file.path, "write");
  },
  writeD() {
    throw ErrnoError.With("ENOSPC", void 0, "write");
  }
};
const randomDevice = {
  name: "random",
  singleton: true,
  init() {
    return { major: 1, minor: 8 };
  },
  readD(device, buffer2) {
    for (let i = 0; i < buffer2.length; i++) {
      buffer2[i] = Math.floor(Math.random() * 256);
    }
  },
  writeD: defaultWrite
};
const consoleDevice = {
  name: "console",
  singleton: true,
  init(ino, { output: output2 = (text) => console.log(text) } = {}) {
    return { major: 5, minor: 1, data: { output: output2 } };
  },
  readD() {
    return emptyBuffer;
  },
  writeD(device, buffer2, offset) {
    const text = decodeUTF8(buffer2);
    device.data.output(text, offset);
  }
};
var buffer$1 = {};
var base64Js = {};
var hasRequiredBase64Js;
function requireBase64Js() {
  if (hasRequiredBase64Js) return base64Js;
  hasRequiredBase64Js = 1;
  base64Js.byteLength = byteLength;
  base64Js.toByteArray = toByteArray;
  base64Js.fromByteArray = fromByteArray;
  var lookup = [];
  var revLookup = [];
  var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
  var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }
  revLookup["-".charCodeAt(0)] = 62;
  revLookup["_".charCodeAt(0)] = 63;
  function getLens(b64) {
    var len2 = b64.length;
    if (len2 % 4 > 0) {
      throw new Error("Invalid string. Length must be a multiple of 4");
    }
    var validLen = b64.indexOf("=");
    if (validLen === -1) validLen = len2;
    var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
    return [validLen, placeHoldersLen];
  }
  function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
  }
  function _byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
  }
  function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i2;
    for (i2 = 0; i2 < len2; i2 += 4) {
      tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
      arr[curByte++] = tmp >> 16 & 255;
      arr[curByte++] = tmp >> 8 & 255;
      arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 2) {
      tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
      arr[curByte++] = tmp & 255;
    }
    if (placeHoldersLen === 1) {
      tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
      arr[curByte++] = tmp >> 8 & 255;
      arr[curByte++] = tmp & 255;
    }
    return arr;
  }
  function tripletToBase64(num) {
    return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
  }
  function encodeChunk(uint8, start, end) {
    var tmp;
    var output2 = [];
    for (var i2 = start; i2 < end; i2 += 3) {
      tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
      output2.push(tripletToBase64(tmp));
    }
    return output2.join("");
  }
  function fromByteArray(uint8) {
    var tmp;
    var len2 = uint8.length;
    var extraBytes = len2 % 3;
    var parts = [];
    var maxChunkLength = 16383;
    for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
      parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
    }
    if (extraBytes === 1) {
      tmp = uint8[len2 - 1];
      parts.push(
        lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
      );
    } else if (extraBytes === 2) {
      tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
      parts.push(
        lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
      );
    }
    return parts.join("");
  }
  return base64Js;
}
var ieee754 = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
var hasRequiredIeee754;
function requireIeee754() {
  if (hasRequiredIeee754) return ieee754;
  hasRequiredIeee754 = 1;
  ieee754.read = function(buffer2, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? nBytes - 1 : 0;
    var d = isLE ? -1 : 1;
    var s = buffer2[offset + i];
    i += d;
    e = s & (1 << -nBits) - 1;
    s >>= -nBits;
    nBits += eLen;
    for (; nBits > 0; e = e * 256 + buffer2[offset + i], i += d, nBits -= 8) {
    }
    m = e & (1 << -nBits) - 1;
    e >>= -nBits;
    nBits += mLen;
    for (; nBits > 0; m = m * 256 + buffer2[offset + i], i += d, nBits -= 8) {
    }
    if (e === 0) {
      e = 1 - eBias;
    } else if (e === eMax) {
      return m ? NaN : (s ? -1 : 1) * Infinity;
    } else {
      m = m + Math.pow(2, mLen);
      e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
  };
  ieee754.write = function(buffer2, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    var i = isLE ? 0 : nBytes - 1;
    var d = isLE ? 1 : -1;
    var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
      m = isNaN(value) ? 1 : 0;
      e = eMax;
    } else {
      e = Math.floor(Math.log(value) / Math.LN2);
      if (value * (c = Math.pow(2, -e)) < 1) {
        e--;
        c *= 2;
      }
      if (e + eBias >= 1) {
        value += rt / c;
      } else {
        value += rt * Math.pow(2, 1 - eBias);
      }
      if (value * c >= 2) {
        e++;
        c /= 2;
      }
      if (e + eBias >= eMax) {
        m = 0;
        e = eMax;
      } else if (e + eBias >= 1) {
        m = (value * c - 1) * Math.pow(2, mLen);
        e = e + eBias;
      } else {
        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
        e = 0;
      }
    }
    for (; mLen >= 8; buffer2[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
    }
    e = e << mLen | m;
    eLen += mLen;
    for (; eLen > 0; buffer2[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
    }
    buffer2[offset + i - d] |= s * 128;
  };
  return ieee754;
}
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var hasRequiredBuffer;
function requireBuffer() {
  if (hasRequiredBuffer) return buffer$1;
  hasRequiredBuffer = 1;
  (function(exports) {
    const base64 = requireBase64Js();
    const ieee7542 = requireIeee754();
    const customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports.Buffer = Buffer2;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    const K_MAX_LENGTH = 2147483647;
    exports.kMaxLength = K_MAX_LENGTH;
    Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer2.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this)) return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer2.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this)) return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length) {
      if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length);
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function Buffer2(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        }
        return allocUnsafe(arg);
      }
      return from(arg, encodingOrOffset, length);
    }
    Buffer2.poolSize = 8192;
    function from(value, encodingOrOffset, length) {
      if (typeof value === "string") {
        return fromString(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      if (isInstance2(value, ArrayBuffer) || value && isInstance2(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance2(value, SharedArrayBuffer) || value && isInstance2(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
      }
      if (typeof value === "number") {
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer2.from(valueOf, encodingOrOffset, length);
      }
      const b = fromObject(value);
      if (b) return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
      }
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    Buffer2.from = function(value, encodingOrOffset, length) {
      return from(value, encodingOrOffset, length);
    };
    Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer2, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer2.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer2.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer2.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString(string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer2.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length = byteLength(string, encoding) | 0;
      let buf = createBuffer(length);
      const actual = buf.write(string, encoding);
      if (actual !== length) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      const length = array.length < 0 ? 0 : checked(array.length) | 0;
      const buf = createBuffer(length);
      for (let i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance2(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length === void 0) {
        buf = new Uint8Array(array);
      } else if (length === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length);
      }
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer2.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length) {
      if (length >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer2.alloc(+length);
    }
    Buffer2.isBuffer = function isBuffer(b) {
      return b != null && b._isBuffer === true && b !== Buffer2.prototype;
    };
    Buffer2.compare = function compare(a, b) {
      if (isInstance2(a, Uint8Array)) a = Buffer2.from(a, a.offset, a.byteLength);
      if (isInstance2(b, Uint8Array)) b = Buffer2.from(b, b.offset, b.byteLength);
      if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      }
      if (a === b) return 0;
      let x = a.length;
      let y = b.length;
      for (let i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    Buffer2.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer2.concat = function concat(list, length) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer2.alloc(0);
      }
      let i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      const buffer2 = Buffer2.allocUnsafe(length);
      let pos = 0;
      for (i = 0; i < list.length; ++i) {
        let buf = list[i];
        if (isInstance2(buf, Uint8Array)) {
          if (pos + buf.length > buffer2.length) {
            if (!Buffer2.isBuffer(buf)) buf = Buffer2.from(buf);
            buf.copy(buffer2, pos);
          } else {
            Uint8Array.prototype.set.call(
              buffer2,
              buf,
              pos
            );
          }
        } else if (!Buffer2.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer2, pos);
        }
        pos += buf.length;
      }
      return buffer2;
    };
    function byteLength(string, encoding) {
      if (Buffer2.isBuffer(string)) {
        return string.length;
      }
      if (ArrayBuffer.isView(string) || isInstance2(string, ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
        );
      }
      const len = string.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0) return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding) encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.prototype._isBuffer = true;
    function swap(b, n, m) {
      const i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer2.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer2.prototype.swap32 = function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer2.prototype.swap64 = function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer2.prototype.toString = function toString() {
      const length = this.length;
      if (length === 0) return "";
      if (arguments.length === 0) return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
    Buffer2.prototype.equals = function equals(b) {
      if (!Buffer2.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
      if (this === b) return true;
      return Buffer2.compare(this, b) === 0;
    };
    Buffer2.prototype.inspect = function inspect2() {
      let str = "";
      const max2 = exports.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max2).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max2) str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
    }
    Buffer2.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance2(target, Uint8Array)) {
        target = Buffer2.from(target, target.offset, target.byteLength);
      }
      if (!Buffer2.isBuffer(target)) {
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
        );
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target) return 0;
      let x = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y) return -1;
      if (y < x) return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer2, val, byteOffset, encoding, dir) {
      if (buffer2.length === 0) return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer2.length - 1;
      }
      if (byteOffset < 0) byteOffset = buffer2.length + byteOffset;
      if (byteOffset >= buffer2.length) {
        if (dir) return -1;
        else byteOffset = buffer2.length - 1;
      } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
      }
      if (typeof val === "string") {
        val = Buffer2.from(val, encoding);
      }
      if (Buffer2.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer2, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer2, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer2, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer2, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read2(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      let i;
      if (dir) {
        let foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read2(arr, i) === read2(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read2(arr, i + j) !== read2(val, j)) {
              found = false;
              break;
            }
          }
          if (found) return i;
        }
      }
      return -1;
    }
    Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      const remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      const strLen = string.length;
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      let i;
      for (i = 0; i < length; ++i) {
        const parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed)) return i;
        buf[offset + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer2.prototype.write = function write2(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
          length = length >>> 0;
          if (encoding === void 0) encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      }
      const remaining = this.length - offset;
      if (length === void 0 || length > remaining) length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding) encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer2.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      const res = [];
      let i = start;
      while (i < end) {
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    const MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(
          String,
          codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
        );
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      const len = buf.length;
      if (!start || start < 0) start = 0;
      if (!end || end < 0 || end > len) end = len;
      let out = "";
      for (let i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end);
      let res = "";
      for (let i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer2.prototype.slice = function slice(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0) start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0) end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start) end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer2.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
      if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      let val = this[offset + --byteLength2];
      let mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
      const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    });
    Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    });
    Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) checkOffset(offset, byteLength2, this.length);
      let i = byteLength2;
      let mul = 1;
      let val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128)) return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer2.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
    });
    Buffer2.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = (first << 24) + // Overflow
      this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
    });
    Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee7542.read(this, offset, true, 23, 4);
    };
    Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 4, this.length);
      return ieee7542.read(this, offset, false, 23, 4);
    };
    Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee7542.read(this, offset, true, 52, 8);
    };
    Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert) checkOffset(offset, 8, this.length);
      return ieee7542.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max2, min) {
      if (!Buffer2.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max2 || value < min) throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
    }
    Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let mul = 1;
      let i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function wrtBigUInt64LE(buf, value, offset, min, max2) {
      checkIntBI(value, min, max2, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      return offset;
    }
    function wrtBigUInt64BE(buf, value, offset, min, max2) {
      checkIntBI(value, min, max2, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset + 7] = lo;
      lo = lo >> 8;
      buf[offset + 6] = lo;
      lo = lo >> 8;
      buf[offset + 5] = lo;
      lo = lo >> 8;
      buf[offset + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset + 3] = hi;
      hi = hi >> 8;
      buf[offset + 2] = hi;
      hi = hi >> 8;
      buf[offset + 1] = hi;
      hi = hi >> 8;
      buf[offset] = hi;
      return offset + 8;
    }
    Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
      if (value < 0) value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0) value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf, value, offset, ext, max2, min) {
      if (offset + ext > buf.length) throw new RangeError("Index out of range");
      if (offset < 0) throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4);
      }
      ieee7542.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8);
      }
      ieee7542.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer2.isBuffer(target)) throw new TypeError("argument should be a Buffer");
      if (!start) start = 0;
      if (!end && end !== 0) end = this.length;
      if (targetStart >= target.length) targetStart = target.length;
      if (!targetStart) targetStart = 0;
      if (end > 0 && end < start) end = start;
      if (end === start) return 0;
      if (target.length === 0 || this.length === 0) return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
      if (end < 0) throw new RangeError("sourceEnd out of bounds");
      if (end > this.length) end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(
          target,
          this.subarray(start, end),
          targetStart
        );
      }
      return len;
    };
    Buffer2.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code = val.charCodeAt(0);
          if (encoding === "utf8" && code < 128 || encoding === "latin1") {
            val = code;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val) val = 0;
      let i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        const bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    const errors2 = {};
    function E(sym, getMessage, Base) {
      errors2[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function(name) {
        if (name) {
          return `${name} is outside of buffer bounds`;
        }
        return "Attempt to access memory outside buffer bounds";
      },
      RangeError
    );
    E(
      "ERR_INVALID_ARG_TYPE",
      function(name, actual) {
        return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
      },
      TypeError
    );
    E(
      "ERR_OUT_OF_RANGE",
      function(str, range, input) {
        let msg = `The value of "${str}" is out of range.`;
        let received = input;
        if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
          received = addNumericalSeparator(String(input));
        } else if (typeof input === "bigint") {
          received = String(input);
          if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
            received = addNumericalSeparator(received);
          }
          received += "n";
        }
        msg += ` It must be ${range}. Received ${received}`;
        return msg;
      },
      RangeError
    );
    function addNumericalSeparator(val) {
      let res = "";
      let i = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i >= start + 4; i -= 3) {
        res = `_${val.slice(i - 3, i)}${res}`;
      }
      return `${val.slice(0, i)}${res}`;
    }
    function checkBounds(buf, offset, byteLength2) {
      validateNumber(offset, "offset");
      if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
        boundsError(offset, buf.length - (byteLength2 + 1));
      }
    }
    function checkIntBI(value, min, max2, buf, offset, byteLength2) {
      if (value > max2 || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
          } else {
            range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
          }
        }
        throw new errors2.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf, offset, byteLength2);
    }
    function validateNumber(value, name) {
      if (typeof value !== "number") {
        throw new errors2.ERR_INVALID_ARG_TYPE(name, "number", value);
      }
    }
    function boundsError(value, length, type) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors2.ERR_OUT_OF_RANGE("offset", "an integer", value);
      }
      if (length < 0) {
        throw new errors2.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors2.ERR_OUT_OF_RANGE(
        "offset",
        `>= ${0} and <= ${length}`,
        value
      );
    }
    const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2) return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      let codePoint;
      const length = string.length;
      let leadSurrogate = null;
      const bytes = [];
      for (let i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0) break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0) break;
          bytes.push(
            codePoint >> 6 | 192,
            codePoint & 63 | 128
          );
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0) break;
          bytes.push(
            codePoint >> 12 | 224,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0) break;
          bytes.push(
            codePoint >> 18 | 240,
            codePoint >> 12 & 63 | 128,
            codePoint >> 6 & 63 | 128,
            codePoint & 63 | 128
          );
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      let c, hi, lo;
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset, length) {
      let i;
      for (i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length) break;
        dst[i + offset] = src[i];
      }
      return i;
    }
    function isInstance2(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    const hexSliceLookupTable = (function() {
      const alphabet = "0123456789abcdef";
      const table = new Array(256);
      for (let i = 0; i < 16; ++i) {
        const i16 = i * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i] + alphabet[j];
        }
      }
      return table;
    })();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  })(buffer$1);
  return buffer$1;
}
var bufferExports = requireBuffer();
function _bindFunctions(fns, thisValue) {
  return Object.fromEntries(Object.entries(fns).map(([k, v]) => [k, typeof v == "function" ? v.bind(thisValue) : v]));
}
function bindContext(root, credentials$1 = structuredClone(credentials)) {
  const ctx = {
    root,
    credentials: createCredentials(credentials$1)
  };
  const fn_fs = _bindFunctions(fs, ctx);
  const fn_promises = _bindFunctions(promises, ctx);
  return { ...ctx, fs: { ...fs, ...fn_fs, promises: { ...promises, ...fn_promises } } };
}
const fdMap = /* @__PURE__ */ new Map();
let nextFd = 100;
function file2fd(file) {
  const fd2 = nextFd++;
  fdMap.set(fd2, file);
  return fd2;
}
function fd2file(fd2) {
  if (!fdMap.has(fd2)) {
    throw new ErrnoError(Errno.EBADF);
  }
  return fdMap.get(fd2);
}
const mounts = /* @__PURE__ */ new Map();
mount$1("/", InMemory.create({ name: "root" }));
function mount$1(mountPoint, fs2) {
  if (mountPoint[0] != "/")
    mountPoint = "/" + mountPoint;
  mountPoint = resolve(mountPoint);
  if (mounts.has(mountPoint))
    throw err$2(new ErrnoError(Errno.EINVAL, "Mount point is already in use: " + mountPoint));
  fs2._mountPoint = mountPoint;
  mounts.set(mountPoint, fs2);
  info(`Mounted ${fs2.name} on ${mountPoint}`);
  debug(`${fs2.name} attributes: ${[...fs2.attributes].map(([k, v]) => v !== void 0 && v !== null ? k + "=" + v : k).join(", ")}`);
}
function umount(mountPoint) {
  if (mountPoint[0] != "/")
    mountPoint = "/" + mountPoint;
  mountPoint = resolve(mountPoint);
  if (!mounts.has(mountPoint)) {
    warn(mountPoint + " is already unmounted");
    return;
  }
  mounts.delete(mountPoint);
  notice("Unmounted " + mountPoint);
}
function resolveMount(path, ctx) {
  const root = (ctx === null || ctx === void 0 ? void 0 : ctx.root) || "/";
  path = normalizePath(join(root, path));
  const sortedMounts = [...mounts].sort((a, b) => a[0].length > b[0].length ? -1 : 1);
  for (const [mountPoint, fs2] of sortedMounts) {
    if (_isParentOf(mountPoint, path)) {
      path = path.slice(mountPoint.length > 1 ? mountPoint.length : 0);
      if (path === "")
        path = root;
      return { fs: fs2, path, mountPoint, root };
    }
  }
  throw alert(new ErrnoError(Errno.EIO, "No file system", path));
}
function fixPaths(text, paths) {
  for (const [from, to] of Object.entries(paths)) {
    text = text === null || text === void 0 ? void 0 : text.replaceAll(from, to);
  }
  return text;
}
function fixError(e, paths) {
  if (typeof e.stack == "string") {
    e.stack = fixPaths(e.stack, paths);
  }
  try {
    e.message = fixPaths(e.message, paths);
  } catch {
  }
  if (e.path)
    e.path = fixPaths(e.path, paths);
  return e;
}
function mountObject(mounts2) {
  log_deprecated("mountObject");
  if ("/" in mounts2) {
    umount("/");
  }
  for (const [point, fs2] of Object.entries(mounts2)) {
    mount$1(point, fs2);
  }
}
function _statfs(fs2, bigint) {
  const md = fs2.usage();
  const bs = md.blockSize || 4096;
  return {
    type: (bigint ? BigInt : Number)(fs2.id),
    bsize: (bigint ? BigInt : Number)(bs),
    ffree: (bigint ? BigInt : Number)(md.freeNodes || size_max),
    files: (bigint ? BigInt : Number)(md.totalNodes || size_max),
    bavail: (bigint ? BigInt : Number)(md.freeSpace / bs),
    bfree: (bigint ? BigInt : Number)(md.freeSpace / bs),
    blocks: (bigint ? BigInt : Number)(md.totalSpace / bs)
  };
}
function chroot(path, inPlace) {
  const creds = this === null || this === void 0 ? void 0 : this.credentials;
  if ((creds === null || creds === void 0 ? void 0 : creds.uid) && (creds === null || creds === void 0 ? void 0 : creds.gid) && (creds === null || creds === void 0 ? void 0 : creds.euid) && (creds === null || creds === void 0 ? void 0 : creds.egid)) {
    throw new ErrnoError(Errno.EPERM, "Can not chroot() as non-root user");
  }
  if (inPlace && this) {
    this.root += path;
    return this;
  }
  return bindContext(join((this === null || this === void 0 ? void 0 : this.root) || "/", path), creds);
}
function _isParentOf(parent, child) {
  if (parent === "/" || parent === child)
    return true;
  if (!parent.endsWith("/"))
    parent += "/";
  return child.startsWith(parent);
}
class Watcher extends EventEmitter {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  off(event, fn, context, once) {
    return super.off(event, fn, context, once);
  }
  removeListener(event, fn, context, once) {
    return super.removeListener(event, fn, context, once);
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */
  constructor(_context, path) {
    super();
    this._context = _context;
    this.path = path;
  }
  setMaxListeners() {
    throw ErrnoError.With("ENOSYS", this.path, "Watcher.setMaxListeners");
  }
  getMaxListeners() {
    throw ErrnoError.With("ENOSYS", this.path, "Watcher.getMaxListeners");
  }
  prependListener() {
    throw ErrnoError.With("ENOSYS", this.path, "Watcher.prependListener");
  }
  prependOnceListener() {
    throw ErrnoError.With("ENOSYS", this.path, "Watcher.prependOnceListener");
  }
  rawListeners() {
    throw ErrnoError.With("ENOSYS", this.path, "Watcher.rawListeners");
  }
  ref() {
    return this;
  }
  unref() {
    return this;
  }
}
class FSWatcher extends Watcher {
  constructor(context, path, options) {
    super(context, path);
    this.options = options;
    this.realpath = (context === null || context === void 0 ? void 0 : context.root) ? join(context.root, path) : path;
    addWatcher(this.realpath, this);
  }
  close() {
    super.emit("close");
    removeWatcher(this.realpath, this);
  }
  [Symbol.dispose]() {
    this.close();
  }
}
class StatWatcher extends Watcher {
  constructor(context, path, options) {
    super(context, path);
    this.options = options;
    this.start();
  }
  onInterval() {
    try {
      const current = statSync(this.path);
      if (!isStatsEqual(this.previous, current)) {
        this.emit("change", current, this.previous);
        this.previous = current;
      }
    } catch (e) {
      this.emit("error", e);
    }
  }
  start() {
    const interval = this.options.interval || 5e3;
    try {
      this.previous = statSync(this.path);
    } catch (e) {
      this.emit("error", e);
      return;
    }
    this.intervalId = setInterval(this.onInterval.bind(this), interval);
    if (!this.options.persistent && typeof this.intervalId == "object") {
      this.intervalId.unref();
    }
  }
  /**
   * @internal
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = void 0;
    }
    this.removeAllListeners();
  }
}
const watchers = /* @__PURE__ */ new Map();
function addWatcher(path, watcher) {
  const normalizedPath = normalizePath(path);
  if (!watchers.has(normalizedPath)) {
    watchers.set(normalizedPath, /* @__PURE__ */ new Set());
  }
  watchers.get(normalizedPath).add(watcher);
}
function removeWatcher(path, watcher) {
  const normalizedPath = normalizePath(path);
  if (watchers.has(normalizedPath)) {
    watchers.get(normalizedPath).delete(watcher);
    if (watchers.get(normalizedPath).size === 0) {
      watchers.delete(normalizedPath);
    }
  }
}
function emitChange(context, eventType, filename) {
  var _a3;
  if (context)
    filename = join((_a3 = context.root) !== null && _a3 !== void 0 ? _a3 : "/", filename);
  filename = normalizePath(filename);
  for (let path = filename; path != "/"; path = dirname(path)) {
    const watchersForPath = watchers.get(path);
    if (!watchersForPath)
      continue;
    for (const watcher of watchersForPath) {
      watcher.emit("change", eventType, relative(path, filename) || basename(filename));
    }
  }
}
var __addDisposableResource$2 = function(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async });
  } else if (async) {
    env.stack.push({ async: true });
  }
  return value;
};
var __disposeResources$2 = /* @__PURE__ */ (function(SuppressedError2) {
  return function(env) {
    function fail(e) {
      env.error = env.hasError ? new SuppressedError2(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  };
})(typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
function renameSync(oldPath, newPath) {
  oldPath = normalizePath(oldPath);
  newPath = normalizePath(newPath);
  const oldMount = resolveMount(oldPath, this);
  const newMount = resolveMount(newPath, this);
  if (config.checkAccess && !statSync.call(this, dirname(oldPath)).hasAccess(W_OK, this)) {
    throw ErrnoError.With("EACCES", oldPath, "rename");
  }
  try {
    if (oldMount === newMount) {
      oldMount.fs.renameSync(oldMount.path, newMount.path);
      emitChange(this, "rename", oldPath.toString());
      emitChange(this, "change", newPath.toString());
      return;
    }
    writeFileSync.call(this, newPath, readFileSync(oldPath));
    unlinkSync.call(this, oldPath);
    emitChange(this, "rename", oldPath.toString());
  } catch (e) {
    throw fixError(e, { [oldMount.path]: oldPath, [newMount.path]: newPath });
  }
}
function existsSync(path) {
  path = normalizePath(path);
  try {
    const { fs: fs2, path: resolvedPath } = resolveMount(realpathSync.call(this, path), this);
    return fs2.existsSync(resolvedPath);
  } catch (e) {
    if (e.errno == Errno.ENOENT) {
      return false;
    }
    throw e;
  }
}
function statSync(path, options) {
  path = normalizePath(path);
  const { fs: fs2, path: resolved } = resolveMount(realpathSync.call(this, path), this);
  try {
    const stats = fs2.statSync(resolved);
    if (config.checkAccess && !stats.hasAccess(R_OK, this)) {
      throw ErrnoError.With("EACCES", resolved, "stat");
    }
    return (options === null || options === void 0 ? void 0 : options.bigint) ? new BigIntStats(stats) : stats;
  } catch (e) {
    throw fixError(e, { [resolved]: path });
  }
}
function lstatSync(path, options) {
  path = normalizePath(path);
  const { fs: fs2, path: resolved } = resolveMount(path, this);
  try {
    const stats = fs2.statSync(resolved);
    return (options === null || options === void 0 ? void 0 : options.bigint) ? new BigIntStats(stats) : stats;
  } catch (e) {
    throw fixError(e, { [resolved]: path });
  }
}
function truncateSync(path, len = 0) {
  const env_1 = { stack: [], error: void 0, hasError: false };
  try {
    const file = __addDisposableResource$2(env_1, _openSync.call(this, path, { flag: "r+" }), false);
    len || (len = 0);
    if (len < 0) {
      throw new ErrnoError(Errno.EINVAL);
    }
    file.truncateSync(len);
  } catch (e_1) {
    env_1.error = e_1;
    env_1.hasError = true;
  } finally {
    __disposeResources$2(env_1);
  }
}
function unlinkSync(path) {
  path = normalizePath(path);
  const { fs: fs2, path: resolved } = resolveMount(path, this);
  try {
    if (config.checkAccess && !fs2.statSync(resolved).hasAccess(W_OK, this)) {
      throw ErrnoError.With("EACCES", resolved, "unlink");
    }
    fs2.unlinkSync(resolved);
    emitChange(this, "rename", path.toString());
  } catch (e) {
    throw fixError(e, { [resolved]: path });
  }
}
function applySetId$1(file, uid, gid) {
  if (file.fs.attributes.has("setid"))
    return;
  const parent = file.fs.statSync(dirname(file.path));
  file.chownSync(
    parent.mode & S_ISUID ? parent.uid : uid,
    // manually apply setuid/setgid
    parent.mode & S_ISGID ? parent.gid : gid
  );
}
function _openSync(path, opt) {
  var _a3;
  path = normalizePath(path);
  const mode = normalizeMode(opt.mode, 420), flag = parseFlag(opt.flag);
  path = opt.preserveSymlinks ? path : realpathSync.call(this, path);
  const { fs: fs2, path: resolved } = resolveMount(path, this);
  let stats;
  try {
    stats = fs2.statSync(resolved);
  } catch {
  }
  if (!stats) {
    if (!isWriteable(flag) && !isAppendable(flag) || flag == "r+") {
      throw ErrnoError.With("ENOENT", path, "_open");
    }
    const parentStats = fs2.statSync(dirname(resolved));
    if (config.checkAccess && !parentStats.hasAccess(W_OK, this)) {
      throw ErrnoError.With("EACCES", dirname(path), "_open");
    }
    if (!parentStats.isDirectory()) {
      throw ErrnoError.With("ENOTDIR", dirname(path), "_open");
    }
    const { euid: uid, egid: gid } = (_a3 = this === null || this === void 0 ? void 0 : this.credentials) !== null && _a3 !== void 0 ? _a3 : credentials;
    const file2 = fs2.createFileSync(resolved, flag, mode, { uid, gid });
    if (!opt.allowDirectory && mode & S_IFDIR)
      throw ErrnoError.With("EISDIR", path, "_open");
    applySetId$1(file2, uid, gid);
    return file2;
  }
  if (config.checkAccess && (!stats.hasAccess(mode, this) || !stats.hasAccess(flagToMode(flag), this))) {
    throw ErrnoError.With("EACCES", path, "_open");
  }
  if (isExclusive(flag)) {
    throw ErrnoError.With("EEXIST", path, "_open");
  }
  const file = fs2.openFileSync(resolved, flag);
  if (isTruncating(flag)) {
    file.truncateSync(0);
  }
  if (!opt.allowDirectory && stats.mode & S_IFDIR)
    throw ErrnoError.With("EISDIR", path, "_open");
  return file;
}
function openSync(path, flag, mode = F_OK) {
  return file2fd(_openSync.call(this, path, { flag, mode }));
}
function lopenSync(path, flag, mode) {
  return file2fd(_openSync.call(this, path, { flag, mode, preserveSymlinks: true }));
}
function _readFileSync(path, flag, preserveSymlinks) {
  const env_2 = { stack: [], error: void 0, hasError: false };
  try {
    path = normalizePath(path);
    const file = __addDisposableResource$2(env_2, _openSync.call(this, path, { flag, mode: 420, preserveSymlinks }), false);
    const stat2 = file.statSync();
    const data = new Uint8Array(stat2.size);
    file.readSync(data, 0, stat2.size, 0);
    return data;
  } catch (e_2) {
    env_2.error = e_2;
    env_2.hasError = true;
  } finally {
    __disposeResources$2(env_2);
  }
}
function readFileSync(path, _options = {}) {
  const options = normalizeOptions(_options, null, "r", 420);
  const flag = parseFlag(options.flag);
  if (!isReadable(flag)) {
    throw new ErrnoError(Errno.EINVAL, "Flag passed to readFile must allow for reading");
  }
  const data = bufferExports.Buffer.from(_readFileSync.call(this, typeof path == "number" ? fd2file(path).path : path, options.flag, false));
  return options.encoding ? data.toString(options.encoding) : data;
}
function writeFileSync(path, data, _options = {}) {
  const env_3 = { stack: [], error: void 0, hasError: false };
  try {
    const options = normalizeOptions(_options, "utf8", "w+", 420);
    const flag = parseFlag(options.flag);
    if (!isWriteable(flag)) {
      throw new ErrnoError(Errno.EINVAL, "Flag passed to writeFile must allow for writing");
    }
    if (typeof data != "string" && !options.encoding) {
      throw new ErrnoError(Errno.EINVAL, "Encoding not specified");
    }
    const encodedData = typeof data == "string" ? bufferExports.Buffer.from(data, options.encoding) : new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    if (!encodedData) {
      throw new ErrnoError(Errno.EINVAL, "Data not specified");
    }
    const file = __addDisposableResource$2(env_3, _openSync.call(this, typeof path == "number" ? fd2file(path).path : path.toString(), {
      flag,
      mode: options.mode,
      preserveSymlinks: true
    }), false);
    file.writeSync(encodedData, 0, encodedData.byteLength, 0);
    emitChange(this, "change", path.toString());
  } catch (e_3) {
    env_3.error = e_3;
    env_3.hasError = true;
  } finally {
    __disposeResources$2(env_3);
  }
}
function appendFileSync(filename, data, _options = {}) {
  const env_4 = { stack: [], error: void 0, hasError: false };
  try {
    const options = normalizeOptions(_options, "utf8", "a+", 420);
    const flag = parseFlag(options.flag);
    if (!isAppendable(flag)) {
      throw new ErrnoError(Errno.EINVAL, "Flag passed to appendFile must allow for appending");
    }
    if (typeof data != "string" && !options.encoding) {
      throw new ErrnoError(Errno.EINVAL, "Encoding not specified");
    }
    const encodedData = typeof data == "string" ? bufferExports.Buffer.from(data, options.encoding) : new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    const file = __addDisposableResource$2(env_4, _openSync.call(this, typeof filename == "number" ? fd2file(filename).path : filename.toString(), {
      flag,
      mode: options.mode,
      preserveSymlinks: true
    }), false);
    file.writeSync(encodedData, 0, encodedData.byteLength);
  } catch (e_4) {
    env_4.error = e_4;
    env_4.hasError = true;
  } finally {
    __disposeResources$2(env_4);
  }
}
function fstatSync(fd2, options) {
  const stats = fd2file(fd2).statSync();
  return (options === null || options === void 0 ? void 0 : options.bigint) ? new BigIntStats(stats) : stats;
}
function closeSync(fd2) {
  fd2file(fd2).closeSync();
  fdMap.delete(fd2);
}
function ftruncateSync(fd2, len = 0) {
  len || (len = 0);
  if (len < 0) {
    throw new ErrnoError(Errno.EINVAL);
  }
  fd2file(fd2).truncateSync(len);
}
function fsyncSync(fd2) {
  fd2file(fd2).syncSync();
}
function fdatasyncSync(fd2) {
  fd2file(fd2).datasyncSync();
}
function writeSync(fd2, data, posOrOff, lenOrEnc, pos) {
  let buffer2, offset, length, position;
  if (typeof data === "string") {
    position = typeof posOrOff === "number" ? posOrOff : null;
    const encoding = typeof lenOrEnc === "string" ? lenOrEnc : "utf8";
    offset = 0;
    buffer2 = bufferExports.Buffer.from(data, encoding);
    length = buffer2.byteLength;
  } else {
    buffer2 = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    offset = posOrOff;
    length = lenOrEnc;
    position = typeof pos === "number" ? pos : null;
  }
  const file = fd2file(fd2);
  position !== null && position !== void 0 ? position : position = file.position;
  const bytesWritten = file.writeSync(buffer2, offset, length, position);
  emitChange(this, "change", file.path);
  return bytesWritten;
}
function readSync(fd2, buffer2, options, length, position) {
  const file = fd2file(fd2);
  const offset = typeof options == "object" ? options.offset : options;
  if (typeof options == "object") {
    length = options.length;
    position = options.position;
  }
  position = Number(position);
  if (isNaN(position)) {
    position = file.position;
  }
  return file.readSync(buffer2, offset, length, position);
}
function fchownSync(fd2, uid, gid) {
  fd2file(fd2).chownSync(uid, gid);
}
function fchmodSync(fd2, mode) {
  const numMode = normalizeMode(mode, -1);
  if (numMode < 0) {
    throw new ErrnoError(Errno.EINVAL, `Invalid mode.`);
  }
  fd2file(fd2).chmodSync(numMode);
}
function futimesSync(fd2, atime, mtime) {
  fd2file(fd2).utimesSync(normalizeTime(atime), normalizeTime(mtime));
}
function rmdirSync(path) {
  path = normalizePath(path);
  const { fs: fs2, path: resolved } = resolveMount(realpathSync.call(this, path), this);
  try {
    const stats = fs2.statSync(resolved);
    if (!stats.isDirectory()) {
      throw ErrnoError.With("ENOTDIR", resolved, "rmdir");
    }
    if (config.checkAccess && !stats.hasAccess(W_OK, this)) {
      throw ErrnoError.With("EACCES", resolved, "rmdir");
    }
    fs2.rmdirSync(resolved);
    emitChange(this, "rename", path.toString());
  } catch (e) {
    throw fixError(e, { [resolved]: path });
  }
}
function mkdirSync(path, options) {
  var _a3, _b3;
  const { euid: uid, egid: gid } = (_a3 = this === null || this === void 0 ? void 0 : this.credentials) !== null && _a3 !== void 0 ? _a3 : credentials;
  options = typeof options === "object" ? options : { mode: options };
  const mode = normalizeMode(options === null || options === void 0 ? void 0 : options.mode, 511);
  path = realpathSync.call(this, path);
  const { fs: fs2, path: resolved, root } = resolveMount(path, this);
  const errorPaths = { [resolved]: path };
  try {
    if (!(options === null || options === void 0 ? void 0 : options.recursive)) {
      if (config.checkAccess && !fs2.statSync(dirname(resolved)).hasAccess(W_OK, this)) {
        throw ErrnoError.With("EACCES", dirname(resolved), "mkdir");
      }
      fs2.mkdirSync(resolved, mode, { uid, gid });
      applySetId$1(fs2.openFileSync(resolved, "r+"), uid, gid);
      return;
    }
    const dirs = [];
    for (let dir = resolved, original = path; !fs2.existsSync(dir); dir = dirname(dir), original = dirname(original)) {
      dirs.unshift(dir);
      errorPaths[dir] = original;
    }
    for (const dir of dirs) {
      if (config.checkAccess && !fs2.statSync(dirname(dir)).hasAccess(W_OK, this)) {
        throw ErrnoError.With("EACCES", dirname(dir), "mkdir");
      }
      fs2.mkdirSync(dir, mode, { uid, gid });
      applySetId$1(fs2.openFileSync(dir, "r+"), uid, gid);
      emitChange(this, "rename", dir);
    }
    return root.length == 1 ? dirs[0] : (_b3 = dirs[0]) === null || _b3 === void 0 ? void 0 : _b3.slice(root.length);
  } catch (e) {
    throw fixError(e, errorPaths);
  }
}
function readdirSync(path, options) {
  options = typeof options === "object" ? options : { encoding: options };
  path = normalizePath(path);
  const { fs: fs2, path: resolved } = resolveMount(realpathSync.call(this, path), this);
  let entries2;
  try {
    const stats = fs2.statSync(resolved);
    if (config.checkAccess && !stats.hasAccess(R_OK, this)) {
      throw ErrnoError.With("EACCES", resolved, "readdir");
    }
    if (!stats.isDirectory()) {
      throw ErrnoError.With("ENOTDIR", resolved, "readdir");
    }
    entries2 = fs2.readdirSync(resolved);
  } catch (e) {
    throw fixError(e, { [resolved]: path });
  }
  const values = [];
  for (const entry of entries2) {
    let entryStat;
    try {
      entryStat = fs2.statSync(join(resolved, entry));
    } catch {
      continue;
    }
    if (options === null || options === void 0 ? void 0 : options.withFileTypes) {
      values.push(new Dirent(entry, entryStat));
    } else if ((options === null || options === void 0 ? void 0 : options.encoding) == "buffer") {
      values.push(bufferExports.Buffer.from(entry));
    } else {
      values.push(entry);
    }
    if (!entryStat.isDirectory() || !(options === null || options === void 0 ? void 0 : options.recursive))
      continue;
    for (const subEntry of readdirSync.call(this, join(path, entry), options)) {
      if (subEntry instanceof Dirent) {
        subEntry.path = join(entry, subEntry.path);
        values.push(subEntry);
      } else if (bufferExports.Buffer.isBuffer(subEntry)) {
        values.push(bufferExports.Buffer.from(join(entry, decodeUTF8(subEntry))));
      } else {
        values.push(join(entry, subEntry));
      }
    }
  }
  return values;
}
function linkSync(targetPath, linkPath) {
  targetPath = normalizePath(targetPath);
  if (config.checkAccess && !statSync(dirname(targetPath)).hasAccess(R_OK, this)) {
    throw ErrnoError.With("EACCES", dirname(targetPath), "link");
  }
  linkPath = normalizePath(linkPath);
  if (config.checkAccess && !statSync(dirname(linkPath)).hasAccess(W_OK, this)) {
    throw ErrnoError.With("EACCES", dirname(linkPath), "link");
  }
  const { fs: fs2, path } = resolveMount(targetPath, this);
  const link2 = resolveMount(linkPath, this);
  if (fs2 != link2.fs) {
    throw ErrnoError.With("EXDEV", linkPath, "link");
  }
  try {
    if (config.checkAccess && !fs2.statSync(path).hasAccess(R_OK, this)) {
      throw ErrnoError.With("EACCES", path, "link");
    }
    return fs2.linkSync(path, link2.path);
  } catch (e) {
    throw fixError(e, { [path]: targetPath, [link2.path]: linkPath });
  }
}
function symlinkSync(target, path, type = "file") {
  if (!["file", "dir", "junction"].includes(type)) {
    throw new ErrnoError(Errno.EINVAL, "Invalid type: " + type);
  }
  if (existsSync.call(this, path)) {
    throw ErrnoError.With("EEXIST", path.toString(), "symlink");
  }
  writeFileSync.call(this, path, normalizePath(target, true));
  const file = _openSync.call(this, path, { flag: "r+", mode: 420, preserveSymlinks: true });
  file.chmodSync(S_IFLNK);
}
function readlinkSync(path, options) {
  const value = bufferExports.Buffer.from(_readFileSync.call(this, path, "r", true));
  const encoding = typeof options == "object" ? options === null || options === void 0 ? void 0 : options.encoding : options;
  if (encoding == "buffer") {
    return value;
  }
  return value.toString(encoding !== null && encoding !== void 0 ? encoding : "utf-8");
}
function chownSync(path, uid, gid) {
  const fd2 = openSync.call(this, path, "r+");
  fchownSync(fd2, uid, gid);
  closeSync(fd2);
}
function lchownSync(path, uid, gid) {
  const fd2 = lopenSync.call(this, path, "r+");
  fchownSync(fd2, uid, gid);
  closeSync(fd2);
}
function chmodSync(path, mode) {
  const fd2 = openSync.call(this, path, "r+");
  fchmodSync(fd2, mode);
  closeSync(fd2);
}
function lchmodSync(path, mode) {
  const fd2 = lopenSync.call(this, path, "r+");
  fchmodSync(fd2, mode);
  closeSync(fd2);
}
function utimesSync(path, atime, mtime) {
  const fd2 = openSync.call(this, path, "r+");
  futimesSync(fd2, atime, mtime);
  closeSync(fd2);
}
function lutimesSync(path, atime, mtime) {
  const fd2 = lopenSync.call(this, path, "r+");
  futimesSync(fd2, atime, mtime);
  closeSync(fd2);
}
function _resolveSync($, path, preserveSymlinks) {
  try {
    const resolved2 = resolveMount(path, $);
    const stats = resolved2.fs.statSync(resolved2.path);
    if (!stats.isSymbolicLink()) {
      return { ...resolved2, fullPath: path, stats };
    }
    const target = resolve(dirname(path), readlinkSync.call($, path).toString());
    return _resolveSync($, target);
  } catch {
  }
  const { base, dir } = parse(path);
  const realDir = dir == "/" ? "/" : realpathSync.call($, dir);
  const maybePath = join(realDir, base);
  const resolved = resolveMount(maybePath, $);
  try {
    const stats = resolved.fs.statSync(resolved.path);
    if (!stats.isSymbolicLink()) {
      return { ...resolved, fullPath: maybePath, stats };
    }
    const target = resolve(realDir, readlinkSync.call($, maybePath).toString());
    return _resolveSync($, target);
  } catch (e) {
    if (e.code == "ENOENT") {
      return { ...resolved, fullPath: path };
    }
    throw fixError(e, { [resolved.path]: maybePath });
  }
}
function realpathSync(path, options) {
  var _a3;
  const encoding = typeof options == "string" ? options : (_a3 = options === null || options === void 0 ? void 0 : options.encoding) !== null && _a3 !== void 0 ? _a3 : "utf8";
  path = normalizePath(path);
  const { fullPath } = _resolveSync(this, path);
  if (encoding == "utf8" || encoding == "utf-8")
    return fullPath;
  const buf = bufferExports.Buffer.from(fullPath, "utf-8");
  if (encoding == "buffer")
    return buf;
  return buf.toString(encoding);
}
function accessSync(path, mode = 384) {
  if (!config.checkAccess)
    return;
  if (!statSync.call(this, path).hasAccess(mode, this)) {
    throw new ErrnoError(Errno.EACCES);
  }
}
function rmSync(path, options) {
  path = normalizePath(path);
  let stats;
  try {
    stats = lstatSync.bind(this)(path);
  } catch (error) {
    if (error.code != "ENOENT" || !(options === null || options === void 0 ? void 0 : options.force))
      throw error;
  }
  if (!stats)
    return;
  switch (stats.mode & S_IFMT) {
    case S_IFDIR:
      if (options === null || options === void 0 ? void 0 : options.recursive) {
        for (const entry of readdirSync.call(this, path)) {
          rmSync.call(this, join(path, entry), options);
        }
      }
      rmdirSync.call(this, path);
      break;
    case S_IFREG:
    case S_IFLNK:
    case S_IFBLK:
    case S_IFCHR:
      unlinkSync.call(this, path);
      break;
    case S_IFIFO:
    case S_IFSOCK:
    default:
      throw new ErrnoError(Errno.EPERM, "File type not supported", path, "rm");
  }
}
function mkdtempSync(prefix, options) {
  const encoding = typeof options === "object" ? options === null || options === void 0 ? void 0 : options.encoding : options || "utf8";
  const fsName = `${prefix}${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const resolvedPath = "/tmp/" + fsName;
  mkdirSync.call(this, resolvedPath);
  return encoding == "buffer" ? bufferExports.Buffer.from(resolvedPath) : resolvedPath;
}
function copyFileSync(source, destination, flags) {
  source = normalizePath(source);
  destination = normalizePath(destination);
  if (flags && flags & COPYFILE_EXCL && existsSync(destination)) {
    throw new ErrnoError(Errno.EEXIST, "Destination file already exists", destination, "copyFile");
  }
  writeFileSync.call(this, destination, readFileSync(source));
  emitChange(this, "rename", destination.toString());
}
function readvSync(fd2, buffers, position) {
  const file = fd2file(fd2);
  let bytesRead = 0;
  for (const buffer2 of buffers) {
    bytesRead += file.readSync(buffer2, 0, buffer2.byteLength, position + bytesRead);
  }
  return bytesRead;
}
function writevSync(fd2, buffers, position) {
  const file = fd2file(fd2);
  let bytesWritten = 0;
  for (const buffer2 of buffers) {
    bytesWritten += file.writeSync(new Uint8Array(buffer2.buffer), 0, buffer2.byteLength, position + bytesWritten);
  }
  return bytesWritten;
}
function opendirSync(path, options) {
  path = normalizePath(path);
  return new Dir(path, this);
}
function cpSync(source, destination, opts) {
  source = normalizePath(source);
  destination = normalizePath(destination);
  const srcStats = lstatSync.call(this, source);
  if ((opts === null || opts === void 0 ? void 0 : opts.errorOnExist) && existsSync.call(this, destination)) {
    throw new ErrnoError(Errno.EEXIST, "Destination file or directory already exists", destination, "cp");
  }
  switch (srcStats.mode & S_IFMT) {
    case S_IFDIR:
      if (!(opts === null || opts === void 0 ? void 0 : opts.recursive)) {
        throw new ErrnoError(Errno.EISDIR, source + " is a directory (not copied)", source, "cp");
      }
      mkdirSync.call(this, destination, { recursive: true });
      for (const dirent of readdirSync.call(this, source, { withFileTypes: true })) {
        if (opts.filter && !opts.filter(join(source, dirent.name), join(destination, dirent.name))) {
          continue;
        }
        cpSync.call(this, join(source, dirent.name), join(destination, dirent.name), opts);
      }
      break;
    case S_IFREG:
    case S_IFLNK:
      copyFileSync.call(this, source, destination);
      break;
    case S_IFBLK:
    case S_IFCHR:
    case S_IFIFO:
    case S_IFSOCK:
    default:
      throw new ErrnoError(Errno.EPERM, "File type not supported", source, "rm");
  }
  if (opts === null || opts === void 0 ? void 0 : opts.preserveTimestamps) {
    utimesSync.call(this, destination, srcStats.atime, srcStats.mtime);
  }
}
function statfsSync(path, options) {
  path = normalizePath(path);
  const { fs: fs2 } = resolveMount(path, this);
  return _statfs(fs2, options === null || options === void 0 ? void 0 : options.bigint);
}
function globSync(pattern, options = {}) {
  pattern = Array.isArray(pattern) ? pattern : [pattern];
  const { cwd: cwd2 = "/", withFileTypes = false, exclude = () => false } = options;
  const regexPatterns = pattern.map((p) => {
    p = p.replace(/([.?+^$(){}|[\]/])/g, "\\$1").replace(/\*\*/g, ".*").replace(/\*/g, "[^/]*").replace(/\?/g, ".");
    return new RegExp(`^${p}$`);
  });
  const results = [];
  function recursiveList(dir) {
    const entries2 = readdirSync(dir, { withFileTypes, encoding: "utf8" });
    for (const entry of entries2) {
      const fullPath = withFileTypes ? entry.path : dir + "/" + entry;
      if (exclude(withFileTypes ? entry : fullPath))
        continue;
      if (statSync(fullPath).isDirectory() && regexPatterns.some((pattern2) => pattern2.source.includes(".*"))) {
        recursiveList(fullPath);
      }
      if (regexPatterns.some((pattern2) => pattern2.test(fullPath.replace(/^\/+/g, "")))) {
        results.push(withFileTypes ? entry.path : fullPath.replace(/^\/+/g, ""));
      }
    }
  }
  recursiveList(cwd2);
  return results;
}
class Dirent {
  get name() {
    return basename(this.path);
  }
  constructor(path, stats) {
    this.path = path;
    this.stats = stats;
  }
  get parentPath() {
    return this.path;
  }
  isFile() {
    return this.stats.isFile();
  }
  isDirectory() {
    return this.stats.isDirectory();
  }
  isBlockDevice() {
    return this.stats.isBlockDevice();
  }
  isCharacterDevice() {
    return this.stats.isCharacterDevice();
  }
  isSymbolicLink() {
    return this.stats.isSymbolicLink();
  }
  isFIFO() {
    return this.stats.isFIFO();
  }
  isSocket() {
    return this.stats.isSocket();
  }
}
class Dir {
  checkClosed() {
    if (this.closed) {
      throw new ErrnoError(Errno.EBADF, "Can not use closed Dir");
    }
  }
  constructor(path, context) {
    this.path = path;
    this.context = context;
    this.closed = false;
  }
  close(cb) {
    this.closed = true;
    if (!cb) {
      return Promise.resolve();
    }
    cb();
  }
  /**
   * Synchronously close the directory's underlying resource handle.
   * Subsequent reads will result in errors.
   */
  closeSync() {
    this.closed = true;
  }
  async _read() {
    var _a3, _b3;
    this.checkClosed();
    (_a3 = this._entries) !== null && _a3 !== void 0 ? _a3 : this._entries = await readdir$1.call(this.context, this.path, {
      withFileTypes: true
    });
    if (!this._entries.length)
      return null;
    return (_b3 = this._entries.shift()) !== null && _b3 !== void 0 ? _b3 : null;
  }
  read(cb) {
    if (!cb) {
      return this._read();
    }
    void this._read().then((value) => cb(void 0, value));
  }
  /**
   * Synchronously read the next directory entry via `readdir(3)` as a `Dirent`.
   * If there are no more directory entries to read, null will be returned.
   * Directory entries returned by this function are in no particular order as provided by the operating system's underlying directory mechanisms.
   */
  readSync() {
    var _a3, _b3;
    this.checkClosed();
    (_a3 = this._entries) !== null && _a3 !== void 0 ? _a3 : this._entries = readdirSync.call(this.context, this.path, { withFileTypes: true });
    if (!this._entries.length)
      return null;
    return (_b3 = this._entries.shift()) !== null && _b3 !== void 0 ? _b3 : null;
  }
  async next() {
    const value = await this._read();
    if (value) {
      return { done: false, value };
    }
    await this.close();
    return { done: true, value: void 0 };
  }
  /**
   * Asynchronously iterates over the directory via `readdir(3)` until all entries have been read.
   */
  [Symbol.asyncIterator]() {
    return this;
  }
  [Symbol.asyncDispose]() {
    return Promise.resolve();
  }
}
var browser$2 = { exports: {} };
var stream = { exports: {} };
var primordials;
var hasRequiredPrimordials;
function requirePrimordials() {
  if (hasRequiredPrimordials) return primordials;
  hasRequiredPrimordials = 1;
  class AggregateError extends Error {
    constructor(errors2) {
      if (!Array.isArray(errors2)) {
        throw new TypeError(`Expected input to be an Array, got ${typeof errors2}`);
      }
      let message = "";
      for (let i = 0; i < errors2.length; i++) {
        message += `    ${errors2[i].stack}
`;
      }
      super(message);
      this.name = "AggregateError";
      this.errors = errors2;
    }
  }
  primordials = {
    AggregateError,
    ArrayIsArray(self2) {
      return Array.isArray(self2);
    },
    ArrayPrototypeIncludes(self2, el) {
      return self2.includes(el);
    },
    ArrayPrototypeIndexOf(self2, el) {
      return self2.indexOf(el);
    },
    ArrayPrototypeJoin(self2, sep) {
      return self2.join(sep);
    },
    ArrayPrototypeMap(self2, fn) {
      return self2.map(fn);
    },
    ArrayPrototypePop(self2, el) {
      return self2.pop(el);
    },
    ArrayPrototypePush(self2, el) {
      return self2.push(el);
    },
    ArrayPrototypeSlice(self2, start, end) {
      return self2.slice(start, end);
    },
    Error,
    FunctionPrototypeCall(fn, thisArgs, ...args) {
      return fn.call(thisArgs, ...args);
    },
    FunctionPrototypeSymbolHasInstance(self2, instance) {
      return Function.prototype[Symbol.hasInstance].call(self2, instance);
    },
    MathFloor: Math.floor,
    Number,
    NumberIsInteger: Number.isInteger,
    NumberIsNaN: Number.isNaN,
    NumberMAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER,
    NumberMIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER,
    NumberParseInt: Number.parseInt,
    ObjectDefineProperties(self2, props) {
      return Object.defineProperties(self2, props);
    },
    ObjectDefineProperty(self2, name, prop) {
      return Object.defineProperty(self2, name, prop);
    },
    ObjectGetOwnPropertyDescriptor(self2, name) {
      return Object.getOwnPropertyDescriptor(self2, name);
    },
    ObjectKeys(obj) {
      return Object.keys(obj);
    },
    ObjectSetPrototypeOf(target, proto) {
      return Object.setPrototypeOf(target, proto);
    },
    Promise,
    PromisePrototypeCatch(self2, fn) {
      return self2.catch(fn);
    },
    PromisePrototypeThen(self2, thenFn, catchFn) {
      return self2.then(thenFn, catchFn);
    },
    PromiseReject(err2) {
      return Promise.reject(err2);
    },
    PromiseResolve(val) {
      return Promise.resolve(val);
    },
    ReflectApply: Reflect.apply,
    RegExpPrototypeTest(self2, value) {
      return self2.test(value);
    },
    SafeSet: Set,
    String,
    StringPrototypeSlice(self2, start, end) {
      return self2.slice(start, end);
    },
    StringPrototypeToLowerCase(self2) {
      return self2.toLowerCase();
    },
    StringPrototypeToUpperCase(self2) {
      return self2.toUpperCase();
    },
    StringPrototypeTrim(self2) {
      return self2.trim();
    },
    Symbol,
    SymbolFor: Symbol.for,
    SymbolAsyncIterator: Symbol.asyncIterator,
    SymbolHasInstance: Symbol.hasInstance,
    SymbolIterator: Symbol.iterator,
    SymbolDispose: Symbol.dispose || Symbol("Symbol.dispose"),
    SymbolAsyncDispose: Symbol.asyncDispose || Symbol("Symbol.asyncDispose"),
    TypedArrayPrototypeSet(self2, buf, len) {
      return self2.set(buf, len);
    },
    Boolean,
    Uint8Array
  };
  return primordials;
}
var util = { exports: {} };
var inspect;
var hasRequiredInspect;
function requireInspect() {
  if (hasRequiredInspect) return inspect;
  hasRequiredInspect = 1;
  inspect = {
    format(format2, ...args) {
      return format2.replace(/%([sdifj])/g, function(...[_unused, type]) {
        const replacement = args.shift();
        if (type === "f") {
          return replacement.toFixed(6);
        } else if (type === "j") {
          return JSON.stringify(replacement);
        } else if (type === "s" && typeof replacement === "object") {
          const ctor = replacement.constructor !== Object ? replacement.constructor.name : "";
          return `${ctor} {}`.trim();
        } else {
          return replacement.toString();
        }
      });
    },
    inspect(value) {
      switch (typeof value) {
        case "string":
          if (value.includes("'")) {
            if (!value.includes('"')) {
              return `"${value}"`;
            } else if (!value.includes("`") && !value.includes("${")) {
              return `\`${value}\``;
            }
          }
          return `'${value}'`;
        case "number":
          if (isNaN(value)) {
            return "NaN";
          } else if (Object.is(value, -0)) {
            return String(value);
          }
          return value;
        case "bigint":
          return `${String(value)}n`;
        case "boolean":
        case "undefined":
          return String(value);
        case "object":
          return "{}";
      }
    }
  };
  return inspect;
}
var errors;
var hasRequiredErrors;
function requireErrors() {
  if (hasRequiredErrors) return errors;
  hasRequiredErrors = 1;
  const { format: format2, inspect: inspect2 } = requireInspect();
  const { AggregateError: CustomAggregateError } = requirePrimordials();
  const AggregateError = globalThis.AggregateError || CustomAggregateError;
  const kIsNodeError = Symbol("kIsNodeError");
  const kTypes = [
    "string",
    "function",
    "number",
    "object",
    // Accept 'Function' and 'Object' as alternative to the lower cased version.
    "Function",
    "Object",
    "boolean",
    "bigint",
    "symbol"
  ];
  const classRegExp = /^([A-Z][a-z0-9]*)+$/;
  const nodeInternalPrefix = "__node_internal_";
  const codes = {};
  function assert(value, message) {
    if (!value) {
      throw new codes.ERR_INTERNAL_ASSERTION(message);
    }
  }
  function addNumericalSeparator(val) {
    let res = "";
    let i = val.length;
    const start = val[0] === "-" ? 1 : 0;
    for (; i >= start + 4; i -= 3) {
      res = `_${val.slice(i - 3, i)}${res}`;
    }
    return `${val.slice(0, i)}${res}`;
  }
  function getMessage(key2, msg, args) {
    if (typeof msg === "function") {
      assert(
        msg.length <= args.length,
        // Default options do not count.
        `Code: ${key2}; The provided arguments length (${args.length}) does not match the required ones (${msg.length}).`
      );
      return msg(...args);
    }
    const expectedLength = (msg.match(/%[dfijoOs]/g) || []).length;
    assert(
      expectedLength === args.length,
      `Code: ${key2}; The provided arguments length (${args.length}) does not match the required ones (${expectedLength}).`
    );
    if (args.length === 0) {
      return msg;
    }
    return format2(msg, ...args);
  }
  function E(code, message, Base) {
    if (!Base) {
      Base = Error;
    }
    class NodeError extends Base {
      constructor(...args) {
        super(getMessage(code, message, args));
      }
      toString() {
        return `${this.name} [${code}]: ${this.message}`;
      }
    }
    Object.defineProperties(NodeError.prototype, {
      name: {
        value: Base.name,
        writable: true,
        enumerable: false,
        configurable: true
      },
      toString: {
        value() {
          return `${this.name} [${code}]: ${this.message}`;
        },
        writable: true,
        enumerable: false,
        configurable: true
      }
    });
    NodeError.prototype.code = code;
    NodeError.prototype[kIsNodeError] = true;
    codes[code] = NodeError;
  }
  function hideStackFrames(fn) {
    const hidden = nodeInternalPrefix + fn.name;
    Object.defineProperty(fn, "name", {
      value: hidden
    });
    return fn;
  }
  function aggregateTwoErrors(innerError, outerError) {
    if (innerError && outerError && innerError !== outerError) {
      if (Array.isArray(outerError.errors)) {
        outerError.errors.push(innerError);
        return outerError;
      }
      const err2 = new AggregateError([outerError, innerError], outerError.message);
      err2.code = outerError.code;
      return err2;
    }
    return innerError || outerError;
  }
  class AbortError extends Error {
    constructor(message = "The operation was aborted", options = void 0) {
      if (options !== void 0 && typeof options !== "object") {
        throw new codes.ERR_INVALID_ARG_TYPE("options", "Object", options);
      }
      super(message, options);
      this.code = "ABORT_ERR";
      this.name = "AbortError";
    }
  }
  E("ERR_ASSERTION", "%s", Error);
  E(
    "ERR_INVALID_ARG_TYPE",
    (name, expected, actual) => {
      assert(typeof name === "string", "'name' must be a string");
      if (!Array.isArray(expected)) {
        expected = [expected];
      }
      let msg = "The ";
      if (name.endsWith(" argument")) {
        msg += `${name} `;
      } else {
        msg += `"${name}" ${name.includes(".") ? "property" : "argument"} `;
      }
      msg += "must be ";
      const types2 = [];
      const instances = [];
      const other = [];
      for (const value of expected) {
        assert(typeof value === "string", "All expected entries have to be of type string");
        if (kTypes.includes(value)) {
          types2.push(value.toLowerCase());
        } else if (classRegExp.test(value)) {
          instances.push(value);
        } else {
          assert(value !== "object", 'The value "object" should be written as "Object"');
          other.push(value);
        }
      }
      if (instances.length > 0) {
        const pos = types2.indexOf("object");
        if (pos !== -1) {
          types2.splice(types2, pos, 1);
          instances.push("Object");
        }
      }
      if (types2.length > 0) {
        switch (types2.length) {
          case 1:
            msg += `of type ${types2[0]}`;
            break;
          case 2:
            msg += `one of type ${types2[0]} or ${types2[1]}`;
            break;
          default: {
            const last = types2.pop();
            msg += `one of type ${types2.join(", ")}, or ${last}`;
          }
        }
        if (instances.length > 0 || other.length > 0) {
          msg += " or ";
        }
      }
      if (instances.length > 0) {
        switch (instances.length) {
          case 1:
            msg += `an instance of ${instances[0]}`;
            break;
          case 2:
            msg += `an instance of ${instances[0]} or ${instances[1]}`;
            break;
          default: {
            const last = instances.pop();
            msg += `an instance of ${instances.join(", ")}, or ${last}`;
          }
        }
        if (other.length > 0) {
          msg += " or ";
        }
      }
      switch (other.length) {
        case 0:
          break;
        case 1:
          if (other[0].toLowerCase() !== other[0]) {
            msg += "an ";
          }
          msg += `${other[0]}`;
          break;
        case 2:
          msg += `one of ${other[0]} or ${other[1]}`;
          break;
        default: {
          const last = other.pop();
          msg += `one of ${other.join(", ")}, or ${last}`;
        }
      }
      if (actual == null) {
        msg += `. Received ${actual}`;
      } else if (typeof actual === "function" && actual.name) {
        msg += `. Received function ${actual.name}`;
      } else if (typeof actual === "object") {
        var _actual$constructor;
        if ((_actual$constructor = actual.constructor) !== null && _actual$constructor !== void 0 && _actual$constructor.name) {
          msg += `. Received an instance of ${actual.constructor.name}`;
        } else {
          const inspected = inspect2(actual, {
            depth: -1
          });
          msg += `. Received ${inspected}`;
        }
      } else {
        let inspected = inspect2(actual, {
          colors: false
        });
        if (inspected.length > 25) {
          inspected = `${inspected.slice(0, 25)}...`;
        }
        msg += `. Received type ${typeof actual} (${inspected})`;
      }
      return msg;
    },
    TypeError
  );
  E(
    "ERR_INVALID_ARG_VALUE",
    (name, value, reason = "is invalid") => {
      let inspected = inspect2(value);
      if (inspected.length > 128) {
        inspected = inspected.slice(0, 128) + "...";
      }
      const type = name.includes(".") ? "property" : "argument";
      return `The ${type} '${name}' ${reason}. Received ${inspected}`;
    },
    TypeError
  );
  E(
    "ERR_INVALID_RETURN_VALUE",
    (input, name, value) => {
      var _value$constructor;
      const type = value !== null && value !== void 0 && (_value$constructor = value.constructor) !== null && _value$constructor !== void 0 && _value$constructor.name ? `instance of ${value.constructor.name}` : `type ${typeof value}`;
      return `Expected ${input} to be returned from the "${name}" function but got ${type}.`;
    },
    TypeError
  );
  E(
    "ERR_MISSING_ARGS",
    (...args) => {
      assert(args.length > 0, "At least one arg needs to be specified");
      let msg;
      const len = args.length;
      args = (Array.isArray(args) ? args : [args]).map((a) => `"${a}"`).join(" or ");
      switch (len) {
        case 1:
          msg += `The ${args[0]} argument`;
          break;
        case 2:
          msg += `The ${args[0]} and ${args[1]} arguments`;
          break;
        default:
          {
            const last = args.pop();
            msg += `The ${args.join(", ")}, and ${last} arguments`;
          }
          break;
      }
      return `${msg} must be specified`;
    },
    TypeError
  );
  E(
    "ERR_OUT_OF_RANGE",
    (str, range, input) => {
      assert(range, 'Missing "range" argument');
      let received;
      if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
        received = addNumericalSeparator(String(input));
      } else if (typeof input === "bigint") {
        received = String(input);
        const limit = BigInt(2) ** BigInt(32);
        if (input > limit || input < -limit) {
          received = addNumericalSeparator(received);
        }
        received += "n";
      } else {
        received = inspect2(input);
      }
      return `The value of "${str}" is out of range. It must be ${range}. Received ${received}`;
    },
    RangeError
  );
  E("ERR_MULTIPLE_CALLBACK", "Callback called multiple times", Error);
  E("ERR_METHOD_NOT_IMPLEMENTED", "The %s method is not implemented", Error);
  E("ERR_STREAM_ALREADY_FINISHED", "Cannot call %s after a stream was finished", Error);
  E("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable", Error);
  E("ERR_STREAM_DESTROYED", "Cannot call %s after a stream was destroyed", Error);
  E("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
  E("ERR_STREAM_PREMATURE_CLOSE", "Premature close", Error);
  E("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF", Error);
  E("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event", Error);
  E("ERR_STREAM_WRITE_AFTER_END", "write after end", Error);
  E("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s", TypeError);
  errors = {
    AbortError,
    aggregateTwoErrors: hideStackFrames(aggregateTwoErrors),
    hideStackFrames,
    codes
  };
  return errors;
}
var browser$1 = { exports: {} };
var hasRequiredBrowser$2;
function requireBrowser$2() {
  if (hasRequiredBrowser$2) return browser$1.exports;
  hasRequiredBrowser$2 = 1;
  const { AbortController, AbortSignal } = typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : (
    /* otherwise */
    void 0
  );
  browser$1.exports = AbortController;
  browser$1.exports.AbortSignal = AbortSignal;
  browser$1.exports.default = AbortController;
  return browser$1.exports;
}
var events = { exports: {} };
var hasRequiredEvents;
function requireEvents() {
  if (hasRequiredEvents) return events.exports;
  hasRequiredEvents = 1;
  var R = typeof Reflect === "object" ? Reflect : null;
  var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  };
  var ReflectOwnKeys;
  if (R && typeof R.ownKeys === "function") {
    ReflectOwnKeys = R.ownKeys;
  } else if (Object.getOwnPropertySymbols) {
    ReflectOwnKeys = function ReflectOwnKeys2(target) {
      return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
    };
  } else {
    ReflectOwnKeys = function ReflectOwnKeys2(target) {
      return Object.getOwnPropertyNames(target);
    };
  }
  function ProcessEmitWarning(warning) {
    if (console && console.warn) console.warn(warning);
  }
  var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
    return value !== value;
  };
  function EventEmitter2() {
    EventEmitter2.init.call(this);
  }
  events.exports = EventEmitter2;
  events.exports.once = once;
  EventEmitter2.EventEmitter = EventEmitter2;
  EventEmitter2.prototype._events = void 0;
  EventEmitter2.prototype._eventsCount = 0;
  EventEmitter2.prototype._maxListeners = void 0;
  var defaultMaxListeners = 10;
  function checkListener(listener) {
    if (typeof listener !== "function") {
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }
  }
  Object.defineProperty(EventEmitter2, "defaultMaxListeners", {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
      }
      defaultMaxListeners = arg;
    }
  });
  EventEmitter2.init = function() {
    if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
      this._events = /* @__PURE__ */ Object.create(null);
      this._eventsCount = 0;
    }
    this._maxListeners = this._maxListeners || void 0;
  };
  EventEmitter2.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
    }
    this._maxListeners = n;
    return this;
  };
  function _getMaxListeners(that) {
    if (that._maxListeners === void 0)
      return EventEmitter2.defaultMaxListeners;
    return that._maxListeners;
  }
  EventEmitter2.prototype.getMaxListeners = function getMaxListeners() {
    return _getMaxListeners(this);
  };
  EventEmitter2.prototype.emit = function emit(type) {
    var args = [];
    for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
    var doError = type === "error";
    var events2 = this._events;
    if (events2 !== void 0)
      doError = doError && events2.error === void 0;
    else if (!doError)
      return false;
    if (doError) {
      var er;
      if (args.length > 0)
        er = args[0];
      if (er instanceof Error) {
        throw er;
      }
      var err2 = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
      err2.context = er;
      throw err2;
    }
    var handler = events2[type];
    if (handler === void 0)
      return false;
    if (typeof handler === "function") {
      ReflectApply(handler, this, args);
    } else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);
      for (var i = 0; i < len; ++i)
        ReflectApply(listeners[i], this, args);
    }
    return true;
  };
  function _addListener(target, type, listener, prepend) {
    var m;
    var events2;
    var existing;
    checkListener(listener);
    events2 = target._events;
    if (events2 === void 0) {
      events2 = target._events = /* @__PURE__ */ Object.create(null);
      target._eventsCount = 0;
    } else {
      if (events2.newListener !== void 0) {
        target.emit(
          "newListener",
          type,
          listener.listener ? listener.listener : listener
        );
        events2 = target._events;
      }
      existing = events2[type];
    }
    if (existing === void 0) {
      existing = events2[type] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === "function") {
        existing = events2[type] = prepend ? [listener, existing] : [existing, listener];
      } else if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
      m = _getMaxListeners(target);
      if (m > 0 && existing.length > m && !existing.warned) {
        existing.warned = true;
        var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
        w.name = "MaxListenersExceededWarning";
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        ProcessEmitWarning(w);
      }
    }
    return target;
  }
  EventEmitter2.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
  };
  EventEmitter2.prototype.on = EventEmitter2.prototype.addListener;
  EventEmitter2.prototype.prependListener = function prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  };
  function onceWrapper() {
    if (!this.fired) {
      this.target.removeListener(this.type, this.wrapFn);
      this.fired = true;
      if (arguments.length === 0)
        return this.listener.call(this.target);
      return this.listener.apply(this.target, arguments);
    }
  }
  function _onceWrap(target, type, listener) {
    var state2 = { fired: false, wrapFn: void 0, target, type, listener };
    var wrapped = onceWrapper.bind(state2);
    wrapped.listener = listener;
    state2.wrapFn = wrapped;
    return wrapped;
  }
  EventEmitter2.prototype.once = function once2(type, listener) {
    checkListener(listener);
    this.on(type, _onceWrap(this, type, listener));
    return this;
  };
  EventEmitter2.prototype.prependOnceListener = function prependOnceListener(type, listener) {
    checkListener(listener);
    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
  };
  EventEmitter2.prototype.removeListener = function removeListener(type, listener) {
    var list, events2, position, i, originalListener;
    checkListener(listener);
    events2 = this._events;
    if (events2 === void 0)
      return this;
    list = events2[type];
    if (list === void 0)
      return this;
    if (list === listener || list.listener === listener) {
      if (--this._eventsCount === 0)
        this._events = /* @__PURE__ */ Object.create(null);
      else {
        delete events2[type];
        if (events2.removeListener)
          this.emit("removeListener", type, list.listener || listener);
      }
    } else if (typeof list !== "function") {
      position = -1;
      for (i = list.length - 1; i >= 0; i--) {
        if (list[i] === listener || list[i].listener === listener) {
          originalListener = list[i].listener;
          position = i;
          break;
        }
      }
      if (position < 0)
        return this;
      if (position === 0)
        list.shift();
      else {
        spliceOne(list, position);
      }
      if (list.length === 1)
        events2[type] = list[0];
      if (events2.removeListener !== void 0)
        this.emit("removeListener", type, originalListener || listener);
    }
    return this;
  };
  EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
  EventEmitter2.prototype.removeAllListeners = function removeAllListeners(type) {
    var listeners, events2, i;
    events2 = this._events;
    if (events2 === void 0)
      return this;
    if (events2.removeListener === void 0) {
      if (arguments.length === 0) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      } else if (events2[type] !== void 0) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else
          delete events2[type];
      }
      return this;
    }
    if (arguments.length === 0) {
      var keys = Object.keys(events2);
      var key2;
      for (i = 0; i < keys.length; ++i) {
        key2 = keys[i];
        if (key2 === "removeListener") continue;
        this.removeAllListeners(key2);
      }
      this.removeAllListeners("removeListener");
      this._events = /* @__PURE__ */ Object.create(null);
      this._eventsCount = 0;
      return this;
    }
    listeners = events2[type];
    if (typeof listeners === "function") {
      this.removeListener(type, listeners);
    } else if (listeners !== void 0) {
      for (i = listeners.length - 1; i >= 0; i--) {
        this.removeListener(type, listeners[i]);
      }
    }
    return this;
  };
  function _listeners(target, type, unwrap) {
    var events2 = target._events;
    if (events2 === void 0)
      return [];
    var evlistener = events2[type];
    if (evlistener === void 0)
      return [];
    if (typeof evlistener === "function")
      return unwrap ? [evlistener.listener || evlistener] : [evlistener];
    return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
  }
  EventEmitter2.prototype.listeners = function listeners(type) {
    return _listeners(this, type, true);
  };
  EventEmitter2.prototype.rawListeners = function rawListeners(type) {
    return _listeners(this, type, false);
  };
  EventEmitter2.listenerCount = function(emitter, type) {
    if (typeof emitter.listenerCount === "function") {
      return emitter.listenerCount(type);
    } else {
      return listenerCount.call(emitter, type);
    }
  };
  EventEmitter2.prototype.listenerCount = listenerCount;
  function listenerCount(type) {
    var events2 = this._events;
    if (events2 !== void 0) {
      var evlistener = events2[type];
      if (typeof evlistener === "function") {
        return 1;
      } else if (evlistener !== void 0) {
        return evlistener.length;
      }
    }
    return 0;
  }
  EventEmitter2.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
  };
  function arrayClone(arr, n) {
    var copy = new Array(n);
    for (var i = 0; i < n; ++i)
      copy[i] = arr[i];
    return copy;
  }
  function spliceOne(list, index) {
    for (; index + 1 < list.length; index++)
      list[index] = list[index + 1];
    list.pop();
  }
  function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for (var i = 0; i < ret.length; ++i) {
      ret[i] = arr[i].listener || arr[i];
    }
    return ret;
  }
  function once(emitter, name) {
    return new Promise(function(resolve2, reject) {
      function errorListener(err2) {
        emitter.removeListener(name, resolver);
        reject(err2);
      }
      function resolver() {
        if (typeof emitter.removeListener === "function") {
          emitter.removeListener("error", errorListener);
        }
        resolve2([].slice.call(arguments));
      }
      eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
      if (name !== "error") {
        addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
      }
    });
  }
  function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
    if (typeof emitter.on === "function") {
      eventTargetAgnosticAddListener(emitter, "error", handler, flags);
    }
  }
  function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
    if (typeof emitter.on === "function") {
      if (flags.once) {
        emitter.once(name, listener);
      } else {
        emitter.on(name, listener);
      }
    } else if (typeof emitter.addEventListener === "function") {
      emitter.addEventListener(name, function wrapListener(arg) {
        if (flags.once) {
          emitter.removeEventListener(name, wrapListener);
        }
        listener(arg);
      });
    } else {
      throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
    }
  }
  return events.exports;
}
var hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil) return util.exports;
  hasRequiredUtil = 1;
  (function(module) {
    const bufferModule = requireBuffer();
    const { format: format2, inspect: inspect2 } = requireInspect();
    const {
      codes: { ERR_INVALID_ARG_TYPE }
    } = requireErrors();
    const { kResistStopPropagation, AggregateError, SymbolDispose } = requirePrimordials();
    const AbortSignal = globalThis.AbortSignal || requireBrowser$2().AbortSignal;
    const AbortController = globalThis.AbortController || requireBrowser$2().AbortController;
    const AsyncFunction = Object.getPrototypeOf(async function() {
    }).constructor;
    const Blob2 = globalThis.Blob || bufferModule.Blob;
    const isBlob = typeof Blob2 !== "undefined" ? function isBlob2(b) {
      return b instanceof Blob2;
    } : function isBlob2(b) {
      return false;
    };
    const validateAbortSignal = (signal, name) => {
      if (signal !== void 0 && (signal === null || typeof signal !== "object" || !("aborted" in signal))) {
        throw new ERR_INVALID_ARG_TYPE(name, "AbortSignal", signal);
      }
    };
    const validateFunction = (value, name) => {
      if (typeof value !== "function") {
        throw new ERR_INVALID_ARG_TYPE(name, "Function", value);
      }
    };
    module.exports = {
      AggregateError,
      kEmptyObject: Object.freeze({}),
      once(callback) {
        let called = false;
        return function(...args) {
          if (called) {
            return;
          }
          called = true;
          callback.apply(this, args);
        };
      },
      createDeferredPromise: function() {
        let resolve2;
        let reject;
        const promise = new Promise((res, rej) => {
          resolve2 = res;
          reject = rej;
        });
        return {
          promise,
          resolve: resolve2,
          reject
        };
      },
      promisify(fn) {
        return new Promise((resolve2, reject) => {
          fn((err2, ...args) => {
            if (err2) {
              return reject(err2);
            }
            return resolve2(...args);
          });
        });
      },
      debuglog() {
        return function() {
        };
      },
      format: format2,
      inspect: inspect2,
      types: {
        isAsyncFunction(fn) {
          return fn instanceof AsyncFunction;
        },
        isArrayBufferView(arr) {
          return ArrayBuffer.isView(arr);
        }
      },
      isBlob,
      deprecate(fn, message) {
        return fn;
      },
      addAbortListener: requireEvents().addAbortListener || function addAbortListener(signal, listener) {
        if (signal === void 0) {
          throw new ERR_INVALID_ARG_TYPE("signal", "AbortSignal", signal);
        }
        validateAbortSignal(signal, "signal");
        validateFunction(listener, "listener");
        let removeEventListener;
        if (signal.aborted) {
          queueMicrotask(() => listener());
        } else {
          signal.addEventListener("abort", listener, {
            __proto__: null,
            once: true,
            [kResistStopPropagation]: true
          });
          removeEventListener = () => {
            signal.removeEventListener("abort", listener);
          };
        }
        return {
          __proto__: null,
          [SymbolDispose]() {
            var _removeEventListener;
            (_removeEventListener = removeEventListener) === null || _removeEventListener === void 0 ? void 0 : _removeEventListener();
          }
        };
      },
      AbortSignalAny: AbortSignal.any || function AbortSignalAny(signals) {
        if (signals.length === 1) {
          return signals[0];
        }
        const ac = new AbortController();
        const abort2 = () => ac.abort();
        signals.forEach((signal) => {
          validateAbortSignal(signal, "signals");
          signal.addEventListener("abort", abort2, {
            once: true
          });
        });
        ac.signal.addEventListener(
          "abort",
          () => {
            signals.forEach((signal) => signal.removeEventListener("abort", abort2));
          },
          {
            once: true
          }
        );
        return ac.signal;
      }
    };
    module.exports.promisify.custom = Symbol.for("nodejs.util.promisify.custom");
  })(util);
  return util.exports;
}
var operators = {};
var validators;
var hasRequiredValidators;
function requireValidators() {
  if (hasRequiredValidators) return validators;
  hasRequiredValidators = 1;
  const {
    ArrayIsArray,
    ArrayPrototypeIncludes,
    ArrayPrototypeJoin,
    ArrayPrototypeMap,
    NumberIsInteger,
    NumberIsNaN,
    NumberMAX_SAFE_INTEGER,
    NumberMIN_SAFE_INTEGER,
    NumberParseInt,
    ObjectPrototypeHasOwnProperty,
    RegExpPrototypeExec,
    String: String2,
    StringPrototypeToUpperCase,
    StringPrototypeTrim
  } = requirePrimordials();
  const {
    hideStackFrames,
    codes: { ERR_SOCKET_BAD_PORT, ERR_INVALID_ARG_TYPE, ERR_INVALID_ARG_VALUE, ERR_OUT_OF_RANGE, ERR_UNKNOWN_SIGNAL }
  } = requireErrors();
  const { normalizeEncoding } = requireUtil();
  const { isAsyncFunction, isArrayBufferView } = requireUtil().types;
  const signals = {};
  function isInt32(value) {
    return value === (value | 0);
  }
  function isUint32(value) {
    return value === value >>> 0;
  }
  const octalReg = /^[0-7]+$/;
  const modeDesc = "must be a 32-bit unsigned integer or an octal string";
  function parseFileMode(value, name, def) {
    if (typeof value === "undefined") {
      value = def;
    }
    if (typeof value === "string") {
      if (RegExpPrototypeExec(octalReg, value) === null) {
        throw new ERR_INVALID_ARG_VALUE(name, value, modeDesc);
      }
      value = NumberParseInt(value, 8);
    }
    validateUint32(value, name);
    return value;
  }
  const validateInteger = hideStackFrames((value, name, min = NumberMIN_SAFE_INTEGER, max2 = NumberMAX_SAFE_INTEGER) => {
    if (typeof value !== "number") throw new ERR_INVALID_ARG_TYPE(name, "number", value);
    if (!NumberIsInteger(value)) throw new ERR_OUT_OF_RANGE(name, "an integer", value);
    if (value < min || value > max2) throw new ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max2}`, value);
  });
  const validateInt32 = hideStackFrames((value, name, min = -2147483648, max2 = 2147483647) => {
    if (typeof value !== "number") {
      throw new ERR_INVALID_ARG_TYPE(name, "number", value);
    }
    if (!NumberIsInteger(value)) {
      throw new ERR_OUT_OF_RANGE(name, "an integer", value);
    }
    if (value < min || value > max2) {
      throw new ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max2}`, value);
    }
  });
  const validateUint32 = hideStackFrames((value, name, positive = false) => {
    if (typeof value !== "number") {
      throw new ERR_INVALID_ARG_TYPE(name, "number", value);
    }
    if (!NumberIsInteger(value)) {
      throw new ERR_OUT_OF_RANGE(name, "an integer", value);
    }
    const min = positive ? 1 : 0;
    const max2 = 4294967295;
    if (value < min || value > max2) {
      throw new ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max2}`, value);
    }
  });
  function validateString(value, name) {
    if (typeof value !== "string") throw new ERR_INVALID_ARG_TYPE(name, "string", value);
  }
  function validateNumber(value, name, min = void 0, max2) {
    if (typeof value !== "number") throw new ERR_INVALID_ARG_TYPE(name, "number", value);
    if (min != null && value < min || max2 != null && value > max2 || (min != null || max2 != null) && NumberIsNaN(value)) {
      throw new ERR_OUT_OF_RANGE(
        name,
        `${min != null ? `>= ${min}` : ""}${min != null && max2 != null ? " && " : ""}${max2 != null ? `<= ${max2}` : ""}`,
        value
      );
    }
  }
  const validateOneOf = hideStackFrames((value, name, oneOf) => {
    if (!ArrayPrototypeIncludes(oneOf, value)) {
      const allowed = ArrayPrototypeJoin(
        ArrayPrototypeMap(oneOf, (v) => typeof v === "string" ? `'${v}'` : String2(v)),
        ", "
      );
      const reason = "must be one of: " + allowed;
      throw new ERR_INVALID_ARG_VALUE(name, value, reason);
    }
  });
  function validateBoolean(value, name) {
    if (typeof value !== "boolean") throw new ERR_INVALID_ARG_TYPE(name, "boolean", value);
  }
  function getOwnPropertyValueOrDefault(options, key2, defaultValue) {
    return options == null || !ObjectPrototypeHasOwnProperty(options, key2) ? defaultValue : options[key2];
  }
  const validateObject = hideStackFrames((value, name, options = null) => {
    const allowArray = getOwnPropertyValueOrDefault(options, "allowArray", false);
    const allowFunction = getOwnPropertyValueOrDefault(options, "allowFunction", false);
    const nullable = getOwnPropertyValueOrDefault(options, "nullable", false);
    if (!nullable && value === null || !allowArray && ArrayIsArray(value) || typeof value !== "object" && (!allowFunction || typeof value !== "function")) {
      throw new ERR_INVALID_ARG_TYPE(name, "Object", value);
    }
  });
  const validateDictionary = hideStackFrames((value, name) => {
    if (value != null && typeof value !== "object" && typeof value !== "function") {
      throw new ERR_INVALID_ARG_TYPE(name, "a dictionary", value);
    }
  });
  const validateArray = hideStackFrames((value, name, minLength = 0) => {
    if (!ArrayIsArray(value)) {
      throw new ERR_INVALID_ARG_TYPE(name, "Array", value);
    }
    if (value.length < minLength) {
      const reason = `must be longer than ${minLength}`;
      throw new ERR_INVALID_ARG_VALUE(name, value, reason);
    }
  });
  function validateStringArray(value, name) {
    validateArray(value, name);
    for (let i = 0; i < value.length; i++) {
      validateString(value[i], `${name}[${i}]`);
    }
  }
  function validateBooleanArray(value, name) {
    validateArray(value, name);
    for (let i = 0; i < value.length; i++) {
      validateBoolean(value[i], `${name}[${i}]`);
    }
  }
  function validateAbortSignalArray(value, name) {
    validateArray(value, name);
    for (let i = 0; i < value.length; i++) {
      const signal = value[i];
      const indexedName = `${name}[${i}]`;
      if (signal == null) {
        throw new ERR_INVALID_ARG_TYPE(indexedName, "AbortSignal", signal);
      }
      validateAbortSignal(signal, indexedName);
    }
  }
  function validateSignalName(signal, name = "signal") {
    validateString(signal, name);
    if (signals[signal] === void 0) {
      if (signals[StringPrototypeToUpperCase(signal)] !== void 0) {
        throw new ERR_UNKNOWN_SIGNAL(signal + " (signals must use all capital letters)");
      }
      throw new ERR_UNKNOWN_SIGNAL(signal);
    }
  }
  const validateBuffer = hideStackFrames((buffer2, name = "buffer") => {
    if (!isArrayBufferView(buffer2)) {
      throw new ERR_INVALID_ARG_TYPE(name, ["Buffer", "TypedArray", "DataView"], buffer2);
    }
  });
  function validateEncoding(data, encoding) {
    const normalizedEncoding = normalizeEncoding(encoding);
    const length = data.length;
    if (normalizedEncoding === "hex" && length % 2 !== 0) {
      throw new ERR_INVALID_ARG_VALUE("encoding", encoding, `is invalid for data of length ${length}`);
    }
  }
  function validatePort(port, name = "Port", allowZero = true) {
    if (typeof port !== "number" && typeof port !== "string" || typeof port === "string" && StringPrototypeTrim(port).length === 0 || +port !== +port >>> 0 || port > 65535 || port === 0 && !allowZero) {
      throw new ERR_SOCKET_BAD_PORT(name, port, allowZero);
    }
    return port | 0;
  }
  const validateAbortSignal = hideStackFrames((signal, name) => {
    if (signal !== void 0 && (signal === null || typeof signal !== "object" || !("aborted" in signal))) {
      throw new ERR_INVALID_ARG_TYPE(name, "AbortSignal", signal);
    }
  });
  const validateFunction = hideStackFrames((value, name) => {
    if (typeof value !== "function") throw new ERR_INVALID_ARG_TYPE(name, "Function", value);
  });
  const validatePlainFunction = hideStackFrames((value, name) => {
    if (typeof value !== "function" || isAsyncFunction(value)) throw new ERR_INVALID_ARG_TYPE(name, "Function", value);
  });
  const validateUndefined = hideStackFrames((value, name) => {
    if (value !== void 0) throw new ERR_INVALID_ARG_TYPE(name, "undefined", value);
  });
  function validateUnion(value, name, union) {
    if (!ArrayPrototypeIncludes(union, value)) {
      throw new ERR_INVALID_ARG_TYPE(name, `('${ArrayPrototypeJoin(union, "|")}')`, value);
    }
  }
  const linkValueRegExp = /^(?:<[^>]*>)(?:\s*;\s*[^;"\s]+(?:=(")?[^;"\s]*\1)?)*$/;
  function validateLinkHeaderFormat(value, name) {
    if (typeof value === "undefined" || !RegExpPrototypeExec(linkValueRegExp, value)) {
      throw new ERR_INVALID_ARG_VALUE(
        name,
        value,
        'must be an array or string of format "</styles.css>; rel=preload; as=style"'
      );
    }
  }
  function validateLinkHeaderValue(hints) {
    if (typeof hints === "string") {
      validateLinkHeaderFormat(hints, "hints");
      return hints;
    } else if (ArrayIsArray(hints)) {
      const hintsLength = hints.length;
      let result = "";
      if (hintsLength === 0) {
        return result;
      }
      for (let i = 0; i < hintsLength; i++) {
        const link2 = hints[i];
        validateLinkHeaderFormat(link2, "hints");
        result += link2;
        if (i !== hintsLength - 1) {
          result += ", ";
        }
      }
      return result;
    }
    throw new ERR_INVALID_ARG_VALUE(
      "hints",
      hints,
      'must be an array or string of format "</styles.css>; rel=preload; as=style"'
    );
  }
  validators = {
    isInt32,
    isUint32,
    parseFileMode,
    validateArray,
    validateStringArray,
    validateBooleanArray,
    validateAbortSignalArray,
    validateBoolean,
    validateBuffer,
    validateDictionary,
    validateEncoding,
    validateFunction,
    validateInt32,
    validateInteger,
    validateNumber,
    validateObject,
    validateOneOf,
    validatePlainFunction,
    validatePort,
    validateSignalName,
    validateString,
    validateUint32,
    validateUndefined,
    validateUnion,
    validateAbortSignal,
    validateLinkHeaderValue
  };
  return validators;
}
var endOfStream = { exports: {} };
var browser = { exports: {} };
var hasRequiredBrowser$1;
function requireBrowser$1() {
  if (hasRequiredBrowser$1) return browser.exports;
  hasRequiredBrowser$1 = 1;
  var process = browser.exports = {};
  var cachedSetTimeout;
  var cachedClearTimeout;
  function defaultSetTimout() {
    throw new Error("setTimeout has not been defined");
  }
  function defaultClearTimeout() {
    throw new Error("clearTimeout has not been defined");
  }
  (function() {
    try {
      if (typeof setTimeout === "function") {
        cachedSetTimeout = setTimeout;
      } else {
        cachedSetTimeout = defaultSetTimout;
      }
    } catch (e) {
      cachedSetTimeout = defaultSetTimout;
    }
    try {
      if (typeof clearTimeout === "function") {
        cachedClearTimeout = clearTimeout;
      } else {
        cachedClearTimeout = defaultClearTimeout;
      }
    } catch (e) {
      cachedClearTimeout = defaultClearTimeout;
    }
  })();
  function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
      return setTimeout(fun, 0);
    }
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
      cachedSetTimeout = setTimeout;
      return setTimeout(fun, 0);
    }
    try {
      return cachedSetTimeout(fun, 0);
    } catch (e) {
      try {
        return cachedSetTimeout.call(null, fun, 0);
      } catch (e2) {
        return cachedSetTimeout.call(this, fun, 0);
      }
    }
  }
  function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
      return clearTimeout(marker);
    }
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
      cachedClearTimeout = clearTimeout;
      return clearTimeout(marker);
    }
    try {
      return cachedClearTimeout(marker);
    } catch (e) {
      try {
        return cachedClearTimeout.call(null, marker);
      } catch (e2) {
        return cachedClearTimeout.call(this, marker);
      }
    }
  }
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;
  function cleanUpNextTick() {
    if (!draining || !currentQueue) {
      return;
    }
    draining = false;
    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      queueIndex = -1;
    }
    if (queue.length) {
      drainQueue();
    }
  }
  function drainQueue() {
    if (draining) {
      return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len) {
        if (currentQueue) {
          currentQueue[queueIndex].run();
        }
      }
      queueIndex = -1;
      len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
  }
  process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
      runTimeout(drainQueue);
    }
  };
  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  Item.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  process.title = "browser";
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = "";
  process.versions = {};
  function noop() {
  }
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.prependListener = noop;
  process.prependOnceListener = noop;
  process.listeners = function(name) {
    return [];
  };
  process.binding = function(name) {
    throw new Error("process.binding is not supported");
  };
  process.cwd = function() {
    return "/";
  };
  process.chdir = function(dir) {
    throw new Error("process.chdir is not supported");
  };
  process.umask = function() {
    return 0;
  };
  return browser.exports;
}
var utils;
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  const { SymbolAsyncIterator, SymbolIterator, SymbolFor } = requirePrimordials();
  const kIsDestroyed = SymbolFor("nodejs.stream.destroyed");
  const kIsErrored = SymbolFor("nodejs.stream.errored");
  const kIsReadable = SymbolFor("nodejs.stream.readable");
  const kIsWritable = SymbolFor("nodejs.stream.writable");
  const kIsDisturbed = SymbolFor("nodejs.stream.disturbed");
  const kIsClosedPromise = SymbolFor("nodejs.webstream.isClosedPromise");
  const kControllerErrorFunction = SymbolFor("nodejs.webstream.controllerErrorFunction");
  function isReadableNodeStream(obj, strict = false) {
    var _obj$_readableState;
    return !!(obj && typeof obj.pipe === "function" && typeof obj.on === "function" && (!strict || typeof obj.pause === "function" && typeof obj.resume === "function") && (!obj._writableState || ((_obj$_readableState = obj._readableState) === null || _obj$_readableState === void 0 ? void 0 : _obj$_readableState.readable) !== false) && // Duplex
    (!obj._writableState || obj._readableState));
  }
  function isWritableNodeStream(obj) {
    var _obj$_writableState;
    return !!(obj && typeof obj.write === "function" && typeof obj.on === "function" && (!obj._readableState || ((_obj$_writableState = obj._writableState) === null || _obj$_writableState === void 0 ? void 0 : _obj$_writableState.writable) !== false));
  }
  function isDuplexNodeStream(obj) {
    return !!(obj && typeof obj.pipe === "function" && obj._readableState && typeof obj.on === "function" && typeof obj.write === "function");
  }
  function isNodeStream(obj) {
    return obj && (obj._readableState || obj._writableState || typeof obj.write === "function" && typeof obj.on === "function" || typeof obj.pipe === "function" && typeof obj.on === "function");
  }
  function isReadableStream(obj) {
    return !!(obj && !isNodeStream(obj) && typeof obj.pipeThrough === "function" && typeof obj.getReader === "function" && typeof obj.cancel === "function");
  }
  function isWritableStream(obj) {
    return !!(obj && !isNodeStream(obj) && typeof obj.getWriter === "function" && typeof obj.abort === "function");
  }
  function isTransformStream(obj) {
    return !!(obj && !isNodeStream(obj) && typeof obj.readable === "object" && typeof obj.writable === "object");
  }
  function isWebStream(obj) {
    return isReadableStream(obj) || isWritableStream(obj) || isTransformStream(obj);
  }
  function isIterable(obj, isAsync) {
    if (obj == null) return false;
    if (isAsync === true) return typeof obj[SymbolAsyncIterator] === "function";
    if (isAsync === false) return typeof obj[SymbolIterator] === "function";
    return typeof obj[SymbolAsyncIterator] === "function" || typeof obj[SymbolIterator] === "function";
  }
  function isDestroyed(stream2) {
    if (!isNodeStream(stream2)) return null;
    const wState = stream2._writableState;
    const rState = stream2._readableState;
    const state2 = wState || rState;
    return !!(stream2.destroyed || stream2[kIsDestroyed] || state2 !== null && state2 !== void 0 && state2.destroyed);
  }
  function isWritableEnded(stream2) {
    if (!isWritableNodeStream(stream2)) return null;
    if (stream2.writableEnded === true) return true;
    const wState = stream2._writableState;
    if (wState !== null && wState !== void 0 && wState.errored) return false;
    if (typeof (wState === null || wState === void 0 ? void 0 : wState.ended) !== "boolean") return null;
    return wState.ended;
  }
  function isWritableFinished(stream2, strict) {
    if (!isWritableNodeStream(stream2)) return null;
    if (stream2.writableFinished === true) return true;
    const wState = stream2._writableState;
    if (wState !== null && wState !== void 0 && wState.errored) return false;
    if (typeof (wState === null || wState === void 0 ? void 0 : wState.finished) !== "boolean") return null;
    return !!(wState.finished || strict === false && wState.ended === true && wState.length === 0);
  }
  function isReadableEnded(stream2) {
    if (!isReadableNodeStream(stream2)) return null;
    if (stream2.readableEnded === true) return true;
    const rState = stream2._readableState;
    if (!rState || rState.errored) return false;
    if (typeof (rState === null || rState === void 0 ? void 0 : rState.ended) !== "boolean") return null;
    return rState.ended;
  }
  function isReadableFinished(stream2, strict) {
    if (!isReadableNodeStream(stream2)) return null;
    const rState = stream2._readableState;
    if (rState !== null && rState !== void 0 && rState.errored) return false;
    if (typeof (rState === null || rState === void 0 ? void 0 : rState.endEmitted) !== "boolean") return null;
    return !!(rState.endEmitted || strict === false && rState.ended === true && rState.length === 0);
  }
  function isReadable2(stream2) {
    if (stream2 && stream2[kIsReadable] != null) return stream2[kIsReadable];
    if (typeof (stream2 === null || stream2 === void 0 ? void 0 : stream2.readable) !== "boolean") return null;
    if (isDestroyed(stream2)) return false;
    return isReadableNodeStream(stream2) && stream2.readable && !isReadableFinished(stream2);
  }
  function isWritable(stream2) {
    if (stream2 && stream2[kIsWritable] != null) return stream2[kIsWritable];
    if (typeof (stream2 === null || stream2 === void 0 ? void 0 : stream2.writable) !== "boolean") return null;
    if (isDestroyed(stream2)) return false;
    return isWritableNodeStream(stream2) && stream2.writable && !isWritableEnded(stream2);
  }
  function isFinished(stream2, opts) {
    if (!isNodeStream(stream2)) {
      return null;
    }
    if (isDestroyed(stream2)) {
      return true;
    }
    if ((opts === null || opts === void 0 ? void 0 : opts.readable) !== false && isReadable2(stream2)) {
      return false;
    }
    if ((opts === null || opts === void 0 ? void 0 : opts.writable) !== false && isWritable(stream2)) {
      return false;
    }
    return true;
  }
  function isWritableErrored(stream2) {
    var _stream$_writableStat, _stream$_writableStat2;
    if (!isNodeStream(stream2)) {
      return null;
    }
    if (stream2.writableErrored) {
      return stream2.writableErrored;
    }
    return (_stream$_writableStat = (_stream$_writableStat2 = stream2._writableState) === null || _stream$_writableStat2 === void 0 ? void 0 : _stream$_writableStat2.errored) !== null && _stream$_writableStat !== void 0 ? _stream$_writableStat : null;
  }
  function isReadableErrored(stream2) {
    var _stream$_readableStat, _stream$_readableStat2;
    if (!isNodeStream(stream2)) {
      return null;
    }
    if (stream2.readableErrored) {
      return stream2.readableErrored;
    }
    return (_stream$_readableStat = (_stream$_readableStat2 = stream2._readableState) === null || _stream$_readableStat2 === void 0 ? void 0 : _stream$_readableStat2.errored) !== null && _stream$_readableStat !== void 0 ? _stream$_readableStat : null;
  }
  function isClosed(stream2) {
    if (!isNodeStream(stream2)) {
      return null;
    }
    if (typeof stream2.closed === "boolean") {
      return stream2.closed;
    }
    const wState = stream2._writableState;
    const rState = stream2._readableState;
    if (typeof (wState === null || wState === void 0 ? void 0 : wState.closed) === "boolean" || typeof (rState === null || rState === void 0 ? void 0 : rState.closed) === "boolean") {
      return (wState === null || wState === void 0 ? void 0 : wState.closed) || (rState === null || rState === void 0 ? void 0 : rState.closed);
    }
    if (typeof stream2._closed === "boolean" && isOutgoingMessage(stream2)) {
      return stream2._closed;
    }
    return null;
  }
  function isOutgoingMessage(stream2) {
    return typeof stream2._closed === "boolean" && typeof stream2._defaultKeepAlive === "boolean" && typeof stream2._removedConnection === "boolean" && typeof stream2._removedContLen === "boolean";
  }
  function isServerResponse(stream2) {
    return typeof stream2._sent100 === "boolean" && isOutgoingMessage(stream2);
  }
  function isServerRequest(stream2) {
    var _stream$req;
    return typeof stream2._consuming === "boolean" && typeof stream2._dumped === "boolean" && ((_stream$req = stream2.req) === null || _stream$req === void 0 ? void 0 : _stream$req.upgradeOrConnect) === void 0;
  }
  function willEmitClose(stream2) {
    if (!isNodeStream(stream2)) return null;
    const wState = stream2._writableState;
    const rState = stream2._readableState;
    const state2 = wState || rState;
    return !state2 && isServerResponse(stream2) || !!(state2 && state2.autoDestroy && state2.emitClose && state2.closed === false);
  }
  function isDisturbed(stream2) {
    var _stream$kIsDisturbed;
    return !!(stream2 && ((_stream$kIsDisturbed = stream2[kIsDisturbed]) !== null && _stream$kIsDisturbed !== void 0 ? _stream$kIsDisturbed : stream2.readableDidRead || stream2.readableAborted));
  }
  function isErrored(stream2) {
    var _ref, _ref2, _ref3, _ref4, _ref5, _stream$kIsErrored, _stream$_readableStat3, _stream$_writableStat3, _stream$_readableStat4, _stream$_writableStat4;
    return !!(stream2 && ((_ref = (_ref2 = (_ref3 = (_ref4 = (_ref5 = (_stream$kIsErrored = stream2[kIsErrored]) !== null && _stream$kIsErrored !== void 0 ? _stream$kIsErrored : stream2.readableErrored) !== null && _ref5 !== void 0 ? _ref5 : stream2.writableErrored) !== null && _ref4 !== void 0 ? _ref4 : (_stream$_readableStat3 = stream2._readableState) === null || _stream$_readableStat3 === void 0 ? void 0 : _stream$_readableStat3.errorEmitted) !== null && _ref3 !== void 0 ? _ref3 : (_stream$_writableStat3 = stream2._writableState) === null || _stream$_writableStat3 === void 0 ? void 0 : _stream$_writableStat3.errorEmitted) !== null && _ref2 !== void 0 ? _ref2 : (_stream$_readableStat4 = stream2._readableState) === null || _stream$_readableStat4 === void 0 ? void 0 : _stream$_readableStat4.errored) !== null && _ref !== void 0 ? _ref : (_stream$_writableStat4 = stream2._writableState) === null || _stream$_writableStat4 === void 0 ? void 0 : _stream$_writableStat4.errored));
  }
  utils = {
    isDestroyed,
    kIsDestroyed,
    isDisturbed,
    kIsDisturbed,
    isErrored,
    kIsErrored,
    isReadable: isReadable2,
    kIsReadable,
    kIsClosedPromise,
    kControllerErrorFunction,
    kIsWritable,
    isClosed,
    isDuplexNodeStream,
    isFinished,
    isIterable,
    isReadableNodeStream,
    isReadableStream,
    isReadableEnded,
    isReadableFinished,
    isReadableErrored,
    isNodeStream,
    isWebStream,
    isWritable,
    isWritableNodeStream,
    isWritableStream,
    isWritableEnded,
    isWritableFinished,
    isWritableErrored,
    isServerRequest,
    isServerResponse,
    willEmitClose,
    isTransformStream
  };
  return utils;
}
var hasRequiredEndOfStream;
function requireEndOfStream() {
  if (hasRequiredEndOfStream) return endOfStream.exports;
  hasRequiredEndOfStream = 1;
  const process = requireBrowser$1();
  const { AbortError, codes } = requireErrors();
  const { ERR_INVALID_ARG_TYPE, ERR_STREAM_PREMATURE_CLOSE } = codes;
  const { kEmptyObject, once } = requireUtil();
  const { validateAbortSignal, validateFunction, validateObject, validateBoolean } = requireValidators();
  const { Promise: Promise2, PromisePrototypeThen, SymbolDispose } = requirePrimordials();
  const {
    isClosed,
    isReadable: isReadable2,
    isReadableNodeStream,
    isReadableStream,
    isReadableFinished,
    isReadableErrored,
    isWritable,
    isWritableNodeStream,
    isWritableStream,
    isWritableFinished,
    isWritableErrored,
    isNodeStream,
    willEmitClose: _willEmitClose,
    kIsClosedPromise
  } = requireUtils();
  let addAbortListener;
  function isRequest(stream2) {
    return stream2.setHeader && typeof stream2.abort === "function";
  }
  const nop2 = () => {
  };
  function eos(stream2, options, callback) {
    var _options$readable, _options$writable;
    if (arguments.length === 2) {
      callback = options;
      options = kEmptyObject;
    } else if (options == null) {
      options = kEmptyObject;
    } else {
      validateObject(options, "options");
    }
    validateFunction(callback, "callback");
    validateAbortSignal(options.signal, "options.signal");
    callback = once(callback);
    if (isReadableStream(stream2) || isWritableStream(stream2)) {
      return eosWeb(stream2, options, callback);
    }
    if (!isNodeStream(stream2)) {
      throw new ERR_INVALID_ARG_TYPE("stream", ["ReadableStream", "WritableStream", "Stream"], stream2);
    }
    const readable2 = (_options$readable = options.readable) !== null && _options$readable !== void 0 ? _options$readable : isReadableNodeStream(stream2);
    const writable2 = (_options$writable = options.writable) !== null && _options$writable !== void 0 ? _options$writable : isWritableNodeStream(stream2);
    const wState = stream2._writableState;
    const rState = stream2._readableState;
    const onlegacyfinish = () => {
      if (!stream2.writable) {
        onfinish();
      }
    };
    let willEmitClose = _willEmitClose(stream2) && isReadableNodeStream(stream2) === readable2 && isWritableNodeStream(stream2) === writable2;
    let writableFinished = isWritableFinished(stream2, false);
    const onfinish = () => {
      writableFinished = true;
      if (stream2.destroyed) {
        willEmitClose = false;
      }
      if (willEmitClose && (!stream2.readable || readable2)) {
        return;
      }
      if (!readable2 || readableFinished) {
        callback.call(stream2);
      }
    };
    let readableFinished = isReadableFinished(stream2, false);
    const onend = () => {
      readableFinished = true;
      if (stream2.destroyed) {
        willEmitClose = false;
      }
      if (willEmitClose && (!stream2.writable || writable2)) {
        return;
      }
      if (!writable2 || writableFinished) {
        callback.call(stream2);
      }
    };
    const onerror = (err2) => {
      callback.call(stream2, err2);
    };
    let closed = isClosed(stream2);
    const onclose = () => {
      closed = true;
      const errored = isWritableErrored(stream2) || isReadableErrored(stream2);
      if (errored && typeof errored !== "boolean") {
        return callback.call(stream2, errored);
      }
      if (readable2 && !readableFinished && isReadableNodeStream(stream2, true)) {
        if (!isReadableFinished(stream2, false)) return callback.call(stream2, new ERR_STREAM_PREMATURE_CLOSE());
      }
      if (writable2 && !writableFinished) {
        if (!isWritableFinished(stream2, false)) return callback.call(stream2, new ERR_STREAM_PREMATURE_CLOSE());
      }
      callback.call(stream2);
    };
    const onclosed = () => {
      closed = true;
      const errored = isWritableErrored(stream2) || isReadableErrored(stream2);
      if (errored && typeof errored !== "boolean") {
        return callback.call(stream2, errored);
      }
      callback.call(stream2);
    };
    const onrequest = () => {
      stream2.req.on("finish", onfinish);
    };
    if (isRequest(stream2)) {
      stream2.on("complete", onfinish);
      if (!willEmitClose) {
        stream2.on("abort", onclose);
      }
      if (stream2.req) {
        onrequest();
      } else {
        stream2.on("request", onrequest);
      }
    } else if (writable2 && !wState) {
      stream2.on("end", onlegacyfinish);
      stream2.on("close", onlegacyfinish);
    }
    if (!willEmitClose && typeof stream2.aborted === "boolean") {
      stream2.on("aborted", onclose);
    }
    stream2.on("end", onend);
    stream2.on("finish", onfinish);
    if (options.error !== false) {
      stream2.on("error", onerror);
    }
    stream2.on("close", onclose);
    if (closed) {
      process.nextTick(onclose);
    } else if (wState !== null && wState !== void 0 && wState.errorEmitted || rState !== null && rState !== void 0 && rState.errorEmitted) {
      if (!willEmitClose) {
        process.nextTick(onclosed);
      }
    } else if (!readable2 && (!willEmitClose || isReadable2(stream2)) && (writableFinished || isWritable(stream2) === false)) {
      process.nextTick(onclosed);
    } else if (!writable2 && (!willEmitClose || isWritable(stream2)) && (readableFinished || isReadable2(stream2) === false)) {
      process.nextTick(onclosed);
    } else if (rState && stream2.req && stream2.aborted) {
      process.nextTick(onclosed);
    }
    const cleanup = () => {
      callback = nop2;
      stream2.removeListener("aborted", onclose);
      stream2.removeListener("complete", onfinish);
      stream2.removeListener("abort", onclose);
      stream2.removeListener("request", onrequest);
      if (stream2.req) stream2.req.removeListener("finish", onfinish);
      stream2.removeListener("end", onlegacyfinish);
      stream2.removeListener("close", onlegacyfinish);
      stream2.removeListener("finish", onfinish);
      stream2.removeListener("end", onend);
      stream2.removeListener("error", onerror);
      stream2.removeListener("close", onclose);
    };
    if (options.signal && !closed) {
      const abort2 = () => {
        const endCallback = callback;
        cleanup();
        endCallback.call(
          stream2,
          new AbortError(void 0, {
            cause: options.signal.reason
          })
        );
      };
      if (options.signal.aborted) {
        process.nextTick(abort2);
      } else {
        addAbortListener = addAbortListener || requireUtil().addAbortListener;
        const disposable = addAbortListener(options.signal, abort2);
        const originalCallback = callback;
        callback = once((...args) => {
          disposable[SymbolDispose]();
          originalCallback.apply(stream2, args);
        });
      }
    }
    return cleanup;
  }
  function eosWeb(stream2, options, callback) {
    let isAborted = false;
    let abort2 = nop2;
    if (options.signal) {
      abort2 = () => {
        isAborted = true;
        callback.call(
          stream2,
          new AbortError(void 0, {
            cause: options.signal.reason
          })
        );
      };
      if (options.signal.aborted) {
        process.nextTick(abort2);
      } else {
        addAbortListener = addAbortListener || requireUtil().addAbortListener;
        const disposable = addAbortListener(options.signal, abort2);
        const originalCallback = callback;
        callback = once((...args) => {
          disposable[SymbolDispose]();
          originalCallback.apply(stream2, args);
        });
      }
    }
    const resolverFn = (...args) => {
      if (!isAborted) {
        process.nextTick(() => callback.apply(stream2, args));
      }
    };
    PromisePrototypeThen(stream2[kIsClosedPromise].promise, resolverFn, resolverFn);
    return nop2;
  }
  function finished(stream2, opts) {
    var _opts;
    let autoCleanup = false;
    if (opts === null) {
      opts = kEmptyObject;
    }
    if ((_opts = opts) !== null && _opts !== void 0 && _opts.cleanup) {
      validateBoolean(opts.cleanup, "cleanup");
      autoCleanup = opts.cleanup;
    }
    return new Promise2((resolve2, reject) => {
      const cleanup = eos(stream2, opts, (err2) => {
        if (autoCleanup) {
          cleanup();
        }
        if (err2) {
          reject(err2);
        } else {
          resolve2();
        }
      });
    });
  }
  endOfStream.exports = eos;
  endOfStream.exports.finished = finished;
  return endOfStream.exports;
}
var destroy_1;
var hasRequiredDestroy;
function requireDestroy() {
  if (hasRequiredDestroy) return destroy_1;
  hasRequiredDestroy = 1;
  const process = requireBrowser$1();
  const {
    aggregateTwoErrors,
    codes: { ERR_MULTIPLE_CALLBACK },
    AbortError
  } = requireErrors();
  const { Symbol: Symbol2 } = requirePrimordials();
  const { kIsDestroyed, isDestroyed, isFinished, isServerRequest } = requireUtils();
  const kDestroy = Symbol2("kDestroy");
  const kConstruct = Symbol2("kConstruct");
  function checkError(err2, w, r) {
    if (err2) {
      err2.stack;
      if (w && !w.errored) {
        w.errored = err2;
      }
      if (r && !r.errored) {
        r.errored = err2;
      }
    }
  }
  function destroy(err2, cb) {
    const r = this._readableState;
    const w = this._writableState;
    const s = w || r;
    if (w !== null && w !== void 0 && w.destroyed || r !== null && r !== void 0 && r.destroyed) {
      if (typeof cb === "function") {
        cb();
      }
      return this;
    }
    checkError(err2, w, r);
    if (w) {
      w.destroyed = true;
    }
    if (r) {
      r.destroyed = true;
    }
    if (!s.constructed) {
      this.once(kDestroy, function(er) {
        _destroy(this, aggregateTwoErrors(er, err2), cb);
      });
    } else {
      _destroy(this, err2, cb);
    }
    return this;
  }
  function _destroy(self2, err2, cb) {
    let called = false;
    function onDestroy(err3) {
      if (called) {
        return;
      }
      called = true;
      const r = self2._readableState;
      const w = self2._writableState;
      checkError(err3, w, r);
      if (w) {
        w.closed = true;
      }
      if (r) {
        r.closed = true;
      }
      if (typeof cb === "function") {
        cb(err3);
      }
      if (err3) {
        process.nextTick(emitErrorCloseNT, self2, err3);
      } else {
        process.nextTick(emitCloseNT, self2);
      }
    }
    try {
      self2._destroy(err2 || null, onDestroy);
    } catch (err3) {
      onDestroy(err3);
    }
  }
  function emitErrorCloseNT(self2, err2) {
    emitErrorNT(self2, err2);
    emitCloseNT(self2);
  }
  function emitCloseNT(self2) {
    const r = self2._readableState;
    const w = self2._writableState;
    if (w) {
      w.closeEmitted = true;
    }
    if (r) {
      r.closeEmitted = true;
    }
    if (w !== null && w !== void 0 && w.emitClose || r !== null && r !== void 0 && r.emitClose) {
      self2.emit("close");
    }
  }
  function emitErrorNT(self2, err2) {
    const r = self2._readableState;
    const w = self2._writableState;
    if (w !== null && w !== void 0 && w.errorEmitted || r !== null && r !== void 0 && r.errorEmitted) {
      return;
    }
    if (w) {
      w.errorEmitted = true;
    }
    if (r) {
      r.errorEmitted = true;
    }
    self2.emit("error", err2);
  }
  function undestroy() {
    const r = this._readableState;
    const w = this._writableState;
    if (r) {
      r.constructed = true;
      r.closed = false;
      r.closeEmitted = false;
      r.destroyed = false;
      r.errored = null;
      r.errorEmitted = false;
      r.reading = false;
      r.ended = r.readable === false;
      r.endEmitted = r.readable === false;
    }
    if (w) {
      w.constructed = true;
      w.destroyed = false;
      w.closed = false;
      w.closeEmitted = false;
      w.errored = null;
      w.errorEmitted = false;
      w.finalCalled = false;
      w.prefinished = false;
      w.ended = w.writable === false;
      w.ending = w.writable === false;
      w.finished = w.writable === false;
    }
  }
  function errorOrDestroy(stream2, err2, sync) {
    const r = stream2._readableState;
    const w = stream2._writableState;
    if (w !== null && w !== void 0 && w.destroyed || r !== null && r !== void 0 && r.destroyed) {
      return this;
    }
    if (r !== null && r !== void 0 && r.autoDestroy || w !== null && w !== void 0 && w.autoDestroy)
      stream2.destroy(err2);
    else if (err2) {
      err2.stack;
      if (w && !w.errored) {
        w.errored = err2;
      }
      if (r && !r.errored) {
        r.errored = err2;
      }
      if (sync) {
        process.nextTick(emitErrorNT, stream2, err2);
      } else {
        emitErrorNT(stream2, err2);
      }
    }
  }
  function construct(stream2, cb) {
    if (typeof stream2._construct !== "function") {
      return;
    }
    const r = stream2._readableState;
    const w = stream2._writableState;
    if (r) {
      r.constructed = false;
    }
    if (w) {
      w.constructed = false;
    }
    stream2.once(kConstruct, cb);
    if (stream2.listenerCount(kConstruct) > 1) {
      return;
    }
    process.nextTick(constructNT, stream2);
  }
  function constructNT(stream2) {
    let called = false;
    function onConstruct(err2) {
      if (called) {
        errorOrDestroy(stream2, err2 !== null && err2 !== void 0 ? err2 : new ERR_MULTIPLE_CALLBACK());
        return;
      }
      called = true;
      const r = stream2._readableState;
      const w = stream2._writableState;
      const s = w || r;
      if (r) {
        r.constructed = true;
      }
      if (w) {
        w.constructed = true;
      }
      if (s.destroyed) {
        stream2.emit(kDestroy, err2);
      } else if (err2) {
        errorOrDestroy(stream2, err2, true);
      } else {
        process.nextTick(emitConstructNT, stream2);
      }
    }
    try {
      stream2._construct((err2) => {
        process.nextTick(onConstruct, err2);
      });
    } catch (err2) {
      process.nextTick(onConstruct, err2);
    }
  }
  function emitConstructNT(stream2) {
    stream2.emit(kConstruct);
  }
  function isRequest(stream2) {
    return (stream2 === null || stream2 === void 0 ? void 0 : stream2.setHeader) && typeof stream2.abort === "function";
  }
  function emitCloseLegacy(stream2) {
    stream2.emit("close");
  }
  function emitErrorCloseLegacy(stream2, err2) {
    stream2.emit("error", err2);
    process.nextTick(emitCloseLegacy, stream2);
  }
  function destroyer(stream2, err2) {
    if (!stream2 || isDestroyed(stream2)) {
      return;
    }
    if (!err2 && !isFinished(stream2)) {
      err2 = new AbortError();
    }
    if (isServerRequest(stream2)) {
      stream2.socket = null;
      stream2.destroy(err2);
    } else if (isRequest(stream2)) {
      stream2.abort();
    } else if (isRequest(stream2.req)) {
      stream2.req.abort();
    } else if (typeof stream2.destroy === "function") {
      stream2.destroy(err2);
    } else if (typeof stream2.close === "function") {
      stream2.close();
    } else if (err2) {
      process.nextTick(emitErrorCloseLegacy, stream2, err2);
    } else {
      process.nextTick(emitCloseLegacy, stream2);
    }
    if (!stream2.destroyed) {
      stream2[kIsDestroyed] = true;
    }
  }
  destroy_1 = {
    construct,
    destroyer,
    destroy,
    undestroy,
    errorOrDestroy
  };
  return destroy_1;
}
var legacy;
var hasRequiredLegacy;
function requireLegacy() {
  if (hasRequiredLegacy) return legacy;
  hasRequiredLegacy = 1;
  const { ArrayIsArray, ObjectSetPrototypeOf } = requirePrimordials();
  const { EventEmitter: EE } = requireEvents();
  function Stream(opts) {
    EE.call(this, opts);
  }
  ObjectSetPrototypeOf(Stream.prototype, EE.prototype);
  ObjectSetPrototypeOf(Stream, EE);
  Stream.prototype.pipe = function(dest, options) {
    const source = this;
    function ondata(chunk) {
      if (dest.writable && dest.write(chunk) === false && source.pause) {
        source.pause();
      }
    }
    source.on("data", ondata);
    function ondrain() {
      if (source.readable && source.resume) {
        source.resume();
      }
    }
    dest.on("drain", ondrain);
    if (!dest._isStdio && (!options || options.end !== false)) {
      source.on("end", onend);
      source.on("close", onclose);
    }
    let didOnEnd = false;
    function onend() {
      if (didOnEnd) return;
      didOnEnd = true;
      dest.end();
    }
    function onclose() {
      if (didOnEnd) return;
      didOnEnd = true;
      if (typeof dest.destroy === "function") dest.destroy();
    }
    function onerror(er) {
      cleanup();
      if (EE.listenerCount(this, "error") === 0) {
        this.emit("error", er);
      }
    }
    prependListener(source, "error", onerror);
    prependListener(dest, "error", onerror);
    function cleanup() {
      source.removeListener("data", ondata);
      dest.removeListener("drain", ondrain);
      source.removeListener("end", onend);
      source.removeListener("close", onclose);
      source.removeListener("error", onerror);
      dest.removeListener("error", onerror);
      source.removeListener("end", cleanup);
      source.removeListener("close", cleanup);
      dest.removeListener("close", cleanup);
    }
    source.on("end", cleanup);
    source.on("close", cleanup);
    dest.on("close", cleanup);
    dest.emit("pipe", source);
    return dest;
  };
  function prependListener(emitter, event, fn) {
    if (typeof emitter.prependListener === "function") return emitter.prependListener(event, fn);
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
    else if (ArrayIsArray(emitter._events[event])) emitter._events[event].unshift(fn);
    else emitter._events[event] = [fn, emitter._events[event]];
  }
  legacy = {
    Stream,
    prependListener
  };
  return legacy;
}
var addAbortSignal = { exports: {} };
var hasRequiredAddAbortSignal;
function requireAddAbortSignal() {
  if (hasRequiredAddAbortSignal) return addAbortSignal.exports;
  hasRequiredAddAbortSignal = 1;
  (function(module) {
    const { SymbolDispose } = requirePrimordials();
    const { AbortError, codes } = requireErrors();
    const { isNodeStream, isWebStream, kControllerErrorFunction } = requireUtils();
    const eos = requireEndOfStream();
    const { ERR_INVALID_ARG_TYPE } = codes;
    let addAbortListener;
    const validateAbortSignal = (signal, name) => {
      if (typeof signal !== "object" || !("aborted" in signal)) {
        throw new ERR_INVALID_ARG_TYPE(name, "AbortSignal", signal);
      }
    };
    module.exports.addAbortSignal = function addAbortSignal2(signal, stream2) {
      validateAbortSignal(signal, "signal");
      if (!isNodeStream(stream2) && !isWebStream(stream2)) {
        throw new ERR_INVALID_ARG_TYPE("stream", ["ReadableStream", "WritableStream", "Stream"], stream2);
      }
      return module.exports.addAbortSignalNoValidate(signal, stream2);
    };
    module.exports.addAbortSignalNoValidate = function(signal, stream2) {
      if (typeof signal !== "object" || !("aborted" in signal)) {
        return stream2;
      }
      const onAbort = isNodeStream(stream2) ? () => {
        stream2.destroy(
          new AbortError(void 0, {
            cause: signal.reason
          })
        );
      } : () => {
        stream2[kControllerErrorFunction](
          new AbortError(void 0, {
            cause: signal.reason
          })
        );
      };
      if (signal.aborted) {
        onAbort();
      } else {
        addAbortListener = addAbortListener || requireUtil().addAbortListener;
        const disposable = addAbortListener(signal, onAbort);
        eos(stream2, disposable[SymbolDispose]);
      }
      return stream2;
    };
  })(addAbortSignal);
  return addAbortSignal.exports;
}
var buffer_list;
var hasRequiredBuffer_list;
function requireBuffer_list() {
  if (hasRequiredBuffer_list) return buffer_list;
  hasRequiredBuffer_list = 1;
  const { StringPrototypeSlice, SymbolIterator, TypedArrayPrototypeSet, Uint8Array: Uint8Array2 } = requirePrimordials();
  const { Buffer: Buffer2 } = requireBuffer();
  const { inspect: inspect2 } = requireUtil();
  buffer_list = class BufferList {
    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
    push(v) {
      const entry = {
        data: v,
        next: null
      };
      if (this.length > 0) this.tail.next = entry;
      else this.head = entry;
      this.tail = entry;
      ++this.length;
    }
    unshift(v) {
      const entry = {
        data: v,
        next: this.head
      };
      if (this.length === 0) this.tail = entry;
      this.head = entry;
      ++this.length;
    }
    shift() {
      if (this.length === 0) return;
      const ret = this.head.data;
      if (this.length === 1) this.head = this.tail = null;
      else this.head = this.head.next;
      --this.length;
      return ret;
    }
    clear() {
      this.head = this.tail = null;
      this.length = 0;
    }
    join(s) {
      if (this.length === 0) return "";
      let p = this.head;
      let ret = "" + p.data;
      while ((p = p.next) !== null) ret += s + p.data;
      return ret;
    }
    concat(n) {
      if (this.length === 0) return Buffer2.alloc(0);
      const ret = Buffer2.allocUnsafe(n >>> 0);
      let p = this.head;
      let i = 0;
      while (p) {
        TypedArrayPrototypeSet(ret, p.data, i);
        i += p.data.length;
        p = p.next;
      }
      return ret;
    }
    // Consumes a specified amount of bytes or characters from the buffered data.
    consume(n, hasStrings) {
      const data = this.head.data;
      if (n < data.length) {
        const slice = data.slice(0, n);
        this.head.data = data.slice(n);
        return slice;
      }
      if (n === data.length) {
        return this.shift();
      }
      return hasStrings ? this._getString(n) : this._getBuffer(n);
    }
    first() {
      return this.head.data;
    }
    *[SymbolIterator]() {
      for (let p = this.head; p; p = p.next) {
        yield p.data;
      }
    }
    // Consumes a specified amount of characters from the buffered data.
    _getString(n) {
      let ret = "";
      let p = this.head;
      let c = 0;
      do {
        const str = p.data;
        if (n > str.length) {
          ret += str;
          n -= str.length;
        } else {
          if (n === str.length) {
            ret += str;
            ++c;
            if (p.next) this.head = p.next;
            else this.head = this.tail = null;
          } else {
            ret += StringPrototypeSlice(str, 0, n);
            this.head = p;
            p.data = StringPrototypeSlice(str, n);
          }
          break;
        }
        ++c;
      } while ((p = p.next) !== null);
      this.length -= c;
      return ret;
    }
    // Consumes a specified amount of bytes from the buffered data.
    _getBuffer(n) {
      const ret = Buffer2.allocUnsafe(n);
      const retLen = n;
      let p = this.head;
      let c = 0;
      do {
        const buf = p.data;
        if (n > buf.length) {
          TypedArrayPrototypeSet(ret, buf, retLen - n);
          n -= buf.length;
        } else {
          if (n === buf.length) {
            TypedArrayPrototypeSet(ret, buf, retLen - n);
            ++c;
            if (p.next) this.head = p.next;
            else this.head = this.tail = null;
          } else {
            TypedArrayPrototypeSet(ret, new Uint8Array2(buf.buffer, buf.byteOffset, n), retLen - n);
            this.head = p;
            p.data = buf.slice(n);
          }
          break;
        }
        ++c;
      } while ((p = p.next) !== null);
      this.length -= c;
      return ret;
    }
    // Make sure the linked list only shows the minimal necessary information.
    [Symbol.for("nodejs.util.inspect.custom")](_, options) {
      return inspect2(this, {
        ...options,
        // Only inspect one level.
        depth: 0,
        // It should not recurse.
        customInspect: false
      });
    }
  };
  return buffer_list;
}
var state;
var hasRequiredState;
function requireState() {
  if (hasRequiredState) return state;
  hasRequiredState = 1;
  const { MathFloor, NumberIsInteger } = requirePrimordials();
  const { validateInteger } = requireValidators();
  const { ERR_INVALID_ARG_VALUE } = requireErrors().codes;
  let defaultHighWaterMarkBytes = 16 * 1024;
  let defaultHighWaterMarkObjectMode = 16;
  function highWaterMarkFrom(options, isDuplex, duplexKey) {
    return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
  }
  function getDefaultHighWaterMark(objectMode) {
    return objectMode ? defaultHighWaterMarkObjectMode : defaultHighWaterMarkBytes;
  }
  function setDefaultHighWaterMark(objectMode, value) {
    validateInteger(value, "value", 0);
    if (objectMode) {
      defaultHighWaterMarkObjectMode = value;
    } else {
      defaultHighWaterMarkBytes = value;
    }
  }
  function getHighWaterMark(state2, options, duplexKey, isDuplex) {
    const hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
    if (hwm != null) {
      if (!NumberIsInteger(hwm) || hwm < 0) {
        const name = isDuplex ? `options.${duplexKey}` : "options.highWaterMark";
        throw new ERR_INVALID_ARG_VALUE(name, hwm);
      }
      return MathFloor(hwm);
    }
    return getDefaultHighWaterMark(state2.objectMode);
  }
  state = {
    getHighWaterMark,
    getDefaultHighWaterMark,
    setDefaultHighWaterMark
  };
  return state;
}
var string_decoder = {};
var safeBuffer = { exports: {} };
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var hasRequiredSafeBuffer;
function requireSafeBuffer() {
  if (hasRequiredSafeBuffer) return safeBuffer.exports;
  hasRequiredSafeBuffer = 1;
  (function(module, exports) {
    var buffer2 = requireBuffer();
    var Buffer2 = buffer2.Buffer;
    function copyProps(src, dst) {
      for (var key2 in src) {
        dst[key2] = src[key2];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module.exports = buffer2;
    } else {
      copyProps(buffer2, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    SafeBuffer.prototype = Object.create(Buffer2.prototype);
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer2.SlowBuffer(size);
    };
  })(safeBuffer, safeBuffer.exports);
  return safeBuffer.exports;
}
var hasRequiredString_decoder;
function requireString_decoder() {
  if (hasRequiredString_decoder) return string_decoder;
  hasRequiredString_decoder = 1;
  var Buffer2 = requireSafeBuffer().Buffer;
  var isEncoding = Buffer2.isEncoding || function(encoding) {
    encoding = "" + encoding;
    switch (encoding && encoding.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return true;
      default:
        return false;
    }
  };
  function _normalizeEncoding(enc) {
    if (!enc) return "utf8";
    var retried;
    while (true) {
      switch (enc) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return enc;
        default:
          if (retried) return;
          enc = ("" + enc).toLowerCase();
          retried = true;
      }
    }
  }
  function normalizeEncoding(enc) {
    var nenc = _normalizeEncoding(enc);
    if (typeof nenc !== "string" && (Buffer2.isEncoding === isEncoding || !isEncoding(enc))) throw new Error("Unknown encoding: " + enc);
    return nenc || enc;
  }
  string_decoder.StringDecoder = StringDecoder;
  function StringDecoder(encoding) {
    this.encoding = normalizeEncoding(encoding);
    var nb;
    switch (this.encoding) {
      case "utf16le":
        this.text = utf16Text;
        this.end = utf16End;
        nb = 4;
        break;
      case "utf8":
        this.fillLast = utf8FillLast;
        nb = 4;
        break;
      case "base64":
        this.text = base64Text;
        this.end = base64End;
        nb = 3;
        break;
      default:
        this.write = simpleWrite;
        this.end = simpleEnd;
        return;
    }
    this.lastNeed = 0;
    this.lastTotal = 0;
    this.lastChar = Buffer2.allocUnsafe(nb);
  }
  StringDecoder.prototype.write = function(buf) {
    if (buf.length === 0) return "";
    var r;
    var i;
    if (this.lastNeed) {
      r = this.fillLast(buf);
      if (r === void 0) return "";
      i = this.lastNeed;
      this.lastNeed = 0;
    } else {
      i = 0;
    }
    if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
    return r || "";
  };
  StringDecoder.prototype.end = utf8End;
  StringDecoder.prototype.text = utf8Text;
  StringDecoder.prototype.fillLast = function(buf) {
    if (this.lastNeed <= buf.length) {
      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
      return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
    this.lastNeed -= buf.length;
  };
  function utf8CheckByte(byte) {
    if (byte <= 127) return 0;
    else if (byte >> 5 === 6) return 2;
    else if (byte >> 4 === 14) return 3;
    else if (byte >> 3 === 30) return 4;
    return byte >> 6 === 2 ? -1 : -2;
  }
  function utf8CheckIncomplete(self2, buf, i) {
    var j = buf.length - 1;
    if (j < i) return 0;
    var nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0) self2.lastNeed = nb - 1;
      return nb;
    }
    if (--j < i || nb === -2) return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0) self2.lastNeed = nb - 2;
      return nb;
    }
    if (--j < i || nb === -2) return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0) {
        if (nb === 2) nb = 0;
        else self2.lastNeed = nb - 3;
      }
      return nb;
    }
    return 0;
  }
  function utf8CheckExtraBytes(self2, buf, p) {
    if ((buf[0] & 192) !== 128) {
      self2.lastNeed = 0;
      return "�";
    }
    if (self2.lastNeed > 1 && buf.length > 1) {
      if ((buf[1] & 192) !== 128) {
        self2.lastNeed = 1;
        return "�";
      }
      if (self2.lastNeed > 2 && buf.length > 2) {
        if ((buf[2] & 192) !== 128) {
          self2.lastNeed = 2;
          return "�";
        }
      }
    }
  }
  function utf8FillLast(buf) {
    var p = this.lastTotal - this.lastNeed;
    var r = utf8CheckExtraBytes(this, buf);
    if (r !== void 0) return r;
    if (this.lastNeed <= buf.length) {
      buf.copy(this.lastChar, p, 0, this.lastNeed);
      return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, p, 0, buf.length);
    this.lastNeed -= buf.length;
  }
  function utf8Text(buf, i) {
    var total = utf8CheckIncomplete(this, buf, i);
    if (!this.lastNeed) return buf.toString("utf8", i);
    this.lastTotal = total;
    var end = buf.length - (total - this.lastNeed);
    buf.copy(this.lastChar, 0, end);
    return buf.toString("utf8", i, end);
  }
  function utf8End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) return r + "�";
    return r;
  }
  function utf16Text(buf, i) {
    if ((buf.length - i) % 2 === 0) {
      var r = buf.toString("utf16le", i);
      if (r) {
        var c = r.charCodeAt(r.length - 1);
        if (c >= 55296 && c <= 56319) {
          this.lastNeed = 2;
          this.lastTotal = 4;
          this.lastChar[0] = buf[buf.length - 2];
          this.lastChar[1] = buf[buf.length - 1];
          return r.slice(0, -1);
        }
      }
      return r;
    }
    this.lastNeed = 1;
    this.lastTotal = 2;
    this.lastChar[0] = buf[buf.length - 1];
    return buf.toString("utf16le", i, buf.length - 1);
  }
  function utf16End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) {
      var end = this.lastTotal - this.lastNeed;
      return r + this.lastChar.toString("utf16le", 0, end);
    }
    return r;
  }
  function base64Text(buf, i) {
    var n = (buf.length - i) % 3;
    if (n === 0) return buf.toString("base64", i);
    this.lastNeed = 3 - n;
    this.lastTotal = 3;
    if (n === 1) {
      this.lastChar[0] = buf[buf.length - 1];
    } else {
      this.lastChar[0] = buf[buf.length - 2];
      this.lastChar[1] = buf[buf.length - 1];
    }
    return buf.toString("base64", i, buf.length - n);
  }
  function base64End(buf) {
    var r = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
    return r;
  }
  function simpleWrite(buf) {
    return buf.toString(this.encoding);
  }
  function simpleEnd(buf) {
    return buf && buf.length ? this.write(buf) : "";
  }
  return string_decoder;
}
var from_1;
var hasRequiredFrom;
function requireFrom() {
  if (hasRequiredFrom) return from_1;
  hasRequiredFrom = 1;
  const process = requireBrowser$1();
  const { PromisePrototypeThen, SymbolAsyncIterator, SymbolIterator } = requirePrimordials();
  const { Buffer: Buffer2 } = requireBuffer();
  const { ERR_INVALID_ARG_TYPE, ERR_STREAM_NULL_VALUES } = requireErrors().codes;
  function from(Readable, iterable, opts) {
    let iterator;
    if (typeof iterable === "string" || iterable instanceof Buffer2) {
      return new Readable({
        objectMode: true,
        ...opts,
        read() {
          this.push(iterable);
          this.push(null);
        }
      });
    }
    let isAsync;
    if (iterable && iterable[SymbolAsyncIterator]) {
      isAsync = true;
      iterator = iterable[SymbolAsyncIterator]();
    } else if (iterable && iterable[SymbolIterator]) {
      isAsync = false;
      iterator = iterable[SymbolIterator]();
    } else {
      throw new ERR_INVALID_ARG_TYPE("iterable", ["Iterable"], iterable);
    }
    const readable2 = new Readable({
      objectMode: true,
      highWaterMark: 1,
      // TODO(ronag): What options should be allowed?
      ...opts
    });
    let reading = false;
    readable2._read = function() {
      if (!reading) {
        reading = true;
        next();
      }
    };
    readable2._destroy = function(error, cb) {
      PromisePrototypeThen(
        close2(error),
        () => process.nextTick(cb, error),
        // nextTick is here in case cb throws
        (e) => process.nextTick(cb, e || error)
      );
    };
    async function close2(error) {
      const hadError = error !== void 0 && error !== null;
      const hasThrow = typeof iterator.throw === "function";
      if (hadError && hasThrow) {
        const { value, done } = await iterator.throw(error);
        await value;
        if (done) {
          return;
        }
      }
      if (typeof iterator.return === "function") {
        const { value } = await iterator.return();
        await value;
      }
    }
    async function next() {
      for (; ; ) {
        try {
          const { value, done } = isAsync ? await iterator.next() : iterator.next();
          if (done) {
            readable2.push(null);
          } else {
            const res = value && typeof value.then === "function" ? await value : value;
            if (res === null) {
              reading = false;
              throw new ERR_STREAM_NULL_VALUES();
            } else if (readable2.push(res)) {
              continue;
            } else {
              reading = false;
            }
          }
        } catch (err2) {
          readable2.destroy(err2);
        }
        break;
      }
    }
    return readable2;
  }
  from_1 = from;
  return from_1;
}
var readable;
var hasRequiredReadable;
function requireReadable() {
  if (hasRequiredReadable) return readable;
  hasRequiredReadable = 1;
  const process = requireBrowser$1();
  const {
    ArrayPrototypeIndexOf,
    NumberIsInteger,
    NumberIsNaN,
    NumberParseInt,
    ObjectDefineProperties,
    ObjectKeys,
    ObjectSetPrototypeOf,
    Promise: Promise2,
    SafeSet,
    SymbolAsyncDispose,
    SymbolAsyncIterator,
    Symbol: Symbol2
  } = requirePrimordials();
  readable = Readable;
  Readable.ReadableState = ReadableState;
  const { EventEmitter: EE } = requireEvents();
  const { Stream, prependListener } = requireLegacy();
  const { Buffer: Buffer2 } = requireBuffer();
  const { addAbortSignal: addAbortSignal2 } = requireAddAbortSignal();
  const eos = requireEndOfStream();
  let debug2 = requireUtil().debuglog("stream", (fn) => {
    debug2 = fn;
  });
  const BufferList = requireBuffer_list();
  const destroyImpl = requireDestroy();
  const { getHighWaterMark, getDefaultHighWaterMark } = requireState();
  const {
    aggregateTwoErrors,
    codes: {
      ERR_INVALID_ARG_TYPE,
      ERR_METHOD_NOT_IMPLEMENTED,
      ERR_OUT_OF_RANGE,
      ERR_STREAM_PUSH_AFTER_EOF,
      ERR_STREAM_UNSHIFT_AFTER_END_EVENT
    },
    AbortError
  } = requireErrors();
  const { validateObject } = requireValidators();
  const kPaused = Symbol2("kPaused");
  const { StringDecoder } = requireString_decoder();
  const from = requireFrom();
  ObjectSetPrototypeOf(Readable.prototype, Stream.prototype);
  ObjectSetPrototypeOf(Readable, Stream);
  const nop2 = () => {
  };
  const { errorOrDestroy } = destroyImpl;
  const kObjectMode = 1 << 0;
  const kEnded = 1 << 1;
  const kEndEmitted = 1 << 2;
  const kReading = 1 << 3;
  const kConstructed = 1 << 4;
  const kSync = 1 << 5;
  const kNeedReadable = 1 << 6;
  const kEmittedReadable = 1 << 7;
  const kReadableListening = 1 << 8;
  const kResumeScheduled = 1 << 9;
  const kErrorEmitted = 1 << 10;
  const kEmitClose = 1 << 11;
  const kAutoDestroy = 1 << 12;
  const kDestroyed = 1 << 13;
  const kClosed = 1 << 14;
  const kCloseEmitted = 1 << 15;
  const kMultiAwaitDrain = 1 << 16;
  const kReadingMore = 1 << 17;
  const kDataEmitted = 1 << 18;
  function makeBitMapDescriptor(bit) {
    return {
      enumerable: false,
      get() {
        return (this.state & bit) !== 0;
      },
      set(value) {
        if (value) this.state |= bit;
        else this.state &= ~bit;
      }
    };
  }
  ObjectDefineProperties(ReadableState.prototype, {
    objectMode: makeBitMapDescriptor(kObjectMode),
    ended: makeBitMapDescriptor(kEnded),
    endEmitted: makeBitMapDescriptor(kEndEmitted),
    reading: makeBitMapDescriptor(kReading),
    // Stream is still being constructed and cannot be
    // destroyed until construction finished or failed.
    // Async construction is opt in, therefore we start as
    // constructed.
    constructed: makeBitMapDescriptor(kConstructed),
    // A flag to be able to tell if the event 'readable'/'data' is emitted
    // immediately, or on a later tick.  We set this to true at first, because
    // any actions that shouldn't happen until "later" should generally also
    // not happen before the first read call.
    sync: makeBitMapDescriptor(kSync),
    // Whenever we return null, then we set a flag to say
    // that we're awaiting a 'readable' event emission.
    needReadable: makeBitMapDescriptor(kNeedReadable),
    emittedReadable: makeBitMapDescriptor(kEmittedReadable),
    readableListening: makeBitMapDescriptor(kReadableListening),
    resumeScheduled: makeBitMapDescriptor(kResumeScheduled),
    // True if the error was already emitted and should not be thrown again.
    errorEmitted: makeBitMapDescriptor(kErrorEmitted),
    emitClose: makeBitMapDescriptor(kEmitClose),
    autoDestroy: makeBitMapDescriptor(kAutoDestroy),
    // Has it been destroyed.
    destroyed: makeBitMapDescriptor(kDestroyed),
    // Indicates whether the stream has finished destroying.
    closed: makeBitMapDescriptor(kClosed),
    // True if close has been emitted or would have been emitted
    // depending on emitClose.
    closeEmitted: makeBitMapDescriptor(kCloseEmitted),
    multiAwaitDrain: makeBitMapDescriptor(kMultiAwaitDrain),
    // If true, a maybeReadMore has been scheduled.
    readingMore: makeBitMapDescriptor(kReadingMore),
    dataEmitted: makeBitMapDescriptor(kDataEmitted)
  });
  function ReadableState(options, stream2, isDuplex) {
    if (typeof isDuplex !== "boolean") isDuplex = stream2 instanceof requireDuplex();
    this.state = kEmitClose | kAutoDestroy | kConstructed | kSync;
    if (options && options.objectMode) this.state |= kObjectMode;
    if (isDuplex && options && options.readableObjectMode) this.state |= kObjectMode;
    this.highWaterMark = options ? getHighWaterMark(this, options, "readableHighWaterMark", isDuplex) : getDefaultHighWaterMark(false);
    this.buffer = new BufferList();
    this.length = 0;
    this.pipes = [];
    this.flowing = null;
    this[kPaused] = null;
    if (options && options.emitClose === false) this.state &= ~kEmitClose;
    if (options && options.autoDestroy === false) this.state &= ~kAutoDestroy;
    this.errored = null;
    this.defaultEncoding = options && options.defaultEncoding || "utf8";
    this.awaitDrainWriters = null;
    this.decoder = null;
    this.encoding = null;
    if (options && options.encoding) {
      this.decoder = new StringDecoder(options.encoding);
      this.encoding = options.encoding;
    }
  }
  function Readable(options) {
    if (!(this instanceof Readable)) return new Readable(options);
    const isDuplex = this instanceof requireDuplex();
    this._readableState = new ReadableState(options, this, isDuplex);
    if (options) {
      if (typeof options.read === "function") this._read = options.read;
      if (typeof options.destroy === "function") this._destroy = options.destroy;
      if (typeof options.construct === "function") this._construct = options.construct;
      if (options.signal && !isDuplex) addAbortSignal2(options.signal, this);
    }
    Stream.call(this, options);
    destroyImpl.construct(this, () => {
      if (this._readableState.needReadable) {
        maybeReadMore(this, this._readableState);
      }
    });
  }
  Readable.prototype.destroy = destroyImpl.destroy;
  Readable.prototype._undestroy = destroyImpl.undestroy;
  Readable.prototype._destroy = function(err2, cb) {
    cb(err2);
  };
  Readable.prototype[EE.captureRejectionSymbol] = function(err2) {
    this.destroy(err2);
  };
  Readable.prototype[SymbolAsyncDispose] = function() {
    let error;
    if (!this.destroyed) {
      error = this.readableEnded ? null : new AbortError();
      this.destroy(error);
    }
    return new Promise2((resolve2, reject) => eos(this, (err2) => err2 && err2 !== error ? reject(err2) : resolve2(null)));
  };
  Readable.prototype.push = function(chunk, encoding) {
    return readableAddChunk(this, chunk, encoding, false);
  };
  Readable.prototype.unshift = function(chunk, encoding) {
    return readableAddChunk(this, chunk, encoding, true);
  };
  function readableAddChunk(stream2, chunk, encoding, addToFront) {
    debug2("readableAddChunk", chunk);
    const state2 = stream2._readableState;
    let err2;
    if ((state2.state & kObjectMode) === 0) {
      if (typeof chunk === "string") {
        encoding = encoding || state2.defaultEncoding;
        if (state2.encoding !== encoding) {
          if (addToFront && state2.encoding) {
            chunk = Buffer2.from(chunk, encoding).toString(state2.encoding);
          } else {
            chunk = Buffer2.from(chunk, encoding);
            encoding = "";
          }
        }
      } else if (chunk instanceof Buffer2) {
        encoding = "";
      } else if (Stream._isUint8Array(chunk)) {
        chunk = Stream._uint8ArrayToBuffer(chunk);
        encoding = "";
      } else if (chunk != null) {
        err2 = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
      }
    }
    if (err2) {
      errorOrDestroy(stream2, err2);
    } else if (chunk === null) {
      state2.state &= ~kReading;
      onEofChunk(stream2, state2);
    } else if ((state2.state & kObjectMode) !== 0 || chunk && chunk.length > 0) {
      if (addToFront) {
        if ((state2.state & kEndEmitted) !== 0) errorOrDestroy(stream2, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
        else if (state2.destroyed || state2.errored) return false;
        else addChunk(stream2, state2, chunk, true);
      } else if (state2.ended) {
        errorOrDestroy(stream2, new ERR_STREAM_PUSH_AFTER_EOF());
      } else if (state2.destroyed || state2.errored) {
        return false;
      } else {
        state2.state &= ~kReading;
        if (state2.decoder && !encoding) {
          chunk = state2.decoder.write(chunk);
          if (state2.objectMode || chunk.length !== 0) addChunk(stream2, state2, chunk, false);
          else maybeReadMore(stream2, state2);
        } else {
          addChunk(stream2, state2, chunk, false);
        }
      }
    } else if (!addToFront) {
      state2.state &= ~kReading;
      maybeReadMore(stream2, state2);
    }
    return !state2.ended && (state2.length < state2.highWaterMark || state2.length === 0);
  }
  function addChunk(stream2, state2, chunk, addToFront) {
    if (state2.flowing && state2.length === 0 && !state2.sync && stream2.listenerCount("data") > 0) {
      if ((state2.state & kMultiAwaitDrain) !== 0) {
        state2.awaitDrainWriters.clear();
      } else {
        state2.awaitDrainWriters = null;
      }
      state2.dataEmitted = true;
      stream2.emit("data", chunk);
    } else {
      state2.length += state2.objectMode ? 1 : chunk.length;
      if (addToFront) state2.buffer.unshift(chunk);
      else state2.buffer.push(chunk);
      if ((state2.state & kNeedReadable) !== 0) emitReadable(stream2);
    }
    maybeReadMore(stream2, state2);
  }
  Readable.prototype.isPaused = function() {
    const state2 = this._readableState;
    return state2[kPaused] === true || state2.flowing === false;
  };
  Readable.prototype.setEncoding = function(enc) {
    const decoder2 = new StringDecoder(enc);
    this._readableState.decoder = decoder2;
    this._readableState.encoding = this._readableState.decoder.encoding;
    const buffer2 = this._readableState.buffer;
    let content = "";
    for (const data of buffer2) {
      content += decoder2.write(data);
    }
    buffer2.clear();
    if (content !== "") buffer2.push(content);
    this._readableState.length = content.length;
    return this;
  };
  const MAX_HWM = 1073741824;
  function computeNewHighWaterMark(n) {
    if (n > MAX_HWM) {
      throw new ERR_OUT_OF_RANGE("size", "<= 1GiB", n);
    } else {
      n--;
      n |= n >>> 1;
      n |= n >>> 2;
      n |= n >>> 4;
      n |= n >>> 8;
      n |= n >>> 16;
      n++;
    }
    return n;
  }
  function howMuchToRead(n, state2) {
    if (n <= 0 || state2.length === 0 && state2.ended) return 0;
    if ((state2.state & kObjectMode) !== 0) return 1;
    if (NumberIsNaN(n)) {
      if (state2.flowing && state2.length) return state2.buffer.first().length;
      return state2.length;
    }
    if (n <= state2.length) return n;
    return state2.ended ? state2.length : 0;
  }
  Readable.prototype.read = function(n) {
    debug2("read", n);
    if (n === void 0) {
      n = NaN;
    } else if (!NumberIsInteger(n)) {
      n = NumberParseInt(n, 10);
    }
    const state2 = this._readableState;
    const nOrig = n;
    if (n > state2.highWaterMark) state2.highWaterMark = computeNewHighWaterMark(n);
    if (n !== 0) state2.state &= ~kEmittedReadable;
    if (n === 0 && state2.needReadable && ((state2.highWaterMark !== 0 ? state2.length >= state2.highWaterMark : state2.length > 0) || state2.ended)) {
      debug2("read: emitReadable", state2.length, state2.ended);
      if (state2.length === 0 && state2.ended) endReadable(this);
      else emitReadable(this);
      return null;
    }
    n = howMuchToRead(n, state2);
    if (n === 0 && state2.ended) {
      if (state2.length === 0) endReadable(this);
      return null;
    }
    let doRead = (state2.state & kNeedReadable) !== 0;
    debug2("need readable", doRead);
    if (state2.length === 0 || state2.length - n < state2.highWaterMark) {
      doRead = true;
      debug2("length less than watermark", doRead);
    }
    if (state2.ended || state2.reading || state2.destroyed || state2.errored || !state2.constructed) {
      doRead = false;
      debug2("reading, ended or constructing", doRead);
    } else if (doRead) {
      debug2("do read");
      state2.state |= kReading | kSync;
      if (state2.length === 0) state2.state |= kNeedReadable;
      try {
        this._read(state2.highWaterMark);
      } catch (err2) {
        errorOrDestroy(this, err2);
      }
      state2.state &= ~kSync;
      if (!state2.reading) n = howMuchToRead(nOrig, state2);
    }
    let ret;
    if (n > 0) ret = fromList(n, state2);
    else ret = null;
    if (ret === null) {
      state2.needReadable = state2.length <= state2.highWaterMark;
      n = 0;
    } else {
      state2.length -= n;
      if (state2.multiAwaitDrain) {
        state2.awaitDrainWriters.clear();
      } else {
        state2.awaitDrainWriters = null;
      }
    }
    if (state2.length === 0) {
      if (!state2.ended) state2.needReadable = true;
      if (nOrig !== n && state2.ended) endReadable(this);
    }
    if (ret !== null && !state2.errorEmitted && !state2.closeEmitted) {
      state2.dataEmitted = true;
      this.emit("data", ret);
    }
    return ret;
  };
  function onEofChunk(stream2, state2) {
    debug2("onEofChunk");
    if (state2.ended) return;
    if (state2.decoder) {
      const chunk = state2.decoder.end();
      if (chunk && chunk.length) {
        state2.buffer.push(chunk);
        state2.length += state2.objectMode ? 1 : chunk.length;
      }
    }
    state2.ended = true;
    if (state2.sync) {
      emitReadable(stream2);
    } else {
      state2.needReadable = false;
      state2.emittedReadable = true;
      emitReadable_(stream2);
    }
  }
  function emitReadable(stream2) {
    const state2 = stream2._readableState;
    debug2("emitReadable", state2.needReadable, state2.emittedReadable);
    state2.needReadable = false;
    if (!state2.emittedReadable) {
      debug2("emitReadable", state2.flowing);
      state2.emittedReadable = true;
      process.nextTick(emitReadable_, stream2);
    }
  }
  function emitReadable_(stream2) {
    const state2 = stream2._readableState;
    debug2("emitReadable_", state2.destroyed, state2.length, state2.ended);
    if (!state2.destroyed && !state2.errored && (state2.length || state2.ended)) {
      stream2.emit("readable");
      state2.emittedReadable = false;
    }
    state2.needReadable = !state2.flowing && !state2.ended && state2.length <= state2.highWaterMark;
    flow(stream2);
  }
  function maybeReadMore(stream2, state2) {
    if (!state2.readingMore && state2.constructed) {
      state2.readingMore = true;
      process.nextTick(maybeReadMore_, stream2, state2);
    }
  }
  function maybeReadMore_(stream2, state2) {
    while (!state2.reading && !state2.ended && (state2.length < state2.highWaterMark || state2.flowing && state2.length === 0)) {
      const len = state2.length;
      debug2("maybeReadMore read 0");
      stream2.read(0);
      if (len === state2.length)
        break;
    }
    state2.readingMore = false;
  }
  Readable.prototype._read = function(n) {
    throw new ERR_METHOD_NOT_IMPLEMENTED("_read()");
  };
  Readable.prototype.pipe = function(dest, pipeOpts) {
    const src = this;
    const state2 = this._readableState;
    if (state2.pipes.length === 1) {
      if (!state2.multiAwaitDrain) {
        state2.multiAwaitDrain = true;
        state2.awaitDrainWriters = new SafeSet(state2.awaitDrainWriters ? [state2.awaitDrainWriters] : []);
      }
    }
    state2.pipes.push(dest);
    debug2("pipe count=%d opts=%j", state2.pipes.length, pipeOpts);
    const doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
    const endFn = doEnd ? onend : unpipe;
    if (state2.endEmitted) process.nextTick(endFn);
    else src.once("end", endFn);
    dest.on("unpipe", onunpipe);
    function onunpipe(readable2, unpipeInfo) {
      debug2("onunpipe");
      if (readable2 === src) {
        if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
          unpipeInfo.hasUnpiped = true;
          cleanup();
        }
      }
    }
    function onend() {
      debug2("onend");
      dest.end();
    }
    let ondrain;
    let cleanedUp = false;
    function cleanup() {
      debug2("cleanup");
      dest.removeListener("close", onclose);
      dest.removeListener("finish", onfinish);
      if (ondrain) {
        dest.removeListener("drain", ondrain);
      }
      dest.removeListener("error", onerror);
      dest.removeListener("unpipe", onunpipe);
      src.removeListener("end", onend);
      src.removeListener("end", unpipe);
      src.removeListener("data", ondata);
      cleanedUp = true;
      if (ondrain && state2.awaitDrainWriters && (!dest._writableState || dest._writableState.needDrain)) ondrain();
    }
    function pause() {
      if (!cleanedUp) {
        if (state2.pipes.length === 1 && state2.pipes[0] === dest) {
          debug2("false write response, pause", 0);
          state2.awaitDrainWriters = dest;
          state2.multiAwaitDrain = false;
        } else if (state2.pipes.length > 1 && state2.pipes.includes(dest)) {
          debug2("false write response, pause", state2.awaitDrainWriters.size);
          state2.awaitDrainWriters.add(dest);
        }
        src.pause();
      }
      if (!ondrain) {
        ondrain = pipeOnDrain(src, dest);
        dest.on("drain", ondrain);
      }
    }
    src.on("data", ondata);
    function ondata(chunk) {
      debug2("ondata");
      const ret = dest.write(chunk);
      debug2("dest.write", ret);
      if (ret === false) {
        pause();
      }
    }
    function onerror(er) {
      debug2("onerror", er);
      unpipe();
      dest.removeListener("error", onerror);
      if (dest.listenerCount("error") === 0) {
        const s = dest._writableState || dest._readableState;
        if (s && !s.errorEmitted) {
          errorOrDestroy(dest, er);
        } else {
          dest.emit("error", er);
        }
      }
    }
    prependListener(dest, "error", onerror);
    function onclose() {
      dest.removeListener("finish", onfinish);
      unpipe();
    }
    dest.once("close", onclose);
    function onfinish() {
      debug2("onfinish");
      dest.removeListener("close", onclose);
      unpipe();
    }
    dest.once("finish", onfinish);
    function unpipe() {
      debug2("unpipe");
      src.unpipe(dest);
    }
    dest.emit("pipe", src);
    if (dest.writableNeedDrain === true) {
      pause();
    } else if (!state2.flowing) {
      debug2("pipe resume");
      src.resume();
    }
    return dest;
  };
  function pipeOnDrain(src, dest) {
    return function pipeOnDrainFunctionResult() {
      const state2 = src._readableState;
      if (state2.awaitDrainWriters === dest) {
        debug2("pipeOnDrain", 1);
        state2.awaitDrainWriters = null;
      } else if (state2.multiAwaitDrain) {
        debug2("pipeOnDrain", state2.awaitDrainWriters.size);
        state2.awaitDrainWriters.delete(dest);
      }
      if ((!state2.awaitDrainWriters || state2.awaitDrainWriters.size === 0) && src.listenerCount("data")) {
        src.resume();
      }
    };
  }
  Readable.prototype.unpipe = function(dest) {
    const state2 = this._readableState;
    const unpipeInfo = {
      hasUnpiped: false
    };
    if (state2.pipes.length === 0) return this;
    if (!dest) {
      const dests = state2.pipes;
      state2.pipes = [];
      this.pause();
      for (let i = 0; i < dests.length; i++)
        dests[i].emit("unpipe", this, {
          hasUnpiped: false
        });
      return this;
    }
    const index = ArrayPrototypeIndexOf(state2.pipes, dest);
    if (index === -1) return this;
    state2.pipes.splice(index, 1);
    if (state2.pipes.length === 0) this.pause();
    dest.emit("unpipe", this, unpipeInfo);
    return this;
  };
  Readable.prototype.on = function(ev, fn) {
    const res = Stream.prototype.on.call(this, ev, fn);
    const state2 = this._readableState;
    if (ev === "data") {
      state2.readableListening = this.listenerCount("readable") > 0;
      if (state2.flowing !== false) this.resume();
    } else if (ev === "readable") {
      if (!state2.endEmitted && !state2.readableListening) {
        state2.readableListening = state2.needReadable = true;
        state2.flowing = false;
        state2.emittedReadable = false;
        debug2("on readable", state2.length, state2.reading);
        if (state2.length) {
          emitReadable(this);
        } else if (!state2.reading) {
          process.nextTick(nReadingNextTick, this);
        }
      }
    }
    return res;
  };
  Readable.prototype.addListener = Readable.prototype.on;
  Readable.prototype.removeListener = function(ev, fn) {
    const res = Stream.prototype.removeListener.call(this, ev, fn);
    if (ev === "readable") {
      process.nextTick(updateReadableListening, this);
    }
    return res;
  };
  Readable.prototype.off = Readable.prototype.removeListener;
  Readable.prototype.removeAllListeners = function(ev) {
    const res = Stream.prototype.removeAllListeners.apply(this, arguments);
    if (ev === "readable" || ev === void 0) {
      process.nextTick(updateReadableListening, this);
    }
    return res;
  };
  function updateReadableListening(self2) {
    const state2 = self2._readableState;
    state2.readableListening = self2.listenerCount("readable") > 0;
    if (state2.resumeScheduled && state2[kPaused] === false) {
      state2.flowing = true;
    } else if (self2.listenerCount("data") > 0) {
      self2.resume();
    } else if (!state2.readableListening) {
      state2.flowing = null;
    }
  }
  function nReadingNextTick(self2) {
    debug2("readable nexttick read 0");
    self2.read(0);
  }
  Readable.prototype.resume = function() {
    const state2 = this._readableState;
    if (!state2.flowing) {
      debug2("resume");
      state2.flowing = !state2.readableListening;
      resume(this, state2);
    }
    state2[kPaused] = false;
    return this;
  };
  function resume(stream2, state2) {
    if (!state2.resumeScheduled) {
      state2.resumeScheduled = true;
      process.nextTick(resume_, stream2, state2);
    }
  }
  function resume_(stream2, state2) {
    debug2("resume", state2.reading);
    if (!state2.reading) {
      stream2.read(0);
    }
    state2.resumeScheduled = false;
    stream2.emit("resume");
    flow(stream2);
    if (state2.flowing && !state2.reading) stream2.read(0);
  }
  Readable.prototype.pause = function() {
    debug2("call pause flowing=%j", this._readableState.flowing);
    if (this._readableState.flowing !== false) {
      debug2("pause");
      this._readableState.flowing = false;
      this.emit("pause");
    }
    this._readableState[kPaused] = true;
    return this;
  };
  function flow(stream2) {
    const state2 = stream2._readableState;
    debug2("flow", state2.flowing);
    while (state2.flowing && stream2.read() !== null) ;
  }
  Readable.prototype.wrap = function(stream2) {
    let paused = false;
    stream2.on("data", (chunk) => {
      if (!this.push(chunk) && stream2.pause) {
        paused = true;
        stream2.pause();
      }
    });
    stream2.on("end", () => {
      this.push(null);
    });
    stream2.on("error", (err2) => {
      errorOrDestroy(this, err2);
    });
    stream2.on("close", () => {
      this.destroy();
    });
    stream2.on("destroy", () => {
      this.destroy();
    });
    this._read = () => {
      if (paused && stream2.resume) {
        paused = false;
        stream2.resume();
      }
    };
    const streamKeys = ObjectKeys(stream2);
    for (let j = 1; j < streamKeys.length; j++) {
      const i = streamKeys[j];
      if (this[i] === void 0 && typeof stream2[i] === "function") {
        this[i] = stream2[i].bind(stream2);
      }
    }
    return this;
  };
  Readable.prototype[SymbolAsyncIterator] = function() {
    return streamToAsyncIterator(this);
  };
  Readable.prototype.iterator = function(options) {
    if (options !== void 0) {
      validateObject(options, "options");
    }
    return streamToAsyncIterator(this, options);
  };
  function streamToAsyncIterator(stream2, options) {
    if (typeof stream2.read !== "function") {
      stream2 = Readable.wrap(stream2, {
        objectMode: true
      });
    }
    const iter = createAsyncIterator(stream2, options);
    iter.stream = stream2;
    return iter;
  }
  async function* createAsyncIterator(stream2, options) {
    let callback = nop2;
    function next(resolve2) {
      if (this === stream2) {
        callback();
        callback = nop2;
      } else {
        callback = resolve2;
      }
    }
    stream2.on("readable", next);
    let error;
    const cleanup = eos(
      stream2,
      {
        writable: false
      },
      (err2) => {
        error = err2 ? aggregateTwoErrors(error, err2) : null;
        callback();
        callback = nop2;
      }
    );
    try {
      while (true) {
        const chunk = stream2.destroyed ? null : stream2.read();
        if (chunk !== null) {
          yield chunk;
        } else if (error) {
          throw error;
        } else if (error === null) {
          return;
        } else {
          await new Promise2(next);
        }
      }
    } catch (err2) {
      error = aggregateTwoErrors(error, err2);
      throw error;
    } finally {
      if ((error || (options === null || options === void 0 ? void 0 : options.destroyOnReturn) !== false) && (error === void 0 || stream2._readableState.autoDestroy)) {
        destroyImpl.destroyer(stream2, null);
      } else {
        stream2.off("readable", next);
        cleanup();
      }
    }
  }
  ObjectDefineProperties(Readable.prototype, {
    readable: {
      __proto__: null,
      get() {
        const r = this._readableState;
        return !!r && r.readable !== false && !r.destroyed && !r.errorEmitted && !r.endEmitted;
      },
      set(val) {
        if (this._readableState) {
          this._readableState.readable = !!val;
        }
      }
    },
    readableDidRead: {
      __proto__: null,
      enumerable: false,
      get: function() {
        return this._readableState.dataEmitted;
      }
    },
    readableAborted: {
      __proto__: null,
      enumerable: false,
      get: function() {
        return !!(this._readableState.readable !== false && (this._readableState.destroyed || this._readableState.errored) && !this._readableState.endEmitted);
      }
    },
    readableHighWaterMark: {
      __proto__: null,
      enumerable: false,
      get: function() {
        return this._readableState.highWaterMark;
      }
    },
    readableBuffer: {
      __proto__: null,
      enumerable: false,
      get: function() {
        return this._readableState && this._readableState.buffer;
      }
    },
    readableFlowing: {
      __proto__: null,
      enumerable: false,
      get: function() {
        return this._readableState.flowing;
      },
      set: function(state2) {
        if (this._readableState) {
          this._readableState.flowing = state2;
        }
      }
    },
    readableLength: {
      __proto__: null,
      enumerable: false,
      get() {
        return this._readableState.length;
      }
    },
    readableObjectMode: {
      __proto__: null,
      enumerable: false,
      get() {
        return this._readableState ? this._readableState.objectMode : false;
      }
    },
    readableEncoding: {
      __proto__: null,
      enumerable: false,
      get() {
        return this._readableState ? this._readableState.encoding : null;
      }
    },
    errored: {
      __proto__: null,
      enumerable: false,
      get() {
        return this._readableState ? this._readableState.errored : null;
      }
    },
    closed: {
      __proto__: null,
      get() {
        return this._readableState ? this._readableState.closed : false;
      }
    },
    destroyed: {
      __proto__: null,
      enumerable: false,
      get() {
        return this._readableState ? this._readableState.destroyed : false;
      },
      set(value) {
        if (!this._readableState) {
          return;
        }
        this._readableState.destroyed = value;
      }
    },
    readableEnded: {
      __proto__: null,
      enumerable: false,
      get() {
        return this._readableState ? this._readableState.endEmitted : false;
      }
    }
  });
  ObjectDefineProperties(ReadableState.prototype, {
    // Legacy getter for `pipesCount`.
    pipesCount: {
      __proto__: null,
      get() {
        return this.pipes.length;
      }
    },
    // Legacy property for `paused`.
    paused: {
      __proto__: null,
      get() {
        return this[kPaused] !== false;
      },
      set(value) {
        this[kPaused] = !!value;
      }
    }
  });
  Readable._fromList = fromList;
  function fromList(n, state2) {
    if (state2.length === 0) return null;
    let ret;
    if (state2.objectMode) ret = state2.buffer.shift();
    else if (!n || n >= state2.length) {
      if (state2.decoder) ret = state2.buffer.join("");
      else if (state2.buffer.length === 1) ret = state2.buffer.first();
      else ret = state2.buffer.concat(state2.length);
      state2.buffer.clear();
    } else {
      ret = state2.buffer.consume(n, state2.decoder);
    }
    return ret;
  }
  function endReadable(stream2) {
    const state2 = stream2._readableState;
    debug2("endReadable", state2.endEmitted);
    if (!state2.endEmitted) {
      state2.ended = true;
      process.nextTick(endReadableNT, state2, stream2);
    }
  }
  function endReadableNT(state2, stream2) {
    debug2("endReadableNT", state2.endEmitted, state2.length);
    if (!state2.errored && !state2.closeEmitted && !state2.endEmitted && state2.length === 0) {
      state2.endEmitted = true;
      stream2.emit("end");
      if (stream2.writable && stream2.allowHalfOpen === false) {
        process.nextTick(endWritableNT, stream2);
      } else if (state2.autoDestroy) {
        const wState = stream2._writableState;
        const autoDestroy = !wState || wState.autoDestroy && // We don't expect the writable to ever 'finish'
        // if writable is explicitly set to false.
        (wState.finished || wState.writable === false);
        if (autoDestroy) {
          stream2.destroy();
        }
      }
    }
  }
  function endWritableNT(stream2) {
    const writable2 = stream2.writable && !stream2.writableEnded && !stream2.destroyed;
    if (writable2) {
      stream2.end();
    }
  }
  Readable.from = function(iterable, opts) {
    return from(Readable, iterable, opts);
  };
  let webStreamsAdapters;
  function lazyWebStreams() {
    if (webStreamsAdapters === void 0) webStreamsAdapters = {};
    return webStreamsAdapters;
  }
  Readable.fromWeb = function(readableStream, options) {
    return lazyWebStreams().newStreamReadableFromReadableStream(readableStream, options);
  };
  Readable.toWeb = function(streamReadable, options) {
    return lazyWebStreams().newReadableStreamFromStreamReadable(streamReadable, options);
  };
  Readable.wrap = function(src, options) {
    var _ref, _src$readableObjectMo;
    return new Readable({
      objectMode: (_ref = (_src$readableObjectMo = src.readableObjectMode) !== null && _src$readableObjectMo !== void 0 ? _src$readableObjectMo : src.objectMode) !== null && _ref !== void 0 ? _ref : true,
      ...options,
      destroy(err2, callback) {
        destroyImpl.destroyer(src, err2);
        callback(err2);
      }
    }).wrap(src);
  };
  return readable;
}
var writable;
var hasRequiredWritable;
function requireWritable() {
  if (hasRequiredWritable) return writable;
  hasRequiredWritable = 1;
  const process = requireBrowser$1();
  const {
    ArrayPrototypeSlice,
    Error: Error2,
    FunctionPrototypeSymbolHasInstance,
    ObjectDefineProperty,
    ObjectDefineProperties,
    ObjectSetPrototypeOf,
    StringPrototypeToLowerCase,
    Symbol: Symbol2,
    SymbolHasInstance
  } = requirePrimordials();
  writable = Writable;
  Writable.WritableState = WritableState;
  const { EventEmitter: EE } = requireEvents();
  const Stream = requireLegacy().Stream;
  const { Buffer: Buffer2 } = requireBuffer();
  const destroyImpl = requireDestroy();
  const { addAbortSignal: addAbortSignal2 } = requireAddAbortSignal();
  const { getHighWaterMark, getDefaultHighWaterMark } = requireState();
  const {
    ERR_INVALID_ARG_TYPE,
    ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK,
    ERR_STREAM_CANNOT_PIPE,
    ERR_STREAM_DESTROYED,
    ERR_STREAM_ALREADY_FINISHED,
    ERR_STREAM_NULL_VALUES,
    ERR_STREAM_WRITE_AFTER_END,
    ERR_UNKNOWN_ENCODING
  } = requireErrors().codes;
  const { errorOrDestroy } = destroyImpl;
  ObjectSetPrototypeOf(Writable.prototype, Stream.prototype);
  ObjectSetPrototypeOf(Writable, Stream);
  function nop2() {
  }
  const kOnFinished = Symbol2("kOnFinished");
  function WritableState(options, stream2, isDuplex) {
    if (typeof isDuplex !== "boolean") isDuplex = stream2 instanceof requireDuplex();
    this.objectMode = !!(options && options.objectMode);
    if (isDuplex) this.objectMode = this.objectMode || !!(options && options.writableObjectMode);
    this.highWaterMark = options ? getHighWaterMark(this, options, "writableHighWaterMark", isDuplex) : getDefaultHighWaterMark(false);
    this.finalCalled = false;
    this.needDrain = false;
    this.ending = false;
    this.ended = false;
    this.finished = false;
    this.destroyed = false;
    const noDecode = !!(options && options.decodeStrings === false);
    this.decodeStrings = !noDecode;
    this.defaultEncoding = options && options.defaultEncoding || "utf8";
    this.length = 0;
    this.writing = false;
    this.corked = 0;
    this.sync = true;
    this.bufferProcessing = false;
    this.onwrite = onwrite.bind(void 0, stream2);
    this.writecb = null;
    this.writelen = 0;
    this.afterWriteTickInfo = null;
    resetBuffer(this);
    this.pendingcb = 0;
    this.constructed = true;
    this.prefinished = false;
    this.errorEmitted = false;
    this.emitClose = !options || options.emitClose !== false;
    this.autoDestroy = !options || options.autoDestroy !== false;
    this.errored = null;
    this.closed = false;
    this.closeEmitted = false;
    this[kOnFinished] = [];
  }
  function resetBuffer(state2) {
    state2.buffered = [];
    state2.bufferedIndex = 0;
    state2.allBuffers = true;
    state2.allNoop = true;
  }
  WritableState.prototype.getBuffer = function getBuffer() {
    return ArrayPrototypeSlice(this.buffered, this.bufferedIndex);
  };
  ObjectDefineProperty(WritableState.prototype, "bufferedRequestCount", {
    __proto__: null,
    get() {
      return this.buffered.length - this.bufferedIndex;
    }
  });
  function Writable(options) {
    const isDuplex = this instanceof requireDuplex();
    if (!isDuplex && !FunctionPrototypeSymbolHasInstance(Writable, this)) return new Writable(options);
    this._writableState = new WritableState(options, this, isDuplex);
    if (options) {
      if (typeof options.write === "function") this._write = options.write;
      if (typeof options.writev === "function") this._writev = options.writev;
      if (typeof options.destroy === "function") this._destroy = options.destroy;
      if (typeof options.final === "function") this._final = options.final;
      if (typeof options.construct === "function") this._construct = options.construct;
      if (options.signal) addAbortSignal2(options.signal, this);
    }
    Stream.call(this, options);
    destroyImpl.construct(this, () => {
      const state2 = this._writableState;
      if (!state2.writing) {
        clearBuffer(this, state2);
      }
      finishMaybe(this, state2);
    });
  }
  ObjectDefineProperty(Writable, SymbolHasInstance, {
    __proto__: null,
    value: function(object) {
      if (FunctionPrototypeSymbolHasInstance(this, object)) return true;
      if (this !== Writable) return false;
      return object && object._writableState instanceof WritableState;
    }
  });
  Writable.prototype.pipe = function() {
    errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
  };
  function _write(stream2, chunk, encoding, cb) {
    const state2 = stream2._writableState;
    if (typeof encoding === "function") {
      cb = encoding;
      encoding = state2.defaultEncoding;
    } else {
      if (!encoding) encoding = state2.defaultEncoding;
      else if (encoding !== "buffer" && !Buffer2.isEncoding(encoding)) throw new ERR_UNKNOWN_ENCODING(encoding);
      if (typeof cb !== "function") cb = nop2;
    }
    if (chunk === null) {
      throw new ERR_STREAM_NULL_VALUES();
    } else if (!state2.objectMode) {
      if (typeof chunk === "string") {
        if (state2.decodeStrings !== false) {
          chunk = Buffer2.from(chunk, encoding);
          encoding = "buffer";
        }
      } else if (chunk instanceof Buffer2) {
        encoding = "buffer";
      } else if (Stream._isUint8Array(chunk)) {
        chunk = Stream._uint8ArrayToBuffer(chunk);
        encoding = "buffer";
      } else {
        throw new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
      }
    }
    let err2;
    if (state2.ending) {
      err2 = new ERR_STREAM_WRITE_AFTER_END();
    } else if (state2.destroyed) {
      err2 = new ERR_STREAM_DESTROYED("write");
    }
    if (err2) {
      process.nextTick(cb, err2);
      errorOrDestroy(stream2, err2, true);
      return err2;
    }
    state2.pendingcb++;
    return writeOrBuffer(stream2, state2, chunk, encoding, cb);
  }
  Writable.prototype.write = function(chunk, encoding, cb) {
    return _write(this, chunk, encoding, cb) === true;
  };
  Writable.prototype.cork = function() {
    this._writableState.corked++;
  };
  Writable.prototype.uncork = function() {
    const state2 = this._writableState;
    if (state2.corked) {
      state2.corked--;
      if (!state2.writing) clearBuffer(this, state2);
    }
  };
  Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
    if (typeof encoding === "string") encoding = StringPrototypeToLowerCase(encoding);
    if (!Buffer2.isEncoding(encoding)) throw new ERR_UNKNOWN_ENCODING(encoding);
    this._writableState.defaultEncoding = encoding;
    return this;
  };
  function writeOrBuffer(stream2, state2, chunk, encoding, callback) {
    const len = state2.objectMode ? 1 : chunk.length;
    state2.length += len;
    const ret = state2.length < state2.highWaterMark;
    if (!ret) state2.needDrain = true;
    if (state2.writing || state2.corked || state2.errored || !state2.constructed) {
      state2.buffered.push({
        chunk,
        encoding,
        callback
      });
      if (state2.allBuffers && encoding !== "buffer") {
        state2.allBuffers = false;
      }
      if (state2.allNoop && callback !== nop2) {
        state2.allNoop = false;
      }
    } else {
      state2.writelen = len;
      state2.writecb = callback;
      state2.writing = true;
      state2.sync = true;
      stream2._write(chunk, encoding, state2.onwrite);
      state2.sync = false;
    }
    return ret && !state2.errored && !state2.destroyed;
  }
  function doWrite(stream2, state2, writev2, len, chunk, encoding, cb) {
    state2.writelen = len;
    state2.writecb = cb;
    state2.writing = true;
    state2.sync = true;
    if (state2.destroyed) state2.onwrite(new ERR_STREAM_DESTROYED("write"));
    else if (writev2) stream2._writev(chunk, state2.onwrite);
    else stream2._write(chunk, encoding, state2.onwrite);
    state2.sync = false;
  }
  function onwriteError(stream2, state2, er, cb) {
    --state2.pendingcb;
    cb(er);
    errorBuffer(state2);
    errorOrDestroy(stream2, er);
  }
  function onwrite(stream2, er) {
    const state2 = stream2._writableState;
    const sync = state2.sync;
    const cb = state2.writecb;
    if (typeof cb !== "function") {
      errorOrDestroy(stream2, new ERR_MULTIPLE_CALLBACK());
      return;
    }
    state2.writing = false;
    state2.writecb = null;
    state2.length -= state2.writelen;
    state2.writelen = 0;
    if (er) {
      er.stack;
      if (!state2.errored) {
        state2.errored = er;
      }
      if (stream2._readableState && !stream2._readableState.errored) {
        stream2._readableState.errored = er;
      }
      if (sync) {
        process.nextTick(onwriteError, stream2, state2, er, cb);
      } else {
        onwriteError(stream2, state2, er, cb);
      }
    } else {
      if (state2.buffered.length > state2.bufferedIndex) {
        clearBuffer(stream2, state2);
      }
      if (sync) {
        if (state2.afterWriteTickInfo !== null && state2.afterWriteTickInfo.cb === cb) {
          state2.afterWriteTickInfo.count++;
        } else {
          state2.afterWriteTickInfo = {
            count: 1,
            cb,
            stream: stream2,
            state: state2
          };
          process.nextTick(afterWriteTick, state2.afterWriteTickInfo);
        }
      } else {
        afterWrite(stream2, state2, 1, cb);
      }
    }
  }
  function afterWriteTick({ stream: stream2, state: state2, count, cb }) {
    state2.afterWriteTickInfo = null;
    return afterWrite(stream2, state2, count, cb);
  }
  function afterWrite(stream2, state2, count, cb) {
    const needDrain = !state2.ending && !stream2.destroyed && state2.length === 0 && state2.needDrain;
    if (needDrain) {
      state2.needDrain = false;
      stream2.emit("drain");
    }
    while (count-- > 0) {
      state2.pendingcb--;
      cb();
    }
    if (state2.destroyed) {
      errorBuffer(state2);
    }
    finishMaybe(stream2, state2);
  }
  function errorBuffer(state2) {
    if (state2.writing) {
      return;
    }
    for (let n = state2.bufferedIndex; n < state2.buffered.length; ++n) {
      var _state$errored;
      const { chunk, callback } = state2.buffered[n];
      const len = state2.objectMode ? 1 : chunk.length;
      state2.length -= len;
      callback(
        (_state$errored = state2.errored) !== null && _state$errored !== void 0 ? _state$errored : new ERR_STREAM_DESTROYED("write")
      );
    }
    const onfinishCallbacks = state2[kOnFinished].splice(0);
    for (let i = 0; i < onfinishCallbacks.length; i++) {
      var _state$errored2;
      onfinishCallbacks[i](
        (_state$errored2 = state2.errored) !== null && _state$errored2 !== void 0 ? _state$errored2 : new ERR_STREAM_DESTROYED("end")
      );
    }
    resetBuffer(state2);
  }
  function clearBuffer(stream2, state2) {
    if (state2.corked || state2.bufferProcessing || state2.destroyed || !state2.constructed) {
      return;
    }
    const { buffered, bufferedIndex, objectMode } = state2;
    const bufferedLength = buffered.length - bufferedIndex;
    if (!bufferedLength) {
      return;
    }
    let i = bufferedIndex;
    state2.bufferProcessing = true;
    if (bufferedLength > 1 && stream2._writev) {
      state2.pendingcb -= bufferedLength - 1;
      const callback = state2.allNoop ? nop2 : (err2) => {
        for (let n = i; n < buffered.length; ++n) {
          buffered[n].callback(err2);
        }
      };
      const chunks = state2.allNoop && i === 0 ? buffered : ArrayPrototypeSlice(buffered, i);
      chunks.allBuffers = state2.allBuffers;
      doWrite(stream2, state2, true, state2.length, chunks, "", callback);
      resetBuffer(state2);
    } else {
      do {
        const { chunk, encoding, callback } = buffered[i];
        buffered[i++] = null;
        const len = objectMode ? 1 : chunk.length;
        doWrite(stream2, state2, false, len, chunk, encoding, callback);
      } while (i < buffered.length && !state2.writing);
      if (i === buffered.length) {
        resetBuffer(state2);
      } else if (i > 256) {
        buffered.splice(0, i);
        state2.bufferedIndex = 0;
      } else {
        state2.bufferedIndex = i;
      }
    }
    state2.bufferProcessing = false;
  }
  Writable.prototype._write = function(chunk, encoding, cb) {
    if (this._writev) {
      this._writev(
        [
          {
            chunk,
            encoding
          }
        ],
        cb
      );
    } else {
      throw new ERR_METHOD_NOT_IMPLEMENTED("_write()");
    }
  };
  Writable.prototype._writev = null;
  Writable.prototype.end = function(chunk, encoding, cb) {
    const state2 = this._writableState;
    if (typeof chunk === "function") {
      cb = chunk;
      chunk = null;
      encoding = null;
    } else if (typeof encoding === "function") {
      cb = encoding;
      encoding = null;
    }
    let err2;
    if (chunk !== null && chunk !== void 0) {
      const ret = _write(this, chunk, encoding);
      if (ret instanceof Error2) {
        err2 = ret;
      }
    }
    if (state2.corked) {
      state2.corked = 1;
      this.uncork();
    }
    if (err2) ;
    else if (!state2.errored && !state2.ending) {
      state2.ending = true;
      finishMaybe(this, state2, true);
      state2.ended = true;
    } else if (state2.finished) {
      err2 = new ERR_STREAM_ALREADY_FINISHED("end");
    } else if (state2.destroyed) {
      err2 = new ERR_STREAM_DESTROYED("end");
    }
    if (typeof cb === "function") {
      if (err2 || state2.finished) {
        process.nextTick(cb, err2);
      } else {
        state2[kOnFinished].push(cb);
      }
    }
    return this;
  };
  function needFinish(state2) {
    return state2.ending && !state2.destroyed && state2.constructed && state2.length === 0 && !state2.errored && state2.buffered.length === 0 && !state2.finished && !state2.writing && !state2.errorEmitted && !state2.closeEmitted;
  }
  function callFinal(stream2, state2) {
    let called = false;
    function onFinish(err2) {
      if (called) {
        errorOrDestroy(stream2, err2 !== null && err2 !== void 0 ? err2 : ERR_MULTIPLE_CALLBACK());
        return;
      }
      called = true;
      state2.pendingcb--;
      if (err2) {
        const onfinishCallbacks = state2[kOnFinished].splice(0);
        for (let i = 0; i < onfinishCallbacks.length; i++) {
          onfinishCallbacks[i](err2);
        }
        errorOrDestroy(stream2, err2, state2.sync);
      } else if (needFinish(state2)) {
        state2.prefinished = true;
        stream2.emit("prefinish");
        state2.pendingcb++;
        process.nextTick(finish, stream2, state2);
      }
    }
    state2.sync = true;
    state2.pendingcb++;
    try {
      stream2._final(onFinish);
    } catch (err2) {
      onFinish(err2);
    }
    state2.sync = false;
  }
  function prefinish(stream2, state2) {
    if (!state2.prefinished && !state2.finalCalled) {
      if (typeof stream2._final === "function" && !state2.destroyed) {
        state2.finalCalled = true;
        callFinal(stream2, state2);
      } else {
        state2.prefinished = true;
        stream2.emit("prefinish");
      }
    }
  }
  function finishMaybe(stream2, state2, sync) {
    if (needFinish(state2)) {
      prefinish(stream2, state2);
      if (state2.pendingcb === 0) {
        if (sync) {
          state2.pendingcb++;
          process.nextTick(
            (stream3, state3) => {
              if (needFinish(state3)) {
                finish(stream3, state3);
              } else {
                state3.pendingcb--;
              }
            },
            stream2,
            state2
          );
        } else if (needFinish(state2)) {
          state2.pendingcb++;
          finish(stream2, state2);
        }
      }
    }
  }
  function finish(stream2, state2) {
    state2.pendingcb--;
    state2.finished = true;
    const onfinishCallbacks = state2[kOnFinished].splice(0);
    for (let i = 0; i < onfinishCallbacks.length; i++) {
      onfinishCallbacks[i]();
    }
    stream2.emit("finish");
    if (state2.autoDestroy) {
      const rState = stream2._readableState;
      const autoDestroy = !rState || rState.autoDestroy && // We don't expect the readable to ever 'end'
      // if readable is explicitly set to false.
      (rState.endEmitted || rState.readable === false);
      if (autoDestroy) {
        stream2.destroy();
      }
    }
  }
  ObjectDefineProperties(Writable.prototype, {
    closed: {
      __proto__: null,
      get() {
        return this._writableState ? this._writableState.closed : false;
      }
    },
    destroyed: {
      __proto__: null,
      get() {
        return this._writableState ? this._writableState.destroyed : false;
      },
      set(value) {
        if (this._writableState) {
          this._writableState.destroyed = value;
        }
      }
    },
    writable: {
      __proto__: null,
      get() {
        const w = this._writableState;
        return !!w && w.writable !== false && !w.destroyed && !w.errored && !w.ending && !w.ended;
      },
      set(val) {
        if (this._writableState) {
          this._writableState.writable = !!val;
        }
      }
    },
    writableFinished: {
      __proto__: null,
      get() {
        return this._writableState ? this._writableState.finished : false;
      }
    },
    writableObjectMode: {
      __proto__: null,
      get() {
        return this._writableState ? this._writableState.objectMode : false;
      }
    },
    writableBuffer: {
      __proto__: null,
      get() {
        return this._writableState && this._writableState.getBuffer();
      }
    },
    writableEnded: {
      __proto__: null,
      get() {
        return this._writableState ? this._writableState.ending : false;
      }
    },
    writableNeedDrain: {
      __proto__: null,
      get() {
        const wState = this._writableState;
        if (!wState) return false;
        return !wState.destroyed && !wState.ending && wState.needDrain;
      }
    },
    writableHighWaterMark: {
      __proto__: null,
      get() {
        return this._writableState && this._writableState.highWaterMark;
      }
    },
    writableCorked: {
      __proto__: null,
      get() {
        return this._writableState ? this._writableState.corked : 0;
      }
    },
    writableLength: {
      __proto__: null,
      get() {
        return this._writableState && this._writableState.length;
      }
    },
    errored: {
      __proto__: null,
      enumerable: false,
      get() {
        return this._writableState ? this._writableState.errored : null;
      }
    },
    writableAborted: {
      __proto__: null,
      enumerable: false,
      get: function() {
        return !!(this._writableState.writable !== false && (this._writableState.destroyed || this._writableState.errored) && !this._writableState.finished);
      }
    }
  });
  const destroy = destroyImpl.destroy;
  Writable.prototype.destroy = function(err2, cb) {
    const state2 = this._writableState;
    if (!state2.destroyed && (state2.bufferedIndex < state2.buffered.length || state2[kOnFinished].length)) {
      process.nextTick(errorBuffer, state2);
    }
    destroy.call(this, err2, cb);
    return this;
  };
  Writable.prototype._undestroy = destroyImpl.undestroy;
  Writable.prototype._destroy = function(err2, cb) {
    cb(err2);
  };
  Writable.prototype[EE.captureRejectionSymbol] = function(err2) {
    this.destroy(err2);
  };
  let webStreamsAdapters;
  function lazyWebStreams() {
    if (webStreamsAdapters === void 0) webStreamsAdapters = {};
    return webStreamsAdapters;
  }
  Writable.fromWeb = function(writableStream, options) {
    return lazyWebStreams().newStreamWritableFromWritableStream(writableStream, options);
  };
  Writable.toWeb = function(streamWritable) {
    return lazyWebStreams().newWritableStreamFromStreamWritable(streamWritable);
  };
  return writable;
}
var duplexify;
var hasRequiredDuplexify;
function requireDuplexify() {
  if (hasRequiredDuplexify) return duplexify;
  hasRequiredDuplexify = 1;
  const process = requireBrowser$1();
  const bufferModule = requireBuffer();
  const {
    isReadable: isReadable2,
    isWritable,
    isIterable,
    isNodeStream,
    isReadableNodeStream,
    isWritableNodeStream,
    isDuplexNodeStream,
    isReadableStream,
    isWritableStream
  } = requireUtils();
  const eos = requireEndOfStream();
  const {
    AbortError,
    codes: { ERR_INVALID_ARG_TYPE, ERR_INVALID_RETURN_VALUE }
  } = requireErrors();
  const { destroyer } = requireDestroy();
  const Duplex = requireDuplex();
  const Readable = requireReadable();
  const Writable = requireWritable();
  const { createDeferredPromise } = requireUtil();
  const from = requireFrom();
  const Blob2 = globalThis.Blob || bufferModule.Blob;
  const isBlob = typeof Blob2 !== "undefined" ? function isBlob2(b) {
    return b instanceof Blob2;
  } : function isBlob2(b) {
    return false;
  };
  const AbortController = globalThis.AbortController || requireBrowser$2().AbortController;
  const { FunctionPrototypeCall } = requirePrimordials();
  class Duplexify extends Duplex {
    constructor(options) {
      super(options);
      if ((options === null || options === void 0 ? void 0 : options.readable) === false) {
        this._readableState.readable = false;
        this._readableState.ended = true;
        this._readableState.endEmitted = true;
      }
      if ((options === null || options === void 0 ? void 0 : options.writable) === false) {
        this._writableState.writable = false;
        this._writableState.ending = true;
        this._writableState.ended = true;
        this._writableState.finished = true;
      }
    }
  }
  duplexify = function duplexify2(body, name) {
    if (isDuplexNodeStream(body)) {
      return body;
    }
    if (isReadableNodeStream(body)) {
      return _duplexify({
        readable: body
      });
    }
    if (isWritableNodeStream(body)) {
      return _duplexify({
        writable: body
      });
    }
    if (isNodeStream(body)) {
      return _duplexify({
        writable: false,
        readable: false
      });
    }
    if (isReadableStream(body)) {
      return _duplexify({
        readable: Readable.fromWeb(body)
      });
    }
    if (isWritableStream(body)) {
      return _duplexify({
        writable: Writable.fromWeb(body)
      });
    }
    if (typeof body === "function") {
      const { value, write: write2, final, destroy } = fromAsyncGen(body);
      if (isIterable(value)) {
        return from(Duplexify, value, {
          // TODO (ronag): highWaterMark?
          objectMode: true,
          write: write2,
          final,
          destroy
        });
      }
      const then2 = value === null || value === void 0 ? void 0 : value.then;
      if (typeof then2 === "function") {
        let d;
        const promise = FunctionPrototypeCall(
          then2,
          value,
          (val) => {
            if (val != null) {
              throw new ERR_INVALID_RETURN_VALUE("nully", "body", val);
            }
          },
          (err2) => {
            destroyer(d, err2);
          }
        );
        return d = new Duplexify({
          // TODO (ronag): highWaterMark?
          objectMode: true,
          readable: false,
          write: write2,
          final(cb) {
            final(async () => {
              try {
                await promise;
                process.nextTick(cb, null);
              } catch (err2) {
                process.nextTick(cb, err2);
              }
            });
          },
          destroy
        });
      }
      throw new ERR_INVALID_RETURN_VALUE("Iterable, AsyncIterable or AsyncFunction", name, value);
    }
    if (isBlob(body)) {
      return duplexify2(body.arrayBuffer());
    }
    if (isIterable(body)) {
      return from(Duplexify, body, {
        // TODO (ronag): highWaterMark?
        objectMode: true,
        writable: false
      });
    }
    if (isReadableStream(body === null || body === void 0 ? void 0 : body.readable) && isWritableStream(body === null || body === void 0 ? void 0 : body.writable)) {
      return Duplexify.fromWeb(body);
    }
    if (typeof (body === null || body === void 0 ? void 0 : body.writable) === "object" || typeof (body === null || body === void 0 ? void 0 : body.readable) === "object") {
      const readable2 = body !== null && body !== void 0 && body.readable ? isReadableNodeStream(body === null || body === void 0 ? void 0 : body.readable) ? body === null || body === void 0 ? void 0 : body.readable : duplexify2(body.readable) : void 0;
      const writable2 = body !== null && body !== void 0 && body.writable ? isWritableNodeStream(body === null || body === void 0 ? void 0 : body.writable) ? body === null || body === void 0 ? void 0 : body.writable : duplexify2(body.writable) : void 0;
      return _duplexify({
        readable: readable2,
        writable: writable2
      });
    }
    const then = body === null || body === void 0 ? void 0 : body.then;
    if (typeof then === "function") {
      let d;
      FunctionPrototypeCall(
        then,
        body,
        (val) => {
          if (val != null) {
            d.push(val);
          }
          d.push(null);
        },
        (err2) => {
          destroyer(d, err2);
        }
      );
      return d = new Duplexify({
        objectMode: true,
        writable: false,
        read() {
        }
      });
    }
    throw new ERR_INVALID_ARG_TYPE(
      name,
      [
        "Blob",
        "ReadableStream",
        "WritableStream",
        "Stream",
        "Iterable",
        "AsyncIterable",
        "Function",
        "{ readable, writable } pair",
        "Promise"
      ],
      body
    );
  };
  function fromAsyncGen(fn) {
    let { promise, resolve: resolve2 } = createDeferredPromise();
    const ac = new AbortController();
    const signal = ac.signal;
    const value = fn(
      (async function* () {
        while (true) {
          const _promise = promise;
          promise = null;
          const { chunk, done, cb } = await _promise;
          process.nextTick(cb);
          if (done) return;
          if (signal.aborted)
            throw new AbortError(void 0, {
              cause: signal.reason
            });
          ({ promise, resolve: resolve2 } = createDeferredPromise());
          yield chunk;
        }
      })(),
      {
        signal
      }
    );
    return {
      value,
      write(chunk, encoding, cb) {
        const _resolve2 = resolve2;
        resolve2 = null;
        _resolve2({
          chunk,
          done: false,
          cb
        });
      },
      final(cb) {
        const _resolve2 = resolve2;
        resolve2 = null;
        _resolve2({
          done: true,
          cb
        });
      },
      destroy(err2, cb) {
        ac.abort();
        cb(err2);
      }
    };
  }
  function _duplexify(pair) {
    const r = pair.readable && typeof pair.readable.read !== "function" ? Readable.wrap(pair.readable) : pair.readable;
    const w = pair.writable;
    let readable2 = !!isReadable2(r);
    let writable2 = !!isWritable(w);
    let ondrain;
    let onfinish;
    let onreadable;
    let onclose;
    let d;
    function onfinished(err2) {
      const cb = onclose;
      onclose = null;
      if (cb) {
        cb(err2);
      } else if (err2) {
        d.destroy(err2);
      }
    }
    d = new Duplexify({
      // TODO (ronag): highWaterMark?
      readableObjectMode: !!(r !== null && r !== void 0 && r.readableObjectMode),
      writableObjectMode: !!(w !== null && w !== void 0 && w.writableObjectMode),
      readable: readable2,
      writable: writable2
    });
    if (writable2) {
      eos(w, (err2) => {
        writable2 = false;
        if (err2) {
          destroyer(r, err2);
        }
        onfinished(err2);
      });
      d._write = function(chunk, encoding, callback) {
        if (w.write(chunk, encoding)) {
          callback();
        } else {
          ondrain = callback;
        }
      };
      d._final = function(callback) {
        w.end();
        onfinish = callback;
      };
      w.on("drain", function() {
        if (ondrain) {
          const cb = ondrain;
          ondrain = null;
          cb();
        }
      });
      w.on("finish", function() {
        if (onfinish) {
          const cb = onfinish;
          onfinish = null;
          cb();
        }
      });
    }
    if (readable2) {
      eos(r, (err2) => {
        readable2 = false;
        if (err2) {
          destroyer(r, err2);
        }
        onfinished(err2);
      });
      r.on("readable", function() {
        if (onreadable) {
          const cb = onreadable;
          onreadable = null;
          cb();
        }
      });
      r.on("end", function() {
        d.push(null);
      });
      d._read = function() {
        while (true) {
          const buf = r.read();
          if (buf === null) {
            onreadable = d._read;
            return;
          }
          if (!d.push(buf)) {
            return;
          }
        }
      };
    }
    d._destroy = function(err2, callback) {
      if (!err2 && onclose !== null) {
        err2 = new AbortError();
      }
      onreadable = null;
      ondrain = null;
      onfinish = null;
      if (onclose === null) {
        callback(err2);
      } else {
        onclose = callback;
        destroyer(w, err2);
        destroyer(r, err2);
      }
    };
    return d;
  }
  return duplexify;
}
var duplex;
var hasRequiredDuplex;
function requireDuplex() {
  if (hasRequiredDuplex) return duplex;
  hasRequiredDuplex = 1;
  const {
    ObjectDefineProperties,
    ObjectGetOwnPropertyDescriptor,
    ObjectKeys,
    ObjectSetPrototypeOf
  } = requirePrimordials();
  duplex = Duplex;
  const Readable = requireReadable();
  const Writable = requireWritable();
  ObjectSetPrototypeOf(Duplex.prototype, Readable.prototype);
  ObjectSetPrototypeOf(Duplex, Readable);
  {
    const keys = ObjectKeys(Writable.prototype);
    for (let i = 0; i < keys.length; i++) {
      const method = keys[i];
      if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
    }
  }
  function Duplex(options) {
    if (!(this instanceof Duplex)) return new Duplex(options);
    Readable.call(this, options);
    Writable.call(this, options);
    if (options) {
      this.allowHalfOpen = options.allowHalfOpen !== false;
      if (options.readable === false) {
        this._readableState.readable = false;
        this._readableState.ended = true;
        this._readableState.endEmitted = true;
      }
      if (options.writable === false) {
        this._writableState.writable = false;
        this._writableState.ending = true;
        this._writableState.ended = true;
        this._writableState.finished = true;
      }
    } else {
      this.allowHalfOpen = true;
    }
  }
  ObjectDefineProperties(Duplex.prototype, {
    writable: {
      __proto__: null,
      ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writable")
    },
    writableHighWaterMark: {
      __proto__: null,
      ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableHighWaterMark")
    },
    writableObjectMode: {
      __proto__: null,
      ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableObjectMode")
    },
    writableBuffer: {
      __proto__: null,
      ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableBuffer")
    },
    writableLength: {
      __proto__: null,
      ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableLength")
    },
    writableFinished: {
      __proto__: null,
      ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableFinished")
    },
    writableCorked: {
      __proto__: null,
      ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableCorked")
    },
    writableEnded: {
      __proto__: null,
      ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableEnded")
    },
    writableNeedDrain: {
      __proto__: null,
      ...ObjectGetOwnPropertyDescriptor(Writable.prototype, "writableNeedDrain")
    },
    destroyed: {
      __proto__: null,
      get() {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return false;
        }
        return this._readableState.destroyed && this._writableState.destroyed;
      },
      set(value) {
        if (this._readableState && this._writableState) {
          this._readableState.destroyed = value;
          this._writableState.destroyed = value;
        }
      }
    }
  });
  let webStreamsAdapters;
  function lazyWebStreams() {
    if (webStreamsAdapters === void 0) webStreamsAdapters = {};
    return webStreamsAdapters;
  }
  Duplex.fromWeb = function(pair, options) {
    return lazyWebStreams().newStreamDuplexFromReadableWritablePair(pair, options);
  };
  Duplex.toWeb = function(duplex2) {
    return lazyWebStreams().newReadableWritablePairFromDuplex(duplex2);
  };
  let duplexify2;
  Duplex.from = function(body) {
    if (!duplexify2) {
      duplexify2 = requireDuplexify();
    }
    return duplexify2(body, "body");
  };
  return duplex;
}
var transform;
var hasRequiredTransform;
function requireTransform() {
  if (hasRequiredTransform) return transform;
  hasRequiredTransform = 1;
  const { ObjectSetPrototypeOf, Symbol: Symbol2 } = requirePrimordials();
  transform = Transform;
  const { ERR_METHOD_NOT_IMPLEMENTED } = requireErrors().codes;
  const Duplex = requireDuplex();
  const { getHighWaterMark } = requireState();
  ObjectSetPrototypeOf(Transform.prototype, Duplex.prototype);
  ObjectSetPrototypeOf(Transform, Duplex);
  const kCallback = Symbol2("kCallback");
  function Transform(options) {
    if (!(this instanceof Transform)) return new Transform(options);
    const readableHighWaterMark = options ? getHighWaterMark(this, options, "readableHighWaterMark", true) : null;
    if (readableHighWaterMark === 0) {
      options = {
        ...options,
        highWaterMark: null,
        readableHighWaterMark,
        // TODO (ronag): 0 is not optimal since we have
        // a "bug" where we check needDrain before calling _write and not after.
        // Refs: https://github.com/nodejs/node/pull/32887
        // Refs: https://github.com/nodejs/node/pull/35941
        writableHighWaterMark: options.writableHighWaterMark || 0
      };
    }
    Duplex.call(this, options);
    this._readableState.sync = false;
    this[kCallback] = null;
    if (options) {
      if (typeof options.transform === "function") this._transform = options.transform;
      if (typeof options.flush === "function") this._flush = options.flush;
    }
    this.on("prefinish", prefinish);
  }
  function final(cb) {
    if (typeof this._flush === "function" && !this.destroyed) {
      this._flush((er, data) => {
        if (er) {
          if (cb) {
            cb(er);
          } else {
            this.destroy(er);
          }
          return;
        }
        if (data != null) {
          this.push(data);
        }
        this.push(null);
        if (cb) {
          cb();
        }
      });
    } else {
      this.push(null);
      if (cb) {
        cb();
      }
    }
  }
  function prefinish() {
    if (this._final !== final) {
      final.call(this);
    }
  }
  Transform.prototype._final = final;
  Transform.prototype._transform = function(chunk, encoding, callback) {
    throw new ERR_METHOD_NOT_IMPLEMENTED("_transform()");
  };
  Transform.prototype._write = function(chunk, encoding, callback) {
    const rState = this._readableState;
    const wState = this._writableState;
    const length = rState.length;
    this._transform(chunk, encoding, (err2, val) => {
      if (err2) {
        callback(err2);
        return;
      }
      if (val != null) {
        this.push(val);
      }
      if (wState.ended || // Backwards compat.
      length === rState.length || // Backwards compat.
      rState.length < rState.highWaterMark) {
        callback();
      } else {
        this[kCallback] = callback;
      }
    });
  };
  Transform.prototype._read = function() {
    if (this[kCallback]) {
      const callback = this[kCallback];
      this[kCallback] = null;
      callback();
    }
  };
  return transform;
}
var passthrough;
var hasRequiredPassthrough;
function requirePassthrough() {
  if (hasRequiredPassthrough) return passthrough;
  hasRequiredPassthrough = 1;
  const { ObjectSetPrototypeOf } = requirePrimordials();
  passthrough = PassThrough;
  const Transform = requireTransform();
  ObjectSetPrototypeOf(PassThrough.prototype, Transform.prototype);
  ObjectSetPrototypeOf(PassThrough, Transform);
  function PassThrough(options) {
    if (!(this instanceof PassThrough)) return new PassThrough(options);
    Transform.call(this, options);
  }
  PassThrough.prototype._transform = function(chunk, encoding, cb) {
    cb(null, chunk);
  };
  return passthrough;
}
var pipeline_1;
var hasRequiredPipeline;
function requirePipeline() {
  if (hasRequiredPipeline) return pipeline_1;
  hasRequiredPipeline = 1;
  const process = requireBrowser$1();
  const { ArrayIsArray, Promise: Promise2, SymbolAsyncIterator, SymbolDispose } = requirePrimordials();
  const eos = requireEndOfStream();
  const { once } = requireUtil();
  const destroyImpl = requireDestroy();
  const Duplex = requireDuplex();
  const {
    aggregateTwoErrors,
    codes: {
      ERR_INVALID_ARG_TYPE,
      ERR_INVALID_RETURN_VALUE,
      ERR_MISSING_ARGS,
      ERR_STREAM_DESTROYED,
      ERR_STREAM_PREMATURE_CLOSE
    },
    AbortError
  } = requireErrors();
  const { validateFunction, validateAbortSignal } = requireValidators();
  const {
    isIterable,
    isReadable: isReadable2,
    isReadableNodeStream,
    isNodeStream,
    isTransformStream,
    isWebStream,
    isReadableStream,
    isReadableFinished
  } = requireUtils();
  const AbortController = globalThis.AbortController || requireBrowser$2().AbortController;
  let PassThrough;
  let Readable;
  let addAbortListener;
  function destroyer(stream2, reading, writing) {
    let finished = false;
    stream2.on("close", () => {
      finished = true;
    });
    const cleanup = eos(
      stream2,
      {
        readable: reading,
        writable: writing
      },
      (err2) => {
        finished = !err2;
      }
    );
    return {
      destroy: (err2) => {
        if (finished) return;
        finished = true;
        destroyImpl.destroyer(stream2, err2 || new ERR_STREAM_DESTROYED("pipe"));
      },
      cleanup
    };
  }
  function popCallback(streams) {
    validateFunction(streams[streams.length - 1], "streams[stream.length - 1]");
    return streams.pop();
  }
  function makeAsyncIterable(val) {
    if (isIterable(val)) {
      return val;
    } else if (isReadableNodeStream(val)) {
      return fromReadable(val);
    }
    throw new ERR_INVALID_ARG_TYPE("val", ["Readable", "Iterable", "AsyncIterable"], val);
  }
  async function* fromReadable(val) {
    if (!Readable) {
      Readable = requireReadable();
    }
    yield* Readable.prototype[SymbolAsyncIterator].call(val);
  }
  async function pumpToNode(iterable, writable2, finish, { end }) {
    let error;
    let onresolve = null;
    const resume = (err2) => {
      if (err2) {
        error = err2;
      }
      if (onresolve) {
        const callback = onresolve;
        onresolve = null;
        callback();
      }
    };
    const wait = () => new Promise2((resolve2, reject) => {
      if (error) {
        reject(error);
      } else {
        onresolve = () => {
          if (error) {
            reject(error);
          } else {
            resolve2();
          }
        };
      }
    });
    writable2.on("drain", resume);
    const cleanup = eos(
      writable2,
      {
        readable: false
      },
      resume
    );
    try {
      if (writable2.writableNeedDrain) {
        await wait();
      }
      for await (const chunk of iterable) {
        if (!writable2.write(chunk)) {
          await wait();
        }
      }
      if (end) {
        writable2.end();
        await wait();
      }
      finish();
    } catch (err2) {
      finish(error !== err2 ? aggregateTwoErrors(error, err2) : err2);
    } finally {
      cleanup();
      writable2.off("drain", resume);
    }
  }
  async function pumpToWeb(readable2, writable2, finish, { end }) {
    if (isTransformStream(writable2)) {
      writable2 = writable2.writable;
    }
    const writer = writable2.getWriter();
    try {
      for await (const chunk of readable2) {
        await writer.ready;
        writer.write(chunk).catch(() => {
        });
      }
      await writer.ready;
      if (end) {
        await writer.close();
      }
      finish();
    } catch (err2) {
      try {
        await writer.abort(err2);
        finish(err2);
      } catch (err3) {
        finish(err3);
      }
    }
  }
  function pipeline(...streams) {
    return pipelineImpl(streams, once(popCallback(streams)));
  }
  function pipelineImpl(streams, callback, opts) {
    if (streams.length === 1 && ArrayIsArray(streams[0])) {
      streams = streams[0];
    }
    if (streams.length < 2) {
      throw new ERR_MISSING_ARGS("streams");
    }
    const ac = new AbortController();
    const signal = ac.signal;
    const outerSignal = opts === null || opts === void 0 ? void 0 : opts.signal;
    const lastStreamCleanup = [];
    validateAbortSignal(outerSignal, "options.signal");
    function abort2() {
      finishImpl(new AbortError());
    }
    addAbortListener = addAbortListener || requireUtil().addAbortListener;
    let disposable;
    if (outerSignal) {
      disposable = addAbortListener(outerSignal, abort2);
    }
    let error;
    let value;
    const destroys = [];
    let finishCount = 0;
    function finish(err2) {
      finishImpl(err2, --finishCount === 0);
    }
    function finishImpl(err2, final) {
      var _disposable;
      if (err2 && (!error || error.code === "ERR_STREAM_PREMATURE_CLOSE")) {
        error = err2;
      }
      if (!error && !final) {
        return;
      }
      while (destroys.length) {
        destroys.shift()(error);
      }
      (_disposable = disposable) === null || _disposable === void 0 ? void 0 : _disposable[SymbolDispose]();
      ac.abort();
      if (final) {
        if (!error) {
          lastStreamCleanup.forEach((fn) => fn());
        }
        process.nextTick(callback, error, value);
      }
    }
    let ret;
    for (let i = 0; i < streams.length; i++) {
      const stream2 = streams[i];
      const reading = i < streams.length - 1;
      const writing = i > 0;
      const end = reading || (opts === null || opts === void 0 ? void 0 : opts.end) !== false;
      const isLastStream = i === streams.length - 1;
      if (isNodeStream(stream2)) {
        let onError = function(err2) {
          if (err2 && err2.name !== "AbortError" && err2.code !== "ERR_STREAM_PREMATURE_CLOSE") {
            finish(err2);
          }
        };
        if (end) {
          const { destroy, cleanup } = destroyer(stream2, reading, writing);
          destroys.push(destroy);
          if (isReadable2(stream2) && isLastStream) {
            lastStreamCleanup.push(cleanup);
          }
        }
        stream2.on("error", onError);
        if (isReadable2(stream2) && isLastStream) {
          lastStreamCleanup.push(() => {
            stream2.removeListener("error", onError);
          });
        }
      }
      if (i === 0) {
        if (typeof stream2 === "function") {
          ret = stream2({
            signal
          });
          if (!isIterable(ret)) {
            throw new ERR_INVALID_RETURN_VALUE("Iterable, AsyncIterable or Stream", "source", ret);
          }
        } else if (isIterable(stream2) || isReadableNodeStream(stream2) || isTransformStream(stream2)) {
          ret = stream2;
        } else {
          ret = Duplex.from(stream2);
        }
      } else if (typeof stream2 === "function") {
        if (isTransformStream(ret)) {
          var _ret;
          ret = makeAsyncIterable((_ret = ret) === null || _ret === void 0 ? void 0 : _ret.readable);
        } else {
          ret = makeAsyncIterable(ret);
        }
        ret = stream2(ret, {
          signal
        });
        if (reading) {
          if (!isIterable(ret, true)) {
            throw new ERR_INVALID_RETURN_VALUE("AsyncIterable", `transform[${i - 1}]`, ret);
          }
        } else {
          var _ret2;
          if (!PassThrough) {
            PassThrough = requirePassthrough();
          }
          const pt = new PassThrough({
            objectMode: true
          });
          const then = (_ret2 = ret) === null || _ret2 === void 0 ? void 0 : _ret2.then;
          if (typeof then === "function") {
            finishCount++;
            then.call(
              ret,
              (val) => {
                value = val;
                if (val != null) {
                  pt.write(val);
                }
                if (end) {
                  pt.end();
                }
                process.nextTick(finish);
              },
              (err2) => {
                pt.destroy(err2);
                process.nextTick(finish, err2);
              }
            );
          } else if (isIterable(ret, true)) {
            finishCount++;
            pumpToNode(ret, pt, finish, {
              end
            });
          } else if (isReadableStream(ret) || isTransformStream(ret)) {
            const toRead = ret.readable || ret;
            finishCount++;
            pumpToNode(toRead, pt, finish, {
              end
            });
          } else {
            throw new ERR_INVALID_RETURN_VALUE("AsyncIterable or Promise", "destination", ret);
          }
          ret = pt;
          const { destroy, cleanup } = destroyer(ret, false, true);
          destroys.push(destroy);
          if (isLastStream) {
            lastStreamCleanup.push(cleanup);
          }
        }
      } else if (isNodeStream(stream2)) {
        if (isReadableNodeStream(ret)) {
          finishCount += 2;
          const cleanup = pipe(ret, stream2, finish, {
            end
          });
          if (isReadable2(stream2) && isLastStream) {
            lastStreamCleanup.push(cleanup);
          }
        } else if (isTransformStream(ret) || isReadableStream(ret)) {
          const toRead = ret.readable || ret;
          finishCount++;
          pumpToNode(toRead, stream2, finish, {
            end
          });
        } else if (isIterable(ret)) {
          finishCount++;
          pumpToNode(ret, stream2, finish, {
            end
          });
        } else {
          throw new ERR_INVALID_ARG_TYPE(
            "val",
            ["Readable", "Iterable", "AsyncIterable", "ReadableStream", "TransformStream"],
            ret
          );
        }
        ret = stream2;
      } else if (isWebStream(stream2)) {
        if (isReadableNodeStream(ret)) {
          finishCount++;
          pumpToWeb(makeAsyncIterable(ret), stream2, finish, {
            end
          });
        } else if (isReadableStream(ret) || isIterable(ret)) {
          finishCount++;
          pumpToWeb(ret, stream2, finish, {
            end
          });
        } else if (isTransformStream(ret)) {
          finishCount++;
          pumpToWeb(ret.readable, stream2, finish, {
            end
          });
        } else {
          throw new ERR_INVALID_ARG_TYPE(
            "val",
            ["Readable", "Iterable", "AsyncIterable", "ReadableStream", "TransformStream"],
            ret
          );
        }
        ret = stream2;
      } else {
        ret = Duplex.from(stream2);
      }
    }
    if (signal !== null && signal !== void 0 && signal.aborted || outerSignal !== null && outerSignal !== void 0 && outerSignal.aborted) {
      process.nextTick(abort2);
    }
    return ret;
  }
  function pipe(src, dst, finish, { end }) {
    let ended = false;
    dst.on("close", () => {
      if (!ended) {
        finish(new ERR_STREAM_PREMATURE_CLOSE());
      }
    });
    src.pipe(dst, {
      end: false
    });
    if (end) {
      let endFn = function() {
        ended = true;
        dst.end();
      };
      if (isReadableFinished(src)) {
        process.nextTick(endFn);
      } else {
        src.once("end", endFn);
      }
    } else {
      finish();
    }
    eos(
      src,
      {
        readable: true,
        writable: false
      },
      (err2) => {
        const rState = src._readableState;
        if (err2 && err2.code === "ERR_STREAM_PREMATURE_CLOSE" && rState && rState.ended && !rState.errored && !rState.errorEmitted) {
          src.once("end", finish).once("error", finish);
        } else {
          finish(err2);
        }
      }
    );
    return eos(
      dst,
      {
        readable: false,
        writable: true
      },
      finish
    );
  }
  pipeline_1 = {
    pipelineImpl,
    pipeline
  };
  return pipeline_1;
}
var compose;
var hasRequiredCompose;
function requireCompose() {
  if (hasRequiredCompose) return compose;
  hasRequiredCompose = 1;
  const { pipeline } = requirePipeline();
  const Duplex = requireDuplex();
  const { destroyer } = requireDestroy();
  const {
    isNodeStream,
    isReadable: isReadable2,
    isWritable,
    isWebStream,
    isTransformStream,
    isWritableStream,
    isReadableStream
  } = requireUtils();
  const {
    AbortError,
    codes: { ERR_INVALID_ARG_VALUE, ERR_MISSING_ARGS }
  } = requireErrors();
  const eos = requireEndOfStream();
  compose = function compose2(...streams) {
    if (streams.length === 0) {
      throw new ERR_MISSING_ARGS("streams");
    }
    if (streams.length === 1) {
      return Duplex.from(streams[0]);
    }
    const orgStreams = [...streams];
    if (typeof streams[0] === "function") {
      streams[0] = Duplex.from(streams[0]);
    }
    if (typeof streams[streams.length - 1] === "function") {
      const idx = streams.length - 1;
      streams[idx] = Duplex.from(streams[idx]);
    }
    for (let n = 0; n < streams.length; ++n) {
      if (!isNodeStream(streams[n]) && !isWebStream(streams[n])) {
        continue;
      }
      if (n < streams.length - 1 && !(isReadable2(streams[n]) || isReadableStream(streams[n]) || isTransformStream(streams[n]))) {
        throw new ERR_INVALID_ARG_VALUE(`streams[${n}]`, orgStreams[n], "must be readable");
      }
      if (n > 0 && !(isWritable(streams[n]) || isWritableStream(streams[n]) || isTransformStream(streams[n]))) {
        throw new ERR_INVALID_ARG_VALUE(`streams[${n}]`, orgStreams[n], "must be writable");
      }
    }
    let ondrain;
    let onfinish;
    let onreadable;
    let onclose;
    let d;
    function onfinished(err2) {
      const cb = onclose;
      onclose = null;
      if (cb) {
        cb(err2);
      } else if (err2) {
        d.destroy(err2);
      } else if (!readable2 && !writable2) {
        d.destroy();
      }
    }
    const head = streams[0];
    const tail = pipeline(streams, onfinished);
    const writable2 = !!(isWritable(head) || isWritableStream(head) || isTransformStream(head));
    const readable2 = !!(isReadable2(tail) || isReadableStream(tail) || isTransformStream(tail));
    d = new Duplex({
      // TODO (ronag): highWaterMark?
      writableObjectMode: !!(head !== null && head !== void 0 && head.writableObjectMode),
      readableObjectMode: !!(tail !== null && tail !== void 0 && tail.readableObjectMode),
      writable: writable2,
      readable: readable2
    });
    if (writable2) {
      if (isNodeStream(head)) {
        d._write = function(chunk, encoding, callback) {
          if (head.write(chunk, encoding)) {
            callback();
          } else {
            ondrain = callback;
          }
        };
        d._final = function(callback) {
          head.end();
          onfinish = callback;
        };
        head.on("drain", function() {
          if (ondrain) {
            const cb = ondrain;
            ondrain = null;
            cb();
          }
        });
      } else if (isWebStream(head)) {
        const writable3 = isTransformStream(head) ? head.writable : head;
        const writer = writable3.getWriter();
        d._write = async function(chunk, encoding, callback) {
          try {
            await writer.ready;
            writer.write(chunk).catch(() => {
            });
            callback();
          } catch (err2) {
            callback(err2);
          }
        };
        d._final = async function(callback) {
          try {
            await writer.ready;
            writer.close().catch(() => {
            });
            onfinish = callback;
          } catch (err2) {
            callback(err2);
          }
        };
      }
      const toRead = isTransformStream(tail) ? tail.readable : tail;
      eos(toRead, () => {
        if (onfinish) {
          const cb = onfinish;
          onfinish = null;
          cb();
        }
      });
    }
    if (readable2) {
      if (isNodeStream(tail)) {
        tail.on("readable", function() {
          if (onreadable) {
            const cb = onreadable;
            onreadable = null;
            cb();
          }
        });
        tail.on("end", function() {
          d.push(null);
        });
        d._read = function() {
          while (true) {
            const buf = tail.read();
            if (buf === null) {
              onreadable = d._read;
              return;
            }
            if (!d.push(buf)) {
              return;
            }
          }
        };
      } else if (isWebStream(tail)) {
        const readable3 = isTransformStream(tail) ? tail.readable : tail;
        const reader = readable3.getReader();
        d._read = async function() {
          while (true) {
            try {
              const { value, done } = await reader.read();
              if (!d.push(value)) {
                return;
              }
              if (done) {
                d.push(null);
                return;
              }
            } catch {
              return;
            }
          }
        };
      }
    }
    d._destroy = function(err2, callback) {
      if (!err2 && onclose !== null) {
        err2 = new AbortError();
      }
      onreadable = null;
      ondrain = null;
      onfinish = null;
      if (onclose === null) {
        callback(err2);
      } else {
        onclose = callback;
        if (isNodeStream(tail)) {
          destroyer(tail, err2);
        }
      }
    };
    return d;
  };
  return compose;
}
var hasRequiredOperators;
function requireOperators() {
  if (hasRequiredOperators) return operators;
  hasRequiredOperators = 1;
  const AbortController = globalThis.AbortController || requireBrowser$2().AbortController;
  const {
    codes: { ERR_INVALID_ARG_VALUE, ERR_INVALID_ARG_TYPE, ERR_MISSING_ARGS, ERR_OUT_OF_RANGE },
    AbortError
  } = requireErrors();
  const { validateAbortSignal, validateInteger, validateObject } = requireValidators();
  const kWeakHandler = requirePrimordials().Symbol("kWeak");
  const kResistStopPropagation = requirePrimordials().Symbol("kResistStopPropagation");
  const { finished } = requireEndOfStream();
  const staticCompose = requireCompose();
  const { addAbortSignalNoValidate } = requireAddAbortSignal();
  const { isWritable, isNodeStream } = requireUtils();
  const { deprecate } = requireUtil();
  const {
    ArrayPrototypePush,
    Boolean: Boolean2,
    MathFloor,
    Number: Number2,
    NumberIsNaN,
    Promise: Promise2,
    PromiseReject,
    PromiseResolve,
    PromisePrototypeThen,
    Symbol: Symbol2
  } = requirePrimordials();
  const kEmpty = Symbol2("kEmpty");
  const kEof = Symbol2("kEof");
  function compose2(stream2, options) {
    if (options != null) {
      validateObject(options, "options");
    }
    if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
      validateAbortSignal(options.signal, "options.signal");
    }
    if (isNodeStream(stream2) && !isWritable(stream2)) {
      throw new ERR_INVALID_ARG_VALUE("stream", stream2, "must be writable");
    }
    const composedStream = staticCompose(this, stream2);
    if (options !== null && options !== void 0 && options.signal) {
      addAbortSignalNoValidate(options.signal, composedStream);
    }
    return composedStream;
  }
  function map(fn, options) {
    if (typeof fn !== "function") {
      throw new ERR_INVALID_ARG_TYPE("fn", ["Function", "AsyncFunction"], fn);
    }
    if (options != null) {
      validateObject(options, "options");
    }
    if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
      validateAbortSignal(options.signal, "options.signal");
    }
    let concurrency = 1;
    if ((options === null || options === void 0 ? void 0 : options.concurrency) != null) {
      concurrency = MathFloor(options.concurrency);
    }
    let highWaterMark = concurrency - 1;
    if ((options === null || options === void 0 ? void 0 : options.highWaterMark) != null) {
      highWaterMark = MathFloor(options.highWaterMark);
    }
    validateInteger(concurrency, "options.concurrency", 1);
    validateInteger(highWaterMark, "options.highWaterMark", 0);
    highWaterMark += concurrency;
    return (async function* map2() {
      const signal = requireUtil().AbortSignalAny(
        [options === null || options === void 0 ? void 0 : options.signal].filter(Boolean2)
      );
      const stream2 = this;
      const queue = [];
      const signalOpt = {
        signal
      };
      let next;
      let resume;
      let done = false;
      let cnt = 0;
      function onCatch() {
        done = true;
        afterItemProcessed();
      }
      function afterItemProcessed() {
        cnt -= 1;
        maybeResume();
      }
      function maybeResume() {
        if (resume && !done && cnt < concurrency && queue.length < highWaterMark) {
          resume();
          resume = null;
        }
      }
      async function pump() {
        try {
          for await (let val of stream2) {
            if (done) {
              return;
            }
            if (signal.aborted) {
              throw new AbortError();
            }
            try {
              val = fn(val, signalOpt);
              if (val === kEmpty) {
                continue;
              }
              val = PromiseResolve(val);
            } catch (err2) {
              val = PromiseReject(err2);
            }
            cnt += 1;
            PromisePrototypeThen(val, afterItemProcessed, onCatch);
            queue.push(val);
            if (next) {
              next();
              next = null;
            }
            if (!done && (queue.length >= highWaterMark || cnt >= concurrency)) {
              await new Promise2((resolve2) => {
                resume = resolve2;
              });
            }
          }
          queue.push(kEof);
        } catch (err2) {
          const val = PromiseReject(err2);
          PromisePrototypeThen(val, afterItemProcessed, onCatch);
          queue.push(val);
        } finally {
          done = true;
          if (next) {
            next();
            next = null;
          }
        }
      }
      pump();
      try {
        while (true) {
          while (queue.length > 0) {
            const val = await queue[0];
            if (val === kEof) {
              return;
            }
            if (signal.aborted) {
              throw new AbortError();
            }
            if (val !== kEmpty) {
              yield val;
            }
            queue.shift();
            maybeResume();
          }
          await new Promise2((resolve2) => {
            next = resolve2;
          });
        }
      } finally {
        done = true;
        if (resume) {
          resume();
          resume = null;
        }
      }
    }).call(this);
  }
  function asIndexedPairs(options = void 0) {
    if (options != null) {
      validateObject(options, "options");
    }
    if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
      validateAbortSignal(options.signal, "options.signal");
    }
    return (async function* asIndexedPairs2() {
      let index = 0;
      for await (const val of this) {
        var _options$signal;
        if (options !== null && options !== void 0 && (_options$signal = options.signal) !== null && _options$signal !== void 0 && _options$signal.aborted) {
          throw new AbortError({
            cause: options.signal.reason
          });
        }
        yield [index++, val];
      }
    }).call(this);
  }
  async function some(fn, options = void 0) {
    for await (const unused of filter.call(this, fn, options)) {
      return true;
    }
    return false;
  }
  async function every(fn, options = void 0) {
    if (typeof fn !== "function") {
      throw new ERR_INVALID_ARG_TYPE("fn", ["Function", "AsyncFunction"], fn);
    }
    return !await some.call(
      this,
      async (...args) => {
        return !await fn(...args);
      },
      options
    );
  }
  async function find(fn, options) {
    for await (const result of filter.call(this, fn, options)) {
      return result;
    }
    return void 0;
  }
  async function forEach(fn, options) {
    if (typeof fn !== "function") {
      throw new ERR_INVALID_ARG_TYPE("fn", ["Function", "AsyncFunction"], fn);
    }
    async function forEachFn(value, options2) {
      await fn(value, options2);
      return kEmpty;
    }
    for await (const unused of map.call(this, forEachFn, options)) ;
  }
  function filter(fn, options) {
    if (typeof fn !== "function") {
      throw new ERR_INVALID_ARG_TYPE("fn", ["Function", "AsyncFunction"], fn);
    }
    async function filterFn(value, options2) {
      if (await fn(value, options2)) {
        return value;
      }
      return kEmpty;
    }
    return map.call(this, filterFn, options);
  }
  class ReduceAwareErrMissingArgs extends ERR_MISSING_ARGS {
    constructor() {
      super("reduce");
      this.message = "Reduce of an empty stream requires an initial value";
    }
  }
  async function reduce(reducer, initialValue, options) {
    var _options$signal2;
    if (typeof reducer !== "function") {
      throw new ERR_INVALID_ARG_TYPE("reducer", ["Function", "AsyncFunction"], reducer);
    }
    if (options != null) {
      validateObject(options, "options");
    }
    if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
      validateAbortSignal(options.signal, "options.signal");
    }
    let hasInitialValue = arguments.length > 1;
    if (options !== null && options !== void 0 && (_options$signal2 = options.signal) !== null && _options$signal2 !== void 0 && _options$signal2.aborted) {
      const err2 = new AbortError(void 0, {
        cause: options.signal.reason
      });
      this.once("error", () => {
      });
      await finished(this.destroy(err2));
      throw err2;
    }
    const ac = new AbortController();
    const signal = ac.signal;
    if (options !== null && options !== void 0 && options.signal) {
      const opts = {
        once: true,
        [kWeakHandler]: this,
        [kResistStopPropagation]: true
      };
      options.signal.addEventListener("abort", () => ac.abort(), opts);
    }
    let gotAnyItemFromStream = false;
    try {
      for await (const value of this) {
        var _options$signal3;
        gotAnyItemFromStream = true;
        if (options !== null && options !== void 0 && (_options$signal3 = options.signal) !== null && _options$signal3 !== void 0 && _options$signal3.aborted) {
          throw new AbortError();
        }
        if (!hasInitialValue) {
          initialValue = value;
          hasInitialValue = true;
        } else {
          initialValue = await reducer(initialValue, value, {
            signal
          });
        }
      }
      if (!gotAnyItemFromStream && !hasInitialValue) {
        throw new ReduceAwareErrMissingArgs();
      }
    } finally {
      ac.abort();
    }
    return initialValue;
  }
  async function toArray(options) {
    if (options != null) {
      validateObject(options, "options");
    }
    if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
      validateAbortSignal(options.signal, "options.signal");
    }
    const result = [];
    for await (const val of this) {
      var _options$signal4;
      if (options !== null && options !== void 0 && (_options$signal4 = options.signal) !== null && _options$signal4 !== void 0 && _options$signal4.aborted) {
        throw new AbortError(void 0, {
          cause: options.signal.reason
        });
      }
      ArrayPrototypePush(result, val);
    }
    return result;
  }
  function flatMap(fn, options) {
    const values = map.call(this, fn, options);
    return (async function* flatMap2() {
      for await (const val of values) {
        yield* val;
      }
    }).call(this);
  }
  function toIntegerOrInfinity(number) {
    number = Number2(number);
    if (NumberIsNaN(number)) {
      return 0;
    }
    if (number < 0) {
      throw new ERR_OUT_OF_RANGE("number", ">= 0", number);
    }
    return number;
  }
  function drop(number, options = void 0) {
    if (options != null) {
      validateObject(options, "options");
    }
    if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
      validateAbortSignal(options.signal, "options.signal");
    }
    number = toIntegerOrInfinity(number);
    return (async function* drop2() {
      var _options$signal5;
      if (options !== null && options !== void 0 && (_options$signal5 = options.signal) !== null && _options$signal5 !== void 0 && _options$signal5.aborted) {
        throw new AbortError();
      }
      for await (const val of this) {
        var _options$signal6;
        if (options !== null && options !== void 0 && (_options$signal6 = options.signal) !== null && _options$signal6 !== void 0 && _options$signal6.aborted) {
          throw new AbortError();
        }
        if (number-- <= 0) {
          yield val;
        }
      }
    }).call(this);
  }
  function take(number, options = void 0) {
    if (options != null) {
      validateObject(options, "options");
    }
    if ((options === null || options === void 0 ? void 0 : options.signal) != null) {
      validateAbortSignal(options.signal, "options.signal");
    }
    number = toIntegerOrInfinity(number);
    return (async function* take2() {
      var _options$signal7;
      if (options !== null && options !== void 0 && (_options$signal7 = options.signal) !== null && _options$signal7 !== void 0 && _options$signal7.aborted) {
        throw new AbortError();
      }
      for await (const val of this) {
        var _options$signal8;
        if (options !== null && options !== void 0 && (_options$signal8 = options.signal) !== null && _options$signal8 !== void 0 && _options$signal8.aborted) {
          throw new AbortError();
        }
        if (number-- > 0) {
          yield val;
        }
        if (number <= 0) {
          return;
        }
      }
    }).call(this);
  }
  operators.streamReturningOperators = {
    asIndexedPairs: deprecate(asIndexedPairs, "readable.asIndexedPairs will be removed in a future version."),
    drop,
    filter,
    flatMap,
    map,
    take,
    compose: compose2
  };
  operators.promiseReturningOperators = {
    every,
    forEach,
    reduce,
    toArray,
    some,
    find
  };
  return operators;
}
var promises$1;
var hasRequiredPromises;
function requirePromises() {
  if (hasRequiredPromises) return promises$1;
  hasRequiredPromises = 1;
  const { ArrayPrototypePop, Promise: Promise2 } = requirePrimordials();
  const { isIterable, isNodeStream, isWebStream } = requireUtils();
  const { pipelineImpl: pl } = requirePipeline();
  const { finished } = requireEndOfStream();
  requireStream();
  function pipeline(...streams) {
    return new Promise2((resolve2, reject) => {
      let signal;
      let end;
      const lastArg = streams[streams.length - 1];
      if (lastArg && typeof lastArg === "object" && !isNodeStream(lastArg) && !isIterable(lastArg) && !isWebStream(lastArg)) {
        const options = ArrayPrototypePop(streams);
        signal = options.signal;
        end = options.end;
      }
      pl(
        streams,
        (err2, value) => {
          if (err2) {
            reject(err2);
          } else {
            resolve2(value);
          }
        },
        {
          signal,
          end
        }
      );
    });
  }
  promises$1 = {
    finished,
    pipeline
  };
  return promises$1;
}
var hasRequiredStream;
function requireStream() {
  if (hasRequiredStream) return stream.exports;
  hasRequiredStream = 1;
  const { Buffer: Buffer2 } = requireBuffer();
  const { ObjectDefineProperty, ObjectKeys, ReflectApply } = requirePrimordials();
  const {
    promisify: { custom: customPromisify }
  } = requireUtil();
  const { streamReturningOperators, promiseReturningOperators } = requireOperators();
  const {
    codes: { ERR_ILLEGAL_CONSTRUCTOR }
  } = requireErrors();
  const compose2 = requireCompose();
  const { setDefaultHighWaterMark, getDefaultHighWaterMark } = requireState();
  const { pipeline } = requirePipeline();
  const { destroyer } = requireDestroy();
  const eos = requireEndOfStream();
  const promises2 = requirePromises();
  const utils2 = requireUtils();
  const Stream = stream.exports = requireLegacy().Stream;
  Stream.isDestroyed = utils2.isDestroyed;
  Stream.isDisturbed = utils2.isDisturbed;
  Stream.isErrored = utils2.isErrored;
  Stream.isReadable = utils2.isReadable;
  Stream.isWritable = utils2.isWritable;
  Stream.Readable = requireReadable();
  for (const key2 of ObjectKeys(streamReturningOperators)) {
    let fn = function(...args) {
      if (new.target) {
        throw ERR_ILLEGAL_CONSTRUCTOR();
      }
      return Stream.Readable.from(ReflectApply(op, this, args));
    };
    const op = streamReturningOperators[key2];
    ObjectDefineProperty(fn, "name", {
      __proto__: null,
      value: op.name
    });
    ObjectDefineProperty(fn, "length", {
      __proto__: null,
      value: op.length
    });
    ObjectDefineProperty(Stream.Readable.prototype, key2, {
      __proto__: null,
      value: fn,
      enumerable: false,
      configurable: true,
      writable: true
    });
  }
  for (const key2 of ObjectKeys(promiseReturningOperators)) {
    let fn = function(...args) {
      if (new.target) {
        throw ERR_ILLEGAL_CONSTRUCTOR();
      }
      return ReflectApply(op, this, args);
    };
    const op = promiseReturningOperators[key2];
    ObjectDefineProperty(fn, "name", {
      __proto__: null,
      value: op.name
    });
    ObjectDefineProperty(fn, "length", {
      __proto__: null,
      value: op.length
    });
    ObjectDefineProperty(Stream.Readable.prototype, key2, {
      __proto__: null,
      value: fn,
      enumerable: false,
      configurable: true,
      writable: true
    });
  }
  Stream.Writable = requireWritable();
  Stream.Duplex = requireDuplex();
  Stream.Transform = requireTransform();
  Stream.PassThrough = requirePassthrough();
  Stream.pipeline = pipeline;
  const { addAbortSignal: addAbortSignal2 } = requireAddAbortSignal();
  Stream.addAbortSignal = addAbortSignal2;
  Stream.finished = eos;
  Stream.destroy = destroyer;
  Stream.compose = compose2;
  Stream.setDefaultHighWaterMark = setDefaultHighWaterMark;
  Stream.getDefaultHighWaterMark = getDefaultHighWaterMark;
  ObjectDefineProperty(Stream, "promises", {
    __proto__: null,
    configurable: true,
    enumerable: true,
    get() {
      return promises2;
    }
  });
  ObjectDefineProperty(pipeline, customPromisify, {
    __proto__: null,
    enumerable: true,
    get() {
      return promises2.pipeline;
    }
  });
  ObjectDefineProperty(eos, customPromisify, {
    __proto__: null,
    enumerable: true,
    get() {
      return promises2.finished;
    }
  });
  Stream.Stream = Stream;
  Stream._isUint8Array = function isUint8Array(value) {
    return value instanceof Uint8Array;
  };
  Stream._uint8ArrayToBuffer = function _uint8ArrayToBuffer(chunk) {
    return Buffer2.from(chunk.buffer, chunk.byteOffset, chunk.byteLength);
  };
  return stream.exports;
}
var hasRequiredBrowser;
function requireBrowser() {
  if (hasRequiredBrowser) return browser$2.exports;
  hasRequiredBrowser = 1;
  (function(module) {
    const CustomStream = requireStream();
    const promises2 = requirePromises();
    const originalDestroy = CustomStream.Readable.destroy;
    module.exports = CustomStream.Readable;
    module.exports._uint8ArrayToBuffer = CustomStream._uint8ArrayToBuffer;
    module.exports._isUint8Array = CustomStream._isUint8Array;
    module.exports.isDisturbed = CustomStream.isDisturbed;
    module.exports.isErrored = CustomStream.isErrored;
    module.exports.isReadable = CustomStream.isReadable;
    module.exports.Readable = CustomStream.Readable;
    module.exports.Writable = CustomStream.Writable;
    module.exports.Duplex = CustomStream.Duplex;
    module.exports.Transform = CustomStream.Transform;
    module.exports.PassThrough = CustomStream.PassThrough;
    module.exports.addAbortSignal = CustomStream.addAbortSignal;
    module.exports.finished = CustomStream.finished;
    module.exports.destroy = CustomStream.destroy;
    module.exports.destroy = originalDestroy;
    module.exports.pipeline = CustomStream.pipeline;
    module.exports.compose = CustomStream.compose;
    Object.defineProperty(CustomStream, "promises", {
      configurable: true,
      enumerable: true,
      get() {
        return promises2;
      }
    });
    module.exports.Stream = CustomStream.Stream;
    module.exports.default = module.exports;
  })(browser$2);
  return browser$2.exports;
}
var browserExports = requireBrowser();
class ReadStream extends browserExports.Readable {
  constructor(opts = {}, handleOrPromise) {
    var _a3;
    super({ ...opts, encoding: (_a3 = opts.encoding) !== null && _a3 !== void 0 ? _a3 : void 0 });
    this.pending = true;
    this._path = "<unknown>";
    this._bytesRead = 0;
    Promise.resolve(handleOrPromise).then(({ file }) => {
      this._path = file.path;
      const internal = file.fs.streamRead(file.path, { start: opts.start, end: opts.end });
      this.reader = internal.getReader();
      this.pending = false;
      return this._read();
    }).catch((err2) => this.destroy(err2));
  }
  async _read() {
    if (!this.reader)
      return;
    const { done, value } = await this.reader.read();
    if (done) {
      this.push(null);
      return;
    }
    this._bytesRead += value.byteLength;
    if (!this.push(value))
      return;
    await this._read();
  }
  close(callback = () => null) {
    try {
      this.destroy();
      this.emit("close");
      callback(null);
    } catch (err2) {
      callback(new ErrnoError(Errno.EIO, err2.toString()));
    }
  }
  get path() {
    return this._path;
  }
  get bytesRead() {
    return this._bytesRead;
  }
  wrap(oldStream) {
    super.wrap(oldStream);
    return this;
  }
}
class WriteStream extends browserExports.Writable {
  constructor(opts = {}, handleOrPromise) {
    super(opts);
    this.pending = true;
    this._path = "<unknown>";
    this._bytesWritten = 0;
    this.ready = Promise.resolve(handleOrPromise).then(({ file }) => {
      this._path = file.path;
      const internal = file.fs.streamWrite(file.path, { start: opts.start });
      this.writer = internal.getWriter();
      this.pending = false;
    }).catch((err2) => this.destroy(err2));
  }
  async _write(chunk, encoding, callback) {
    await this.ready;
    if (!this.writer)
      return callback(warn(new ErrnoError(Errno.EAGAIN, "Underlying writable stream not ready", this._path)));
    if (encoding != "buffer")
      return callback(warn(new ErrnoError(Errno.ENOTSUP, "Unsupported encoding for stream", this._path)));
    const data = new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength);
    try {
      await this.writer.write(data);
      this._bytesWritten += chunk.byteLength;
      callback();
    } catch (error) {
      callback(new ErrnoError(Errno.EIO, error.toString()));
    }
  }
  async _final(callback) {
    await this.ready;
    if (!this.writer)
      return callback();
    try {
      await this.writer.close();
      callback();
    } catch (error) {
      callback(new ErrnoError(Errno.EIO, error.toString()));
    }
  }
  close(callback = () => null) {
    try {
      this.destroy();
      this.emit("close");
      callback(null);
    } catch (error) {
      callback(new ErrnoError(Errno.EIO, error.toString()));
    }
  }
  get path() {
    return this._path;
  }
  get bytesWritten() {
    return this._bytesWritten;
  }
}
var __addDisposableResource$1 = function(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async });
  } else if (async) {
    env.stack.push({ async: true });
  }
  return value;
};
var __disposeResources$1 = /* @__PURE__ */ (function(SuppressedError2) {
  return function(env) {
    function fail(e) {
      env.error = env.hasError ? new SuppressedError2(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  };
})(typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
class FileHandle {
  constructor(fdOrFile, context) {
    this.context = context;
    const isFile = typeof fdOrFile != "number";
    this.fd = isFile ? file2fd(fdOrFile) : fdOrFile;
    this.file = isFile ? fdOrFile : fd2file(fdOrFile);
  }
  _emitChange() {
    var _a3, _b3, _c2;
    emitChange(this.context, "change", this.file.path.slice((_c2 = (_b3 = (_a3 = this.context) === null || _a3 === void 0 ? void 0 : _a3.root) === null || _b3 === void 0 ? void 0 : _b3.length) !== null && _c2 !== void 0 ? _c2 : 0));
  }
  /**
   * Asynchronous fchown(2) - Change ownership of a file.
   */
  async chown(uid, gid) {
    await this.file.chown(uid, gid);
    this._emitChange();
  }
  /**
   * Asynchronous fchmod(2) - Change permissions of a file.
   * @param mode A file mode. If a string is passed, it is parsed as an octal integer.
   */
  async chmod(mode) {
    const numMode = normalizeMode(mode, -1);
    if (numMode < 0)
      throw new ErrnoError(Errno.EINVAL, "Invalid mode");
    await this.file.chmod(numMode);
    this._emitChange();
  }
  /**
   * Asynchronous fdatasync(2) - synchronize a file's in-core state with storage device.
   */
  datasync() {
    return this.file.datasync();
  }
  /**
   * Asynchronous fsync(2) - synchronize a file's in-core state with the underlying storage device.
   */
  sync() {
    return this.file.sync();
  }
  /**
   * Asynchronous ftruncate(2) - Truncate a file to a specified length.
   * @param length If not specified, defaults to `0`.
   */
  async truncate(length) {
    length || (length = 0);
    if (length < 0)
      throw new ErrnoError(Errno.EINVAL);
    await this.file.truncate(length);
    this._emitChange();
  }
  /**
   * Asynchronously change file timestamps of the file.
   * @param atime The last access time. If a string is provided, it will be coerced to number.
   * @param mtime The last modified time. If a string is provided, it will be coerced to number.
   */
  async utimes(atime, mtime) {
    await this.file.utimes(normalizeTime(atime), normalizeTime(mtime));
    this._emitChange();
  }
  /**
   * Asynchronously append data to a file, creating the file if it does not exist. The underlying file will _not_ be closed automatically.
   * The `FileHandle` must have been opened for appending.
   * @param data The data to write. If something other than a `Buffer` or `Uint8Array` is provided, the value is coerced to a string.
   * @param _options Either the encoding for the file, or an object optionally specifying the encoding, file mode, and flag.
   * - `encoding` defaults to `'utf8'`.
   * - `mode` defaults to `0o666`.
   * - `flag` defaults to `'a'`.
   */
  async appendFile(data, _options = {}) {
    const options = normalizeOptions(_options, "utf8", "a", 420);
    const flag = parseFlag(options.flag);
    if (!isAppendable(flag)) {
      throw new ErrnoError(Errno.EINVAL, "Flag passed to appendFile must allow for appending");
    }
    if (typeof data != "string" && !options.encoding) {
      throw new ErrnoError(Errno.EINVAL, "Encoding not specified");
    }
    const encodedData = typeof data == "string" ? bufferExports.Buffer.from(data, options.encoding) : data;
    await this.file.write(encodedData, 0, encodedData.length);
    this._emitChange();
  }
  async read(buffer2, offset, length, position) {
    if (typeof offset == "object" && offset != null) {
      position = offset.position;
      length = offset.length;
      offset = offset.offset;
    }
    if (!ArrayBuffer.isView(buffer2) && typeof buffer2 == "object") {
      position = buffer2.position;
      length = buffer2.length;
      offset = buffer2.offset;
      buffer2 = buffer2.buffer;
    }
    const pos = Number.isSafeInteger(position) ? position : this.file.position;
    buffer2 || (buffer2 = new Uint8Array((await this.file.stat()).size));
    offset !== null && offset !== void 0 ? offset : offset = 0;
    return this.file.read(buffer2, offset, length !== null && length !== void 0 ? length : buffer2.byteLength - offset, pos);
  }
  async readFile(_options) {
    const options = normalizeOptions(_options, null, "r", 292);
    const flag = parseFlag(options.flag);
    if (!isReadable(flag)) {
      throw new ErrnoError(Errno.EINVAL, "Flag passed must allow for reading");
    }
    const { size } = await this.stat();
    const { buffer: data } = await this.file.read(new Uint8Array(size), 0, size, 0);
    const buffer2 = bufferExports.Buffer.from(data);
    return options.encoding ? buffer2.toString(options.encoding) : buffer2;
  }
  /**
   * Read file data using a `ReadableStream`.
   * The handle will not be closed automatically.
   */
  readableWebStream(options = {}) {
    return this.file.fs.streamRead(this.file.path, {});
  }
  /**
   * @todo Implement
   */
  readLines(options) {
    throw ErrnoError.With("ENOSYS", this.file.path, "FileHandle.readLines");
  }
  [Symbol.asyncDispose]() {
    return this.close();
  }
  async stat(opts) {
    const stats = await this.file.stat();
    if (config.checkAccess && !stats.hasAccess(R_OK, this.context)) {
      throw ErrnoError.With("EACCES", this.file.path, "stat");
    }
    return (opts === null || opts === void 0 ? void 0 : opts.bigint) ? new BigIntStats(stats) : stats;
  }
  /**
   * Asynchronously writes `string` to the file.
   * The `FileHandle` must have been opened for writing.
   * It is unsafe to call `write()` multiple times on the same file without waiting for the `Promise`
   * to be resolved (or rejected). For this scenario, `createWriteStream` is strongly recommended.
   */
  async write(data, options, lenOrEnc, position) {
    let buffer2, offset, length;
    if (typeof options == "object" && options != null) {
      lenOrEnc = options.length;
      position = options.position;
      options = options.offset;
    }
    if (typeof data === "string") {
      position = typeof options === "number" ? options : null;
      offset = 0;
      buffer2 = bufferExports.Buffer.from(data, typeof lenOrEnc === "string" ? lenOrEnc : "utf8");
      length = buffer2.length;
    } else {
      buffer2 = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
      offset = options !== null && options !== void 0 ? options : 0;
      length = typeof lenOrEnc == "number" ? lenOrEnc : buffer2.byteLength;
      position = typeof position === "number" ? position : null;
    }
    position !== null && position !== void 0 ? position : position = this.file.position;
    const bytesWritten = await this.file.write(buffer2, offset, length, position);
    this._emitChange();
    return { buffer: data, bytesWritten };
  }
  /**
   * Asynchronously writes data to a file, replacing the file if it already exists. The underlying file will _not_ be closed automatically.
   * The `FileHandle` must have been opened for writing.
   * It is unsafe to call `writeFile()` multiple times on the same file without waiting for the `Promise` to be resolved (or rejected).
   * @param data The data to write. If something other than a `Buffer` or `Uint8Array` is provided, the value is coerced to a string.
   * @param _options Either the encoding for the file, or an object optionally specifying the encoding, file mode, and flag.
   * - `encoding` defaults to `'utf8'`.
   * - `mode` defaults to `0o666`.
   * - `flag` defaults to `'w'`.
   */
  async writeFile(data, _options = {}) {
    const options = normalizeOptions(_options, "utf8", "w", 420);
    const flag = parseFlag(options.flag);
    if (!isWriteable(flag)) {
      throw new ErrnoError(Errno.EINVAL, "Flag passed must allow for writing");
    }
    if (typeof data != "string" && !options.encoding) {
      throw new ErrnoError(Errno.EINVAL, "Encoding not specified");
    }
    const encodedData = typeof data == "string" ? bufferExports.Buffer.from(data, options.encoding) : data;
    await this.file.write(encodedData, 0, encodedData.length, 0);
    this._emitChange();
  }
  /**
   * Asynchronous close(2) - close a `FileHandle`.
   */
  async close() {
    await this.file.close();
    fdMap.delete(this.fd);
  }
  /**
   * Asynchronous `writev`. Writes from multiple buffers.
   * @param buffers An array of Uint8Array buffers.
   * @param position The position in the file where to begin writing.
   * @returns The number of bytes written.
   */
  async writev(buffers, position) {
    if (typeof position == "number")
      this.file.position = position;
    let bytesWritten = 0;
    for (const buffer2 of buffers) {
      bytesWritten += (await this.write(buffer2)).bytesWritten;
    }
    return { bytesWritten, buffers };
  }
  /**
   * Asynchronous `readv`. Reads into multiple buffers.
   * @param buffers An array of Uint8Array buffers.
   * @param position The position in the file where to begin reading.
   * @returns The number of bytes read.
   */
  async readv(buffers, position) {
    if (typeof position == "number")
      this.file.position = position;
    let bytesRead = 0;
    for (const buffer2 of buffers) {
      bytesRead += (await this.read(buffer2)).bytesRead;
    }
    return { bytesRead, buffers };
  }
  /**
   * Creates a stream for reading from the file.
   * @param options Options for the readable stream
   */
  createReadStream(options = {}) {
    return new ReadStream(options, this);
  }
  /**
   * Creates a stream for writing to the file.
   * @param options Options for the writeable stream.
   */
  createWriteStream(options = {}) {
    return new WriteStream(options, this);
  }
}
async function rename$1(oldPath, newPath) {
  oldPath = normalizePath(oldPath);
  newPath = normalizePath(newPath);
  const src = resolveMount(oldPath, this);
  const dst = resolveMount(newPath, this);
  if (config.checkAccess && !(await stat$1.call(this, dirname(oldPath))).hasAccess(W_OK, this)) {
    throw ErrnoError.With("EACCES", oldPath, "rename");
  }
  try {
    if (src.mountPoint == dst.mountPoint) {
      await src.fs.rename(src.path, dst.path);
      emitChange(this, "rename", oldPath.toString());
      emitChange(this, "change", newPath.toString());
      return;
    }
    await writeFile$1.call(this, newPath, await readFile$1(oldPath));
    await unlink$1.call(this, oldPath);
    emitChange(this, "rename", oldPath.toString());
  } catch (e) {
    throw fixError(e, { [src.path]: oldPath, [dst.path]: newPath });
  }
}
async function exists$1(path) {
  try {
    const { fs: fs2, path: resolved } = resolveMount(await realpath$1.call(this, path), this);
    return await fs2.exists(resolved);
  } catch (e) {
    if (e instanceof ErrnoError && e.code == "ENOENT") {
      return false;
    }
    throw e;
  }
}
async function stat$1(path, options) {
  path = normalizePath(path);
  const { fs: fs2, path: resolved } = resolveMount(await realpath$1.call(this, path), this);
  try {
    const stats = await fs2.stat(resolved);
    if (config.checkAccess && !stats.hasAccess(R_OK, this)) {
      throw ErrnoError.With("EACCES", resolved, "stat");
    }
    return (options === null || options === void 0 ? void 0 : options.bigint) ? new BigIntStats(stats) : stats;
  } catch (e) {
    throw fixError(e, { [resolved]: path });
  }
}
async function lstat$1(path, options) {
  path = normalizePath(path);
  const { fs: fs2, path: resolved } = resolveMount(path, this);
  try {
    const stats = await fs2.stat(resolved);
    return (options === null || options === void 0 ? void 0 : options.bigint) ? new BigIntStats(stats) : stats;
  } catch (e) {
    throw fixError(e, { [resolved]: path });
  }
}
async function truncate$1(path, len = 0) {
  const env_1 = { stack: [], error: void 0, hasError: false };
  try {
    const handle = __addDisposableResource$1(env_1, await open$1.call(this, path, "r+"), true);
    await handle.truncate(len);
  } catch (e_1) {
    env_1.error = e_1;
    env_1.hasError = true;
  } finally {
    const result_1 = __disposeResources$1(env_1);
    if (result_1)
      await result_1;
  }
}
async function unlink$1(path) {
  path = normalizePath(path);
  const { fs: fs2, path: resolved } = resolveMount(path, this);
  try {
    if (config.checkAccess && !(await fs2.stat(resolved)).hasAccess(W_OK, this)) {
      throw ErrnoError.With("EACCES", resolved, "unlink");
    }
    await fs2.unlink(resolved);
    emitChange(this, "rename", path.toString());
  } catch (e) {
    throw fixError(e, { [resolved]: path });
  }
}
async function applySetId(file, uid, gid) {
  if (file.fs.attributes.has("setid"))
    return;
  const parent = await file.fs.stat(dirname(file.path));
  await file.chown(
    parent.mode & S_ISUID ? parent.uid : uid,
    // manually apply setuid/setgid
    parent.mode & S_ISGID ? parent.gid : gid
  );
}
async function _open($, path, opt) {
  var _a3;
  path = normalizePath(path);
  const mode = normalizeMode(opt.mode, 420), flag = parseFlag(opt.flag);
  const { fullPath, fs: fs2, path: resolved, stats } = await _resolve($, path.toString(), opt.preserveSymlinks);
  if (!stats) {
    if (!isWriteable(flag) && !isAppendable(flag) || flag == "r+") {
      throw ErrnoError.With("ENOENT", fullPath, "_open");
    }
    const parentStats = await fs2.stat(dirname(resolved));
    if (config.checkAccess && !parentStats.hasAccess(W_OK, $)) {
      throw ErrnoError.With("EACCES", dirname(fullPath), "_open");
    }
    if (!parentStats.isDirectory()) {
      throw ErrnoError.With("ENOTDIR", dirname(fullPath), "_open");
    }
    const { euid: uid, egid: gid } = (_a3 = $ === null || $ === void 0 ? void 0 : $.credentials) !== null && _a3 !== void 0 ? _a3 : credentials;
    const file = await fs2.createFile(resolved, flag, mode, { uid, gid });
    await applySetId(file, uid, gid);
    return new FileHandle(file, $);
  }
  if (config.checkAccess && !stats.hasAccess(flagToMode(flag), $)) {
    throw ErrnoError.With("EACCES", fullPath, "_open");
  }
  if (isExclusive(flag)) {
    throw ErrnoError.With("EEXIST", fullPath, "_open");
  }
  const handle = new FileHandle(await fs2.openFile(resolved, flag), $);
  if (isTruncating(flag)) {
    await handle.truncate(0);
  }
  return handle;
}
async function open$1(path, flag = "r", mode = 420) {
  return await _open(this, path, { flag, mode });
}
async function readFile$1(path, _options) {
  const env_2 = { stack: [], error: void 0, hasError: false };
  try {
    const options = normalizeOptions(_options, null, "r", 420);
    const handle = __addDisposableResource$1(env_2, typeof path == "object" && "fd" in path ? path : await open$1.call(this, path, options.flag, options.mode), true);
    return await handle.readFile(options);
  } catch (e_2) {
    env_2.error = e_2;
    env_2.hasError = true;
  } finally {
    const result_2 = __disposeResources$1(env_2);
    if (result_2)
      await result_2;
  }
}
async function writeFile$1(path, data, _options) {
  const env_3 = { stack: [], error: void 0, hasError: false };
  try {
    const options = normalizeOptions(_options, "utf8", "w+", 420);
    const handle = __addDisposableResource$1(env_3, path instanceof FileHandle ? path : await open$1.call(this, path.toString(), options.flag, options.mode), true);
    const _data = typeof data == "string" ? data : data instanceof DataView ? new Uint8Array(data.buffer, data.byteOffset, data.byteLength) : data;
    if (typeof _data != "string" && !(_data instanceof Uint8Array)) {
      throw new ErrnoError(Errno.EINVAL, 'The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView. Received ' + typeof data, handle.file.path, "writeFile");
    }
    await handle.writeFile(_data, options);
  } catch (e_3) {
    env_3.error = e_3;
    env_3.hasError = true;
  } finally {
    const result_3 = __disposeResources$1(env_3);
    if (result_3)
      await result_3;
  }
}
async function appendFile$1(path, data, _options) {
  const env_4 = { stack: [], error: void 0, hasError: false };
  try {
    const options = normalizeOptions(_options, "utf8", "a", 420);
    const flag = parseFlag(options.flag);
    if (!isAppendable(flag)) {
      throw new ErrnoError(Errno.EINVAL, "Flag passed to appendFile must allow for appending");
    }
    if (typeof data != "string" && !options.encoding) {
      throw new ErrnoError(Errno.EINVAL, "Encoding not specified");
    }
    const encodedData = typeof data == "string" ? bufferExports.Buffer.from(data, options.encoding) : new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    const handle = __addDisposableResource$1(env_4, typeof path == "object" && "fd" in path ? path : await open$1.call(this, path, options.flag, options.mode), true);
    await handle.appendFile(encodedData, options);
  } catch (e_4) {
    env_4.error = e_4;
    env_4.hasError = true;
  } finally {
    const result_4 = __disposeResources$1(env_4);
    if (result_4)
      await result_4;
  }
}
async function rmdir$1(path) {
  path = await realpath$1.call(this, path);
  const { fs: fs2, path: resolved } = resolveMount(path, this);
  try {
    const stats = await fs2.stat(resolved);
    if (!stats) {
      throw ErrnoError.With("ENOENT", path, "rmdir");
    }
    if (!stats.isDirectory()) {
      throw ErrnoError.With("ENOTDIR", resolved, "rmdir");
    }
    if (config.checkAccess && !stats.hasAccess(W_OK, this)) {
      throw ErrnoError.With("EACCES", resolved, "rmdir");
    }
    await fs2.rmdir(resolved);
    emitChange(this, "rename", path.toString());
  } catch (e) {
    throw fixError(e, { [resolved]: path });
  }
}
async function mkdir$1(path, options) {
  var _a3, _b3;
  const { euid: uid, egid: gid } = (_a3 = this === null || this === void 0 ? void 0 : this.credentials) !== null && _a3 !== void 0 ? _a3 : credentials;
  options = typeof options === "object" ? options : { mode: options };
  const mode = normalizeMode(options === null || options === void 0 ? void 0 : options.mode, 511);
  path = await realpath$1.call(this, path);
  const { fs: fs2, path: resolved, root } = resolveMount(path, this);
  const errorPaths = { [resolved]: path };
  try {
    if (!(options === null || options === void 0 ? void 0 : options.recursive)) {
      if (config.checkAccess && !(await fs2.stat(dirname(resolved))).hasAccess(W_OK, this)) {
        throw ErrnoError.With("EACCES", dirname(resolved), "mkdir");
      }
      await fs2.mkdir(resolved, mode, { uid, gid });
      await applySetId(await fs2.openFile(resolved, "r+"), uid, gid);
      emitChange(this, "rename", path.toString());
      return;
    }
    const dirs = [];
    for (let dir = resolved, origDir = path; !await fs2.exists(dir); dir = dirname(dir), origDir = dirname(origDir)) {
      dirs.unshift(dir);
      errorPaths[dir] = origDir;
    }
    for (const dir of dirs) {
      if (config.checkAccess && !(await fs2.stat(dirname(dir))).hasAccess(W_OK, this)) {
        throw ErrnoError.With("EACCES", dirname(dir), "mkdir");
      }
      await fs2.mkdir(dir, mode, { uid, gid });
      await applySetId(await fs2.openFile(dir, "r+"), uid, gid);
      emitChange(this, "rename", dir);
    }
    return root.length == 1 ? dirs[0] : (_b3 = dirs[0]) === null || _b3 === void 0 ? void 0 : _b3.slice(root.length);
  } catch (e) {
    throw fixError(e, errorPaths);
  }
}
async function readdir$1(path, options) {
  options = typeof options === "object" ? options : { encoding: options };
  path = await realpath$1.call(this, path);
  const { fs: fs2, path: resolved } = resolveMount(path, this);
  const stats = await fs2.stat(resolved).catch((e) => _throw(fixError(e, { [resolved]: path })));
  if (!stats) {
    throw ErrnoError.With("ENOENT", path, "readdir");
  }
  if (config.checkAccess && !stats.hasAccess(R_OK, this)) {
    throw ErrnoError.With("EACCES", path, "readdir");
  }
  if (!stats.isDirectory()) {
    throw ErrnoError.With("ENOTDIR", path, "readdir");
  }
  const entries2 = await fs2.readdir(resolved).catch((e) => _throw(fixError(e, { [resolved]: path })));
  const values = [];
  const addEntry = async (entry) => {
    let entryStats;
    if ((options === null || options === void 0 ? void 0 : options.recursive) || (options === null || options === void 0 ? void 0 : options.withFileTypes)) {
      entryStats = await fs2.stat(join(resolved, entry)).catch((e) => {
        if (e.code == "ENOENT")
          return;
        throw fixError(e, { [resolved]: path });
      });
      if (!entryStats)
        return;
    }
    if (options === null || options === void 0 ? void 0 : options.withFileTypes) {
      values.push(new Dirent(entry, entryStats));
    } else if ((options === null || options === void 0 ? void 0 : options.encoding) == "buffer") {
      values.push(bufferExports.Buffer.from(entry));
    } else {
      values.push(entry);
    }
    if (!(options === null || options === void 0 ? void 0 : options.recursive) || !(entryStats === null || entryStats === void 0 ? void 0 : entryStats.isDirectory()))
      return;
    for (const subEntry of await readdir$1.call(this, join(path, entry), options)) {
      if (subEntry instanceof Dirent) {
        subEntry.path = join(entry, subEntry.path);
        values.push(subEntry);
      } else if (bufferExports.Buffer.isBuffer(subEntry)) {
        values.push(bufferExports.Buffer.from(join(entry, decodeUTF8(subEntry))));
      } else {
        values.push(join(entry, subEntry));
      }
    }
  };
  await Promise.all(entries2.map(addEntry));
  return values;
}
async function link$1(targetPath, linkPath) {
  targetPath = normalizePath(targetPath);
  linkPath = normalizePath(linkPath);
  const { fs: fs2, path } = resolveMount(targetPath, this);
  const link2 = resolveMount(linkPath, this);
  if (fs2 != link2.fs) {
    throw ErrnoError.With("EXDEV", linkPath, "link");
  }
  try {
    if (config.checkAccess && !(await fs2.stat(dirname(targetPath))).hasAccess(R_OK, this)) {
      throw ErrnoError.With("EACCES", dirname(path), "link");
    }
    if (config.checkAccess && !(await stat$1.call(this, dirname(linkPath))).hasAccess(W_OK, this)) {
      throw ErrnoError.With("EACCES", dirname(linkPath), "link");
    }
    if (config.checkAccess && !(await fs2.stat(path)).hasAccess(R_OK, this)) {
      throw ErrnoError.With("EACCES", path, "link");
    }
    return await fs2.link(path, link2.path);
  } catch (e) {
    throw fixError(e, { [link2.path]: linkPath, [path]: targetPath });
  }
}
async function symlink$1(target, path, type = "file") {
  const env_5 = { stack: [], error: void 0, hasError: false };
  try {
    if (!["file", "dir", "junction"].includes(type)) {
      throw new ErrnoError(Errno.EINVAL, "Invalid symlink type: " + type);
    }
    path = normalizePath(path);
    if (await exists$1.call(this, path))
      throw ErrnoError.With("EEXIST", path, "symlink");
    const handle = __addDisposableResource$1(env_5, await _open(this, path, { flag: "w+", mode: 420, preserveSymlinks: true }), true);
    await handle.writeFile(normalizePath(target, true));
    await handle.file.chmod(S_IFLNK);
  } catch (e_5) {
    env_5.error = e_5;
    env_5.hasError = true;
  } finally {
    const result_5 = __disposeResources$1(env_5);
    if (result_5)
      await result_5;
  }
}
async function readlink$1(path, options) {
  const env_6 = { stack: [], error: void 0, hasError: false };
  try {
    const handle = __addDisposableResource$1(env_6, await _open(this, normalizePath(path), { flag: "r", mode: 420, preserveSymlinks: true }), true);
    const value = await handle.readFile();
    const encoding = typeof options == "object" ? options === null || options === void 0 ? void 0 : options.encoding : options;
    return encoding == "buffer" ? value : value.toString(encoding !== null && encoding !== void 0 ? encoding : "utf-8");
  } catch (e_6) {
    env_6.error = e_6;
    env_6.hasError = true;
  } finally {
    const result_6 = __disposeResources$1(env_6);
    if (result_6)
      await result_6;
  }
}
async function chown$1(path, uid, gid) {
  const env_7 = { stack: [], error: void 0, hasError: false };
  try {
    const handle = __addDisposableResource$1(env_7, await open$1.call(this, path, "r+"), true);
    await handle.chown(uid, gid);
  } catch (e_7) {
    env_7.error = e_7;
    env_7.hasError = true;
  } finally {
    const result_7 = __disposeResources$1(env_7);
    if (result_7)
      await result_7;
  }
}
async function lchown$1(path, uid, gid) {
  const env_8 = { stack: [], error: void 0, hasError: false };
  try {
    const handle = __addDisposableResource$1(env_8, await _open(this, path, {
      flag: "r+",
      mode: 420,
      preserveSymlinks: true,
      allowDirectory: true
    }), true);
    await handle.chown(uid, gid);
  } catch (e_8) {
    env_8.error = e_8;
    env_8.hasError = true;
  } finally {
    const result_8 = __disposeResources$1(env_8);
    if (result_8)
      await result_8;
  }
}
async function chmod$1(path, mode) {
  const env_9 = { stack: [], error: void 0, hasError: false };
  try {
    const handle = __addDisposableResource$1(env_9, await open$1.call(this, path, "r+"), true);
    await handle.chmod(mode);
  } catch (e_9) {
    env_9.error = e_9;
    env_9.hasError = true;
  } finally {
    const result_9 = __disposeResources$1(env_9);
    if (result_9)
      await result_9;
  }
}
async function lchmod$1(path, mode) {
  const env_10 = { stack: [], error: void 0, hasError: false };
  try {
    const handle = __addDisposableResource$1(env_10, await _open(this, path, {
      flag: "r+",
      mode: 420,
      preserveSymlinks: true,
      allowDirectory: true
    }), true);
    await handle.chmod(mode);
  } catch (e_10) {
    env_10.error = e_10;
    env_10.hasError = true;
  } finally {
    const result_10 = __disposeResources$1(env_10);
    if (result_10)
      await result_10;
  }
}
async function utimes$1(path, atime, mtime) {
  const env_11 = { stack: [], error: void 0, hasError: false };
  try {
    const handle = __addDisposableResource$1(env_11, await open$1.call(this, path, "r+"), true);
    await handle.utimes(atime, mtime);
  } catch (e_11) {
    env_11.error = e_11;
    env_11.hasError = true;
  } finally {
    const result_11 = __disposeResources$1(env_11);
    if (result_11)
      await result_11;
  }
}
async function lutimes$1(path, atime, mtime) {
  const env_12 = { stack: [], error: void 0, hasError: false };
  try {
    const handle = __addDisposableResource$1(env_12, await _open(this, path, {
      flag: "r+",
      mode: 420,
      preserveSymlinks: true,
      allowDirectory: true
    }), true);
    await handle.utimes(new Date(atime), new Date(mtime));
  } catch (e_12) {
    env_12.error = e_12;
    env_12.hasError = true;
  } finally {
    const result_12 = __disposeResources$1(env_12);
    if (result_12)
      await result_12;
  }
}
async function _resolve($, path, preserveSymlinks) {
  if (preserveSymlinks) {
    const resolved2 = resolveMount(path, $);
    const stats = await resolved2.fs.stat(resolved2.path).catch(() => void 0);
    return { ...resolved2, fullPath: path, stats };
  }
  try {
    const resolved2 = resolveMount(path, $);
    const stats = await resolved2.fs.stat(resolved2.path);
    if (!stats.isSymbolicLink()) {
      return { ...resolved2, fullPath: path, stats };
    }
    const target = resolve(dirname(path), (await readlink$1.call($, path)).toString());
    return await _resolve($, target);
  } catch {
  }
  const { base, dir } = parse(path);
  const realDir = dir == "/" ? "/" : await realpath$1.call($, dir);
  const maybePath = join(realDir, base);
  const resolved = resolveMount(maybePath, $);
  try {
    const stats = await resolved.fs.stat(resolved.path);
    if (!stats.isSymbolicLink()) {
      return { ...resolved, fullPath: maybePath, stats };
    }
    const target = resolve(realDir, (await readlink$1.call($, maybePath)).toString());
    return await _resolve($, target);
  } catch (e) {
    if (e.code == "ENOENT") {
      return { ...resolved, fullPath: path };
    }
    throw fixError(e, { [resolved.path]: maybePath });
  }
}
async function realpath$1(path, options) {
  var _a3;
  const encoding = typeof options == "string" ? options : (_a3 = options === null || options === void 0 ? void 0 : options.encoding) !== null && _a3 !== void 0 ? _a3 : "utf8";
  path = normalizePath(path);
  const { fullPath } = await _resolve(this, path);
  if (encoding == "utf8" || encoding == "utf-8")
    return fullPath;
  const buf = bufferExports.Buffer.from(fullPath, "utf-8");
  if (encoding == "buffer")
    return buf;
  return buf.toString(encoding);
}
function watch$1(filename, options = {}) {
  const watcher = new FSWatcher(this, filename.toString(), typeof options !== "string" ? options : { encoding: options });
  const eventQueue = [];
  let done = false;
  watcher.on("change", (eventType, filename2) => {
    var _a3;
    (_a3 = eventQueue.shift()) === null || _a3 === void 0 ? void 0 : _a3({ value: { eventType, filename: filename2 }, done: false });
  });
  function cleanup() {
    done = true;
    watcher.close();
    for (const resolve2 of eventQueue) {
      resolve2({ value: null, done });
    }
    eventQueue.length = 0;
    return Promise.resolve({ value: null, done: true });
  }
  return {
    async next() {
      if (done)
        return Promise.resolve({ value: null, done });
      const { promise, resolve: resolve2 } = Promise.withResolvers();
      eventQueue.push(resolve2);
      return promise;
    },
    return: cleanup,
    throw: cleanup,
    async [Symbol.asyncDispose]() {
      await cleanup();
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}
async function access$1(path, mode = F_OK) {
  if (!config.checkAccess)
    return;
  const stats = await stat$1.call(this, path);
  if (!stats.hasAccess(mode, this)) {
    throw new ErrnoError(Errno.EACCES);
  }
}
async function rm$1(path, options) {
  path = normalizePath(path);
  const stats = await lstat$1.call(this, path).catch((error) => {
    if (error.code == "ENOENT" && (options === null || options === void 0 ? void 0 : options.force))
      return void 0;
    throw error;
  });
  if (!stats)
    return;
  switch (stats.mode & S_IFMT) {
    case S_IFDIR:
      if (options === null || options === void 0 ? void 0 : options.recursive) {
        for (const entry of await readdir$1.call(this, path)) {
          await rm$1.call(this, join(path, entry), options);
        }
      }
      await rmdir$1.call(this, path);
      break;
    case S_IFREG:
    case S_IFLNK:
    case S_IFBLK:
    case S_IFCHR:
      await unlink$1.call(this, path);
      break;
    case S_IFIFO:
    case S_IFSOCK:
    default:
      throw new ErrnoError(Errno.EPERM, "File type not supported", path, "rm");
  }
}
async function mkdtemp$1(prefix, options) {
  const encoding = typeof options === "object" ? options === null || options === void 0 ? void 0 : options.encoding : options || "utf8";
  const fsName = `${prefix}${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const resolvedPath = "/tmp/" + fsName;
  await mkdir$1.call(this, resolvedPath);
  return encoding == "buffer" ? bufferExports.Buffer.from(resolvedPath) : resolvedPath;
}
async function copyFile$1(src, dest, mode) {
  src = normalizePath(src);
  dest = normalizePath(dest);
  if (mode && mode & COPYFILE_EXCL && await exists$1.call(this, dest)) {
    throw new ErrnoError(Errno.EEXIST, "Destination file already exists", dest, "copyFile");
  }
  await writeFile$1.call(this, dest, await readFile$1.call(this, src));
  emitChange(this, "rename", dest.toString());
}
function opendir$1(path, options) {
  path = normalizePath(path);
  return Promise.resolve(new Dir(path, this));
}
async function cp$1(source, destination, opts) {
  source = normalizePath(source);
  destination = normalizePath(destination);
  const srcStats = await lstat$1.call(this, source);
  if ((opts === null || opts === void 0 ? void 0 : opts.errorOnExist) && await exists$1.call(this, destination)) {
    throw new ErrnoError(Errno.EEXIST, "Destination file or directory already exists", destination, "cp");
  }
  switch (srcStats.mode & S_IFMT) {
    case S_IFDIR: {
      if (!(opts === null || opts === void 0 ? void 0 : opts.recursive)) {
        throw new ErrnoError(Errno.EISDIR, source + " is a directory (not copied)", source, "cp");
      }
      const [entries2] = await Promise.all(
        [
          readdir$1.call(this, source, { withFileTypes: true }),
          mkdir$1.call(this, destination, { recursive: true })
        ]
        // Ensure the destination directory exists
      );
      const _cp = async (dirent) => {
        if (opts.filter && !opts.filter(join(source, dirent.name), join(destination, dirent.name))) {
          return;
        }
        await cp$1.call(this, join(source, dirent.name), join(destination, dirent.name), opts);
      };
      await Promise.all(entries2.map(_cp));
      break;
    }
    case S_IFREG:
    case S_IFLNK:
      await copyFile$1.call(this, source, destination);
      break;
    case S_IFBLK:
    case S_IFCHR:
    case S_IFIFO:
    case S_IFSOCK:
    default:
      throw new ErrnoError(Errno.EPERM, "File type not supported", source, "rm");
  }
  if (opts === null || opts === void 0 ? void 0 : opts.preserveTimestamps) {
    await utimes$1.call(this, destination, srcStats.atime, srcStats.mtime);
  }
}
async function statfs$1(path, opts) {
  path = normalizePath(path);
  const { fs: fs2 } = resolveMount(path, this);
  return Promise.resolve(_statfs(fs2, opts === null || opts === void 0 ? void 0 : opts.bigint));
}
function glob$1(pattern, opt) {
  pattern = Array.isArray(pattern) ? pattern : [pattern];
  const { cwd: cwd2 = "/", withFileTypes = false, exclude = () => false } = opt || {};
  const regexPatterns = pattern.map((p) => {
    p = p.replace(/([.?+^$(){}|[\]/])/g, "$1").replace(/\*\*/g, ".*").replace(/\*/g, "[^/]*").replace(/\?/g, ".");
    return new RegExp(`^${p}$`);
  });
  async function* recursiveList(dir) {
    const entries2 = await readdir$1(dir, { withFileTypes, encoding: "utf8" });
    for (const entry of entries2) {
      const fullPath = withFileTypes ? entry.path : dir + "/" + entry;
      if (exclude(withFileTypes ? entry : fullPath))
        continue;
      if ((await stat$1(fullPath)).isDirectory() && regexPatterns.some((pattern2) => pattern2.source.includes(".*"))) {
        yield* recursiveList(fullPath);
      }
      if (regexPatterns.some((pattern2) => pattern2.test(fullPath.replace(/^\/+/g, "")))) {
        yield withFileTypes ? entry : fullPath.replace(/^\/+/g, "");
      }
    }
  }
  return recursiveList(cwd2);
}
var promises = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  FileHandle,
  access: access$1,
  appendFile: appendFile$1,
  chmod: chmod$1,
  chown: chown$1,
  constants,
  copyFile: copyFile$1,
  cp: cp$1,
  exists: exists$1,
  glob: glob$1,
  lchmod: lchmod$1,
  lchown: lchown$1,
  link: link$1,
  lstat: lstat$1,
  lutimes: lutimes$1,
  mkdir: mkdir$1,
  mkdtemp: mkdtemp$1,
  open: open$1,
  opendir: opendir$1,
  readFile: readFile$1,
  readdir: readdir$1,
  readlink: readlink$1,
  realpath: realpath$1,
  rename: rename$1,
  rm: rm$1,
  rmdir: rmdir$1,
  stat: stat$1,
  statfs: statfs$1,
  symlink: symlink$1,
  truncate: truncate$1,
  unlink: unlink$1,
  utimes: utimes$1,
  watch: watch$1,
  writeFile: writeFile$1
});
const nop = () => {
};
async function collectAsyncIterator(it) {
  const results = [];
  for await (const result of it) {
    results.push(result);
  }
  return results;
}
function rename(oldPath, newPath, cb = nop) {
  rename$1.call(this, oldPath, newPath).then(() => cb()).catch(cb);
}
function exists(path, cb = nop) {
  exists$1.call(this, path).then(cb).catch(() => cb(false));
}
function stat(path, options, callback = nop) {
  callback = typeof options == "function" ? options : callback;
  stat$1.call(this, path, typeof options != "function" ? options : {}).then((stats) => callback(void 0, stats)).catch(callback);
}
function lstat(path, options, callback = nop) {
  callback = typeof options == "function" ? options : callback;
  lstat$1.call(this, path, typeof options != "function" ? options : {}).then((stats) => callback(void 0, stats)).catch(callback);
}
function truncate(path, cbLen = 0, cb = nop) {
  cb = typeof cbLen === "function" ? cbLen : cb;
  const len = typeof cbLen === "number" ? cbLen : 0;
  truncate$1.call(this, path, len).then(() => cb()).catch(cb);
}
function unlink(path, cb = nop) {
  unlink$1.call(this, path).then(() => cb()).catch(cb);
}
function open(path, flag, cbMode, cb = nop) {
  const mode = normalizeMode(cbMode, 420);
  cb = typeof cbMode === "function" ? cbMode : cb;
  open$1.call(this, path, flag, mode).then((handle) => cb(void 0, handle.fd)).catch(cb);
}
function readFile(filename, options, cb = nop) {
  cb = typeof options === "function" ? options : cb;
  readFile$1.call(this, filename, typeof options === "function" ? null : options).then((data) => cb(void 0, data)).catch(cb);
}
function writeFile(filename, data, cbEncOpts, cb = nop) {
  cb = typeof cbEncOpts === "function" ? cbEncOpts : cb;
  writeFile$1.call(this, filename, data, typeof cbEncOpts != "function" ? cbEncOpts : null).then(() => cb(void 0)).catch(cb);
}
function appendFile(filename, data, cbEncOpts, cb = nop) {
  const optionsOrEncoding = typeof cbEncOpts != "function" ? cbEncOpts : void 0;
  cb = typeof cbEncOpts === "function" ? cbEncOpts : cb;
  appendFile$1.call(this, filename, data, optionsOrEncoding).then(() => cb()).catch(cb);
}
function fstat(fd2, options, cb = nop) {
  cb = typeof options == "function" ? options : cb;
  fd2file(fd2).stat().then((stats) => cb(void 0, typeof options == "object" && (options === null || options === void 0 ? void 0 : options.bigint) ? new BigIntStats(stats) : stats)).catch(cb);
}
function close(fd2, cb = nop) {
  const close2 = fd2file(fd2).close();
  fdMap.delete(fd2);
  close2.then(() => cb()).catch(cb);
}
function ftruncate(fd2, lenOrCB, cb = nop) {
  const length = typeof lenOrCB === "number" ? lenOrCB : 0;
  cb = typeof lenOrCB === "function" ? lenOrCB : cb;
  const file = fd2file(fd2);
  if (length < 0) {
    throw new ErrnoError(Errno.EINVAL);
  }
  file.truncate(length).then(() => cb()).catch(cb);
}
function fsync(fd2, cb = nop) {
  fd2file(fd2).sync().then(() => cb()).catch(cb);
}
function fdatasync(fd2, cb = nop) {
  fd2file(fd2).datasync().then(() => cb()).catch(cb);
}
function write(fd2, data, cbPosOff, cbLenEnc, cbPosEnc, cb = nop) {
  let buffer2, offset, length, position, encoding;
  const handle = new FileHandle(fd2, this);
  if (typeof data === "string") {
    encoding = "utf8";
    switch (typeof cbPosOff) {
      case "function":
        cb = cbPosOff;
        break;
      case "number":
        position = cbPosOff;
        encoding = typeof cbLenEnc === "string" ? cbLenEnc : "utf8";
        cb = typeof cbPosEnc === "function" ? cbPosEnc : cb;
        break;
      default:
        cb = typeof cbLenEnc === "function" ? cbLenEnc : typeof cbPosEnc === "function" ? cbPosEnc : cb;
        cb(new ErrnoError(Errno.EINVAL, "Invalid arguments"));
        return;
    }
    buffer2 = bufferExports.Buffer.from(data);
    offset = 0;
    length = buffer2.length;
    const _cb = cb;
    handle.write(buffer2, offset, length, position).then(({ bytesWritten }) => _cb(void 0, bytesWritten, buffer2.toString(encoding))).catch(_cb);
  } else {
    buffer2 = bufferExports.Buffer.from(data.buffer);
    offset = cbPosOff;
    length = cbLenEnc;
    position = typeof cbPosEnc === "number" ? cbPosEnc : null;
    const _cb = typeof cbPosEnc === "function" ? cbPosEnc : cb;
    void handle.write(buffer2, offset, length, position).then(({ bytesWritten }) => _cb(void 0, bytesWritten, buffer2)).catch(_cb);
  }
}
function read(fd2, buffer2, offset, length, position, cb = nop) {
  new FileHandle(fd2, this).read(buffer2, offset, length, position).then(({ bytesRead, buffer: buffer3 }) => cb(void 0, bytesRead, buffer3)).catch(cb);
}
function fchown(fd2, uid, gid, cb = nop) {
  new FileHandle(fd2, this).chown(uid, gid).then(() => cb()).catch(cb);
}
function fchmod(fd2, mode, cb) {
  new FileHandle(fd2, this).chmod(mode).then(() => cb()).catch(cb);
}
function futimes(fd2, atime, mtime, cb = nop) {
  new FileHandle(fd2, this).utimes(atime, mtime).then(() => cb()).catch(cb);
}
function rmdir(path, cb = nop) {
  rmdir$1.call(this, path).then(() => cb()).catch(cb);
}
function mkdir(path, mode, cb = nop) {
  mkdir$1.call(this, path, mode).then(() => cb()).catch(cb);
}
function readdir(path, _options, cb = nop) {
  cb = typeof _options == "function" ? _options : cb;
  const options = typeof _options != "function" ? _options : {};
  readdir$1.call(this, path, options).then((entries2) => cb(void 0, entries2)).catch(cb);
}
function link(existing, newpath, cb = nop) {
  link$1.call(this, existing, newpath).then(() => cb()).catch(cb);
}
function symlink(target, path, typeOrCB, cb = nop) {
  const type = typeof typeOrCB === "string" ? typeOrCB : "file";
  cb = typeof typeOrCB === "function" ? typeOrCB : cb;
  symlink$1.call(this, target, path, type).then(() => cb()).catch(cb);
}
function readlink(path, options, callback = nop) {
  callback = typeof options == "function" ? options : callback;
  readlink$1.call(this, path).then((result) => callback(void 0, result)).catch(callback);
}
function chown(path, uid, gid, cb = nop) {
  chown$1.call(this, path, uid, gid).then(() => cb()).catch(cb);
}
function lchown(path, uid, gid, cb = nop) {
  lchown$1.call(this, path, uid, gid).then(() => cb()).catch(cb);
}
function chmod(path, mode, cb = nop) {
  chmod$1.call(this, path, mode).then(() => cb()).catch(cb);
}
function lchmod(path, mode, cb = nop) {
  lchmod$1.call(this, path, mode).then(() => cb()).catch(cb);
}
function utimes(path, atime, mtime, cb = nop) {
  utimes$1.call(this, path, atime, mtime).then(() => cb()).catch(cb);
}
function lutimes(path, atime, mtime, cb = nop) {
  lutimes$1.call(this, path, atime, mtime).then(() => cb()).catch(cb);
}
function realpath(path, arg2, cb = nop) {
  cb = typeof arg2 === "function" ? arg2 : cb;
  realpath$1.call(this, path, typeof arg2 === "function" ? null : arg2).then((result) => cb(void 0, result)).catch(cb);
}
function access(path, cbMode, cb = nop) {
  const mode = typeof cbMode === "number" ? cbMode : R_OK;
  cb = typeof cbMode === "function" ? cbMode : cb;
  access$1.call(this, path, mode).then(() => cb()).catch(cb);
}
const statWatchers = /* @__PURE__ */ new Map();
function watchFile(path, options, listener) {
  const normalizedPath = normalizePath(path.toString());
  const opts = typeof options != "function" ? options : {};
  if (typeof options == "function") {
    listener = options;
  }
  if (!listener) {
    throw new ErrnoError(Errno.EINVAL, "No listener specified", path.toString(), "watchFile");
  }
  if (statWatchers.has(normalizedPath)) {
    const entry = statWatchers.get(normalizedPath);
    if (entry) {
      entry.listeners.add(listener);
    }
    return;
  }
  const watcher = new StatWatcher(this, normalizedPath, opts);
  watcher.on("change", (curr, prev) => {
    const entry = statWatchers.get(normalizedPath);
    if (!entry) {
      return;
    }
    for (const listener2 of entry.listeners) {
      listener2(curr, prev);
    }
  });
  statWatchers.set(normalizedPath, { watcher, listeners: /* @__PURE__ */ new Set() });
}
function unwatchFile(path, listener = nop) {
  const normalizedPath = normalizePath(path.toString());
  const entry = statWatchers.get(normalizedPath);
  if (entry) {
    if (listener && listener !== nop) {
      entry.listeners.delete(listener);
    } else {
      entry.listeners.clear();
    }
    if (entry.listeners.size === 0) {
      entry.watcher.stop();
      statWatchers.delete(normalizedPath);
    }
  }
}
function watch(path, options, listener) {
  const watcher = new FSWatcher(this, normalizePath(path), typeof options == "object" ? options : {});
  listener = typeof options == "function" ? options : listener;
  watcher.on("change", listener || nop);
  return watcher;
}
function createReadStream(path, options) {
  options = typeof options == "object" ? options : { encoding: options };
  const _handle = open$1.call(this, path, "r", options === null || options === void 0 ? void 0 : options.mode);
  return new ReadStream({ ...options, autoClose: true }, _handle);
}
function createWriteStream(path, options) {
  options = typeof options == "object" ? options : { encoding: options };
  const _handle = open$1.call(this, path, "w", options === null || options === void 0 ? void 0 : options.mode);
  return new WriteStream(options, _handle);
}
function rm(path, options, callback = nop) {
  callback = typeof options === "function" ? options : callback;
  rm$1.call(this, path, typeof options === "function" ? void 0 : options).then(() => callback(void 0)).catch(callback);
}
function mkdtemp(prefix, options, callback = nop) {
  callback = typeof options === "function" ? options : callback;
  mkdtemp$1.call(this, prefix, typeof options != "function" ? options : null).then((result) => callback(void 0, result)).catch(callback);
}
function copyFile(src, dest, flags, callback = nop) {
  callback = typeof flags === "function" ? flags : callback;
  copyFile$1.call(this, src, dest, typeof flags === "function" ? void 0 : flags).then(() => callback(void 0)).catch(callback);
}
function readv(fd2, buffers, position, cb = nop) {
  cb = typeof position === "function" ? position : cb;
  new FileHandle(fd2, this).readv(buffers, typeof position === "function" ? void 0 : position).then(({ buffers: buffers2, bytesRead }) => cb(void 0, bytesRead, buffers2)).catch(cb);
}
function writev(fd2, buffers, position, cb = nop) {
  cb = typeof position === "function" ? position : cb;
  new FileHandle(fd2, this).writev(buffers, typeof position === "function" ? void 0 : position).then(({ buffers: buffers2, bytesWritten }) => cb(void 0, bytesWritten, buffers2)).catch(cb);
}
function opendir(path, options, cb = nop) {
  cb = typeof options === "function" ? options : cb;
  opendir$1.call(this, path, typeof options === "function" ? void 0 : options).then((result) => cb(void 0, result)).catch(cb);
}
function cp(source, destination, opts, callback = nop) {
  callback = typeof opts === "function" ? opts : callback;
  cp$1.call(this, source, destination, typeof opts === "function" ? void 0 : opts).then(() => callback(void 0)).catch(callback);
}
function statfs(path, options, callback = nop) {
  callback = typeof options === "function" ? options : callback;
  statfs$1.call(this, path, typeof options === "function" ? void 0 : options).then((result) => callback(void 0, result)).catch(callback);
}
async function openAsBlob(path, options) {
  const handle = await open$1.call(this, path.toString(), "r");
  const buffer2 = await handle.readFile();
  await handle.close();
  return new Blob([buffer2], options);
}
function glob(pattern, options, callback = nop) {
  callback = typeof options == "function" ? options : callback;
  const it = glob$1.call(this, pattern, typeof options === "function" ? void 0 : options);
  collectAsyncIterator(it).then((results) => {
    var _a3;
    return callback(null, (_a3 = results) !== null && _a3 !== void 0 ? _a3 : []);
  }).catch((e) => callback(e));
}
function isMountConfig(arg) {
  return isBackendConfig(arg) || isBackend(arg) || arg instanceof FileSystem;
}
async function resolveMountConfig(configuration, _depth = 0) {
  if (typeof configuration !== "object" || configuration == null) {
    throw err$2(new ErrnoError(Errno.EINVAL, "Invalid options on mount configuration"));
  }
  if (!isMountConfig(configuration)) {
    throw err$2(new ErrnoError(Errno.EINVAL, "Invalid mount configuration"));
  }
  if (configuration instanceof FileSystem) {
    await configuration.ready();
    return configuration;
  }
  if (isBackend(configuration)) {
    configuration = { backend: configuration };
  }
  for (const [key2, value] of Object.entries(configuration)) {
    if (key2 == "backend")
      continue;
    if (!isMountConfig(value))
      continue;
    info("Resolving nested mount configuration: " + key2);
    if (_depth > 10) {
      throw err$2(new ErrnoError(Errno.EINVAL, "Invalid configuration, too deep and possibly infinite"));
    }
    configuration[key2] = await resolveMountConfig(value, ++_depth);
  }
  const { backend } = configuration;
  if (typeof backend.isAvailable == "function" && !await backend.isAvailable()) {
    throw err$2(new ErrnoError(Errno.EPERM, "Backend not available: " + backend.name));
  }
  await checkOptions(backend, configuration);
  const mount2 = await backend.create(configuration);
  if (configuration.disableAsyncCache)
    mount2.attributes.set("no_async");
  await mount2.ready();
  return mount2;
}
async function mount(path, mount2) {
  if (path == "/") {
    mount$1(path, mount2);
    return;
  }
  const stats = await stat$1(path).catch(() => null);
  if (!stats) {
    await mkdir$1(path, { recursive: true });
  } else if (!stats.isDirectory()) {
    throw ErrnoError.With("ENOTDIR", path, "configure");
  }
  mount$1(path, mount2);
}
async function configure(configuration) {
  var _a3;
  const uid = "uid" in configuration ? configuration.uid || 0 : 0;
  const gid = "gid" in configuration ? configuration.gid || 0 : 0;
  useCredentials({ uid, gid });
  config.checkAccess = !configuration.disableAccessChecks;
  config.updateOnRead = !configuration.disableUpdateOnRead;
  config.syncImmediately = !configuration.onlySyncOnClose;
  if (configuration.log)
    configure$1(configuration.log);
  if (configuration.mounts) {
    for (const [_point, mountConfig] of Object.entries(configuration.mounts).sort(([a], [b]) => a.length > b.length ? 1 : -1)) {
      const point = _point.startsWith("/") ? _point : "/" + _point;
      if (isBackendConfig(mountConfig)) {
        (_a3 = mountConfig.disableAsyncCache) !== null && _a3 !== void 0 ? _a3 : mountConfig.disableAsyncCache = configuration.disableAsyncCache || false;
      }
      if (point == "/")
        umount("/");
      await mount(point, await resolveMountConfig(mountConfig));
    }
  }
  if (configuration.addDevices) {
    const devfs = new DeviceFS();
    devfs.addDefaults();
    await devfs.ready();
    await mount("/dev", devfs);
  }
}
(function(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async });
  } else if (async) {
    env.stack.push({ async: true });
  }
  return value;
});
/* @__PURE__ */ (function(SuppressedError2) {
  return function(env) {
    function fail(e) {
      env.error = env.hasError ? new SuppressedError2(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  };
})(typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
const journalOperations = ["delete"];
Math.max(...journalOperations.map((op) => op.length));
const resourcesCache = /* @__PURE__ */ new Map();
async function _fetch(input, init2 = {}, bodyOptional = false) {
  const response = await fetch(input, init2).catch((error) => {
    throw { tag: "fetch", message: error.message };
  });
  if (!response.ok)
    throw { tag: "status", response };
  const raw = await response.arrayBuffer().catch((error) => {
    if (bodyOptional)
      return;
    throw { tag: "buffer", response, message: error.message };
  });
  return { response, data: raw ? new Uint8Array(raw) : void 0 };
}
async function get(url, options, init2 = {}) {
  var _a3, _b3;
  const req = new Request(url, init2);
  if (typeof options.start != "number" || typeof options.end != "number") {
    const { data } = await _fetch(url, init2);
    new Resource(url, data.byteLength, options, resourcesCache).add(data, 0);
    return data;
  }
  if (typeof options.size != "number") {
    (_a3 = options.warn) == null ? void 0 : _a3.call(options, url + ": Size not provided, an additional HEAD request is being made");
    const { headers } = await fetch(req, { method: "HEAD" });
    const size2 = parseInt(headers.get("Content-Length") ?? "");
    if (typeof size2 != "number")
      throw {
        tag: "size",
        message: "Response is missing content-length header and no size was provided"
      };
    options.size = size2;
  }
  const { size, start, end } = options;
  const resource = resourcesCache.get(url) ?? new Resource(url, size, options, resourcesCache);
  req.headers.set("If-Range", (/* @__PURE__ */ new Date()).toUTCString());
  for (const { start: from, end: to } of resource.missing(start, end)) {
    const { data, response } = await _fetch(req, { headers: { Range: `bytes=${from}-${to}` } });
    if (response.status == 206) {
      resource.add(data, from);
      continue;
    }
    (_b3 = options.warn) == null ? void 0 : _b3.call(options, url + ": Remote does not support range requests with bytes. Falling back to full data.");
    new Resource(url, size, options, resourcesCache).add(data, 0);
    return data.subarray(start, end);
  }
  resource.collect();
  const region = resource.regionAt(start);
  return region.data.subarray(start - region.offset, end - region.offset);
}
function getCached(url, options) {
  var _a3;
  const cache = resourcesCache.get(url);
  if (!cache) {
    if (options.size)
      return { data: new Uint8Array(0), missing: [{ start: 0, end: options.size ?? 0 }] };
    (_a3 = options.warn) == null ? void 0 : _a3.call(options, url + ": Size not provided and cache is empty, can not determine missing range");
    return { data: void 0, missing: [] };
  }
  const { start = 0, end = cache.size } = options;
  const data = new Uint8Array(end - start);
  for (const region of cache.regions) {
    if (region.offset + region.data.byteLength <= start)
      continue;
    if (region.offset >= end)
      break;
    for (const range of region.ranges) {
      if (range.end <= start)
        continue;
      if (range.start >= end)
        break;
      const overlapStart = Math.max(range.start, start);
      const overlapEnd = Math.min(range.end, end);
      if (overlapStart >= overlapEnd)
        continue;
      data.set(region.data.subarray(overlapStart - region.offset, overlapEnd - region.offset), overlapStart - start);
    }
  }
  return { data, missing: cache.missing(start, end) };
}
async function set(url, data, options, init2 = {}) {
  if (!resourcesCache.has(url)) {
    new Resource(url, options.size ?? data.byteLength, options, resourcesCache);
  }
  const resource = resourcesCache.get(url);
  const { offset = 0 } = options;
  if (!options.cacheOnly)
    await _fetch(new Request(url, init2), { method: "POST" }, true);
  resource.add(data, offset);
}
async function remove(url, options = {}, init2 = {}) {
  if (!options.cacheOnly)
    await _fetch(new Request(url, init2), { method: "DELETE" }, true);
  resourcesCache.delete(url);
}
class IndexFS extends FileSystem {
  constructor(id, name, index = new Index()) {
    super(id, name);
    this.index = index;
  }
  usage() {
    return this.index.usage();
  }
  /* node:coverage disable */
  /**
   * @deprecated
   */
  reloadFiles() {
    throw ErrnoError.With("ENOTSUP");
  }
  /**
   * @deprecated
   */
  reloadFilesSync() {
    throw ErrnoError.With("ENOTSUP");
  }
  /* node:coverage enable */
  /**
   * Finds all the paths in the index that need to be moved for a rename
   */
  pathsForRename(oldPath, newPath) {
    if (!this.index.has(oldPath))
      throw ErrnoError.With("ENOENT", oldPath, "rename");
    if ((dirname(newPath) + "/").startsWith(oldPath + "/"))
      throw ErrnoError.With("EBUSY", dirname(oldPath), "rename");
    const toRename = [];
    for (const [from, inode] of this.index.entries()) {
      const rel = relative(oldPath, from);
      if (rel.startsWith(".."))
        continue;
      let to = join(newPath, rel);
      if (to.endsWith("/"))
        to = to.slice(0, -1);
      toRename.push({ from, to, inode });
    }
    return toRename;
  }
  async rename(oldPath, newPath) {
    if (oldPath == newPath)
      return;
    for (const { from, to, inode } of this.pathsForRename(oldPath, newPath)) {
      const data = new Uint8Array(inode.size);
      await this.read(from, data, 0, inode.size);
      this.index.delete(from);
      this.index.set(to, inode);
      await this.write(to, data, 0);
    }
    await this.remove(oldPath);
  }
  renameSync(oldPath, newPath) {
    if (oldPath == newPath)
      return;
    for (const { from, to, inode } of this.pathsForRename(oldPath, newPath)) {
      const data = new Uint8Array(inode.size);
      this.readSync(from, data, 0, inode.size);
      this.index.delete(from);
      this.index.set(to, inode);
      this.writeSync(to, data, 0);
    }
    this.removeSync(oldPath);
  }
  async stat(path) {
    const inode = this.index.get(path);
    if (!inode)
      throw ErrnoError.With("ENOENT", path, "stat");
    return new Stats(inode);
  }
  statSync(path) {
    const inode = this.index.get(path);
    if (!inode)
      throw ErrnoError.With("ENOENT", path, "stat");
    return new Stats(inode);
  }
  async openFile(path, flag) {
    var _a3;
    const stats = (_a3 = this.index.get(path)) !== null && _a3 !== void 0 ? _a3 : _throw(ErrnoError.With("ENOENT", path, "openFile"));
    return new LazyFile(this, path, flag, stats);
  }
  openFileSync(path, flag) {
    var _a3;
    const stats = (_a3 = this.index.get(path)) !== null && _a3 !== void 0 ? _a3 : _throw(ErrnoError.With("ENOENT", path, "openFile"));
    return new LazyFile(this, path, flag, stats);
  }
  _remove(path, isUnlink) {
    const syscall = isUnlink ? "unlink" : "rmdir";
    const inode = this.index.get(path);
    if (!inode)
      throw ErrnoError.With("ENOENT", path, syscall);
    const isDir = (inode.mode & S_IFMT) == S_IFDIR;
    if (!isDir && !isUnlink)
      throw ErrnoError.With("ENOTDIR", path, syscall);
    if (isDir && isUnlink)
      throw ErrnoError.With("EISDIR", path, syscall);
    this.index.delete(path);
  }
  async unlink(path) {
    this._remove(path, true);
    await this.remove(path);
  }
  unlinkSync(path) {
    this._remove(path, true);
    this.removeSync(path);
  }
  async rmdir(path) {
    this._remove(path, false);
    await this.remove(path);
  }
  rmdirSync(path) {
    this._remove(path, false);
    this.removeSync(path);
  }
  create(path, options) {
    const syscall = (options.mode & S_IFMT) == S_IFDIR ? "mkdir" : "createFile";
    if (this.index.has(path))
      throw ErrnoError.With("EEXIST", path, syscall);
    const parent = this.index.get(dirname(path));
    if (!parent)
      throw ErrnoError.With("ENOENT", dirname(path), syscall);
    const id = this.index._alloc();
    const inode = new Inode({
      ino: id,
      data: id + 1,
      mode: options.mode,
      size: 0,
      uid: parent.mode & S_ISUID ? parent.uid : options.uid,
      gid: parent.mode & S_ISGID ? parent.gid : options.gid
    });
    this.index.set(path, inode);
    return inode;
  }
  async createFile(path, flag, mode, options) {
    const node = this.create(path, { mode: mode | S_IFREG, ...options });
    return new LazyFile(this, path, flag, node.toStats());
  }
  createFileSync(path, flag, mode, options) {
    const node = this.create(path, { mode: mode | S_IFREG, ...options });
    return new LazyFile(this, path, flag, node.toStats());
  }
  async mkdir(path, mode, options) {
    this.create(path, { mode: mode | S_IFDIR, ...options });
  }
  mkdirSync(path, mode, options) {
    this.create(path, { mode: mode | S_IFDIR, ...options });
  }
  link(target, link2) {
    throw ErrnoError.With("ENOSYS", link2, "link");
  }
  linkSync(target, link2) {
    throw ErrnoError.With("ENOSYS", link2, "link");
  }
  async readdir(path) {
    return Object.keys(this.index.directoryEntries(path));
  }
  readdirSync(path) {
    return Object.keys(this.index.directoryEntries(path));
  }
  async sync(path, data, stats) {
    var _a3;
    const inode = this.index.get(path);
    if (!inode)
      throw ErrnoError.With("ENOENT", path, "sync");
    if (inode.update(stats))
      await ((_a3 = this.syncMetadata) === null || _a3 === void 0 ? void 0 : _a3.call(this, path, stats));
    if (data)
      await this.write(path, data, 0);
  }
  syncSync(path, data, stats) {
    var _a3;
    const inode = this.index.get(path);
    if (!inode)
      throw ErrnoError.With("ENOENT", path, "sync");
    if (inode.update(stats))
      (_a3 = this.syncMetadataSync) === null || _a3 === void 0 ? void 0 : _a3.call(this, path, stats);
    if (data)
      this.writeSync(path, data, 0);
  }
}
function parseError(path, fs2) {
  return (error) => {
    if (!("tag" in error))
      throw err$2(new ErrnoError(Errno.EIO, error.stack, path), { fs: fs2 });
    switch (error.tag) {
      case "fetch":
        throw err$2(new ErrnoError(Errno.EREMOTEIO, error.message, path), { fs: fs2 });
      case "status":
        throw err$2(new ErrnoError(error.response.status > 500 ? Errno.EREMOTEIO : Errno.EIO, "Response status code is " + error.response.status, path), { fs: fs2 });
      case "size":
        throw err$2(new ErrnoError(Errno.EBADE, error.message, path), { fs: fs2 });
      case "buffer":
        throw err$2(new ErrnoError(Errno.EIO, "Failed to decode buffer", path), { fs: fs2 });
    }
  };
}
class FetchFS extends IndexFS {
  _async(p) {
    this._asyncDone = this._asyncDone.then(() => p);
  }
  constructor(index, baseUrl, requestInit = {}, remoteWrite) {
    super(544106099, "nfs", index);
    this.baseUrl = baseUrl;
    this.requestInit = requestInit;
    this.remoteWrite = remoteWrite;
    this._asyncDone = Promise.resolve();
  }
  async remove(path) {
    await remove(this.baseUrl + path, { cacheOnly: !this.remoteWrite }, this.requestInit);
  }
  removeSync(path) {
    this._async(remove(this.baseUrl + path, { cacheOnly: !this.remoteWrite }, this.requestInit));
  }
  async read(path, buffer2, offset = 0, end) {
    const inode = this.index.get(path);
    if (!inode)
      throw ErrnoError.With("ENOENT", path, "read");
    if (end - offset == 0)
      return;
    const data = await get(this.baseUrl + path, { start: offset, end, size: inode.size, warn }, this.requestInit).catch(parseError(path, this)).catch(() => void 0);
    if (!data)
      throw ErrnoError.With("ENODATA", path, "read");
    buffer2.set(data);
  }
  readSync(path, buffer2, offset = 0, end) {
    const inode = this.index.get(path);
    if (!inode)
      throw ErrnoError.With("ENOENT", path, "read");
    if (end - offset == 0)
      return;
    const { data, missing } = getCached(this.baseUrl + path, { start: offset, end, size: inode.size, warn });
    if (!data)
      throw ErrnoError.With("ENODATA", path, "read");
    if (missing.length) {
      this._async(get(this.baseUrl + path, { start: offset, end, size: inode.size, warn }));
      throw ErrnoError.With("EAGAIN", path, "read");
    }
    buffer2.set(data);
  }
  async write(path, data, offset) {
    const inode = this.index.get(path);
    if (!inode)
      throw ErrnoError.With("ENOENT", path, "write");
    inode.update({ mtimeMs: Date.now(), size: Math.max(inode.size, data.byteLength + offset) });
    await set(this.baseUrl + path, data, { offset, warn, cacheOnly: !this.remoteWrite }, this.requestInit).catch(parseError(path, this));
  }
  writeSync(path, data, offset) {
    const inode = this.index.get(path);
    if (!inode)
      throw ErrnoError.With("ENOENT", path, "write");
    inode.update({ mtimeMs: Date.now(), size: Math.max(inode.size, data.byteLength + offset) });
    this._async(set(this.baseUrl + path, data, { offset, warn, cacheOnly: !this.remoteWrite }, this.requestInit).catch(parseError(path, this)));
  }
}
const _Fetch = {
  name: "Fetch",
  options: {
    index: { type: ["string", "object"], required: false },
    baseUrl: { type: "string", required: true },
    requestInit: { type: "object", required: false },
    remoteWrite: { type: "boolean", required: false }
  },
  isAvailable() {
    return typeof globalThis.fetch == "function";
  },
  async create(options) {
    var _a3;
    const url = new URL(options.baseUrl);
    url.pathname = normalizePath(url.pathname);
    let baseUrl = url.toString();
    if (baseUrl.at(-1) == "/")
      baseUrl = baseUrl.slice(0, -1);
    (_a3 = options.index) !== null && _a3 !== void 0 ? _a3 : options.index = "index.json";
    const index = new Index();
    if (typeof options.index != "string") {
      index.fromJSON(options.index);
    } else {
      const data = await get(options.index, { warn }, options.requestInit).catch(parseError());
      index.fromJSON(JSON.parse(decodeUTF8(data)));
    }
    const fs2 = new FetchFS(index, baseUrl, options.requestInit, options.remoteWrite);
    if (options.disableAsyncCache)
      return fs2;
    for (const [path, node] of index) {
      if (!(node.mode & S_IFREG))
        continue;
      await get(baseUrl + path, { warn }, options.requestInit).catch(parseError(path, fs2));
    }
    return fs2;
  }
};
const Fetch = _Fetch;
(function(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async });
  } else if (async) {
    env.stack.push({ async: true });
  }
  return value;
});
/* @__PURE__ */ (function(SuppressedError2) {
  return function(env) {
    function fail(e) {
      env.error = env.hasError ? new SuppressedError2(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  };
})(typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
var __addDisposableResource = function(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async });
  } else if (async) {
    env.stack.push({ async: true });
  }
  return value;
};
var __disposeResources = /* @__PURE__ */ (function(SuppressedError2) {
  return function(env) {
    function fail(e) {
      env.error = env.hasError ? new SuppressedError2(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  };
})(typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
function Async(FS) {
  class AsyncFS extends FS {
    async done() {
      await this._promise;
    }
    queueDone() {
      return this.done();
    }
    _async(promise) {
      this._promise = this._promise.then(() => promise);
    }
    constructor(...args) {
      super(...args);
      this._promise = Promise.resolve();
      this._isInitialized = false;
      this._skippedCacheUpdates = 0;
      this._patchAsync();
    }
    async ready() {
      await super.ready();
      await this.queueDone();
      if (this._isInitialized || this.attributes.has("no_async"))
        return;
      this.checkSync();
      await this._sync.ready();
      if (this._sync instanceof StoreFS && this instanceof StoreFS) {
        const sync = this._sync.transaction();
        const async = this.transaction();
        const promises2 = [];
        for (const key2 of await async.keys()) {
          promises2.push(async.get(key2).then((data) => sync.setSync(key2, data)));
        }
        await Promise.all(promises2);
        this._isInitialized = true;
        return;
      }
      try {
        await this.crossCopy("/");
        debug(`Skipped ${this._skippedCacheUpdates} updates to the sync cache during initialization`);
        this._isInitialized = true;
      } catch (e) {
        this._isInitialized = false;
        throw crit(e, { fs: this });
      }
    }
    checkSync(path, syscall) {
      if (this.attributes.has("no_async")) {
        throw crit(new ErrnoError(Errno.ENOTSUP, "Sync preloading has been disabled for this async file system", path, syscall), {
          fs: this
        });
      }
      if (!this._sync) {
        throw crit(new ErrnoError(Errno.ENOTSUP, "No sync cache is attached to this async file system", path, syscall), { fs: this });
      }
    }
    renameSync(oldPath, newPath) {
      this.checkSync(oldPath, "rename");
      this._sync.renameSync(oldPath, newPath);
      this._async(this.rename(oldPath, newPath));
    }
    statSync(path) {
      this.checkSync(path, "stat");
      return this._sync.statSync(path);
    }
    createFileSync(path, flag, mode, options) {
      this.checkSync(path, "createFile");
      const file = this._sync.createFileSync(path, flag, mode, options);
      this._async(this.createFile(path, flag, mode, options));
      return new LazyFile(this, path, flag, file.statSync());
    }
    openFileSync(path, flag) {
      this.checkSync(path, "openFile");
      const stats = this._sync.statSync(path);
      return new LazyFile(this, path, flag, stats);
    }
    unlinkSync(path) {
      this.checkSync(path, "unlinkSync");
      this._sync.unlinkSync(path);
      this._async(this.unlink(path));
    }
    rmdirSync(path) {
      this.checkSync(path, "rmdir");
      this._sync.rmdirSync(path);
      this._async(this.rmdir(path));
    }
    mkdirSync(path, mode, options) {
      this.checkSync(path, "mkdir");
      this._sync.mkdirSync(path, mode, options);
      this._async(this.mkdir(path, mode, options));
    }
    readdirSync(path) {
      this.checkSync(path, "readdir");
      return this._sync.readdirSync(path);
    }
    linkSync(srcpath, dstpath) {
      this.checkSync(srcpath, "link");
      this._sync.linkSync(srcpath, dstpath);
      this._async(this.link(srcpath, dstpath));
    }
    syncSync(path, data, stats) {
      this.checkSync(path, "sync");
      this._sync.syncSync(path, data, stats);
      this._async(this.sync(path, data, stats));
    }
    existsSync(path) {
      this.checkSync(path, "exists");
      return this._sync.existsSync(path);
    }
    readSync(path, buffer2, offset, end) {
      this.checkSync(path, "read");
      this._sync.readSync(path, buffer2, offset, end);
    }
    writeSync(path, buffer2, offset) {
      this.checkSync(path, "write");
      this._sync.writeSync(path, buffer2, offset);
      this._async(this.write(path, buffer2, offset));
    }
    streamWrite(path, options) {
      this.checkSync(path, "streamWrite");
      const sync = this._sync.streamWrite(path, options).getWriter();
      const async = super.streamWrite(path, options).getWriter();
      return new WritableStream({
        async write(chunk, controller) {
          await Promise.all([sync.write(chunk), async.write(chunk)]).catch(controller.error.bind(controller));
        },
        async close() {
          await Promise.all([sync.close(), async.close()]);
        },
        async abort(reason) {
          await Promise.all([sync.abort(reason), async.abort(reason)]);
        }
      });
    }
    /**
     * @internal
     */
    async crossCopy(path) {
      this.checkSync(path, "crossCopy");
      const stats = await this.stat(path);
      if (!stats.isDirectory()) {
        const env_1 = { stack: [], error: void 0, hasError: false };
        try {
          const syncFile = __addDisposableResource(env_1, this._sync.createFileSync(path, parseFlag("w"), stats.mode, stats), false);
          const buffer2 = new Uint8Array(stats.size);
          await this.read(path, buffer2, 0, stats.size);
          syncFile.writeSync(buffer2, 0, stats.size);
          return;
        } catch (e_1) {
          env_1.error = e_1;
          env_1.hasError = true;
        } finally {
          __disposeResources(env_1);
        }
      }
      if (path !== "/") {
        const stats2 = await this.stat(path);
        this._sync.mkdirSync(path, stats2.mode, stats2);
      }
      const promises2 = [];
      for (const file of await this.readdir(path)) {
        promises2.push(this.crossCopy(join(path, file)));
      }
      await Promise.all(promises2);
    }
    /**
     * @internal
     * Patch all async methods to also call their synchronous counterparts unless called from themselves (either sync or async)
     */
    _patchAsync() {
      const methods = Array.from(getAllPrototypes(this)).flatMap(Object.getOwnPropertyNames).filter((key2) => typeof this[key2] == "function" && `${key2}Sync` in this);
      debug("Async: patching methods: " + methods.join(", "));
      for (const key2 of methods) {
        const originalMethod = this[key2];
        this[key2] = async (...args) => {
          var _a3, _b3, _c2;
          const result = await originalMethod.apply(this, args);
          const stack = (_a3 = new Error().stack) === null || _a3 === void 0 ? void 0 : _a3.split("\n").slice(2).join("\n");
          if ((stack === null || stack === void 0 ? void 0 : stack.includes(`at <computed> [as ${key2}]`)) || (stack === null || stack === void 0 ? void 0 : stack.includes(`${key2}Sync `)) || !stack)
            return result;
          if (!this._isInitialized) {
            this._skippedCacheUpdates++;
            return result;
          }
          try {
            (_c2 = (_b3 = this._sync) === null || _b3 === void 0 ? void 0 : _b3[`${key2}Sync`]) === null || _c2 === void 0 ? void 0 : _c2.call(_b3, ...args);
          } catch (e) {
            throw err$2(new ErrnoError(e.errno, e.message + " (Out of sync!)", e.path, key2), { fs: this });
          }
          return result;
        };
      }
    }
  }
  return AsyncFS;
}
const crc32cTable = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let value = i;
  for (let j = 0; j < 8; j++) {
    value = value & 1 ? 2197175160 ^ value >>> 1 : value >>> 1;
  }
  crc32cTable[i] = value;
}
function crc32c(data) {
  let crc = 4294967295;
  for (let i = 0; i < data.length; i++) {
    crc = crc >>> 8 ^ crc32cTable[(crc ^ data[i]) & 255];
  }
  return (crc ^ 4294967295) >>> 0;
}
var __esDecorate$6 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key2 = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context.access[p] = contextIn.access[p];
    context.addInitializer = function(f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key2], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field") initializers.unshift(_);
      else descriptor[key2] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers$6 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};
var __setFunctionName = function(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
let MetadataEntry = (() => {
  var _a3, _b3, _c2, _d;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _id_decorators;
  let _id_initializers = [];
  let _id_extraInitializers = [];
  let _offset__decorators;
  let _offset__initializers = [];
  let _offset__extraInitializers = [];
  let _offset_decorators;
  let _offset_initializers = [];
  let _offset_extraInitializers = [];
  let _size_decorators;
  let _size_initializers = [];
  let _size_extraInitializers = [];
  _classThis = class {
    constructor() {
      this.id = __runInitializers$6(this, _id_initializers, 0);
      this.offset_ = (__runInitializers$6(this, _id_extraInitializers), __runInitializers$6(this, _offset__initializers, 0));
      this.offset = (__runInitializers$6(this, _offset__extraInitializers), __runInitializers$6(this, _offset_initializers, 0));
      this.size = (__runInitializers$6(this, _offset_extraInitializers), __runInitializers$6(this, _size_initializers, 0));
      __runInitializers$6(this, _size_extraInitializers);
    }
  };
  __setFunctionName(_classThis, "MetadataEntry");
  (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _id_decorators = [(_a3 = types).uint32.bind(_a3)];
    _offset__decorators = [(_b3 = types).uint32.bind(_b3)];
    _offset_decorators = [(_c2 = types).uint32.bind(_c2)];
    _size_decorators = [(_d = types).uint32.bind(_d)];
    __esDecorate$6(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: (obj) => "id" in obj, get: (obj) => obj.id, set: (obj, value) => {
      obj.id = value;
    } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
    __esDecorate$6(null, null, _offset__decorators, { kind: "field", name: "offset_", static: false, private: false, access: { has: (obj) => "offset_" in obj, get: (obj) => obj.offset_, set: (obj, value) => {
      obj.offset_ = value;
    } }, metadata: _metadata }, _offset__initializers, _offset__extraInitializers);
    __esDecorate$6(null, null, _offset_decorators, { kind: "field", name: "offset", static: false, private: false, access: { has: (obj) => "offset" in obj, get: (obj) => obj.offset, set: (obj, value) => {
      obj.offset = value;
    } }, metadata: _metadata }, _offset_initializers, _offset_extraInitializers);
    __esDecorate$6(null, null, _size_decorators, { kind: "field", name: "size", static: false, private: false, access: { has: (obj) => "size" in obj, get: (obj) => obj.size, set: (obj, value) => {
      obj.size = value;
    } }, metadata: _metadata }, _size_initializers, _size_extraInitializers);
    __esDecorate$6(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers$6(_classThis, _classExtraInitializers);
  })();
  return _classThis;
})();
const entries_per_block = 255;
let MetadataBlock = (() => {
  var _a3, _b3, _c2, _d;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _checksum_decorators;
  let _checksum_initializers = [];
  let _checksum_extraInitializers = [];
  let _timestamp_decorators;
  let _timestamp_initializers = [];
  let _timestamp_extraInitializers = [];
  let _previous_offset__decorators;
  let _previous_offset__initializers = [];
  let _previous_offset__extraInitializers = [];
  let _previous_offset_decorators;
  let _previous_offset_initializers = [];
  let _previous_offset_extraInitializers = [];
  let _entries_decorators;
  let _entries_initializers = [];
  let _entries_extraInitializers = [];
  var MetadataBlock2 = _classThis = class {
    constructor(superblock, offset = 0) {
      this.superblock = superblock;
      this.offset = offset;
      this.checksum = __runInitializers$6(this, _checksum_initializers, 0);
      this.timestamp = (__runInitializers$6(this, _checksum_extraInitializers), __runInitializers$6(this, _timestamp_initializers, Date.now()));
      this.previous_offset_ = (__runInitializers$6(this, _timestamp_extraInitializers), __runInitializers$6(this, _previous_offset__initializers, 0));
      this.previous_offset = (__runInitializers$6(this, _previous_offset__extraInitializers), __runInitializers$6(this, _previous_offset_initializers, 0));
      this._previous = __runInitializers$6(this, _previous_offset_extraInitializers);
      this.entries = __runInitializers$6(this, _entries_initializers, Array.from({ length: entries_per_block }, () => new MetadataEntry()));
      __runInitializers$6(this, _entries_extraInitializers);
      this.superblock = superblock;
      this.offset = offset;
      if (!offset)
        return;
      deserialize(this, superblock.store._buffer.subarray(offset, offset + sizeof(MetadataBlock2)));
      if (!checksumMatches(this))
        throw crit(new ErrnoError(Errno.EIO, "SingleBuffer: Checksum mismatch for metadata block at 0x" + offset.toString(16)));
    }
    get previous() {
      var _a4;
      if (!this.previous_offset)
        return;
      (_a4 = this._previous) !== null && _a4 !== void 0 ? _a4 : this._previous = new MetadataBlock2(this.superblock, this.previous_offset);
      return this._previous;
    }
  };
  __setFunctionName(_classThis, "MetadataBlock");
  (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _checksum_decorators = [(_a3 = types).uint32.bind(_a3)];
    _timestamp_decorators = [(_b3 = types).uint32.bind(_b3)];
    _previous_offset__decorators = [(_c2 = types).uint32.bind(_c2)];
    _previous_offset_decorators = [(_d = types).uint32.bind(_d)];
    _entries_decorators = [member(MetadataEntry, entries_per_block)];
    __esDecorate$6(null, null, _checksum_decorators, { kind: "field", name: "checksum", static: false, private: false, access: { has: (obj) => "checksum" in obj, get: (obj) => obj.checksum, set: (obj, value) => {
      obj.checksum = value;
    } }, metadata: _metadata }, _checksum_initializers, _checksum_extraInitializers);
    __esDecorate$6(null, null, _timestamp_decorators, { kind: "field", name: "timestamp", static: false, private: false, access: { has: (obj) => "timestamp" in obj, get: (obj) => obj.timestamp, set: (obj, value) => {
      obj.timestamp = value;
    } }, metadata: _metadata }, _timestamp_initializers, _timestamp_extraInitializers);
    __esDecorate$6(null, null, _previous_offset__decorators, { kind: "field", name: "previous_offset_", static: false, private: false, access: { has: (obj) => "previous_offset_" in obj, get: (obj) => obj.previous_offset_, set: (obj, value) => {
      obj.previous_offset_ = value;
    } }, metadata: _metadata }, _previous_offset__initializers, _previous_offset__extraInitializers);
    __esDecorate$6(null, null, _previous_offset_decorators, { kind: "field", name: "previous_offset", static: false, private: false, access: { has: (obj) => "previous_offset" in obj, get: (obj) => obj.previous_offset, set: (obj, value) => {
      obj.previous_offset = value;
    } }, metadata: _metadata }, _previous_offset_initializers, _previous_offset_extraInitializers);
    __esDecorate$6(null, null, _entries_decorators, { kind: "field", name: "entries", static: false, private: false, access: { has: (obj) => "entries" in obj, get: (obj) => obj.entries, set: (obj, value) => {
      obj.entries = value;
    } }, metadata: _metadata }, _entries_initializers, _entries_extraInitializers);
    __esDecorate$6(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    MetadataBlock2 = _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers$6(_classThis, _classExtraInitializers);
  })();
  return MetadataBlock2 = _classThis;
})();
const sb_magic = 2049864546;
(() => {
  var _a3, _b3, _c2, _d, _e, _f, _g, _h, _j, _k, _l;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _checksum_decorators;
  let _checksum_initializers = [];
  let _checksum_extraInitializers = [];
  let _magic_decorators;
  let _magic_initializers = [];
  let _magic_extraInitializers = [];
  let _version_decorators;
  let _version_initializers = [];
  let _version_extraInitializers = [];
  let _inode_format_decorators;
  let _inode_format_initializers = [];
  let _inode_format_extraInitializers = [];
  let _flags_decorators;
  let _flags_initializers = [];
  let _flags_extraInitializers = [];
  let _used_bytes_decorators;
  let _used_bytes_initializers = [];
  let _used_bytes_extraInitializers = [];
  let _total_bytes_decorators;
  let _total_bytes_initializers = [];
  let _total_bytes_extraInitializers = [];
  let _id_decorators;
  let _id_initializers = [];
  let _id_extraInitializers = [];
  let _metadata_block_size_decorators;
  let _metadata_block_size_initializers = [];
  let _metadata_block_size_extraInitializers = [];
  let _metadata_offset__decorators;
  let _metadata_offset__initializers = [];
  let _metadata_offset__extraInitializers = [];
  let _metadata_offset_decorators;
  let _metadata_offset_initializers = [];
  let _metadata_offset_extraInitializers = [];
  let _label_decorators;
  let _label_initializers = [];
  let _label_extraInitializers = [];
  let __padding_decorators;
  let __padding_initializers = [];
  let __padding_extraInitializers = [];
  var SuperBlock = _classThis = class {
    constructor(store) {
      this.store = store;
      this.checksum = __runInitializers$6(this, _checksum_initializers, 0);
      this.magic = (__runInitializers$6(this, _checksum_extraInitializers), __runInitializers$6(this, _magic_initializers, sb_magic));
      this.version = (__runInitializers$6(this, _magic_extraInitializers), __runInitializers$6(this, _version_initializers, 1));
      this.inode_format = (__runInitializers$6(this, _version_extraInitializers), __runInitializers$6(this, _inode_format_initializers, _inode_version));
      this.flags = (__runInitializers$6(this, _inode_format_extraInitializers), __runInitializers$6(this, _flags_initializers, 0));
      this.used_bytes = (__runInitializers$6(this, _flags_extraInitializers), __runInitializers$6(this, _used_bytes_initializers, BigInt(0)));
      this.total_bytes = (__runInitializers$6(this, _used_bytes_extraInitializers), __runInitializers$6(this, _total_bytes_initializers, BigInt(0)));
      this.id = (__runInitializers$6(this, _total_bytes_extraInitializers), __runInitializers$6(this, _id_initializers, BigInt(0)));
      this.metadata_block_size = (__runInitializers$6(this, _id_extraInitializers), __runInitializers$6(this, _metadata_block_size_initializers, sizeof(MetadataBlock)));
      this.metadata_offset_ = (__runInitializers$6(this, _metadata_block_size_extraInitializers), __runInitializers$6(this, _metadata_offset__initializers, 0));
      this.metadata_offset = (__runInitializers$6(this, _metadata_offset__extraInitializers), __runInitializers$6(this, _metadata_offset_initializers, 0));
      this.metadata = __runInitializers$6(this, _metadata_offset_extraInitializers);
      this.label = __runInitializers$6(this, _label_initializers, "");
      this._padding = (__runInitializers$6(this, _label_extraInitializers), __runInitializers$6(this, __padding_initializers, new Array(132).fill(0)));
      __runInitializers$6(this, __padding_extraInitializers);
      this.store = store;
      if (store._view.getUint32(offsetof(SuperBlock, "magic"), true) != sb_magic) {
        warn("SingleBuffer: Invalid magic value, assuming this is a fresh super block");
        this.metadata = new MetadataBlock(this);
        this.used_bytes = BigInt(sizeof(SuperBlock) + sizeof(MetadataBlock));
        this.total_bytes = BigInt(store._buffer.byteLength);
        store._write(this);
        store._write(this.metadata);
        return;
      }
      deserialize(this, store._buffer.subarray(0, sizeof(SuperBlock)));
      if (!checksumMatches(this))
        throw crit(new ErrnoError(Errno.EIO, "SingleBuffer: Checksum mismatch for super block!"));
      this.metadata = new MetadataBlock(this, this.metadata_offset);
    }
    /**
     * Rotate out the current metadata block.
     * Allocates a new metadata block, moves the current one to backup,
     * and updates used_bytes accordingly.
     * @returns the new metadata block
     */
    rotateMetadata() {
      const metadata = new MetadataBlock(this);
      metadata.offset = Number(this.used_bytes);
      metadata.previous_offset = this.metadata_offset;
      this.metadata = metadata;
      this.metadata_offset = metadata.offset;
      this.store._write(metadata);
      this.used_bytes += BigInt(sizeof(MetadataBlock));
      this.store._write(this);
      return metadata;
    }
    /**
     * Checks to see if `length` bytes are unused, starting at `offset`.
     * @internal Not for external use!
     */
    isUnused(offset, length) {
      if (!length)
        return true;
      if (offset + length > this.total_bytes || offset < sizeof(SuperBlock))
        return false;
      for (let block = this.metadata; block; block = block.previous) {
        if (offset < block.offset + sizeof(MetadataBlock) && offset + length > block.offset)
          return false;
        for (const entry of block.entries) {
          if (!entry.offset)
            continue;
          if (offset >= entry.offset && offset < entry.offset + entry.size || offset + length > entry.offset && offset + length <= entry.offset + entry.size || offset <= entry.offset && offset + length >= entry.offset + entry.size) {
            return false;
          }
        }
      }
      return true;
    }
  };
  __setFunctionName(_classThis, "SuperBlock");
  (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _checksum_decorators = [(_a3 = types).uint32.bind(_a3)];
    _magic_decorators = [(_b3 = types).uint32.bind(_b3)];
    _version_decorators = [(_c2 = types).uint16.bind(_c2)];
    _inode_format_decorators = [(_d = types).uint16.bind(_d)];
    _flags_decorators = [(_e = types).uint32.bind(_e)];
    _used_bytes_decorators = [(_f = types).uint64.bind(_f)];
    _total_bytes_decorators = [(_g = types).uint64.bind(_g)];
    _id_decorators = [(_h = types).uint128.bind(_h)];
    _metadata_block_size_decorators = [(_j = types).uint32.bind(_j)];
    _metadata_offset__decorators = [(_k = types).uint32.bind(_k)];
    _metadata_offset_decorators = [(_l = types).uint32.bind(_l)];
    _label_decorators = [types.char(64)];
    __padding_decorators = [types.char(132)];
    __esDecorate$6(null, null, _checksum_decorators, { kind: "field", name: "checksum", static: false, private: false, access: { has: (obj) => "checksum" in obj, get: (obj) => obj.checksum, set: (obj, value) => {
      obj.checksum = value;
    } }, metadata: _metadata }, _checksum_initializers, _checksum_extraInitializers);
    __esDecorate$6(null, null, _magic_decorators, { kind: "field", name: "magic", static: false, private: false, access: { has: (obj) => "magic" in obj, get: (obj) => obj.magic, set: (obj, value) => {
      obj.magic = value;
    } }, metadata: _metadata }, _magic_initializers, _magic_extraInitializers);
    __esDecorate$6(null, null, _version_decorators, { kind: "field", name: "version", static: false, private: false, access: { has: (obj) => "version" in obj, get: (obj) => obj.version, set: (obj, value) => {
      obj.version = value;
    } }, metadata: _metadata }, _version_initializers, _version_extraInitializers);
    __esDecorate$6(null, null, _inode_format_decorators, { kind: "field", name: "inode_format", static: false, private: false, access: { has: (obj) => "inode_format" in obj, get: (obj) => obj.inode_format, set: (obj, value) => {
      obj.inode_format = value;
    } }, metadata: _metadata }, _inode_format_initializers, _inode_format_extraInitializers);
    __esDecorate$6(null, null, _flags_decorators, { kind: "field", name: "flags", static: false, private: false, access: { has: (obj) => "flags" in obj, get: (obj) => obj.flags, set: (obj, value) => {
      obj.flags = value;
    } }, metadata: _metadata }, _flags_initializers, _flags_extraInitializers);
    __esDecorate$6(null, null, _used_bytes_decorators, { kind: "field", name: "used_bytes", static: false, private: false, access: { has: (obj) => "used_bytes" in obj, get: (obj) => obj.used_bytes, set: (obj, value) => {
      obj.used_bytes = value;
    } }, metadata: _metadata }, _used_bytes_initializers, _used_bytes_extraInitializers);
    __esDecorate$6(null, null, _total_bytes_decorators, { kind: "field", name: "total_bytes", static: false, private: false, access: { has: (obj) => "total_bytes" in obj, get: (obj) => obj.total_bytes, set: (obj, value) => {
      obj.total_bytes = value;
    } }, metadata: _metadata }, _total_bytes_initializers, _total_bytes_extraInitializers);
    __esDecorate$6(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: (obj) => "id" in obj, get: (obj) => obj.id, set: (obj, value) => {
      obj.id = value;
    } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
    __esDecorate$6(null, null, _metadata_block_size_decorators, { kind: "field", name: "metadata_block_size", static: false, private: false, access: { has: (obj) => "metadata_block_size" in obj, get: (obj) => obj.metadata_block_size, set: (obj, value) => {
      obj.metadata_block_size = value;
    } }, metadata: _metadata }, _metadata_block_size_initializers, _metadata_block_size_extraInitializers);
    __esDecorate$6(null, null, _metadata_offset__decorators, { kind: "field", name: "metadata_offset_", static: false, private: false, access: { has: (obj) => "metadata_offset_" in obj, get: (obj) => obj.metadata_offset_, set: (obj, value) => {
      obj.metadata_offset_ = value;
    } }, metadata: _metadata }, _metadata_offset__initializers, _metadata_offset__extraInitializers);
    __esDecorate$6(null, null, _metadata_offset_decorators, { kind: "field", name: "metadata_offset", static: false, private: false, access: { has: (obj) => "metadata_offset" in obj, get: (obj) => obj.metadata_offset, set: (obj, value) => {
      obj.metadata_offset = value;
    } }, metadata: _metadata }, _metadata_offset_initializers, _metadata_offset_extraInitializers);
    __esDecorate$6(null, null, _label_decorators, { kind: "field", name: "label", static: false, private: false, access: { has: (obj) => "label" in obj, get: (obj) => obj.label, set: (obj, value) => {
      obj.label = value;
    } }, metadata: _metadata }, _label_initializers, _label_extraInitializers);
    __esDecorate$6(null, null, __padding_decorators, { kind: "field", name: "_padding", static: false, private: false, access: { has: (obj) => "_padding" in obj, get: (obj) => obj._padding, set: (obj, value) => {
      obj._padding = value;
    } }, metadata: _metadata }, __padding_initializers, __padding_extraInitializers);
    __esDecorate$6(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    SuperBlock = _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers$6(_classThis, _classExtraInitializers);
  })();
  return SuperBlock = _classThis;
})();
function checksumMatches(value) {
  const buffer2 = serialize(value);
  const computed = crc32c(buffer2.subarray(4));
  return value.checksum === computed;
}
(function(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() {
      try {
        inner.call(this);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    env.stack.push({ value, dispose, async });
  } else if (async) {
    env.stack.push({ async: true });
  }
  return value;
});
/* @__PURE__ */ (function(SuppressedError2) {
  return function(env) {
    function fail(e) {
      env.error = env.hasError ? new SuppressedError2(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  };
})(typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
function Readonly(FS) {
  class ReadonlyFS extends FS {
    constructor(...args) {
      super(...args);
      this.attributes.set("no_write");
    }
    async rename() {
      throw new ErrnoError(Errno.EROFS);
    }
    renameSync() {
      throw new ErrnoError(Errno.EROFS);
    }
    async createFile() {
      throw new ErrnoError(Errno.EROFS);
    }
    createFileSync() {
      throw new ErrnoError(Errno.EROFS);
    }
    async unlink() {
      throw new ErrnoError(Errno.EROFS);
    }
    unlinkSync() {
      throw new ErrnoError(Errno.EROFS);
    }
    async rmdir() {
      throw new ErrnoError(Errno.EROFS);
    }
    rmdirSync() {
      throw new ErrnoError(Errno.EROFS);
    }
    async mkdir() {
      throw new ErrnoError(Errno.EROFS);
    }
    mkdirSync() {
      throw new ErrnoError(Errno.EROFS);
    }
    async link() {
      throw new ErrnoError(Errno.EROFS);
    }
    linkSync() {
      throw new ErrnoError(Errno.EROFS);
    }
    async sync() {
      throw new ErrnoError(Errno.EROFS);
    }
    syncSync() {
      throw new ErrnoError(Errno.EROFS);
    }
    async write() {
      throw new ErrnoError(Errno.EROFS);
    }
    writeSync() {
      throw new ErrnoError(Errno.EROFS);
    }
    streamWrite() {
      throw new ErrnoError(Errno.EROFS);
    }
  }
  return ReadonlyFS;
}
function Sync(FS) {
  class SyncFS extends FS {
    async exists(path) {
      return this.existsSync(path);
    }
    async rename(oldPath, newPath) {
      return this.renameSync(oldPath, newPath);
    }
    async stat(path) {
      return this.statSync(path);
    }
    async createFile(path, flag, mode, options) {
      return this.createFileSync(path, flag, mode, options);
    }
    async openFile(path, flag) {
      return this.openFileSync(path, flag);
    }
    async unlink(path) {
      return this.unlinkSync(path);
    }
    async rmdir(path) {
      return this.rmdirSync(path);
    }
    async mkdir(path, mode, options) {
      return this.mkdirSync(path, mode, options);
    }
    async readdir(path) {
      return this.readdirSync(path);
    }
    async link(srcpath, dstpath) {
      return this.linkSync(srcpath, dstpath);
    }
    async sync(path, data, stats) {
      return this.syncSync(path, data, stats);
    }
    async read(path, buffer2, offset, end) {
      return this.readSync(path, buffer2, offset, end);
    }
    async write(path, buffer2, offset) {
      return this.writeSync(path, buffer2, offset);
    }
  }
  return SyncFS;
}
globalThis.__zenfs__ = fs;
var FileFlags;
(function(FileFlags2) {
  FileFlags2[FileFlags2["Hidden"] = 1] = "Hidden";
  FileFlags2[FileFlags2["Directory"] = 2] = "Directory";
  FileFlags2[FileFlags2["AssociatedFile"] = 4] = "AssociatedFile";
  FileFlags2[FileFlags2["EARContainsInfo"] = 8] = "EARContainsInfo";
  FileFlags2[FileFlags2["EARContainsPerms"] = 16] = "EARContainsPerms";
  FileFlags2[FileFlags2["FinalDirectoryRecordForFile"] = 32] = "FinalDirectoryRecordForFile";
})(FileFlags || (FileFlags = {}));
const rockRidgeIdentifier = "IEEE_P1282";
var __esDecorate$5 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key2 = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context.access[p] = contextIn.access[p];
    context.addInitializer = function(f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key2], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field") initializers.unshift(_);
      else descriptor[key2] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers$5 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};
var SLComponentFlags;
(function(SLComponentFlags2) {
  SLComponentFlags2[SLComponentFlags2["CONTINUE"] = 1] = "CONTINUE";
  SLComponentFlags2[SLComponentFlags2["CURRENT"] = 2] = "CURRENT";
  SLComponentFlags2[SLComponentFlags2["PARENT"] = 4] = "PARENT";
  SLComponentFlags2[SLComponentFlags2["ROOT"] = 8] = "ROOT";
})(SLComponentFlags || (SLComponentFlags = {}));
let SLComponentRecord = (() => {
  var _a4;
  var _a3, _b3;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _flags_decorators;
  let _flags_initializers = [];
  let _flags_extraInitializers = [];
  let _componentLength_decorators;
  let _componentLength_initializers = [];
  let _componentLength_extraInitializers = [];
  _a4 = class {
    constructor(data) {
      __publicField(this, "data");
      __publicField(this, "flags", __runInitializers$5(this, _flags_initializers, void 0));
      __publicField(this, "componentLength", (__runInitializers$5(this, _flags_extraInitializers), __runInitializers$5(this, _componentLength_initializers, void 0)));
      __runInitializers$5(this, _componentLength_extraInitializers);
      this.data = data;
    }
    get length() {
      return 2 + this.componentLength;
    }
    content(getString) {
      return getString(this.data.slice(2, 2 + this.componentLength));
    }
  }, _classThis = _a4, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _flags_decorators = [(_a3 = types).uint8.bind(_a3)];
    _componentLength_decorators = [(_b3 = types).uint8.bind(_b3)];
    __esDecorate$5(null, null, _flags_decorators, { kind: "field", name: "flags", static: false, private: false, access: { has: (obj) => "flags" in obj, get: (obj) => obj.flags, set: (obj, value) => {
      obj.flags = value;
    } }, metadata: _metadata }, _flags_initializers, _flags_extraInitializers);
    __esDecorate$5(null, null, _componentLength_decorators, { kind: "field", name: "componentLength", static: false, private: false, access: { has: (obj) => "componentLength" in obj, get: (obj) => obj.componentLength, set: (obj, value) => {
      obj.componentLength = value;
    } }, metadata: _metadata }, _componentLength_initializers, _componentLength_extraInitializers);
    __esDecorate$5(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers$5(_classThis, _classExtraInitializers);
  })(), _a4;
  return _classThis;
})();
var __esDecorate$4 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key2 = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context.access[p] = contextIn.access[p];
    context.addInitializer = function(f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key2], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field") initializers.unshift(_);
      else descriptor[key2] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers$4 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};
let LongFormDate = (() => {
  var _a4;
  var _a3;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let __year_decorators;
  let __year_initializers = [];
  let __year_extraInitializers = [];
  let __month_decorators;
  let __month_initializers = [];
  let __month_extraInitializers = [];
  let __day_decorators;
  let __day_initializers = [];
  let __day_extraInitializers = [];
  let __hour_decorators;
  let __hour_initializers = [];
  let __hour_extraInitializers = [];
  let __minute_decorators;
  let __minute_initializers = [];
  let __minute_extraInitializers = [];
  let __second_decorators;
  let __second_initializers = [];
  let __second_extraInitializers = [];
  let __centisecond_decorators;
  let __centisecond_initializers = [];
  let __centisecond_extraInitializers = [];
  let _offsetFromGMT_decorators;
  let _offsetFromGMT_initializers = [];
  let _offsetFromGMT_extraInitializers = [];
  _a4 = class {
    constructor() {
      __publicField(this, "_year", __runInitializers$4(this, __year_initializers, ""));
      __publicField(this, "_month", (__runInitializers$4(this, __year_extraInitializers), __runInitializers$4(this, __month_initializers, "")));
      __publicField(this, "_day", (__runInitializers$4(this, __month_extraInitializers), __runInitializers$4(this, __day_initializers, "")));
      __publicField(this, "_hour", (__runInitializers$4(this, __day_extraInitializers), __runInitializers$4(this, __hour_initializers, "")));
      __publicField(this, "_minute", (__runInitializers$4(this, __hour_extraInitializers), __runInitializers$4(this, __minute_initializers, "")));
      __publicField(this, "_second", (__runInitializers$4(this, __minute_extraInitializers), __runInitializers$4(this, __second_initializers, "")));
      __publicField(this, "_centisecond", (__runInitializers$4(this, __second_extraInitializers), __runInitializers$4(this, __centisecond_initializers, "")));
      __publicField(this, "offsetFromGMT", (__runInitializers$4(this, __centisecond_extraInitializers), __runInitializers$4(this, _offsetFromGMT_initializers, void 0)));
      __runInitializers$4(this, _offsetFromGMT_extraInitializers);
    }
    get year() {
      return parseInt(this._year);
    }
    set year(value) {
      this._year = value.toFixed();
    }
    get month() {
      return parseInt(this._month);
    }
    set month(value) {
      this._month = value.toFixed();
    }
    get day() {
      return parseInt(this._day);
    }
    set day(value) {
      this._day = value.toFixed();
    }
    get hour() {
      return parseInt(this._hour);
    }
    set hour(value) {
      this._hour = value.toFixed();
    }
    get minute() {
      return parseInt(this._minute);
    }
    set minute(value) {
      this._minute = value.toFixed();
    }
    get second() {
      return parseInt(this._second);
    }
    set second(value) {
      this._second = value.toFixed();
    }
    get centisecond() {
      return parseInt(this._centisecond);
    }
    set centisecond(value) {
      this._centisecond = value.toFixed();
    }
    get date() {
      return new Date(this.year, this.month, this.day, this.hour, this.minute, this.second, this.centisecond * 10);
    }
  }, _classThis = _a4, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    __year_decorators = [types.char(4)];
    __month_decorators = [types.char(2)];
    __day_decorators = [types.char(2)];
    __hour_decorators = [types.char(2)];
    __minute_decorators = [types.char(2)];
    __second_decorators = [types.char(2)];
    __centisecond_decorators = [types.char(2)];
    _offsetFromGMT_decorators = [(_a3 = types).uint8.bind(_a3)];
    __esDecorate$4(null, null, __year_decorators, { kind: "field", name: "_year", static: false, private: false, access: { has: (obj) => "_year" in obj, get: (obj) => obj._year, set: (obj, value) => {
      obj._year = value;
    } }, metadata: _metadata }, __year_initializers, __year_extraInitializers);
    __esDecorate$4(null, null, __month_decorators, { kind: "field", name: "_month", static: false, private: false, access: { has: (obj) => "_month" in obj, get: (obj) => obj._month, set: (obj, value) => {
      obj._month = value;
    } }, metadata: _metadata }, __month_initializers, __month_extraInitializers);
    __esDecorate$4(null, null, __day_decorators, { kind: "field", name: "_day", static: false, private: false, access: { has: (obj) => "_day" in obj, get: (obj) => obj._day, set: (obj, value) => {
      obj._day = value;
    } }, metadata: _metadata }, __day_initializers, __day_extraInitializers);
    __esDecorate$4(null, null, __hour_decorators, { kind: "field", name: "_hour", static: false, private: false, access: { has: (obj) => "_hour" in obj, get: (obj) => obj._hour, set: (obj, value) => {
      obj._hour = value;
    } }, metadata: _metadata }, __hour_initializers, __hour_extraInitializers);
    __esDecorate$4(null, null, __minute_decorators, { kind: "field", name: "_minute", static: false, private: false, access: { has: (obj) => "_minute" in obj, get: (obj) => obj._minute, set: (obj, value) => {
      obj._minute = value;
    } }, metadata: _metadata }, __minute_initializers, __minute_extraInitializers);
    __esDecorate$4(null, null, __second_decorators, { kind: "field", name: "_second", static: false, private: false, access: { has: (obj) => "_second" in obj, get: (obj) => obj._second, set: (obj, value) => {
      obj._second = value;
    } }, metadata: _metadata }, __second_initializers, __second_extraInitializers);
    __esDecorate$4(null, null, __centisecond_decorators, { kind: "field", name: "_centisecond", static: false, private: false, access: { has: (obj) => "_centisecond" in obj, get: (obj) => obj._centisecond, set: (obj, value) => {
      obj._centisecond = value;
    } }, metadata: _metadata }, __centisecond_initializers, __centisecond_extraInitializers);
    __esDecorate$4(null, null, _offsetFromGMT_decorators, { kind: "field", name: "offsetFromGMT", static: false, private: false, access: { has: (obj) => "offsetFromGMT" in obj, get: (obj) => obj.offsetFromGMT, set: (obj, value) => {
      obj.offsetFromGMT = value;
    } }, metadata: _metadata }, _offsetFromGMT_initializers, _offsetFromGMT_extraInitializers);
    __esDecorate$4(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers$4(_classThis, _classExtraInitializers);
  })(), _a4;
  return _classThis;
})();
let ShortFormDate = (() => {
  var _a4;
  var _a3, _b3, _c2, _d, _e, _f, _g;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _year_decorators;
  let _year_initializers = [];
  let _year_extraInitializers = [];
  let _month_decorators;
  let _month_initializers = [];
  let _month_extraInitializers = [];
  let _day_decorators;
  let _day_initializers = [];
  let _day_extraInitializers = [];
  let _hour_decorators;
  let _hour_initializers = [];
  let _hour_extraInitializers = [];
  let _minute_decorators;
  let _minute_initializers = [];
  let _minute_extraInitializers = [];
  let _second_decorators;
  let _second_initializers = [];
  let _second_extraInitializers = [];
  let _offsetFromGMT_decorators;
  let _offsetFromGMT_initializers = [];
  let _offsetFromGMT_extraInitializers = [];
  _a4 = class {
    constructor() {
      /**
       * Years since 1990
       * @todo This may not be the correct size
       * @see https://wiki.osdev.org/ISO_9660
       */
      __publicField(this, "year", __runInitializers$4(this, _year_initializers, void 0));
      __publicField(this, "month", (__runInitializers$4(this, _year_extraInitializers), __runInitializers$4(this, _month_initializers, void 0)));
      __publicField(this, "day", (__runInitializers$4(this, _month_extraInitializers), __runInitializers$4(this, _day_initializers, void 0)));
      __publicField(this, "hour", (__runInitializers$4(this, _day_extraInitializers), __runInitializers$4(this, _hour_initializers, void 0)));
      __publicField(this, "minute", (__runInitializers$4(this, _hour_extraInitializers), __runInitializers$4(this, _minute_initializers, void 0)));
      __publicField(this, "second", (__runInitializers$4(this, _minute_extraInitializers), __runInitializers$4(this, _second_initializers, void 0)));
      /**
       * Note: Timezone is ignored
       */
      __publicField(this, "offsetFromGMT", (__runInitializers$4(this, _second_extraInitializers), __runInitializers$4(this, _offsetFromGMT_initializers, void 0)));
      __runInitializers$4(this, _offsetFromGMT_extraInitializers);
    }
    get date() {
      return new Date(1900 + this.year, this.month - 1, this.day, this.hour, this.minute, this.second);
    }
  }, _classThis = _a4, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _year_decorators = [(_a3 = types).uint8.bind(_a3)];
    _month_decorators = [(_b3 = types).uint8.bind(_b3)];
    _day_decorators = [(_c2 = types).uint8.bind(_c2)];
    _hour_decorators = [(_d = types).uint8.bind(_d)];
    _minute_decorators = [(_e = types).uint8.bind(_e)];
    _second_decorators = [(_f = types).uint8.bind(_f)];
    _offsetFromGMT_decorators = [(_g = types).uint8.bind(_g)];
    __esDecorate$4(null, null, _year_decorators, { kind: "field", name: "year", static: false, private: false, access: { has: (obj) => "year" in obj, get: (obj) => obj.year, set: (obj, value) => {
      obj.year = value;
    } }, metadata: _metadata }, _year_initializers, _year_extraInitializers);
    __esDecorate$4(null, null, _month_decorators, { kind: "field", name: "month", static: false, private: false, access: { has: (obj) => "month" in obj, get: (obj) => obj.month, set: (obj, value) => {
      obj.month = value;
    } }, metadata: _metadata }, _month_initializers, _month_extraInitializers);
    __esDecorate$4(null, null, _day_decorators, { kind: "field", name: "day", static: false, private: false, access: { has: (obj) => "day" in obj, get: (obj) => obj.day, set: (obj, value) => {
      obj.day = value;
    } }, metadata: _metadata }, _day_initializers, _day_extraInitializers);
    __esDecorate$4(null, null, _hour_decorators, { kind: "field", name: "hour", static: false, private: false, access: { has: (obj) => "hour" in obj, get: (obj) => obj.hour, set: (obj, value) => {
      obj.hour = value;
    } }, metadata: _metadata }, _hour_initializers, _hour_extraInitializers);
    __esDecorate$4(null, null, _minute_decorators, { kind: "field", name: "minute", static: false, private: false, access: { has: (obj) => "minute" in obj, get: (obj) => obj.minute, set: (obj, value) => {
      obj.minute = value;
    } }, metadata: _metadata }, _minute_initializers, _minute_extraInitializers);
    __esDecorate$4(null, null, _second_decorators, { kind: "field", name: "second", static: false, private: false, access: { has: (obj) => "second" in obj, get: (obj) => obj.second, set: (obj, value) => {
      obj.second = value;
    } }, metadata: _metadata }, _second_initializers, _second_extraInitializers);
    __esDecorate$4(null, null, _offsetFromGMT_decorators, { kind: "field", name: "offsetFromGMT", static: false, private: false, access: { has: (obj) => "offsetFromGMT" in obj, get: (obj) => obj.offsetFromGMT, set: (obj, value) => {
      obj.offsetFromGMT = value;
    } }, metadata: _metadata }, _offsetFromGMT_initializers, _offsetFromGMT_extraInitializers);
    __esDecorate$4(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers$4(_classThis, _classExtraInitializers);
  })(), _a4;
  return _classThis;
})();
var __esDecorate$3 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key2 = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context.access[p] = contextIn.access[p];
    context.addInitializer = function(f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key2], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field") initializers.unshift(_);
      else descriptor[key2] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers$3 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};
var EntrySignature;
(function(EntrySignature2) {
  EntrySignature2[EntrySignature2["CE"] = 17221] = "CE";
  EntrySignature2[EntrySignature2["PD"] = 20548] = "PD";
  EntrySignature2[EntrySignature2["SP"] = 21328] = "SP";
  EntrySignature2[EntrySignature2["ST"] = 21332] = "ST";
  EntrySignature2[EntrySignature2["ER"] = 17746] = "ER";
  EntrySignature2[EntrySignature2["ES"] = 17747] = "ES";
  EntrySignature2[EntrySignature2["PX"] = 20568] = "PX";
  EntrySignature2[EntrySignature2["PN"] = 20558] = "PN";
  EntrySignature2[EntrySignature2["SL"] = 21324] = "SL";
  EntrySignature2[EntrySignature2["NM"] = 20045] = "NM";
  EntrySignature2[EntrySignature2["CL"] = 17228] = "CL";
  EntrySignature2[EntrySignature2["PL"] = 20556] = "PL";
  EntrySignature2[EntrySignature2["RE"] = 21061] = "RE";
  EntrySignature2[EntrySignature2["TF"] = 21574] = "TF";
  EntrySignature2[EntrySignature2["SF"] = 21318] = "SF";
  EntrySignature2[EntrySignature2["RR"] = 21074] = "RR";
})(EntrySignature || (EntrySignature = {}));
let SystemUseEntry = (() => {
  var _a4;
  var _a3, _b3, _c2;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _signature_decorators;
  let _signature_initializers = [];
  let _signature_extraInitializers = [];
  let _length_decorators;
  let _length_initializers = [];
  let _length_extraInitializers = [];
  let _suVersion_decorators;
  let _suVersion_initializers = [];
  let _suVersion_extraInitializers = [];
  _a4 = class {
    constructor(data) {
      __publicField(this, "data");
      __publicField(this, "signature", __runInitializers$3(this, _signature_initializers, void 0));
      __publicField(this, "length", (__runInitializers$3(this, _signature_extraInitializers), __runInitializers$3(this, _length_initializers, void 0)));
      __publicField(this, "suVersion", (__runInitializers$3(this, _length_extraInitializers), __runInitializers$3(this, _suVersion_initializers, void 0)));
      __runInitializers$3(this, _suVersion_extraInitializers);
      this.data = data;
      deserialize(this, data);
    }
    get signatureString() {
      return decodeUTF8(this.data.slice(0, 2));
    }
  }, _classThis = _a4, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _signature_decorators = [(_a3 = types).uint16.bind(_a3)];
    _length_decorators = [(_b3 = types).uint8.bind(_b3)];
    _suVersion_decorators = [(_c2 = types).uint8.bind(_c2)];
    __esDecorate$3(null, null, _signature_decorators, { kind: "field", name: "signature", static: false, private: false, access: { has: (obj) => "signature" in obj, get: (obj) => obj.signature, set: (obj, value) => {
      obj.signature = value;
    } }, metadata: _metadata }, _signature_initializers, _signature_extraInitializers);
    __esDecorate$3(null, null, _length_decorators, { kind: "field", name: "length", static: false, private: false, access: { has: (obj) => "length" in obj, get: (obj) => obj.length, set: (obj, value) => {
      obj.length = value;
    } }, metadata: _metadata }, _length_initializers, _length_extraInitializers);
    __esDecorate$3(null, null, _suVersion_decorators, { kind: "field", name: "suVersion", static: false, private: false, access: { has: (obj) => "suVersion" in obj, get: (obj) => obj.suVersion, set: (obj, value) => {
      obj.suVersion = value;
    } }, metadata: _metadata }, _suVersion_initializers, _suVersion_extraInitializers);
    __esDecorate$3(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers$3(_classThis, _classExtraInitializers);
  })(), _a4;
  return _classThis;
})();
let CEEntry = (() => {
  var _a4;
  var _a3, _b3, _c2;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = SystemUseEntry;
  let _extent_decorators;
  let _extent_initializers = [];
  let _extent_extraInitializers = [];
  let _offset_decorators;
  let _offset_initializers = [];
  let _offset_extraInitializers = [];
  let _size_decorators;
  let _size_initializers = [];
  let _size_extraInitializers = [];
  _a4 = class extends _classSuper {
    constructor() {
      super(...arguments);
      __publicField(this, "_entries", []);
      /**
       * Logical block address of the continuation area.
       */
      __publicField(this, "extent", __runInitializers$3(this, _extent_initializers, void 0));
      /**
       * Offset into the logical block.
       */
      __publicField(this, "offset", (__runInitializers$3(this, _extent_extraInitializers), __runInitializers$3(this, _offset_initializers, void 0)));
      /**
       * Length of the continuation area.
       */
      __publicField(this, "size", (__runInitializers$3(this, _offset_extraInitializers), __runInitializers$3(this, _size_initializers, void 0)));
      __runInitializers$3(this, _size_extraInitializers);
    }
    entries(data) {
      this._entries || (this._entries = constructSystemUseEntries(data, Number(this.extent * 2048n + this.offset), this.size, data));
      return this._entries;
    }
  }, _classThis = _a4, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
    _extent_decorators = [(_a3 = types).uint64.bind(_a3)];
    _offset_decorators = [(_b3 = types).uint64.bind(_b3)];
    _size_decorators = [(_c2 = types).uint64.bind(_c2)];
    __esDecorate$3(null, null, _extent_decorators, { kind: "field", name: "extent", static: false, private: false, access: { has: (obj) => "extent" in obj, get: (obj) => obj.extent, set: (obj, value) => {
      obj.extent = value;
    } }, metadata: _metadata }, _extent_initializers, _extent_extraInitializers);
    __esDecorate$3(null, null, _offset_decorators, { kind: "field", name: "offset", static: false, private: false, access: { has: (obj) => "offset" in obj, get: (obj) => obj.offset, set: (obj, value) => {
      obj.offset = value;
    } }, metadata: _metadata }, _offset_initializers, _offset_extraInitializers);
    __esDecorate$3(null, null, _size_decorators, { kind: "field", name: "size", static: false, private: false, access: { has: (obj) => "size" in obj, get: (obj) => obj.size, set: (obj, value) => {
      obj.size = value;
    } }, metadata: _metadata }, _size_initializers, _size_extraInitializers);
    __esDecorate$3(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers$3(_classThis, _classExtraInitializers);
  })(), _a4;
  return _classThis;
})();
let PDEntry = (() => {
  var _a3;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = SystemUseEntry;
  _a3 = class extends _classSuper {
  }, _classThis = _a3, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
    __esDecorate$3(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers$3(_classThis, _classExtraInitializers);
  })(), _a3;
  return _classThis;
})();
let SPEntry = (() => {
  var _a4;
  var _a3;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = SystemUseEntry;
  let _magic_decorators;
  let _magic_initializers = [];
  let _magic_extraInitializers = [];
  let _skip_decorators;
  let _skip_initializers = [];
  let _skip_extraInitializers = [];
  _a4 = class extends _classSuper {
    constructor() {
      super(...arguments);
      __publicField(this, "magic", __runInitializers$3(this, _magic_initializers, void 0));
      __publicField(this, "skip", (__runInitializers$3(this, _magic_extraInitializers), __runInitializers$3(this, _skip_initializers, void 0)));
      __runInitializers$3(this, _skip_extraInitializers);
    }
    checkMagic() {
      return this.magic[0] == 190 && this.magic[1] == 239;
    }
  }, _classThis = _a4, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
    _magic_decorators = [types.uint8(2)];
    _skip_decorators = [(_a3 = types).uint8.bind(_a3)];
    __esDecorate$3(null, null, _magic_decorators, { kind: "field", name: "magic", static: false, private: false, access: { has: (obj) => "magic" in obj, get: (obj) => obj.magic, set: (obj, value) => {
      obj.magic = value;
    } }, metadata: _metadata }, _magic_initializers, _magic_extraInitializers);
    __esDecorate$3(null, null, _skip_decorators, { kind: "field", name: "skip", static: false, private: false, access: { has: (obj) => "skip" in obj, get: (obj) => obj.skip, set: (obj, value) => {
      obj.skip = value;
    } }, metadata: _metadata }, _skip_initializers, _skip_extraInitializers);
    __esDecorate$3(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers$3(_classThis, _classExtraInitializers);
  })(), _a4;
  return _classThis;
})();
let STEntry = (() => {
  var _a3;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = SystemUseEntry;
  _a3 = class extends _classSuper {
  }, _classThis = _a3, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
    __esDecorate$3(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers$3(_classThis, _classExtraInitializers);
  })(), _a3;
  return _classThis;
})();
let EREntry = (() => {
  var _a4;
  var _a3, _b3, _c2, _d;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = SystemUseEntry;
  let _idLength_decorators;
  let _idLength_initializers = [];
  let _idLength_extraInitializers = [];
  let _descriptorLength_decorators;
  let _descriptorLength_initializers = [];
  let _descriptorLength_extraInitializers = [];
  let _sourceLength_decorators;
  let _sourceLength_initializers = [];
  let _sourceLength_extraInitializers = [];
  let _extensionVersion_decorators;
  let _extensionVersion_initializers = [];
  let _extensionVersion_extraInitializers = [];
  _a4 = class extends _classSuper {
    constructor() {
      super(...arguments);
      __publicField(this, "idLength", __runInitializers$3(this, _idLength_initializers, void 0));
      __publicField(this, "descriptorLength", (__runInitializers$3(this, _idLength_extraInitializers), __runInitializers$3(this, _descriptorLength_initializers, void 0)));
      __publicField(this, "sourceLength", (__runInitializers$3(this, _descriptorLength_extraInitializers), __runInitializers$3(this, _sourceLength_initializers, void 0)));
      __publicField(this, "extensionVersion", (__runInitializers$3(this, _sourceLength_extraInitializers), __runInitializers$3(this, _extensionVersion_initializers, void 0)));
      __runInitializers$3(this, _extensionVersion_extraInitializers);
    }
    get extensionIdentifier() {
      return decodeUTF8(this.data.slice(8, 8 + this.idLength));
    }
    get extensionDescriptor() {
      return decodeUTF8(this.data.slice(8 + this.idLength, 8 + this.idLength + this.descriptorLength));
    }
    get extensionSource() {
      const start = 8 + this.idLength + this.descriptorLength;
      return decodeUTF8(this.data.slice(start, start + this.sourceLength));
    }
  }, _classThis = _a4, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
    _idLength_decorators = [(_a3 = types).uint8.bind(_a3)];
    _descriptorLength_decorators = [(_b3 = types).uint8.bind(_b3)];
    _sourceLength_decorators = [(_c2 = types).uint8.bind(_c2)];
    _extensionVersion_decorators = [(_d = types).uint8.bind(_d)];
    __esDecorate$3(null, null, _idLength_decorators, { kind: "field", name: "idLength", static: false, private: false, access: { has: (obj) => "idLength" in obj, get: (obj) => obj.idLength, set: (obj, value) => {
      obj.idLength = value;
    } }, metadata: _metadata }, _idLength_initializers, _idLength_extraInitializers);
    __esDecorate$3(null, null, _descriptorLength_decorators, { kind: "field", name: "descriptorLength", static: false, private: false, access: { has: (obj) => "descriptorLength" in obj, get: (obj) => obj.descriptorLength, set: (obj, value) => {
      obj.descriptorLength = value;
    } }, metadata: _metadata }, _descriptorLength_initializers, _descriptorLength_extraInitializers);
    __esDecorate$3(null, null, _sourceLength_decorators, { kind: "field", name: "sourceLength", static: false, private: false, access: { has: (obj) => "sourceLength" in obj, get: (obj) => obj.sourceLength, set: (obj, value) => {
      obj.sourceLength = value;
    } }, metadata: _metadata }, _sourceLength_initializers, _sourceLength_extraInitializers);
    __esDecorate$3(null, null, _extensionVersion_decorators, { kind: "field", name: "extensionVersion", static: false, private: false, access: { has: (obj) => "extensionVersion" in obj, get: (obj) => obj.extensionVersion, set: (obj, value) => {
      obj.extensionVersion = value;
    } }, metadata: _metadata }, _extensionVersion_initializers, _extensionVersion_extraInitializers);
    __esDecorate$3(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers$3(_classThis, _classExtraInitializers);
  })(), _a4;
  return _classThis;
})();
let ESEntry = (() => {
  var _a4;
  var _a3;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = SystemUseEntry;
  let _extensionSequence_decorators;
  let _extensionSequence_initializers = [];
  let _extensionSequence_extraInitializers = [];
  _a4 = class extends _classSuper {
    constructor() {
      super(...arguments);
      __publicField(this, "extensionSequence", __runInitializers$3(this, _extensionSequence_initializers, void 0));
      __runInitializers$3(this, _extensionSequence_extraInitializers);
    }
  }, _classThis = _a4, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
    _extensionSequence_decorators = [(_a3 = types).uint8.bind(_a3)];
    __esDecorate$3(null, null, _extensionSequence_decorators, { kind: "field", name: "extensionSequence", static: false, private: false, access: { has: (obj) => "extensionSequence" in obj, get: (obj) => obj.extensionSequence, set: (obj, value) => {
      obj.extensionSequence = value;
    } }, metadata: _metadata }, _extensionSequence_initializers, _extensionSequence_extraInitializers);
    __esDecorate$3(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers$3(_classThis, _classExtraInitializers);
  })(), _a4;
  return _classThis;
})();
let RREntry = (() => {
  var _a3;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = SystemUseEntry;
  _a3 = class extends _classSuper {
  }, _classThis = _a3, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
    __esDecorate$3(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers$3(_classThis, _classExtraInitializers);
  })(), _a3;
  return _classThis;
})();
let PXEntry = (() => {
  var _a4;
  var _a3, _b3, _c2, _d, _e;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = SystemUseEntry;
  let _mode_decorators;
  let _mode_initializers = [];
  let _mode_extraInitializers = [];
  let _nlinks_decorators;
  let _nlinks_initializers = [];
  let _nlinks_extraInitializers = [];
  let _uid_decorators;
  let _uid_initializers = [];
  let _uid_extraInitializers = [];
  let _gid_decorators;
  let _gid_initializers = [];
  let _gid_extraInitializers = [];
  let _inode_decorators;
  let _inode_initializers = [];
  let _inode_extraInitializers = [];
  _a4 = class extends _classSuper {
    constructor() {
      super(...arguments);
      __publicField(this, "mode", __runInitializers$3(this, _mode_initializers, void 0));
      __publicField(this, "nlinks", (__runInitializers$3(this, _mode_extraInitializers), __runInitializers$3(this, _nlinks_initializers, void 0)));
      __publicField(this, "uid", (__runInitializers$3(this, _nlinks_extraInitializers), __runInitializers$3(this, _uid_initializers, void 0)));
      __publicField(this, "gid", (__runInitializers$3(this, _uid_extraInitializers), __runInitializers$3(this, _gid_initializers, void 0)));
      __publicField(this, "inode", (__runInitializers$3(this, _gid_extraInitializers), __runInitializers$3(this, _inode_initializers, void 0)));
      __runInitializers$3(this, _inode_extraInitializers);
    }
  }, _classThis = _a4, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
    _mode_decorators = [(_a3 = types).uint64.bind(_a3)];
    _nlinks_decorators = [(_b3 = types).uint64.bind(_b3)];
    _uid_decorators = [(_c2 = types).uint64.bind(_c2)];
    _gid_decorators = [(_d = types).uint64.bind(_d)];
    _inode_decorators = [(_e = types).uint64.bind(_e)];
    __esDecorate$3(null, null, _mode_decorators, { kind: "field", name: "mode", static: false, private: false, access: { has: (obj) => "mode" in obj, get: (obj) => obj.mode, set: (obj, value) => {
      obj.mode = value;
    } }, metadata: _metadata }, _mode_initializers, _mode_extraInitializers);
    __esDecorate$3(null, null, _nlinks_decorators, { kind: "field", name: "nlinks", static: false, private: false, access: { has: (obj) => "nlinks" in obj, get: (obj) => obj.nlinks, set: (obj, value) => {
      obj.nlinks = value;
    } }, metadata: _metadata }, _nlinks_initializers, _nlinks_extraInitializers);
    __esDecorate$3(null, null, _uid_decorators, { kind: "field", name: "uid", static: false, private: false, access: { has: (obj) => "uid" in obj, get: (obj) => obj.uid, set: (obj, value) => {
      obj.uid = value;
    } }, metadata: _metadata }, _uid_initializers, _uid_extraInitializers);
    __esDecorate$3(null, null, _gid_decorators, { kind: "field", name: "gid", static: false, private: false, access: { has: (obj) => "gid" in obj, get: (obj) => obj.gid, set: (obj, value) => {
      obj.gid = value;
    } }, metadata: _metadata }, _gid_initializers, _gid_extraInitializers);
    __esDecorate$3(null, null, _inode_decorators, { kind: "field", name: "inode", static: false, private: false, access: { has: (obj) => "inode" in obj, get: (obj) => obj.inode, set: (obj, value) => {
      obj.inode = value;
    } }, metadata: _metadata }, _inode_initializers, _inode_extraInitializers);
    __esDecorate$3(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers$3(_classThis, _classExtraInitializers);
  })(), _a4;
  return _classThis;
})();
let PNEntry = (() => {
  var _a4;
  var _a3, _b3;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = SystemUseEntry;
  let _dev_high_decorators;
  let _dev_high_initializers = [];
  let _dev_high_extraInitializers = [];
  let _dev_low_decorators;
  let _dev_low_initializers = [];
  let _dev_low_extraInitializers = [];
  _a4 = class extends _classSuper {
    constructor() {
      super(...arguments);
      __publicField(this, "dev_high", __runInitializers$3(this, _dev_high_initializers, void 0));
      __publicField(this, "dev_low", (__runInitializers$3(this, _dev_high_extraInitializers), __runInitializers$3(this, _dev_low_initializers, void 0)));
      __runInitializers$3(this, _dev_low_extraInitializers);
    }
  }, _classThis = _a4, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
    _dev_high_decorators = [(_a3 = types).uint64.bind(_a3)];
    _dev_low_decorators = [(_b3 = types).uint64.bind(_b3)];
    __esDecorate$3(null, null, _dev_high_decorators, { kind: "field", name: "dev_high", static: false, private: false, access: { has: (obj) => "dev_high" in obj, get: (obj) => obj.dev_high, set: (obj, value) => {
      obj.dev_high = value;
    } }, metadata: _metadata }, _dev_high_initializers, _dev_high_extraInitializers);
    __esDecorate$3(null, null, _dev_low_decorators, { kind: "field", name: "dev_low", static: false, private: false, access: { has: (obj) => "dev_low" in obj, get: (obj) => obj.dev_low, set: (obj, value) => {
      obj.dev_low = value;
    } }, metadata: _metadata }, _dev_low_initializers, _dev_low_extraInitializers);
    __esDecorate$3(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers$3(_classThis, _classExtraInitializers);
  })(), _a4;
  return _classThis;
})();
let SLEntry = (() => {
  var _a4;
  var _a3;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = SystemUseEntry;
  let _flags_decorators;
  let _flags_initializers = [];
  let _flags_extraInitializers = [];
  _a4 = class extends _classSuper {
    constructor() {
      super(...arguments);
      __publicField(this, "flags", __runInitializers$3(this, _flags_initializers, void 0));
      __runInitializers$3(this, _flags_extraInitializers);
    }
    get continueFlag() {
      return this.flags & 1;
    }
    get componentRecords() {
      const records = [];
      let i = 5;
      while (i < this.length) {
        const record = new SLComponentRecord(this.data.slice(i));
        records.push(record);
        i += record.length;
      }
      return records;
    }
  }, _classThis = _a4, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
    _flags_decorators = [(_a3 = types).uint8.bind(_a3)];
    __esDecorate$3(null, null, _flags_decorators, { kind: "field", name: "flags", static: false, private: false, access: { has: (obj) => "flags" in obj, get: (obj) => obj.flags, set: (obj, value) => {
      obj.flags = value;
    } }, metadata: _metadata }, _flags_initializers, _flags_extraInitializers);
    __esDecorate$3(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers$3(_classThis, _classExtraInitializers);
  })(), _a4;
  return _classThis;
})();
function constructSystemUseEntry(data) {
  const sue = new SystemUseEntry(data);
  switch (sue.signature) {
    case EntrySignature.CE:
      return new CEEntry(data);
    case EntrySignature.PD:
      return new PDEntry(data);
    case EntrySignature.SP:
      return new SPEntry(data);
    case EntrySignature.ST:
      return new STEntry(data);
    case EntrySignature.ER:
      return new EREntry(data);
    case EntrySignature.ES:
      return new ESEntry(data);
    case EntrySignature.PX:
      return new PXEntry(data);
    case EntrySignature.PN:
      return new PNEntry(data);
    case EntrySignature.SL:
      return new SLEntry(data);
    case EntrySignature.NM:
      return new NMEntry(data);
    case EntrySignature.CL:
      return new CLEntry(data);
    case EntrySignature.PL:
      return new PLEntry(data);
    case EntrySignature.RE:
      return new REEntry(data);
    case EntrySignature.TF:
      return new TFEntry(data);
    case EntrySignature.SF:
      return new SFEntry(data);
    case EntrySignature.RR:
      return new RREntry(data);
    default:
      return sue;
  }
}
function constructSystemUseEntries(data, i, length, isoData) {
  length -= 4n;
  const entries2 = [];
  while (i < length) {
    const entry = constructSystemUseEntry(data.slice(i));
    const length2 = entry.length;
    if (!length2) {
      return entries2;
    }
    i += length2;
    if (entry instanceof STEntry) {
      break;
    }
    entries2.push(...entry instanceof CEEntry ? entry.entries(isoData) : [entry]);
  }
  return entries2;
}
var NMFlags;
(function(NMFlags2) {
  NMFlags2[NMFlags2["CONTINUE"] = 1] = "CONTINUE";
  NMFlags2[NMFlags2["CURRENT"] = 2] = "CURRENT";
  NMFlags2[NMFlags2["PARENT"] = 4] = "PARENT";
})(NMFlags || (NMFlags = {}));
let NMEntry = (() => {
  var _a4;
  var _a3;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = SystemUseEntry;
  let _flags_decorators;
  let _flags_initializers = [];
  let _flags_extraInitializers = [];
  _a4 = class extends _classSuper {
    constructor() {
      super(...arguments);
      __publicField(this, "flags", __runInitializers$3(this, _flags_initializers, void 0));
      __runInitializers$3(this, _flags_extraInitializers);
    }
    name(getString) {
      return getString(this.data.slice(5, this.length));
    }
  }, _classThis = _a4, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
    _flags_decorators = [(_a3 = types).uint8.bind(_a3)];
    __esDecorate$3(null, null, _flags_decorators, { kind: "field", name: "flags", static: false, private: false, access: { has: (obj) => "flags" in obj, get: (obj) => obj.flags, set: (obj, value) => {
      obj.flags = value;
    } }, metadata: _metadata }, _flags_initializers, _flags_extraInitializers);
    __esDecorate$3(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers$3(_classThis, _classExtraInitializers);
  })(), _a4;
  return _classThis;
})();
let CLEntry = (() => {
  var _a4;
  var _a3;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = SystemUseEntry;
  let _childDirectoryLba_decorators;
  let _childDirectoryLba_initializers = [];
  let _childDirectoryLba_extraInitializers = [];
  _a4 = class extends _classSuper {
    constructor() {
      super(...arguments);
      __publicField(this, "childDirectoryLba", __runInitializers$3(this, _childDirectoryLba_initializers, void 0));
      __runInitializers$3(this, _childDirectoryLba_extraInitializers);
    }
  }, _classThis = _a4, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
    _childDirectoryLba_decorators = [(_a3 = types).uint32.bind(_a3)];
    __esDecorate$3(null, null, _childDirectoryLba_decorators, { kind: "field", name: "childDirectoryLba", static: false, private: false, access: { has: (obj) => "childDirectoryLba" in obj, get: (obj) => obj.childDirectoryLba, set: (obj, value) => {
      obj.childDirectoryLba = value;
    } }, metadata: _metadata }, _childDirectoryLba_initializers, _childDirectoryLba_extraInitializers);
    __esDecorate$3(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers$3(_classThis, _classExtraInitializers);
  })(), _a4;
  return _classThis;
})();
let PLEntry = (() => {
  var _a4;
  var _a3;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = SystemUseEntry;
  let _parentDirectoryLba_decorators;
  let _parentDirectoryLba_initializers = [];
  let _parentDirectoryLba_extraInitializers = [];
  _a4 = class extends _classSuper {
    constructor() {
      super(...arguments);
      __publicField(this, "parentDirectoryLba", __runInitializers$3(this, _parentDirectoryLba_initializers, void 0));
      __runInitializers$3(this, _parentDirectoryLba_extraInitializers);
    }
  }, _classThis = _a4, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
    _parentDirectoryLba_decorators = [(_a3 = types).uint32.bind(_a3)];
    __esDecorate$3(null, null, _parentDirectoryLba_decorators, { kind: "field", name: "parentDirectoryLba", static: false, private: false, access: { has: (obj) => "parentDirectoryLba" in obj, get: (obj) => obj.parentDirectoryLba, set: (obj, value) => {
      obj.parentDirectoryLba = value;
    } }, metadata: _metadata }, _parentDirectoryLba_initializers, _parentDirectoryLba_extraInitializers);
    __esDecorate$3(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers$3(_classThis, _classExtraInitializers);
  })(), _a4;
  return _classThis;
})();
let REEntry = (() => {
  var _a3;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = SystemUseEntry;
  _a3 = class extends _classSuper {
  }, _classThis = _a3, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
    __esDecorate$3(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers$3(_classThis, _classExtraInitializers);
  })(), _a3;
  return _classThis;
})();
var TFFlag;
(function(TFFlag2) {
  TFFlag2[TFFlag2["CREATION"] = 1] = "CREATION";
  TFFlag2[TFFlag2["MODIFY"] = 2] = "MODIFY";
  TFFlag2[TFFlag2["ACCESS"] = 4] = "ACCESS";
  TFFlag2[TFFlag2["ATTRIBUTES"] = 8] = "ATTRIBUTES";
  TFFlag2[TFFlag2["BACKUP"] = 16] = "BACKUP";
  TFFlag2[TFFlag2["EXPIRATION"] = 32] = "EXPIRATION";
  TFFlag2[TFFlag2["EFFECTIVE"] = 64] = "EFFECTIVE";
  TFFlag2[TFFlag2["LONG_FORM"] = 128] = "LONG_FORM";
})(TFFlag || (TFFlag = {}));
let TFEntry = (() => {
  var _a4;
  var _a3;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = SystemUseEntry;
  let _flags_decorators;
  let _flags_initializers = [];
  let _flags_extraInitializers = [];
  _a4 = class extends _classSuper {
    constructor() {
      super(...arguments);
      __publicField(this, "flags", __runInitializers$3(this, _flags_initializers, void 0));
      __runInitializers$3(this, _flags_extraInitializers);
    }
    _getDate(kind) {
      if (!(this.flags & kind)) {
        return;
      }
      let index = 0;
      for (let i = 0; i < kind - 1; i++) {
        index += this.flags & 1 << i ? 1 : 0;
      }
      const _Date = this.flags & TFFlag.LONG_FORM ? LongFormDate : ShortFormDate;
      const offset = 5 + index * sizeof(_Date);
      const date = new _Date();
      deserialize(date, this.data.slice(offset, offset + sizeof(_Date)));
      return date.date;
    }
    get creation() {
      return this._getDate(TFFlag.CREATION);
    }
    get modify() {
      return this._getDate(TFFlag.MODIFY);
    }
    get access() {
      return this._getDate(TFFlag.ACCESS);
    }
    get backup() {
      return this._getDate(TFFlag.BACKUP);
    }
    get expiration() {
      return this._getDate(TFFlag.EXPIRATION);
    }
    get effective() {
      return this._getDate(TFFlag.EFFECTIVE);
    }
  }, _classThis = _a4, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
    _flags_decorators = [(_a3 = types).uint8.bind(_a3)];
    __esDecorate$3(null, null, _flags_decorators, { kind: "field", name: "flags", static: false, private: false, access: { has: (obj) => "flags" in obj, get: (obj) => obj.flags, set: (obj, value) => {
      obj.flags = value;
    } }, metadata: _metadata }, _flags_initializers, _flags_extraInitializers);
    __esDecorate$3(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers$3(_classThis, _classExtraInitializers);
  })(), _a4;
  return _classThis;
})();
let SFEntry = (() => {
  var _a4;
  var _a3, _b3, _c2;
  let _classSuper = SystemUseEntry;
  let _virtualSizeHigh_decorators;
  let _virtualSizeHigh_initializers = [];
  let _virtualSizeHigh_extraInitializers = [];
  let _virtualSizeLow_decorators;
  let _virtualSizeLow_initializers = [];
  let _virtualSizeLow_extraInitializers = [];
  let _tableDepth_decorators;
  let _tableDepth_initializers = [];
  let _tableDepth_extraInitializers = [];
  return _a4 = class extends _classSuper {
    constructor() {
      super(...arguments);
      __publicField(this, "virtualSizeHigh", __runInitializers$3(this, _virtualSizeHigh_initializers, void 0));
      __publicField(this, "virtualSizeLow", (__runInitializers$3(this, _virtualSizeHigh_extraInitializers), __runInitializers$3(this, _virtualSizeLow_initializers, void 0)));
      __publicField(this, "tableDepth", (__runInitializers$3(this, _virtualSizeLow_extraInitializers), __runInitializers$3(this, _tableDepth_initializers, void 0)));
      __runInitializers$3(this, _tableDepth_extraInitializers);
    }
  }, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
    _virtualSizeHigh_decorators = [(_a3 = types).uint64.bind(_a3)];
    _virtualSizeLow_decorators = [(_b3 = types).uint64.bind(_b3)];
    _tableDepth_decorators = [(_c2 = types).uint8.bind(_c2)];
    __esDecorate$3(null, null, _virtualSizeHigh_decorators, { kind: "field", name: "virtualSizeHigh", static: false, private: false, access: { has: (obj) => "virtualSizeHigh" in obj, get: (obj) => obj.virtualSizeHigh, set: (obj, value) => {
      obj.virtualSizeHigh = value;
    } }, metadata: _metadata }, _virtualSizeHigh_initializers, _virtualSizeHigh_extraInitializers);
    __esDecorate$3(null, null, _virtualSizeLow_decorators, { kind: "field", name: "virtualSizeLow", static: false, private: false, access: { has: (obj) => "virtualSizeLow" in obj, get: (obj) => obj.virtualSizeLow, set: (obj, value) => {
      obj.virtualSizeLow = value;
    } }, metadata: _metadata }, _virtualSizeLow_initializers, _virtualSizeLow_extraInitializers);
    __esDecorate$3(null, null, _tableDepth_decorators, { kind: "field", name: "tableDepth", static: false, private: false, access: { has: (obj) => "tableDepth" in obj, get: (obj) => obj.tableDepth, set: (obj, value) => {
      obj.tableDepth = value;
    } }, metadata: _metadata }, _tableDepth_initializers, _tableDepth_extraInitializers);
    if (_metadata) Object.defineProperty(_a4, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
  })(), _a4;
})();
class Directory extends Map {
  constructor(record, isoData) {
    super();
    __publicField(this, "record");
    this.record = record;
    let i = record.lba;
    let limit = i + record.dataLength;
    if (!(record.fileFlags & FileFlags.Directory)) {
      const cl = record.getSUEntries(isoData).find((e) => e instanceof CLEntry);
      if (!cl) {
        throw new ReferenceError("No CL entry");
      }
      i = cl.childDirectoryLba * 2048;
      limit = Infinity;
    }
    while (i < limit) {
      const length = isoData[i];
      if (!length) {
        i++;
        continue;
      }
      const record2 = new DirectoryRecord(isoData.slice(i), this.record.rockRidgeOffset);
      const fileName = record2.fileName(isoData);
      if (fileName !== "\0" && fileName !== "" && (!record2.hasRockRidge || !record2.getSUEntries(isoData).filter((e) => e instanceof REEntry).length)) {
        this.set(fileName, record2);
      } else if (limit === Infinity) {
        limit = i + record2.dataLength;
      }
      i += record2.length;
    }
  }
  getDotEntry(isoData) {
    return new DirectoryRecord(isoData.slice(this.record.lba), this.record.rockRidgeOffset);
  }
}
var __esDecorate$2 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key2 = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context.access[p] = contextIn.access[p];
    context.addInitializer = function(f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key2], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field") initializers.unshift(_);
      else descriptor[key2] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers$2 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};
let DirectoryRecord = (() => {
  var _a4;
  var _a3, _b3, _c2, _d, _e, _f, _g, _h, _j, _k, _l, _m;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _length_decorators;
  let _length_initializers = [];
  let _length_extraInitializers = [];
  let _extendedAttributeRecordLength_decorators;
  let _extendedAttributeRecordLength_initializers = [];
  let _extendedAttributeRecordLength_extraInitializers = [];
  let __lba_decorators;
  let __lba_initializers = [];
  let __lba_extraInitializers = [];
  let __lbaBE_decorators;
  let __lbaBE_initializers = [];
  let __lbaBE_extraInitializers = [];
  let _dataLength_decorators;
  let _dataLength_initializers = [];
  let _dataLength_extraInitializers = [];
  let _dataLengthBE_decorators;
  let _dataLengthBE_initializers = [];
  let _dataLengthBE_extraInitializers = [];
  let _date_decorators;
  let _date_initializers = [];
  let _date_extraInitializers = [];
  let _fileFlags_decorators;
  let _fileFlags_initializers = [];
  let _fileFlags_extraInitializers = [];
  let _fileUnitSize_decorators;
  let _fileUnitSize_initializers = [];
  let _fileUnitSize_extraInitializers = [];
  let _interleaveGapSize_decorators;
  let _interleaveGapSize_initializers = [];
  let _interleaveGapSize_extraInitializers = [];
  let _volumeSequenceNumber_decorators;
  let _volumeSequenceNumber_initializers = [];
  let _volumeSequenceNumber_extraInitializers = [];
  let _volumeSequenceNumberBE_decorators;
  let _volumeSequenceNumberBE_initializers = [];
  let _volumeSequenceNumberBE_extraInitializers = [];
  let _identifierLength_decorators;
  let _identifierLength_initializers = [];
  let _identifierLength_extraInitializers = [];
  let __identifier_decorators;
  let __identifier_initializers = [];
  let __identifier_extraInitializers = [];
  _a4 = class {
    constructor(data, _rockRidgeOffset) {
      __publicField(this, "data");
      __publicField(this, "_rockRidgeOffset");
      __publicField(this, "_view");
      __publicField(this, "_suEntries");
      __publicField(this, "_file");
      __publicField(this, "_dir");
      /**
       * @internal
       */
      __publicField(this, "_kind");
      __publicField(this, "length", __runInitializers$2(this, _length_initializers, void 0));
      __publicField(this, "extendedAttributeRecordLength", (__runInitializers$2(this, _length_extraInitializers), __runInitializers$2(this, _extendedAttributeRecordLength_initializers, void 0)));
      __publicField(this, "_lba", (__runInitializers$2(this, _extendedAttributeRecordLength_extraInitializers), __runInitializers$2(this, __lba_initializers, void 0)));
      __publicField(this, "_lbaBE", (__runInitializers$2(this, __lba_extraInitializers), __runInitializers$2(this, __lbaBE_initializers, void 0)));
      __publicField(this, "dataLength", (__runInitializers$2(this, __lbaBE_extraInitializers), __runInitializers$2(this, _dataLength_initializers, void 0)));
      __publicField(this, "dataLengthBE", (__runInitializers$2(this, _dataLength_extraInitializers), __runInitializers$2(this, _dataLengthBE_initializers, void 0)));
      __publicField(this, "date", (__runInitializers$2(this, _dataLengthBE_extraInitializers), __runInitializers$2(this, _date_initializers, new ShortFormDate())));
      __publicField(this, "fileFlags", (__runInitializers$2(this, _date_extraInitializers), __runInitializers$2(this, _fileFlags_initializers, void 0)));
      __publicField(this, "fileUnitSize", (__runInitializers$2(this, _fileFlags_extraInitializers), __runInitializers$2(this, _fileUnitSize_initializers, void 0)));
      __publicField(this, "interleaveGapSize", (__runInitializers$2(this, _fileUnitSize_extraInitializers), __runInitializers$2(this, _interleaveGapSize_initializers, void 0)));
      __publicField(this, "volumeSequenceNumber", (__runInitializers$2(this, _interleaveGapSize_extraInitializers), __runInitializers$2(this, _volumeSequenceNumber_initializers, void 0)));
      __publicField(this, "volumeSequenceNumberBE", (__runInitializers$2(this, _volumeSequenceNumber_extraInitializers), __runInitializers$2(this, _volumeSequenceNumberBE_initializers, void 0)));
      __publicField(this, "identifierLength", (__runInitializers$2(this, _volumeSequenceNumberBE_extraInitializers), __runInitializers$2(this, _identifierLength_initializers, void 0)));
      /**
       * Variable length, which is not supported by Utilium at the moment
       */
      __publicField(this, "_identifier", (__runInitializers$2(this, _identifierLength_extraInitializers), __runInitializers$2(this, __identifier_initializers, "")));
      __publicField(this, "_decoder", __runInitializers$2(this, __identifier_extraInitializers));
      this.data = data;
      this._rockRidgeOffset = _rockRidgeOffset;
      deserialize(this, data);
      this._view = new DataView(data.buffer);
    }
    get hasRockRidge() {
      return this._rockRidgeOffset > -1;
    }
    get rockRidgeOffset() {
      return this._rockRidgeOffset;
    }
    /**
     * !!ONLY VALID ON ROOT NODE!!
     * Checks if Rock Ridge is enabled, and sets the offset.
     */
    rootCheckForRockRidge(isoData) {
      const dir = this.getDirectory(isoData);
      this._rockRidgeOffset = dir.getDotEntry(isoData)._getRockRidgeOffset(isoData);
      if (this._rockRidgeOffset > -1) {
        this._dir = void 0;
      }
    }
    get lba() {
      return this._lba * 2048;
    }
    set lba(value) {
      if (!Number.isInteger(value / 2048)) {
        throw new ErrnoError(Errno.EINVAL, "Invalid LBA value");
      }
      this._lba = value / 2048;
    }
    get recordingDate() {
      return this.date.date;
    }
    get identifier() {
      const stringData = this.data.slice(33, 33 + this.identifierLength);
      return this._decode(stringData);
    }
    fileName(isoData) {
      if (this.hasRockRidge) {
        const fn = this._rockRidgeFilename(isoData);
        if (fn != null)
          return fn;
      }
      const ident = this.identifier;
      if (this.isDirectory(isoData))
        return ident;
      const versionSeparator = ident.indexOf(";");
      if (versionSeparator === -1)
        return ident;
      if (ident[versionSeparator - 1] === ".")
        return ident.slice(0, versionSeparator - 1);
      return ident.slice(0, versionSeparator);
    }
    isDirectory(isoData) {
      let rv = !!(this.fileFlags & FileFlags.Directory);
      if (!rv && this.hasRockRidge) {
        rv = this.getSUEntries(isoData).filter((e) => e instanceof CLEntry).length > 0;
      }
      return rv;
    }
    isSymlink(isoData) {
      return this.hasRockRidge && this.getSUEntries(isoData).filter((e) => e instanceof SLEntry).length > 0;
    }
    /**
     * @todo Use a `switch` when checking flags?
     */
    getSymlinkPath(isoData) {
      let path = "";
      const entries2 = this.getSUEntries(isoData);
      for (const entry of entries2) {
        if (!(entry instanceof SLEntry))
          continue;
        const components = entry.componentRecords;
        for (const component of components) {
          const flags = component.flags;
          if (flags & SLComponentFlags.CURRENT) {
            path += "./";
          } else if (flags & SLComponentFlags.PARENT) {
            path += "../";
          } else if (flags & SLComponentFlags.ROOT) {
            path += "/";
          } else {
            path += component.content(this._decode);
            if (!(flags & SLComponentFlags.CONTINUE)) {
              path += "/";
            }
          }
        }
        if (!entry.continueFlag)
          break;
      }
      return path.endsWith("/") ? path.slice(0, -1) : path;
    }
    getFile(isoData) {
      if (this.isDirectory(isoData))
        throw err$2(ErrnoError.With("EISDIR", void 0, "read"));
      this._file ?? (this._file = isoData.slice(this.lba, this.lba + this.dataLength));
      return this._file;
    }
    getDirectory(isoData) {
      if (!this.isDirectory(isoData))
        throw err$2(ErrnoError.With("ENOTDIR", void 0, "read"));
      this._dir ?? (this._dir = new Directory(this, isoData));
      return this._dir;
    }
    getSUEntries(isoData) {
      if (this._suEntries)
        return this._suEntries;
      let i = 33 + this.data[32];
      if (i % 2 === 1)
        i++;
      i += this._rockRidgeOffset;
      this._suEntries = constructSystemUseEntries(this.data, i, BigInt(this.length), isoData);
      return this._suEntries;
    }
    getString() {
      return this._decode(this.data);
    }
    get _decode() {
      this._decoder || (this._decoder = new TextDecoder(this._kind == "Joliet" ? "utf-16be" : "utf-8"));
      return (data) => this._decoder.decode(data).toLowerCase();
    }
    _rockRidgeFilename(isoData) {
      const nmEntries = this.getSUEntries(isoData).filter((e) => e instanceof NMEntry);
      if (!nmEntries.length || nmEntries[0].flags & (NMFlags.CURRENT | NMFlags.PARENT))
        return null;
      let str = "";
      for (const e of nmEntries) {
        str += e.name(this._decode);
        if (!(e.flags & NMFlags.CONTINUE))
          break;
      }
      return str;
    }
    /**
     * !!ONLY VALID ON FIRST ENTRY OF ROOT DIRECTORY!!
     * Returns -1 if rock ridge is not enabled. Otherwise, returns the offset
     * at which system use fields begin.
     */
    _getRockRidgeOffset(isoData) {
      this._rockRidgeOffset = 0;
      const suEntries = this.getSUEntries(isoData);
      if (suEntries.length > 0) {
        const spEntry = suEntries[0];
        if (spEntry instanceof SPEntry && spEntry.checkMagic()) {
          for (let i = 1; i < suEntries.length; i++) {
            const entry = suEntries[i];
            if (entry instanceof RREntry || entry instanceof EREntry && entry.extensionIdentifier === rockRidgeIdentifier) {
              return spEntry.skip;
            }
          }
        }
      }
      this._rockRidgeOffset = -1;
      return -1;
    }
  }, _classThis = _a4, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _length_decorators = [(_a3 = types).uint8.bind(_a3)];
    _extendedAttributeRecordLength_decorators = [(_b3 = types).uint8.bind(_b3)];
    __lba_decorators = [(_c2 = types).uint32.bind(_c2)];
    __lbaBE_decorators = [(_d = types).uint32.bind(_d)];
    _dataLength_decorators = [(_e = types).uint32.bind(_e)];
    _dataLengthBE_decorators = [(_f = types).uint32.bind(_f)];
    _date_decorators = [member(ShortFormDate)];
    _fileFlags_decorators = [(_g = types).uint8.bind(_g)];
    _fileUnitSize_decorators = [(_h = types).uint8.bind(_h)];
    _interleaveGapSize_decorators = [(_j = types).uint8.bind(_j)];
    _volumeSequenceNumber_decorators = [(_k = types).uint16.bind(_k)];
    _volumeSequenceNumberBE_decorators = [(_l = types).uint16.bind(_l)];
    _identifierLength_decorators = [(_m = types).uint8.bind(_m)];
    __identifier_decorators = [types.char(0)];
    __esDecorate$2(null, null, _length_decorators, { kind: "field", name: "length", static: false, private: false, access: { has: (obj) => "length" in obj, get: (obj) => obj.length, set: (obj, value) => {
      obj.length = value;
    } }, metadata: _metadata }, _length_initializers, _length_extraInitializers);
    __esDecorate$2(null, null, _extendedAttributeRecordLength_decorators, { kind: "field", name: "extendedAttributeRecordLength", static: false, private: false, access: { has: (obj) => "extendedAttributeRecordLength" in obj, get: (obj) => obj.extendedAttributeRecordLength, set: (obj, value) => {
      obj.extendedAttributeRecordLength = value;
    } }, metadata: _metadata }, _extendedAttributeRecordLength_initializers, _extendedAttributeRecordLength_extraInitializers);
    __esDecorate$2(null, null, __lba_decorators, { kind: "field", name: "_lba", static: false, private: false, access: { has: (obj) => "_lba" in obj, get: (obj) => obj._lba, set: (obj, value) => {
      obj._lba = value;
    } }, metadata: _metadata }, __lba_initializers, __lba_extraInitializers);
    __esDecorate$2(null, null, __lbaBE_decorators, { kind: "field", name: "_lbaBE", static: false, private: false, access: { has: (obj) => "_lbaBE" in obj, get: (obj) => obj._lbaBE, set: (obj, value) => {
      obj._lbaBE = value;
    } }, metadata: _metadata }, __lbaBE_initializers, __lbaBE_extraInitializers);
    __esDecorate$2(null, null, _dataLength_decorators, { kind: "field", name: "dataLength", static: false, private: false, access: { has: (obj) => "dataLength" in obj, get: (obj) => obj.dataLength, set: (obj, value) => {
      obj.dataLength = value;
    } }, metadata: _metadata }, _dataLength_initializers, _dataLength_extraInitializers);
    __esDecorate$2(null, null, _dataLengthBE_decorators, { kind: "field", name: "dataLengthBE", static: false, private: false, access: { has: (obj) => "dataLengthBE" in obj, get: (obj) => obj.dataLengthBE, set: (obj, value) => {
      obj.dataLengthBE = value;
    } }, metadata: _metadata }, _dataLengthBE_initializers, _dataLengthBE_extraInitializers);
    __esDecorate$2(null, null, _date_decorators, { kind: "field", name: "date", static: false, private: false, access: { has: (obj) => "date" in obj, get: (obj) => obj.date, set: (obj, value) => {
      obj.date = value;
    } }, metadata: _metadata }, _date_initializers, _date_extraInitializers);
    __esDecorate$2(null, null, _fileFlags_decorators, { kind: "field", name: "fileFlags", static: false, private: false, access: { has: (obj) => "fileFlags" in obj, get: (obj) => obj.fileFlags, set: (obj, value) => {
      obj.fileFlags = value;
    } }, metadata: _metadata }, _fileFlags_initializers, _fileFlags_extraInitializers);
    __esDecorate$2(null, null, _fileUnitSize_decorators, { kind: "field", name: "fileUnitSize", static: false, private: false, access: { has: (obj) => "fileUnitSize" in obj, get: (obj) => obj.fileUnitSize, set: (obj, value) => {
      obj.fileUnitSize = value;
    } }, metadata: _metadata }, _fileUnitSize_initializers, _fileUnitSize_extraInitializers);
    __esDecorate$2(null, null, _interleaveGapSize_decorators, { kind: "field", name: "interleaveGapSize", static: false, private: false, access: { has: (obj) => "interleaveGapSize" in obj, get: (obj) => obj.interleaveGapSize, set: (obj, value) => {
      obj.interleaveGapSize = value;
    } }, metadata: _metadata }, _interleaveGapSize_initializers, _interleaveGapSize_extraInitializers);
    __esDecorate$2(null, null, _volumeSequenceNumber_decorators, { kind: "field", name: "volumeSequenceNumber", static: false, private: false, access: { has: (obj) => "volumeSequenceNumber" in obj, get: (obj) => obj.volumeSequenceNumber, set: (obj, value) => {
      obj.volumeSequenceNumber = value;
    } }, metadata: _metadata }, _volumeSequenceNumber_initializers, _volumeSequenceNumber_extraInitializers);
    __esDecorate$2(null, null, _volumeSequenceNumberBE_decorators, { kind: "field", name: "volumeSequenceNumberBE", static: false, private: false, access: { has: (obj) => "volumeSequenceNumberBE" in obj, get: (obj) => obj.volumeSequenceNumberBE, set: (obj, value) => {
      obj.volumeSequenceNumberBE = value;
    } }, metadata: _metadata }, _volumeSequenceNumberBE_initializers, _volumeSequenceNumberBE_extraInitializers);
    __esDecorate$2(null, null, _identifierLength_decorators, { kind: "field", name: "identifierLength", static: false, private: false, access: { has: (obj) => "identifierLength" in obj, get: (obj) => obj.identifierLength, set: (obj, value) => {
      obj.identifierLength = value;
    } }, metadata: _metadata }, _identifierLength_initializers, _identifierLength_extraInitializers);
    __esDecorate$2(null, null, __identifier_decorators, { kind: "field", name: "_identifier", static: false, private: false, access: { has: (obj) => "_identifier" in obj, get: (obj) => obj._identifier, set: (obj, value) => {
      obj._identifier = value;
    } }, metadata: _metadata }, __identifier_initializers, __identifier_extraInitializers);
    __esDecorate$2(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers$2(_classThis, _classExtraInitializers);
  })(), _a4;
  return _classThis;
})();
var __esDecorate$1 = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key2 = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context.access[p] = contextIn.access[p];
    context.addInitializer = function(f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key2], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field") initializers.unshift(_);
      else descriptor[key2] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers$1 = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};
var VolumeDescriptorType;
(function(VolumeDescriptorType2) {
  VolumeDescriptorType2[VolumeDescriptorType2["BootRecord"] = 0] = "BootRecord";
  VolumeDescriptorType2[VolumeDescriptorType2["Primary"] = 1] = "Primary";
  VolumeDescriptorType2[VolumeDescriptorType2["Supplementary"] = 2] = "Supplementary";
  VolumeDescriptorType2[VolumeDescriptorType2["Partition"] = 3] = "Partition";
  VolumeDescriptorType2[VolumeDescriptorType2["SetTerminator"] = 255] = "SetTerminator";
})(VolumeDescriptorType || (VolumeDescriptorType = {}));
let VolumeDescriptor = (() => {
  var _a4;
  var _a3, _b3;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _type_decorators;
  let _type_initializers = [];
  let _type_extraInitializers = [];
  let _standardIdentifier_decorators;
  let _standardIdentifier_initializers = [];
  let _standardIdentifier_extraInitializers = [];
  let _version_decorators;
  let _version_initializers = [];
  let _version_extraInitializers = [];
  let ___padding__7_decorators;
  let ___padding__7_initializers = [];
  let ___padding__7_extraInitializers = [];
  _a4 = class {
    constructor(_data) {
      __publicField(this, "_data");
      __publicField(this, "type", __runInitializers$1(this, _type_initializers, void 0));
      __publicField(this, "standardIdentifier", (__runInitializers$1(this, _type_extraInitializers), __runInitializers$1(this, _standardIdentifier_initializers, "")));
      __publicField(this, "version", (__runInitializers$1(this, _standardIdentifier_extraInitializers), __runInitializers$1(this, _version_initializers, void 0)));
      __publicField(this, "__padding__7", (__runInitializers$1(this, _version_extraInitializers), __runInitializers$1(this, ___padding__7_initializers, void 0)));
      __runInitializers$1(this, ___padding__7_extraInitializers);
      this._data = _data;
      deserialize(this, _data);
    }
  }, _classThis = _a4, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _type_decorators = [(_a3 = types).uint8.bind(_a3)];
    _standardIdentifier_decorators = [types.char(5)];
    _version_decorators = [(_b3 = types).uint8.bind(_b3)];
    ___padding__7_decorators = [types.char(1)];
    __esDecorate$1(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: (obj) => "type" in obj, get: (obj) => obj.type, set: (obj, value) => {
      obj.type = value;
    } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
    __esDecorate$1(null, null, _standardIdentifier_decorators, { kind: "field", name: "standardIdentifier", static: false, private: false, access: { has: (obj) => "standardIdentifier" in obj, get: (obj) => obj.standardIdentifier, set: (obj, value) => {
      obj.standardIdentifier = value;
    } }, metadata: _metadata }, _standardIdentifier_initializers, _standardIdentifier_extraInitializers);
    __esDecorate$1(null, null, _version_decorators, { kind: "field", name: "version", static: false, private: false, access: { has: (obj) => "version" in obj, get: (obj) => obj.version, set: (obj, value) => {
      obj.version = value;
    } }, metadata: _metadata }, _version_initializers, _version_extraInitializers);
    __esDecorate$1(null, null, ___padding__7_decorators, { kind: "field", name: "__padding__7", static: false, private: false, access: { has: (obj) => "__padding__7" in obj, get: (obj) => obj.__padding__7, set: (obj, value) => {
      obj.__padding__7 = value;
    } }, metadata: _metadata }, ___padding__7_initializers, ___padding__7_extraInitializers);
    __esDecorate$1(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers$1(_classThis, _classExtraInitializers);
  })(), _a4;
  return _classThis;
})();
let PrimaryOrSupplementaryVolumeDescriptor = (() => {
  var _a4;
  var _a3, _b3, _c2, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = VolumeDescriptor;
  let __systemIdentifier_decorators;
  let __systemIdentifier_initializers = [];
  let __systemIdentifier_extraInitializers = [];
  let __volumeIdentifier_decorators;
  let __volumeIdentifier_initializers = [];
  let __volumeIdentifier_extraInitializers = [];
  let ___padding__72_decorators;
  let ___padding__72_initializers = [];
  let ___padding__72_extraInitializers = [];
  let _volumeSpaceSize_decorators;
  let _volumeSpaceSize_initializers = [];
  let _volumeSpaceSize_extraInitializers = [];
  let __volumeSpaceSizeBE_decorators;
  let __volumeSpaceSizeBE_initializers = [];
  let __volumeSpaceSizeBE_extraInitializers = [];
  let _escapeSequence_decorators;
  let _escapeSequence_initializers = [];
  let _escapeSequence_extraInitializers = [];
  let _volumeSetSize_decorators;
  let _volumeSetSize_initializers = [];
  let _volumeSetSize_extraInitializers = [];
  let __volumeSetSizeBE_decorators;
  let __volumeSetSizeBE_initializers = [];
  let __volumeSetSizeBE_extraInitializers = [];
  let _volumeSequenceNumber_decorators;
  let _volumeSequenceNumber_initializers = [];
  let _volumeSequenceNumber_extraInitializers = [];
  let __volumeSequenceNumberBE_decorators;
  let __volumeSequenceNumberBE_initializers = [];
  let __volumeSequenceNumberBE_extraInitializers = [];
  let _logicalBlockSize_decorators;
  let _logicalBlockSize_initializers = [];
  let _logicalBlockSize_extraInitializers = [];
  let __logicalBlockSizeBE_decorators;
  let __logicalBlockSizeBE_initializers = [];
  let __logicalBlockSizeBE_extraInitializers = [];
  let _pathTableSize_decorators;
  let _pathTableSize_initializers = [];
  let _pathTableSize_extraInitializers = [];
  let __pathTableSizeBE_decorators;
  let __pathTableSizeBE_initializers = [];
  let __pathTableSizeBE_extraInitializers = [];
  let _locationOfTypeLPathTable_decorators;
  let _locationOfTypeLPathTable_initializers = [];
  let _locationOfTypeLPathTable_extraInitializers = [];
  let _locationOfOptionalTypeLPathTable_decorators;
  let _locationOfOptionalTypeLPathTable_initializers = [];
  let _locationOfOptionalTypeLPathTable_extraInitializers = [];
  let __locationOfTypeMPathTable_decorators;
  let __locationOfTypeMPathTable_initializers = [];
  let __locationOfTypeMPathTable_extraInitializers = [];
  let __locationOfOptionalTypeMPathTable_decorators;
  let __locationOfOptionalTypeMPathTable_initializers = [];
  let __locationOfOptionalTypeMPathTable_extraInitializers = [];
  let __root_decorators;
  let __root_initializers = [];
  let __root_extraInitializers = [];
  let __volumeSetIdentifier_decorators;
  let __volumeSetIdentifier_initializers = [];
  let __volumeSetIdentifier_extraInitializers = [];
  let __publisherIdentifier_decorators;
  let __publisherIdentifier_initializers = [];
  let __publisherIdentifier_extraInitializers = [];
  let __dataPreparerIdentifier_decorators;
  let __dataPreparerIdentifier_initializers = [];
  let __dataPreparerIdentifier_extraInitializers = [];
  let __applicationIdentifier_decorators;
  let __applicationIdentifier_initializers = [];
  let __applicationIdentifier_extraInitializers = [];
  let __copyrightFileIdentifier_decorators;
  let __copyrightFileIdentifier_initializers = [];
  let __copyrightFileIdentifier_extraInitializers = [];
  let __abstractFileIdentifier_decorators;
  let __abstractFileIdentifier_initializers = [];
  let __abstractFileIdentifier_extraInitializers = [];
  let __bibliographicFileIdentifier_decorators;
  let __bibliographicFileIdentifier_initializers = [];
  let __bibliographicFileIdentifier_extraInitializers = [];
  let _volumeCreationDate_decorators;
  let _volumeCreationDate_initializers = [];
  let _volumeCreationDate_extraInitializers = [];
  let _volumeModificationDate_decorators;
  let _volumeModificationDate_initializers = [];
  let _volumeModificationDate_extraInitializers = [];
  let _volumeExpirationDate_decorators;
  let _volumeExpirationDate_initializers = [];
  let _volumeExpirationDate_extraInitializers = [];
  let _volumeEffectiveDate_decorators;
  let _volumeEffectiveDate_initializers = [];
  let _volumeEffectiveDate_extraInitializers = [];
  let _fileStructureVersion_decorators;
  let _fileStructureVersion_initializers = [];
  let _fileStructureVersion_extraInitializers = [];
  let _applicationUsed_decorators;
  let _applicationUsed_initializers = [];
  let _applicationUsed_extraInitializers = [];
  let _reserved_decorators;
  let _reserved_initializers = [];
  let _reserved_extraInitializers = [];
  _a4 = class extends _classSuper {
    constructor(_data) {
      super(_data);
      __publicField(this, "_decoder");
      /**
       * The name of the system that can act upon sectors 0x00-0x0F for the volume.
       */
      __publicField(this, "_systemIdentifier", __runInitializers$1(this, __systemIdentifier_initializers, new Uint8Array(32)));
      /**
       * Identification of this volume.
       */
      __publicField(this, "_volumeIdentifier", (__runInitializers$1(this, __systemIdentifier_extraInitializers), __runInitializers$1(this, __volumeIdentifier_initializers, new Uint8Array(32))));
      __publicField(this, "__padding__72", (__runInitializers$1(this, __volumeIdentifier_extraInitializers), __runInitializers$1(this, ___padding__72_initializers, void 0)));
      /**
       * Number of Logical Blocks in which the volume is recorded.
       */
      __publicField(this, "volumeSpaceSize", (__runInitializers$1(this, ___padding__72_extraInitializers), __runInitializers$1(this, _volumeSpaceSize_initializers, void 0)));
      __publicField(this, "_volumeSpaceSizeBE", (__runInitializers$1(this, _volumeSpaceSize_extraInitializers), __runInitializers$1(this, __volumeSpaceSizeBE_initializers, void 0)));
      /**
       * This is only used by Joliet
       */
      __publicField(this, "escapeSequence", (__runInitializers$1(this, __volumeSpaceSizeBE_extraInitializers), __runInitializers$1(this, _escapeSequence_initializers, new Uint8Array(32))));
      /**
       * The size of the set in this logical volume (number of disks).
       */
      __publicField(this, "volumeSetSize", (__runInitializers$1(this, _escapeSequence_extraInitializers), __runInitializers$1(this, _volumeSetSize_initializers, void 0)));
      __publicField(this, "_volumeSetSizeBE", (__runInitializers$1(this, _volumeSetSize_extraInitializers), __runInitializers$1(this, __volumeSetSizeBE_initializers, void 0)));
      /**
       * The number of this disk in the Volume Set.
       */
      __publicField(this, "volumeSequenceNumber", (__runInitializers$1(this, __volumeSetSizeBE_extraInitializers), __runInitializers$1(this, _volumeSequenceNumber_initializers, void 0)));
      __publicField(this, "_volumeSequenceNumberBE", (__runInitializers$1(this, _volumeSequenceNumber_extraInitializers), __runInitializers$1(this, __volumeSequenceNumberBE_initializers, void 0)));
      /**
       * The size in bytes of a logical block.
       * NB: This means that a logical block on a CD could be something other than 2 KiB!
       */
      __publicField(this, "logicalBlockSize", (__runInitializers$1(this, __volumeSequenceNumberBE_extraInitializers), __runInitializers$1(this, _logicalBlockSize_initializers, void 0)));
      __publicField(this, "_logicalBlockSizeBE", (__runInitializers$1(this, _logicalBlockSize_extraInitializers), __runInitializers$1(this, __logicalBlockSizeBE_initializers, void 0)));
      /**
       * The size in bytes of the path table.
       */
      __publicField(this, "pathTableSize", (__runInitializers$1(this, __logicalBlockSizeBE_extraInitializers), __runInitializers$1(this, _pathTableSize_initializers, void 0)));
      __publicField(this, "_pathTableSizeBE", (__runInitializers$1(this, _pathTableSize_extraInitializers), __runInitializers$1(this, __pathTableSizeBE_initializers, void 0)));
      /**
       * LBA location of the path table.
       * The path table pointed to contains only little-endian values.
       */
      __publicField(this, "locationOfTypeLPathTable", (__runInitializers$1(this, __pathTableSizeBE_extraInitializers), __runInitializers$1(this, _locationOfTypeLPathTable_initializers, void 0)));
      /**
       * LBA location of the optional path table.
       * The path table pointed to contains only little-endian values.
       * Zero means that no optional path table exists.
       */
      __publicField(this, "locationOfOptionalTypeLPathTable", (__runInitializers$1(this, _locationOfTypeLPathTable_extraInitializers), __runInitializers$1(this, _locationOfOptionalTypeLPathTable_initializers, void 0)));
      __publicField(this, "_locationOfTypeMPathTable", (__runInitializers$1(this, _locationOfOptionalTypeLPathTable_extraInitializers), __runInitializers$1(this, __locationOfTypeMPathTable_initializers, void 0)));
      __publicField(this, "_locationOfOptionalTypeMPathTable", (__runInitializers$1(this, __locationOfTypeMPathTable_extraInitializers), __runInitializers$1(this, __locationOfOptionalTypeMPathTable_initializers, void 0)));
      /**
       * Directory entry for the root directory.
       * Note that this is not an LBA address,
       * it is the actual Directory Record,
       * which contains a single byte Directory Identifier (0x00),
       * hence the fixed 34 byte size.
       */
      __publicField(this, "_root", (__runInitializers$1(this, __locationOfOptionalTypeMPathTable_extraInitializers), __runInitializers$1(this, __root_initializers, void 0)));
      __publicField(this, "_volumeSetIdentifier", (__runInitializers$1(this, __root_extraInitializers), __runInitializers$1(this, __volumeSetIdentifier_initializers, new Uint8Array(128))));
      __publicField(this, "_publisherIdentifier", (__runInitializers$1(this, __volumeSetIdentifier_extraInitializers), __runInitializers$1(this, __publisherIdentifier_initializers, new Uint8Array(128))));
      __publicField(this, "_dataPreparerIdentifier", (__runInitializers$1(this, __publisherIdentifier_extraInitializers), __runInitializers$1(this, __dataPreparerIdentifier_initializers, new Uint8Array(128))));
      __publicField(this, "_applicationIdentifier", (__runInitializers$1(this, __dataPreparerIdentifier_extraInitializers), __runInitializers$1(this, __applicationIdentifier_initializers, new Uint8Array(128))));
      __publicField(this, "_copyrightFileIdentifier", (__runInitializers$1(this, __applicationIdentifier_extraInitializers), __runInitializers$1(this, __copyrightFileIdentifier_initializers, new Uint8Array(38))));
      __publicField(this, "_abstractFileIdentifier", (__runInitializers$1(this, __copyrightFileIdentifier_extraInitializers), __runInitializers$1(this, __abstractFileIdentifier_initializers, new Uint8Array(36))));
      __publicField(this, "_bibliographicFileIdentifier", (__runInitializers$1(this, __abstractFileIdentifier_extraInitializers), __runInitializers$1(this, __bibliographicFileIdentifier_initializers, new Uint8Array(37))));
      __publicField(this, "volumeCreationDate", (__runInitializers$1(this, __bibliographicFileIdentifier_extraInitializers), __runInitializers$1(this, _volumeCreationDate_initializers, new LongFormDate())));
      __publicField(this, "volumeModificationDate", (__runInitializers$1(this, _volumeCreationDate_extraInitializers), __runInitializers$1(this, _volumeModificationDate_initializers, new LongFormDate())));
      __publicField(this, "volumeExpirationDate", (__runInitializers$1(this, _volumeModificationDate_extraInitializers), __runInitializers$1(this, _volumeExpirationDate_initializers, new LongFormDate())));
      __publicField(this, "volumeEffectiveDate", (__runInitializers$1(this, _volumeExpirationDate_extraInitializers), __runInitializers$1(this, _volumeEffectiveDate_initializers, new LongFormDate())));
      __publicField(this, "fileStructureVersion", (__runInitializers$1(this, _volumeEffectiveDate_extraInitializers), __runInitializers$1(this, _fileStructureVersion_initializers, void 0)));
      __publicField(this, "applicationUsed", (__runInitializers$1(this, _fileStructureVersion_extraInitializers), __runInitializers$1(this, _applicationUsed_initializers, new Uint8Array(512))));
      __publicField(this, "reserved", (__runInitializers$1(this, _applicationUsed_extraInitializers), __runInitializers$1(this, _reserved_initializers, new Uint8Array(653))));
      __runInitializers$1(this, _reserved_extraInitializers);
      deserialize(this, _data);
    }
    _decode(data) {
      this._decoder || (this._decoder = new TextDecoder(this.name == "Joilet" ? "utf-16be" : "utf-8"));
      return this._decoder.decode(data).toLowerCase();
    }
    /**
     * The name of the system that can act upon sectors 0x00-0x0F for the volume.
     */
    get systemIdentifier() {
      return this._decode(this._systemIdentifier);
    }
    /**
     * Identification of this volume.
     */
    get volumeIdentifier() {
      return this._decode(this._volumeIdentifier);
    }
    get locationOfTypeMPathTable() {
      return new DataView(this._data.buffer).getUint32(148);
    }
    locationOfOptionalTypeMPathTable() {
      return new DataView(this._data.buffer).getUint32(152);
    }
    rootDirectoryEntry(isoData) {
      if (!this._root) {
        this._root = new DirectoryRecord(this._data.slice(156), -1);
        this._root.rootCheckForRockRidge(isoData);
      }
      this._root._kind = this.name;
      return this._root;
    }
    get volumeSetIdentifier() {
      return this._decode(this._volumeIdentifier);
    }
    get publisherIdentifier() {
      return this._decode(this._publisherIdentifier);
    }
    get dataPreparerIdentifier() {
      return this._decode(this._dataPreparerIdentifier);
    }
    get applicationIdentifier() {
      return this._decode(this._applicationIdentifier);
    }
    get copyrightFileIdentifier() {
      return this._decode(this._copyrightFileIdentifier);
    }
    get abstractFileIdentifier() {
      return this._decode(this._abstractFileIdentifier);
    }
    get bibliographicFileIdentifier() {
      return this._decode(this._bibliographicFileIdentifier);
    }
    toString() {
      return `${this.name} CD-ROM
				System id: ${this.systemIdentifier}
				Volume id: ${this.volumeIdentifier}
				Volume set id: ${this.volumeSetIdentifier}
				Publisher id: ${this.publisherIdentifier}
				Data preparer id: ${this.dataPreparerIdentifier}
				Application id: ${this.applicationIdentifier}
				Copyright file id: ${this.copyrightFileIdentifier}
				Abstract file id: ${this.abstractFileIdentifier}
				Bibliographic file id: ${this.bibliographicFileIdentifier}
				Volume set size: ${this.volumeSetSize}
				Volume sequence number: ${this.volumeSequenceNumber}
				Logical block size: ${this.logicalBlockSize}
				Volume size: ${this.volumeSpaceSize}`.replaceAll("	", "");
    }
  }, _classThis = _a4, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
    __systemIdentifier_decorators = [types.char(32)];
    __volumeIdentifier_decorators = [types.char(32)];
    ___padding__72_decorators = [types.char(8)];
    _volumeSpaceSize_decorators = [(_a3 = types).uint32.bind(_a3)];
    __volumeSpaceSizeBE_decorators = [(_b3 = types).uint32.bind(_b3)];
    _escapeSequence_decorators = [types.char(32)];
    _volumeSetSize_decorators = [(_c2 = types).uint16.bind(_c2)];
    __volumeSetSizeBE_decorators = [(_d = types).uint16.bind(_d)];
    _volumeSequenceNumber_decorators = [(_e = types).uint16.bind(_e)];
    __volumeSequenceNumberBE_decorators = [(_f = types).uint16.bind(_f)];
    _logicalBlockSize_decorators = [(_g = types).uint16.bind(_g)];
    __logicalBlockSizeBE_decorators = [(_h = types).uint16.bind(_h)];
    _pathTableSize_decorators = [(_j = types).uint32.bind(_j)];
    __pathTableSizeBE_decorators = [(_k = types).uint32.bind(_k)];
    _locationOfTypeLPathTable_decorators = [(_l = types).uint32.bind(_l)];
    _locationOfOptionalTypeLPathTable_decorators = [(_m = types).uint32.bind(_m)];
    __locationOfTypeMPathTable_decorators = [(_o = types).uint32.bind(_o)];
    __locationOfOptionalTypeMPathTable_decorators = [(_p = types).uint32.bind(_p)];
    __root_decorators = [member(DirectoryRecord)];
    __volumeSetIdentifier_decorators = [types.char(128)];
    __publisherIdentifier_decorators = [types.char(128)];
    __dataPreparerIdentifier_decorators = [types.char(128)];
    __applicationIdentifier_decorators = [types.char(128)];
    __copyrightFileIdentifier_decorators = [types.char(38)];
    __abstractFileIdentifier_decorators = [types.char(36)];
    __bibliographicFileIdentifier_decorators = [types.char(37)];
    _volumeCreationDate_decorators = [member(LongFormDate)];
    _volumeModificationDate_decorators = [member(LongFormDate)];
    _volumeExpirationDate_decorators = [member(LongFormDate)];
    _volumeEffectiveDate_decorators = [member(LongFormDate)];
    _fileStructureVersion_decorators = [(_q = types).uint8.bind(_q)];
    _applicationUsed_decorators = [types.char(512)];
    _reserved_decorators = [types.char(653)];
    __esDecorate$1(null, null, __systemIdentifier_decorators, { kind: "field", name: "_systemIdentifier", static: false, private: false, access: { has: (obj) => "_systemIdentifier" in obj, get: (obj) => obj._systemIdentifier, set: (obj, value) => {
      obj._systemIdentifier = value;
    } }, metadata: _metadata }, __systemIdentifier_initializers, __systemIdentifier_extraInitializers);
    __esDecorate$1(null, null, __volumeIdentifier_decorators, { kind: "field", name: "_volumeIdentifier", static: false, private: false, access: { has: (obj) => "_volumeIdentifier" in obj, get: (obj) => obj._volumeIdentifier, set: (obj, value) => {
      obj._volumeIdentifier = value;
    } }, metadata: _metadata }, __volumeIdentifier_initializers, __volumeIdentifier_extraInitializers);
    __esDecorate$1(null, null, ___padding__72_decorators, { kind: "field", name: "__padding__72", static: false, private: false, access: { has: (obj) => "__padding__72" in obj, get: (obj) => obj.__padding__72, set: (obj, value) => {
      obj.__padding__72 = value;
    } }, metadata: _metadata }, ___padding__72_initializers, ___padding__72_extraInitializers);
    __esDecorate$1(null, null, _volumeSpaceSize_decorators, { kind: "field", name: "volumeSpaceSize", static: false, private: false, access: { has: (obj) => "volumeSpaceSize" in obj, get: (obj) => obj.volumeSpaceSize, set: (obj, value) => {
      obj.volumeSpaceSize = value;
    } }, metadata: _metadata }, _volumeSpaceSize_initializers, _volumeSpaceSize_extraInitializers);
    __esDecorate$1(null, null, __volumeSpaceSizeBE_decorators, { kind: "field", name: "_volumeSpaceSizeBE", static: false, private: false, access: { has: (obj) => "_volumeSpaceSizeBE" in obj, get: (obj) => obj._volumeSpaceSizeBE, set: (obj, value) => {
      obj._volumeSpaceSizeBE = value;
    } }, metadata: _metadata }, __volumeSpaceSizeBE_initializers, __volumeSpaceSizeBE_extraInitializers);
    __esDecorate$1(null, null, _escapeSequence_decorators, { kind: "field", name: "escapeSequence", static: false, private: false, access: { has: (obj) => "escapeSequence" in obj, get: (obj) => obj.escapeSequence, set: (obj, value) => {
      obj.escapeSequence = value;
    } }, metadata: _metadata }, _escapeSequence_initializers, _escapeSequence_extraInitializers);
    __esDecorate$1(null, null, _volumeSetSize_decorators, { kind: "field", name: "volumeSetSize", static: false, private: false, access: { has: (obj) => "volumeSetSize" in obj, get: (obj) => obj.volumeSetSize, set: (obj, value) => {
      obj.volumeSetSize = value;
    } }, metadata: _metadata }, _volumeSetSize_initializers, _volumeSetSize_extraInitializers);
    __esDecorate$1(null, null, __volumeSetSizeBE_decorators, { kind: "field", name: "_volumeSetSizeBE", static: false, private: false, access: { has: (obj) => "_volumeSetSizeBE" in obj, get: (obj) => obj._volumeSetSizeBE, set: (obj, value) => {
      obj._volumeSetSizeBE = value;
    } }, metadata: _metadata }, __volumeSetSizeBE_initializers, __volumeSetSizeBE_extraInitializers);
    __esDecorate$1(null, null, _volumeSequenceNumber_decorators, { kind: "field", name: "volumeSequenceNumber", static: false, private: false, access: { has: (obj) => "volumeSequenceNumber" in obj, get: (obj) => obj.volumeSequenceNumber, set: (obj, value) => {
      obj.volumeSequenceNumber = value;
    } }, metadata: _metadata }, _volumeSequenceNumber_initializers, _volumeSequenceNumber_extraInitializers);
    __esDecorate$1(null, null, __volumeSequenceNumberBE_decorators, { kind: "field", name: "_volumeSequenceNumberBE", static: false, private: false, access: { has: (obj) => "_volumeSequenceNumberBE" in obj, get: (obj) => obj._volumeSequenceNumberBE, set: (obj, value) => {
      obj._volumeSequenceNumberBE = value;
    } }, metadata: _metadata }, __volumeSequenceNumberBE_initializers, __volumeSequenceNumberBE_extraInitializers);
    __esDecorate$1(null, null, _logicalBlockSize_decorators, { kind: "field", name: "logicalBlockSize", static: false, private: false, access: { has: (obj) => "logicalBlockSize" in obj, get: (obj) => obj.logicalBlockSize, set: (obj, value) => {
      obj.logicalBlockSize = value;
    } }, metadata: _metadata }, _logicalBlockSize_initializers, _logicalBlockSize_extraInitializers);
    __esDecorate$1(null, null, __logicalBlockSizeBE_decorators, { kind: "field", name: "_logicalBlockSizeBE", static: false, private: false, access: { has: (obj) => "_logicalBlockSizeBE" in obj, get: (obj) => obj._logicalBlockSizeBE, set: (obj, value) => {
      obj._logicalBlockSizeBE = value;
    } }, metadata: _metadata }, __logicalBlockSizeBE_initializers, __logicalBlockSizeBE_extraInitializers);
    __esDecorate$1(null, null, _pathTableSize_decorators, { kind: "field", name: "pathTableSize", static: false, private: false, access: { has: (obj) => "pathTableSize" in obj, get: (obj) => obj.pathTableSize, set: (obj, value) => {
      obj.pathTableSize = value;
    } }, metadata: _metadata }, _pathTableSize_initializers, _pathTableSize_extraInitializers);
    __esDecorate$1(null, null, __pathTableSizeBE_decorators, { kind: "field", name: "_pathTableSizeBE", static: false, private: false, access: { has: (obj) => "_pathTableSizeBE" in obj, get: (obj) => obj._pathTableSizeBE, set: (obj, value) => {
      obj._pathTableSizeBE = value;
    } }, metadata: _metadata }, __pathTableSizeBE_initializers, __pathTableSizeBE_extraInitializers);
    __esDecorate$1(null, null, _locationOfTypeLPathTable_decorators, { kind: "field", name: "locationOfTypeLPathTable", static: false, private: false, access: { has: (obj) => "locationOfTypeLPathTable" in obj, get: (obj) => obj.locationOfTypeLPathTable, set: (obj, value) => {
      obj.locationOfTypeLPathTable = value;
    } }, metadata: _metadata }, _locationOfTypeLPathTable_initializers, _locationOfTypeLPathTable_extraInitializers);
    __esDecorate$1(null, null, _locationOfOptionalTypeLPathTable_decorators, { kind: "field", name: "locationOfOptionalTypeLPathTable", static: false, private: false, access: { has: (obj) => "locationOfOptionalTypeLPathTable" in obj, get: (obj) => obj.locationOfOptionalTypeLPathTable, set: (obj, value) => {
      obj.locationOfOptionalTypeLPathTable = value;
    } }, metadata: _metadata }, _locationOfOptionalTypeLPathTable_initializers, _locationOfOptionalTypeLPathTable_extraInitializers);
    __esDecorate$1(null, null, __locationOfTypeMPathTable_decorators, { kind: "field", name: "_locationOfTypeMPathTable", static: false, private: false, access: { has: (obj) => "_locationOfTypeMPathTable" in obj, get: (obj) => obj._locationOfTypeMPathTable, set: (obj, value) => {
      obj._locationOfTypeMPathTable = value;
    } }, metadata: _metadata }, __locationOfTypeMPathTable_initializers, __locationOfTypeMPathTable_extraInitializers);
    __esDecorate$1(null, null, __locationOfOptionalTypeMPathTable_decorators, { kind: "field", name: "_locationOfOptionalTypeMPathTable", static: false, private: false, access: { has: (obj) => "_locationOfOptionalTypeMPathTable" in obj, get: (obj) => obj._locationOfOptionalTypeMPathTable, set: (obj, value) => {
      obj._locationOfOptionalTypeMPathTable = value;
    } }, metadata: _metadata }, __locationOfOptionalTypeMPathTable_initializers, __locationOfOptionalTypeMPathTable_extraInitializers);
    __esDecorate$1(null, null, __root_decorators, { kind: "field", name: "_root", static: false, private: false, access: { has: (obj) => "_root" in obj, get: (obj) => obj._root, set: (obj, value) => {
      obj._root = value;
    } }, metadata: _metadata }, __root_initializers, __root_extraInitializers);
    __esDecorate$1(null, null, __volumeSetIdentifier_decorators, { kind: "field", name: "_volumeSetIdentifier", static: false, private: false, access: { has: (obj) => "_volumeSetIdentifier" in obj, get: (obj) => obj._volumeSetIdentifier, set: (obj, value) => {
      obj._volumeSetIdentifier = value;
    } }, metadata: _metadata }, __volumeSetIdentifier_initializers, __volumeSetIdentifier_extraInitializers);
    __esDecorate$1(null, null, __publisherIdentifier_decorators, { kind: "field", name: "_publisherIdentifier", static: false, private: false, access: { has: (obj) => "_publisherIdentifier" in obj, get: (obj) => obj._publisherIdentifier, set: (obj, value) => {
      obj._publisherIdentifier = value;
    } }, metadata: _metadata }, __publisherIdentifier_initializers, __publisherIdentifier_extraInitializers);
    __esDecorate$1(null, null, __dataPreparerIdentifier_decorators, { kind: "field", name: "_dataPreparerIdentifier", static: false, private: false, access: { has: (obj) => "_dataPreparerIdentifier" in obj, get: (obj) => obj._dataPreparerIdentifier, set: (obj, value) => {
      obj._dataPreparerIdentifier = value;
    } }, metadata: _metadata }, __dataPreparerIdentifier_initializers, __dataPreparerIdentifier_extraInitializers);
    __esDecorate$1(null, null, __applicationIdentifier_decorators, { kind: "field", name: "_applicationIdentifier", static: false, private: false, access: { has: (obj) => "_applicationIdentifier" in obj, get: (obj) => obj._applicationIdentifier, set: (obj, value) => {
      obj._applicationIdentifier = value;
    } }, metadata: _metadata }, __applicationIdentifier_initializers, __applicationIdentifier_extraInitializers);
    __esDecorate$1(null, null, __copyrightFileIdentifier_decorators, { kind: "field", name: "_copyrightFileIdentifier", static: false, private: false, access: { has: (obj) => "_copyrightFileIdentifier" in obj, get: (obj) => obj._copyrightFileIdentifier, set: (obj, value) => {
      obj._copyrightFileIdentifier = value;
    } }, metadata: _metadata }, __copyrightFileIdentifier_initializers, __copyrightFileIdentifier_extraInitializers);
    __esDecorate$1(null, null, __abstractFileIdentifier_decorators, { kind: "field", name: "_abstractFileIdentifier", static: false, private: false, access: { has: (obj) => "_abstractFileIdentifier" in obj, get: (obj) => obj._abstractFileIdentifier, set: (obj, value) => {
      obj._abstractFileIdentifier = value;
    } }, metadata: _metadata }, __abstractFileIdentifier_initializers, __abstractFileIdentifier_extraInitializers);
    __esDecorate$1(null, null, __bibliographicFileIdentifier_decorators, { kind: "field", name: "_bibliographicFileIdentifier", static: false, private: false, access: { has: (obj) => "_bibliographicFileIdentifier" in obj, get: (obj) => obj._bibliographicFileIdentifier, set: (obj, value) => {
      obj._bibliographicFileIdentifier = value;
    } }, metadata: _metadata }, __bibliographicFileIdentifier_initializers, __bibliographicFileIdentifier_extraInitializers);
    __esDecorate$1(null, null, _volumeCreationDate_decorators, { kind: "field", name: "volumeCreationDate", static: false, private: false, access: { has: (obj) => "volumeCreationDate" in obj, get: (obj) => obj.volumeCreationDate, set: (obj, value) => {
      obj.volumeCreationDate = value;
    } }, metadata: _metadata }, _volumeCreationDate_initializers, _volumeCreationDate_extraInitializers);
    __esDecorate$1(null, null, _volumeModificationDate_decorators, { kind: "field", name: "volumeModificationDate", static: false, private: false, access: { has: (obj) => "volumeModificationDate" in obj, get: (obj) => obj.volumeModificationDate, set: (obj, value) => {
      obj.volumeModificationDate = value;
    } }, metadata: _metadata }, _volumeModificationDate_initializers, _volumeModificationDate_extraInitializers);
    __esDecorate$1(null, null, _volumeExpirationDate_decorators, { kind: "field", name: "volumeExpirationDate", static: false, private: false, access: { has: (obj) => "volumeExpirationDate" in obj, get: (obj) => obj.volumeExpirationDate, set: (obj, value) => {
      obj.volumeExpirationDate = value;
    } }, metadata: _metadata }, _volumeExpirationDate_initializers, _volumeExpirationDate_extraInitializers);
    __esDecorate$1(null, null, _volumeEffectiveDate_decorators, { kind: "field", name: "volumeEffectiveDate", static: false, private: false, access: { has: (obj) => "volumeEffectiveDate" in obj, get: (obj) => obj.volumeEffectiveDate, set: (obj, value) => {
      obj.volumeEffectiveDate = value;
    } }, metadata: _metadata }, _volumeEffectiveDate_initializers, _volumeEffectiveDate_extraInitializers);
    __esDecorate$1(null, null, _fileStructureVersion_decorators, { kind: "field", name: "fileStructureVersion", static: false, private: false, access: { has: (obj) => "fileStructureVersion" in obj, get: (obj) => obj.fileStructureVersion, set: (obj, value) => {
      obj.fileStructureVersion = value;
    } }, metadata: _metadata }, _fileStructureVersion_initializers, _fileStructureVersion_extraInitializers);
    __esDecorate$1(null, null, _applicationUsed_decorators, { kind: "field", name: "applicationUsed", static: false, private: false, access: { has: (obj) => "applicationUsed" in obj, get: (obj) => obj.applicationUsed, set: (obj, value) => {
      obj.applicationUsed = value;
    } }, metadata: _metadata }, _applicationUsed_initializers, _applicationUsed_extraInitializers);
    __esDecorate$1(null, null, _reserved_decorators, { kind: "field", name: "reserved", static: false, private: false, access: { has: (obj) => "reserved" in obj, get: (obj) => obj.reserved, set: (obj, value) => {
      obj.reserved = value;
    } }, metadata: _metadata }, _reserved_initializers, _reserved_extraInitializers);
    __esDecorate$1(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers$1(_classThis, _classExtraInitializers);
  })(), _a4;
  return _classThis;
})();
let PrimaryVolumeDescriptor = (() => {
  var _a3;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = PrimaryOrSupplementaryVolumeDescriptor;
  _a3 = class extends _classSuper {
    constructor(data) {
      super(data);
      __publicField(this, "name", "ISO9660");
      if (this.type !== VolumeDescriptorType.Primary) {
        throw new ErrnoError(Errno.EIO, "Invalid primary volume descriptor.");
      }
    }
  }, _classThis = _a3, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
    __esDecorate$1(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers$1(_classThis, _classExtraInitializers);
  })(), _a3;
  return _classThis;
})();
let SupplementaryVolumeDescriptor = (() => {
  var _a3;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _classSuper = PrimaryOrSupplementaryVolumeDescriptor;
  _a3 = class extends _classSuper {
    constructor(data) {
      super(data);
      __publicField(this, "name", "Joliet");
      if (this.type !== VolumeDescriptorType.Supplementary) {
        throw new ErrnoError(Errno.EIO, "Invalid supplementary volume descriptor.");
      }
      if (this.escapeSequence[0] !== 37 || this.escapeSequence[1] !== 47 || ![64, 67, 69].includes(this.escapeSequence[2])) {
        throw new ErrnoError(Errno.EIO, "Unrecognized escape sequence for SupplementaryVolumeDescriptor: " + decodeRaw(this.escapeSequence));
      }
    }
  }, _classThis = _a3, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
    __esDecorate$1(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers$1(_classThis, _classExtraInitializers);
  })(), _a3;
  return _classThis;
})();
class IsoFS extends Readonly(Sync(FileSystem)) {
  /**
   * **Deprecated. Please use IsoFS.Create() method instead.**
   *
   * Constructs a read-only file system from the given ISO.
   * @param data The ISO file in a buffer.
   * @param name The name of the ISO (optional; used for debug messages / identification via getName()).
   */
  constructor({ data, name = "" }) {
    var _a3, _b3;
    super(543781743, "iso9660");
    __publicField(this, "data");
    __publicField(this, "_pvd");
    __publicField(this, "_root");
    __publicField(this, "_name");
    this._name = name;
    this.data = data;
    let vdTerminatorFound = false;
    let i = 16 * 2048;
    const candidateVDs = new Array();
    while (!vdTerminatorFound && i < data.length) {
      const slice = this.data.slice(i);
      switch (slice[0]) {
        case VolumeDescriptorType.Primary:
          candidateVDs.push(new PrimaryVolumeDescriptor(slice));
          break;
        case VolumeDescriptorType.Supplementary:
          candidateVDs.push(new SupplementaryVolumeDescriptor(slice));
          break;
        case VolumeDescriptorType.SetTerminator:
          vdTerminatorFound = true;
          break;
      }
      i += 2048;
    }
    if (!candidateVDs.length) {
      throw new ErrnoError(Errno.EIO, "Unable to find a suitable volume descriptor.");
    }
    for (const v of candidateVDs) {
      if (((_a3 = this._pvd) == null ? void 0 : _a3.type) != VolumeDescriptorType.Supplementary) {
        this._pvd = v;
      }
    }
    if (!this._pvd) {
      throw new ErrnoError(Errno.EINVAL, "No primary volume descriptor");
    }
    this._root = this._pvd.rootDirectoryEntry(this.data);
    this.label = ["iso", this._name, (_b3 = this._pvd) == null ? void 0 : _b3.name, this._root && this._root.hasRockRidge && "RockRidge"].filter((e) => e).join(":");
  }
  usage() {
    return {
      totalSpace: this.data.byteLength,
      freeSpace: 0
    };
  }
  statSync(path) {
    const record = this._getDirectoryRecord(path);
    if (!record)
      throw ErrnoError.With("ENOENT", path, "stat");
    return this._getStats(path, record);
  }
  openFileSync(path, flag) {
    if (isWriteable(flag))
      throw new ErrnoError(Errno.EPERM, path);
    const record = this._getDirectoryRecord(path);
    if (!record)
      throw ErrnoError.With("ENOENT", path, "openFile");
    if (record.isSymlink(this.data)) {
      return this.openFileSync(resolve(path, record.getSymlinkPath(this.data)), flag);
    }
    if (record.isDirectory(this.data))
      throw ErrnoError.With("EISDIR", path, "openFile");
    const stats = this._getStats(path, record);
    return new LazyFile(this, path, flag, stats);
  }
  readdirSync(path) {
    const record = this._getDirectoryRecord(path);
    if (!record)
      throw ErrnoError.With("ENOENT", path, "readdir");
    if (record.isDirectory(this.data)) {
      return Array.from(record.getDirectory(this.data).keys());
    }
    throw ErrnoError.With("ENOTDIR", path, "readdir");
  }
  readSync(path, buffer2, offset, end) {
    const record = this._getDirectoryRecord(path);
    if (!record)
      throw ErrnoError.With("ENOENT", path, "openFile");
    if (record.isDirectory(this.data)) {
      throw ErrnoError.With("EISDIR", path, "openFile");
    }
    const data = record.getFile(this.data);
    buffer2.set(data.subarray(offset, end));
  }
  _getDirectoryRecord(path) {
    if (path === "/") {
      return this._root;
    }
    const parts = path.split("/").slice(1);
    let dir = this._root;
    for (const part of parts) {
      if (!dir.isDirectory(this.data)) {
        return;
      }
      dir = dir.getDirectory(this.data).get(part);
      if (!dir) {
        return;
      }
    }
    return dir;
  }
  _getStats(path, record) {
    if (record.isSymlink(this.data)) {
      const newP = resolve(path, record.getSymlinkPath(this.data));
      const dirRec = this._getDirectoryRecord(newP);
      if (!dirRec) {
        return;
      }
      return this._getStats(newP, dirRec);
    }
    let mode = 365;
    const time = record.recordingDate.getTime();
    let atimeMs = time, mtimeMs = time, ctimeMs = time;
    if (record.hasRockRidge) {
      const entries2 = record.getSUEntries(this.data);
      for (const entry of entries2) {
        if (entry instanceof PXEntry) {
          mode = Number(entry.mode);
          continue;
        }
        if (!(entry instanceof TFEntry)) {
          continue;
        }
        const flags = entry.flags;
        if (flags & TFFlag.ACCESS) {
          atimeMs = entry.access.getTime();
        }
        if (flags & TFFlag.MODIFY) {
          mtimeMs = entry.modify.getTime();
        }
        if (flags & TFFlag.CREATION) {
          ctimeMs = entry.creation.getTime();
        }
      }
    }
    mode &= 365;
    return new Stats({
      mode: mode | (record.isDirectory(this.data) ? S_IFDIR : S_IFREG),
      size: record.dataLength,
      atimeMs,
      mtimeMs,
      ctimeMs
    });
  }
}
var u8 = Uint8Array, u16 = Uint16Array, i32 = Int32Array;
var fleb = new u8([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]);
var fdeb = new u8([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]);
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var freb = function(eb, start) {
  var b = new u16(31);
  for (var i = 0; i < 31; ++i) {
    b[i] = start += 1 << eb[i - 1];
  }
  var r = new i32(b[30]);
  for (var i = 1; i < 30; ++i) {
    for (var j = b[i]; j < b[i + 1]; ++j) {
      r[j] = j - b[i] << 5 | i;
    }
  }
  return { b, r };
};
var _a = freb(fleb, 2), fl = _a.b, revfl = _a.r;
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0), fd = _b.b;
var rev = new u16(32768);
for (var i = 0; i < 32768; ++i) {
  var x = (i & 43690) >> 1 | (i & 21845) << 1;
  x = (x & 52428) >> 2 | (x & 13107) << 2;
  x = (x & 61680) >> 4 | (x & 3855) << 4;
  rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
}
var hMap = (function(cd, mb, r) {
  var s = cd.length;
  var i = 0;
  var l = new u16(mb);
  for (; i < s; ++i) {
    if (cd[i])
      ++l[cd[i] - 1];
  }
  var le = new u16(mb);
  for (i = 1; i < mb; ++i) {
    le[i] = le[i - 1] + l[i - 1] << 1;
  }
  var co;
  if (r) {
    co = new u16(1 << mb);
    var rvb = 15 - mb;
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        var sv = i << 4 | cd[i];
        var r_1 = mb - cd[i];
        var v = le[cd[i] - 1]++ << r_1;
        for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
          co[rev[v] >> rvb] = sv;
        }
      }
    }
  } else {
    co = new u16(s);
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        co[i] = rev[le[cd[i] - 1]++] >> 15 - cd[i];
      }
    }
  }
  return co;
});
var flt = new u8(288);
for (var i = 0; i < 144; ++i)
  flt[i] = 8;
for (var i = 144; i < 256; ++i)
  flt[i] = 9;
for (var i = 256; i < 280; ++i)
  flt[i] = 7;
for (var i = 280; i < 288; ++i)
  flt[i] = 8;
var fdt = new u8(32);
for (var i = 0; i < 32; ++i)
  fdt[i] = 5;
var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
var max = function(a) {
  var m = a[0];
  for (var i = 1; i < a.length; ++i) {
    if (a[i] > m)
      m = a[i];
  }
  return m;
};
var bits = function(d, p, m) {
  var o = p / 8 | 0;
  return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
};
var bits16 = function(d, p) {
  var o = p / 8 | 0;
  return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
};
var shft = function(p) {
  return (p + 7) / 8 | 0;
};
var slc = function(v, s, e) {
  if (e == null || e > v.length)
    e = v.length;
  return new u8(v.subarray(s, e));
};
var ec = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
];
var err$1 = function(ind, msg, nt) {
  var e = new Error(msg || ec[ind]);
  e.code = ind;
  if (Error.captureStackTrace)
    Error.captureStackTrace(e, err$1);
  if (!nt)
    throw e;
  return e;
};
var inflt = function(dat, st, buf, dict) {
  var sl = dat.length, dl = 0;
  if (!sl || st.f && !st.l)
    return buf || new u8(0);
  var noBuf = !buf;
  var resize = noBuf || st.i != 2;
  var noSt = st.i;
  if (noBuf)
    buf = new u8(sl * 3);
  var cbuf = function(l2) {
    var bl = buf.length;
    if (l2 > bl) {
      var nbuf = new u8(Math.max(bl * 2, l2));
      nbuf.set(buf);
      buf = nbuf;
    }
  };
  var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
  var tbts = sl * 8;
  do {
    if (!lm) {
      final = bits(dat, pos, 1);
      var type = bits(dat, pos + 1, 3);
      pos += 3;
      if (!type) {
        var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
        if (t > sl) {
          if (noSt)
            err$1(0);
          break;
        }
        if (resize)
          cbuf(bt + l);
        buf.set(dat.subarray(s, t), bt);
        st.b = bt += l, st.p = pos = t * 8, st.f = final;
        continue;
      } else if (type == 1)
        lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
      else if (type == 2) {
        var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
        var tl = hLit + bits(dat, pos + 5, 31) + 1;
        pos += 14;
        var ldt = new u8(tl);
        var clt = new u8(19);
        for (var i = 0; i < hcLen; ++i) {
          clt[clim[i]] = bits(dat, pos + i * 3, 7);
        }
        pos += hcLen * 3;
        var clb = max(clt), clbmsk = (1 << clb) - 1;
        var clm = hMap(clt, clb, 1);
        for (var i = 0; i < tl; ) {
          var r = clm[bits(dat, pos, clbmsk)];
          pos += r & 15;
          var s = r >> 4;
          if (s < 16) {
            ldt[i++] = s;
          } else {
            var c = 0, n = 0;
            if (s == 16)
              n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
            else if (s == 17)
              n = 3 + bits(dat, pos, 7), pos += 3;
            else if (s == 18)
              n = 11 + bits(dat, pos, 127), pos += 7;
            while (n--)
              ldt[i++] = c;
          }
        }
        var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
        lbt = max(lt);
        dbt = max(dt);
        lm = hMap(lt, lbt, 1);
        dm = hMap(dt, dbt, 1);
      } else
        err$1(1);
      if (pos > tbts) {
        if (noSt)
          err$1(0);
        break;
      }
    }
    if (resize)
      cbuf(bt + 131072);
    var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
    var lpos = pos;
    for (; ; lpos = pos) {
      var c = lm[bits16(dat, pos) & lms], sym = c >> 4;
      pos += c & 15;
      if (pos > tbts) {
        if (noSt)
          err$1(0);
        break;
      }
      if (!c)
        err$1(2);
      if (sym < 256)
        buf[bt++] = sym;
      else if (sym == 256) {
        lpos = pos, lm = null;
        break;
      } else {
        var add = sym - 254;
        if (sym > 264) {
          var i = sym - 257, b = fleb[i];
          add = bits(dat, pos, (1 << b) - 1) + fl[i];
          pos += b;
        }
        var d = dm[bits16(dat, pos) & dms], dsym = d >> 4;
        if (!d)
          err$1(3);
        pos += d & 15;
        var dt = fd[dsym];
        if (dsym > 3) {
          var b = fdeb[dsym];
          dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
        }
        if (pos > tbts) {
          if (noSt)
            err$1(0);
          break;
        }
        if (resize)
          cbuf(bt + 131072);
        var end = bt + add;
        if (bt < dt) {
          var shift = dl - dt, dend = Math.min(dt, end);
          if (shift + bt < 0)
            err$1(3);
          for (; bt < dend; ++bt)
            buf[bt] = dict[shift + bt];
        }
        for (; bt < end; ++bt)
          buf[bt] = buf[bt - dt];
      }
    }
    st.l = lm, st.p = lpos, st.b = bt, st.f = final;
    if (lm)
      final = 1, st.m = lbt, st.d = dm, st.n = dbt;
  } while (!final);
  return bt != buf.length && noBuf ? slc(buf, 0, bt) : buf.subarray(0, bt);
};
var et = /* @__PURE__ */ new u8(0);
function inflateSync(data, opts) {
  return inflt(data, { i: 2 }, opts, opts);
}
var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
var tds = 0;
try {
  td.decode(et, { stream: true });
  tds = 1;
} catch (e) {
}
var CompressionMethod;
(function(CompressionMethod2) {
  CompressionMethod2[CompressionMethod2["STORED"] = 0] = "STORED";
  CompressionMethod2[CompressionMethod2["SHRUNK"] = 1] = "SHRUNK";
  CompressionMethod2[CompressionMethod2["REDUCED_1"] = 2] = "REDUCED_1";
  CompressionMethod2[CompressionMethod2["REDUCED_2"] = 3] = "REDUCED_2";
  CompressionMethod2[CompressionMethod2["REDUCED_3"] = 4] = "REDUCED_3";
  CompressionMethod2[CompressionMethod2["REDUCED_4"] = 5] = "REDUCED_4";
  CompressionMethod2[CompressionMethod2["IMPLODE"] = 6] = "IMPLODE";
  CompressionMethod2[CompressionMethod2["DEFLATE"] = 8] = "DEFLATE";
  CompressionMethod2[CompressionMethod2["DEFLATE64"] = 9] = "DEFLATE64";
  CompressionMethod2[CompressionMethod2["TERSE_OLD"] = 10] = "TERSE_OLD";
  CompressionMethod2[CompressionMethod2["BZIP2"] = 12] = "BZIP2";
  CompressionMethod2[CompressionMethod2["LZMA"] = 14] = "LZMA";
  CompressionMethod2[CompressionMethod2["TERSE_NEW"] = 18] = "TERSE_NEW";
  CompressionMethod2[CompressionMethod2["LZ77"] = 19] = "LZ77";
  CompressionMethod2[CompressionMethod2["WAVPACK"] = 97] = "WAVPACK";
  CompressionMethod2[CompressionMethod2["PPMD"] = 98] = "PPMD";
})(CompressionMethod || (CompressionMethod = {}));
const decompressionMethods = {
  [CompressionMethod.DEFLATE](data, end) {
    return inflateSync(new Uint8Array(data, 0, end));
  },
  [CompressionMethod.STORED](data, compressedSize, uncompressedSize) {
    return new Uint8Array(data, 0, uncompressedSize);
  }
};
function msdosDate(datetime) {
  return new Date(
    (datetime >> 25 & 127) + 1980,
    // year
    (datetime >> 21 & 15) - 1,
    // month
    datetime >> 16 & 31,
    // day
    datetime >> 11 & 31,
    // hour
    datetime >> 5 & 63,
    // minute
    (datetime & 31) * 2
    // second
  );
}
const extendedASCIIChars = [
  "Ç",
  "ü",
  "é",
  "â",
  "ä",
  "à",
  "å",
  "ç",
  "ê",
  "ë",
  "è",
  "ï",
  "î",
  "ì",
  "Ä",
  "Å",
  "É",
  "æ",
  "Æ",
  "ô",
  "ö",
  "ò",
  "û",
  "ù",
  "ÿ",
  "Ö",
  "Ü",
  "ø",
  "£",
  "Ø",
  "×",
  "ƒ",
  "á",
  "í",
  "ó",
  "ú",
  "ñ",
  "Ñ",
  "ª",
  "º",
  "¿",
  "®",
  "¬",
  "½",
  "¼",
  "¡",
  "«",
  "»",
  "_",
  "_",
  "_",
  "¦",
  "¦",
  "Á",
  "Â",
  "À",
  "©",
  "¦",
  "¦",
  "+",
  "+",
  "¢",
  "¥",
  "+",
  "+",
  "-",
  "-",
  "+",
  "-",
  "+",
  "ã",
  "Ã",
  "+",
  "+",
  "-",
  "-",
  "¦",
  "-",
  "+",
  "¤",
  "ð",
  "Ð",
  "Ê",
  "Ë",
  "È",
  "i",
  "Í",
  "Î",
  "Ï",
  "+",
  "+",
  "_",
  "_",
  "¦",
  "Ì",
  "_",
  "Ó",
  "ß",
  "Ô",
  "Ò",
  "õ",
  "Õ",
  "µ",
  "þ",
  "Þ",
  "Ú",
  "Û",
  "Ù",
  "ý",
  "Ý",
  "¯",
  "´",
  "­",
  "±",
  "_",
  "¾",
  "¶",
  "§",
  "÷",
  "¸",
  "°",
  "¨",
  "·",
  "¹",
  "³",
  "²",
  "_",
  " "
];
function safeDecode(buffer2, utf8, start, length) {
  if (length === 0) {
    return "";
  }
  const uintArray = new Uint8Array("buffer" in buffer2 ? buffer2.buffer : buffer2).slice(start, start + length);
  if (utf8) {
    return decodeUTF8(uintArray);
  } else {
    return [...uintArray].map((char) => char > 127 ? extendedASCIIChars[char - 128] : String.fromCharCode(char)).join("");
  }
}
var __esDecorate = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key2 = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context.access[p] = contextIn.access[p];
    context.addInitializer = function(f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key2], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field") initializers.unshift(_);
      else descriptor[key2] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
var __runInitializers = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};
var AttributeCompat;
(function(AttributeCompat2) {
  AttributeCompat2[AttributeCompat2["MSDOS"] = 0] = "MSDOS";
  AttributeCompat2[AttributeCompat2["AMIGA"] = 1] = "AMIGA";
  AttributeCompat2[AttributeCompat2["OPENVMS"] = 2] = "OPENVMS";
  AttributeCompat2[AttributeCompat2["UNIX"] = 3] = "UNIX";
  AttributeCompat2[AttributeCompat2["VM_CMS"] = 4] = "VM_CMS";
  AttributeCompat2[AttributeCompat2["ATARI_ST"] = 5] = "ATARI_ST";
  AttributeCompat2[AttributeCompat2["OS2_HPFS"] = 6] = "OS2_HPFS";
  AttributeCompat2[AttributeCompat2["MAC"] = 7] = "MAC";
  AttributeCompat2[AttributeCompat2["Z_SYSTEM"] = 8] = "Z_SYSTEM";
  AttributeCompat2[AttributeCompat2["CP_M"] = 9] = "CP_M";
  AttributeCompat2[AttributeCompat2["NTFS"] = 10] = "NTFS";
  AttributeCompat2[AttributeCompat2["MVS"] = 11] = "MVS";
  AttributeCompat2[AttributeCompat2["VSE"] = 12] = "VSE";
  AttributeCompat2[AttributeCompat2["ACORN_RISC"] = 13] = "ACORN_RISC";
  AttributeCompat2[AttributeCompat2["VFAT"] = 14] = "VFAT";
  AttributeCompat2[AttributeCompat2["ALT_MVS"] = 15] = "ALT_MVS";
  AttributeCompat2[AttributeCompat2["BEOS"] = 16] = "BEOS";
  AttributeCompat2[AttributeCompat2["TANDEM"] = 17] = "TANDEM";
  AttributeCompat2[AttributeCompat2["OS_400"] = 18] = "OS_400";
  AttributeCompat2[AttributeCompat2["OSX"] = 19] = "OSX";
})(AttributeCompat || (AttributeCompat = {}));
let LocalFileHeader = (() => {
  var _a4;
  var _a3, _b3, _c2, _d, _e, _f, _g, _h, _j, _k;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _signature_decorators;
  let _signature_initializers = [];
  let _signature_extraInitializers = [];
  let _versionNeeded_decorators;
  let _versionNeeded_initializers = [];
  let _versionNeeded_extraInitializers = [];
  let _flags_decorators;
  let _flags_initializers = [];
  let _flags_extraInitializers = [];
  let _compressionMethod_decorators;
  let _compressionMethod_initializers = [];
  let _compressionMethod_extraInitializers = [];
  let _datetime_decorators;
  let _datetime_initializers = [];
  let _datetime_extraInitializers = [];
  let _crc32_decorators;
  let _crc32_initializers = [];
  let _crc32_extraInitializers = [];
  let _compressedSize_decorators;
  let _compressedSize_initializers = [];
  let _compressedSize_extraInitializers = [];
  let _uncompressedSize_decorators;
  let _uncompressedSize_initializers = [];
  let _uncompressedSize_extraInitializers = [];
  let _nameLength_decorators;
  let _nameLength_initializers = [];
  let _nameLength_extraInitializers = [];
  let _extraLength_decorators;
  let _extraLength_initializers = [];
  let _extraLength_extraInitializers = [];
  _a4 = class {
    constructor(data) {
      __publicField(this, "data");
      __publicField(this, "signature", __runInitializers(this, _signature_initializers, void 0));
      /**
       * The minimum supported ZIP specification version needed to extract the file.
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.3
       */
      __publicField(this, "versionNeeded", (__runInitializers(this, _signature_extraInitializers), __runInitializers(this, _versionNeeded_initializers, void 0)));
      /**
       * General purpose bit flags
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.4
       */
      __publicField(this, "flags", (__runInitializers(this, _versionNeeded_extraInitializers), __runInitializers(this, _flags_initializers, void 0)));
      /**
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.5
       */
      __publicField(this, "compressionMethod", (__runInitializers(this, _flags_extraInitializers), __runInitializers(this, _compressionMethod_initializers, void 0)));
      /**
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.6
       */
      __publicField(this, "datetime", (__runInitializers(this, _compressionMethod_extraInitializers), __runInitializers(this, _datetime_initializers, void 0)));
      /**
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.7
       */
      __publicField(this, "crc32", (__runInitializers(this, _datetime_extraInitializers), __runInitializers(this, _crc32_initializers, void 0)));
      /**
       * The size of the file compressed.
       * If bit 3 of the general purpose bit flag is set, set to zero.
       * central directory's entry is used
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.8
       */
      __publicField(this, "compressedSize", (__runInitializers(this, _crc32_extraInitializers), __runInitializers(this, _compressedSize_initializers, void 0)));
      /**
       * The size of the file uncompressed
       * If bit 3 of the general purpose bit flag is set, set to zero.
       * central directory's entry is used
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.9
       */
      __publicField(this, "uncompressedSize", (__runInitializers(this, _compressedSize_extraInitializers), __runInitializers(this, _uncompressedSize_initializers, void 0)));
      /**
       * The length of the file name
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.10
       */
      __publicField(this, "nameLength", (__runInitializers(this, _uncompressedSize_extraInitializers), __runInitializers(this, _nameLength_initializers, void 0)));
      /**
       * The length of the extra field
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.11
       */
      __publicField(this, "extraLength", (__runInitializers(this, _nameLength_extraInitializers), __runInitializers(this, _extraLength_initializers, void 0)));
      __runInitializers(this, _extraLength_extraInitializers);
      this.data = data;
      deserialize(this, data);
      if (this.signature !== 67324752) {
        throw new ErrnoError(Errno.EINVAL, "Invalid Zip file: Local file header has invalid signature: " + this.signature);
      }
    }
    /**
     * The date and time are encoded in standard MS-DOS format.
     * This getter decodes the date.
     * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.6
     */
    get lastModified() {
      return msdosDate(this.datetime);
    }
    /**
     * The name of the file, with optional relative path.
     * @see CentralDirectory.fileName
     * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.17
     */
    get name() {
      return safeDecode(this.data, this.useUTF8, 30, this.nameLength);
    }
    /**
     * This should be used for storage expansion.
     * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.28
     */
    get extra() {
      const start = 30 + this.nameLength;
      return this.data.slice(start, start + this.extraLength);
    }
    get size() {
      return 30 + this.nameLength + this.extraLength;
    }
    get useUTF8() {
      return !!(this.flags & 1 << 11);
    }
  }, _classThis = _a4, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _signature_decorators = [(_a3 = types).uint32.bind(_a3)];
    _versionNeeded_decorators = [(_b3 = types).uint16.bind(_b3)];
    _flags_decorators = [(_c2 = types).uint16.bind(_c2)];
    _compressionMethod_decorators = [(_d = types).uint16.bind(_d)];
    _datetime_decorators = [(_e = types).uint32.bind(_e)];
    _crc32_decorators = [(_f = types).uint32.bind(_f)];
    _compressedSize_decorators = [(_g = types).uint32.bind(_g)];
    _uncompressedSize_decorators = [(_h = types).uint32.bind(_h)];
    _nameLength_decorators = [(_j = types).uint16.bind(_j)];
    _extraLength_decorators = [(_k = types).uint16.bind(_k)];
    __esDecorate(null, null, _signature_decorators, { kind: "field", name: "signature", static: false, private: false, access: { has: (obj) => "signature" in obj, get: (obj) => obj.signature, set: (obj, value) => {
      obj.signature = value;
    } }, metadata: _metadata }, _signature_initializers, _signature_extraInitializers);
    __esDecorate(null, null, _versionNeeded_decorators, { kind: "field", name: "versionNeeded", static: false, private: false, access: { has: (obj) => "versionNeeded" in obj, get: (obj) => obj.versionNeeded, set: (obj, value) => {
      obj.versionNeeded = value;
    } }, metadata: _metadata }, _versionNeeded_initializers, _versionNeeded_extraInitializers);
    __esDecorate(null, null, _flags_decorators, { kind: "field", name: "flags", static: false, private: false, access: { has: (obj) => "flags" in obj, get: (obj) => obj.flags, set: (obj, value) => {
      obj.flags = value;
    } }, metadata: _metadata }, _flags_initializers, _flags_extraInitializers);
    __esDecorate(null, null, _compressionMethod_decorators, { kind: "field", name: "compressionMethod", static: false, private: false, access: { has: (obj) => "compressionMethod" in obj, get: (obj) => obj.compressionMethod, set: (obj, value) => {
      obj.compressionMethod = value;
    } }, metadata: _metadata }, _compressionMethod_initializers, _compressionMethod_extraInitializers);
    __esDecorate(null, null, _datetime_decorators, { kind: "field", name: "datetime", static: false, private: false, access: { has: (obj) => "datetime" in obj, get: (obj) => obj.datetime, set: (obj, value) => {
      obj.datetime = value;
    } }, metadata: _metadata }, _datetime_initializers, _datetime_extraInitializers);
    __esDecorate(null, null, _crc32_decorators, { kind: "field", name: "crc32", static: false, private: false, access: { has: (obj) => "crc32" in obj, get: (obj) => obj.crc32, set: (obj, value) => {
      obj.crc32 = value;
    } }, metadata: _metadata }, _crc32_initializers, _crc32_extraInitializers);
    __esDecorate(null, null, _compressedSize_decorators, { kind: "field", name: "compressedSize", static: false, private: false, access: { has: (obj) => "compressedSize" in obj, get: (obj) => obj.compressedSize, set: (obj, value) => {
      obj.compressedSize = value;
    } }, metadata: _metadata }, _compressedSize_initializers, _compressedSize_extraInitializers);
    __esDecorate(null, null, _uncompressedSize_decorators, { kind: "field", name: "uncompressedSize", static: false, private: false, access: { has: (obj) => "uncompressedSize" in obj, get: (obj) => obj.uncompressedSize, set: (obj, value) => {
      obj.uncompressedSize = value;
    } }, metadata: _metadata }, _uncompressedSize_initializers, _uncompressedSize_extraInitializers);
    __esDecorate(null, null, _nameLength_decorators, { kind: "field", name: "nameLength", static: false, private: false, access: { has: (obj) => "nameLength" in obj, get: (obj) => obj.nameLength, set: (obj, value) => {
      obj.nameLength = value;
    } }, metadata: _metadata }, _nameLength_initializers, _nameLength_extraInitializers);
    __esDecorate(null, null, _extraLength_decorators, { kind: "field", name: "extraLength", static: false, private: false, access: { has: (obj) => "extraLength" in obj, get: (obj) => obj.extraLength, set: (obj, value) => {
      obj.extraLength = value;
    } }, metadata: _metadata }, _extraLength_initializers, _extraLength_extraInitializers);
    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers(_classThis, _classExtraInitializers);
  })(), _a4;
  return _classThis;
})();
(() => {
  var _a4;
  var _a3, _b3;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _signature_decorators;
  let _signature_initializers = [];
  let _signature_extraInitializers = [];
  let _length_decorators;
  let _length_initializers = [];
  let _length_extraInitializers = [];
  _a4 = class {
    constructor(data) {
      __publicField(this, "data");
      __publicField(this, "signature", __runInitializers(this, _signature_initializers, void 0));
      __publicField(this, "length", (__runInitializers(this, _signature_extraInitializers), __runInitializers(this, _length_initializers, void 0)));
      __runInitializers(this, _length_extraInitializers);
      this.data = data;
      deserialize(this, data);
      if (this.signature != 134630224) {
        throw new ErrnoError(Errno.EINVAL, "Invalid archive extra data record signature: " + this.signature);
      }
    }
    /**
     * This should be used for storage expansion.
     * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.28
     */
    get extraField() {
      return this.data.slice(8, 8 + this.length);
    }
  }, _classThis = _a4, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _signature_decorators = [(_a3 = types).uint32.bind(_a3)];
    _length_decorators = [(_b3 = types).uint32.bind(_b3)];
    __esDecorate(null, null, _signature_decorators, { kind: "field", name: "signature", static: false, private: false, access: { has: (obj) => "signature" in obj, get: (obj) => obj.signature, set: (obj, value) => {
      obj.signature = value;
    } }, metadata: _metadata }, _signature_initializers, _signature_extraInitializers);
    __esDecorate(null, null, _length_decorators, { kind: "field", name: "length", static: false, private: false, access: { has: (obj) => "length" in obj, get: (obj) => obj.length, set: (obj, value) => {
      obj.length = value;
    } }, metadata: _metadata }, _length_initializers, _length_extraInitializers);
    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers(_classThis, _classExtraInitializers);
  })(), _a4;
  return _classThis;
})();
const sizeof_FileEntry = 46;
let FileEntry = (() => {
  var _a4;
  var _a3, _b3, _c2, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _signature_decorators;
  let _signature_initializers = [];
  let _signature_extraInitializers = [];
  let _zipVersion_decorators;
  let _zipVersion_initializers = [];
  let _zipVersion_extraInitializers = [];
  let _attributeCompat_decorators;
  let _attributeCompat_initializers = [];
  let _attributeCompat_extraInitializers = [];
  let _versionNeeded_decorators;
  let _versionNeeded_initializers = [];
  let _versionNeeded_extraInitializers = [];
  let _flag_decorators;
  let _flag_initializers = [];
  let _flag_extraInitializers = [];
  let _compressionMethod_decorators;
  let _compressionMethod_initializers = [];
  let _compressionMethod_extraInitializers = [];
  let _datetime_decorators;
  let _datetime_initializers = [];
  let _datetime_extraInitializers = [];
  let _crc32_decorators;
  let _crc32_initializers = [];
  let _crc32_extraInitializers = [];
  let _compressedSize_decorators;
  let _compressedSize_initializers = [];
  let _compressedSize_extraInitializers = [];
  let _uncompressedSize_decorators;
  let _uncompressedSize_initializers = [];
  let _uncompressedSize_extraInitializers = [];
  let _nameLength_decorators;
  let _nameLength_initializers = [];
  let _nameLength_extraInitializers = [];
  let _extraLength_decorators;
  let _extraLength_initializers = [];
  let _extraLength_extraInitializers = [];
  let _commentLength_decorators;
  let _commentLength_initializers = [];
  let _commentLength_extraInitializers = [];
  let _startDisk_decorators;
  let _startDisk_initializers = [];
  let _startDisk_extraInitializers = [];
  let _internalAttributes_decorators;
  let _internalAttributes_initializers = [];
  let _internalAttributes_extraInitializers = [];
  let _externalAttributes_decorators;
  let _externalAttributes_initializers = [];
  let _externalAttributes_extraInitializers = [];
  let _headerRelativeOffset_decorators;
  let _headerRelativeOffset_initializers = [];
  let _headerRelativeOffset_extraInitializers = [];
  var FileEntry2 = (_a4 = class {
    constructor(zipData, _buffer) {
      __publicField(this, "zipData");
      __publicField(this, "_buffer");
      __publicField(this, "signature", __runInitializers(this, _signature_initializers, void 0));
      /**
       * The lower byte of "version made by", indicates the ZIP specification version supported by the software used to encode the file.
       * major — floor `zipVersion` / 10
       * minor — `zipVersion` mod 10
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.2
       */
      __publicField(this, "zipVersion", (__runInitializers(this, _signature_extraInitializers), __runInitializers(this, _zipVersion_initializers, void 0)));
      /**
       * The upper byte of "version made by", indicates the compatibility of the file attribute information.
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.2
       */
      __publicField(this, "attributeCompat", (__runInitializers(this, _zipVersion_extraInitializers), __runInitializers(this, _attributeCompat_initializers, void 0)));
      /**
       * The minimum supported ZIP specification version needed to extract the file.
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.3
       */
      __publicField(this, "versionNeeded", (__runInitializers(this, _attributeCompat_extraInitializers), __runInitializers(this, _versionNeeded_initializers, void 0)));
      /**
       * General purpose bit flags
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.4
       */
      __publicField(this, "flag", (__runInitializers(this, _versionNeeded_extraInitializers), __runInitializers(this, _flag_initializers, void 0)));
      /**
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.5
       */
      __publicField(this, "compressionMethod", (__runInitializers(this, _flag_extraInitializers), __runInitializers(this, _compressionMethod_initializers, void 0)));
      /**
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.6
       */
      __publicField(this, "datetime", (__runInitializers(this, _compressionMethod_extraInitializers), __runInitializers(this, _datetime_initializers, void 0)));
      /**
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.7
       */
      __publicField(this, "crc32", (__runInitializers(this, _datetime_extraInitializers), __runInitializers(this, _crc32_initializers, void 0)));
      /**
       * The size of the file compressed
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.8
       */
      __publicField(this, "compressedSize", (__runInitializers(this, _crc32_extraInitializers), __runInitializers(this, _compressedSize_initializers, void 0)));
      /**
       * The size of the file uncompressed
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.9
       */
      __publicField(this, "uncompressedSize", (__runInitializers(this, _compressedSize_extraInitializers), __runInitializers(this, _uncompressedSize_initializers, void 0)));
      /**
       * The length of the file name
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.10
       */
      __publicField(this, "nameLength", (__runInitializers(this, _uncompressedSize_extraInitializers), __runInitializers(this, _nameLength_initializers, void 0)));
      /**
       * The length of the extra field
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.11
       */
      __publicField(this, "extraLength", (__runInitializers(this, _nameLength_extraInitializers), __runInitializers(this, _extraLength_initializers, void 0)));
      /**
       * The length of the comment
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.12
       */
      __publicField(this, "commentLength", (__runInitializers(this, _extraLength_extraInitializers), __runInitializers(this, _commentLength_initializers, void 0)));
      /**
       * The number of the disk on which this file begins.
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.13
       */
      __publicField(this, "startDisk", (__runInitializers(this, _commentLength_extraInitializers), __runInitializers(this, _startDisk_initializers, void 0)));
      /**
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.14
       */
      __publicField(this, "internalAttributes", (__runInitializers(this, _startDisk_extraInitializers), __runInitializers(this, _internalAttributes_initializers, void 0)));
      /**
       * The mapping of the external attributes is host-system dependent.
       * For MS-DOS, the low order byte is the MS-DOS directory attribute byte.
       * If input came from standard input, this field is set to zero.
       * @see attributeCompat
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.15
       */
      __publicField(this, "externalAttributes", (__runInitializers(this, _internalAttributes_extraInitializers), __runInitializers(this, _externalAttributes_initializers, void 0)));
      /**
       * This is the offset from the start of the first disk on which
       * this file appears to where the local header should be found.
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.16
       */
      __publicField(this, "headerRelativeOffset", (__runInitializers(this, _externalAttributes_extraInitializers), __runInitializers(this, _headerRelativeOffset_initializers, void 0)));
      /**
       * The name of the file, with optional relative path.
       * The filename is preloaded here, since looking it up is expensive.
       *
       * 4.4.17.1 claims:
       * - All slashes are forward ('/') slashes.
       * - Filename doesn't begin with a slash.
       * - No drive letters
       * - If filename is missing, the input came from standard input.
       *
       * Unfortunately, this isn't true in practice.
       * Some Windows zip utilities use a backslash here, but the correct Unix-style path in file headers.
       * To avoid seeking all over the file to recover the known-good filenames from file headers, we simply convert '\' to '/' here.
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.17
       */
      __publicField(this, "name", __runInitializers(this, _headerRelativeOffset_extraInitializers));
      /**
       * The comment for this file
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.18
       */
      __publicField(this, "comment");
      __publicField(this, "_data");
      this.zipData = zipData;
      this._buffer = _buffer;
      deserialize(this, _buffer);
      if (this.signature != 33639248) {
        throw new ErrnoError(Errno.EINVAL, "Invalid Zip file: Central directory record has invalid signature: " + this.signature);
      }
      this.name = safeDecode(this._buffer, this.useUTF8, sizeof_FileEntry, this.nameLength).replace(/\\/g, "/");
      this.comment = safeDecode(this._buffer, this.useUTF8, sizeof_FileEntry + this.nameLength + this.extraLength, this.commentLength);
    }
    get useUTF8() {
      return !!(this.flag & 1 << 11);
    }
    get isEncrypted() {
      return !!(this.flag & 1);
    }
    /**
     * The date and time are encoded in standard MS-DOS format.
     * This getter decodes the date.
     * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.6
     */
    get lastModified() {
      return msdosDate(this.datetime);
    }
    /**
     * This should be used for storage expansion.
     * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.28
     */
    get extra() {
      const offset = 44 + this.nameLength;
      return this._buffer.slice(offset, offset + this.extraLength);
    }
    /**
     * The total size of the this entry
     */
    get size() {
      return sizeof(FileEntry2) + this.nameLength + this.extraLength + this.commentLength;
    }
    /**
     * Whether this entry is a directory
     */
    get isDirectory() {
      return !!(this.externalAttributes & 16) || this.name.endsWith("/");
    }
    /**
     * Whether this entry is a file
     */
    get isFile() {
      return !this.isDirectory;
    }
    _decompress() {
      const { compressionMethod, size, name } = new LocalFileHeader(this.zipData.slice(this.headerRelativeOffset));
      const data = this.zipData.slice(this.headerRelativeOffset + size);
      const decompress2 = decompressionMethods[compressionMethod];
      if (typeof decompress2 != "function") {
        const mname = compressionMethod in CompressionMethod ? CompressionMethod[compressionMethod] : compressionMethod.toString();
        throw new ErrnoError(Errno.EINVAL, `Invalid compression method on file '${name}': ${mname}`);
      }
      return decompress2(data, this.compressedSize, this.uncompressedSize, this.flag);
    }
    /**
     * Gets the file data, and decompresses it if needed.
     * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.3.8
     */
    get data() {
      this._data ?? (this._data = this._decompress());
      return this._data;
    }
    get stats() {
      return new Stats({
        mode: 365 | (this.isDirectory ? S_IFDIR : S_IFREG),
        size: this.uncompressedSize,
        mtimeMs: this.lastModified.getTime()
      });
    }
  }, _classThis = _a4, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _signature_decorators = [(_a3 = types).uint32.bind(_a3)];
    _zipVersion_decorators = [(_b3 = types).uint8.bind(_b3)];
    _attributeCompat_decorators = [(_c2 = types).uint8.bind(_c2)];
    _versionNeeded_decorators = [(_d = types).uint16.bind(_d)];
    _flag_decorators = [(_e = types).uint16.bind(_e)];
    _compressionMethod_decorators = [(_f = types).uint16.bind(_f)];
    _datetime_decorators = [(_g = types).uint32.bind(_g)];
    _crc32_decorators = [(_h = types).uint32.bind(_h)];
    _compressedSize_decorators = [(_j = types).uint32.bind(_j)];
    _uncompressedSize_decorators = [(_k = types).uint32.bind(_k)];
    _nameLength_decorators = [(_l = types).uint16.bind(_l)];
    _extraLength_decorators = [(_m = types).uint16.bind(_m)];
    _commentLength_decorators = [(_o = types).uint16.bind(_o)];
    _startDisk_decorators = [(_p = types).uint16.bind(_p)];
    _internalAttributes_decorators = [(_q = types).uint16.bind(_q)];
    _externalAttributes_decorators = [(_r = types).uint32.bind(_r)];
    _headerRelativeOffset_decorators = [(_s = types).uint32.bind(_s)];
    __esDecorate(null, null, _signature_decorators, { kind: "field", name: "signature", static: false, private: false, access: { has: (obj) => "signature" in obj, get: (obj) => obj.signature, set: (obj, value) => {
      obj.signature = value;
    } }, metadata: _metadata }, _signature_initializers, _signature_extraInitializers);
    __esDecorate(null, null, _zipVersion_decorators, { kind: "field", name: "zipVersion", static: false, private: false, access: { has: (obj) => "zipVersion" in obj, get: (obj) => obj.zipVersion, set: (obj, value) => {
      obj.zipVersion = value;
    } }, metadata: _metadata }, _zipVersion_initializers, _zipVersion_extraInitializers);
    __esDecorate(null, null, _attributeCompat_decorators, { kind: "field", name: "attributeCompat", static: false, private: false, access: { has: (obj) => "attributeCompat" in obj, get: (obj) => obj.attributeCompat, set: (obj, value) => {
      obj.attributeCompat = value;
    } }, metadata: _metadata }, _attributeCompat_initializers, _attributeCompat_extraInitializers);
    __esDecorate(null, null, _versionNeeded_decorators, { kind: "field", name: "versionNeeded", static: false, private: false, access: { has: (obj) => "versionNeeded" in obj, get: (obj) => obj.versionNeeded, set: (obj, value) => {
      obj.versionNeeded = value;
    } }, metadata: _metadata }, _versionNeeded_initializers, _versionNeeded_extraInitializers);
    __esDecorate(null, null, _flag_decorators, { kind: "field", name: "flag", static: false, private: false, access: { has: (obj) => "flag" in obj, get: (obj) => obj.flag, set: (obj, value) => {
      obj.flag = value;
    } }, metadata: _metadata }, _flag_initializers, _flag_extraInitializers);
    __esDecorate(null, null, _compressionMethod_decorators, { kind: "field", name: "compressionMethod", static: false, private: false, access: { has: (obj) => "compressionMethod" in obj, get: (obj) => obj.compressionMethod, set: (obj, value) => {
      obj.compressionMethod = value;
    } }, metadata: _metadata }, _compressionMethod_initializers, _compressionMethod_extraInitializers);
    __esDecorate(null, null, _datetime_decorators, { kind: "field", name: "datetime", static: false, private: false, access: { has: (obj) => "datetime" in obj, get: (obj) => obj.datetime, set: (obj, value) => {
      obj.datetime = value;
    } }, metadata: _metadata }, _datetime_initializers, _datetime_extraInitializers);
    __esDecorate(null, null, _crc32_decorators, { kind: "field", name: "crc32", static: false, private: false, access: { has: (obj) => "crc32" in obj, get: (obj) => obj.crc32, set: (obj, value) => {
      obj.crc32 = value;
    } }, metadata: _metadata }, _crc32_initializers, _crc32_extraInitializers);
    __esDecorate(null, null, _compressedSize_decorators, { kind: "field", name: "compressedSize", static: false, private: false, access: { has: (obj) => "compressedSize" in obj, get: (obj) => obj.compressedSize, set: (obj, value) => {
      obj.compressedSize = value;
    } }, metadata: _metadata }, _compressedSize_initializers, _compressedSize_extraInitializers);
    __esDecorate(null, null, _uncompressedSize_decorators, { kind: "field", name: "uncompressedSize", static: false, private: false, access: { has: (obj) => "uncompressedSize" in obj, get: (obj) => obj.uncompressedSize, set: (obj, value) => {
      obj.uncompressedSize = value;
    } }, metadata: _metadata }, _uncompressedSize_initializers, _uncompressedSize_extraInitializers);
    __esDecorate(null, null, _nameLength_decorators, { kind: "field", name: "nameLength", static: false, private: false, access: { has: (obj) => "nameLength" in obj, get: (obj) => obj.nameLength, set: (obj, value) => {
      obj.nameLength = value;
    } }, metadata: _metadata }, _nameLength_initializers, _nameLength_extraInitializers);
    __esDecorate(null, null, _extraLength_decorators, { kind: "field", name: "extraLength", static: false, private: false, access: { has: (obj) => "extraLength" in obj, get: (obj) => obj.extraLength, set: (obj, value) => {
      obj.extraLength = value;
    } }, metadata: _metadata }, _extraLength_initializers, _extraLength_extraInitializers);
    __esDecorate(null, null, _commentLength_decorators, { kind: "field", name: "commentLength", static: false, private: false, access: { has: (obj) => "commentLength" in obj, get: (obj) => obj.commentLength, set: (obj, value) => {
      obj.commentLength = value;
    } }, metadata: _metadata }, _commentLength_initializers, _commentLength_extraInitializers);
    __esDecorate(null, null, _startDisk_decorators, { kind: "field", name: "startDisk", static: false, private: false, access: { has: (obj) => "startDisk" in obj, get: (obj) => obj.startDisk, set: (obj, value) => {
      obj.startDisk = value;
    } }, metadata: _metadata }, _startDisk_initializers, _startDisk_extraInitializers);
    __esDecorate(null, null, _internalAttributes_decorators, { kind: "field", name: "internalAttributes", static: false, private: false, access: { has: (obj) => "internalAttributes" in obj, get: (obj) => obj.internalAttributes, set: (obj, value) => {
      obj.internalAttributes = value;
    } }, metadata: _metadata }, _internalAttributes_initializers, _internalAttributes_extraInitializers);
    __esDecorate(null, null, _externalAttributes_decorators, { kind: "field", name: "externalAttributes", static: false, private: false, access: { has: (obj) => "externalAttributes" in obj, get: (obj) => obj.externalAttributes, set: (obj, value) => {
      obj.externalAttributes = value;
    } }, metadata: _metadata }, _externalAttributes_initializers, _externalAttributes_extraInitializers);
    __esDecorate(null, null, _headerRelativeOffset_decorators, { kind: "field", name: "headerRelativeOffset", static: false, private: false, access: { has: (obj) => "headerRelativeOffset" in obj, get: (obj) => obj.headerRelativeOffset, set: (obj, value) => {
      obj.headerRelativeOffset = value;
    } }, metadata: _metadata }, _headerRelativeOffset_initializers, _headerRelativeOffset_extraInitializers);
    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    FileEntry2 = _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers(_classThis, _classExtraInitializers);
  })(), _a4);
  return FileEntry2 = _classThis;
})();
(() => {
  var _a4;
  var _a3, _b3;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _signature_decorators;
  let _signature_initializers = [];
  let _signature_extraInitializers = [];
  let _size_decorators;
  let _size_initializers = [];
  let _size_extraInitializers = [];
  _a4 = class {
    constructor(data) {
      __publicField(this, "data");
      __publicField(this, "signature", __runInitializers(this, _signature_initializers, void 0));
      __publicField(this, "size", (__runInitializers(this, _signature_extraInitializers), __runInitializers(this, _size_initializers, void 0)));
      __runInitializers(this, _size_extraInitializers);
      this.data = data;
      deserialize(this, data);
      if (this.signature != 84233040) {
        throw new ErrnoError(Errno.EINVAL, "Invalid digital signature signature: " + this.signature);
      }
    }
    get signatureData() {
      return this.data.slice(6, 6 + this.size);
    }
  }, _classThis = _a4, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _signature_decorators = [(_a3 = types).uint32.bind(_a3)];
    _size_decorators = [(_b3 = types).uint16.bind(_b3)];
    __esDecorate(null, null, _signature_decorators, { kind: "field", name: "signature", static: false, private: false, access: { has: (obj) => "signature" in obj, get: (obj) => obj.signature, set: (obj, value) => {
      obj.signature = value;
    } }, metadata: _metadata }, _signature_initializers, _signature_extraInitializers);
    __esDecorate(null, null, _size_decorators, { kind: "field", name: "size", static: false, private: false, access: { has: (obj) => "size" in obj, get: (obj) => obj.size, set: (obj, value) => {
      obj.size = value;
    } }, metadata: _metadata }, _size_initializers, _size_extraInitializers);
    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers(_classThis, _classExtraInitializers);
  })(), _a4;
  return _classThis;
})();
let Header = (() => {
  var _a4;
  var _a3, _b3, _c2, _d, _e, _f, _g, _h;
  let _classDecorators = [struct()];
  let _classDescriptor;
  let _classExtraInitializers = [];
  let _classThis;
  let _signature_decorators;
  let _signature_initializers = [];
  let _signature_extraInitializers = [];
  let _disk_decorators;
  let _disk_initializers = [];
  let _disk_extraInitializers = [];
  let _entriesDisk_decorators;
  let _entriesDisk_initializers = [];
  let _entriesDisk_extraInitializers = [];
  let _diskEntryCount_decorators;
  let _diskEntryCount_initializers = [];
  let _diskEntryCount_extraInitializers = [];
  let _totalEntryCount_decorators;
  let _totalEntryCount_initializers = [];
  let _totalEntryCount_extraInitializers = [];
  let _size_decorators;
  let _size_initializers = [];
  let _size_extraInitializers = [];
  let _offset_decorators;
  let _offset_initializers = [];
  let _offset_extraInitializers = [];
  let _commentLength_decorators;
  let _commentLength_initializers = [];
  let _commentLength_extraInitializers = [];
  _a4 = class {
    constructor(data) {
      __publicField(this, "data");
      __publicField(this, "signature", __runInitializers(this, _signature_initializers, void 0));
      /**
       * The number of this disk
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.19
       */
      __publicField(this, "disk", (__runInitializers(this, _signature_extraInitializers), __runInitializers(this, _disk_initializers, void 0)));
      /**
       * The number of the disk with the start of the entries
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.20
       */
      __publicField(this, "entriesDisk", (__runInitializers(this, _disk_extraInitializers), __runInitializers(this, _entriesDisk_initializers, void 0)));
      /**
       * Total number of entries on this disk
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.21
       */
      __publicField(this, "diskEntryCount", (__runInitializers(this, _entriesDisk_extraInitializers), __runInitializers(this, _diskEntryCount_initializers, void 0)));
      /**
       * Total number of entries
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.22
       */
      __publicField(this, "totalEntryCount", (__runInitializers(this, _diskEntryCount_extraInitializers), __runInitializers(this, _totalEntryCount_initializers, void 0)));
      /**
       * Size of the "central directory"
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.23
       */
      __publicField(this, "size", (__runInitializers(this, _totalEntryCount_extraInitializers), __runInitializers(this, _size_initializers, void 0)));
      /**
       * Offset of start of "central directory" with respect to the starting disk number
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.24
       */
      __publicField(this, "offset", (__runInitializers(this, _size_extraInitializers), __runInitializers(this, _offset_initializers, void 0)));
      /**
       * Comment length
       * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.25
       */
      __publicField(this, "commentLength", (__runInitializers(this, _offset_extraInitializers), __runInitializers(this, _commentLength_initializers, void 0)));
      __runInitializers(this, _commentLength_extraInitializers);
      this.data = data;
      deserialize(this, data);
      if (this.signature != 101010256) {
        throw new ErrnoError(Errno.EINVAL, "Invalid Zip file: End of central directory record has invalid signature: 0x" + this.signature.toString(16));
      }
    }
    /**
     * Assuming the content is UTF-8 encoded. The specification doesn't specify.
     * @see http://pkware.com/documents/casestudies/APPNOTE.TXT#:~:text=4.4.26
     */
    get comment() {
      return safeDecode(this.data, true, 22, this.commentLength);
    }
  }, _classThis = _a4, (() => {
    const _metadata = typeof Symbol === "function" && Symbol.metadata ? /* @__PURE__ */ Object.create(null) : void 0;
    _signature_decorators = [(_a3 = types).uint32.bind(_a3)];
    _disk_decorators = [(_b3 = types).uint16.bind(_b3)];
    _entriesDisk_decorators = [(_c2 = types).uint16.bind(_c2)];
    _diskEntryCount_decorators = [(_d = types).uint16.bind(_d)];
    _totalEntryCount_decorators = [(_e = types).uint16.bind(_e)];
    _size_decorators = [(_f = types).uint32.bind(_f)];
    _offset_decorators = [(_g = types).uint32.bind(_g)];
    _commentLength_decorators = [(_h = types).uint16.bind(_h)];
    __esDecorate(null, null, _signature_decorators, { kind: "field", name: "signature", static: false, private: false, access: { has: (obj) => "signature" in obj, get: (obj) => obj.signature, set: (obj, value) => {
      obj.signature = value;
    } }, metadata: _metadata }, _signature_initializers, _signature_extraInitializers);
    __esDecorate(null, null, _disk_decorators, { kind: "field", name: "disk", static: false, private: false, access: { has: (obj) => "disk" in obj, get: (obj) => obj.disk, set: (obj, value) => {
      obj.disk = value;
    } }, metadata: _metadata }, _disk_initializers, _disk_extraInitializers);
    __esDecorate(null, null, _entriesDisk_decorators, { kind: "field", name: "entriesDisk", static: false, private: false, access: { has: (obj) => "entriesDisk" in obj, get: (obj) => obj.entriesDisk, set: (obj, value) => {
      obj.entriesDisk = value;
    } }, metadata: _metadata }, _entriesDisk_initializers, _entriesDisk_extraInitializers);
    __esDecorate(null, null, _diskEntryCount_decorators, { kind: "field", name: "diskEntryCount", static: false, private: false, access: { has: (obj) => "diskEntryCount" in obj, get: (obj) => obj.diskEntryCount, set: (obj, value) => {
      obj.diskEntryCount = value;
    } }, metadata: _metadata }, _diskEntryCount_initializers, _diskEntryCount_extraInitializers);
    __esDecorate(null, null, _totalEntryCount_decorators, { kind: "field", name: "totalEntryCount", static: false, private: false, access: { has: (obj) => "totalEntryCount" in obj, get: (obj) => obj.totalEntryCount, set: (obj, value) => {
      obj.totalEntryCount = value;
    } }, metadata: _metadata }, _totalEntryCount_initializers, _totalEntryCount_extraInitializers);
    __esDecorate(null, null, _size_decorators, { kind: "field", name: "size", static: false, private: false, access: { has: (obj) => "size" in obj, get: (obj) => obj.size, set: (obj, value) => {
      obj.size = value;
    } }, metadata: _metadata }, _size_initializers, _size_extraInitializers);
    __esDecorate(null, null, _offset_decorators, { kind: "field", name: "offset", static: false, private: false, access: { has: (obj) => "offset" in obj, get: (obj) => obj.offset, set: (obj, value) => {
      obj.offset = value;
    } }, metadata: _metadata }, _offset_initializers, _offset_extraInitializers);
    __esDecorate(null, null, _commentLength_decorators, { kind: "field", name: "commentLength", static: false, private: false, access: { has: (obj) => "commentLength" in obj, get: (obj) => obj.commentLength, set: (obj, value) => {
      obj.commentLength = value;
    } }, metadata: _metadata }, _commentLength_initializers, _commentLength_extraInitializers);
    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
    _classThis = _classDescriptor.value;
    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    __runInitializers(_classThis, _classExtraInitializers);
  })(), _a4;
  return _classThis;
})();
class ZipFS extends Readonly(Sync(FileSystem)) {
  constructor(label, data) {
    super(544893296, "zipfs");
    __publicField(this, "label");
    __publicField(this, "data");
    __publicField(this, "files", /* @__PURE__ */ new Map());
    __publicField(this, "directories", /* @__PURE__ */ new Map());
    __publicField(this, "_time", Date.now());
    __publicField(this, "eocd");
    this.label = label;
    this.data = data;
    this.eocd = ZipFS.computeEOCD(data);
    if (this.eocd.disk != this.eocd.entriesDisk) {
      throw new ErrnoError(Errno.EINVAL, "ZipFS does not support spanned zip files.");
    }
    let ptr = this.eocd.offset;
    if (ptr === 4294967295) {
      throw new ErrnoError(Errno.EINVAL, "ZipFS does not support Zip64.");
    }
    const cdEnd = ptr + this.eocd.size;
    while (ptr < cdEnd) {
      const cd = new FileEntry(this.data, this.data.slice(ptr));
      if (cd.name.startsWith("/")) {
        throw new ErrnoError(Errno.EPERM, "Unexpectedly encountered an absolute path in a zip file.");
      }
      const name = cd.name.endsWith("/") ? cd.name.slice(0, -1) : cd.name;
      this.files.set("/" + name, cd);
      ptr += cd.size;
    }
    for (const entry of this.files.keys()) {
      const { dir, base } = parse(entry);
      if (!this.directories.has(dir)) {
        this.directories.set(dir, /* @__PURE__ */ new Set());
      }
      this.directories.get(dir).add(base);
    }
    for (const entry of this.directories.keys()) {
      const { dir, base } = parse(entry);
      if (base == "")
        continue;
      if (!this.directories.has(dir)) {
        this.directories.set(dir, /* @__PURE__ */ new Set());
      }
      this.directories.get(dir).add(base);
    }
  }
  /**
   * Locates the end of central directory record at the end of the file.
   * Throws an exception if it cannot be found.
   *
   * @remarks
   * Unfortunately, the comment is variable size and up to 64K in size.
   * We assume that the magic signature does not appear in the comment,
   * and in the bytes between the comment and the signature.
   * Other ZIP implementations make this same assumption,
   * since the alternative is to read thread every entry in the file.
   *
   * Offsets in this function are negative (i.e. from the end of the file).
   *
   * There is no byte alignment on the comment
   */
  static computeEOCD(data) {
    const view = new DataView(data);
    const start = 22;
    const end = Math.min(start + 65535, data.byteLength - 1);
    for (let i = start; i < end; i++) {
      if (view.getUint32(data.byteLength - i, true) === 101010256) {
        return new Header(data.slice(data.byteLength - i));
      }
    }
    throw new ErrnoError(Errno.EINVAL, "Invalid ZIP file: Could not locate End of Central Directory signature.");
  }
  get endOfCentralDirectory() {
    return this.eocd;
  }
  usage() {
    return {
      totalSpace: this.data.byteLength,
      freeSpace: 0
    };
  }
  get numberOfCentralDirectoryEntries() {
    return this.files.size;
  }
  statSync(path) {
    if (this.directories.has(path)) {
      return new Stats({
        mode: 365 | S_IFDIR,
        size: 4096,
        mtimeMs: this._time,
        ctimeMs: this._time,
        atimeMs: Date.now(),
        birthtimeMs: this._time
      });
    }
    const entry = this.files.get(path);
    if (!entry)
      throw ErrnoError.With("ENOENT", path, "stat");
    return entry.stats;
  }
  openFileSync(path, flag) {
    if (isWriteable(flag))
      throw new ErrnoError(Errno.EPERM, path);
    return new LazyFile(this, path, flag, this.statSync(path));
  }
  readdirSync(path) {
    const stats = this.statSync(path);
    if (!stats.isDirectory())
      throw ErrnoError.With("ENOTDIR", path, "readdir");
    const entries2 = this.directories.get(path);
    if (!entries2)
      throw ErrnoError.With("ENODATA", path, "readdir");
    return Array.from(entries2);
  }
  readSync(path, buffer2, offset, end) {
    if (this.directories.has(path))
      throw ErrnoError.With("EISDIR", path, "read");
    const { data } = this.files.get(path) ?? _throw(ErrnoError.With("ENOENT", path, "read"));
    buffer2.set(data.subarray(offset, end));
  }
}
const _Zip = {
  name: "Zip",
  options: {
    data: {
      type: "object",
      required: true,
      validator(buff) {
        if (!(buff instanceof ArrayBuffer)) {
          throw new ErrnoError(Errno.EINVAL, "option must be a ArrayBuffer.");
        }
      }
    },
    name: { type: "string", required: false }
  },
  isAvailable() {
    return true;
  },
  create(options) {
    return new ZipFS(options.name ?? "", options.data);
  }
};
const Zip = _Zip;
function errnoForDOMException(ex) {
  switch (ex.name) {
    case "TypeMismatchError":
      return "EPERM";
    case "IndexSizeError":
    case "HierarchyRequestError":
    case "InvalidCharacterError":
    case "InvalidStateError":
    case "SyntaxError":
    case "NamespaceError":
    case "ConstraintError":
    case "VersionError":
    case "URLMismatchError":
    case "InvalidNodeTypeError":
      return "EINVAL";
    case "WrongDocumentError":
      return "EXDEV";
    case "NoModificationAllowedError":
    case "InvalidModificationError":
    case "InvalidAccessError":
    case "SecurityError":
    case "NotAllowedError":
      return "EACCES";
    case "NotFoundError":
      return "ENOENT";
    case "NotSupportedError":
      return "ENOTSUP";
    case "InUseAttributeError":
      return "EBUSY";
    case "NetworkError":
      return "ENETDOWN";
    case "AbortError":
      return "EINTR";
    case "QuotaExceededError":
      return "ENOSPC";
    case "TimeoutError":
      return "ETIMEDOUT";
    case "ReadOnlyError":
      return "EROFS";
    case "DataCloneError":
    case "EncodingError":
    case "NotReadableError":
    case "DataError":
    case "TransactionInactiveError":
    case "OperationError":
    case "UnknownError":
    default:
      return "EIO";
  }
}
function convertException(ex, path, syscall) {
  if (ex instanceof ErrnoError)
    return ex;
  const code = ex instanceof DOMException ? Errno[errnoForDOMException(ex)] : Errno.EIO;
  const error = new ErrnoError(code, ex.message, path, syscall);
  error.stack = ex.stack;
  error.cause = ex.cause;
  return error;
}
function isResizable(buffer2) {
  if (buffer2 instanceof ArrayBuffer)
    return buffer2.resizable;
  if (buffer2 instanceof SharedArrayBuffer)
    return buffer2.growable;
  return false;
}
function isKind(handle, kind) {
  return handle.kind == kind;
}
class WebAccessFS extends Async(IndexFS) {
  /**
   * Loads all of the handles.
   * @internal @hidden
   */
  async _loadHandles(path, handle) {
    for await (const [key2, child] of handle.entries()) {
      const p = join(path, key2);
      this._handles.set(p, child);
      if (isKind(child, "directory"))
        await this._loadHandles(p, child);
    }
  }
  /**
   * Loads metadata
   * @internal @hidden
   */
  async _loadMetadata(metadataPath) {
    if (metadataPath) {
      const handle = this.get("file", metadataPath);
      const file = await handle.getFile();
      const raw = await file.text();
      const data = JSON.parse(raw);
      this.index.fromJSON(data);
      return;
    }
    for (const [path, handle] of this._handles) {
      if (isKind(handle, "file")) {
        const { lastModified, size } = await handle.getFile();
        this.index.set(path, new Inode({ mode: 420 | S_IFREG, size, mtimeMs: lastModified }));
        continue;
      }
      if (!isKind(handle, "directory"))
        throw new ErrnoError(Errno.EIO, "Invalid handle", path);
      this.index.set(path, new Inode({ mode: 511 | S_IFDIR, size: 0 }));
    }
  }
  constructor(handle) {
    super(2003133025, "webaccessfs");
    this._handles = /* @__PURE__ */ new Map();
    this._sync = InMemory.create({ name: "accessfs-cache" });
    this.attributes.set("no_buffer_resize");
    this.attributes.set("setid");
    this._handles.set("/", handle);
  }
  async remove(path) {
    const handle = this.get("directory", dirname(path));
    await handle.removeEntry(basename(path), { recursive: true }).catch((ex) => _throw(convertException(ex, path)));
  }
  removeSync(path) {
    throw crit(ErrnoError.With("ENOSYS", path));
  }
  async read(path, buffer2, offset, end) {
    if (end <= offset)
      return;
    const handle = this.get("file", path, "write");
    const file = await handle.getFile();
    const data = await file.arrayBuffer();
    if (data.byteLength < end - offset)
      throw ErrnoError.With("ENODATA", path, "read");
    buffer2.set(new Uint8Array(data, offset, end - offset));
  }
  async write(path, buffer2, offset) {
    if (isResizable(buffer2.buffer)) {
      const newBuffer = new Uint8Array(new ArrayBuffer(buffer2.byteLength), buffer2.byteOffset, buffer2.byteLength);
      newBuffer.set(buffer2);
      buffer2 = newBuffer;
    }
    const inode = this.index.get(path);
    if (!inode)
      throw ErrnoError.With("ENOENT", path, "write");
    const isDir = (inode.mode & S_IFMT) == S_IFDIR;
    let handle;
    try {
      handle = this.get(isDir ? "directory" : "file", path, "write");
    } catch {
      const parent = this.get("directory", dirname(path), "write");
      handle = await parent[isDir ? "getDirectoryHandle" : "getFileHandle"](basename(path), { create: true }).catch((ex) => _throw(convertException(ex, path)));
      this._handles.set(path, handle);
    }
    if (isDir)
      return;
    if (isKind(handle, "directory")) {
      crit(new ErrnoError(Errno.EIO, "Mismatch in entry kind on write", path, "write"));
      return;
    }
    const writable2 = await handle.createWritable();
    try {
      await writable2.seek(offset);
    } catch {
      await writable2.write({ type: "seek", position: offset });
    }
    await writable2.write(buffer2);
    await writable2.close();
    const { size, lastModified } = await handle.getFile();
    inode.update({ size, mtimeMs: lastModified });
    this.index.set(path, inode);
  }
  /**
   * Do not use!
   * @deprecated @internal @hidden
   */
  async writeFile(path, data) {
    return this.write(path, data, 0);
  }
  async mkdir(path, mode, options) {
    await super.mkdir(path, mode, options);
    const handle = this.get("directory", dirname(path), "mkdir");
    const dir = await handle.getDirectoryHandle(basename(path), { create: true }).catch((ex) => _throw(convertException(ex, path)));
    this._handles.set(path, dir);
  }
  get(kind = null, path, syscall) {
    const handle = this._handles.get(path);
    if (!handle)
      throw ErrnoError.With("ENODATA", path, syscall);
    if (kind && !isKind(handle, kind))
      throw ErrnoError.With(kind == "directory" ? "ENOTDIR" : "EISDIR", path, syscall);
    return handle;
  }
}
const _WebAccess = {
  name: "WebAccess",
  options: {
    handle: { type: "object", required: true },
    metadata: { type: "string", required: false }
  },
  async create(options) {
    const fs2 = new WebAccessFS(options.handle);
    await fs2._loadHandles("/", options.handle);
    await fs2._loadMetadata(options.metadata);
    return fs2;
  }
};
const WebAccess = _WebAccess;
function get_stats(node) {
  const stats = {};
  for (const key2 of _inode_fields) {
    const value = node.getAttribute(key2);
    if (value !== null && value !== void 0)
      stats[key2] = parseInt(value, 16);
  }
  return new Stats(stats);
}
function set_stats(node, stats) {
  for (const key2 of Object.keys(stats)) {
    if (!(key2 in _inode_fields) || stats[key2] === void 0)
      continue;
    node.setAttribute(key2, stats[key2].toString(16));
  }
}
function get_paths(node, contents = false) {
  let paths;
  try {
    const raw = contents ? node.textContent : node.getAttribute("paths");
    paths = JSON.parse(raw || "[]");
  } catch {
    paths = [];
  }
  return paths;
}
class XMLFS extends Sync(FileSystem) {
  constructor(root = new DOMParser().parseFromString("<fs></fs>", "application/xml").documentElement) {
    super(544763244, "xmltmpfs");
    this.root = root;
    this.attributes.set("setid");
    try {
      this.mkdirSync("/", 511, { uid: 0, gid: 0 });
    } catch (e) {
      const error = e;
      if (error.code != "EEXIST")
        throw error;
    }
  }
  renameSync(oldPath, newPath) {
    const node = this.get("rename", oldPath);
    this.remove("rename", node, oldPath);
    this.add("rename", node, newPath);
  }
  statSync(path) {
    return get_stats(this.get("stat", path));
  }
  openFileSync(path, flag) {
    const node = this.get("openFile", path);
    return new LazyFile(this, path, flag, get_stats(node));
  }
  createFileSync(path, flag, mode, { uid, gid }) {
    const parent = this.statSync(dirname(path));
    const stats = new Stats({
      mode: mode | S_IFREG,
      uid: parent.mode & S_ISUID ? parent.uid : uid,
      gid: parent.mode & S_ISGID ? parent.gid : gid
    });
    this.create("createFile", path, stats);
    return new LazyFile(this, path, flag, stats);
  }
  unlinkSync(path) {
    const node = this.get("unlink", path);
    if (get_stats(node).isDirectory())
      throw ErrnoError.With("EISDIR", path, "unlink");
    this.remove("unlink", node, path);
  }
  rmdirSync(path) {
    var _a3;
    const node = this.get("rmdir", path);
    if ((_a3 = node.textContent) == null ? void 0 : _a3.length)
      throw ErrnoError.With("ENOTEMPTY", path, "rmdir");
    if (!get_stats(node).isDirectory())
      throw ErrnoError.With("ENOTDIR", path, "rmdir");
    this.remove("rmdir", node, path);
  }
  mkdirSync(path, mode, { uid, gid }) {
    const parent = this.statSync(dirname(path));
    const node = this.create("mkdir", path, {
      mode: mode | S_IFDIR,
      uid: parent.mode & S_ISUID ? parent.uid : uid,
      gid: parent.mode & S_ISGID ? parent.gid : gid
    });
    node.textContent = "[]";
  }
  readdirSync(path) {
    const node = this.get("readdir", path);
    if (!get_stats(node).isDirectory())
      throw ErrnoError.With("ENOTDIR", path, "rmdir");
    try {
      return JSON.parse(node.textContent);
    } catch (e) {
      throw new ErrnoError(Errno.EIO, "Invalid directory listing: " + e, path, "readdir");
    }
  }
  linkSync(target, link2) {
    const node = this.get("link", target);
    this.add("link", node, link2);
  }
  syncSync(path, data, stats = {}) {
    const node = this.get("sync", path);
    if (data)
      node.textContent = decodeRaw(data);
    set_stats(node, stats);
  }
  readSync(path, buffer2, offset, end) {
    const node = this.get("read", path);
    const raw = encodeRaw(node.textContent.slice(offset, end));
    buffer2.set(raw);
  }
  writeSync(path, buffer2, offset) {
    const node = this.get("write", path);
    const data = decodeRaw(buffer2);
    const after = node.textContent.slice(offset + data.length);
    node.textContent = node.textContent.slice(0, offset) + data + after;
  }
  toString() {
    return new XMLSerializer().serializeToString(this.root);
  }
  get(syscall, path) {
    const nodes = this.root.children;
    if (!nodes)
      throw ErrnoError.With("EIO", path, syscall);
    for (let i = 0; i < nodes.length; i++) {
      if (get_paths(nodes[i]).includes(path))
        return nodes[i];
    }
    throw ErrnoError.With("ENOENT", path, syscall);
  }
  create(syscall, path, stats) {
    if (this.existsSync(path))
      throw ErrnoError.With("EEXIST", path, syscall);
    const node = document.createElement("file");
    this.add(syscall, node, path);
    set_stats(node, new Stats({
      ...stats,
      uid: stats.mode
    }));
    this.root.append(node);
    return node;
  }
  add(syscall, node, path, contents = false) {
    const paths = get_paths(node, contents);
    paths.push(path);
    if (contents) {
      node.textContent = JSON.stringify(paths);
      return;
    }
    node.setAttribute("paths", JSON.stringify(paths));
    node.setAttribute("nlink", paths.length.toString(16));
    if (path != "/") {
      const parent = this.get(syscall, dirname(path));
      this.add(syscall, parent, basename(path), true);
    }
  }
  remove(syscall, node, path, contents = false) {
    const paths = get_paths(node, contents);
    const i = paths.indexOf(path);
    if (i == -1)
      return;
    paths.splice(i, 1);
    if (contents) {
      node.textContent = JSON.stringify(paths);
      return;
    }
    if (!paths.length) {
      node.remove();
    } else {
      node.setAttribute("paths", JSON.stringify(paths));
      node.setAttribute("nlink", paths.length.toString(16));
    }
    if (path != "/") {
      const parent = this.get(syscall, dirname(path));
      this.remove(syscall, parent, basename(path), true);
    }
  }
}
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
  return new Promise((resolve2) => {
    const id = generateUUID();
    pendingListeners.set(id, resolve2);
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
  init(config2, callback) {
    for (const k in config2) {
      this._tagToLevel[k] = Level[config2[k]] || 1;
    }
    if (callback !== void 0) {
      this._callback = callback;
    }
    for (const key2 in this._tagToLevel) {
      tag[key2] = key2;
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
class FetchError extends Error {
  constructor(response, message) {
    super(message || `${response.status}: ${response.statusText}`);
    this.response = response;
  }
}
function statsToMetadata(stats) {
  return {
    atimeMs: stats.atimeMs,
    mtimeMs: stats.mtimeMs,
    ctimeMs: stats.ctimeMs,
    birthtimeMs: stats.birthtimeMs,
    uid: stats.uid,
    gid: stats.gid,
    size: stats.size,
    mode: stats.mode,
    ino: stats.ino
  };
}
class CloudflareKVFileSystem extends FileSystem {
  constructor(prefix, token, ns) {
    super(1128680278, "cloudflare-kvfs");
    __publicField(this, "fetch");
    __publicField(this, "cache", /* @__PURE__ */ new Map());
    this.prefix = prefix;
    this.token = token;
    this.ns = ns;
    this.fetch = (method, path, body, headers) => {
      log.debug(tag.kvfs, "fetch", method, path);
      const url = `${prefix}${path}`;
      return fetch(url, {
        method,
        body,
        headers: {
          Authorization: `Bearer ${token}`,
          ...ns ? { "x-user-namespace": ns } : {},
          ...headers ?? {}
        }
      });
    };
  }
  async ready() {
    await this.reload();
  }
  async reload() {
    this.cache = new Map(await this.readList());
  }
  async rename(oldPath, newPath) {
    log.debug(tag.kvfs, "rename", { oldPath, newPath });
    const oldFile = await this.openFile(oldPath, "r");
    const stats = await oldFile.stat();
    const buffer2 = new Uint8Array(stats.size);
    await oldFile.read(buffer2, 0, stats.size, 0);
    await oldFile.close();
    const newFile = await this.createFile(newPath, "w", stats.mode);
    await newFile.write(buffer2, 0, buffer2.length, 0);
    await newFile.close();
    await this.unlink(oldPath);
    this.cache.delete(oldPath);
    this.cache.set(newPath, stats);
  }
  renameSync(_oldPath, _newPath) {
    throw new Error("Method not implemented.");
  }
  async stat(path) {
    return this.statSync(path);
  }
  statSync(path) {
    const stats = this.cache.get(path);
    if (!stats) {
      throw new ErrnoError(Errno.ENOENT, "path", path, "stat");
    }
    return stats;
  }
  async openFile(path, flag) {
    log.debug(tag.kvfs, "openFile", { path, flag });
    let buffer2;
    let stats = this.cache.get(path);
    if (isWriteable(flag)) {
      buffer2 = new ArrayBuffer(0);
      stats = new Stats({ mode: 511 | S_IFREG, size: 0 });
      this.cache.set(path, stats);
    } else {
      if (!stats) {
        throw ErrnoError.With("ENOENT", path, "openFile");
      }
      if (!stats.hasAccess(flagToMode(flag))) {
        throw ErrnoError.With("EACCES", path, "openFile");
      }
      const r = await this.fetch("GET", path);
      if (!r.ok) {
        throw new FetchError(r);
      }
      buffer2 = await (await r.blob()).arrayBuffer();
    }
    return new PreloadFile(this, path, flag, stats, new Uint8Array(buffer2));
  }
  openFileSync(_path, _flag) {
    throw new Error("Method not implemented.");
  }
  async createFile(path, flag, mode) {
    log.debug(tag.kvfs, "createFile", { path, flag, mode });
    const data = new Uint8Array(0);
    const r = await this.fetch("PUT", path, data);
    if (!r.ok) {
      throw new FetchError(r);
    }
    const stats = new Stats({ mode: mode | S_IFREG, size: 0 });
    this.cache.set(path, stats);
    return new PreloadFile(this, path, flag, stats, data);
  }
  createFileSync(_path, _flag, _mode) {
    throw new Error("Method not implemented.");
  }
  async unlink(path) {
    log.debug(tag.kvfs, "unlink", { path });
    const r = await this.fetch("DELETE", path);
    if (!r.ok) {
      throw new FetchError(r);
    }
    this.cache.delete(path);
  }
  unlinkSync(_path) {
    throw new Error("Method not implemented.");
  }
  async rmdir(path) {
    log.debug(tag.kvfs, "rmdir", { path });
    const r = await this.fetch("DELETE", path);
    if (!r.ok) {
      throw new FetchError(r);
    }
    this.cache.delete(path);
  }
  rmdirSync(_path) {
    throw new Error("Method not implemented.");
  }
  async mkdir(path, mode) {
    log.debug(tag.kvfs, "mkdir", { path, mode });
    const stats = new Stats({ mode: mode | S_IFDIR, size: 4096 });
    const r = await this.fetch("PUT", path, new Uint8Array(0), {
      "x-metadata": JSON.stringify(statsToMetadata(stats))
    });
    if (!r.ok) {
      throw new FetchError(r);
    }
    this.cache.set(path, stats);
  }
  mkdirSync(_path, _mode) {
    throw new Error("Method not implemented.");
  }
  async readdir(path) {
    log.debug(tag.kvfs, "readdir", { path });
    return this.readdirSync(path);
  }
  readdirSync(path) {
    const prefix = !path.endsWith("/") ? `${path}/` : path;
    return [...this.cache.keys()].filter((_) => _.startsWith(prefix) && _.substring(prefix.length).split("/").length === 1).map((_) => _.substring(prefix.length)).filter((_) => _.length > 0);
  }
  link(_srcpath, _dstpath) {
    throw new Error("Method not implemented.");
  }
  linkSync(_srcpath, _dstpath) {
    throw new Error("Method not implemented.");
  }
  async sync(path, data, stats) {
    log.debug(tag.kvfs, "sync", { path, data, stats });
    const metadata = statsToMetadata(stats);
    const body = new Uint8Array(data.byteLength);
    body.set(data);
    const r = await this.fetch("PUT", path, body, { "x-metadata": JSON.stringify(metadata) });
    if (!r.ok) {
      log.error(tag.kvfs, "sync", path, r.status, r.statusText);
      throw ErrnoError.With("EIO", path, "sync");
    }
    this.cache.set(path, new Stats(stats));
  }
  syncSync(_path, _data, _stats) {
    throw new Error("Method not implemented.");
  }
  async readList() {
    const r = await this.fetch("GET", "");
    if (!r.ok) {
      throw new FetchError(r);
    }
    const list = [
      ["/", new Stats({ mode: 511 | S_IFDIR, size: 4096 })],
      ...(await r.json()).map((_) => [
        `/${_.name}`,
        new Stats(_.metadata)
      ])
    ];
    log.debug(tag.kvfs, "readList", { list });
    return list;
  }
  read(_path, _buffer, _offset, _end) {
    throw new Error("Method not implemented.");
  }
  readSync(_path, _buffer, _offset, _end) {
    throw new Error("Method not implemented.");
  }
  write(_path, _buffer, _offset) {
    throw new Error("Method not implemented.");
  }
  writeSync(_path, _buffer, _offset) {
    throw new Error("Method not implemented.");
  }
}
const CloudflareKV = {
  name: "CloudflareKV",
  options: {
    prefix: {
      type: "string",
      required: true,
      description: "The URL prefix to use for requests"
    },
    token: {
      type: "string",
      required: true,
      description: "The JWT token to use"
    },
    namespace: {
      type: "string",
      required: false,
      description: "The user namespace to use"
    }
  },
  isAvailable() {
    return true;
  },
  create(options) {
    return new CloudflareKVFileSystem(options.prefix, options.token, options.namespace);
  }
};
var Module = typeof Module !== "undefined" ? Module : {};
var moduleOverrides = {};
var key;
for (key in Module) {
  if (Module.hasOwnProperty(key)) {
    moduleOverrides[key] = Module[key];
  }
}
var err = Module["printErr"] || console.warn.bind(console);
for (key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    Module[key] = moduleOverrides[key];
  }
}
moduleOverrides = null;
if (Module["arguments"])
  Module["arguments"];
if (Module["thisProgram"])
  thisProgram = Module["thisProgram"];
if (Module["quit"])
  quit_ = Module["quit"];
if (typeof WebAssembly !== "object") {
  abort("no native wasm support detected");
}
var wasmMemory;
var ABORT = false;
function ___assert_fail(condition, filename, line, func) {
  abort("Assertion failed: " + [filename ? filename : "unknown filename", line, func ? func : "unknown function"]);
}
function alignUp(x, multiple) {
  if (x % multiple > 0) {
    x += multiple - x % multiple;
  }
  return x;
}
var buffer, HEAPU8;
function updateGlobalBufferAndViews(buf) {
  buffer = buf;
  Module["HEAP8"] = new Int8Array(buf);
  Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
}
Module["INITIAL_MEMORY"] || 16777216;
var wasmTable;
var __ATPRERUN__ = [];
var __ATINIT__ = [];
var __ATPOSTRUN__ = [];
function preRun() {
  if (Module["preRun"]) {
    if (typeof Module["preRun"] == "function")
      Module["preRun"] = [Module["preRun"]];
    while (Module["preRun"].length) {
      addOnPreRun(Module["preRun"].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}
function initRuntime() {
  callRuntimeCallbacks(__ATINIT__);
}
function postRun() {
  if (Module["postRun"]) {
    if (typeof Module["postRun"] == "function")
      Module["postRun"] = [Module["postRun"]];
    while (Module["postRun"].length) {
      addOnPostRun(Module["postRun"].shift());
    }
  }
  callRuntimeCallbacks(__ATPOSTRUN__);
}
function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}
function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}
function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}
var runDependencies = 0;
var dependenciesFulfilled = null;
function addRunDependency(id) {
  runDependencies++;
  if (Module["monitorRunDependencies"]) {
    Module["monitorRunDependencies"](runDependencies);
  }
}
function removeRunDependency(id) {
  runDependencies--;
  if (Module["monitorRunDependencies"]) {
    Module["monitorRunDependencies"](runDependencies);
  }
  if (runDependencies == 0) {
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback();
    }
  }
}
Module["preloadedImages"] = {};
Module["preloadedAudios"] = {};
function abort(what) {
  if (Module["onAbort"]) {
    Module["onAbort"](what);
  }
  what += "";
  err(what);
  ABORT = true;
  what = "abort(" + what + ").";
  var e = new WebAssembly.RuntimeError(what);
  throw e;
}
function getBinaryPromise(url) {
  return fetch(url, { credentials: "same-origin" }).then(function(response) {
    if (!response["ok"]) {
      throw "failed to load wasm binary file at '" + url + "'";
    }
    return response["arrayBuffer"]();
  });
}
function init$1(filePathOrBuf) {
  var info2 = { a: asmLibraryArg };
  function receiveInstance(instance, module) {
    var exports2 = instance.exports;
    Module["asm"] = exports2;
    wasmMemory = Module["asm"]["d"];
    updateGlobalBufferAndViews(wasmMemory.buffer);
    wasmTable = Module["asm"]["s"];
    addOnInit(Module["asm"]["e"]);
    removeRunDependency();
  }
  addRunDependency();
  function receiveInstantiationResult(result) {
    receiveInstance(result["instance"]);
  }
  function instantiateArrayBuffer(receiver) {
    return getBinaryPromise(filePathOrBuf).then(function(binary) {
      var result = WebAssembly.instantiate(binary, info2);
      return result;
    }).then(receiver, function(reason) {
      err("failed to asynchronously prepare wasm: " + reason);
      abort(reason);
    });
  }
  function instantiateAsync() {
    if (filePathOrBuf && filePathOrBuf.byteLength > 0) {
      return WebAssembly.instantiate(filePathOrBuf, info2).then(receiveInstantiationResult, function(reason) {
        err("wasm compile failed: " + reason);
      });
    } else if (typeof WebAssembly.instantiateStreaming === "function" && typeof filePathOrBuf === "string" && typeof fetch === "function") {
      return fetch(filePathOrBuf, { credentials: "same-origin" }).then(function(response) {
        var result = WebAssembly.instantiateStreaming(response, info2);
        return result.then(receiveInstantiationResult, function(reason) {
          err("wasm streaming compile failed: " + reason);
          err("falling back to ArrayBuffer instantiation");
          return instantiateArrayBuffer(receiveInstantiationResult);
        });
      });
    } else {
      return instantiateArrayBuffer(receiveInstantiationResult);
    }
  }
  if (Module["instantiateWasm"]) {
    try {
      var exports = Module["instantiateWasm"](info2, receiveInstance);
      return exports;
    } catch (e) {
      err("Module.instantiateWasm callback failed with error: " + e);
      return false;
    }
  }
  instantiateAsync();
  return {};
}
function callRuntimeCallbacks(callbacks) {
  while (callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == "function") {
      callback(Module);
      continue;
    }
    var func = callback.func;
    if (typeof func === "number") {
      if (callback.arg === void 0) {
        wasmTable.get(func)();
      } else {
        wasmTable.get(func)(callback.arg);
      }
    } else {
      func(callback.arg === void 0 ? null : callback.arg);
    }
  }
}
function emscripten_realloc_buffer(size) {
  try {
    wasmMemory.grow(size - buffer.byteLength + 65535 >>> 16);
    updateGlobalBufferAndViews(wasmMemory.buffer);
    return 1;
  } catch (e) {
  }
}
function _emscripten_resize_heap(requestedSize) {
  var oldSize = HEAPU8.length;
  requestedSize = requestedSize >>> 0;
  var maxHeapSize = 2147483648;
  if (requestedSize > maxHeapSize) {
    return false;
  }
  for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
    var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
    overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
    var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
    var replacement = emscripten_realloc_buffer(newSize);
    if (replacement) {
      return true;
    }
  }
  return false;
}
function _setTempRet0(val) {
}
var asmLibraryArg = { a: ___assert_fail, b: _emscripten_resize_heap, c: _setTempRet0 };
Module["___wasm_call_ctors"] = function() {
  return (Module["___wasm_call_ctors"] = Module["asm"]["e"]).apply(null, arguments);
};
Module["_malloc"] = function() {
  return (Module["_malloc"] = Module["asm"]["q"]).apply(null, arguments);
};
Module["_free"] = function() {
  return (Module["_free"] = Module["asm"]["r"]).apply(null, arguments);
};
Module["_ZSTD_isError"] = function() {
  return (Module["_ZSTD_isError"] = Module["asm"]["f"]).apply(null, arguments);
};
Module["_ZSTD_compressBound"] = function() {
  return (Module["_ZSTD_compressBound"] = Module["asm"]["g"]).apply(null, arguments);
};
Module["_ZSTD_createCCtx"] = function() {
  return (Module["_ZSTD_createCCtx"] = Module["asm"]["h"]).apply(null, arguments);
};
Module["_ZSTD_freeCCtx"] = function() {
  return (Module["_ZSTD_freeCCtx"] = Module["asm"]["i"]).apply(null, arguments);
};
Module["_ZSTD_compress_usingDict"] = function() {
  return (Module["_ZSTD_compress_usingDict"] = Module["asm"]["j"]).apply(null, arguments);
};
Module["_ZSTD_compress"] = function() {
  return (Module["_ZSTD_compress"] = Module["asm"]["k"]).apply(null, arguments);
};
Module["_ZSTD_createDCtx"] = function() {
  return (Module["_ZSTD_createDCtx"] = Module["asm"]["l"]).apply(null, arguments);
};
Module["_ZSTD_freeDCtx"] = function() {
  return (Module["_ZSTD_freeDCtx"] = Module["asm"]["m"]).apply(null, arguments);
};
Module["_ZSTD_getFrameContentSize"] = function() {
  return (Module["_ZSTD_getFrameContentSize"] = Module["asm"]["n"]).apply(null, arguments);
};
Module["_ZSTD_decompress_usingDict"] = function() {
  return (Module["_ZSTD_decompress_usingDict"] = Module["asm"]["o"]).apply(null, arguments);
};
Module["_ZSTD_decompress"] = function() {
  return (Module["_ZSTD_decompress"] = Module["asm"]["p"]).apply(null, arguments);
};
var calledRun;
dependenciesFulfilled = function runCaller() {
  if (!calledRun)
    run();
  if (!calledRun)
    dependenciesFulfilled = runCaller;
};
function run(args) {
  if (runDependencies > 0) {
    return;
  }
  preRun();
  if (runDependencies > 0) {
    return;
  }
  function doRun() {
    if (calledRun)
      return;
    calledRun = true;
    Module["calledRun"] = true;
    if (ABORT)
      return;
    initRuntime();
    if (Module["onRuntimeInitialized"])
      Module["onRuntimeInitialized"]();
    postRun();
  }
  if (Module["setStatus"]) {
    Module["setStatus"]("Running...");
    setTimeout(function() {
      setTimeout(function() {
        Module["setStatus"]("");
      }, 1);
      doRun();
    }, 1);
  } else {
    doRun();
  }
}
Module["run"] = run;
if (Module["preInit"]) {
  if (typeof Module["preInit"] == "function")
    Module["preInit"] = [Module["preInit"]];
  while (Module["preInit"].length > 0) {
    Module["preInit"].pop()();
  }
}
Module["init"] = init$1;
var __awaiter$1 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const initialized = (() => new Promise((resolve2) => {
  Module.onRuntimeInitialized = resolve2;
}))();
const waitInitialized = () => __awaiter$1(void 0, void 0, void 0, function* () {
  yield initialized;
});
const isError = (code) => {
  const _isError = Module["_ZSTD_isError"];
  return _isError(code);
};
const getFrameContentSize = (src, size) => {
  const getSize = Module["_ZSTD_getFrameContentSize"];
  return getSize(src, size);
};
const decompress = (buf, opts = { defaultHeapSize: 1024 * 1024 }) => {
  const malloc = Module["_malloc"];
  const src = malloc(buf.byteLength);
  Module.HEAP8.set(buf, src);
  const contentSize = getFrameContentSize(src, buf.byteLength);
  const size = contentSize === -1 ? opts.defaultHeapSize : contentSize;
  const free = Module["_free"];
  const heap = malloc(size);
  try {
    const _decompress = Module["_ZSTD_decompress"];
    const sizeOrError = _decompress(heap, size, src, buf.byteLength);
    if (isError(sizeOrError)) {
      throw new Error(`Failed to compress with code ${sizeOrError}`);
    }
    const data = new Uint8Array(Module.HEAPU8.buffer, heap, sizeOrError).slice();
    free(heap, size);
    free(src, buf.byteLength);
    return data;
  } catch (e) {
    free(heap, size);
    free(src, buf.byteLength);
    throw e;
  }
};
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const init = (path) => __awaiter(void 0, void 0, void 0, function* () {
  const url = new URL("" + new URL("zstd-DKYPVdg7.wasm", import.meta.url).href, import.meta.url).href;
  Module["init"](url);
  yield waitInitialized();
});
var Format = /* @__PURE__ */ ((Format2) => {
  Format2[Format2["UNDEFINED"] = 0] = "UNDEFINED";
  Format2[Format2["RG4_UNORM_PACK8"] = 1] = "RG4_UNORM_PACK8";
  Format2[
    Format2["FIRST"] = 1
    /* RG4_UNORM_PACK8 */
  ] = "FIRST";
  Format2[Format2["RGBA4_UNORM_PACK16"] = 2] = "RGBA4_UNORM_PACK16";
  Format2[Format2["BGRA4_UNORM_PACK16"] = 3] = "BGRA4_UNORM_PACK16";
  Format2[Format2["R5G6B5_UNORM_PACK16"] = 4] = "R5G6B5_UNORM_PACK16";
  Format2[Format2["B5G6R5_UNORM_PACK16"] = 5] = "B5G6R5_UNORM_PACK16";
  Format2[Format2["RGB5A1_UNORM_PACK16"] = 6] = "RGB5A1_UNORM_PACK16";
  Format2[Format2["BGR5A1_UNORM_PACK16"] = 7] = "BGR5A1_UNORM_PACK16";
  Format2[Format2["A1RGB5_UNORM_PACK16"] = 8] = "A1RGB5_UNORM_PACK16";
  Format2[Format2["R8_UNORM_PACK8"] = 9] = "R8_UNORM_PACK8";
  Format2[Format2["R8_SNORM_PACK8"] = 10] = "R8_SNORM_PACK8";
  Format2[Format2["R8_USCALED_PACK8"] = 11] = "R8_USCALED_PACK8";
  Format2[Format2["R8_SSCALED_PACK8"] = 12] = "R8_SSCALED_PACK8";
  Format2[Format2["R8_UINT_PACK8"] = 13] = "R8_UINT_PACK8";
  Format2[Format2["R8_SINT_PACK8"] = 14] = "R8_SINT_PACK8";
  Format2[Format2["R8_SRGB_PACK8"] = 15] = "R8_SRGB_PACK8";
  Format2[Format2["RG8_UNORM_PACK8"] = 16] = "RG8_UNORM_PACK8";
  Format2[Format2["RG8_SNORM_PACK8"] = 17] = "RG8_SNORM_PACK8";
  Format2[Format2["RG8_USCALED_PACK8"] = 18] = "RG8_USCALED_PACK8";
  Format2[Format2["RG8_SSCALED_PACK8"] = 19] = "RG8_SSCALED_PACK8";
  Format2[Format2["RG8_UINT_PACK8"] = 20] = "RG8_UINT_PACK8";
  Format2[Format2["RG8_SINT_PACK8"] = 21] = "RG8_SINT_PACK8";
  Format2[Format2["RG8_SRGB_PACK8"] = 22] = "RG8_SRGB_PACK8";
  Format2[Format2["RGB8_UNORM_PACK8"] = 23] = "RGB8_UNORM_PACK8";
  Format2[Format2["RGB8_SNORM_PACK8"] = 24] = "RGB8_SNORM_PACK8";
  Format2[Format2["RGB8_USCALED_PACK8"] = 25] = "RGB8_USCALED_PACK8";
  Format2[Format2["RGB8_SSCALED_PACK8"] = 26] = "RGB8_SSCALED_PACK8";
  Format2[Format2["RGB8_UINT_PACK8"] = 27] = "RGB8_UINT_PACK8";
  Format2[Format2["RGB8_SINT_PACK8"] = 28] = "RGB8_SINT_PACK8";
  Format2[Format2["RGB8_SRGB_PACK8"] = 29] = "RGB8_SRGB_PACK8";
  Format2[Format2["BGR8_UNORM_PACK8"] = 30] = "BGR8_UNORM_PACK8";
  Format2[Format2["BGR8_SNORM_PACK8"] = 31] = "BGR8_SNORM_PACK8";
  Format2[Format2["BGR8_USCALED_PACK8"] = 32] = "BGR8_USCALED_PACK8";
  Format2[Format2["BGR8_SSCALED_PACK8"] = 33] = "BGR8_SSCALED_PACK8";
  Format2[Format2["BGR8_UINT_PACK8"] = 34] = "BGR8_UINT_PACK8";
  Format2[Format2["BGR8_SINT_PACK8"] = 35] = "BGR8_SINT_PACK8";
  Format2[Format2["BGR8_SRGB_PACK8"] = 36] = "BGR8_SRGB_PACK8";
  Format2[Format2["RGBA8_UNORM_PACK8"] = 37] = "RGBA8_UNORM_PACK8";
  Format2[Format2["RGBA8_SNORM_PACK8"] = 38] = "RGBA8_SNORM_PACK8";
  Format2[Format2["RGBA8_USCALED_PACK8"] = 39] = "RGBA8_USCALED_PACK8";
  Format2[Format2["RGBA8_SSCALED_PACK8"] = 40] = "RGBA8_SSCALED_PACK8";
  Format2[Format2["RGBA8_UINT_PACK8"] = 41] = "RGBA8_UINT_PACK8";
  Format2[Format2["RGBA8_SINT_PACK8"] = 42] = "RGBA8_SINT_PACK8";
  Format2[Format2["RGBA8_SRGB_PACK8"] = 43] = "RGBA8_SRGB_PACK8";
  Format2[Format2["BGRA8_UNORM_PACK8"] = 44] = "BGRA8_UNORM_PACK8";
  Format2[Format2["BGRA8_SNORM_PACK8"] = 45] = "BGRA8_SNORM_PACK8";
  Format2[Format2["BGRA8_USCALED_PACK8"] = 46] = "BGRA8_USCALED_PACK8";
  Format2[Format2["BGRA8_SSCALED_PACK8"] = 47] = "BGRA8_SSCALED_PACK8";
  Format2[Format2["BGRA8_UINT_PACK8"] = 48] = "BGRA8_UINT_PACK8";
  Format2[Format2["BGRA8_SINT_PACK8"] = 49] = "BGRA8_SINT_PACK8";
  Format2[Format2["BGRA8_SRGB_PACK8"] = 50] = "BGRA8_SRGB_PACK8";
  Format2[Format2["RGBA8_UNORM_PACK32"] = 51] = "RGBA8_UNORM_PACK32";
  Format2[Format2["RGBA8_SNORM_PACK32"] = 52] = "RGBA8_SNORM_PACK32";
  Format2[Format2["RGBA8_USCALED_PACK32"] = 53] = "RGBA8_USCALED_PACK32";
  Format2[Format2["RGBA8_SSCALED_PACK32"] = 54] = "RGBA8_SSCALED_PACK32";
  Format2[Format2["RGBA8_UINT_PACK32"] = 55] = "RGBA8_UINT_PACK32";
  Format2[Format2["RGBA8_SINT_PACK32"] = 56] = "RGBA8_SINT_PACK32";
  Format2[Format2["RGBA8_SRGB_PACK32"] = 57] = "RGBA8_SRGB_PACK32";
  Format2[Format2["RGB10A2_UNORM_PACK32"] = 58] = "RGB10A2_UNORM_PACK32";
  Format2[Format2["RGB10A2_SNORM_PACK32"] = 59] = "RGB10A2_SNORM_PACK32";
  Format2[Format2["RGB10A2_USCALED_PACK32"] = 60] = "RGB10A2_USCALED_PACK32";
  Format2[Format2["RGB10A2_SSCALED_PACK32"] = 61] = "RGB10A2_SSCALED_PACK32";
  Format2[Format2["RGB10A2_UINT_PACK32"] = 62] = "RGB10A2_UINT_PACK32";
  Format2[Format2["RGB10A2_SINT_PACK32"] = 63] = "RGB10A2_SINT_PACK32";
  Format2[Format2["BGR10A2_UNORM_PACK32"] = 64] = "BGR10A2_UNORM_PACK32";
  Format2[Format2["BGR10A2_SNORM_PACK32"] = 65] = "BGR10A2_SNORM_PACK32";
  Format2[Format2["BGR10A2_USCALED_PACK32"] = 66] = "BGR10A2_USCALED_PACK32";
  Format2[Format2["BGR10A2_SSCALED_PACK32"] = 67] = "BGR10A2_SSCALED_PACK32";
  Format2[Format2["BGR10A2_UINT_PACK32"] = 68] = "BGR10A2_UINT_PACK32";
  Format2[Format2["BGR10A2_SINT_PACK32"] = 69] = "BGR10A2_SINT_PACK32";
  Format2[Format2["R16_UNORM_PACK16"] = 70] = "R16_UNORM_PACK16";
  Format2[Format2["R16_SNORM_PACK16"] = 71] = "R16_SNORM_PACK16";
  Format2[Format2["R16_USCALED_PACK16"] = 72] = "R16_USCALED_PACK16";
  Format2[Format2["R16_SSCALED_PACK16"] = 73] = "R16_SSCALED_PACK16";
  Format2[Format2["R16_UINT_PACK16"] = 74] = "R16_UINT_PACK16";
  Format2[Format2["R16_SINT_PACK16"] = 75] = "R16_SINT_PACK16";
  Format2[Format2["R16_SFLOAT_PACK16"] = 76] = "R16_SFLOAT_PACK16";
  Format2[Format2["RG16_UNORM_PACK16"] = 77] = "RG16_UNORM_PACK16";
  Format2[Format2["RG16_SNORM_PACK16"] = 78] = "RG16_SNORM_PACK16";
  Format2[Format2["RG16_USCALED_PACK16"] = 79] = "RG16_USCALED_PACK16";
  Format2[Format2["RG16_SSCALED_PACK16"] = 80] = "RG16_SSCALED_PACK16";
  Format2[Format2["RG16_UINT_PACK16"] = 81] = "RG16_UINT_PACK16";
  Format2[Format2["RG16_SINT_PACK16"] = 82] = "RG16_SINT_PACK16";
  Format2[Format2["RG16_SFLOAT_PACK16"] = 83] = "RG16_SFLOAT_PACK16";
  Format2[Format2["RGB16_UNORM_PACK16"] = 84] = "RGB16_UNORM_PACK16";
  Format2[Format2["RGB16_SNORM_PACK16"] = 85] = "RGB16_SNORM_PACK16";
  Format2[Format2["RGB16_USCALED_PACK16"] = 86] = "RGB16_USCALED_PACK16";
  Format2[Format2["RGB16_SSCALED_PACK16"] = 87] = "RGB16_SSCALED_PACK16";
  Format2[Format2["RGB16_UINT_PACK16"] = 88] = "RGB16_UINT_PACK16";
  Format2[Format2["RGB16_SINT_PACK16"] = 89] = "RGB16_SINT_PACK16";
  Format2[Format2["RGB16_SFLOAT_PACK16"] = 90] = "RGB16_SFLOAT_PACK16";
  Format2[Format2["RGBA16_UNORM_PACK16"] = 91] = "RGBA16_UNORM_PACK16";
  Format2[Format2["RGBA16_SNORM_PACK16"] = 92] = "RGBA16_SNORM_PACK16";
  Format2[Format2["RGBA16_USCALED_PACK16"] = 93] = "RGBA16_USCALED_PACK16";
  Format2[Format2["RGBA16_SSCALED_PACK16"] = 94] = "RGBA16_SSCALED_PACK16";
  Format2[Format2["RGBA16_UINT_PACK16"] = 95] = "RGBA16_UINT_PACK16";
  Format2[Format2["RGBA16_SINT_PACK16"] = 96] = "RGBA16_SINT_PACK16";
  Format2[Format2["RGBA16_SFLOAT_PACK16"] = 97] = "RGBA16_SFLOAT_PACK16";
  Format2[Format2["R32_UINT_PACK32"] = 98] = "R32_UINT_PACK32";
  Format2[Format2["R32_SINT_PACK32"] = 99] = "R32_SINT_PACK32";
  Format2[Format2["R32_SFLOAT_PACK32"] = 100] = "R32_SFLOAT_PACK32";
  Format2[Format2["RG32_UINT_PACK32"] = 101] = "RG32_UINT_PACK32";
  Format2[Format2["RG32_SINT_PACK32"] = 102] = "RG32_SINT_PACK32";
  Format2[Format2["RG32_SFLOAT_PACK32"] = 103] = "RG32_SFLOAT_PACK32";
  Format2[Format2["RGB32_UINT_PACK32"] = 104] = "RGB32_UINT_PACK32";
  Format2[Format2["RGB32_SINT_PACK32"] = 105] = "RGB32_SINT_PACK32";
  Format2[Format2["RGB32_SFLOAT_PACK32"] = 106] = "RGB32_SFLOAT_PACK32";
  Format2[Format2["RGBA32_UINT_PACK32"] = 107] = "RGBA32_UINT_PACK32";
  Format2[Format2["RGBA32_SINT_PACK32"] = 108] = "RGBA32_SINT_PACK32";
  Format2[Format2["RGBA32_SFLOAT_PACK32"] = 109] = "RGBA32_SFLOAT_PACK32";
  Format2[Format2["R64_UINT_PACK64"] = 110] = "R64_UINT_PACK64";
  Format2[Format2["R64_SINT_PACK64"] = 111] = "R64_SINT_PACK64";
  Format2[Format2["R64_SFLOAT_PACK64"] = 112] = "R64_SFLOAT_PACK64";
  Format2[Format2["RG64_UINT_PACK64"] = 113] = "RG64_UINT_PACK64";
  Format2[Format2["RG64_SINT_PACK64"] = 114] = "RG64_SINT_PACK64";
  Format2[Format2["RG64_SFLOAT_PACK64"] = 115] = "RG64_SFLOAT_PACK64";
  Format2[Format2["RGB64_UINT_PACK64"] = 116] = "RGB64_UINT_PACK64";
  Format2[Format2["RGB64_SINT_PACK64"] = 117] = "RGB64_SINT_PACK64";
  Format2[Format2["RGB64_SFLOAT_PACK64"] = 118] = "RGB64_SFLOAT_PACK64";
  Format2[Format2["RGBA64_UINT_PACK64"] = 119] = "RGBA64_UINT_PACK64";
  Format2[Format2["RGBA64_SINT_PACK64"] = 120] = "RGBA64_SINT_PACK64";
  Format2[Format2["RGBA64_SFLOAT_PACK64"] = 121] = "RGBA64_SFLOAT_PACK64";
  Format2[Format2["RG11B10_UFLOAT_PACK32"] = 122] = "RG11B10_UFLOAT_PACK32";
  Format2[Format2["RGB9E5_UFLOAT_PACK32"] = 123] = "RGB9E5_UFLOAT_PACK32";
  Format2[Format2["D16_UNORM_PACK16"] = 124] = "D16_UNORM_PACK16";
  Format2[Format2["D24_UNORM_PACK32"] = 125] = "D24_UNORM_PACK32";
  Format2[Format2["D32_SFLOAT_PACK32"] = 126] = "D32_SFLOAT_PACK32";
  Format2[Format2["S8_UINT_PACK8"] = 127] = "S8_UINT_PACK8";
  Format2[Format2["D16_UNORM_S8_UINT_PACK32"] = 128] = "D16_UNORM_S8_UINT_PACK32";
  Format2[Format2["D24_UNORM_S8_UINT_PACK32"] = 129] = "D24_UNORM_S8_UINT_PACK32";
  Format2[Format2["D32_SFLOAT_S8_UINT_PACK64"] = 130] = "D32_SFLOAT_S8_UINT_PACK64";
  Format2[Format2["RGB_DXT1_UNORM_BLOCK8"] = 131] = "RGB_DXT1_UNORM_BLOCK8";
  Format2[Format2["RGB_DXT1_SRGB_BLOCK8"] = 132] = "RGB_DXT1_SRGB_BLOCK8";
  Format2[Format2["RGBA_DXT1_UNORM_BLOCK8"] = 133] = "RGBA_DXT1_UNORM_BLOCK8";
  Format2[Format2["RGBA_DXT1_SRGB_BLOCK8"] = 134] = "RGBA_DXT1_SRGB_BLOCK8";
  Format2[Format2["RGBA_DXT3_UNORM_BLOCK16"] = 135] = "RGBA_DXT3_UNORM_BLOCK16";
  Format2[Format2["RGBA_DXT3_SRGB_BLOCK16"] = 136] = "RGBA_DXT3_SRGB_BLOCK16";
  Format2[Format2["RGBA_DXT5_UNORM_BLOCK16"] = 137] = "RGBA_DXT5_UNORM_BLOCK16";
  Format2[Format2["RGBA_DXT5_SRGB_BLOCK16"] = 138] = "RGBA_DXT5_SRGB_BLOCK16";
  Format2[Format2["R_ATI1N_UNORM_BLOCK8"] = 139] = "R_ATI1N_UNORM_BLOCK8";
  Format2[Format2["R_ATI1N_SNORM_BLOCK8"] = 140] = "R_ATI1N_SNORM_BLOCK8";
  Format2[Format2["RG_ATI2N_UNORM_BLOCK16"] = 141] = "RG_ATI2N_UNORM_BLOCK16";
  Format2[Format2["RG_ATI2N_SNORM_BLOCK16"] = 142] = "RG_ATI2N_SNORM_BLOCK16";
  Format2[Format2["RGB_BP_UFLOAT_BLOCK16"] = 143] = "RGB_BP_UFLOAT_BLOCK16";
  Format2[Format2["RGB_BP_SFLOAT_BLOCK16"] = 144] = "RGB_BP_SFLOAT_BLOCK16";
  Format2[Format2["RGBA_BP_UNORM_BLOCK16"] = 145] = "RGBA_BP_UNORM_BLOCK16";
  Format2[Format2["RGBA_BP_SRGB_BLOCK16"] = 146] = "RGBA_BP_SRGB_BLOCK16";
  Format2[Format2["RGB_ETC2_UNORM_BLOCK8"] = 147] = "RGB_ETC2_UNORM_BLOCK8";
  Format2[Format2["RGB_ETC2_SRGB_BLOCK8"] = 148] = "RGB_ETC2_SRGB_BLOCK8";
  Format2[Format2["RGBA_ETC2_UNORM_BLOCK8"] = 149] = "RGBA_ETC2_UNORM_BLOCK8";
  Format2[Format2["RGBA_ETC2_SRGB_BLOCK8"] = 150] = "RGBA_ETC2_SRGB_BLOCK8";
  Format2[Format2["RGBA_ETC2_UNORM_BLOCK16"] = 151] = "RGBA_ETC2_UNORM_BLOCK16";
  Format2[Format2["RGBA_ETC2_SRGB_BLOCK16"] = 152] = "RGBA_ETC2_SRGB_BLOCK16";
  Format2[Format2["R_EAC_UNORM_BLOCK8"] = 153] = "R_EAC_UNORM_BLOCK8";
  Format2[Format2["R_EAC_SNORM_BLOCK8"] = 154] = "R_EAC_SNORM_BLOCK8";
  Format2[Format2["RG_EAC_UNORM_BLOCK16"] = 155] = "RG_EAC_UNORM_BLOCK16";
  Format2[Format2["RG_EAC_SNORM_BLOCK16"] = 156] = "RG_EAC_SNORM_BLOCK16";
  Format2[Format2["RGBA_ASTC_4X4_UNORM_BLOCK16"] = 157] = "RGBA_ASTC_4X4_UNORM_BLOCK16";
  Format2[Format2["RGBA_ASTC_4X4_SRGB_BLOCK16"] = 158] = "RGBA_ASTC_4X4_SRGB_BLOCK16";
  Format2[Format2["RGBA_ASTC_5X4_UNORM_BLOCK16"] = 159] = "RGBA_ASTC_5X4_UNORM_BLOCK16";
  Format2[Format2["RGBA_ASTC_5X4_SRGB_BLOCK16"] = 160] = "RGBA_ASTC_5X4_SRGB_BLOCK16";
  Format2[Format2["RGBA_ASTC_5X5_UNORM_BLOCK16"] = 161] = "RGBA_ASTC_5X5_UNORM_BLOCK16";
  Format2[Format2["RGBA_ASTC_5X5_SRGB_BLOCK16"] = 162] = "RGBA_ASTC_5X5_SRGB_BLOCK16";
  Format2[Format2["RGBA_ASTC_6X5_UNORM_BLOCK16"] = 163] = "RGBA_ASTC_6X5_UNORM_BLOCK16";
  Format2[Format2["RGBA_ASTC_6X5_SRGB_BLOCK16"] = 164] = "RGBA_ASTC_6X5_SRGB_BLOCK16";
  Format2[Format2["RGBA_ASTC_6X6_UNORM_BLOCK16"] = 165] = "RGBA_ASTC_6X6_UNORM_BLOCK16";
  Format2[Format2["RGBA_ASTC_6X6_SRGB_BLOCK16"] = 166] = "RGBA_ASTC_6X6_SRGB_BLOCK16";
  Format2[Format2["RGBA_ASTC_8X5_UNORM_BLOCK16"] = 167] = "RGBA_ASTC_8X5_UNORM_BLOCK16";
  Format2[Format2["RGBA_ASTC_8X5_SRGB_BLOCK16"] = 168] = "RGBA_ASTC_8X5_SRGB_BLOCK16";
  Format2[Format2["RGBA_ASTC_8X6_UNORM_BLOCK16"] = 169] = "RGBA_ASTC_8X6_UNORM_BLOCK16";
  Format2[Format2["RGBA_ASTC_8X6_SRGB_BLOCK16"] = 170] = "RGBA_ASTC_8X6_SRGB_BLOCK16";
  Format2[Format2["RGBA_ASTC_8X8_UNORM_BLOCK16"] = 171] = "RGBA_ASTC_8X8_UNORM_BLOCK16";
  Format2[Format2["RGBA_ASTC_8X8_SRGB_BLOCK16"] = 172] = "RGBA_ASTC_8X8_SRGB_BLOCK16";
  Format2[Format2["RGBA_ASTC_10X5_UNORM_BLOCK16"] = 173] = "RGBA_ASTC_10X5_UNORM_BLOCK16";
  Format2[Format2["RGBA_ASTC_10X5_SRGB_BLOCK16"] = 174] = "RGBA_ASTC_10X5_SRGB_BLOCK16";
  Format2[Format2["RGBA_ASTC_10X6_UNORM_BLOCK16"] = 175] = "RGBA_ASTC_10X6_UNORM_BLOCK16";
  Format2[Format2["RGBA_ASTC_10X6_SRGB_BLOCK16"] = 176] = "RGBA_ASTC_10X6_SRGB_BLOCK16";
  Format2[Format2["RGBA_ASTC_10X8_UNORM_BLOCK16"] = 177] = "RGBA_ASTC_10X8_UNORM_BLOCK16";
  Format2[Format2["RGBA_ASTC_10X8_SRGB_BLOCK16"] = 178] = "RGBA_ASTC_10X8_SRGB_BLOCK16";
  Format2[Format2["RGBA_ASTC_10X10_UNORM_BLOCK16"] = 179] = "RGBA_ASTC_10X10_UNORM_BLOCK16";
  Format2[Format2["RGBA_ASTC_10X10_SRGB_BLOCK16"] = 180] = "RGBA_ASTC_10X10_SRGB_BLOCK16";
  Format2[Format2["RGBA_ASTC_12X10_UNORM_BLOCK16"] = 181] = "RGBA_ASTC_12X10_UNORM_BLOCK16";
  Format2[Format2["RGBA_ASTC_12X10_SRGB_BLOCK16"] = 182] = "RGBA_ASTC_12X10_SRGB_BLOCK16";
  Format2[Format2["RGBA_ASTC_12X12_UNORM_BLOCK16"] = 183] = "RGBA_ASTC_12X12_UNORM_BLOCK16";
  Format2[Format2["RGBA_ASTC_12X12_SRGB_BLOCK16"] = 184] = "RGBA_ASTC_12X12_SRGB_BLOCK16";
  Format2[Format2["RGB_PVRTC1_8X8_UNORM_BLOCK32"] = 185] = "RGB_PVRTC1_8X8_UNORM_BLOCK32";
  Format2[Format2["RGB_PVRTC1_8X8_SRGB_BLOCK32"] = 186] = "RGB_PVRTC1_8X8_SRGB_BLOCK32";
  Format2[Format2["RGB_PVRTC1_16X8_UNORM_BLOCK32"] = 187] = "RGB_PVRTC1_16X8_UNORM_BLOCK32";
  Format2[Format2["RGB_PVRTC1_16X8_SRGB_BLOCK32"] = 188] = "RGB_PVRTC1_16X8_SRGB_BLOCK32";
  Format2[Format2["RGBA_PVRTC1_8X8_UNORM_BLOCK32"] = 189] = "RGBA_PVRTC1_8X8_UNORM_BLOCK32";
  Format2[Format2["RGBA_PVRTC1_8X8_SRGB_BLOCK32"] = 190] = "RGBA_PVRTC1_8X8_SRGB_BLOCK32";
  Format2[Format2["RGBA_PVRTC1_16X8_UNORM_BLOCK32"] = 191] = "RGBA_PVRTC1_16X8_UNORM_BLOCK32";
  Format2[Format2["RGBA_PVRTC1_16X8_SRGB_BLOCK32"] = 192] = "RGBA_PVRTC1_16X8_SRGB_BLOCK32";
  Format2[Format2["RGBA_PVRTC2_4X4_UNORM_BLOCK8"] = 193] = "RGBA_PVRTC2_4X4_UNORM_BLOCK8";
  Format2[Format2["RGBA_PVRTC2_4X4_SRGB_BLOCK8"] = 194] = "RGBA_PVRTC2_4X4_SRGB_BLOCK8";
  Format2[Format2["RGBA_PVRTC2_8X4_UNORM_BLOCK8"] = 195] = "RGBA_PVRTC2_8X4_UNORM_BLOCK8";
  Format2[Format2["RGBA_PVRTC2_8X4_SRGB_BLOCK8"] = 196] = "RGBA_PVRTC2_8X4_SRGB_BLOCK8";
  Format2[Format2["RGB_ETC_UNORM_BLOCK8"] = 197] = "RGB_ETC_UNORM_BLOCK8";
  Format2[Format2["RGB_ATC_UNORM_BLOCK8"] = 198] = "RGB_ATC_UNORM_BLOCK8";
  Format2[Format2["RGBA_ATCA_UNORM_BLOCK16"] = 199] = "RGBA_ATCA_UNORM_BLOCK16";
  Format2[Format2["RGBA_ATCI_UNORM_BLOCK16"] = 200] = "RGBA_ATCI_UNORM_BLOCK16";
  Format2[Format2["L8_UNORM_PACK8"] = 201] = "L8_UNORM_PACK8";
  Format2[Format2["A8_UNORM_PACK8"] = 202] = "A8_UNORM_PACK8";
  Format2[Format2["LA8_UNORM_PACK8"] = 203] = "LA8_UNORM_PACK8";
  Format2[Format2["L16_UNORM_PACK16"] = 204] = "L16_UNORM_PACK16";
  Format2[Format2["A16_UNORM_PACK16"] = 205] = "A16_UNORM_PACK16";
  Format2[Format2["LA16_UNORM_PACK16"] = 206] = "LA16_UNORM_PACK16";
  Format2[Format2["BGR8_UNORM_PACK32"] = 207] = "BGR8_UNORM_PACK32";
  Format2[Format2["BGR8_SRGB_PACK32"] = 208] = "BGR8_SRGB_PACK32";
  Format2[Format2["RG3B2_UNORM_PACK8"] = 209] = "RG3B2_UNORM_PACK8";
  Format2[
    Format2["LAST"] = 209
    /* RG3B2_UNORM_PACK8 */
  ] = "LAST";
  return Format2;
})(Format || {});
var Swizzle = /* @__PURE__ */ ((Swizzle2) => {
  Swizzle2[Swizzle2["RED"] = 0] = "RED";
  Swizzle2[
    Swizzle2["FIRST"] = 0
    /* RED */
  ] = "FIRST";
  Swizzle2[
    Swizzle2["CHANNEL_FIRST"] = 0
    /* RED */
  ] = "CHANNEL_FIRST";
  Swizzle2[Swizzle2["GREEN"] = 1] = "GREEN";
  Swizzle2[Swizzle2["BLUE"] = 2] = "BLUE";
  Swizzle2[Swizzle2["ALPHA"] = 3] = "ALPHA";
  Swizzle2[
    Swizzle2["CHANNEL_LAST"] = 3
    /* ALPHA */
  ] = "CHANNEL_LAST";
  Swizzle2[Swizzle2["ZERO"] = 4] = "ZERO";
  Swizzle2[Swizzle2["ONE"] = 5] = "ONE";
  Swizzle2[
    Swizzle2["LAST"] = 5
    /* ONE */
  ] = "LAST";
  return Swizzle2;
})(Swizzle || {});
var Ddpf = /* @__PURE__ */ ((Ddpf2) => {
  Ddpf2[Ddpf2["ALPHAPIXELS"] = 1] = "ALPHAPIXELS";
  Ddpf2[Ddpf2["ALPHA"] = 2] = "ALPHA";
  Ddpf2[Ddpf2["FOURCC"] = 4] = "FOURCC";
  Ddpf2[Ddpf2["RGB"] = 64] = "RGB";
  Ddpf2[Ddpf2["YUV"] = 512] = "YUV";
  Ddpf2[Ddpf2["LUMINANCE"] = 131072] = "LUMINANCE";
  Ddpf2[Ddpf2["LUMINANCE_ALPHA"] = 131074] = "LUMINANCE_ALPHA";
  Ddpf2[Ddpf2["RGBAPIXELS"] = 65] = "RGBAPIXELS";
  Ddpf2[Ddpf2["RGBA"] = 66] = "RGBA";
  Ddpf2[Ddpf2["LUMINANCE_ALPHAPIXELS"] = 131073] = "LUMINANCE_ALPHAPIXELS";
  return Ddpf2;
})(Ddpf || {});
var D3dFmt = /* @__PURE__ */ ((D3dFmt2) => {
  D3dFmt2[D3dFmt2["UNKNOWN"] = 0] = "UNKNOWN";
  D3dFmt2[D3dFmt2["R8G8B8"] = 20] = "R8G8B8";
  D3dFmt2[D3dFmt2["A8R8G8B8"] = 21] = "A8R8G8B8";
  D3dFmt2[D3dFmt2["X8R8G8B8"] = 22] = "X8R8G8B8";
  D3dFmt2[D3dFmt2["R5G6B5"] = 23] = "R5G6B5";
  D3dFmt2[D3dFmt2["X1R5G5B5"] = 24] = "X1R5G5B5";
  D3dFmt2[D3dFmt2["A1R5G5B5"] = 25] = "A1R5G5B5";
  D3dFmt2[D3dFmt2["A4R4G4B4"] = 26] = "A4R4G4B4";
  D3dFmt2[D3dFmt2["R3G3B2"] = 27] = "R3G3B2";
  D3dFmt2[D3dFmt2["A8"] = 28] = "A8";
  D3dFmt2[D3dFmt2["A8R3G3B2"] = 29] = "A8R3G3B2";
  D3dFmt2[D3dFmt2["X4R4G4B4"] = 30] = "X4R4G4B4";
  D3dFmt2[D3dFmt2["A2B10G10R10"] = 31] = "A2B10G10R10";
  D3dFmt2[D3dFmt2["A8B8G8R8"] = 32] = "A8B8G8R8";
  D3dFmt2[D3dFmt2["X8B8G8R8"] = 33] = "X8B8G8R8";
  D3dFmt2[D3dFmt2["G16R16"] = 34] = "G16R16";
  D3dFmt2[D3dFmt2["A2R10G10B10"] = 35] = "A2R10G10B10";
  D3dFmt2[D3dFmt2["A16B16G16R16"] = 36] = "A16B16G16R16";
  D3dFmt2[D3dFmt2["A8P8"] = 40] = "A8P8";
  D3dFmt2[D3dFmt2["P8"] = 41] = "P8";
  D3dFmt2[D3dFmt2["L8"] = 50] = "L8";
  D3dFmt2[D3dFmt2["A8L8"] = 51] = "A8L8";
  D3dFmt2[D3dFmt2["A4L4"] = 52] = "A4L4";
  D3dFmt2[D3dFmt2["V8U8"] = 60] = "V8U8";
  D3dFmt2[D3dFmt2["L6V5U5"] = 61] = "L6V5U5";
  D3dFmt2[D3dFmt2["X8L8V8U8"] = 62] = "X8L8V8U8";
  D3dFmt2[D3dFmt2["Q8W8V8U8"] = 63] = "Q8W8V8U8";
  D3dFmt2[D3dFmt2["V16U16"] = 64] = "V16U16";
  D3dFmt2[D3dFmt2["A2W10V10U10"] = 67] = "A2W10V10U10";
  D3dFmt2[D3dFmt2["UYVY"] = 1498831189] = "UYVY";
  D3dFmt2[D3dFmt2["R8G8_B8G8"] = 1195525970] = "R8G8_B8G8";
  D3dFmt2[D3dFmt2["YUY2"] = 844715353] = "YUY2";
  D3dFmt2[D3dFmt2["G8R8_G8B8"] = 1111970375] = "G8R8_G8B8";
  D3dFmt2[D3dFmt2["DXT1"] = 827611204] = "DXT1";
  D3dFmt2[D3dFmt2["DXT2"] = 844388420] = "DXT2";
  D3dFmt2[D3dFmt2["DXT3"] = 861165636] = "DXT3";
  D3dFmt2[D3dFmt2["DXT4"] = 877942852] = "DXT4";
  D3dFmt2[D3dFmt2["DXT5"] = 894720068] = "DXT5";
  D3dFmt2[D3dFmt2["ATI1"] = 826889281] = "ATI1";
  D3dFmt2[D3dFmt2["AT1N"] = 1311855681] = "AT1N";
  D3dFmt2[D3dFmt2["ATI2"] = 843666497] = "ATI2";
  D3dFmt2[D3dFmt2["AT2N"] = 1311921217] = "AT2N";
  D3dFmt2[D3dFmt2["BC4U"] = 1429488450] = "BC4U";
  D3dFmt2[D3dFmt2["BC4S"] = 1395934018] = "BC4S";
  D3dFmt2[D3dFmt2["BC5U"] = 1429553986] = "BC5U";
  D3dFmt2[D3dFmt2["BC5S"] = 1395999554] = "BC5S";
  D3dFmt2[D3dFmt2["ETC"] = 541283397] = "ETC";
  D3dFmt2[D3dFmt2["ETC1"] = 826496069] = "ETC1";
  D3dFmt2[D3dFmt2["ATC"] = 541283393] = "ATC";
  D3dFmt2[D3dFmt2["ATCA"] = 1094931521] = "ATCA";
  D3dFmt2[D3dFmt2["ATCI"] = 1229149249] = "ATCI";
  D3dFmt2[D3dFmt2["POWERVR_2BPP"] = 843273296] = "POWERVR_2BPP";
  D3dFmt2[D3dFmt2["POWERVR_4BPP"] = 876827728] = "POWERVR_4BPP";
  D3dFmt2[D3dFmt2["D16_LOCKABLE"] = 70] = "D16_LOCKABLE";
  D3dFmt2[D3dFmt2["D32"] = 71] = "D32";
  D3dFmt2[D3dFmt2["D15S1"] = 73] = "D15S1";
  D3dFmt2[D3dFmt2["D24S8"] = 75] = "D24S8";
  D3dFmt2[D3dFmt2["D24X8"] = 77] = "D24X8";
  D3dFmt2[D3dFmt2["D24X4S4"] = 79] = "D24X4S4";
  D3dFmt2[D3dFmt2["D16"] = 80] = "D16";
  D3dFmt2[D3dFmt2["D32F_LOCKABLE"] = 82] = "D32F_LOCKABLE";
  D3dFmt2[D3dFmt2["D24FS8"] = 83] = "D24FS8";
  D3dFmt2[D3dFmt2["L16"] = 81] = "L16";
  D3dFmt2[D3dFmt2["VERTEXDATA"] = 100] = "VERTEXDATA";
  D3dFmt2[D3dFmt2["INDEX16"] = 101] = "INDEX16";
  D3dFmt2[D3dFmt2["INDEX32"] = 102] = "INDEX32";
  D3dFmt2[D3dFmt2["Q16W16V16U16"] = 110] = "Q16W16V16U16";
  D3dFmt2[D3dFmt2["MULTI2_ARGB8"] = 827606349] = "MULTI2_ARGB8";
  D3dFmt2[D3dFmt2["R16F"] = 111] = "R16F";
  D3dFmt2[D3dFmt2["G16R16F"] = 112] = "G16R16F";
  D3dFmt2[D3dFmt2["A16B16G16R16F"] = 113] = "A16B16G16R16F";
  D3dFmt2[D3dFmt2["R32F"] = 114] = "R32F";
  D3dFmt2[D3dFmt2["G32R32F"] = 115] = "G32R32F";
  D3dFmt2[D3dFmt2["A32B32G32R32F"] = 116] = "A32B32G32R32F";
  D3dFmt2[D3dFmt2["CxV8U8"] = 117] = "CxV8U8";
  D3dFmt2[D3dFmt2["DX10"] = 808540228] = "DX10";
  D3dFmt2[D3dFmt2["GLI1"] = 826887239] = "GLI1";
  D3dFmt2[D3dFmt2["FORCE_DWORD"] = 2147483647] = "FORCE_DWORD";
  return D3dFmt2;
})(D3dFmt || {});
const formatInfos = {
  [
    0
    /* UNDEFINED */
  ]: { blockSize: 0, blockExtent: [0, 0, 0], component: 0, swizzles: [
    4,
    4,
    4,
    4
    /* ZERO */
  ], flags: 0, ddPixelFormat: 66, d3dFormat: 808540228, dxgiFormat: 1, mask: [0, 0, 0, 0] },
  [
    1
    /* RG4_UNORM_PACK8 */
  ]: { blockSize: 1, blockExtent: [1, 1, 1], component: 2, swizzles: [
    0,
    1,
    4,
    5
    /* ONE */
  ], flags: 4096 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 13, mask: [15, 240, 0, 0] },
  [
    2
    /* RGBA4_UNORM_PACK16 */
  ]: { blockSize: 2, blockExtent: [1, 1, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 8192 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 14, mask: [15, 240, 0, 0] },
  [
    3
    /* BGRA4_UNORM_PACK16 */
  ]: { blockSize: 2, blockExtent: [1, 1, 1], component: 4, swizzles: [
    2,
    1,
    0,
    3
    /* ALPHA */
  ], flags: 8192 | 4 | 16, ddPixelFormat: 4, d3dFormat: 26, dxgiFormat: 115, mask: [3840, 240, 15, 61440] },
  [
    4
    /* R5G6B5_UNORM_PACK16 */
  ]: { blockSize: 2, blockExtent: [1, 1, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 8192 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 15, mask: [31, 2016, 63488, 0] },
  [
    5
    /* B5G6R5_UNORM_PACK16 */
  ]: { blockSize: 2, blockExtent: [1, 1, 1], component: 3, swizzles: [
    2,
    1,
    0,
    5
    /* ONE */
  ], flags: 8192 | 4 | 16, ddPixelFormat: 4, d3dFormat: 23, dxgiFormat: 85, mask: [63488, 2016, 31, 0] },
  [
    6
    /* RGB5A1_UNORM_PACK16 */
  ]: { blockSize: 2, blockExtent: [1, 1, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 8192 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 16, mask: [31, 992, 31744, 32768] },
  [
    7
    /* BGR5A1_UNORM_PACK16 */
  ]: { blockSize: 2, blockExtent: [1, 1, 1], component: 4, swizzles: [
    2,
    1,
    0,
    3
    /* ALPHA */
  ], flags: 8192 | 4 | 16, ddPixelFormat: 4, d3dFormat: 25, dxgiFormat: 86, mask: [31744, 992, 31, 32768] },
  [
    8
    /* A1RGB5_UNORM_PACK16 */
  ]: { blockSize: 2, blockExtent: [1, 1, 1], component: 4, swizzles: [
    3,
    0,
    1,
    2
    /* BLUE */
  ], flags: 8192 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 17, mask: [31744, 992, 31, 32768] },
  [
    9
    /* R8_UNORM_PACK8 */
  ]: { blockSize: 1, blockExtent: [1, 1, 1], component: 1, swizzles: [
    0,
    4,
    4,
    5
    /* ONE */
  ], flags: 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 61, mask: [16711680, 0, 0, 0] },
  [
    10
    /* R8_SNORM_PACK8 */
  ]: { blockSize: 1, blockExtent: [1, 1, 1], component: 1, swizzles: [
    0,
    4,
    4,
    5
    /* ONE */
  ], flags: 4 | 32, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 63, mask: [0, 0, 0, 0] },
  [
    11
    /* R8_USCALED_PACK8 */
  ]: { blockSize: 1, blockExtent: [1, 1, 1], component: 1, swizzles: [
    0,
    4,
    4,
    5
    /* ONE */
  ], flags: 8 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 19, mask: [16711680, 0, 0, 0] },
  [
    12
    /* R8_SSCALED_PACK8 */
  ]: { blockSize: 1, blockExtent: [1, 1, 1], component: 1, swizzles: [
    0,
    4,
    4,
    5
    /* ONE */
  ], flags: 8 | 32 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 20, mask: [0, 0, 0, 0] },
  [
    13
    /* R8_UINT_PACK8 */
  ]: { blockSize: 1, blockExtent: [1, 1, 1], component: 1, swizzles: [
    0,
    4,
    4,
    5
    /* ONE */
  ], flags: 64 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 62, mask: [0, 0, 0, 0] },
  [
    14
    /* R8_SINT_PACK8 */
  ]: { blockSize: 1, blockExtent: [1, 1, 1], component: 1, swizzles: [
    0,
    4,
    4,
    5
    /* ONE */
  ], flags: 64 | 32, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 64, mask: [0, 0, 0, 0] },
  [
    15
    /* R8_SRGB_PACK8 */
  ]: { blockSize: 1, blockExtent: [1, 1, 1], component: 1, swizzles: [
    0,
    4,
    4,
    5
    /* ONE */
  ], flags: 4 | 16 | 2 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 18, mask: [0, 0, 0, 0] },
  [
    16
    /* RG8_UNORM_PACK8 */
  ]: { blockSize: 2, blockExtent: [1, 1, 1], component: 2, swizzles: [
    0,
    1,
    4,
    5
    /* ONE */
  ], flags: 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 49, mask: [16711680, 65280, 0, 0] },
  [
    17
    /* RG8_SNORM_PACK8 */
  ]: { blockSize: 2, blockExtent: [1, 1, 1], component: 2, swizzles: [
    0,
    1,
    4,
    5
    /* ONE */
  ], flags: 4 | 32, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 51, mask: [0, 0, 0, 0] },
  [
    18
    /* RG8_USCALED_PACK8 */
  ]: { blockSize: 2, blockExtent: [1, 1, 1], component: 2, swizzles: [
    0,
    1,
    4,
    5
    /* ONE */
  ], flags: 8 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 22, mask: [16711680, 65280, 0, 0] },
  [
    19
    /* RG8_SSCALED_PACK8 */
  ]: { blockSize: 2, blockExtent: [1, 1, 1], component: 2, swizzles: [
    0,
    1,
    4,
    5
    /* ONE */
  ], flags: 8 | 32 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 23, mask: [0, 0, 0, 0] },
  [
    20
    /* RG8_UINT_PACK8 */
  ]: { blockSize: 2, blockExtent: [1, 1, 1], component: 2, swizzles: [
    0,
    1,
    4,
    5
    /* ONE */
  ], flags: 64 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 50, mask: [0, 0, 0, 0] },
  [
    21
    /* RG8_SINT_PACK8 */
  ]: { blockSize: 2, blockExtent: [1, 1, 1], component: 2, swizzles: [
    0,
    1,
    4,
    5
    /* ONE */
  ], flags: 64 | 32, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 52, mask: [0, 0, 0, 0] },
  [
    22
    /* RG8_SRGB_PACK8 */
  ]: { blockSize: 2, blockExtent: [1, 1, 1], component: 2, swizzles: [
    0,
    1,
    4,
    5
    /* ONE */
  ], flags: 4 | 32 | 2 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 21, mask: [0, 0, 0, 0] },
  [
    23
    /* RGB8_UNORM_PACK8 */
  ]: { blockSize: 3, blockExtent: [1, 1, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 4 | 16 | 32768, ddPixelFormat: 64, d3dFormat: 826887239, dxgiFormat: 24, mask: [255, 65280, 16711680, 0] },
  [
    24
    /* RGB8_SNORM_PACK8 */
  ]: { blockSize: 3, blockExtent: [1, 1, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 4 | 32 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 25, mask: [0, 0, 0, 0] },
  [
    25
    /* RGB8_USCALED_PACK8 */
  ]: { blockSize: 3, blockExtent: [1, 1, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 8 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 26, mask: [0, 0, 0, 0] },
  [
    26
    /* RGB8_SSCALED_PACK8 */
  ]: { blockSize: 3, blockExtent: [1, 1, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 8 | 32 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 27, mask: [0, 0, 0, 0] },
  [
    27
    /* RGB8_UINT_PACK8 */
  ]: { blockSize: 3, blockExtent: [1, 1, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 64 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 28, mask: [0, 0, 0, 0] },
  [
    28
    /* RGB8_SINT_PACK8 */
  ]: { blockSize: 3, blockExtent: [1, 1, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 64 | 32 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 29, mask: [0, 0, 0, 0] },
  [
    29
    /* RGB8_SRGB_PACK8 */
  ]: { blockSize: 3, blockExtent: [1, 1, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 4 | 16 | 2 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 30, mask: [0, 0, 0, 0] },
  [
    30
    /* BGR8_UNORM_PACK8 */
  ]: { blockSize: 3, blockExtent: [1, 1, 1], component: 3, swizzles: [
    2,
    1,
    0,
    5
    /* ONE */
  ], flags: 4 | 16 | 1024, ddPixelFormat: 64, d3dFormat: 20, dxgiFormat: 31, mask: [16711680, 65280, 255, 0] },
  [
    31
    /* BGR8_SNORM_PACK8 */
  ]: { blockSize: 3, blockExtent: [1, 1, 1], component: 3, swizzles: [
    2,
    1,
    0,
    5
    /* ONE */
  ], flags: 4 | 32 | 1024 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 32, mask: [0, 0, 0, 0] },
  [
    32
    /* BGR8_USCALED_PACK8 */
  ]: { blockSize: 3, blockExtent: [1, 1, 1], component: 3, swizzles: [
    2,
    1,
    0,
    5
    /* ONE */
  ], flags: 8 | 16 | 1024 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 33, mask: [0, 0, 0, 0] },
  [
    33
    /* BGR8_SSCALED_PACK8 */
  ]: { blockSize: 3, blockExtent: [1, 1, 1], component: 3, swizzles: [
    2,
    1,
    0,
    5
    /* ONE */
  ], flags: 8 | 32 | 1024 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 34, mask: [0, 0, 0, 0] },
  [
    34
    /* BGR8_UINT_PACK8 */
  ]: { blockSize: 3, blockExtent: [1, 1, 1], component: 3, swizzles: [
    2,
    1,
    0,
    5
    /* ONE */
  ], flags: 64 | 16 | 1024 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 35, mask: [0, 0, 0, 0] },
  [
    35
    /* BGR8_SINT_PACK8 */
  ]: { blockSize: 3, blockExtent: [1, 1, 1], component: 3, swizzles: [
    2,
    1,
    0,
    5
    /* ONE */
  ], flags: 64 | 32 | 1024 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 36, mask: [0, 0, 0, 0] },
  [
    36
    /* BGR8_SRGB_PACK8 */
  ]: { blockSize: 3, blockExtent: [1, 1, 1], component: 3, swizzles: [
    2,
    1,
    0,
    5
    /* ONE */
  ], flags: 4 | 16 | 2 | 1024 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 37, mask: [0, 0, 0, 0] },
  [
    37
    /* RGBA8_UNORM_PACK8 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 28, mask: [255, 65280, 16711680, 4278190080] },
  [
    38
    /* RGBA8_SNORM_PACK8 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 4 | 32, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 31, mask: [0, 0, 0, 0] },
  [
    39
    /* RGBA8_USCALED_PACK8 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 8 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 38, mask: [0, 0, 0, 0] },
  [
    40
    /* RGBA8_SSCALED_PACK8 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 8 | 32 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 39, mask: [0, 0, 0, 0] },
  [
    41
    /* RGBA8_UINT_PACK8 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 64 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 30, mask: [0, 0, 0, 0] },
  [
    42
    /* RGBA8_SINT_PACK8 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 64 | 32, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 32, mask: [0, 0, 0, 0] },
  [
    43
    /* RGBA8_SRGB_PACK8 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 4 | 16 | 2, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 29, mask: [0, 0, 0, 0] },
  [
    44
    /* BGRA8_UNORM_PACK8 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    2,
    1,
    0,
    3
    /* ALPHA */
  ], flags: 4 | 16 | 1024, ddPixelFormat: 66, d3dFormat: 21, dxgiFormat: 87, mask: [16711680, 65280, 255, 4278190080] },
  [
    45
    /* BGRA8_SNORM_PACK8 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    2,
    1,
    0,
    3
    /* ALPHA */
  ], flags: 4 | 32 | 1024 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 40, mask: [0, 0, 0, 0] },
  [
    46
    /* BGRA8_USCALED_PACK8 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    2,
    1,
    0,
    3
    /* ALPHA */
  ], flags: 8 | 16 | 1024 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 41, mask: [0, 0, 0, 0] },
  [
    47
    /* BGRA8_SSCALED_PACK8 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    2,
    1,
    0,
    3
    /* ALPHA */
  ], flags: 8 | 32 | 1024 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 42, mask: [0, 0, 0, 0] },
  [
    48
    /* BGRA8_UINT_PACK8 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    2,
    1,
    0,
    3
    /* ALPHA */
  ], flags: 64 | 16 | 1024 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 43, mask: [0, 0, 0, 0] },
  [
    49
    /* BGRA8_SINT_PACK8 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    2,
    1,
    0,
    3
    /* ALPHA */
  ], flags: 64 | 32 | 1024 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 44, mask: [0, 0, 0, 0] },
  [
    50
    /* BGRA8_SRGB_PACK8 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    2,
    1,
    0,
    3
    /* ALPHA */
  ], flags: 4 | 16 | 2 | 1024, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 91, mask: [16711680, 65280, 255, 4278190080] },
  [
    51
    /* RGBA8_UNORM_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    2,
    1,
    0,
    3
    /* ALPHA */
  ], flags: 4 | 16 | 1024 | 16384 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 45, mask: [16711680, 65280, 255, 4278190080] },
  [
    52
    /* RGBA8_SNORM_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    2,
    1,
    0,
    3
    /* ALPHA */
  ], flags: 4 | 32 | 1024 | 16384 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 46, mask: [0, 0, 0, 0] },
  [
    53
    /* RGBA8_USCALED_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    2,
    1,
    0,
    3
    /* ALPHA */
  ], flags: 8 | 16 | 1024 | 16384 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 47, mask: [0, 0, 0, 0] },
  [
    54
    /* RGBA8_SSCALED_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    2,
    1,
    0,
    3
    /* ALPHA */
  ], flags: 8 | 32 | 1024 | 16384 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 48, mask: [0, 0, 0, 0] },
  [
    55
    /* RGBA8_UINT_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    2,
    1,
    0,
    3
    /* ALPHA */
  ], flags: 64 | 16 | 1024 | 16384 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 49, mask: [0, 0, 0, 0] },
  [
    56
    /* RGBA8_SINT_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    2,
    1,
    0,
    3
    /* ALPHA */
  ], flags: 64 | 32 | 1024 | 16384 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 50, mask: [0, 0, 0, 0] },
  [
    57
    /* RGBA8_SRGB_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    2,
    1,
    0,
    3
    /* ALPHA */
  ], flags: 4 | 16 | 2 | 1024 | 16384 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 51, mask: [16711680, 65280, 255, 4278190080] },
  [
    58
    /* RGB10A2_UNORM_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 4 | 16 | 16384, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 24, mask: [1023, 1047552, 1072693248, 3221225472] },
  [
    59
    /* RGB10A2_SNORM_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 4 | 32 | 16384 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 52, mask: [1023, 1047552, 1072693248, 3221225472] },
  [
    60
    /* RGB10A2_USCALED_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 8 | 16 | 16384 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 53, mask: [1023, 1047552, 1072693248, 3221225472] },
  [
    61
    /* RGB10A2_SSCALED_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 8 | 32 | 16384 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 54, mask: [1023, 1047552, 1072693248, 3221225472] },
  [
    62
    /* RGB10A2_UINT_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 64 | 16 | 16384, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 25, mask: [1023, 1047552, 1072693248, 3221225472] },
  [
    63
    /* RGB10A2_SINT_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 64 | 32 | 16384 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 55, mask: [1023, 1047552, 1072693248, 3221225472] },
  [
    64
    /* BGR10A2_UNORM_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    2,
    1,
    0,
    5
    /* ONE */
  ], flags: 4 | 16 | 16384 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 56, mask: [1072693248, 1047552, 1023, 3221225472] },
  [
    65
    /* BGR10A2_SNORM_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    2,
    1,
    0,
    5
    /* ONE */
  ], flags: 4 | 32 | 16384 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 57, mask: [1072693248, 1047552, 1023, 3221225472] },
  [
    66
    /* BGR10A2_USCALED_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    2,
    1,
    0,
    5
    /* ONE */
  ], flags: 8 | 16 | 16384 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 58, mask: [1072693248, 1047552, 1023, 3221225472] },
  [
    67
    /* BGR10A2_SSCALED_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    2,
    1,
    0,
    5
    /* ONE */
  ], flags: 8 | 32 | 16384 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 59, mask: [1072693248, 1047552, 1023, 3221225472] },
  [
    68
    /* BGR10A2_UINT_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    2,
    1,
    0,
    5
    /* ONE */
  ], flags: 64 | 16 | 16384 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 60, mask: [1072693248, 1047552, 1023, 3221225472] },
  [
    69
    /* BGR10A2_SINT_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 4, swizzles: [
    2,
    1,
    0,
    5
    /* ONE */
  ], flags: 64 | 32 | 16384 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 61, mask: [1072693248, 1047552, 1023, 3221225472] },
  [
    70
    /* R16_UNORM_PACK16 */
  ]: { blockSize: 2, blockExtent: [1, 1, 1], component: 1, swizzles: [
    0,
    4,
    4,
    5
    /* ONE */
  ], flags: 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 56, mask: [65535, 0, 0, 0] },
  [
    71
    /* R16_SNORM_PACK16 */
  ]: { blockSize: 2, blockExtent: [1, 1, 1], component: 1, swizzles: [
    0,
    4,
    4,
    5
    /* ONE */
  ], flags: 4 | 32, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 58, mask: [65535, 0, 0, 0] },
  [
    72
    /* R16_USCALED_PACK16 */
  ]: { blockSize: 2, blockExtent: [1, 1, 1], component: 1, swizzles: [
    0,
    4,
    4,
    5
    /* ONE */
  ], flags: 8 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 62, mask: [65535, 0, 0, 0] },
  [
    73
    /* R16_SSCALED_PACK16 */
  ]: { blockSize: 2, blockExtent: [1, 1, 1], component: 1, swizzles: [
    0,
    4,
    4,
    5
    /* ONE */
  ], flags: 8 | 32 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 63, mask: [65535, 0, 0, 0] },
  [
    74
    /* R16_UINT_PACK16 */
  ]: { blockSize: 2, blockExtent: [1, 1, 1], component: 1, swizzles: [
    0,
    4,
    4,
    5
    /* ONE */
  ], flags: 64 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 57, mask: [65535, 0, 0, 0] },
  [
    75
    /* R16_SINT_PACK16 */
  ]: { blockSize: 2, blockExtent: [1, 1, 1], component: 1, swizzles: [
    0,
    4,
    4,
    5
    /* ONE */
  ], flags: 64 | 32, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 59, mask: [65535, 0, 0, 0] },
  [
    76
    /* R16_SFLOAT_PACK16 */
  ]: { blockSize: 2, blockExtent: [1, 1, 1], component: 1, swizzles: [
    0,
    4,
    4,
    5
    /* ONE */
  ], flags: 128 | 32, ddPixelFormat: 4, d3dFormat: 111, dxgiFormat: 54, mask: [65535, 0, 0, 0] },
  [
    77
    /* RG16_UNORM_PACK16 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 2, swizzles: [
    0,
    1,
    4,
    5
    /* ONE */
  ], flags: 4 | 16, ddPixelFormat: 4, d3dFormat: 34, dxgiFormat: 35, mask: [65535, 4294901760, 0, 0] },
  [
    78
    /* RG16_SNORM_PACK16 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 2, swizzles: [
    0,
    1,
    4,
    5
    /* ONE */
  ], flags: 4 | 32, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 37, mask: [65535, 4294901760, 0, 0] },
  [
    79
    /* RG16_USCALED_PACK16 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 2, swizzles: [
    0,
    1,
    4,
    5
    /* ONE */
  ], flags: 8 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 64, mask: [65535, 4294901760, 0, 0] },
  [
    80
    /* RG16_SSCALED_PACK16 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 2, swizzles: [
    0,
    1,
    4,
    5
    /* ONE */
  ], flags: 8 | 32 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 65, mask: [65535, 4294901760, 0, 0] },
  [
    81
    /* RG16_UINT_PACK16 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 2, swizzles: [
    0,
    1,
    4,
    5
    /* ONE */
  ], flags: 64 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 36, mask: [65535, 4294901760, 0, 0] },
  [
    82
    /* RG16_SINT_PACK16 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 2, swizzles: [
    0,
    1,
    4,
    5
    /* ONE */
  ], flags: 64 | 32, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 38, mask: [65535, 4294901760, 0, 0] },
  [
    83
    /* RG16_SFLOAT_PACK16 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 2, swizzles: [
    0,
    1,
    4,
    5
    /* ONE */
  ], flags: 128 | 32, ddPixelFormat: 4, d3dFormat: 112, dxgiFormat: 34, mask: [65535, 4294901760, 0, 0] },
  [
    84
    /* RGB16_UNORM_PACK16 */
  ]: { blockSize: 6, blockExtent: [1, 1, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 66, mask: [0, 0, 0, 0] },
  [
    85
    /* RGB16_SNORM_PACK16 */
  ]: { blockSize: 6, blockExtent: [1, 1, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 4 | 32 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 67, mask: [0, 0, 0, 0] },
  [
    86
    /* RGB16_USCALED_PACK16 */
  ]: { blockSize: 6, blockExtent: [1, 1, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 8 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 68, mask: [0, 0, 0, 0] },
  [
    87
    /* RGB16_SSCALED_PACK16 */
  ]: { blockSize: 6, blockExtent: [1, 1, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 8 | 32 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 69, mask: [0, 0, 0, 0] },
  [
    88
    /* RGB16_UINT_PACK16 */
  ]: { blockSize: 6, blockExtent: [1, 1, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 64 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 70, mask: [0, 0, 0, 0] },
  [
    89
    /* RGB16_SINT_PACK16 */
  ]: { blockSize: 6, blockExtent: [1, 1, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 64 | 32 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 71, mask: [0, 0, 0, 0] },
  [
    90
    /* RGB16_SFLOAT_PACK16 */
  ]: { blockSize: 6, blockExtent: [1, 1, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 128 | 32 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 72, mask: [0, 0, 0, 0] },
  [
    91
    /* RGBA16_UNORM_PACK16 */
  ]: { blockSize: 8, blockExtent: [1, 1, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 4 | 16, ddPixelFormat: 4, d3dFormat: 36, dxgiFormat: 11, mask: [0, 0, 0, 0] },
  [
    92
    /* RGBA16_SNORM_PACK16 */
  ]: { blockSize: 8, blockExtent: [1, 1, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 4 | 32, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 13, mask: [0, 0, 0, 0] },
  [
    93
    /* RGBA16_USCALED_PACK16 */
  ]: { blockSize: 8, blockExtent: [1, 1, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 8 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 73, mask: [0, 0, 0, 0] },
  [
    94
    /* RGBA16_SSCALED_PACK16 */
  ]: { blockSize: 8, blockExtent: [1, 1, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 8 | 32 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 74, mask: [0, 0, 0, 0] },
  [
    95
    /* RGBA16_UINT_PACK16 */
  ]: { blockSize: 8, blockExtent: [1, 1, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 64 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 12, mask: [0, 0, 0, 0] },
  [
    96
    /* RGBA16_SINT_PACK16 */
  ]: { blockSize: 8, blockExtent: [1, 1, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 64 | 32, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 14, mask: [0, 0, 0, 0] },
  [
    97
    /* RGBA16_SFLOAT_PACK16 */
  ]: { blockSize: 8, blockExtent: [1, 1, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 128 | 32, ddPixelFormat: 4, d3dFormat: 113, dxgiFormat: 10, mask: [0, 0, 0, 0] },
  [
    98
    /* R32_UINT_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 1, swizzles: [
    0,
    4,
    4,
    5
    /* ONE */
  ], flags: 64 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 42, mask: [0, 0, 0, 0] },
  [
    99
    /* R32_SINT_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 1, swizzles: [
    0,
    4,
    4,
    5
    /* ONE */
  ], flags: 64 | 32, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 43, mask: [0, 0, 0, 0] },
  [
    100
    /* R32_SFLOAT_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 1, swizzles: [
    0,
    4,
    4,
    5
    /* ONE */
  ], flags: 128 | 32, ddPixelFormat: 4, d3dFormat: 114, dxgiFormat: 41, mask: [4294967295, 0, 0, 0] },
  [
    101
    /* RG32_UINT_PACK32 */
  ]: { blockSize: 8, blockExtent: [1, 1, 1], component: 2, swizzles: [
    0,
    1,
    4,
    5
    /* ONE */
  ], flags: 64 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 17, mask: [0, 0, 0, 0] },
  [
    102
    /* RG32_SINT_PACK32 */
  ]: { blockSize: 8, blockExtent: [1, 1, 1], component: 2, swizzles: [
    0,
    1,
    4,
    5
    /* ONE */
  ], flags: 64 | 32, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 18, mask: [0, 0, 0, 0] },
  [
    103
    /* RG32_SFLOAT_PACK32 */
  ]: { blockSize: 8, blockExtent: [1, 1, 1], component: 2, swizzles: [
    0,
    1,
    4,
    5
    /* ONE */
  ], flags: 128 | 32, ddPixelFormat: 4, d3dFormat: 115, dxgiFormat: 16, mask: [0, 0, 0, 0] },
  [
    104
    /* RGB32_UINT_PACK32 */
  ]: { blockSize: 12, blockExtent: [1, 1, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 64 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 7, mask: [0, 0, 0, 0] },
  [
    105
    /* RGB32_SINT_PACK32 */
  ]: { blockSize: 12, blockExtent: [1, 1, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 64 | 32, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 8, mask: [0, 0, 0, 0] },
  [
    106
    /* RGB32_SFLOAT_PACK32 */
  ]: { blockSize: 12, blockExtent: [1, 1, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 128 | 32, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 6, mask: [0, 0, 0, 0] },
  [
    107
    /* RGBA32_UINT_PACK32 */
  ]: { blockSize: 16, blockExtent: [1, 1, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 64 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 3, mask: [0, 0, 0, 0] },
  [
    108
    /* RGBA32_SINT_PACK32 */
  ]: { blockSize: 16, blockExtent: [1, 1, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 64 | 32 | 32768, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 4, mask: [0, 0, 0, 0] },
  [
    109
    /* RGBA32_SFLOAT_PACK32 */
  ]: { blockSize: 16, blockExtent: [1, 1, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 128 | 32 | 32768, ddPixelFormat: 4, d3dFormat: 116, dxgiFormat: 2, mask: [0, 0, 0, 0] },
  [
    110
    /* R64_UINT_PACK64 */
  ]: { blockSize: 8, blockExtent: [1, 1, 1], component: 1, swizzles: [
    0,
    4,
    4,
    5
    /* ONE */
  ], flags: 64 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 1, mask: [0, 0, 0, 0] },
  [
    111
    /* R64_SINT_PACK64 */
  ]: { blockSize: 8, blockExtent: [1, 1, 1], component: 1, swizzles: [
    0,
    4,
    4,
    5
    /* ONE */
  ], flags: 64 | 32 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 2, mask: [0, 0, 0, 0] },
  [
    112
    /* R64_SFLOAT_PACK64 */
  ]: { blockSize: 8, blockExtent: [1, 1, 1], component: 1, swizzles: [
    0,
    4,
    4,
    5
    /* ONE */
  ], flags: 128 | 32 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 3, mask: [0, 0, 0, 0] },
  [
    113
    /* RG64_UINT_PACK64 */
  ]: { blockSize: 16, blockExtent: [1, 1, 1], component: 2, swizzles: [
    0,
    1,
    4,
    5
    /* ONE */
  ], flags: 64 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 4, mask: [0, 0, 0, 0] },
  [
    114
    /* RG64_SINT_PACK64 */
  ]: { blockSize: 16, blockExtent: [1, 1, 1], component: 2, swizzles: [
    0,
    1,
    4,
    5
    /* ONE */
  ], flags: 64 | 32 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 5, mask: [0, 0, 0, 0] },
  [
    115
    /* RG64_SFLOAT_PACK64 */
  ]: { blockSize: 16, blockExtent: [1, 1, 1], component: 2, swizzles: [
    0,
    1,
    4,
    5
    /* ONE */
  ], flags: 128 | 32 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 6, mask: [0, 0, 0, 0] },
  [
    116
    /* RGB64_UINT_PACK64 */
  ]: { blockSize: 24, blockExtent: [1, 1, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 64 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 7, mask: [0, 0, 0, 0] },
  [
    117
    /* RGB64_SINT_PACK64 */
  ]: { blockSize: 24, blockExtent: [1, 1, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 64 | 32 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 8, mask: [0, 0, 0, 0] },
  [
    118
    /* RGB64_SFLOAT_PACK64 */
  ]: { blockSize: 24, blockExtent: [1, 1, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 128 | 32 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 9, mask: [0, 0, 0, 0] },
  [
    119
    /* RGBA64_UINT_PACK64 */
  ]: { blockSize: 32, blockExtent: [1, 1, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 64 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 10, mask: [0, 0, 0, 0] },
  [
    120
    /* RGBA64_SINT_PACK64 */
  ]: { blockSize: 32, blockExtent: [1, 1, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 64 | 32 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 11, mask: [0, 0, 0, 0] },
  [
    121
    /* RGBA64_SFLOAT_PACK64 */
  ]: { blockSize: 32, blockExtent: [1, 1, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 128 | 32 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 12, mask: [0, 0, 0, 0] },
  [
    122
    /* RG11B10_UFLOAT_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 16384 | 128 | 32, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 26, mask: [0, 0, 0, 0] },
  [
    123
    /* RGB9E5_UFLOAT_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 16384 | 128 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 67, mask: [0, 0, 0, 0] },
  [
    124
    /* D16_UNORM_PACK16 */
  ]: { blockSize: 2, blockExtent: [1, 1, 1], component: 1, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 256 | 64, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 55, mask: [0, 0, 0, 0] },
  [
    125
    /* D24_UNORM_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 1, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 256 | 64 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 77, mask: [0, 0, 0, 0] },
  [
    126
    /* D32_SFLOAT_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 1, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 256 | 128, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 40, mask: [0, 0, 0, 0] },
  [
    127
    /* S8_UINT_PACK8 */
  ]: { blockSize: 1, blockExtent: [1, 1, 1], component: 1, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 256 | 512 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 75, mask: [0, 0, 0, 0] },
  [
    128
    /* D16_UNORM_S8_UINT_PACK32 */
  ]: { blockSize: 3, blockExtent: [1, 1, 1], component: 2, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 256 | 64 | 512 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 76, mask: [0, 0, 0, 0] },
  [
    129
    /* D24_UNORM_S8_UINT_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 2, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 256 | 64 | 512, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 45, mask: [0, 0, 0, 0] },
  [
    130
    /* D32_SFLOAT_S8_UINT_PACK64 */
  ]: { blockSize: 5, blockExtent: [1, 1, 1], component: 2, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 256 | 128 | 512, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 20, mask: [0, 0, 0, 0] },
  [
    131
    /* RGB_DXT1_UNORM_BLOCK8 */
  ]: { blockSize: 8, blockExtent: [4, 4, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 1 | 65536 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 85, mask: [0, 0, 0, 0] },
  [
    132
    /* RGB_DXT1_SRGB_BLOCK8 */
  ]: { blockSize: 8, blockExtent: [4, 4, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 1 | 65536 | 2 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 86, mask: [0, 0, 0, 0] },
  [
    133
    /* RGBA_DXT1_UNORM_BLOCK8 */
  ]: { blockSize: 8, blockExtent: [4, 4, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 65536 | 4 | 16, ddPixelFormat: 4, d3dFormat: 827611204, dxgiFormat: 71, mask: [0, 0, 0, 0] },
  [
    134
    /* RGBA_DXT1_SRGB_BLOCK8 */
  ]: { blockSize: 8, blockExtent: [4, 4, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 65536 | 2 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 72, mask: [0, 0, 0, 0] },
  [
    135
    /* RGBA_DXT3_UNORM_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [4, 4, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 65536 | 4 | 16, ddPixelFormat: 4, d3dFormat: 861165636, dxgiFormat: 74, mask: [0, 0, 0, 0] },
  [
    136
    /* RGBA_DXT3_SRGB_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [4, 4, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 65536 | 2 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 75, mask: [0, 0, 0, 0] },
  [
    137
    /* RGBA_DXT5_UNORM_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [4, 4, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 65536 | 4 | 16, ddPixelFormat: 4, d3dFormat: 894720068, dxgiFormat: 77, mask: [0, 0, 0, 0] },
  [
    138
    /* RGBA_DXT5_SRGB_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [4, 4, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 65536 | 2 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 78, mask: [0, 0, 0, 0] },
  [
    139
    /* R_ATI1N_UNORM_BLOCK8 */
  ]: { blockSize: 8, blockExtent: [4, 4, 1], component: 1, swizzles: [
    0,
    4,
    4,
    5
    /* ONE */
  ], flags: 1 | 65536 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826889281, dxgiFormat: 80, mask: [0, 0, 0, 0] },
  [
    140
    /* R_ATI1N_SNORM_BLOCK8 */
  ]: { blockSize: 8, blockExtent: [4, 4, 1], component: 1, swizzles: [
    0,
    4,
    4,
    5
    /* ONE */
  ], flags: 1 | 65536 | 4 | 32 | 32768, ddPixelFormat: 4, d3dFormat: 1311855681, dxgiFormat: 81, mask: [0, 0, 0, 0] },
  [
    141
    /* RG_ATI2N_UNORM_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [4, 4, 1], component: 2, swizzles: [
    0,
    1,
    4,
    5
    /* ONE */
  ], flags: 1 | 65536 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 843666497, dxgiFormat: 83, mask: [0, 0, 0, 0] },
  [
    142
    /* RG_ATI2N_SNORM_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [4, 4, 1], component: 2, swizzles: [
    0,
    1,
    4,
    5
    /* ONE */
  ], flags: 1 | 65536 | 4 | 32 | 32768, ddPixelFormat: 4, d3dFormat: 1311921217, dxgiFormat: 84, mask: [0, 0, 0, 0] },
  [
    143
    /* RGB_BP_UFLOAT_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [4, 4, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 1 | 128 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 95, mask: [0, 0, 0, 0] },
  [
    144
    /* RGB_BP_SFLOAT_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [4, 4, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 1 | 128 | 32, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 96, mask: [0, 0, 0, 0] },
  [
    145
    /* RGBA_BP_UNORM_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [4, 4, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 98, mask: [0, 0, 0, 0] },
  [
    146
    /* RGBA_BP_SRGB_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [4, 4, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 2 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 99, mask: [0, 0, 0, 0] },
  [
    147
    /* RGB_ETC2_UNORM_BLOCK8 */
  ]: { blockSize: 8, blockExtent: [4, 4, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 1 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 87, mask: [0, 0, 0, 0] },
  [
    148
    /* RGB_ETC2_SRGB_BLOCK8 */
  ]: { blockSize: 8, blockExtent: [4, 4, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 1 | 2 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 88, mask: [0, 0, 0, 0] },
  [
    149
    /* RGBA_ETC2_UNORM_BLOCK8 */
  ]: { blockSize: 8, blockExtent: [4, 4, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 89, mask: [0, 0, 0, 0] },
  [
    150
    /* RGBA_ETC2_SRGB_BLOCK8 */
  ]: { blockSize: 8, blockExtent: [4, 4, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 2 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 90, mask: [0, 0, 0, 0] },
  [
    151
    /* RGBA_ETC2_UNORM_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [4, 4, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 91, mask: [0, 0, 0, 0] },
  [
    152
    /* RGBA_ETC2_SRGB_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [4, 4, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 2 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 92, mask: [0, 0, 0, 0] },
  [
    153
    /* R_EAC_UNORM_BLOCK8 */
  ]: { blockSize: 8, blockExtent: [4, 4, 1], component: 1, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 1 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 93, mask: [0, 0, 0, 0] },
  [
    154
    /* R_EAC_SNORM_BLOCK8 */
  ]: { blockSize: 8, blockExtent: [4, 4, 1], component: 1, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 1 | 4 | 32 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 94, mask: [0, 0, 0, 0] },
  [
    155
    /* RG_EAC_UNORM_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [4, 4, 1], component: 2, swizzles: [
    0,
    1,
    4,
    5
    /* ONE */
  ], flags: 1 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 95, mask: [0, 0, 0, 0] },
  [
    156
    /* RG_EAC_SNORM_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [4, 4, 1], component: 2, swizzles: [
    0,
    1,
    4,
    5
    /* ONE */
  ], flags: 1 | 4 | 32 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 96, mask: [0, 0, 0, 0] },
  [
    157
    /* RGBA_ASTC_4X4_UNORM_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [4, 4, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 134, mask: [0, 0, 0, 0] },
  [
    158
    /* RGBA_ASTC_4X4_SRGB_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [4, 4, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 2 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 135, mask: [0, 0, 0, 0] },
  [
    159
    /* RGBA_ASTC_5X4_UNORM_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [5, 4, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 138, mask: [0, 0, 0, 0] },
  [
    160
    /* RGBA_ASTC_5X4_SRGB_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [5, 4, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 2 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 139, mask: [0, 0, 0, 0] },
  [
    161
    /* RGBA_ASTC_5X5_UNORM_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [5, 5, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 142, mask: [0, 0, 0, 0] },
  [
    162
    /* RGBA_ASTC_5X5_SRGB_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [5, 5, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 2 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 143, mask: [0, 0, 0, 0] },
  [
    163
    /* RGBA_ASTC_6X5_UNORM_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [6, 5, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 146, mask: [0, 0, 0, 0] },
  [
    164
    /* RGBA_ASTC_6X5_SRGB_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [6, 5, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 2 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 147, mask: [0, 0, 0, 0] },
  [
    165
    /* RGBA_ASTC_6X6_UNORM_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [6, 6, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 150, mask: [0, 0, 0, 0] },
  [
    166
    /* RGBA_ASTC_6X6_SRGB_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [6, 6, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 2 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 151, mask: [0, 0, 0, 0] },
  [
    167
    /* RGBA_ASTC_8X5_UNORM_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [8, 5, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 154, mask: [0, 0, 0, 0] },
  [
    168
    /* RGBA_ASTC_8X5_SRGB_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [8, 5, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 2 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 155, mask: [0, 0, 0, 0] },
  [
    169
    /* RGBA_ASTC_8X6_UNORM_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [8, 6, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 158, mask: [0, 0, 0, 0] },
  [
    170
    /* RGBA_ASTC_8X6_SRGB_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [8, 6, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 2 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 159, mask: [0, 0, 0, 0] },
  [
    171
    /* RGBA_ASTC_8X8_UNORM_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [8, 8, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 162, mask: [0, 0, 0, 0] },
  [
    172
    /* RGBA_ASTC_8X8_SRGB_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [8, 8, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 2 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 163, mask: [0, 0, 0, 0] },
  [
    173
    /* RGBA_ASTC_10X5_UNORM_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [10, 5, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 166, mask: [0, 0, 0, 0] },
  [
    174
    /* RGBA_ASTC_10X5_SRGB_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [10, 5, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 2 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 167, mask: [0, 0, 0, 0] },
  [
    175
    /* RGBA_ASTC_10X6_UNORM_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [10, 6, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 170, mask: [0, 0, 0, 0] },
  [
    176
    /* RGBA_ASTC_10X6_SRGB_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [10, 6, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 2 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 171, mask: [0, 0, 0, 0] },
  [
    177
    /* RGBA_ASTC_10X8_UNORM_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [10, 8, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 174, mask: [0, 0, 0, 0] },
  [
    178
    /* RGBA_ASTC_10X8_SRGB_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [10, 8, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 2 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 175, mask: [0, 0, 0, 0] },
  [
    179
    /* RGBA_ASTC_10X10_UNORM_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [10, 10, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 179, mask: [0, 0, 0, 0] },
  [
    180
    /* RGBA_ASTC_10X10_SRGB_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [10, 10, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 2 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 178, mask: [0, 0, 0, 0] },
  [
    181
    /* RGBA_ASTC_12X10_UNORM_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [12, 10, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 182, mask: [0, 0, 0, 0] },
  [
    182
    /* RGBA_ASTC_12X10_SRGB_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [12, 10, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 2 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 183, mask: [0, 0, 0, 0] },
  [
    183
    /* RGBA_ASTC_12X12_UNORM_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [12, 12, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 186, mask: [0, 0, 0, 0] },
  [
    184
    /* RGBA_ASTC_12X12_SRGB_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [12, 12, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 2 | 4 | 16, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 187, mask: [0, 0, 0, 0] },
  [
    185
    /* RGB_PVRTC1_8X8_UNORM_BLOCK32 */
  ]: { blockSize: 32, blockExtent: [8, 8, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 1 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 876827728, dxgiFormat: 97, mask: [0, 0, 0, 0] },
  [
    186
    /* RGB_PVRTC1_8X8_SRGB_BLOCK32 */
  ]: { blockSize: 32, blockExtent: [8, 8, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 1 | 2 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 98, mask: [0, 0, 0, 0] },
  [
    187
    /* RGB_PVRTC1_16X8_UNORM_BLOCK32 */
  ]: { blockSize: 32, blockExtent: [16, 8, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 1 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 843273296, dxgiFormat: 99, mask: [0, 0, 0, 0] },
  [
    188
    /* RGB_PVRTC1_16X8_SRGB_BLOCK32 */
  ]: { blockSize: 32, blockExtent: [16, 8, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 1 | 2 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 100, mask: [0, 0, 0, 0] },
  [
    189
    /* RGBA_PVRTC1_8X8_UNORM_BLOCK32 */
  ]: { blockSize: 32, blockExtent: [8, 8, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 101, mask: [0, 0, 0, 0] },
  [
    190
    /* RGBA_PVRTC1_8X8_SRGB_BLOCK32 */
  ]: { blockSize: 32, blockExtent: [8, 8, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 2 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 102, mask: [0, 0, 0, 0] },
  [
    191
    /* RGBA_PVRTC1_16X8_UNORM_BLOCK32 */
  ]: { blockSize: 32, blockExtent: [16, 8, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 103, mask: [0, 0, 0, 0] },
  [
    192
    /* RGBA_PVRTC1_16X8_SRGB_BLOCK32 */
  ]: { blockSize: 32, blockExtent: [16, 8, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 2 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 104, mask: [0, 0, 0, 0] },
  [
    193
    /* RGBA_PVRTC2_4X4_UNORM_BLOCK8 */
  ]: { blockSize: 8, blockExtent: [4, 4, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 105, mask: [0, 0, 0, 0] },
  [
    194
    /* RGBA_PVRTC2_4X4_SRGB_BLOCK8 */
  ]: { blockSize: 8, blockExtent: [4, 4, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 2 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 106, mask: [0, 0, 0, 0] },
  [
    195
    /* RGBA_PVRTC2_8X4_UNORM_BLOCK8 */
  ]: { blockSize: 8, blockExtent: [8, 4, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 107, mask: [0, 0, 0, 0] },
  [
    196
    /* RGBA_PVRTC2_8X4_SRGB_BLOCK8 */
  ]: { blockSize: 8, blockExtent: [8, 4, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 2 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 108, mask: [0, 0, 0, 0] },
  [
    197
    /* RGB_ETC_UNORM_BLOCK8 */
  ]: { blockSize: 8, blockExtent: [4, 4, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 1 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 541283397, dxgiFormat: 109, mask: [0, 0, 0, 0] },
  [
    198
    /* RGB_ATC_UNORM_BLOCK8 */
  ]: { blockSize: 8, blockExtent: [4, 4, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 1 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 541283393, dxgiFormat: 110, mask: [0, 0, 0, 0] },
  [
    199
    /* RGBA_ATCA_UNORM_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [4, 4, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 1094931521, dxgiFormat: 111, mask: [0, 0, 0, 0] },
  [
    200
    /* RGBA_ATCI_UNORM_BLOCK16 */
  ]: { blockSize: 16, blockExtent: [4, 4, 1], component: 4, swizzles: [
    0,
    1,
    2,
    3
    /* ALPHA */
  ], flags: 1 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 1229149249, dxgiFormat: 112, mask: [0, 0, 0, 0] },
  [
    201
    /* L8_UNORM_PACK8 */
  ]: { blockSize: 1, blockExtent: [1, 1, 1], component: 1, swizzles: [
    0,
    0,
    0,
    5
    /* ONE */
  ], flags: 4 | 16 | 2048 | 32768, ddPixelFormat: 131072, d3dFormat: 50, dxgiFormat: 78, mask: [255, 0, 0, 0] },
  [
    202
    /* A8_UNORM_PACK8 */
  ]: { blockSize: 1, blockExtent: [1, 1, 1], component: 1, swizzles: [
    4,
    4,
    4,
    0
    /* RED */
  ], flags: 4 | 16 | 2048 | 32768, ddPixelFormat: 2, d3dFormat: 28, dxgiFormat: 79, mask: [0, 0, 0, 255] },
  [
    203
    /* LA8_UNORM_PACK8 */
  ]: { blockSize: 2, blockExtent: [1, 1, 1], component: 2, swizzles: [
    0,
    0,
    0,
    1
    /* GREEN */
  ], flags: 4 | 16 | 2048 | 32768, ddPixelFormat: 131074, d3dFormat: 51, dxgiFormat: 80, mask: [255, 0, 0, 65280] },
  [
    204
    /* L16_UNORM_PACK16 */
  ]: { blockSize: 2, blockExtent: [1, 1, 1], component: 1, swizzles: [
    0,
    0,
    0,
    5
    /* ONE */
  ], flags: 4 | 16 | 2048 | 32768, ddPixelFormat: 131072, d3dFormat: 81, dxgiFormat: 81, mask: [65535, 0, 0, 0] },
  [
    205
    /* A16_UNORM_PACK16 */
  ]: { blockSize: 2, blockExtent: [1, 1, 1], component: 1, swizzles: [
    4,
    4,
    4,
    0
    /* RED */
  ], flags: 4 | 16 | 2048 | 32768, ddPixelFormat: 2, d3dFormat: 826887239, dxgiFormat: 82, mask: [0, 0, 0, 65535] },
  [
    206
    /* LA16_UNORM_PACK16 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 2, swizzles: [
    0,
    0,
    0,
    1
    /* GREEN */
  ], flags: 4 | 16 | 2048 | 32768, ddPixelFormat: 131074, d3dFormat: 826887239, dxgiFormat: 83, mask: [65535, 0, 0, 4294901760] },
  [
    207
    /* BGR8_UNORM_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 3, swizzles: [
    2,
    1,
    0,
    5
    /* ONE */
  ], flags: 4 | 16 | 1024, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 88, mask: [16711680, 65280, 255, 0] },
  [
    208
    /* BGR8_SRGB_PACK32 */
  ]: { blockSize: 4, blockExtent: [1, 1, 1], component: 3, swizzles: [
    2,
    1,
    0,
    5
    /* ONE */
  ], flags: 4 | 16 | 1024 | 2, ddPixelFormat: 4, d3dFormat: 808540228, dxgiFormat: 93, mask: [16711680, 65280, 255, 0] },
  [
    209
    /* RG3B2_UNORM_PACK8 */
  ]: { blockSize: 1, blockExtent: [1, 1, 1], component: 3, swizzles: [
    0,
    1,
    2,
    5
    /* ONE */
  ], flags: 4096 | 4 | 16 | 32768, ddPixelFormat: 4, d3dFormat: 826887239, dxgiFormat: 84, mask: [112, 56, 192, 0] }
};
((Format2) => {
  function info2(format2) {
    return formatInfos[format2];
  }
  Format2.info = info2;
  function find(fourCC, dxgiFormat) {
    for (let i = 1; i < 209; i++) {
      const info22 = formatInfos[i];
      if (dxgiFormat === void 0) {
        if (info22.d3dFormat === fourCC) return i;
      } else {
        if (fourCC === 826887239 && info22.flags & 32768 && info22.dxgiFormat === dxgiFormat) return i;
        if (fourCC === 808540228 && !(info22.flags & 32768) && info22.dxgiFormat === dxgiFormat) return i;
      }
    }
    return 0;
  }
  Format2.find = find;
  function isCompressed(format2) {
    return !!(formatInfos[format2].flags & 1);
  }
  Format2.isCompressed = isCompressed;
  function isS3tcCompressed(format2) {
    return format2 >= 131 && format2 <= 138;
  }
  Format2.isS3tcCompressed = isS3tcCompressed;
  function isSrgb(format2) {
    return !!(formatInfos[format2].flags & 2);
  }
  Format2.isSrgb = isSrgb;
  function blockSize(format2) {
    return formatInfos[format2].blockSize;
  }
  Format2.blockSize = blockSize;
  function blockExtent(format2) {
    return formatInfos[format2].blockExtent;
  }
  Format2.blockExtent = blockExtent;
  function componentCount(format2) {
    return formatInfos[format2].component;
  }
  Format2.componentCount = componentCount;
  function isUnsigned(format2) {
    return !!(formatInfos[format2].flags & 16);
  }
  Format2.isUnsigned = isUnsigned;
  function isSigned(format2) {
    return !!(formatInfos[format2].flags & 32);
  }
  Format2.isSigned = isSigned;
  function isInteger(format2) {
    return !!(formatInfos[format2].flags & 64);
  }
  Format2.isInteger = isInteger;
  function isSignedInteger(format2) {
    return isInteger(format2) && isSigned(format2);
  }
  Format2.isSignedInteger = isSignedInteger;
  function isUnsignedInteger(format2) {
    return isInteger(format2) && isUnsigned(format2);
  }
  Format2.isUnsignedInteger = isUnsignedInteger;
  function isFloat(format2) {
    return !!(formatInfos[format2].flags & 128);
  }
  Format2.isFloat = isFloat;
  function isNormalized(format2) {
    return !!(formatInfos[format2].flags & 4);
  }
  Format2.isNormalized = isNormalized;
  function isdUnorm(format2) {
    return isNormalized(format2) && isUnsigned(format2);
  }
  Format2.isdUnorm = isdUnorm;
  function isSnorm(format2) {
    return isNormalized(format2) && isSigned(format2);
  }
  Format2.isSnorm = isSnorm;
  function isPacked(format2) {
    const flags = formatInfos[format2].flags;
    return !!(flags & 4096 || flags & 8192 || flags & 16384);
  }
  Format2.isPacked = isPacked;
  function isDepth(format2) {
    return !!(formatInfos[format2].flags & 256);
  }
  Format2.isDepth = isDepth;
  function isStencil(format2) {
    return !!(formatInfos[format2].flags & 512);
  }
  Format2.isStencil = isStencil;
  function isDepthStencil(format2) {
    return isDepth(format2) && isStencil(format2);
  }
  Format2.isDepthStencil = isDepthStencil;
})(Format || (Format = {}));
class StorageLinear {
  constructor(format2, _extent, layers, faces, levels2) {
    __publicField(this, "blockSize");
    __publicField(this, "blockExtent");
    this.format = format2;
    this._extent = _extent;
    this.layers = layers;
    this.faces = faces;
    this.levels = levels2;
    this.blockSize = Format.blockSize(this.format);
    this.blockExtent = Format.blockExtent(this.format);
  }
  blockCount(level) {
    const e = this.extent(level);
    return [
      ceilMultiple(e[0], this.blockExtent[0]) / this.blockExtent[0],
      ceilMultiple(e[1], this.blockExtent[1]) / this.blockExtent[1],
      ceilMultiple(e[2], this.blockExtent[2]) / this.blockExtent[2]
    ];
  }
  extent(level) {
    return [
      Math.max(this._extent[0] >> level, 1),
      Math.max(this._extent[1] >> level, 1),
      Math.max(this._extent[2] >> level, 1)
    ];
  }
  levelSize(level) {
    const c = this.blockCount(level);
    return this.blockSize * c[0] * c[1] * c[2];
  }
  faceSize(baseLevel, maxLevel) {
    let size = 0;
    for (let level = baseLevel; level <= maxLevel; level++) {
      size += this.levelSize(level);
    }
    return size;
  }
  layerSize(baseFace, maxFace, baseLevel, maxLevel) {
    return this.faceSize(baseLevel, maxLevel) * (maxFace - baseFace + 1);
  }
  baseOffset(layer, face, level) {
    const layerSize = this.layerSize(0, this.faces - 1, 0, this.levels - 1);
    const faceSize = this.faceSize(0, this.levels - 1);
    let baseOffset = layerSize * layer + faceSize * face;
    for (let i = 0; i < level; i++) {
      baseOffset += this.levelSize(i);
    }
    return baseOffset;
  }
}
function ceilMultiple(value, multiple) {
  return Math.ceil(value / multiple) * multiple;
}
class Texture {
  constructor(target, format2, extent, layers, faces, levels2, swizzles = [Swizzle.RED, Swizzle.GREEN, Swizzle.BLUE, Swizzle.ALPHA]) {
    __publicField(this, "baseLayer");
    __publicField(this, "maxLayer");
    __publicField(this, "baseFace");
    __publicField(this, "maxFace");
    __publicField(this, "baseLevel");
    __publicField(this, "maxLevel");
    __publicField(this, "cache");
    __publicField(this, "data", new DataView(new ArrayBuffer(0)));
    this.target = target;
    this.format = format2;
    this.extent = extent;
    this.layers = layers;
    this.faces = faces;
    this.levels = levels2;
    this.swizzles = swizzles;
    this.baseLayer = 0;
    this.maxLayer = this.layers - 1;
    this.baseFace = 0;
    this.maxFace = this.faces - 1;
    this.baseLevel = 0;
    this.maxLevel = this.levels - 1;
    this.cache = new Cache(
      new StorageLinear(this.format, this.extent, this.layers, this.faces, this.levels),
      this.format,
      this.baseLayer,
      this.layers,
      this.baseFace,
      this.maxFace,
      this.baseLevel,
      this.maxLevel
    );
  }
  get size() {
    return this.cache.getMemorySize();
  }
  sizeOf(level) {
    return this.cache.getMemorySize(level);
  }
  extentOf(level) {
    return this.cache.getExtent(level);
  }
  dataOf(layer, face, level) {
    return new DataView(
      this.data.buffer,
      this.data.byteOffset + this.cache.getBaseAddress(layer, face, level),
      this.sizeOf(level)
    );
  }
}
var Target = /* @__PURE__ */ ((Target2) => {
  Target2[Target2["TARGET_1D"] = 0] = "TARGET_1D";
  Target2[
    Target2["TARGET_FIRST"] = 0
    /* TARGET_1D */
  ] = "TARGET_FIRST";
  Target2[Target2["TARGET_1D_ARRAY"] = 1] = "TARGET_1D_ARRAY";
  Target2[Target2["TARGET_2D"] = 2] = "TARGET_2D";
  Target2[Target2["TARGET_2D_ARRAY"] = 3] = "TARGET_2D_ARRAY";
  Target2[Target2["TARGET_3D"] = 4] = "TARGET_3D";
  Target2[Target2["TARGET_RECT"] = 5] = "TARGET_RECT";
  Target2[Target2["TARGET_RECT_ARRAY"] = 6] = "TARGET_RECT_ARRAY";
  Target2[Target2["TARGET_CUBE"] = 7] = "TARGET_CUBE";
  Target2[Target2["TARGET_CUBE_ARRAY"] = 8] = "TARGET_CUBE_ARRAY";
  Target2[
    Target2["TARGET_LAST"] = 8
    /* TARGET_CUBE_ARRAY */
  ] = "TARGET_LAST";
  return Target2;
})(Target || {});
function parseHeader(header) {
  const size = header.getUint32(4, true);
  const flags = header.getUint32(8, true);
  const height = header.getUint32(12, true);
  const width = header.getUint32(16, true);
  const pitch = header.getUint32(20, true);
  const depth = header.getUint32(24, true);
  const mipMapLevels = header.getUint32(28, true);
  const format2 = parsePixelFormat(header);
  const surfaceFlags = header.getUint32(108, true);
  const cubemapFlags = header.getUint32(112, true);
  return {
    size,
    flags,
    height,
    width,
    pitch,
    depth,
    mipMapLevels,
    format: format2,
    surfaceFlags,
    cubemapFlags
  };
}
function parsePixelFormat(header) {
  const flags = header.getUint32(80, true);
  const fourCC = header.getUint32(84, true);
  const bpp = header.getUint32(88, true);
  const mask0 = header.getUint32(92, true);
  const mask1 = header.getUint32(96, true);
  const mask2 = header.getUint32(100, true);
  const mask3 = header.getUint32(104, true);
  return {
    flags,
    fourCC,
    bpp,
    mask: [mask0, mask1, mask2, mask3]
  };
}
function parseHeader10(header) {
  const format2 = header.getUint32(0, true);
  const resourceDimension = header.getUint32(4, true);
  const miscFlag = header.getUint32(8, true);
  const arraySize = header.getUint32(12, true);
  const alphaFlags = header.getUint32(16, true);
  return {
    format: format2,
    resourceDimension,
    miscFlag,
    arraySize,
    alphaFlags
  };
}
function parseTarget(header, header10) {
  if (header.cubemapFlags & 512 || header10.miscFlag & 4) {
    if (header10.arraySize > 1) {
      return 8;
    } else {
      return 7;
    }
  } else if (header10.arraySize > 1) {
    if (header.flags & 2) {
      return 3;
    } else {
      return 1;
    }
  } else if (header10.resourceDimension === 2) {
    return 0;
  } else if (header10.resourceDimension === 4 || header.flags & 8388608 || header.cubemapFlags & 2097152) {
    return 4;
  } else {
    return 2;
  }
}
const parseDDSDX10 = (data) => {
  const headerView = new DataView(data.buffer, data.byteOffset, 128);
  const magic = headerView.getUint32(0, true);
  if (magic !== 542327876) {
    throw new Error("Invalid DDS magic number");
  }
  const header = parseHeader(headerView);
  let offset = 128;
  let header10 = {
    format: 0,
    resourceDimension: 0,
    miscFlag: 0,
    arraySize: 0
  };
  if (header.format.flags & Ddpf.FOURCC && (header.format.fourCC === D3dFmt.DX10 || header.format.fourCC === D3dFmt.GLI1)) {
    header10 = parseHeader10(new DataView(data.buffer, offset, 20));
    offset += 20;
  }
  let format2 = Format.UNDEFINED;
  if (header.format.flags & (Ddpf.RGB | Ddpf.ALPHAPIXELS | Ddpf.ALPHA | Ddpf.YUV | Ddpf.LUMINANCE) && header.format.bpp > 0 && header.format.bpp < 64) {
    switch (header.format.bpp) {
      case 8:
        if (maskEquals(header.format.mask, Format.info(Format.RG4_UNORM_PACK8).mask)) {
          format2 = Format.RG4_UNORM_PACK8;
        } else if (maskEquals(header.format.mask, Format.info(Format.L8_UNORM_PACK8).mask)) {
          format2 = Format.L8_UNORM_PACK8;
        } else if (maskEquals(header.format.mask, Format.info(Format.A8_UNORM_PACK8).mask)) {
          format2 = Format.A8_UNORM_PACK8;
        } else if (maskEquals(header.format.mask, Format.info(Format.R8_UNORM_PACK8).mask)) {
          format2 = Format.R8_UNORM_PACK8;
        } else if (maskEquals(header.format.mask, Format.info(Format.RG3B2_UNORM_PACK8).mask)) {
          format2 = Format.RG3B2_UNORM_PACK8;
        } else {
          throw new Error("Unsupported DDS format");
        }
        break;
      case 16:
        if (maskEquals(header.format.mask, Format.info(Format.RGBA4_UNORM_PACK16).mask)) {
          format2 = Format.RGBA4_UNORM_PACK16;
        } else if (maskEquals(header.format.mask, Format.info(Format.BGRA4_UNORM_PACK16).mask)) {
          format2 = Format.BGRA4_UNORM_PACK16;
        } else if (maskEquals(header.format.mask, Format.info(Format.R5G6B5_UNORM_PACK16).mask)) {
          format2 = Format.R5G6B5_UNORM_PACK16;
        } else if (maskEquals(header.format.mask, Format.info(Format.B5G6R5_UNORM_PACK16).mask)) {
          format2 = Format.B5G6R5_UNORM_PACK16;
        } else if (maskEquals(header.format.mask, Format.info(Format.RGB5A1_UNORM_PACK16).mask)) {
          format2 = Format.RGB5A1_UNORM_PACK16;
        } else if (maskEquals(header.format.mask, Format.info(Format.BGR5A1_UNORM_PACK16).mask)) {
          format2 = Format.BGR5A1_UNORM_PACK16;
        } else if (maskEquals(header.format.mask, Format.info(Format.LA8_UNORM_PACK8).mask)) {
          format2 = Format.LA8_UNORM_PACK8;
        } else if (maskEquals(header.format.mask, Format.info(Format.RG8_UNORM_PACK8).mask)) {
          format2 = Format.RG8_UNORM_PACK8;
        } else if (maskEquals(header.format.mask, Format.info(Format.L16_UNORM_PACK16).mask)) {
          format2 = Format.L16_UNORM_PACK16;
        } else if (maskEquals(header.format.mask, Format.info(Format.A16_UNORM_PACK16).mask)) {
          format2 = Format.A16_UNORM_PACK16;
        } else if (maskEquals(header.format.mask, Format.info(Format.R16_UNORM_PACK16).mask)) {
          format2 = Format.R16_UNORM_PACK16;
        } else {
          throw new Error("Unsupported DDS format");
        }
        break;
      case 24:
        if (maskEquals(header.format.mask, Format.info(Format.RGB8_UNORM_PACK8).mask)) {
          format2 = Format.RGB8_UNORM_PACK8;
        } else if (maskEquals(header.format.mask, Format.info(Format.BGR8_UNORM_PACK8).mask)) {
          format2 = Format.BGR8_UNORM_PACK8;
        } else {
          throw new Error("Unsupported DDS format");
        }
        break;
      case 32:
        if (maskEquals(header.format.mask, Format.info(Format.BGR8_UNORM_PACK32).mask)) {
          format2 = Format.BGR8_UNORM_PACK32;
        } else if (maskEquals(header.format.mask, Format.info(Format.BGRA8_UNORM_PACK8).mask)) {
          format2 = Format.BGRA8_UNORM_PACK8;
        } else if (maskEquals(header.format.mask, Format.info(Format.RGBA8_UNORM_PACK8).mask)) {
          format2 = Format.RGBA8_UNORM_PACK8;
        } else if (maskEquals(header.format.mask, Format.info(Format.RGB10A2_UNORM_PACK32).mask)) {
          format2 = Format.RGB10A2_UNORM_PACK32;
        } else if (maskEquals(header.format.mask, Format.info(Format.LA16_UNORM_PACK16).mask)) {
          format2 = Format.LA16_UNORM_PACK16;
        } else if (maskEquals(header.format.mask, Format.info(Format.RG16_UNORM_PACK16).mask)) {
          format2 = Format.RG16_UNORM_PACK16;
        } else if (maskEquals(header.format.mask, Format.info(Format.R32_SFLOAT_PACK32).mask)) {
          format2 = Format.R32_SFLOAT_PACK32;
          throw new Error("Unsupported DDS format");
        }
        break;
      default:
        throw new Error("Unsupported DDS format");
    }
  } else if (header.format.flags & Ddpf.FOURCC && header.format.fourCC !== D3dFmt.DX10 && header.format.fourCC !== D3dFmt.GLI1) {
    let fourCC = header.format.fourCC;
    switch (header.format.fourCC) {
      case D3dFmt.BC4U:
        fourCC = D3dFmt.ATI1;
        break;
      case D3dFmt.BC4S:
        fourCC = D3dFmt.AT1N;
        break;
      case D3dFmt.BC5U:
        fourCC = D3dFmt.ATI2;
        break;
      case D3dFmt.BC5S:
        fourCC = D3dFmt.AT2N;
        break;
    }
    format2 = Format.find(fourCC);
  } else if (header10 && (header.format.fourCC === D3dFmt.DX10 || header.format.fourCC === D3dFmt.GLI1)) {
    format2 = Format.find(header.format.fourCC, header10.format);
  }
  const mipMapCount = header.flags & 131072 ? header.mipMapLevels : 1;
  let faceCount = 1;
  if (header.cubemapFlags & 512) {
    const countBits = (v) => {
      let n = v;
      let count = 0;
      while (n) {
        count += n & 1;
        n >>= 1;
      }
      return count;
    };
    faceCount = countBits(
      header.cubemapFlags & 64512
      /* ALLFACES */
    );
  } else if (header10.miscFlag & 4) {
    faceCount = 6;
  }
  let depthCount = 1;
  if (header.cubemapFlags & 2097152) {
    depthCount = header.depth;
  }
  const texture = new Texture(
    parseTarget(header, header10),
    format2,
    [header.width, header.height, depthCount],
    Math.max(header10.arraySize, 1),
    faceCount,
    mipMapCount
  );
  const sourceSize = offset + texture.size;
  if (data.byteLength !== sourceSize) {
    throw new Error(`Invalid DDS size: actual ${data.byteLength} !== expected ${sourceSize}`);
  }
  texture.data = new DataView(data.buffer, data.byteOffset + offset, texture.size);
  return texture;
};
function maskEquals(l, r) {
  return l[0] === r[0] && l[1] === r[1] && l[2] === r[2] && l[3] === r[3];
}
class Cache {
  constructor(storage, format2, baseLayer, layers, baseFace, maxFace, baseLevel, maxLevel) {
    __publicField(this, "faces");
    __publicField(this, "levels");
    __publicField(this, "baseAddresses");
    __publicField(this, "imageExtent");
    __publicField(this, "imageMemorySize");
    __publicField(this, "globalMemorySize");
    this.storage = storage;
    this.format = format2;
    this.baseLayer = baseLayer;
    this.layers = layers;
    this.baseFace = baseFace;
    this.maxFace = maxFace;
    this.baseLevel = baseLevel;
    this.maxLevel = maxLevel;
    this.faces = this.maxFace - this.baseFace + 1;
    this.levels = this.maxLevel - this.baseLevel + 1;
    this.baseAddresses = new Array(this.layers * this.faces * this.levels);
    for (let layer = 0; layer < this.layers; layer++) {
      for (let face = 0; face < this.faces; face++) {
        for (let level = 0; level < this.levels; level++) {
          this.baseAddresses[this.index(layer, face, level)] = this.storage.baseOffset(
            this.baseLayer + layer,
            this.baseFace + face,
            this.baseLevel + level
          );
        }
      }
    }
    this.imageExtent = new Array(this.levels);
    this.imageMemorySize = new Array(this.levels);
    for (let level = 0; level < this.levels; level++) {
      const srcExtent = this.storage.extent(this.baseLevel + level);
      const dstExtent = [
        srcExtent[0] * Format.blockExtent(this.format)[0] / this.storage.blockExtent[0],
        srcExtent[1] * Format.blockExtent(this.format)[1] / this.storage.blockExtent[1],
        srcExtent[2]
      ];
      this.imageExtent[level] = [Math.max(dstExtent[0], 1), Math.max(dstExtent[1], 1), Math.max(dstExtent[2], 1)];
      this.imageMemorySize[level] = this.storage.levelSize(this.baseLevel + level);
    }
    this.globalMemorySize = this.storage.layerSize(this.baseFace, this.maxFace, this.baseLevel, this.maxLevel) * this.layers;
  }
  getBaseAddress(layer, face, level) {
    return this.baseAddresses[this.index(layer, face, level)];
  }
  getExtent(level) {
    return this.imageExtent[level];
  }
  getMemorySize(level) {
    if (level === void 0) {
      return this.globalMemorySize;
    } else {
      return this.imageMemorySize[level];
    }
  }
  index(layer, face, level) {
    return (layer * this.faces + face) * this.levels + level;
  }
}
var TextureSource;
((TextureSource2) => {
  function newImage(texture, flags) {
    return {
      flags,
      target: Target.TARGET_2D_ARRAY,
      format: Format.RGBA8_UNORM_PACK8,
      width: texture.width,
      height: texture.height,
      layers: 1,
      levels: 1,
      type: "Image",
      texture: [texture]
    };
  }
  TextureSource2.newImage = newImage;
  function newTexture(texture, flags) {
    return {
      flags,
      target: texture.target,
      format: texture.format,
      width: texture.extent[0],
      height: texture.extent[1],
      layers: texture.layers,
      levels: texture.levels,
      type: "Texture",
      texture
    };
  }
  TextureSource2.newTexture = newTexture;
})(TextureSource || (TextureSource = {}));
var TextureFlags = /* @__PURE__ */ ((TextureFlags2) => {
  TextureFlags2[TextureFlags2["TF_CLAMP"] = 1] = "TF_CLAMP";
  TextureFlags2[TextureFlags2["TF_NOMIPMAP"] = 2] = "TF_NOMIPMAP";
  TextureFlags2[TextureFlags2["TF_NEAREST"] = 4] = "TF_NEAREST";
  return TextureFlags2;
})(TextureFlags || {});
let zstdInitialized = false;
class ImageRepository {
  constructor(prefix) {
    __publicField(this, "prefix");
    __publicField(this, "images", /* @__PURE__ */ new Map());
    this.prefix = prefix;
  }
  async load(handle, src, flags) {
    if (this.images.has(handle)) return;
    const type = src.endsWith(".dds.zst") ? "Texture" : "Image";
    const holder = {
      flags,
      textureSource: void 0
    };
    this.images.set(handle, holder);
    const r = await fetch(this.prefix + src, { referrerPolicy: "no-referrer" });
    if (r.ok) {
      const blob = await r.blob();
      if (type === "Texture") {
        if (!zstdInitialized) {
          await init();
          zstdInitialized = true;
        }
        const data = decompress(new Uint8Array(await blob.arrayBuffer()));
        try {
          const texture0 = parseDDSDX10(data);
          const texture = new Texture(
            Target.TARGET_2D_ARRAY,
            texture0.format,
            texture0.extent,
            texture0.layers,
            texture0.faces,
            texture0.levels
          );
          texture.data = texture0.data;
          holder.textureSource = TextureSource.newTexture(texture, flags);
        } catch (e) {
          log.warn(tag.texture, `Failed to load DDS: src=${src}`, e);
        }
      } else {
        const image = await createImageBitmap(blob);
        if (flags & 2) {
          holder.textureSource = TextureSource.newImage(image, flags);
        } else {
          const { levels: levels2, mipmaps } = generateMipMap(image);
          holder.textureSource = {
            flags,
            target: Target.TARGET_2D_ARRAY,
            format: Format.RGBA8_UNORM_PACK8,
            width: image.width,
            height: image.height,
            layers: 1,
            levels: levels2,
            type: "Image",
            texture: mipmaps
          };
        }
      }
    }
  }
  get(handle) {
    var _a3;
    return (_a3 = this.images.get(handle)) == null ? void 0 : _a3.textureSource;
  }
}
function generateMipMap(image) {
  const levels2 = Math.floor(Math.log2(Math.max(image.width, image.height))) + 1;
  const canvas = new OffscreenCanvas(image.width, image.height);
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("Failed to get 2D context");
  let width = image.width;
  let height = image.height;
  const mipmaps = [];
  for (let i = 0; i < levels2; i++) {
    context.clearRect(0, 0, width, height);
    context.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height);
    const next = context.getImageData(0, 0, width, height);
    mipmaps.push(next);
    width = Math.max(1, width >> 1);
    height = Math.max(1, height >> 1);
  }
  return {
    levels: levels2,
    mipmaps
  };
}
class Layer {
  constructor(layer, sublayer) {
    __publicField(this, "layer");
    __publicField(this, "sublayer");
    __publicField(this, "ranges", []);
    this.layer = layer;
    this.sublayer = sublayer;
  }
  static idOf(layer, sublayer) {
    return layer << 16 | sublayer;
  }
  get id() {
    return Layer.idOf(this.layer, this.sublayer);
  }
  addCommand(offset, length) {
    const lastRange = this.ranges[this.ranges.length - 1];
    if (lastRange && lastRange.offset + lastRange.length === offset) {
      lastRange.length += length;
    } else {
      this.ranges.push({ offset, length });
    }
  }
}
var DrawCommandInterpreter;
((DrawCommandInterpreter2) => {
  function sort(view) {
    const layers = /* @__PURE__ */ new Map([[0, new Layer(0, 0)]]);
    let currentLayer = layers.get(0);
    let currentViewportOffset = -1;
    let currentViewportLength = 0;
    let i = 0;
    while (i < view.byteLength) {
      const commandType = view.getUint8(i);
      const commandStart = i;
      switch (commandType) {
        case 2: {
          const layer = view.getInt16(i + 1, true);
          const sublayer = view.getInt16(i + 3, true);
          i += 5;
          if (currentLayer.layer !== layer || currentLayer.sublayer !== sublayer) {
            const layerId = Layer.idOf(layer, sublayer);
            let targetLayer = layers.get(layerId);
            if (!targetLayer) {
              targetLayer = new Layer(layer, sublayer);
              layers.set(layerId, targetLayer);
            }
            currentLayer = targetLayer;
          }
          if (currentViewportOffset >= 0) {
            currentLayer.addCommand(currentViewportOffset, currentViewportLength);
          }
          break;
        }
        case 3: {
          currentViewportOffset = commandStart;
          currentViewportLength = 17;
          currentLayer.addCommand(commandStart, 17);
          i += 17;
          break;
        }
        case 4: {
          currentLayer.addCommand(commandStart, 5);
          i += 5;
          break;
        }
        case 5: {
          const textSize0 = view.getUint16(i + 1, true);
          const commandLength = 3 + textSize0;
          currentLayer.addCommand(commandStart, commandLength);
          i += commandLength;
          break;
        }
        case 6: {
          currentLayer.addCommand(commandStart, 45);
          i += 45;
          break;
        }
        case 7: {
          currentLayer.addCommand(commandStart, 77);
          i += 77;
          break;
        }
        case 8: {
          const textSize = view.getUint16(i + 12, true);
          const commandLength = 14 + textSize;
          currentLayer.addCommand(commandStart, commandLength);
          i += commandLength;
          break;
        }
        default:
          throw new Error(`Unknown command type: ${commandType}`);
      }
    }
    const sortedKeys = Array.from(layers.keys()).sort((a, b) => a - b);
    return sortedKeys.map((key2) => layers.get(key2));
  }
  DrawCommandInterpreter2.sort = sort;
  function runRange(range, baseView, cb) {
    const rangeView = new DataView(baseView.buffer, baseView.byteOffset + range.offset, range.length);
    let i = 0;
    while (i < rangeView.byteLength) {
      const view = new DataView(rangeView.buffer, rangeView.byteOffset + i);
      const commandType = view.getUint8(0);
      switch (commandType) {
        case 3:
          {
            const x = view.getInt32(1, true);
            const y = view.getInt32(5, true);
            const width = view.getInt32(9, true);
            const height = view.getInt32(13, true);
            cb.onSetViewport(x, y, width, height);
          }
          i += 17;
          break;
        case 4:
          {
            const r = view.getUint8(1);
            const g = view.getUint8(2);
            const b = view.getUint8(3);
            const a = view.getUint8(4);
            cb.onSetColor(r, g, b, a);
          }
          i += 5;
          break;
        case 5:
          {
            const textSize = view.getUint16(1, true);
            const text = new TextDecoder().decode(new Uint8Array(view.buffer, view.byteOffset + 3, textSize));
            cb.onSetColorEscape(text);
          }
          i += 3 + view.getUint16(1, true);
          break;
        case 6:
          {
            const handle = view.getInt32(1, true);
            const x = view.getFloat32(5, true);
            const y = view.getFloat32(9, true);
            const width = view.getFloat32(13, true);
            const height = view.getFloat32(17, true);
            const s1 = view.getFloat32(21, true);
            const t1 = view.getFloat32(25, true);
            const s2 = view.getFloat32(29, true);
            const t2 = view.getFloat32(33, true);
            const stackLayer = view.getInt32(37, true);
            const maskLayer = view.getInt32(41, true);
            cb.onDrawImage(handle, x, y, width, height, s1, t1, s2, t2, stackLayer, maskLayer);
          }
          i += 45;
          break;
        case 7:
          {
            const handle = view.getInt32(1, true);
            const x1 = view.getFloat32(5, true);
            const y1 = view.getFloat32(9, true);
            const x2 = view.getFloat32(13, true);
            const y2 = view.getFloat32(17, true);
            const x3 = view.getFloat32(21, true);
            const y3 = view.getFloat32(25, true);
            const x4 = view.getFloat32(29, true);
            const y4 = view.getFloat32(33, true);
            const s1 = view.getFloat32(37, true);
            const t1 = view.getFloat32(41, true);
            const s2 = view.getFloat32(45, true);
            const t2 = view.getFloat32(49, true);
            const s3 = view.getFloat32(53, true);
            const t3 = view.getFloat32(57, true);
            const s4 = view.getFloat32(61, true);
            const t4 = view.getFloat32(65, true);
            const stackLayer = view.getInt32(69, true);
            const maskLayer = view.getInt32(73, true);
            cb.onDrawImageQuad(
              handle,
              x1,
              y1,
              x2,
              y2,
              x3,
              y3,
              x4,
              y4,
              s1,
              t1,
              s2,
              t2,
              s3,
              t3,
              s4,
              t4,
              stackLayer,
              maskLayer
            );
          }
          i += 77;
          break;
        case 8:
          {
            const x = view.getFloat32(1, true);
            const y = view.getFloat32(5, true);
            const align2 = view.getUint8(9);
            const height = view.getUint8(10);
            const font2 = view.getUint8(11);
            const textSize = view.getUint16(12, true);
            const text = new TextDecoder().decode(new Uint8Array(view.buffer, view.byteOffset + 14, textSize));
            cb.onDrawString(x, y, align2, height, font2, text);
          }
          i += 14 + view.getUint16(12, true);
          break;
      }
    }
  }
  DrawCommandInterpreter2.runRange = runRange;
})(DrawCommandInterpreter || (DrawCommandInterpreter = {}));
const WHITE_TEXTURE_BITMAP = (() => {
  const tex = new Texture(Target.TARGET_2D_ARRAY, Format.RGBA8_UNORM_PACK8, [8, 8, 1], 1, 1, 1);
  const arr = new Uint8Array(8 * 8 * 4).fill(255);
  tex.data = new DataView(arr.buffer);
  return {
    id: "@white",
    source: TextureSource.newTexture(tex, TextureFlags.TF_NOMIPMAP)
  };
})();
(() => {
  const image = new ImageData(8, 8);
  image.data.set(Array(8 * 8 * 4).fill(0));
  return {
    id: "@black",
    source: TextureSource.newImage(image, TextureFlags.TF_NOMIPMAP)
  };
})();
const reColor = /\^([0-9])|\^[xX]([0-9a-fA-F]{6})/;
const colorEscape = [
  [0, 0, 0, 1],
  [1, 0, 0, 1],
  [0, 1, 0, 1],
  [0, 0, 1, 1],
  [1, 1, 0, 1],
  [1, 0, 1, 1],
  [0, 1, 1, 1],
  [1, 1, 1, 1],
  [0.7, 0.7, 0.7, 1],
  [0.4, 0.4, 0.4, 1]
];
class Renderer {
  constructor(imageRepo, textRasterizer, screenSize) {
    __publicField(this, "backend");
    __publicField(this, "screenSize");
    __publicField(this, "currentColor", [0, 0, 0, 0]);
    __publicField(this, "renderStats");
    __publicField(this, "layerVisibility", /* @__PURE__ */ new Map());
    this.imageRepo = imageRepo;
    this.textRasterizer = textRasterizer;
    this.screenSize = screenSize;
    this.renderStats = {
      frameCount: 0,
      totalLayers: 0,
      layerStats: [],
      lastFrameTime: 0
    };
  }
  resize(screenSize) {
    var _a3;
    this.screenSize = screenSize;
    (_a3 = this.backend) == null ? void 0 : _a3.resize(screenSize.width, screenSize.height, screenSize.pixelRatio);
  }
  render(view) {
    if (!this.backend) return;
    const frameStartTime = performance.now();
    this.renderStats.frameCount++;
    this.renderStats.layerStats = [];
    this.backend.beginFrame();
    const layers = DrawCommandInterpreter.sort(view);
    this.renderStats.totalLayers = layers.length;
    for (const layer of layers) {
      const layerKey = `${layer.layer}.${layer.sublayer}`;
      const isVisible = this.layerVisibility.get(layerKey) ?? true;
      const layerStats = {
        layer: layer.layer,
        sublayer: layer.sublayer,
        drawImageCount: 0,
        drawImageQuadCount: 0,
        drawStringCount: 0,
        totalCommands: layer.ranges.length
      };
      if (isVisible) {
        this.backend.begin();
      }
      for (const range of layer.ranges) {
        DrawCommandInterpreter.runRange(range, view, {
          onSetViewport: (x, y, width, height) => {
            if (isVisible) {
              if (width === 0 || height === 0) {
                this.setViewport(0, 0, this.screenSize.width, this.screenSize.height);
              } else {
                this.setViewport(x, y, width, height);
              }
            }
          },
          onSetColor: (r, g, b, a) => {
            if (isVisible) {
              this.setColor(r, g, b, a);
            }
          },
          onSetColorEscape: (text) => {
            if (isVisible) {
              this.setColorEscape(text);
            }
          },
          onDrawImage: (handle, x, y, width, height, s1, t1, s2, t2, stackLayer, maskLayer) => {
            layerStats.drawImageCount++;
            if (isVisible) {
              this.drawImage(handle, x, y, width, height, s1, t1, s2, t2, stackLayer, maskLayer);
            }
          },
          onDrawImageQuad: (handle, x1, y1, x2, y2, x3, y3, x4, y4, s1, t1, s2, t2, s3, t3, s4, t4, stackLayer, maskLayer) => {
            layerStats.drawImageQuadCount++;
            if (isVisible) {
              this.drawImageQuad(
                handle,
                x1,
                y1,
                x2,
                y2,
                x3,
                y3,
                x4,
                y4,
                s1,
                t1,
                s2,
                t2,
                s3,
                t3,
                s4,
                t4,
                stackLayer,
                maskLayer
              );
            }
          },
          onDrawString: (x, y, align2, height, font2, text) => {
            layerStats.drawStringCount++;
            if (isVisible) {
              this.drawString(x, y, align2, height, font2, text);
            }
          }
        });
      }
      if (isVisible) {
        this.backend.end();
      }
      this.renderStats.layerStats.push(layerStats);
    }
    this.renderStats.lastFrameTime = performance.now() - frameStartTime;
  }
  setViewport(x, y, width, height) {
    var _a3;
    (_a3 = this.backend) == null ? void 0 : _a3.setViewport(x, y, width, height);
  }
  setColor(r, g, b, a) {
    this.currentColor = [r / 255, g / 255, b / 255, a / 255];
  }
  setColorEscape(text) {
    const a = text.match(/^\^[0-9]/);
    if (a) {
      this.currentColor = colorEscape[Number.parseInt(a[0][1])];
      return text.substring(2);
    }
    const color = text.match(/^\^[xX][0-9a-fA-F]{6}/);
    if (color) {
      const r = Number.parseInt(color[0].substring(2, 4), 16);
      const g = Number.parseInt(color[0].substring(4, 6), 16);
      const b = Number.parseInt(color[0].substring(6, 8), 16);
      this.currentColor = [r / 255, g / 255, b / 255, 1];
      return text.substring(8);
    }
    return text;
  }
  drawImage(handle, x, y, width, height, s1, t1, s2, t2, stackLayer, maskLayer) {
    this.drawImageQuad(
      handle,
      x,
      y,
      x + width,
      y,
      x + width,
      y + height,
      x,
      y + height,
      s1,
      t1,
      s2,
      t1,
      s2,
      t2,
      s1,
      t2,
      stackLayer,
      maskLayer
    );
  }
  drawImageQuad(handle, x1, y1, x2, y2, x3, y3, x4, y4, s1, t1, s2, t2, s3, t3, s4, t4, stackLayer, maskLayer) {
    var _a3, _b3;
    if (handle === 0) {
      (_a3 = this.backend) == null ? void 0 : _a3.drawQuad(
        [x1, y1, x2, y2, x3, y3, x4, y4],
        [0, 0, 1, 0, 1, 1, 0, 1],
        WHITE_TEXTURE_BITMAP,
        this.currentColor,
        0,
        -1
      );
    } else {
      const texSource = this.imageRepo.get(handle);
      if (texSource) {
        (_b3 = this.backend) == null ? void 0 : _b3.drawQuad(
          [x1, y1, x2, y2, x3, y3, x4, y4],
          [s1, t1, s2, t2, s3, t3, s4, t4],
          { id: handle.toString(), source: texSource },
          this.currentColor,
          stackLayer,
          maskLayer
        );
      }
    }
  }
  drawString(x, y, align2, height, font2, text) {
    const pos = { x, y };
    for (const line of text.split("\n")) {
      this.drawStringLine(pos, align2, height, font2, line);
    }
  }
  drawStringLine(pos, align2, height, font2, text0) {
    var _a3;
    const segments = [];
    let text = text0;
    while (true) {
      const m = reColor.exec(text);
      if (!m) break;
      const subtext = text.substring(0, m.index);
      text = text.substring(m.index + m[0].length);
      if (subtext.length > 0) {
        for (const render of this.textRasterizer.get(height, font2, subtext)) {
          segments.push({
            color: this.currentColor,
            render
          });
        }
      }
      if (m[1]) {
        this.currentColor = colorEscape[Number.parseInt(m[1])];
      } else {
        const r = Number.parseInt(m[2].substring(0, 2), 16);
        const g = Number.parseInt(m[2].substring(2, 4), 16);
        const b = Number.parseInt(m[2].substring(4, 6), 16);
        this.currentColor = [r / 255, g / 255, b / 255, 1];
      }
    }
    if (text.length > 0) {
      for (const render of this.textRasterizer.get(height, font2, text)) {
        segments.push({
          color: this.currentColor,
          render
        });
      }
    }
    const width = segments.reduce((width2, segment) => width2 + segment.render.width, 0);
    let x = pos.x;
    switch (align2) {
      case 1:
        x = Math.floor((this.screenSize.width - width) / 2 + pos.x);
        break;
      case 2:
        x = Math.floor(this.screenSize.width - width - pos.x);
        break;
      case 3:
        x = Math.floor(pos.x - width / 2);
        break;
      case 4:
        x = Math.floor(pos.x - width);
        break;
    }
    for (const segment of segments) {
      if (segment.render.bitmap) {
        (_a3 = this.backend) == null ? void 0 : _a3.drawQuad(
          [x, pos.y, x + segment.render.width, pos.y, x + segment.render.width, pos.y + height, x, pos.y + height],
          segment.render.coords,
          segment.render.bitmap,
          segment.color,
          0,
          -1
        );
      }
      x += segment.render.width;
    }
    pos.y += height;
  }
  getStats() {
    return {
      frameCount: this.renderStats.frameCount,
      totalLayers: this.renderStats.totalLayers,
      layerStats: [...this.renderStats.layerStats],
      lastFrameTime: this.renderStats.lastFrameTime
    };
  }
  resetStats() {
    this.renderStats = {
      frameCount: 0,
      totalLayers: 0,
      layerStats: [],
      lastFrameTime: 0
    };
  }
  getStatsSummary() {
    const totalDrawImage = this.renderStats.layerStats.reduce((sum, layer) => sum + layer.drawImageCount, 0);
    const totalDrawImageQuad = this.renderStats.layerStats.reduce((sum, layer) => sum + layer.drawImageQuadCount, 0);
    const totalDrawString = this.renderStats.layerStats.reduce((sum, layer) => sum + layer.drawStringCount, 0);
    const totalDrawCalls = totalDrawImage + totalDrawImageQuad + totalDrawString;
    return {
      frameCount: this.renderStats.frameCount,
      totalLayers: this.renderStats.totalLayers,
      totalDrawCalls,
      drawImage: totalDrawImage,
      drawImageQuad: totalDrawImageQuad,
      drawString: totalDrawString,
      avgFrameTime: this.renderStats.lastFrameTime
    };
  }
  setLayerVisible(layer, sublayer, visible) {
    const layerKey = `${layer}.${sublayer}`;
    this.layerVisibility.set(layerKey, visible);
  }
  isLayerVisible(layer, sublayer) {
    const layerKey = `${layer}.${sublayer}`;
    return this.layerVisibility.get(layerKey) ?? true;
  }
  getLayerVisibility() {
    return new Map(this.layerVisibility);
  }
}
const reColorGlobal = /\^([0-9])|\^[xX]([0-9a-fA-F]{6})/g;
async function loadFonts() {
  await loadFont("/LiberationSans-Regular.woff", "Liberation Sans");
  await loadFont("/LiberationSans-Bold.woff", "Liberation Sans Bold");
  await loadFont("/VeraMono.woff", "Bitstream Vera Mono");
  await loadFont("/Fontin-Italic.woff", "Fontin Italic");
  await loadFont("/Fontin-Regular.woff", "Fontin Regular");
  await loadFont("/Fontin-SmallCaps.woff", "Fontin SmallCaps");
}
async function loadFont(url, family) {
  const href = new URL(url.replace(/^\//, ""), new URL("../", import.meta.url)).href;
  const r = await fetch(href);
  if (!r.ok) throw new Error(`Failed to load font: ${href}`);
  const blob = await r.blob();
  const fontFace = new FontFace(family, await blob.arrayBuffer());
  await fontFace.load();
  self.fonts.add(fontFace);
}
function font(size, fontNum) {
  const fontSize = size - 2;
  switch (fontNum) {
    case 1:
      return `${fontSize}px Liberation Sans`;
    case 2:
      return `${fontSize}px Liberation Sans Bold`;
    case 3:
      return `${fontSize}px Fontin SmallCaps`;
    case 4:
      return `italic ${fontSize}px Fontin SmallCaps`;
    case 5:
      return `${fontSize}px Fontin Regular`;
    case 6:
      return `${fontSize}px Fontin Italic`;
    default:
      return `${fontSize}px Bitstream Vera Mono`;
  }
}
class LRUCache {
  constructor(maxSize) {
    __publicField(this, "cache", /* @__PURE__ */ new Map());
    __publicField(this, "maxSize");
    this.maxSize = maxSize;
  }
  get(key2) {
    const value = this.cache.get(key2);
    if (value !== void 0) {
      this.cache.delete(key2);
      this.cache.set(key2, value);
    }
    return value;
  }
  set(key2, value) {
    if (this.cache.has(key2)) {
      this.cache.delete(key2);
    } else if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== void 0) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key2, value);
  }
}
class TextMetrics {
  constructor() {
    __publicField(this, "context");
    __publicField(this, "measureCache", new LRUCache(1e4));
    __publicField(this, "currentFont", "");
    const canvas = new OffscreenCanvas(1, 1);
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Failed to get 2D context");
    this.context = context;
  }
  measure(size, fontNum, text) {
    const cacheKey = `${size}:${fontNum}:${text}`;
    const cached = this.measureCache.get(cacheKey);
    if (cached !== void 0) {
      return cached;
    }
    const fontStr = font(size, fontNum);
    if (this.currentFont !== fontStr) {
      this.context.font = fontStr;
      this.currentFont = fontStr;
    }
    const lines = text.replaceAll(reColorGlobal, "").split("\n");
    const result = Math.ceil(lines.reduce((max2, line) => Math.max(max2, this.context.measureText(line).width), 0));
    this.measureCache.set(cacheKey, result);
    return result;
  }
  measureCursorIndex(size, fontNum, text, cursorX, cursorY) {
    const fontStr = font(size, fontNum);
    if (this.currentFont !== fontStr) {
      this.context.font = fontStr;
      this.currentFont = fontStr;
    }
    const lines = text.split("\n");
    const y = Math.floor(Math.max(0, Math.min(lines.length - 1, cursorY / size)));
    const line = lines[y];
    let i = 0;
    for (; i <= line.length; i++) {
      const w = this.context.measureText(line.substring(0, i).replaceAll(reColorGlobal, "")).width;
      if (w >= cursorX) {
        break;
      }
    }
    for (let j = 0; j < y; j++) {
      i += lines[j].length + 1;
    }
    return i;
  }
  fittingText(size, fontNum, text, maxWidth) {
    const fontStr = font(size, fontNum);
    if (this.currentFont !== fontStr) {
      this.context.font = fontStr;
      this.currentFont = fontStr;
    }
    const line = text.replaceAll(reColorGlobal, "");
    let width = 0;
    for (let i = 0; i < line.length; i++) {
      const w = this.context.measureText(line[i]).width;
      if (width + w > maxWidth) {
        return { width, head: line.substring(0, i), tail: line.substring(i) };
      }
      width += w;
    }
    return { width, head: line, tail: "" };
  }
}
class BinaryBinPack {
  constructor(width, height) {
    __publicField(this, "freeRectangles");
    this.width = width;
    this.height = height;
    this.freeRectangles = [{ width, height, x: 0, y: 0 }];
  }
  findFreeRectangle(width, height) {
    for (let i = 0; i < this.freeRectangles.length; i++) {
      const rect = this.freeRectangles[i];
      if (rect.width >= width && rect.height >= height) {
        return { index: i, rect };
      }
    }
    return null;
  }
  splitFreeRectangle(freeRect, width, height) {
    const rightSplit = {
      width: freeRect.width - width,
      height,
      x: freeRect.x + width,
      y: freeRect.y
    };
    const bottomSplit = {
      width: freeRect.width,
      height: freeRect.height - height,
      x: freeRect.x,
      y: freeRect.y + height
    };
    if (rightSplit.width > 0 && rightSplit.height > 0) this.freeRectangles.push(rightSplit);
    if (bottomSplit.width > 0 && bottomSplit.height > 0) this.freeRectangles.push(bottomSplit);
  }
  add(width, height) {
    const found = this.findFreeRectangle(width, height);
    if (found) {
      const { index, rect } = found;
      const newRect = { width, height, x: rect.x, y: rect.y };
      this.freeRectangles.splice(index, 1);
      this.splitFreeRectangle(rect, width, height);
      return newRect;
    }
  }
}
class BinPackingTextRasterizer {
  constructor(textMetrics) {
    __publicField(this, "size");
    // @ts-ignore
    __publicField(this, "canvas");
    // @ts-ignore
    __publicField(this, "context");
    // @ts-ignore
    __publicField(this, "packer");
    __publicField(this, "cache", /* @__PURE__ */ new Map());
    __publicField(this, "generation", 0);
    this.textMetrics = textMetrics;
    const canvas = new OffscreenCanvas(1, 1);
    const gl = canvas.getContext("webgl");
    if (!gl) throw new Error("Failed to get WebGL context");
    const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    const size = 4096;
    this.size = { width: Math.min(size, maxTextureSize), height: Math.min(size, maxTextureSize) };
    this.reset();
  }
  reset() {
    this.canvas = new OffscreenCanvas(this.size.width, this.size.height);
    const context = this.canvas.getContext("2d", { willReadFrequently: true });
    if (!context) throw new Error("Failed to get 2D context");
    this.context = context;
    this.context.fillStyle = "white";
    this.context.textBaseline = "bottom";
    this.packer = new BinaryBinPack(this.size.width, this.size.height);
    this.generation += 1;
  }
  get(height, fontNum, text) {
    const key2 = `${height}:${fontNum}:${text}`;
    let render = this.cache.get(key2);
    if (!render) {
      const width = this.textMetrics.measure(height, fontNum, text);
      if (width > 0) {
        if (width > this.size.width) {
          const renders = [];
          let parts = { width: 0, head: "", tail: text };
          while (parts.tail !== "") {
            parts = this.textMetrics.fittingText(height, fontNum, parts.tail, this.size.width);
            renders.push(this.drawText(parts.head, parts.width, height, fontNum));
          }
          render = renders.map((r) => r.forOnce);
          this.cache.set(
            key2,
            renders.map((r) => r.forCache)
          );
        } else {
          const r = this.drawText(text, width, height, fontNum);
          render = [r.forOnce];
          this.cache.set(key2, [r.forCache]);
        }
      } else {
        render = [
          {
            width: 0,
            bitmap: void 0,
            coords: [0, 0, 1, 0, 1, 1, 0, 1]
          }
        ];
      }
    }
    return render;
  }
  drawText(text, width, height, fontNum) {
    let rect = this.packer.add(width, height);
    if (!rect) {
      this.reset();
      rect = this.packer.add(width, height);
      if (!rect) throw new Error("Failed to add text to texture");
    }
    this.context.font = font(height, fontNum);
    this.context.fillText(text, rect.x, rect.y + rect.height);
    const u1 = rect.x / this.size.width;
    const v1 = rect.y / this.size.height;
    const u2 = (rect.x + rect.width) / this.size.width;
    const v2 = (rect.y + rect.height) / this.size.height;
    const bitmap = {
      id: `@text:${this.generation}`,
      source: TextureSource.newImage(this.canvas, TextureFlags.TF_NOMIPMAP | TextureFlags.TF_CLAMP),
      flags: TextureFlags.TF_NOMIPMAP | TextureFlags.TF_CLAMP
    };
    const forCache = {
      width,
      coords: [u1, v1, u2, v1, u2, v2, u1, v2],
      bitmap: {
        ...bitmap
      }
    };
    const forOnce = {
      ...forCache,
      bitmap: {
        ...forCache.bitmap,
        updateSubImage: () => {
          const context = this.context;
          return {
            ...rect,
            source: context.getImageData(rect.x, rect.y, rect.width, rect.height).data
          };
        }
      }
    };
    return { forCache, forOnce };
  }
}
function glFormatFor(format2, gl, ext) {
  const desc = formatDescTable(gl, ext)[format2];
  if (!desc) throw new Error(`Unsupported format: ${format2}`);
  return desc;
}
function formatDescTable(gl, ext) {
  var _a3, _b3;
  return {
    [Format.RGBA8_UNORM_PACK8]: { internal: gl.RGBA8, external: gl.RGBA, type: gl.UNSIGNED_BYTE, properties: 0 },
    [Format.RGBA_DXT1_UNORM_BLOCK8]: {
      internal: ((_a3 = ext.textureS3tc) == null ? void 0 : _a3.COMPRESSED_RGBA_S3TC_DXT1_EXT) ?? 0,
      external: 0,
      type: 0,
      properties: 0
    },
    [Format.RGBA_BP_UNORM_BLOCK16]: {
      internal: ((_b3 = ext.textureBptc) == null ? void 0 : _b3.COMPRESSED_RGBA_BPTC_UNORM_EXT) ?? 0,
      external: 0,
      type: 0,
      properties: 0
    }
    // [Format.UNDEFINED]: ,
    //
    // [Format.RG4_UNORM_PACK8]: { internal: GL., external: GL., type: GL., properties: 0 },
    // [Format.RGBA4_UNORM_PACK16]: { internal: GL., external: GL., type: GL., properties: 0 },
    // [Format.BGRA4_UNORM_PACK16]: { internal: GL., external: GL., type: GL., properties: 0 },
    // [Format.R5G6B5_UNORM_PACK16]: { internal: GL., external: GL., type: GL., properties: 0 },
    // [Format.B5G6R5_UNORM_PACK16]: { internal: GL., external: GL., type: GL., properties: 0 },
    // [Format.RGB5A1_UNORM_PACK16]: { internal: GL., external: GL., type: GL., properties: 0 },
    // [Format.BGR5A1_UNORM_PACK16]: { internal: GL., external: GL., type: GL., properties: 0 },
    // [Format.A1RGB5_UNORM_PACK16]: { internal: GL., external: GL., type: GL., properties: 0 },
    //
    // [Format.R8_UNORM_PACK8]: { internal: GL., external: GL., type: GL., properties: 0 },
    // [Format.R8_SNORM_PACK8]:
    // [Format.R8_USCALED_PACK8]:
    // [Format.R8_SSCALED_PACK8]:
    // [Format.R8_UINT_PACK8]:
    // [Format.R8_SINT_PACK8]:
    // [Format.R8_SRGB_PACK8]:
    //
    // [Format.RG8_UNORM_PACK8]:
    // [Format.RG8_SNORM_PACK8]:
    // [Format.RG8_USCALED_PACK8]:
    // [Format.RG8_SSCALED_PACK8]:
    // [Format.RG8_UINT_PACK8]:
    // [Format.RG8_SINT_PACK8]:
    // [Format.RG8_SRGB_PACK8]:
    //
    // [Format.RGB8_UNORM_PACK8]:
    // [Format.RGB8_SNORM_PACK8]:
    // [Format.RGB8_USCALED_PACK8]:
    // [Format.RGB8_SSCALED_PACK8]:
    // [Format.RGB8_UINT_PACK8]:
    // [Format.RGB8_SINT_PACK8]:
    // [Format.RGB8_SRGB_PACK8]:
    //
    // [Format.BGR8_UNORM_PACK8]:
    // [Format.BGR8_SNORM_PACK8]:
    // [Format.BGR8_USCALED_PACK8]:
    // [Format.BGR8_SSCALED_PACK8]:
    // [Format.BGR8_UINT_PACK8]:
    // [Format.BGR8_SINT_PACK8]:
    // [Format.BGR8_SRGB_PACK8]:
    //
    // [Format.RGBA8_UNORM_PACK8]:
    // [Format.RGBA8_SNORM_PACK8]:
    // [Format.RGBA8_USCALED_PACK8]:
    // [Format.RGBA8_SSCALED_PACK8]:
    // [Format.RGBA8_UINT_PACK8]:
    // [Format.RGBA8_SINT_PACK8]:
    // [Format.RGBA8_SRGB_PACK8]:
    //
    // [Format.BGRA8_UNORM_PACK8]:
    // [Format.BGRA8_SNORM_PACK8]:
    // [Format.BGRA8_USCALED_PACK8]:
    // [Format.BGRA8_SSCALED_PACK8]:
    // [Format.BGRA8_UINT_PACK8]:
    // [Format.BGRA8_SINT_PACK8]:
    // [Format.BGRA8_SRGB_PACK8]:
    //
    // [Format.RGBA8_UNORM_PACK32]:
    // [Format.RGBA8_SNORM_PACK32]:
    // [Format.RGBA8_USCALED_PACK32]:
    // [Format.RGBA8_SSCALED_PACK32]:
    // [Format.RGBA8_UINT_PACK32]:
    // [Format.RGBA8_SINT_PACK32]:
    // [Format.RGBA8_SRGB_PACK32]:
    //
    // [Format.RGB10A2_UNORM_PACK32]:
    // [Format.RGB10A2_SNORM_PACK32]:
    // [Format.RGB10A2_USCALED_PACK32]:
    // [Format.RGB10A2_SSCALED_PACK32]:
    // [Format.RGB10A2_UINT_PACK32]:
    // [Format.RGB10A2_SINT_PACK32]:
    //
    // [Format.BGR10A2_UNORM_PACK32]:
    // [Format.BGR10A2_SNORM_PACK32]:
    // [Format.BGR10A2_USCALED_PACK32]:
    // [Format.BGR10A2_SSCALED_PACK32]:
    // [Format.BGR10A2_UINT_PACK32]:
    // [Format.BGR10A2_SINT_PACK32]:
    //
    // [Format.R16_UNORM_PACK16]:
    // [Format.R16_SNORM_PACK16]:
    // [Format.R16_USCALED_PACK16]:
    // [Format.R16_SSCALED_PACK16]:
    // [Format.R16_UINT_PACK16]:
    // [Format.R16_SINT_PACK16]:
    // [Format.R16_SFLOAT_PACK16]:
    //
    // [Format.RG16_UNORM_PACK16]:
    // [Format.RG16_SNORM_PACK16]:
    // [Format.RG16_USCALED_PACK16]:
    // [Format.RG16_SSCALED_PACK16]:
    // [Format.RG16_UINT_PACK16]:
    // [Format.RG16_SINT_PACK16]:
    // [Format.RG16_SFLOAT_PACK16]:
    //
    // [Format.RGB16_UNORM_PACK16]:
    // [Format.RGB16_SNORM_PACK16]:
    // [Format.RGB16_USCALED_PACK16]:
    // [Format.RGB16_SSCALED_PACK16]:
    // [Format.RGB16_UINT_PACK16]:
    // [Format.RGB16_SINT_PACK16]:
    // [Format.RGB16_SFLOAT_PACK16]:
    //
    // [Format.RGBA16_UNORM_PACK16]:
    // [Format.RGBA16_SNORM_PACK16]:
    // [Format.RGBA16_USCALED_PACK16]:
    // [Format.RGBA16_SSCALED_PACK16]:
    // [Format.RGBA16_UINT_PACK16]:
    // [Format.RGBA16_SINT_PACK16]:
    // [Format.RGBA16_SFLOAT_PACK16]:
    //
    // [Format.R32_UINT_PACK32]:
    // [Format.R32_SINT_PACK32]:
    // [Format.R32_SFLOAT_PACK32]:
    //
    // [Format.RG32_UINT_PACK32]:
    // [Format.RG32_SINT_PACK32]:
    // [Format.RG32_SFLOAT_PACK32]:
    //
    // [Format.RGB32_UINT_PACK32]:
    // [Format.RGB32_SINT_PACK32]:
    // [Format.RGB32_SFLOAT_PACK32]:
    //
    // [Format.RGBA32_UINT_PACK32]:
    // [Format.RGBA32_SINT_PACK32]:
    // [Format.RGBA32_SFLOAT_PACK32]:
    //
    // [Format.R64_UINT_PACK64]:
    // [Format.R64_SINT_PACK64]:
    // [Format.R64_SFLOAT_PACK64]:
    //
    // [Format.RG64_UINT_PACK64]:
    // [Format.RG64_SINT_PACK64]:
    // [Format.RG64_SFLOAT_PACK64]:
    //
    // [Format.RGB64_UINT_PACK64]:
    // [Format.RGB64_SINT_PACK64]:
    // [Format.RGB64_SFLOAT_PACK64]:
    //
    // [Format.RGBA64_UINT_PACK64]:
    // [Format.RGBA64_SINT_PACK64]:
    // [Format.RGBA64_SFLOAT_PACK64]:
    //
    // [Format.RG11B10_UFLOAT_PACK32]:
    // [Format.RGB9E5_UFLOAT_PACK32]:
    //
    // [Format.D16_UNORM_PACK16]:
    // [Format.D24_UNORM_PACK32]:
    // [Format.D32_SFLOAT_PACK32]:
    // [Format.S8_UINT_PACK8]:
    // [Format.D16_UNORM_S8_UINT_PACK32]:
    // [Format.D24_UNORM_S8_UINT_PACK32]:
    // [Format.D32_SFLOAT_S8_UINT_PACK64]:
    //
    // [Format.RGB_DXT1_UNORM_BLOCK8]:
    // [Format.RGB_DXT1_SRGB_BLOCK8]:
    // [Format.RGBA_DXT1_UNORM_BLOCK8]:
    // [Format.RGBA_DXT1_SRGB_BLOCK8]:
    // [Format.RGBA_DXT3_UNORM_BLOCK16]:
    // [Format.RGBA_DXT3_SRGB_BLOCK16]:
    // [Format.RGBA_DXT5_UNORM_BLOCK16]:
    // [Format.RGBA_DXT5_SRGB_BLOCK16]:
    // [Format.R_ATI1N_UNORM_BLOCK8]:
    // [Format.R_ATI1N_SNORM_BLOCK8]:
    // [Format.RG_ATI2N_UNORM_BLOCK16]:
    // [Format.RG_ATI2N_SNORM_BLOCK16]:
    //
    // [Format.RGB_BP_UFLOAT_BLOCK16]:
    // [Format.RGB_BP_SFLOAT_BLOCK16]:
    // [Format.RGBA_BP_UNORM_BLOCK16]:
    // [Format.RGBA_BP_SRGB_BLOCK16]:
    //
    // [Format.RGB_ETC2_UNORM_BLOCK8]:
    // [Format.RGB_ETC2_SRGB_BLOCK8]:
    // [Format.RGBA_ETC2_UNORM_BLOCK8]:
    // [Format.RGBA_ETC2_SRGB_BLOCK8]:
    // [Format.RGBA_ETC2_UNORM_BLOCK16]:
    // [Format.RGBA_ETC2_SRGB_BLOCK16]:
    // [Format.R_EAC_UNORM_BLOCK8]:
    // [Format.R_EAC_SNORM_BLOCK8]:
    // [Format.RG_EAC_UNORM_BLOCK16]:
    // [Format.RG_EAC_SNORM_BLOCK16]:
    //
    // [Format.RGBA_ASTC_4X4_UNORM_BLOCK16]:
    // [Format.RGBA_ASTC_4X4_SRGB_BLOCK16]:
    // [Format.RGBA_ASTC_5X4_UNORM_BLOCK16]:
    // [Format.RGBA_ASTC_5X4_SRGB_BLOCK16]:
    // [Format.RGBA_ASTC_5X5_UNORM_BLOCK16]:
    // [Format.RGBA_ASTC_5X5_SRGB_BLOCK16]:
    // [Format.RGBA_ASTC_6X5_UNORM_BLOCK16]:
    // [Format.RGBA_ASTC_6X5_SRGB_BLOCK16]:
    // [Format.RGBA_ASTC_6X6_UNORM_BLOCK16]:
    // [Format.RGBA_ASTC_6X6_SRGB_BLOCK16]:
    // [Format.RGBA_ASTC_8X5_UNORM_BLOCK16]:
    // [Format.RGBA_ASTC_8X5_SRGB_BLOCK16]:
    // [Format.RGBA_ASTC_8X6_UNORM_BLOCK16]:
    // [Format.RGBA_ASTC_8X6_SRGB_BLOCK16]:
    // [Format.RGBA_ASTC_8X8_UNORM_BLOCK16]:
    // [Format.RGBA_ASTC_8X8_SRGB_BLOCK16]:
    // [Format.RGBA_ASTC_10X5_UNORM_BLOCK16]:
    // [Format.RGBA_ASTC_10X5_SRGB_BLOCK16]:
    // [Format.RGBA_ASTC_10X6_UNORM_BLOCK16]:
    // [Format.RGBA_ASTC_10X6_SRGB_BLOCK16]:
    // [Format.RGBA_ASTC_10X8_UNORM_BLOCK16]:
    // [Format.RGBA_ASTC_10X8_SRGB_BLOCK16]:
    // [Format.RGBA_ASTC_10X10_UNORM_BLOCK16]:
    // [Format.RGBA_ASTC_10X10_SRGB_BLOCK16]:
    // [Format.RGBA_ASTC_12X10_UNORM_BLOCK16]:
    // [Format.RGBA_ASTC_12X10_SRGB_BLOCK16]:
    // [Format.RGBA_ASTC_12X12_UNORM_BLOCK16]:
    // [Format.RGBA_ASTC_12X12_SRGB_BLOCK16]:
    //
    // [Format.RGB_PVRTC1_8X8_UNORM_BLOCK32]:
    // [Format.RGB_PVRTC1_8X8_SRGB_BLOCK32]:
    // [Format.RGB_PVRTC1_16X8_UNORM_BLOCK32]:
    // [Format.RGB_PVRTC1_16X8_SRGB_BLOCK32]:
    // [Format.RGBA_PVRTC1_8X8_UNORM_BLOCK32]:
    // [Format.RGBA_PVRTC1_8X8_SRGB_BLOCK32]:
    // [Format.RGBA_PVRTC1_16X8_UNORM_BLOCK32]:
    // [Format.RGBA_PVRTC1_16X8_SRGB_BLOCK32]:
    //
    // [Format.RGBA_PVRTC2_4X4_UNORM_BLOCK8]:
    // [Format.RGBA_PVRTC2_4X4_SRGB_BLOCK8]:
    // [Format.RGBA_PVRTC2_8X4_UNORM_BLOCK8]:
    // [Format.RGBA_PVRTC2_8X4_SRGB_BLOCK8]:
    //
    // [Format.RGB_ETC_UNORM_BLOCK8]:
    // [Format.RGB_ATC_UNORM_BLOCK8]:
    // [Format.RGBA_ATCA_UNORM_BLOCK16]:
    // [Format.RGBA_ATCI_UNORM_BLOCK16]:
    //
    // [Format.L8_UNORM_PACK8]:
    // [Format.A8_UNORM_PACK8]:
    // [Format.LA8_UNORM_PACK8]:
    // [Format.L16_UNORM_PACK16]:
    // [Format.A16_UNORM_PACK16]:
    // [Format.LA16_UNORM_PACK16]:
    //
    // [Format.BGR8_UNORM_PACK32]:
    // [Format.BGR8_SRGB_PACK32]:
    //
    // [Format.RG3B2_UNORM_PACK8]:
  };
}
const vertexShaderSource$1 = `#version 300 es
uniform mat4 u_MvpMatrix;

in vec2 a_Position;
in vec2 a_TexCoord;
in uint a_TintColor; // Packed RGBA as uint32
in vec4 a_Viewport;
in vec3 a_TexId;

out vec2 v_ScreenPos;
out vec2 v_TexCoord;
out vec4 v_TintColor;
out vec4 v_Viewport;
out vec3 v_TexId;

void main(void) {
    v_TexCoord = a_TexCoord;
    v_TintColor = vec4(
        float((a_TintColor >> 24u) & 0xFFu) / 255.0,
        float((a_TintColor >> 16u) & 0xFFu) / 255.0,
        float((a_TintColor >> 8u) & 0xFFu) / 255.0,
        float(a_TintColor & 0xFFu) / 255.0
    );
    v_TexId = a_TexId;
    vec2 vp0 = a_Viewport.xy + vec2(0.0, a_Viewport.w);
    vec2 vp1 = a_Viewport.xy + vec2(a_Viewport.z, 0.0);
    v_Viewport = vec4(
      (u_MvpMatrix * vec4(vp0, 0.0, 1.0)).xy,
      (u_MvpMatrix * vec4(vp1, 0.0, 1.0)).xy);
    vec4 pos = u_MvpMatrix * vec4(a_Position + a_Viewport.xy, 0.0, 1.0);
    v_ScreenPos = pos.xy;
    gl_Position = pos;
}`;
const textureFragmentShaderSource = (max2) => {
  let switchCode = "";
  for (let i = 0; i < max2; ++i) {
    if (i === 0) {
      switchCode += `if (v_TexId.x < ${i}.5) `;
    } else if (i === max2 - 1) {
      switchCode += "else ";
    } else {
      switchCode += `else if (v_TexId.x < ${i}.5) `;
    }
    switchCode += `{
    color = texture(u_Texture[${i}], vec3(v_TexCoord, v_TexId.y));
    if (v_TexId.z > -0.5)
      color *= texture(u_Texture[${i}], vec3(v_TexCoord, v_TexId.z));
    }`;
  }
  return `#version 300 es
precision mediump float;

uniform highp sampler2DArray u_Texture[${max2}];

in vec2 v_ScreenPos;
in vec2 v_TexCoord;
in vec4 v_TintColor;
in vec4 v_Viewport;
in vec3 v_TexId;

out vec4 f_fragColor;

void main(void) {
    float x = v_ScreenPos[0], y = v_ScreenPos[1];
    if (x < v_Viewport[0] || x >= v_Viewport[2] || y < v_Viewport[1] || y >= v_Viewport[3]) {
      discard;
    }
    vec4 color;
    ${switchCode}
    f_fragColor = color * v_TintColor;
}
`;
};
class ShaderProgram {
  constructor(gl, vertexShaderSource2, fragmentShaderSource2, bindLocations) {
    __publicField(this, "gl");
    __publicField(this, "program");
    __publicField(this, "locations");
    this.gl = gl;
    const vertexShader = this.createShader(gl.VERTEX_SHADER, vertexShaderSource2);
    const fragmentShader = this.createShader(gl.FRAGMENT_SHADER, fragmentShaderSource2);
    const program = gl.createProgram();
    if (!program) throw new Error("Failed to create program");
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(`Failed to link program: ${gl.getProgramInfoLog(program)}`);
    }
    this.locations = bindLocations(program);
    this.program = program;
  }
  use(set2) {
    this.gl.useProgram(this.program);
    set2(this.locations);
  }
  createShader(type, source) {
    const gl = this.gl;
    const shader = gl.createShader(type);
    if (!shader) throw new Error("Failed to create shader");
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(`Failed to compile shader: ${gl.getShaderInfoLog(shader)}`);
    }
    return shader;
  }
}
function orthoMatrix$1(left, right, bottom, top, near, far) {
  return [
    2 / (right - left),
    0,
    0,
    0,
    0,
    2 / (top - bottom),
    0,
    0,
    0,
    0,
    -2 / (far - near),
    0,
    -((right + left) / (right - left)),
    -((top + bottom) / (top - bottom)),
    -0,
    1
  ];
}
let VertexBuffer$1 = (_b2 = class {
  // 12 floats per vertex (reduced from 15)
  constructor() {
    __publicField(this, "_buffer");
    __publicField(this, "_floatView");
    __publicField(this, "_uintView");
    __publicField(this, "_indices");
    __publicField(this, "vertexOffset");
    __publicField(this, "indexOffset");
    __publicField(this, "quadCount");
    this._buffer = new ArrayBuffer(1024 * 1024 * 4);
    this._floatView = new Float32Array(this._buffer);
    this._uintView = new Uint32Array(this._buffer);
    this._indices = new Uint16Array(1024 * 1024);
    this.vertexOffset = 0;
    this.indexOffset = 0;
    this.quadCount = 0;
  }
  get buffer() {
    return new Uint8Array(this._buffer, 0, this.vertexOffset * 4);
  }
  get indices() {
    return new Uint16Array(this._indices.buffer, 0, this.indexOffset);
  }
  get vertexCount() {
    return this.vertexOffset / _b2.VERTEX_SIZE;
  }
  get indexCount() {
    return this.indexOffset;
  }
  reset() {
    this.vertexOffset = 0;
    this.indexOffset = 0;
    this.quadCount = 0;
  }
  ensureCapacity(requiredVertices, requiredIndices) {
    if (requiredVertices > this._floatView.length) {
      const newSize = Math.max(requiredVertices, this._floatView.length * 2);
      const newBuffer = new ArrayBuffer(newSize * 4);
      const newFloatView = new Float32Array(newBuffer);
      newFloatView.set(this._floatView);
      this._buffer = newBuffer;
      this._floatView = newFloatView;
      this._uintView = new Uint32Array(newBuffer);
    }
    if (requiredIndices > this._indices.length) {
      const newSize = Math.max(requiredIndices, this._indices.length * 2);
      const newIndices = new Uint16Array(newSize);
      newIndices.set(this._indices);
      this._indices = newIndices;
    }
  }
  pushQuad(coords, texCoords, tintColor, viewport, textureSlot, stackLayer, maskLayer) {
    this.ensureCapacity(this.vertexOffset + 48, this.indexOffset + 6);
    const baseVertex = this.quadCount * 4;
    const packedColor = Math.round(tintColor[0] * 255) << 24 | Math.round(tintColor[1] * 255) << 16 | Math.round(tintColor[2] * 255) << 8 | Math.round(tintColor[3] * 255);
    for (let i = 0; i < 4; i++) {
      const base = this.vertexOffset;
      this._floatView[base] = coords[i * 2];
      this._floatView[base + 1] = coords[i * 2 + 1];
      this._floatView[base + 2] = texCoords[i * 2];
      this._floatView[base + 3] = texCoords[i * 2 + 1];
      this._uintView[base + 4] = packedColor;
      this._floatView[base + 5] = viewport[0];
      this._floatView[base + 6] = viewport[1];
      this._floatView[base + 7] = viewport[2];
      this._floatView[base + 8] = viewport[3];
      this._floatView[base + 9] = textureSlot;
      this._floatView[base + 10] = stackLayer;
      this._floatView[base + 11] = maskLayer;
      this.vertexOffset += _b2.VERTEX_SIZE;
    }
    const idx = this._indices;
    idx[this.indexOffset++] = baseVertex + 0;
    idx[this.indexOffset++] = baseVertex + 1;
    idx[this.indexOffset++] = baseVertex + 2;
    idx[this.indexOffset++] = baseVertex + 0;
    idx[this.indexOffset++] = baseVertex + 2;
    idx[this.indexOffset++] = baseVertex + 3;
    this.quadCount++;
  }
}, __publicField(_b2, "VERTEX_SIZE", 12), _b2);
class WebGL1Backend {
  constructor(canvas) {
    __publicField(this, "gl");
    __publicField(this, "ext");
    __publicField(this, "textureProgram");
    __publicField(this, "textures", /* @__PURE__ */ new Map());
    __publicField(this, "viewport", []);
    __publicField(this, "pixelRatio", 1);
    __publicField(this, "vertices", new VertexBuffer$1());
    __publicField(this, "drawCount", 0);
    __publicField(this, "vbo");
    __publicField(this, "ebo");
    __publicField(this, "vao");
    __publicField(this, "vboSize", 0);
    __publicField(this, "eboSize", 0);
    __publicField(this, "maxTextures");
    __publicField(this, "batchTextures", /* @__PURE__ */ new Map());
    __publicField(this, "batchTextureCount", 0);
    __publicField(this, "dispatchCount", 0);
    __publicField(this, "_canvas");
    this._canvas = canvas;
    const gl = canvas.getContext("webgl2", { alpha: false });
    if (!gl) throw new Error("Failed to get WebGL context");
    this.gl = gl;
    this.ext = {
      textureBptc: gl.getExtension("EXT_texture_compression_bptc"),
      textureS3tc: gl.getExtension("WEBGL_compressed_texture_s3tc"),
      textureAnisotropic: gl.getExtension("EXT_texture_filter_anisotropic")
    };
    log.info(tag.backend, "WebGL extensions", this.ext);
    gl.clearColor(0, 0, 0, 1);
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    this.maxTextures = Math.min(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS), 100);
    this.textureProgram = new ShaderProgram(
      gl,
      vertexShaderSource$1,
      textureFragmentShaderSource(this.maxTextures),
      (program) => {
        const position = gl.getAttribLocation(program, "a_Position");
        if (position < 0) throw new Error("Failed to get attribute location");
        const texCoord = gl.getAttribLocation(program, "a_TexCoord");
        if (texCoord < 0) throw new Error("Failed to get attribute location");
        const tintColor = gl.getAttribLocation(program, "a_TintColor");
        if (tintColor < 0) throw new Error("Failed to get attribute location: tintColor");
        const viewport = gl.getAttribLocation(program, "a_Viewport");
        if (viewport < 0) throw new Error("Failed to get attribute location: viewport");
        const texId = gl.getAttribLocation(program, "a_TexId");
        if (texId < 0) throw new Error("Failed to get attribute location: texId");
        const mvpMatrix = gl.getUniformLocation(program, "u_MvpMatrix");
        if (!mvpMatrix) throw new Error("Failed to get uniform location: mvpMatrix");
        const textures = [];
        for (let i = 0; i < this.maxTextures; ++i) {
          const texture = gl.getUniformLocation(program, `u_Texture[${i}]`);
          if (!texture) throw new Error("Failed to get uniform location: texture");
          textures.push(texture);
        }
        return {
          position,
          texCoord,
          tintColor,
          viewport,
          texId,
          mvpMatrix,
          textures
        };
      }
    );
    const vbo = gl.createBuffer();
    if (!vbo) throw new Error("Failed to create vertex buffer");
    this.vbo = vbo;
    const ebo = gl.createBuffer();
    if (!ebo) throw new Error("Failed to create element buffer");
    this.ebo = ebo;
    const vao = gl.createVertexArray();
    if (!vao) throw new Error("Failed to create vertex array object");
    this.vao = vao;
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
    this.textureProgram.use((p) => {
      const stride = 48;
      gl.enableVertexAttribArray(p.position);
      gl.vertexAttribPointer(p.position, 2, gl.FLOAT, false, stride, 0);
      gl.enableVertexAttribArray(p.texCoord);
      gl.vertexAttribPointer(p.texCoord, 2, gl.FLOAT, false, stride, 8);
      gl.enableVertexAttribArray(p.tintColor);
      gl.vertexAttribIPointer(p.tintColor, 1, gl.UNSIGNED_INT, stride, 16);
      gl.enableVertexAttribArray(p.viewport);
      gl.vertexAttribPointer(p.viewport, 4, gl.FLOAT, false, stride, 20);
      gl.enableVertexAttribArray(p.texId);
      gl.vertexAttribPointer(p.texId, 3, gl.FLOAT, false, stride, 36);
    });
    gl.bindVertexArray(null);
    this.setViewport(0, 0, canvas.width, canvas.height);
  }
  get canvas() {
    return this._canvas;
  }
  resize(width, height, pixelRatio) {
    this._canvas.width = width;
    this._canvas.height = height;
    this.pixelRatio = pixelRatio;
    this.setViewport(0, 0, width, height);
    log.debug(tag.backend, `resize: ${width}x${height}(x${pixelRatio})`);
  }
  setViewport(x, y, width, height) {
    this.viewport = [x, y, width, height];
  }
  beginFrame() {
  }
  begin() {
    this.resetBatch();
  }
  end() {
    this.dispatch();
  }
  drawQuad(coords, texCoords, textureBitmap, tintColor, stackLayer, maskLayer) {
    this.drawCount++;
    let t = this.batchTextures.get(textureBitmap.id);
    if (!t) {
      if (this.batchTextures.size >= this.maxTextures) {
        this.dispatch();
      }
      const texture = this.getTexture(textureBitmap);
      t = { index: this.batchTextureCount++, texture };
      this.batchTextures.set(textureBitmap.id, t);
    }
    if (textureBitmap.updateSubImage) {
      const gl = this.gl;
      gl.bindTexture(t.texture.target, t.texture.gl);
      const sub = textureBitmap.updateSubImage();
      gl.texSubImage3D(
        t.texture.target,
        0,
        sub.x,
        sub.y,
        0,
        sub.width,
        sub.height,
        1,
        t.texture.format.external,
        t.texture.format.type,
        sub.source
      );
    }
    this.vertices.pushQuad(coords, texCoords, tintColor, this.viewport, t.index, stackLayer, maskLayer);
  }
  dispatch() {
    if (this.vertices.indexCount === 0) return;
    this.dispatchCount++;
    const gl = this.gl;
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    const bufferData = this.vertices.buffer;
    const requiredSize = bufferData.byteLength;
    if (requiredSize > this.vboSize) {
      gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STREAM_DRAW);
      this.vboSize = requiredSize;
    } else {
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, bufferData);
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.ebo);
    const indexData = this.vertices.indices;
    const indexSize = indexData.byteLength;
    if (indexSize > this.eboSize) {
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexData, gl.STREAM_DRAW);
      this.eboSize = indexSize;
    } else {
      gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, 0, indexData);
    }
    this.textureProgram.use((p) => {
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      const matrix = orthoMatrix$1(0, this.canvas.width, this.canvas.height, 0, -9999, 9999);
      this.gl.uniformMatrix4fv(p.mvpMatrix, false, new Float32Array(matrix));
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      for (const t of this.batchTextures.values()) {
        gl.uniform1i(p.textures[t.index], t.index);
        gl.activeTexture(gl.TEXTURE0 + t.index);
        gl.bindTexture(t.texture.target, t.texture.gl);
      }
      gl.activeTexture(gl.TEXTURE0);
      gl.drawElements(gl.TRIANGLES, this.vertices.indexCount, gl.UNSIGNED_SHORT, 0);
    });
    gl.bindVertexArray(null);
    this.resetBatch();
  }
  resetBatch() {
    this.vertices.reset();
    this.batchTextures = /* @__PURE__ */ new Map();
    this.batchTextureCount = 0;
  }
  getTexture(textureBitmap) {
    const gl = this.gl;
    let texture = this.textures.get(textureBitmap.id);
    if (!texture) {
      const t = gl.createTexture();
      if (!t) throw new Error("Failed to create texture");
      const target = targetTable$1[textureBitmap.source.target];
      if (!target) throw new Error(`Unsupported target: ${textureBitmap.source.target}`);
      const format2 = glFormatFor(textureBitmap.source.format, this.gl, this.ext);
      texture = { target, format: format2, gl: t };
      gl.bindTexture(target, t);
      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
      gl.texParameteri(target, gl.TEXTURE_BASE_LEVEL, 0);
      gl.texParameteri(target, gl.TEXTURE_MAX_LEVEL, textureBitmap.source.levels);
      if (textureBitmap.source.levels === 1) {
        gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      } else {
        gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      }
      if (textureBitmap.source.flags & TextureFlags.TF_NEAREST) {
        gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      } else {
        gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      }
      if (this.ext.textureAnisotropic) {
        const max2 = gl.getParameter(this.ext.textureAnisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
        gl.texParameterf(target, this.ext.textureAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(16, max2));
      }
      if (textureBitmap.source.flags & TextureFlags.TF_CLAMP) {
        gl.texParameteri(target, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(target, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      } else {
        gl.texParameteri(target, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(target, gl.TEXTURE_WRAP_T, gl.REPEAT);
      }
      if (target === gl.TEXTURE_2D_ARRAY) {
        gl.texStorage3D(
          target,
          textureBitmap.source.levels,
          format2.internal,
          textureBitmap.source.width,
          textureBitmap.source.height,
          textureBitmap.source.layers
        );
      } else {
        gl.texStorage2D(
          target,
          textureBitmap.source.levels,
          format2.internal,
          textureBitmap.source.width,
          textureBitmap.source.height
        );
      }
      for (let layer = 0; layer < textureBitmap.source.layers; ++layer) {
        for (let level = 0; level < textureBitmap.source.levels; ++level) {
          if (textureBitmap.source.type === "Image") {
            const image = textureBitmap.source.texture[level];
            if (target === gl.TEXTURE_2D_ARRAY) {
              gl.texSubImage3D(
                target,
                level,
                0,
                0,
                layer,
                image.width,
                image.height,
                1,
                format2.external,
                format2.type,
                image
              );
            } else {
              gl.texSubImage2D(target, level, 0, 0, image.width, image.height, format2.external, format2.type, image);
            }
          } else if (textureBitmap.source.type === "Texture") {
            const extent = textureBitmap.source.texture.extentOf(level);
            const data = textureBitmap.source.texture.dataOf(layer, 0, level);
            if (Format.isCompressed(textureBitmap.source.texture.format)) {
              if (target === gl.TEXTURE_2D_ARRAY) {
                gl.compressedTexSubImage3D(target, level, 0, 0, layer, extent[0], extent[1], 1, format2.internal, data);
              } else {
                gl.compressedTexSubImage2D(target, level, 0, 0, extent[0], extent[1], format2.internal, data);
              }
            } else {
              if (target === gl.TEXTURE_2D_ARRAY) {
                gl.texSubImage3D(
                  target,
                  level,
                  0,
                  0,
                  layer,
                  extent[0],
                  extent[1],
                  1,
                  format2.external,
                  format2.type,
                  new Uint8Array(data.buffer, data.byteOffset, data.byteLength)
                );
              } else {
                gl.texSubImage2D(
                  target,
                  level,
                  0,
                  0,
                  extent[0],
                  extent[1],
                  format2.external,
                  format2.type,
                  new Uint8Array(data.buffer, data.byteOffset, data.byteLength)
                );
              }
            }
          } else {
            textureBitmap.source;
          }
        }
      }
      this.textures.set(textureBitmap.id, texture);
    }
    return texture;
  }
}
const targetTable$1 = {
  [Target.TARGET_1D]: void 0,
  [Target.TARGET_1D_ARRAY]: void 0,
  [Target.TARGET_2D]: WebGL2RenderingContext.TEXTURE_2D,
  [Target.TARGET_2D_ARRAY]: WebGL2RenderingContext.TEXTURE_2D_ARRAY,
  [Target.TARGET_3D]: WebGL2RenderingContext.TEXTURE_3D,
  [Target.TARGET_RECT]: void 0,
  [Target.TARGET_RECT_ARRAY]: void 0,
  [Target.TARGET_CUBE]: WebGL2RenderingContext.TEXTURE_CUBE_MAP,
  [Target.TARGET_CUBE_ARRAY]: void 0
};
const vertexShaderSource = `
struct Uniforms {
  mvpMatrix: mat4x4<f32>,
}

struct VertexInput {
  @location(0) position: vec2<f32>,
  @location(1) texCoord: vec2<f32>,
  @location(2) tintColor: vec4<f32>,
  @location(3) viewport: vec4<f32>,
  @location(4) texId: vec3<f32>,
}

struct VertexOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) screenPos: vec2<f32>,
  @location(1) texCoord: vec2<f32>,
  @location(2) tintColor: vec4<f32>,
  @location(3) viewport: vec4<f32>,
  @location(4) texId: vec3<f32>,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

@vertex
fn vs_main(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;
  output.texCoord = input.texCoord;
  output.tintColor = input.tintColor;
  output.texId = input.texId;

  let vp0 = input.viewport.xy + vec2<f32>(0.0, input.viewport.w);
  let vp1 = input.viewport.xy + vec2<f32>(input.viewport.z, 0.0);
  output.viewport = vec4<f32>(
    (uniforms.mvpMatrix * vec4<f32>(vp0, 0.0, 1.0)).xy,
    (uniforms.mvpMatrix * vec4<f32>(vp1, 0.0, 1.0)).xy
  );

  let pos = uniforms.mvpMatrix * vec4<f32>(input.position + input.viewport.xy, 0.0, 1.0);
  output.screenPos = pos.xy;
  output.position = pos;

  return output;
}
`;
const fragmentShaderSource = (maxTextures) => {
  let sampleCode = "";
  for (let i = 0; i < maxTextures; ++i) {
    sampleCode += `  let color${i} = textureSample(textures${i}, linearSampler, input.texCoord, i32(input.texId.y));
`;
    sampleCode += `  let mask${i} = textureSample(textures${i}, linearSampler, input.texCoord, i32(input.texId.z));
`;
  }
  let selectCode = "";
  for (let i = 0; i < maxTextures; ++i) {
    if (i === 0) {
      selectCode += `  if (input.texId.x < ${i}.5) {
`;
    } else if (i === maxTextures - 1) {
      selectCode += "  } else {\n";
    } else {
      selectCode += `  } else if (input.texId.x < ${i}.5) {
`;
    }
    selectCode += `    color = color${i};
`;
    selectCode += "    if (input.texId.z > -0.5) {\n";
    selectCode += `      color = color * mask${i};
`;
    selectCode += "    }\n";
  }
  selectCode += "  }\n";
  return `
struct VertexOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) screenPos: vec2<f32>,
  @location(1) texCoord: vec2<f32>,
  @location(2) tintColor: vec4<f32>,
  @location(3) viewport: vec4<f32>,
  @location(4) texId: vec3<f32>,
}

@group(0) @binding(1) var linearSampler: sampler;
${Array.from({ length: maxTextures }, (_, i) => `@group(0) @binding(${i + 2}) var textures${i}: texture_2d_array<f32>;`).join("\n")}

@fragment
fn fs_main(input: VertexOutput) -> @location(0) vec4<f32> {
  let x = input.screenPos.x;
  let y = input.screenPos.y;

  if (x < input.viewport.x || x >= input.viewport.z || y < input.viewport.y || y >= input.viewport.w) {
    discard;
  }

  // Sample all textures first to ensure uniform control flow
${sampleCode}

  var color: vec4<f32>;
${selectCode}

  return color * input.tintColor;
}
`;
};
function orthoMatrix(left, right, bottom, top, near, far) {
  return new Float32Array([
    2 / (right - left),
    0,
    0,
    0,
    0,
    2 / (top - bottom),
    0,
    0,
    0,
    0,
    -2 / (far - near),
    0,
    -((right + left) / (right - left)),
    -((top + bottom) / (top - bottom)),
    -0,
    1
  ]);
}
function webgpuFormatFor(format2, supportedFeatures) {
  const desc = webgpuFormatTable[format2];
  if (!desc) {
    log.warn(tag.backend, `Unsupported format: ${format2}, falling back to rgba8unorm`);
    return { format: "rgba8unorm", bytesPerPixel: 4, compressed: false };
  }
  if (desc.compressed) {
    const requiredFeature = getRequiredFeatureForFormat(desc.format);
    if (requiredFeature && !supportedFeatures.has(requiredFeature)) {
      log.warn(tag.backend, `Compressed format ${desc.format} not supported, falling back to rgba8unorm`);
      return { format: "rgba8unorm", bytesPerPixel: 4, compressed: false };
    }
  }
  return desc;
}
function getRequiredFeatureForFormat(format2) {
  if (format2.startsWith("bc")) {
    return "texture-compression-bc";
  }
  if (format2.startsWith("etc2")) {
    return "texture-compression-etc2";
  }
  if (format2.startsWith("astc")) {
    return "texture-compression-astc";
  }
  return null;
}
const webgpuFormatTable = {
  [Format.RGBA8_UNORM_PACK8]: { format: "rgba8unorm", bytesPerPixel: 4, compressed: false },
  [Format.RGBA_DXT1_UNORM_BLOCK8]: { format: "bc1-rgba-unorm", bytesPerPixel: 8, compressed: true },
  // 8 bytes per 4x4 block
  [Format.RGBA_BP_UNORM_BLOCK16]: { format: "bc7-rgba-unorm", bytesPerPixel: 16, compressed: true },
  // 16 bytes per 4x4 block
  [Format.RGB_DXT1_UNORM_BLOCK8]: { format: "bc1-rgba-unorm", bytesPerPixel: 8, compressed: true },
  // 8 bytes per 4x4 block
  [Format.RGBA_DXT3_UNORM_BLOCK16]: { format: "bc2-rgba-unorm", bytesPerPixel: 16, compressed: true },
  // 16 bytes per 4x4 block
  [Format.RGBA_DXT5_UNORM_BLOCK16]: { format: "bc3-rgba-unorm", bytesPerPixel: 16, compressed: true }
  // 16 bytes per 4x4 block
};
const targetTable = {
  [Target.TARGET_1D]: false,
  [Target.TARGET_1D_ARRAY]: false,
  [Target.TARGET_2D]: true,
  [Target.TARGET_2D_ARRAY]: true,
  [Target.TARGET_3D]: true,
  [Target.TARGET_RECT]: false,
  [Target.TARGET_RECT_ARRAY]: false,
  [Target.TARGET_CUBE]: true,
  [Target.TARGET_CUBE_ARRAY]: false
};
class VertexBuffer {
  constructor() {
    __publicField(this, "_buffer");
    __publicField(this, "offset");
    this._buffer = new Float32Array(1024 * 1024);
    this.offset = 0;
  }
  get buffer() {
    return new Float32Array(this._buffer.buffer, 0, this.offset);
  }
  get length() {
    return this.offset / 15;
  }
  reset() {
    this.offset = 0;
  }
  ensureCapacity(requiredSize) {
    if (requiredSize > this._buffer.length) {
      const newSize = Math.max(requiredSize, this._buffer.length * 2);
      const newBuffer = new Float32Array(newSize);
      newBuffer.set(this._buffer);
      this._buffer = newBuffer;
    }
  }
  push(i, coords, texCoords, tintColor, viewport, textureSlot, stackLayer, maskLayer) {
    this.ensureCapacity(this.offset + 15);
    const b = this._buffer;
    b[this.offset++] = coords[i * 2];
    b[this.offset++] = coords[i * 2 + 1];
    b[this.offset++] = texCoords[i * 2];
    b[this.offset++] = texCoords[i * 2 + 1];
    b[this.offset++] = tintColor[0];
    b[this.offset++] = tintColor[1];
    b[this.offset++] = tintColor[2];
    b[this.offset++] = tintColor[3];
    b[this.offset++] = viewport[0];
    b[this.offset++] = viewport[1];
    b[this.offset++] = viewport[2];
    b[this.offset++] = viewport[3];
    b[this.offset++] = textureSlot;
    b[this.offset++] = stackLayer;
    b[this.offset++] = maskLayer;
  }
}
class WebGPUBackend {
  constructor(canvas) {
    __publicField(this, "device", null);
    __publicField(this, "supportedFeatures", /* @__PURE__ */ new Set());
    __publicField(this, "context", null);
    __publicField(this, "pipeline", null);
    __publicField(this, "uniformBuffer", null);
    __publicField(this, "vertexBuffer", null);
    __publicField(this, "linearSampler", null);
    __publicField(this, "nearestSampler", null);
    __publicField(this, "bindGroupLayout", null);
    __publicField(this, "initialized", false);
    __publicField(this, "initPromise");
    __publicField(this, "textures", /* @__PURE__ */ new Map());
    __publicField(this, "viewport", []);
    __publicField(this, "pixelRatio", 1);
    __publicField(this, "vertices", new VertexBuffer());
    __publicField(this, "drawCount", 0);
    __publicField(this, "vertexBufferSize", 0);
    __publicField(this, "maxTextures", 16);
    // WebGPU typically supports at least 16 texture bindings
    __publicField(this, "batchTextures", /* @__PURE__ */ new Map());
    __publicField(this, "batchTextureCount", 0);
    __publicField(this, "dispatchCount", 0);
    __publicField(this, "isFirstDispatchInFrame", true);
    __publicField(this, "defaultWhiteTexture", null);
    __publicField(this, "_canvas");
    this._canvas = canvas;
    this.initPromise = this.init();
  }
  get canvas() {
    return this._canvas;
  }
  async waitForInit() {
    await this.initPromise;
  }
  async init() {
    var _a3, _b3;
    const adapter = await ((_a3 = navigator.gpu) == null ? void 0 : _a3.requestAdapter());
    if (!adapter) {
      throw new Error("WebGPU not supported");
    }
    const requiredFeatures = [];
    if (adapter.features.has("texture-compression-bc")) {
      requiredFeatures.push("texture-compression-bc");
    }
    if (adapter.features.has("texture-compression-etc2")) {
      requiredFeatures.push("texture-compression-etc2");
    }
    if (adapter.features.has("texture-compression-astc")) {
      requiredFeatures.push("texture-compression-astc");
    }
    log.info(tag.backend, "WebGPU adapter features:", Array.from(adapter.features));
    log.info(tag.backend, "Requesting features:", requiredFeatures);
    this.device = await adapter.requestDevice({
      requiredFeatures
    });
    this.supportedFeatures = new Set(requiredFeatures);
    const context = this._canvas.getContext("webgpu");
    if (!context) {
      throw new Error("Failed to get WebGPU context");
    }
    this.context = context;
    const presentationFormat = ((_b3 = navigator.gpu) == null ? void 0 : _b3.getPreferredCanvasFormat()) ?? "bgra8unorm";
    context.configure({
      device: this.device,
      format: presentationFormat,
      alphaMode: "opaque"
    });
    this.linearSampler = this.device.createSampler({
      magFilter: "linear",
      minFilter: "linear",
      mipmapFilter: "linear",
      addressModeU: "repeat",
      addressModeV: "repeat",
      maxAnisotropy: 16
    });
    this.nearestSampler = this.device.createSampler({
      magFilter: "nearest",
      minFilter: "nearest",
      mipmapFilter: "nearest",
      addressModeU: "repeat",
      addressModeV: "repeat"
    });
    const bindGroupLayoutEntries = [
      {
        binding: 0,
        visibility: GPUShaderStage.VERTEX,
        buffer: { type: "uniform" }
      },
      {
        binding: 1,
        visibility: GPUShaderStage.FRAGMENT,
        sampler: {}
      }
    ];
    for (let i = 0; i < this.maxTextures; i++) {
      bindGroupLayoutEntries.push({
        binding: i + 2,
        visibility: GPUShaderStage.FRAGMENT,
        texture: {
          viewDimension: "2d-array",
          sampleType: "float"
        }
      });
    }
    this.bindGroupLayout = this.device.createBindGroupLayout({
      entries: bindGroupLayoutEntries
    });
    const vertexShaderCode = vertexShaderSource;
    const fragmentShaderCode = fragmentShaderSource(this.maxTextures);
    let vertexModule;
    let fragmentModule;
    try {
      vertexModule = this.device.createShaderModule({
        code: vertexShaderCode
      });
    } catch (error) {
      log.error(tag.backend, "Vertex shader compilation failed:", error);
      log.error(tag.backend, "Vertex shader source:\n", vertexShaderCode);
      throw error;
    }
    try {
      fragmentModule = this.device.createShaderModule({
        code: fragmentShaderCode
      });
    } catch (error) {
      log.error(tag.backend, "Fragment shader compilation failed:", error);
      log.error(tag.backend, "Fragment shader source:\n", fragmentShaderCode);
      throw error;
    }
    this.pipeline = this.device.createRenderPipeline({
      layout: this.device.createPipelineLayout({
        bindGroupLayouts: [this.bindGroupLayout]
      }),
      vertex: {
        module: vertexModule,
        entryPoint: "vs_main",
        buffers: [
          {
            arrayStride: 60,
            // 15 floats * 4 bytes
            attributes: [
              { shaderLocation: 0, offset: 0, format: "float32x2" },
              // position
              { shaderLocation: 1, offset: 8, format: "float32x2" },
              // texCoord
              { shaderLocation: 2, offset: 16, format: "float32x4" },
              // tintColor
              { shaderLocation: 3, offset: 32, format: "float32x4" },
              // viewport
              { shaderLocation: 4, offset: 48, format: "float32x3" }
              // texId
            ]
          }
        ]
      },
      fragment: {
        module: fragmentModule,
        entryPoint: "fs_main",
        targets: [
          {
            format: presentationFormat,
            blend: {
              color: {
                srcFactor: "src-alpha",
                dstFactor: "one-minus-src-alpha",
                operation: "add"
              },
              alpha: {
                srcFactor: "one",
                dstFactor: "one-minus-src-alpha",
                operation: "add"
              }
            }
          }
        ]
      },
      primitive: {
        topology: "triangle-list"
      }
    });
    this.uniformBuffer = this.device.createBuffer({
      size: 64,
      // 4x4 matrix
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    });
    this.vertexBuffer = this.device.createBuffer({
      size: 1024 * 1024 * 4,
      // Match WebGL backend size
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
    });
    this.setViewport(0, 0, this._canvas.width, this._canvas.height);
    this.defaultWhiteTexture = this.createDefaultTexture();
    this.initialized = true;
    log.info(tag.backend, "WebGPU backend initialized");
  }
  resize(width, height, pixelRatio) {
    this._canvas.width = width;
    this._canvas.height = height;
    this.pixelRatio = pixelRatio;
    this.setViewport(0, 0, width, height);
    log.debug(tag.backend, `resize: ${width}x${height}(x${pixelRatio})`);
  }
  setViewport(x, y, width, height) {
    this.viewport = [x, y, width, height];
  }
  beginFrame() {
    this.isFirstDispatchInFrame = true;
  }
  begin() {
    this.resetBatch();
  }
  end() {
    if (!this.initialized) {
      return;
    }
    this.dispatch();
  }
  drawQuad(coords, texCoords, textureBitmap, tintColor, stackLayer, maskLayer) {
    this.drawCount++;
    let t = this.batchTextures.get(textureBitmap.id);
    if (!t) {
      if (this.batchTextures.size >= this.maxTextures) {
        this.dispatch();
      }
      const texture = this.getTexture(textureBitmap);
      t = { index: this.batchTextureCount++, texture };
      this.batchTextures.set(textureBitmap.id, t);
    }
    if (textureBitmap.updateSubImage && this.device) {
      const sub = textureBitmap.updateSubImage();
      const storedTexture = this.textures.get(textureBitmap.id);
      const bytesPerPixel = (storedTexture == null ? void 0 : storedTexture.formatDesc.bytesPerPixel) ?? 4;
      this.device.queue.writeTexture(
        { texture: t.texture, origin: { x: sub.x, y: sub.y } },
        sub.source,
        { bytesPerRow: sub.width * bytesPerPixel },
        { width: sub.width, height: sub.height, depthOrArrayLayers: 1 }
      );
    }
    for (const i of [0, 1, 2, 0, 2, 3]) {
      this.vertices.push(i, coords, texCoords, tintColor, this.viewport, t.index, stackLayer, maskLayer);
    }
  }
  dispatch() {
    var _a3;
    if (!this.device || !this.context || !this.pipeline || this.vertices.length === 0) return;
    this.dispatchCount++;
    const matrix = orthoMatrix(0, this.canvas.width, this.canvas.height, 0, -9999, 9999);
    this.device.queue.writeBuffer(this.uniformBuffer, 0, matrix);
    const bufferData = this.vertices.buffer;
    const requiredSize = bufferData.byteLength;
    if (requiredSize > this.vertexBufferSize) {
      (_a3 = this.vertexBuffer) == null ? void 0 : _a3.destroy();
      this.vertexBuffer = this.device.createBuffer({
        size: requiredSize,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
      });
      this.vertexBufferSize = requiredSize;
    }
    this.device.queue.writeBuffer(this.vertexBuffer, 0, bufferData);
    const bindGroupEntries = [
      { binding: 0, resource: { buffer: this.uniformBuffer } },
      { binding: 1, resource: this.linearSampler }
    ];
    const textureSlots = new Array(this.maxTextures).fill(this.defaultWhiteTexture);
    for (const t of this.batchTextures.values()) {
      if (t.index < this.maxTextures) {
        textureSlots[t.index] = t.texture;
      }
    }
    for (let i = 0; i < this.maxTextures; i++) {
      const texture = textureSlots[i];
      bindGroupEntries.push({
        binding: i + 2,
        resource: texture.createView({ dimension: "2d-array" })
      });
    }
    const bindGroup = this.device.createBindGroup({
      layout: this.bindGroupLayout,
      entries: bindGroupEntries
    });
    const commandEncoder = this.device.createCommandEncoder();
    const textureView = this.context.getCurrentTexture().createView();
    const renderPass = commandEncoder.beginRenderPass({
      colorAttachments: [
        {
          view: textureView,
          clearValue: { r: 0, g: 0, b: 0, a: 1 },
          loadOp: this.isFirstDispatchInFrame ? "clear" : "load",
          storeOp: "store"
        }
      ]
    });
    this.isFirstDispatchInFrame = false;
    renderPass.setPipeline(this.pipeline);
    renderPass.setBindGroup(0, bindGroup);
    renderPass.setVertexBuffer(0, this.vertexBuffer);
    renderPass.setViewport(0, 0, this.canvas.width, this.canvas.height, 0, 1);
    renderPass.draw(this.vertices.length);
    renderPass.end();
    this.device.queue.submit([commandEncoder.finish()]);
    this.resetBatch();
  }
  resetBatch() {
    this.vertices.reset();
    this.batchTextures = /* @__PURE__ */ new Map();
    this.batchTextureCount = 0;
  }
  createDefaultTexture() {
    if (!this.device) throw new Error("Device not initialized");
    const texture = this.device.createTexture({
      size: { width: 8, height: 8, depthOrArrayLayers: 1 },
      format: "rgba8unorm",
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
      mipLevelCount: 1,
      dimension: "2d"
    });
    const data = new Uint8Array(8 * 8 * 4).fill(0);
    this.device.queue.writeTexture(
      { texture, mipLevel: 0 },
      data,
      { bytesPerRow: 8 * 4 },
      { width: 8, height: 8, depthOrArrayLayers: 1 }
    );
    return texture;
  }
  getTexture(textureBitmap) {
    if (!this.device) throw new Error("Device not initialized");
    let texture = this.textures.get(textureBitmap.id);
    if (!texture) {
      const source = textureBitmap.source;
      if (!targetTable[source.target]) {
        throw new Error(`Unsupported target: ${source.target}`);
      }
      const formatDesc = source.type === "Image" ? { format: "rgba8unorm", bytesPerPixel: 4, compressed: false } : webgpuFormatFor(source.format, this.supportedFeatures);
      const mipLevels = Math.max(1, source.levels);
      const arrayLayers = Math.max(1, source.layers);
      const gpuTexture = this.device.createTexture({
        size: {
          width: source.width,
          height: source.height,
          depthOrArrayLayers: arrayLayers
        },
        format: formatDesc.format,
        usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
        mipLevelCount: mipLevels,
        dimension: "2d"
      });
      for (let layer = 0; layer < arrayLayers; ++layer) {
        for (let level = 0; level < mipLevels; ++level) {
          if (source.type === "Image") {
            if (level < source.levels && (source.target === Target.TARGET_2D_ARRAY || layer === 0)) {
              const image = source.texture[level];
              if ("data" in image) {
                const imageData = image.data;
                this.device.queue.writeTexture(
                  { texture: gpuTexture, mipLevel: level, origin: { z: layer } },
                  imageData,
                  { bytesPerRow: image.width * 4 },
                  // ImageData is always RGBA8
                  { width: image.width, height: image.height, depthOrArrayLayers: 1 }
                );
              } else {
                const canvas = new OffscreenCanvas(image.width, image.height);
                const ctx = canvas.getContext("2d");
                ctx.drawImage(image, 0, 0);
                const imageData = ctx.getImageData(0, 0, image.width, image.height);
                this.device.queue.writeTexture(
                  { texture: gpuTexture, mipLevel: level, origin: { z: layer } },
                  imageData.data,
                  { bytesPerRow: image.width * 4 },
                  // ImageData is always RGBA8
                  { width: image.width, height: image.height, depthOrArrayLayers: 1 }
                );
              }
            }
          } else if (source.type === "Texture") {
            if (level < source.levels && layer < source.layers) {
              const extent = source.texture.extentOf(level);
              const data = source.texture.dataOf(layer, 0, level);
              if (Format.isCompressed(source.texture.format)) {
                if (formatDesc.compressed) {
                  const blocksWide = Math.ceil(extent[0] / 4);
                  const blocksHigh = Math.ceil(extent[1] / 4);
                  const bytesPerRow = blocksWide * formatDesc.bytesPerPixel;
                  const alignedWidth = Math.max(4, Math.ceil(extent[0] / 4) * 4);
                  const alignedHeight = Math.max(4, Math.ceil(extent[1] / 4) * 4);
                  this.device.queue.writeTexture(
                    { texture: gpuTexture, mipLevel: level, origin: { z: layer } },
                    new Uint8Array(data.buffer, data.byteOffset, data.byteLength),
                    {
                      bytesPerRow,
                      rowsPerImage: blocksHigh
                    },
                    { width: alignedWidth, height: alignedHeight, depthOrArrayLayers: 1 }
                  );
                } else {
                  log.warn(tag.backend, `Compressed texture format ${source.format} not supported, skipping`);
                }
              } else {
                this.device.queue.writeTexture(
                  { texture: gpuTexture, mipLevel: level, origin: { z: layer } },
                  new Uint8Array(data.buffer, data.byteOffset, data.byteLength),
                  { bytesPerRow: extent[0] * formatDesc.bytesPerPixel },
                  { width: extent[0], height: extent[1], depthOrArrayLayers: 1 }
                );
              }
            }
          }
        }
      }
      texture = { texture: gpuTexture, formatDesc };
      this.textures.set(textureBitmap.id, texture);
    }
    return texture.texture;
  }
}
function WorkerWrapper(options) {
  return new Worker(
    "" + new URL("sub-CnsX6MZA.js", import.meta.url).href,
    {
      type: "module",
      name: options == null ? void 0 : options.name
    }
  );
}
const version$1 = 1;
const entries$1 = { "/driver.mjs": { "dev": 147032898, "mode": 33206, "nlink": 1, "uid": 0, "gid": 0, "rdev": 0, "blksize": 4096, "ino": 2251799814455069, "size": 507816, "blocks": 992, "atimeMs": 17839468890252473e-4, "mtimeMs": 17839468645482344e-4, "ctimeMs": 17839468645482344e-4, "birthtimeMs": 17839467368630425e-4 }, "/driver.mjs.symbols": { "dev": 147032898, "mode": 33206, "nlink": 1, "uid": 0, "gid": 0, "rdev": 0, "blksize": 4096, "ino": 4222124651429631, "size": 666e3, "blocks": 1304, "atimeMs": 17839468887733035e-4, "mtimeMs": 17839468641990122e-4, "ctimeMs": 17839468641990122e-4, "birthtimeMs": 17839467364686194e-4 }, "/driver.wasm": { "dev": 147032898, "mode": 33206, "nlink": 1, "uid": 0, "gid": 0, "rdev": 0, "blksize": 4096, "ino": 3377699721297954, "size": 3707379, "blocks": 7248, "atimeMs": 17839468892087974e-4, "mtimeMs": 17839468626158464e-4, "ctimeMs": 17839468626158464e-4, "birthtimeMs": 1783946849008491e-3 }, "/lua-utf8.wasm": { "dev": 147032898, "mode": 33206, "nlink": 1, "uid": 0, "gid": 0, "rdev": 0, "blksize": 4096, "ino": 1688849861034031, "size": 155419, "blocks": 304, "atimeMs": 1783946889318138e-3, "mtimeMs": 17839468028290579e-4, "ctimeMs": 17839468028290579e-4, "birthtimeMs": 17839468020603564e-4 }, "/": { "dev": 147032898, "mode": 16822, "nlink": 1, "uid": 0, "gid": 0, "rdev": 0, "blksize": 4096, "ino": 562949954186314, "size": 0, "blocks": 0, "atimeMs": 17839474700240112e-4, "mtimeMs": 17839468490196606e-4, "ctimeMs": 17839468490196606e-4, "birthtimeMs": 1783946520895112e-3 } };
var indexDebug = {
  version: version$1,
  entries: entries$1
};
const version = 1;
const entries = { "/driver.mjs": { "dev": 147032898, "mode": 33206, "nlink": 1, "uid": 0, "gid": 0, "rdev": 0, "blksize": 4096, "ino": 2251799814455069, "size": 507816, "blocks": 992, "atimeMs": 17839468890252473e-4, "mtimeMs": 17839468645482344e-4, "ctimeMs": 17839468645482344e-4, "birthtimeMs": 17839467368630425e-4 }, "/driver.mjs.symbols": { "dev": 147032898, "mode": 33206, "nlink": 1, "uid": 0, "gid": 0, "rdev": 0, "blksize": 4096, "ino": 4222124651429631, "size": 666e3, "blocks": 1304, "atimeMs": 17839468887733035e-4, "mtimeMs": 17839468641990122e-4, "ctimeMs": 17839468641990122e-4, "birthtimeMs": 17839467364686194e-4 }, "/driver.wasm": { "dev": 147032898, "mode": 33206, "nlink": 1, "uid": 0, "gid": 0, "rdev": 0, "blksize": 4096, "ino": 3377699721297954, "size": 3707379, "blocks": 7248, "atimeMs": 17839468892087974e-4, "mtimeMs": 17839468626158464e-4, "ctimeMs": 17839468626158464e-4, "birthtimeMs": 1783946849008491e-3 }, "/lua-utf8.wasm": { "dev": 147032898, "mode": 33206, "nlink": 1, "uid": 0, "gid": 0, "rdev": 0, "blksize": 4096, "ino": 1688849861034031, "size": 155419, "blocks": 304, "atimeMs": 1783946889318138e-3, "mtimeMs": 17839468028290579e-4, "ctimeMs": 17839468028290579e-4, "birthtimeMs": 17839468020603564e-4 }, "/": { "dev": 147032898, "mode": 16822, "nlink": 1, "uid": 0, "gid": 0, "rdev": 0, "blksize": 4096, "ino": 562949954186314, "size": 0, "blocks": 0, "atimeMs": 17839474700240112e-4, "mtimeMs": 17839468490196606e-4, "ctimeMs": 17839468490196606e-4, "birthtimeMs": 1783946520895112e-3 } };
var indexRelease = {
  version,
  entries
};
const fetchIndex = {
  debug: indexDebug,
  release: indexRelease
};
class SubScriptHost {
  constructor(script, funcs, subs, data, onFinished, onError, onFetch) {
    __publicField(this, "worker");
    __publicField(this, "subScriptWorker");
    this.script = script;
    this.funcs = funcs;
    this.subs = subs;
    this.data = data;
    this.onFinished = onFinished;
    this.onError = onError;
    this.onFetch = onFetch;
  }
  async start() {
    this.worker = new WorkerWrapper();
    this.subScriptWorker = wrap(this.worker);
    this.subScriptWorker.start(
      this.script,
      this.data,
      proxy(this.onFinished),
      proxy(this.onError),
      proxy(this.onFetch)
    ).then(() => {
    });
  }
  async terminate() {
    var _a3;
    (_a3 = this.worker) == null ? void 0 : _a3.terminate();
    this.worker = void 0;
  }
  isRunning() {
    return this.worker !== void 0;
  }
}
class DriverWorker {
  constructor() {
    __publicField(this, "imageRepo");
    __publicField(this, "textMetrics");
    __publicField(this, "textRasterizer");
    __publicField(this, "renderer");
    __publicField(this, "screenSize", {
      width: 800,
      height: 600,
      pixelRatio: 1
    });
    __publicField(this, "mouseState", { x: 0, y: 0 });
    __publicField(this, "pressedKeys", /* @__PURE__ */ new Set());
    __publicField(this, "hostCallbacks");
    __publicField(this, "mainCallbacks");
    __publicField(this, "imports");
    __publicField(this, "dirtyCount", 0);
    __publicField(this, "_frameScheduled", false);
    __publicField(this, "subScriptIndex", 1);
    __publicField(this, "subScripts", []);
    __publicField(this, "visible", false);
  }
  async start(build, assetPrefix, fileSystemConfig, onError, onFrame, onFetch, onTitleChange, copy, paste, openUrl) {
    var _a3, _b3;
    this.imageRepo = new ImageRepository(`${assetPrefix}/root/`);
    await loadFonts();
    this.textMetrics = new TextMetrics();
    this.textRasterizer = new BinPackingTextRasterizer(this.textMetrics);
    this.renderer = new Renderer(this.imageRepo, this.textRasterizer, this.screenSize);
    this.hostCallbacks = {
      onError,
      onFrame,
      onFetch,
      onTitleChange
    };
    this.mainCallbacks = {
      copy,
      paste,
      openUrl
    };
    const driver = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "../../dist/release/driver.mjs": () => import("./driver-ftvsJzzb.js") }), `../../dist/${build}/driver.mjs`, 5);
    const module = await driver.default({
      print: console.log,
      printErr: console.warn
    });
    const fetchBase = import.meta.resolve(`../../dist/${build}/`);
    const rootZip = await fetch(`${assetPrefix}/root.zip`);
    await configure({
      mounts: {
        "/root": {
          backend: Zip,
          data: await rootZip.arrayBuffer(),
          name: "root.zip"
        },
        "/lib/lua": {
          backend: Fetch,
          index: fetchIndex[build],
          baseUrl: fetchBase
        },
        "/user": {
          backend: WebAccess,
          handle: await navigator.storage.getDirectory(),
          disableAsyncCache: true
        }
      }
    });
    if (fileSystemConfig.cloudflareKvAccessToken) {
      const kvFs = await resolveMountConfig({
        backend: CloudflareKV,
        prefix: fileSystemConfig.cloudflareKvPrefix,
        token: fileSystemConfig.cloudflareKvAccessToken,
        namespace: fileSystemConfig.cloudflareKvUserNamespace
      });
      const pobUserDir = `/user/${fileSystemConfig.userDirectory}`;
      const cloudDir = `${pobUserDir}/Builds/Cloud`;
      if (!await exists$1(cloudDir)) await mkdir$1(cloudDir, { recursive: true });
      mount$1(cloudDir, kvFs);
      const publicDir = `${cloudDir}/Public`;
      if (!await exists$1(publicDir)) await mkdir$1(publicDir);
    }
    Object.assign(module, this.exports(module));
    this.imports = this.resolveImports(module);
    await ((_a3 = this.imports) == null ? void 0 : _a3.init());
    await ((_b3 = this.imports) == null ? void 0 : _b3.start());
    this.invalidate();
  }
  destroy() {
  }
  async setCanvas(canvas, useWebGPU) {
    try {
      if (useWebGPU && "gpu" in navigator) {
        const backend = new WebGPUBackend(canvas);
        await backend.waitForInit();
        if (this.renderer) {
          this.renderer.backend = backend;
        }
        log.info(tag.backend, "Using WebGPU backend");
      } else {
        const backend = new WebGL1Backend(canvas);
        if (this.renderer) {
          this.renderer.backend = backend;
        }
        log.info(tag.backend, "Using WebGL2 backend");
      }
    } catch (error) {
      log.warn(tag.backend, "Failed to initialize WebGPU, falling back to WebGL2", error);
      const backend = new WebGL1Backend(canvas);
      if (this.renderer) {
        this.renderer.backend = backend;
      }
    }
  }
  resize(size) {
    var _a3;
    this.screenSize = size;
    (_a3 = this.renderer) == null ? void 0 : _a3.resize(size);
    this.invalidate();
  }
  invalidate() {
    this.dirtyCount = 2;
    this.scheduleFrame();
  }
  scheduleFrame() {
    if (!this._frameScheduled) {
      this._frameScheduled = true;
      requestAnimationFrame(() => this.tick());
    }
  }
  updateMouseState(mouseState) {
    this.mouseState = mouseState;
  }
  updateKeyboardState(keys) {
    this.pressedKeys = keys;
  }
  handleMouseMove(mouseState) {
    this.mouseState = mouseState;
    this.invalidate();
  }
  handleKeyDown(name, doubleClick) {
    var _a3;
    (_a3 = this.imports) == null ? void 0 : _a3.onKeyDown(name, doubleClick);
    this.invalidate();
  }
  handleKeyUp(name, doubleClick) {
    var _a3;
    (_a3 = this.imports) == null ? void 0 : _a3.onKeyUp(name, doubleClick);
    this.invalidate();
  }
  handleChar(char, doubleClick) {
    var _a3;
    (_a3 = this.imports) == null ? void 0 : _a3.onChar(char, doubleClick);
    this.invalidate();
  }
  handleVisibilityChange(visible) {
    this.visible = visible;
    if (visible) {
      this.invalidate();
    }
  }
  async loadBuildFromCode(code) {
    var _a3;
    const status = await ((_a3 = this.imports) == null ? void 0 : _a3.loadBuildFromCode(code));
    if (status !== void 0 && status !== 0) {
      throw new Error(`loadBuildFromCode failed (status=${status})`);
    }
    this.invalidate();
  }
  setLayerVisible(layer, sublayer, visible) {
    var _a3;
    (_a3 = this.renderer) == null ? void 0 : _a3.setLayerVisible(layer, sublayer, visible);
    this.invalidate();
  }
  async tick() {
    var _a3, _b3, _c2, _d;
    this._frameScheduled = false;
    if (this.visible && this.dirtyCount > 0) {
      try {
        const start = performance.now();
        await ((_a3 = this.imports) == null ? void 0 : _a3.onFrame());
        const time = performance.now() - start;
        const stats = (_b3 = this.renderer) == null ? void 0 : _b3.getStats();
        (_c2 = this.hostCallbacks) == null ? void 0 : _c2.onFrame(start, time, stats);
        this.dirtyCount -= 1;
      } catch (error) {
        log.error(tag.worker, "Error during frame processing", error);
        (_d = this.hostCallbacks) == null ? void 0 : _d.onError(error);
        throw error;
      }
    }
    if (this.visible && this.dirtyCount > 0) {
      this.scheduleFrame();
    }
  }
  resolveImports(module) {
    return {
      init: module.cwrap("init", "number", [], { async: true }),
      start: module.cwrap("start", "number", [], { async: true }),
      loadBuildFromCode: module.cwrap("load_build_from_code", "number", ["string"], { async: true }),
      onFrame: module.cwrap("on_frame", "number", [], { async: true }),
      onKeyUp: module.cwrap("on_key_up", "number", ["string", "number"]),
      onKeyDown: module.cwrap("on_key_down", "number", ["string", "number"]),
      onChar: module.cwrap("on_char", "number", ["string", "number"]),
      onDownloadPageResult: module.cwrap("on_download_page_result", "number", ["string"]),
      onSubScriptFinished: module.cwrap("on_subscript_finished", "number", ["number", "number"]),
      onSubScriptError: module.cwrap("on_subscript_error", "number", ["number", "string"])
    };
  }
  exports(module) {
    return {
      fs,
      onError: (message) => {
        var _a3;
        return (_a3 = this.hostCallbacks) == null ? void 0 : _a3.onError(new Error(`Error in lua: ${message}`));
      },
      setWindowTitle: (title) => {
        var _a3;
        return (_a3 = this.hostCallbacks) == null ? void 0 : _a3.onTitleChange(title);
      },
      getScreenWidth: () => this.screenSize.width,
      getScreenHeight: () => this.screenSize.height,
      getCursorPosX: () => this.mouseState.x,
      getCursorPosY: () => this.mouseState.y,
      isKeyDown: (name) => this.pressedKeys.has(name),
      imageLoad: (handle, filename, flags) => {
        var _a3;
        (_a3 = this.imageRepo) == null ? void 0 : _a3.load(handle, filename, flags).then(() => {
          this.invalidate();
        });
      },
      drawCommit: (bufferPtr, size) => {
        var _a3;
        (_a3 = this.renderer) == null ? void 0 : _a3.render(new DataView(module.HEAPU8.buffer, bufferPtr, size));
      },
      getStringWidth: (size, font2, text) => {
        var _a3;
        return ((_a3 = this.textMetrics) == null ? void 0 : _a3.measure(size, font2, text)) ?? 0;
      },
      getStringCursorIndex: (size, font2, text, cursorX, cursorY) => {
        var _a3;
        return ((_a3 = this.textMetrics) == null ? void 0 : _a3.measureCursorIndex(size, font2, text, cursorX, cursorY)) ?? 0;
      },
      copy: (text) => {
        var _a3;
        return (_a3 = this.mainCallbacks) == null ? void 0 : _a3.copy(text);
      },
      paste: () => {
        var _a3;
        return (_a3 = this.mainCallbacks) == null ? void 0 : _a3.paste();
      },
      openUrl: (url) => {
        var _a3;
        return (_a3 = this.mainCallbacks) == null ? void 0 : _a3.openUrl(url);
      },
      launchSubScript: async (script, funcs, subs, size, data) => {
        var _a3;
        const id = this.subScriptIndex;
        const dataArray = new Uint8Array(size);
        dataArray.set(new Uint8Array(module.HEAPU8.buffer, data, size));
        const subScript = new SubScriptHost(
          script,
          funcs,
          subs,
          dataArray,
          (data2) => {
            var _a4, _b3;
            (_a4 = this.subScripts[id]) == null ? void 0 : _a4.terminate();
            delete this.subScripts[id];
            const wasmData = module._malloc(data2.length);
            module.HEAPU8.set(data2, wasmData);
            const ret = (_b3 = this.imports) == null ? void 0 : _b3.onSubScriptFinished(id, wasmData);
            module._free(wasmData);
            log.debug(tag.subscript, "onSubScriptFinished callback done", { ret });
            this.invalidate();
          },
          (message) => {
            var _a4, _b3;
            (_a4 = this.subScripts[id]) == null ? void 0 : _a4.terminate();
            delete this.subScripts[id];
            const ret = (_b3 = this.imports) == null ? void 0 : _b3.onSubScriptError(id, message);
            log.debug(tag.subscript, "onSubScriptError callback done", { ret });
            this.invalidate();
          },
          ((_a3 = this.hostCallbacks) == null ? void 0 : _a3.onFetch) ?? (() => Promise.resolve({ error: "onFetch not implemented", body: "", headers: {}, status: 500 }))
        );
        this.subScripts[id] = subScript;
        await subScript.start();
        return this.subScriptIndex++;
      },
      abortSubScript: async (id) => {
        var _a3;
        await ((_a3 = this.subScripts[id]) == null ? void 0 : _a3.terminate());
      },
      isSubScriptRunning: (id) => {
        var _a3;
        return ((_a3 = this.subScripts[id]) == null ? void 0 : _a3.isRunning()) ?? false;
      }
    };
  }
}
const worker = new DriverWorker();
expose(worker);
//# sourceMappingURL=worker-BhJdjD0P.js.map
