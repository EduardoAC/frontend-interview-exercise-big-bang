import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ScoreProvider } from './App/context/ScoreContext.tsx'
import App from './App/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ScoreProvider>
      <App />
    </ScoreProvider>
  </StrictMode>,
)
