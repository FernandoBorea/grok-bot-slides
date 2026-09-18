import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { LiveProvider } from "./live/LiveProvider";
import "./styles.css";
import "./decks/slides.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LiveProvider>
      <RouterProvider router={router} />
    </LiveProvider>
  </React.StrictMode>,
);
