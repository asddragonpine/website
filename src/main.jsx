import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import "antd/dist/reset.css"; // Importa il CSS di Ant Design

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
