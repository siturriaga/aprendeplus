import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of our accessibility settings
interface AccessibilityState {
  fontSize: number;
  highContrast: boolean;
}

// Define what our context will provide: the state and functions to change it
interface AccessibilityContextType extends AccessibilityState {
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  toggleHighContrast: () => void;
}

// Create the context with a default value
export const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

// Create a Provider component that will be exported
export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AccessibilityState>({
    fontSize: 16, // Default font size
    highContrast: false,
  });

  const increaseFontSize = () => {
    setSettings(s => ({ ...s, fontSize: Math.min(s.fontSize + 2, 24) }));
  };

  const decreaseFontSize = () => {
    setSettings(s => ({ ...s, fontSize: Math.max(s.fontSize - 2, 12) }));
  };

  const toggleHighContrast = () => {
    setSettings(s => ({ ...s, highContrast: !s.highContrast }));
  };
  
  React.useEffect(() => {
    document.documentElement.style.fontSize = `${settings.fontSize}px`;
  }, [settings.fontSize]);
  
  React.useEffect(() => {
    document.body.classList.toggle('high-contrast', settings.highContrast);
  }, [settings.highContrast]);

  const value = {
    ...settings,
    increaseFontSize,
    decreaseFontSize,
    toggleHighContrast,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

// Create a custom hook that will be exported
export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
