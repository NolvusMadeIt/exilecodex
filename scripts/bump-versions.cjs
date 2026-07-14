#!/usr/bin/env node
// Auto-bump versions on commit (invoked by .githooks/pre-commit). Proper semver,
// the way JetBrains / most shops do it — MAJOR.MINOR.PATCH with an optional
// pre-release channel label (e.g. "2.1.0-alpha"):
//   * default            -> PATCH bump   2.0.0-alpha -> 2.0.1-alpha   (fixes)
//   * BUMP=minor git ...  -> MINOR bump   2.0.3-alpha -> 2.1.0-alpha   (new features)
//   * BUMP=major git ...  -> MAJOR bump   2.4.1-alpha -> 3.0.0-alpha   (breaking)
// Applies to whatever actually changed in the commit:
//   * a plugin's app/addons/<id>/plugin.lua -> that plugin (plugins.manifest.json)
//   * shared/app code -> the app (package.json + ui.lua codex.VERSION + manifest "app")
// Never blocks a commit — on any error it warns and lets the commit through.
const { execSync } = require("node:child_process");
const fs = require("node:fs");

try {
  const sh = (c) => execSync(c, { encoding: "utf8" });
  const staged = sh("git diff --cached --name-only --diff-filter=ACMR").split("\n").filter(Boolean);
  const level = (process.env.BUMP || "patch").toLowerCase();

  // Bump a semver string, preserving any pre-release channel label (alpha/beta/rc).
  const bump = (v) => {
    const m = String(v).match(/^(\d+)\.(\d+)\.(\d+)(?:[-.]([0-9A-Za-z.-]+))?$/);
    if (!m) return v; // unknown format — leave it untouched
    let major = +m[1], minor = +m[2], patch = +m[3];
    const pre = m[4] ? m[4].replace(/[.-]?\d+$/, "") : ""; // "alpha.4" / "alpha" -> "alpha"
    if (level === "major") { major++; minor = 0; patch = 0; }
    else if (level === "minor") { minor++; patch = 0; }
    else { patch++; }
    const base = `${major}.${minor}.${patch}`;
    return pre ? `${base}-${pre}` : base;
  };

  const MAN = "app/plugins.manifest.json";
  const man = JSON.parse(fs.readFileSync(MAN, "utf8"));
  let manDirty = false;

  // 1) per-plugin bumps
  const changed = new Set();
  for (const f of staged) {
    const m = f.match(/^app\/addons\/([^/]+)\/plugin\.lua$/);
    if (m && man.plugins[m[1]]) changed.add(m[1]);
  }
  for (const id of changed) {
    man.plugins[id].version = bump(man.plugins[id].version);
    manDirty = true;
    console.log(`[bump:${level}] plugin ${id} -> ${man.plugins[id].version}`);
  }

  // 2) app bump — any real app-source change outside the addons + the manifest
  const appChanged = staged.some(
    (f) => (f.startsWith("app/client/") && !f.startsWith("app/addons/")) || f.startsWith("app/media/"),
  );
  if (appChanged) {
    const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
    const nv = bump(pkg.version);
    pkg.version = nv;
    fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2) + "\n");
    const uiPath = "app/client/lua/core/ui.lua";
    fs.writeFileSync(
      uiPath,
      fs.readFileSync(uiPath, "utf8").replace(/(codex\.VERSION\s*=\s*")[^"]*(")/, `$1${nv}$2`),
    );
    man.app = nv;
    manDirty = true;
    console.log(`[bump:${level}] app -> ${nv}`);
    sh(`git add package.json ${uiPath}`);
  }

  if (manDirty) {
    fs.writeFileSync(MAN, JSON.stringify(man, null, 2) + "\n");
    sh(`git add ${MAN}`);
  }
} catch (e) {
  console.warn("[bump] skipped (non-fatal):", (e && e.message) || e);
}
