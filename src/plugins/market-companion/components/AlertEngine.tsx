import { useEffect, useRef } from "react";
import { useSettings } from "../store/settings";
import { useWatch } from "../store/watch";
import { fetchQuotes } from "../lib/quotes";
import { playAlert } from "../lib/sound";
import { fmtNum } from "../../../lib/market/format";
import { useToast } from "../../../store/Toast.jsx";

// Ported from the Marketplace Companion (components/market/AlertEngine.tsx) — polls the live price
// of every currency with an enabled alert and fires when the target is crossed. Two adaptations to
// the host: quotes come per-id through the edge proxy (lib/quotes) instead of the Next /quotes
// route, and notifications use nolvusfilter's own toast system instead of the Companion's custom
// toasts. The chime + volume respect the plugin's Alerts settings. Runs while the Market plugin is
// mounted (the Companion ran it app-wide from its layout; the host has no background-service
// contribution point yet — see PORT-NOTES.md).
export default function AlertEngine() {
  const league = useSettings((s) => s.league);
  const base = useSettings((s) => s.base);
  const refreshMs = useSettings((s) => s.refreshMs);
  const soundEnabled = useSettings((s) => s.soundEnabled);
  const soundVolume = useSettings((s) => s.soundVolume);
  const alerts = useWatch((s) => s.alerts);
  const toast = useToast();
  const toastRef = useRef(toast);
  toastRef.current = toast;
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const ids = Object.entries(alerts)
      .filter(([, a]) => a.enabled)
      .map(([id]) => id);
    if (!league || !ids.length) return;
    let cancelled = false;

    const check = async () => {
      try {
        const data = await fetchQuotes(league, base, ids);
        if (cancelled) return;
        const dp = data.divinePrice || 1;
        const { alerts: cur, triggered, markTriggered, clearTriggered } = useWatch.getState();
        const fired: string[] = [];
        const now = Date.now();
        for (const row of data.rows) {
          const a = cur[row.apiId];
          if (!a || !a.enabled) continue;
          // Rows arrive converted to the chosen base; alerts are stored in exalted.
          const ex = base === "divine" ? row.value * dp : row.value;
          const hit = a.dir === "above" ? ex >= a.targetEx : ex <= a.targetEx;
          const active = (triggered[row.apiId] ?? 0) > 0;
          if (hit && !active) {
            markTriggered(row.apiId, now);
            const shown = base === "divine" && dp > 0 ? a.targetEx / dp : a.targetEx;
            fired.push(`${row.name} is ${a.dir} ${fmtNum(shown)} ${base === "divine" ? "div" : "ex"}`);
          } else if (!hit && active) {
            clearTriggered(row.apiId);
          }
        }
        if (fired.length) {
          if (soundEnabled) playAlert(soundVolume);
          for (const text of fired) toastRef.current?.info?.(text, { title: "Price alert", duration: 9000 });
        }
      } catch {
        void 0; // network hiccup — try again next poll
      }
    };

    check();
    const interval = refreshMs > 0 ? refreshMs : 120_000;
    timer.current = window.setInterval(check, interval) as unknown as number;
    return () => {
      cancelled = true;
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [league, base, alerts, refreshMs, soundEnabled, soundVolume]);

  return null;
}
