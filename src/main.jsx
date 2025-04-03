import { StrictMode } from "react";
import { HashRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";
import { MantineProvider } from "@mantine/core"; // Importa MantineProvider

import "antd/dist/reset.css"; // Importa il CSS di Ant Design

import "./index.css";
import App from "./App";
import Home from "./Home.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
    <MantineProvider theme={{ colorScheme: "light" }}>
        <App />
      </MantineProvider>
      </HashRouter>
      </React.StrictMode>
);
