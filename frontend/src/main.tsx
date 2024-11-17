import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CustomerProvider } from './context/CustomerContext.tsx'
import { PaginationProvider } from './context/PaginationContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PaginationProvider>
      <CustomerProvider>
        <App />
      </CustomerProvider>
    </PaginationProvider>
  </StrictMode>,
)

