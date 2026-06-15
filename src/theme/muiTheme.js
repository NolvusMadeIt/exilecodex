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
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600, borderRadius: 3, fontFamily: SORA },
        outlined: {
          color: V('--c-text-bright'),
          borderColor: V('--c-line'),
          backgroundColor: V('--c-panel-light'),
          '&:hover': { borderColor: V('--c-accent', '0.55'), backgroundColor: V('--c-panel-light'), color: V('--c-heading') },
        },
        text: { color: V('--c-text'), '&:hover': { backgroundColor: V('--c-text', '0.06'), color: V('--c-heading') } },
      },
      // MUI v6+ uses the variants API for variant+color combos (the old `containedPrimary`
      // composite key no longer applies). This drives the primary CTA off the theme vars.
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            color: '#2b1208',
            backgroundImage: `linear-gradient(135deg, ${V('--c-accent')}, ${V('--c-accent2')})`,
            boxShadow: `0 4px 14px -7px ${V('--c-accent', '0.65')}`,
            '&:hover': {
              backgroundImage: `linear-gradient(135deg, ${V('--c-accent')}, ${V('--c-accent2')})`,
              filter: 'brightness(1.06)',
              boxShadow: `0 6px 18px -7px ${V('--c-accent', '0.7')}`,
            },
          },
        },
      ],
    },
    MuiButtonGroup: {
      styleOverrides: {
        grouped: { borderColor: V('--c-line') },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none', fontWeight: 500, minHeight: 46, fontSize: 13.5,
          letterSpacing: '0.01em', color: V('--c-text'), fontFamily: SORA,
          '&:hover': { color: V('--c-heading') },
          '&.Mui-selected': { color: V('--c-accent') },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: { minHeight: 46 },
        indicator: { backgroundColor: V('--c-accent'), height: 2, borderRadius: 2 },
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
