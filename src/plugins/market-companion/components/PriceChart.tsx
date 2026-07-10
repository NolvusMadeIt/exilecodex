import { useEffect, useRef } from "react";
import {
  createChart,
  ColorType,
  CandlestickSeries,
  AreaSeries,
  HistogramSeries,
  type UTCTimestamp,
  type Time,
} from "lightweight-charts";
import type { Candle, PricePoint } from "../../../lib/market/types";
import { fmtNum, fmtCompact, fmtPrice } from "../../../lib/market/format";

// Ported from the Marketplace Companion (components/market/PriceChart.tsx) — same candle/area +
// volume behavior and crosshair readout, themed to nolvusfilter: the line/crosshair use the app's
// runtime accent (read from CSS vars so it follows the active theme), candles use emerald/red.
const toSec = (iso: string) => Math.floor(Date.parse(iso) / 1000) as UTCTimestamp;

function clean<T extends { time: number | string }>(arr: T[]): T[] {
  const valid = arr.filter((x) => x.time != null && !(typeof x.time === "number" && Number.isNaN(x.time)));
  valid.sort((a, b) => (a.time < b.time ? -1 : a.time > b.time ? 1 : 0));
  const out: T[] = [];
  for (const x of valid) {
    if (out.length && out[out.length - 1].time === x.time) out[out.length - 1] = x;
    else out.push(x);
  }
  return out;
}

const padFlat = (orig: () => { priceRange: { minValue: number; maxValue: number } | null } | null) => {
  const res = orig();
  if (res?.priceRange && res.priceRange.minValue === res.priceRange.maxValue) {
    const v = res.priceRange.minValue;
    const pad = Math.abs(v) * 0.05 || 1;
    res.priceRange = { minValue: v - pad, maxValue: v + pad };
  }
  return res;
};

function formatTime(t: Time): string {
  if (typeof t === "number") {
    return new Date(t * 1000).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  }
  if (typeof t === "string") {
    const d = new Date(t);
    return isNaN(d.getTime()) ? t : d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }
  return `${t.year}-${String(t.month).padStart(2, "0")}-${String(t.day).padStart(2, "0")}`;
}

const GAIN = "#34d399";
const LOSS = "#f87171";

export default function PriceChart({
  kind,
  candles,
  points,
  unit,
}: {
  kind: "candle" | "area";
  candles: Candle[];
  points: PricePoint[];
  unit: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Pull the app's active theme colours so the chart matches whatever theme is selected.
    const css = getComputedStyle(document.documentElement);
    const rgb = (name: string, fb: string) => {
      const v = css.getPropertyValue(name).trim();
      return v ? `rgb(${v})` : fb;
    };
    const rgba = (name: string, a: number, fb: string) => {
      const v = css.getPropertyValue(name).trim();
      return v ? `rgb(${v} / ${a})` : fb;
    };
    const accent = rgb("--c-accent", "#e08a4a");
    const text = rgb("--c-text", "#9a958c");
    const lineCol = rgb("--c-line", "#2a2a2a");

    let chart: ReturnType<typeof createChart> | null = null;
    try {
      chart = createChart(el, {
        autoSize: true,
        layout: {
          background: { type: ColorType.Solid, color: "transparent" },
          textColor: text,
          fontFamily: "Consolas, ui-monospace, monospace",
          fontSize: 11,
          attributionLogo: false,
        },
        localization: { priceFormatter: fmtPrice },
        grid: {
          vertLines: { color: "rgba(255,255,255,0.05)" },
          horzLines: { color: "rgba(255,255,255,0.05)" },
        },
        rightPriceScale: { borderColor: lineCol },
        timeScale: { borderColor: lineCol, timeVisible: kind === "area", secondsVisible: false },
        crosshair: {
          mode: 0,
          vertLine: { color: rgba("--c-accent", 0.6, "rgba(224,138,74,0.6)"), labelBackgroundColor: accent },
          horzLine: { color: rgba("--c-accent", 0.6, "rgba(224,138,74,0.6)"), labelBackgroundColor: accent },
        },
      });

      // deno-lint-ignore no-explicit-any
      let priceSeries: any;
      // deno-lint-ignore no-explicit-any
      let volSeries: any;

      if (kind === "candle") {
        priceSeries = chart.addSeries(CandlestickSeries, {
          upColor: GAIN, downColor: LOSS, borderUpColor: GAIN, borderDownColor: LOSS,
          wickUpColor: GAIN, wickDownColor: LOSS, autoscaleInfoProvider: padFlat,
        });
        priceSeries.setData(clean(candles.map((c) => ({ time: c.t, open: c.open, high: c.high, low: c.low, close: c.close }))));
        volSeries = chart.addSeries(HistogramSeries, { priceScaleId: "vol", priceFormat: { type: "volume" } });
        volSeries.setData(clean(candles.map((c) => ({ time: c.t, value: c.volume, color: c.close >= c.open ? "rgba(52,211,153,0.35)" : "rgba(248,113,113,0.35)" }))));
        chart.priceScale("vol").applyOptions({ scaleMargins: { top: 0.82, bottom: 0 } });
      } else {
        priceSeries = chart.addSeries(AreaSeries, {
          lineColor: accent,
          topColor: rgba("--c-accent", 0.28, "rgba(224,138,74,0.28)"),
          bottomColor: rgba("--c-accent", 0.02, "rgba(224,138,74,0.02)"),
          lineWidth: 2, autoscaleInfoProvider: padFlat,
        });
        priceSeries.setData(clean(points.map((p) => ({ time: toSec(p.t), value: p.value }))));
        volSeries = chart.addSeries(HistogramSeries, { priceScaleId: "vol", priceFormat: { type: "volume" }, color: rgba("--c-accent", 0.22, "rgba(224,138,74,0.22)") });
        volSeries.setData(clean(points.map((p) => ({ time: toSec(p.t), value: p.volume }))));
        chart.priceScale("vol").applyOptions({ scaleMargins: { top: 0.86, bottom: 0 } });
      }

      chart.subscribeCrosshairMove((param) => {
        const out = readoutRef.current;
        if (!out) return;
        // deno-lint-ignore no-explicit-any
        const pd: any = param.time ? param.seriesData.get(priceSeries) : undefined;
        if (!param.time || !pd) {
          out.style.opacity = "0";
          return;
        }
        // deno-lint-ignore no-explicit-any
        const date = `<span class="text-poe-text/60">${formatTime(param.time)}</span>`;
        // Plain words, no O/H/L/C jargon: candles show the price then the day's range; area shows
        // just the price. Volume is left off the tooltip — players don't read a price chart for it.
        const body =
          kind === "candle"
            ? `<b class="text-poe-text-bright">${fmtNum(pd.close)}</b> <span class="text-poe-text/50">${unit}</span> <span class="text-poe-text/45">· high ${fmtNum(pd.high)} · low ${fmtNum(pd.low)}</span>`
            : `<b class="text-poe-text-bright">${fmtNum(pd.value)}</b> <span class="text-poe-text/50">${unit}</span>`;
        out.innerHTML = `${date} &nbsp; ${body}`;
        out.style.opacity = "1";
      });

      chart.timeScale().fitContent();
    } catch (err) {
      console.error("PriceChart render failed", err);
    }

    return () => chart?.remove();
  }, [kind, candles, points, unit]);

  return (
    <div className="relative h-full w-full">
      <div ref={ref} className="h-full w-full" />
      <div
        ref={readoutRef}
        className="tabular-nums pointer-events-none absolute left-3 top-2 rounded border border-poe-line bg-black/80 px-2 py-1 text-[11px] opacity-0 transition-opacity"
      />
    </div>
  );
}
