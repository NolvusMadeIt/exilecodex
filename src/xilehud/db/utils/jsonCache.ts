/*
 * Vendored from XileHUD — https://github.com/XileHUD/poe_overlay (GPL-3.0).
 * (c) XileHUD contributors. See /LICENSE and /ATTRIBUTION.md.
 * Upstream: v0.6.11. Modifications, if any, are marked with XILE-PORT comments.
 */

// XILE-PORT: browser I/O — fetch replaces fs. Our dataset snapshots are immutable static
// files, so the upstream mtime-based invalidation degrades to a constant (cache always valid
// until force/clear), which matches how the data actually behaves here.
const fsp = {
  stat: async (_p: string) => ({ mtimeMs: 0 }),
  readFile: async (p: string, _enc?: string): Promise<string> => {
    const res = await fetch(p);
    if (!res.ok) throw Object.assign(new Error(`HTTP ${res.status} for ${p}`), { code: res.status === 404 ? 'ENOENT' : undefined });
    return res.text();
  },
};

export type JsonLoader<T> = (raw: string) => T;

interface CacheEntry<T> {
  data: T;
  mtimeMs: number;
}

const defaultLoader: JsonLoader<any> = (raw: string) => JSON.parse(raw);

function cloneValue<T>(value: T): T {
  if (value === null || typeof value !== 'object') {
    return value;
  }
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
}

export interface JsonCacheOptions {
  cloneResults?: boolean;
}

export interface GetOptions<T> {
  force?: boolean;
  loader?: JsonLoader<T>;
  clone?: boolean;
}

export class JsonCache {
  private readonly entries = new Map<string, CacheEntry<any>>();
  private readonly inflight = new Map<string, Promise<any>>();
  private readonly cloneResults: boolean;

  constructor(options: JsonCacheOptions = {}) {
    this.cloneResults = Boolean(options.cloneResults);
  }

  clear(filePath?: string): void {
    if (filePath) {
      this.entries.delete(filePath);
      return;
    }
    this.entries.clear();
  }

  async get<T = unknown>(filePath: string, options: GetOptions<T> = {}): Promise<T> {
    const { force = false } = options;
    const loader = options.loader ?? (defaultLoader as JsonLoader<T>);
    const shouldClone = options.clone ?? this.cloneResults;

    if (force) {
      this.entries.delete(filePath);
    } else {
      const cached = this.entries.get(filePath);
      if (cached) {
        try {
          const stats = await fsp.stat(filePath);
          if (stats.mtimeMs === cached.mtimeMs) {
            return shouldClone ? cloneValue<T>(cached.data) : cached.data;
          }
        } catch (err: any) {
          if (err && err.code !== 'ENOENT') {
            throw err;
          }
          // File removed - drop cache and fall through to reload
          this.entries.delete(filePath);
        }
      }
    }

    if (this.inflight.has(filePath)) {
      const result = await this.inflight.get(filePath)!;
      return shouldClone ? cloneValue<T>(result) : result;
    }

    const loadPromise = (async () => {
      const stats = await fsp.stat(filePath);
      const raw = await fsp.readFile(filePath, 'utf8');
      let parsed: T;
      try {
        parsed = loader(raw);
      } catch (err: any) {
        throw Object.assign(err instanceof Error ? err : new Error(String(err)), { filePath });
      }
      this.entries.set(filePath, { data: parsed, mtimeMs: stats.mtimeMs });
      return parsed;
    })();

    this.inflight.set(filePath, loadPromise);

    try {
      const data = await loadPromise;
      return shouldClone ? cloneValue<T>(data) : data;
    } finally {
      this.inflight.delete(filePath);
    }
  }

  async prime(filePath: string): Promise<void> {
    await this.get(filePath);
  }
}
