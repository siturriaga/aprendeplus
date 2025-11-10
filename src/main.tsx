import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import i18n from "./i18n/config";
import { router } from "./router";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container missing in index.html");
}

createRoot(container).render(
  <StrictMode>
    <HelmetProvider>
      <I18nextProvider i18n={i18n}>
        <RouterProvider router={router} />
      </I18nextProvider>
    </HelmetProvider>
  </StrictMode>
);
