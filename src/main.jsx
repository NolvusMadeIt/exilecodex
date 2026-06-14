import React from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import '@fontsource-variable/sora'
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
