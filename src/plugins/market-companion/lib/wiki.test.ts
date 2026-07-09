import { describe, it, expect } from "vitest";
import { paragraphs, parseExtract } from "./wiki";

// The MediaWiki plaintext-extract parser ported from the Marketplace Companion. The fixtures mirror
// what www.poe2wiki.net actually returns (e.g. the glued "Item acquisitionDivine Orb can drop
// anywhere." header seen live on the Divine Orb article).

describe("paragraphs", () => {
  it("splits on blank lines and trims", () => {
    expect(paragraphs("First para.\n\n  Second para.  \n\nx")).toEqual(["First para.", "Second para."]);
  });

  it("drops single-character noise lines", () => {
    expect(paragraphs("a\nReal content here.")).toEqual(["Real content here."]);
  });
});

describe("parseExtract", () => {
  it("returns the lead and titled sections", () => {
    const a = parseExtract(
      "Divine Orb is a currency item that randomizes values.\n\n== Mechanics ==\nRerolls modifier values.\nCannot be used on corrupted items.",
    );
    expect(a.lead).toEqual(["Divine Orb is a currency item that randomizes values."]);
    expect(a.sections).toEqual([
      { title: "Mechanics", body: ["Rerolls modifier values.", "Cannot be used on corrupted items."] },
    ]);
  });

  it("splits body text glued onto a known header (live poe2wiki quirk)", () => {
    const a = parseExtract("Lead text here.\n\n== Item acquisitionDivine Orb can drop anywhere. ==\n");
    const sec = a.sections.find((s) => s.title === "Item acquisition");
    expect(sec).toBeDefined();
    expect(sec!.body).toEqual(["Divine Orb can drop anywhere."]);
  });

  it("folds long sentence-like 'titles' into the body with no title", () => {
    const longSentence = "This whole thing is actually a paragraph that got parsed as a header. It ends with a period.";
    const a = parseExtract(`Lead.\n\n== ${longSentence} ==\nMore body.`);
    expect(a.sections).toHaveLength(1);
    expect(a.sections[0].title).toBe("");
    expect(a.sections[0].body[0].startsWith("This whole thing")).toBe(true);
  });

  it("skips boilerplate sections (version history, see also, references)", () => {
    const a = parseExtract(
      "Lead.\n\n== Version history ==\n3.0 changes.\n\n== See also ==\nOther orb.\n\n== Usage ==\nUse it wisely.",
    );
    expect(a.sections.map((s) => s.title)).toEqual(["Usage"]);
  });

  it("drops sections with no body", () => {
    const a = parseExtract("Lead.\n\n== Mechanics ==\n\n== Usage ==\nReal body.");
    expect(a.sections).toEqual([{ title: "Usage", body: ["Real body."] }]);
  });

  it("handles an extract with no sections at all", () => {
    const a = parseExtract("Just a lead paragraph.");
    expect(a.lead).toEqual(["Just a lead paragraph."]);
    expect(a.sections).toEqual([]);
  });
});
