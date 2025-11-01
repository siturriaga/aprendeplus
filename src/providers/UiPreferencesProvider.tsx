import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

interface UiPreferencesContextValue {
  assistedMode: boolean;
  toggleAssistedMode: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const UiPreferencesContext = createContext<UiPreferencesContextValue | undefined>(
  undefined
);

const THEME_KEY = 'synapse-theme';
const ASSISTED_KEY = 'synapse-assisted-mode';

export function UiPreferencesProvider({ children }: { children: ReactNode }) {
  const [assistedMode, setAssistedMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(ASSISTED_KEY) === 'true';
  });
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.classList.toggle('assisted-mode', assistedMode);
    localStorage.setItem(ASSISTED_KEY, assistedMode ? 'true' : 'false');
  }, [assistedMode]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const value = useMemo<UiPreferencesContextValue>(
    () => ({
      assistedMode,
      toggleAssistedMode: () => setAssistedMode((mode) => !mode),
      theme,
      toggleTheme: () => setTheme((current) => (current === 'light' ? 'dark' : 'light'))
    }),
    [assistedMode, theme]
  );

  return (
    <UiPreferencesContext.Provider value={value}>
      <div
        className={assistedMode ? 'text-lg leading-relaxed' : ''}
        style={
          assistedMode
            ? {
                letterSpacing: '0.01em'
              }
            : undefined
        }
      >
        {children}
      </div>
    </UiPreferencesContext.Provider>
  );
}

export function useUiPreferences() {
  const ctx = useContext(UiPreferencesContext);
  if (!ctx) {
    throw new Error('useUiPreferences must be used inside UiPreferencesProvider');
  }
  return ctx;
}
