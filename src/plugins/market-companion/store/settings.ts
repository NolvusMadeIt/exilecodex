import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BaseCurrency } from "../../../lib/market/types";

// Ported verbatim from the Marketplace Companion (store/settings.ts) — the market plugin's own
// league/base/refresh/detail-width/sound settings, persisted to localStorage. Kept as the
// Companion had it so behavior is identical.
export const DEFAULT_DETAIL_WIDTH = 540;

export const REFRESH_OPTIONS = [
  { value: 60_000, label: "Every minute" },
  { value: 120_000, label: "Every 2 minutes" },
  { value: 300_000, label: "Every 5 minutes" },
  { value: 0, label: "Off" },
];

interface SettingsState {
  league: string | null;
  base: BaseCurrency;
  detailWidth: number;
  refreshMs: number;
  soundEnabled: boolean;
  soundVolume: number;
  setLeague: (l: string) => void;
  setBase: (b: BaseCurrency) => void;
  setDetailWidth: (w: number) => void;
  setRefreshMs: (ms: number) => void;
  setSoundEnabled: (on: boolean) => void;
  setSoundVolume: (v: number) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      league: null,
      base: "exalted",
      detailWidth: DEFAULT_DETAIL_WIDTH,
      refreshMs: 120_000,
      soundEnabled: true,
      soundVolume: 0.5,
      setLeague: (league) => set({ league }),
      setBase: (base) => set({ base }),
      setDetailWidth: (detailWidth) => set({ detailWidth }),
      setRefreshMs: (refreshMs) => set({ refreshMs }),
      setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
      setSoundVolume: (soundVolume) => set({ soundVolume }),
    }),
    { name: "nolpoc-settings" },
  ),
);
