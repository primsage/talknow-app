import React from 'react'
import ReactDOM from 'react-dom/client'
import Widget from './components/Widget'
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
})

const container = document.getElementById('talknow-widget-container')!;
const shadowRoot = container.attachShadow({ mode: 'open' });
const mountPoint = document.createElement('div');
shadowRoot.appendChild(mountPoint);

// Inject MUI styles into Shadow DOM
const styleSlot = document.createElement('div');
shadowRoot.appendChild(styleSlot);

ReactDOM.createRoot(mountPoint).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst cache={undefined}>
      <ThemeProvider theme={theme}>
        <Widget />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
)
