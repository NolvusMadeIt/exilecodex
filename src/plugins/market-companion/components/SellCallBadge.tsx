import { CALL_META, type SellCall } from "../lib/signals";

// The three-way sell guidance chip (exiledtools port): Hold for more / Sell at market / Sell now.
// Themed to nolvusfilter — up=emerald, down=red, flat=muted; no glow.
const TONE: Record<string, string> = {
  up: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
  down: "text-red-400 border-red-500/40 bg-red-500/10",
  flat: "text-poe-text/70 border-poe-line bg-white/[0.03]",
};

export default function SellCallBadge({ call, size = "sm" }: { call: SellCall; size?: "sm" | "xs" }) {
  const m = CALL_META[call];
  return (
    <span
      title={m.hint}
      className={`inline-flex items-center whitespace-nowrap rounded border font-medium ${TONE[m.tone]} ${
        size === "xs" ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-0.5 text-[11px]"
      }`}
    >
      {m.label}
    </span>
  );
}
