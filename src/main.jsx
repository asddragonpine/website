import { StrictMode } from 'react'
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";

import "antd/dist/reset.css"; // Importa il CSS di Ant Design

import './index.css'
import App from './App'
import Home from './Home.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<BrowserRouter>
      <App />
    </BrowserRouter>

    </React.StrictMode>
)
