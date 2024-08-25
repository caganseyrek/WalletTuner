import React from "react";
import ReactDOM from "react-dom/client";

import "@/localization/i18n";

import "../src/styles/globals.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
