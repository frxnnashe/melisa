import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import WeddingLanding from './WeddingLanding'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WeddingLanding />
  </StrictMode>,
)
