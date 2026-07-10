// Tiny inline sparkline (no deps) — a price series drawn as a polyline, tinted by direction.
export default function Sparkline({
  data,
  up,
  width = 72,
  height = 22,
}: {
  data: number[];
  up?: boolean;
  width?: number;
  height?: number;
}) {
  if (!data || data.length < 2) return <span className="text-poe-text/25">—</span>;
  const lo = Math.min(...data);
  const hi = Math.max(...data);
  const span = hi - lo || 1;
  const stepX = width / (data.length - 1);
  const pts = data.map((v, i) => `${(i * stepX).toFixed(1)},${(height - ((v - lo) / span) * height).toFixed(1)}`);
  const stroke = up ? "rgb(52 211 153)" : "rgb(248 113 113)";
  return (
    <svg width={width} height={height} className="inline-block align-middle" aria-hidden>
      <polyline points={pts.join(" ")} fill="none" stroke={stroke} strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
