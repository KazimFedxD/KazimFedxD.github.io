// src/index.js
// Mount point. Boots the app on #root, sets the initial theme class to
// avoid a flash, then hands off to App.

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Set theme class as early as possible to prevent a white flash.
try {
  const stored = window.localStorage.getItem("theme");
  const isLight = stored === "light";
  const sysLight = window.matchMedia?.("(prefers-color-scheme: light)").matches;
  const apply = isLight || (stored == null && sysLight);
  if (apply) document.documentElement.classList.add("light");
  document.documentElement.classList.add(apply ? "light" : "dark");
} catch (e) {
  document.documentElement.classList.add("dark");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
