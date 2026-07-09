import React from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import '@fontsource/inter-tight/400.css' // default app typeface (Exile theme)
import '@fontsource/inter-tight/500.css'
import '@fontsource/inter-tight/600.css'
import '@fontsource/poppins/400.css'     // optional font choices (Settings → Typography)
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource-variable/inter'
import App from './App.jsx'
import { muiTheme } from './theme/muiTheme.js'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
)
