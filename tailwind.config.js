/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // NolvusFilter's own palette, driven by CSS-variable RGB triplets so themes can
        // switch at runtime (see index.css :root + [data-theme] blocks). token keys kept
        // as `poe-*` internally. `gold`/`steel` are the accent (named for legacy classes).
        poe: {
          bg: 'rgb(var(--c-bg) / <alpha-value>)',
          panel: 'rgb(var(--c-panel) / <alpha-value>)',
          'panel-light': 'rgb(var(--c-panel-light) / <alpha-value>)',
          line: 'rgb(var(--c-line) / <alpha-value>)',
          text: 'rgb(var(--c-text) / <alpha-value>)',
          'text-bright': 'rgb(var(--c-text-bright) / <alpha-value>)',
          heading: 'rgb(var(--c-heading) / <alpha-value>)',
          gold: 'rgb(var(--c-accent) / <alpha-value>)',
          'gold-dim': 'rgb(var(--c-accent-dim) / <alpha-value>)',
          steel: 'rgb(var(--c-accent) / <alpha-value>)',
          'steel-light': 'rgb(var(--c-accent-light) / <alpha-value>)',
          danger: 'rgb(var(--c-danger) / <alpha-value>)',
          accent2: 'rgb(var(--c-accent2) / <alpha-value>)',
        },
        // PoE in-game rarity / item label colors (for previews + dropdowns)
        rarity: {
          normal: '#c8c8c8',
          magic: '#8888ff',
          rare: '#ffff77',
          unique: '#af6025',
          currency: '#aa9e82',
          gem: '#1ba29b',
          quest: '#4ae63a',
          relic: '#82ad6a',
        },
        // Drop-tier beam colors (S→F)
        beam: {
          purple: '#b660e0',
          red: '#e04040',
          orange: '#e0902a',
          yellow: '#e6d24a',
          white: '#e8e8e8',
          brown: '#9a6a3a',
        },
      },
      fontFamily: {
        // Fontin kept ONLY for the in-game item-label preview (ItemLabel uses font-smallcaps).
        smallcaps: ['FontinSmallCaps', 'Verdana', 'sans-serif'],
        fontin: ['FontinRegular', 'Verdana', 'sans-serif'],
        // App UI fonts — Ember Forge identity.
        display: ['Sora Variable', 'Sora', 'system-ui', 'sans-serif'],
        body: ['Inter Variable', 'Inter', 'system-ui', 'Arial', 'sans-serif'],
        mono: ['Consolas', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        panel: '0 10px 30px -18px rgba(0,0,0,0.85), inset 0 1px 0 0 rgba(255,255,255,0.025)',
        glow: '0 0 0 1px rgb(var(--c-accent) / 0.4), 0 0 22px -6px rgb(var(--c-accent) / 0.55)',
      },
      // Sharp, angular PoE2-native paneling — overrides Tailwind's soft default radii so the
      // whole app sharpens at once (rounded-full kept for dots/avatars).
      borderRadius: {
        none: '0',
        sm: '2px',
        DEFAULT: '3px',
        md: '3px',
        lg: '4px',
        xl: '5px',
        '2xl': '6px',
        '3xl': '8px',
        full: '9999px',
      },
    },
  },
  plugins: [],
}
