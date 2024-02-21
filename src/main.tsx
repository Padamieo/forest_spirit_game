import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { AppRouter } from "./components/AppRouter";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
);
