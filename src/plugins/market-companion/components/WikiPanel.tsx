import { useQuery } from "@tanstack/react-query";
import { fetchArticle } from "../lib/wiki";

// "About this currency" — the wiki-article half of the Companion's WikiPanel (components/market/
// WikiPanel.tsx), fetched live from www.poe2wiki.net (MediaWiki extracts, CORS-enabled). The poe2db
// item-tooltip half needs a server-side scrape the edge function doesn't do yet — PORT-NOTES.md.
export default function WikiPanel({ name }: { name: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["wiki", name],
    enabled: !!name,
    staleTime: 3_600_000,
    queryFn: () => fetchArticle(name),
  });

  if (isLoading)
    return <div className="p-4 text-[12.5px] text-poe-text/60">Loading the wiki article…</div>;
  if (!data)
    return (
      <div className="p-4 text-[12.5px] text-poe-text/60">
        No PoE2 Wiki article found for “{name}”.
      </div>
    );

  return (
    <div className="space-y-4 p-4 text-left">
      <div className="text-[10px] uppercase tracking-[0.18em] text-poe-text/50">
        About this currency · PoE2 Wiki
      </div>
      {data.lead.map((p, i) => (
        <p key={`lead-${i}`} className="text-sm leading-relaxed text-poe-text-bright/90">
          {p}
        </p>
      ))}
      {data.sections.map((sec, i) => (
        <div key={`sec-${i}`}>
          {sec.title && (
            <h3 className="mb-1.5 text-sm uppercase tracking-[0.15em] text-poe-gold">{sec.title}</h3>
          )}
          <div className="space-y-2">
            {sec.body.map((p, j) => (
              <p key={j} className="text-sm leading-relaxed text-poe-text/80">
                {p}
              </p>
            ))}
          </div>
        </div>
      ))}
      <div className="pt-1 text-[10px] text-poe-text/40">
        Source:{" "}
        <a
          href={`https://www.poe2wiki.net/wiki/${encodeURIComponent(name.replace(/\s+/g, "_"))}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-poe-gold-dim hover:text-poe-gold"
        >
          poe2wiki.net ↗
        </a>
      </div>
    </div>
  );
}
