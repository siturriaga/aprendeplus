import { Outlet, ScrollRestoration } from "react-router-dom";

import { SEO } from "../atoms/SEO";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const RootLayout: React.FC = () => (
  <div className="flex min-h-screen flex-col bg-surface text-base">
    <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4">
      Ir al contenido principal
    </a>
    <SEO />
    <Header />
    <main id="main" className="flex-1 animate-fade-in">
      <Outlet />
    </main>
    <Footer />
    <ScrollRestoration />
  </div>
);
