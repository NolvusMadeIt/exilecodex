// PoE2 Wiki article client + extract parser (ported from the Companion's lib/wiki/client.ts
// getArticle/parseExtract). The Companion fetched this server-side; www.poe2wiki.net runs MediaWiki,
// whose api.php serves anonymous requests with `origin=*` CORS (verified: Access-Control-Allow-
// Origin: *), so the plugin calls it straight from the renderer — no proxy needed. The poe2db
// tooltip scrape half of the Companion's wiki panel is NOT portable client-side (plain HTML page,
// no CORS) — see PORT-NOTES.md for the edge-function op that would restore it.
const WIKI_API = "https://www.poe2wiki.net/w/api.php";

export interface WikiSection {
  title: string;
  body: string[];
}

export interface WikiArticle {
  lead: string[];
  sections: WikiSection[];
}

const SKIP_SECTION = /^(version history|references|see also|gallery|navigation|external links)$/i;
const KNOWN_HEADERS = [
  "Item acquisition",
  "Acquisition",
  "Usage",
  "Mechanics",
  "Recipe",
  "Vendor recipe",
  "Related omens",
  "Strategy",
  "Notes",
];

export function paragraphs(block: string): string[] {
  return block
    .split(/\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 1);
}

// MediaWiki plaintext extracts glue stray text onto section headers ("== Item acquisitionDivine
// Orb can drop anywhere. =="); this splits them back apart, folds sentence-like "titles" into the
// body, and drops boilerplate sections.
export function parseExtract(text: string): WikiArticle {
  const parts = text.split(/={2,}\s*([^=\n]+?)\s*={2,}/);
  const lead = paragraphs(parts[0] ?? "");
  const sections: WikiSection[] = [];
  for (let i = 1; i < parts.length; i += 2) {
    let title = (parts[i] ?? "").trim();
    let block = (parts[i + 1] ?? "").trim();
    const known = KNOWN_HEADERS.find((k) => title.startsWith(k) && title.length > k.length);
    if (known) {
      block = `${title.slice(known.length).trim()} ${block}`.trim();
      title = known;
    } else if (title.length > 24 && /\.\s|\.$/.test(title)) {
      block = `${title} ${block}`.trim();
      title = "";
    }
    if (title && SKIP_SECTION.test(title)) continue;
    const body = paragraphs(block);
    if (!body.length) continue;
    sections.push({ title, body });
  }
  return { lead, sections };
}

export async function fetchArticle(name: string): Promise<WikiArticle | null> {
  if (!name.trim()) return null;
  const title = name.trim().replace(/\s+/g, "_");
  const url =
    `${WIKI_API}?action=query&prop=extracts&explaintext=1&exsectionformat=wiki&redirects=1` +
    `&format=json&origin=*&titles=${encodeURIComponent(title)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const json = await res.json();
    const pages = json?.query?.pages;
    if (!pages) return null;
    const page = pages[Object.keys(pages)[0]];
    const extract: string = page?.extract ?? "";
    if (!extract.trim() || page?.missing !== undefined) return null;
    const article = parseExtract(extract);
    if (!article.lead.length && !article.sections.length) return null;
    return article;
  } catch {
    return null;
  }
}
