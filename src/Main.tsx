import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { ModalContextProvider } from "./context/ModalContext";
import SettingsContextProvider from "./context/SettingsContext";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SettingsContextProvider>
      <ModalContextProvider>
        <App />
      </ModalContextProvider>
    </SettingsContextProvider>
  </React.StrictMode>,
);
