import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from 'wouter';
import App from './App';
import { FirebaseProvider } from './providers/FirebaseProvider';
import { UiPreferencesProvider } from './providers/UiPreferencesProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <FirebaseProvider>
      <UiPreferencesProvider>
        <Router>
          <App />
        </Router>
      </UiPreferencesProvider>
    </FirebaseProvider>
  </StrictMode>
);
