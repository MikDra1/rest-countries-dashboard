import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CountryRestProvider } from './contexts/CountryRestProvider.jsx'
import { DataProvider } from './contexts/DataContext.jsx'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
      <CountryRestProvider>
      <DataProvider>

    <App />
    </DataProvider>
    </CountryRestProvider>
  </StrictMode>,
)
