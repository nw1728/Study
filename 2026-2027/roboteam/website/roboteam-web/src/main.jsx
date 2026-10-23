import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/tokens.css'
import './styles/global.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx'
import ContentProvider from './content/ContentProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ContentProvider>
        {/* The last net: a component that throws must not blank every page. */}
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </ContentProvider>
    </BrowserRouter>
  </StrictMode>,
)
