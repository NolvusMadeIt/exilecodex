// Ported verbatim from the Marketplace Companion (lib/sound.ts) — the three-note WebAudio chime
// the alert engine plays when a price alert crosses its target. No assets, no fake sounds: it
// synthesizes the tone locally, honoring the plugin's volume setting.
let ctx: AudioContext | null = null;

export function playAlert(volume = 0.5): void {
  if (typeof window === "undefined") return;
  const peak = Math.max(0.0001, Math.min(1, volume) * 0.45);
  try {
    const Ctor =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    ctx = ctx ?? new Ctor();
    if (ctx.state === "suspended") void ctx.resume();
    const t0 = ctx.currentTime;
    [880, 1320, 1760].forEach((freq, i) => {
      const start = t0 + i * 0.16;
      const osc = ctx!.createOscillator();
      const gain = ctx!.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(peak, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.15);
      osc.connect(gain);
      gain.connect(ctx!.destination);
      osc.start(start);
      osc.stop(start + 0.16);
    });
  } catch {
    void 0;
  }
}
