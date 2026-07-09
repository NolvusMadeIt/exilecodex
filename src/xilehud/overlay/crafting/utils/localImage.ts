/*
 * Vendored from XileHUD — https://github.com/XileHUD/poe_overlay (GPL-3.0).
 * (c) XileHUD contributors. See /LICENSE and /ATTRIBUTION.md.
 * Upstream path: src/renderer/overlay/crafting/utils/localImage.ts (v0.6.11). Unmodified except where noted.
 */

// Utility to resolve a local bundled image path to a file:// URL at markup time.
// Falls back to original relative or remote URL if helper not available.
export function resolveLocalImage(imageLocal?: string, remote?: string): string {
  if (imageLocal) {
    try {
      const bi: any = (window as any).bundledImages;
      if (bi && typeof bi.toFileUrl === 'function') {
        return bi.toFileUrl(imageLocal);
      }
    } catch {}
    return imageLocal; // fallback to relative; imageFallback will attempt later
  }
  return remote || '';
}
