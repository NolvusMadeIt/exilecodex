import { create } from "zustand";
import { persist } from "zustand/middleware";

// Ported verbatim from the Marketplace Companion (store/watch.ts) — watchlists + price alerts,
// persisted to localStorage. Identical behavior to the original.

export interface PriceAlert {
  targetEx: number;
  dir: "above" | "below";
  enabled: boolean;
}

export interface Watchlist {
  id: string;
  name: string;
  items: string[];
}

export interface WatchExport {
  v: 1;
  lists: Watchlist[];
  alerts: Record<string, PriceAlert>;
}

interface WatchState {
  lists: Watchlist[];
  activeId: string;
  alerts: Record<string, PriceAlert>;
  triggered: Record<string, number>;
  createList: (name: string) => string;
  renameList: (id: string, name: string) => void;
  deleteList: (id: string) => void;
  setActive: (id: string) => void;
  toggleWatch: (apiId: string, listId?: string) => void;
  setAlert: (apiId: string, alert: PriceAlert) => void;
  clearAlert: (apiId: string) => void;
  markTriggered: (apiId: string, at: number) => void;
  clearTriggered: (apiId: string) => void;
  exportJSON: () => string;
  importJSON: (json: string, mode: "replace" | "merge") => boolean;
}

function uid(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "l" + Math.floor(Math.random() * 1e9).toString(36);
}

const DEFAULT_ID = "default";

export const useWatch = create<WatchState>()(
  persist(
    (set, get) => ({
      lists: [{ id: DEFAULT_ID, name: "My Watchlist", items: [] }],
      activeId: DEFAULT_ID,
      alerts: {},
      triggered: {},

      createList: (name) => {
        const id = uid();
        set((s) => ({
          lists: [...s.lists, { id, name: name.trim() || "New List", items: [] }],
          activeId: id,
        }));
        return id;
      },

      renameList: (id, name) =>
        set((s) => ({
          lists: s.lists.map((l) => (l.id === id ? { ...l, name: name.trim() || l.name } : l)),
        })),

      deleteList: (id) =>
        set((s) => {
          if (s.lists.length <= 1) return s;
          const lists = s.lists.filter((l) => l.id !== id);
          return { lists, activeId: s.activeId === id ? lists[0].id : s.activeId };
        }),

      setActive: (id) => set({ activeId: id }),

      toggleWatch: (apiId, listId) =>
        set((s) => {
          const target = listId ?? s.activeId;
          return {
            lists: s.lists.map((l) => {
              if (l.id !== target) return l;
              const has = l.items.includes(apiId);
              return { ...l, items: has ? l.items.filter((x) => x !== apiId) : [...l.items, apiId] };
            }),
          };
        }),

      setAlert: (apiId, alert) =>
        set((s) => ({
          alerts: { ...s.alerts, [apiId]: alert },
          triggered: { ...s.triggered, [apiId]: 0 },
        })),

      clearAlert: (apiId) =>
        set((s) => {
          const alerts = { ...s.alerts };
          delete alerts[apiId];
          const triggered = { ...s.triggered };
          delete triggered[apiId];
          return { alerts, triggered };
        }),

      markTriggered: (apiId, at) => set((s) => ({ triggered: { ...s.triggered, [apiId]: at } })),

      clearTriggered: (apiId) => set((s) => ({ triggered: { ...s.triggered, [apiId]: 0 } })),

      exportJSON: () => {
        const { lists, alerts } = get();
        const data: WatchExport = { v: 1, lists, alerts };
        return JSON.stringify(data, null, 2);
      },

      importJSON: (json, mode) => {
        try {
          const data = JSON.parse(json) as Partial<WatchExport>;
          if (!Array.isArray(data.lists)) return false;
          const incoming = data.lists
            .filter((l) => l && typeof l.name === "string" && Array.isArray(l.items))
            .map((l) => ({
              id: typeof l.id === "string" ? l.id : uid(),
              name: l.name as string,
              items: (l.items as unknown[]).filter((x): x is string => typeof x === "string"),
            }));
          if (!incoming.length) return false;
          const alerts = data.alerts && typeof data.alerts === "object" ? data.alerts : {};
          set((s) => {
            if (mode === "replace") {
              return { lists: incoming, activeId: incoming[0].id, alerts, triggered: {} };
            }
            const byId = new Map(s.lists.map((l) => [l.id, l]));
            for (const l of incoming) byId.set(l.id, l);
            return { lists: [...byId.values()], alerts: { ...s.alerts, ...alerts } };
          });
          return true;
        } catch {
          return false;
        }
      },
    }),
    { name: "poe2companion-watch" },
  ),
);

export function isWatched(lists: Watchlist[], activeId: string, apiId: string): boolean {
  const l = lists.find((x) => x.id === activeId);
  return !!l && l.items.includes(apiId);
}

export function inAnyList(lists: Watchlist[], apiId: string): boolean {
  return lists.some((l) => l.items.includes(apiId));
}
