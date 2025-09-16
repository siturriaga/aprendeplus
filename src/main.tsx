import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AccessibilityProvider } from './context/AccessibilityContext.tsx'; // 1. Import the provider

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AccessibilityProvider> {/* 2. Wrap your App component */}
      <App />
    </AccessibilityProvider>
  </React.StrictMode>,
);
