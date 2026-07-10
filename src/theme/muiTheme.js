import { createTheme } from '@mui/material/styles'

// Ember Forge MUI theme. The VISIBLE colors are driven by the same CSS variables the
// Tailwind layer uses (see index.css :root / [data-theme] blocks) via rgb(var(--c-*)),
// so switching theme (Ember / Abyss / Arcane) restyles MUI components too. The concrete
// hex palette below is only a fallback for MUI's internal computations (ripples, focus).
// Component overrides are intentionally un-Material: flat, no uppercase, custom radius.
const V = (name, a) => (a == null ? `rgb(var(${name}))` : `rgb(var(${name}) / ${a})`)
const SORA = "'Poppins', system-ui, sans-serif"
const INTER = "'Poppins', system-ui, Arial, sans-serif"

export const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#FF6B4A', contrastText: '#2b1208' },
    secondary: { main: '#F4A33C', contrastText: '#2b1208' },
    background: { default: '#0F0E0D', paper: '#1A1714' },
    text: { primary: '#ECE5DB', secondary: '#C7BEB4' },
    divider: 'rgba(255,255,255,0.08)',
  },
  shape: { borderRadius: 3 },
  typography: {
    fontFamily: INTER,
    button: { textTransform: 'none', fontWeight: 600, fontFamily: SORA },
    h1: { fontFamily: SORA }, h2: { fontFamily: SORA }, h3: { fontFamily: SORA },
    h4: { fontFamily: SORA }, h5: { fontFamily: SORA }, h6: { fontFamily: SORA },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      // Every MUI button wears the CSS game-button look (matches .poe-btn in index.css):
      // dark leather gradient, bronze rim, gold smallcaps label — no textures.
      styleOverrides: {
        root: {
          textTransform: 'none', fontWeight: 400, borderRadius: 3,
          fontFamily: 'var(--display-font)', letterSpacing: '0.03em',
          whiteSpace: 'nowrap',
          color: V('--c-text-bright'),
          border: `1px solid ${V('--c-accent2', '0.5')}`,
          background: `linear-gradient(180deg, ${V('--c-panel-light')}, ${V('--c-panel')})`,
          boxShadow: 'inset 0 1px 0 rgb(255 235 180 / 0.06), 0 1px 2px rgb(0 0 0 / 0.45)',
          textShadow: '0 1px 1px rgb(0 0 0 / 0.7)',
          '&:hover': {
            borderColor: V('--c-accent', '0.8'),
            background: `linear-gradient(180deg, ${V('--c-panel-light')}, ${V('--c-panel')})`,
            filter: 'brightness(1.09)', color: V('--c-heading'),
          },
          '&:active': { boxShadow: 'inset 0 2px 4px rgb(0 0 0 / 0.5)' },
        },
        outlined: {
          color: V('--c-text-bright'),
          '&:hover': { color: V('--c-heading') },
        },
        // Text buttons stay chrome-less (menus, links).
        text: {
          border: 'none', background: 'none', boxShadow: 'none', textShadow: 'none',
          color: V('--c-text'),
          '&:hover': { background: V('--c-text', '0.06'), color: V('--c-heading') },
        },
      },
      // Primary CTA keeps the same game chrome — the label glows gold instead of a new skin.
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            color: V('--c-accent-light'),
            textShadow: `0 0 8px ${V('--c-accent', '0.55')}, 0 1px 2px rgb(0 0 0 / 0.85)`,
            '&:hover': { color: V('--c-accent-light'), filter: 'brightness(1.08)' },
          },
        },
      ],
    },
    MuiButtonGroup: {
      // Grouped buttons sit side by side as individual game buttons (that's how the game
      // lays out SAVE / DEFAULTS / CLOSE) — just a hairline of breathing room between.
      styleOverrides: {
        root: { gap: 2 },
        grouped: { minWidth: 0 },
      },
    },
    // The game's Options-panel tab strip: dark raised tabs, the active one brighter with a
    // gold smallcaps label (reference: owner's game screenshots).
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none', fontWeight: 400, minHeight: 40, fontSize: 13.5,
          letterSpacing: '0.05em', color: V('--c-text'), fontFamily: 'var(--display-font)',
          backgroundColor: 'rgb(0 0 0 / 0.35)',
          border: `1px solid ${V('--c-line')}`,
          borderBottom: 'none',
          borderRadius: '3px 3px 0 0',
          marginRight: 3,
          textShadow: '0 1px 2px rgb(0 0 0 / 0.8)',
          '&:hover': { color: V('--c-heading'), backgroundColor: 'rgb(0 0 0 / 0.2)' },
          '&.Mui-selected': {
            color: V('--c-accent'),
            backgroundColor: V('--c-panel-light'),
            boxShadow: `inset 0 1px 0 ${V('--c-accent', '0.35')}`,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: { minHeight: 40 },
        indicator: { backgroundColor: V('--c-accent'), height: 2, borderRadius: 0 },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: { color: V('--c-text'), '&:hover': { color: V('--c-accent'), backgroundColor: V('--c-accent', '0.08') } },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#000', border: `1px solid ${V('--c-line')}`, color: V('--c-text-bright'),
          fontSize: 11.5, lineHeight: 1.45, fontFamily: INTER, padding: '8px 10px', maxWidth: 280,
          boxShadow: '0 8px 28px -12px rgba(0,0,0,0.9)',
        },
        arrow: { color: '#000' },
      },
    },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
  },
})
