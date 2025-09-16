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

// Create a Provider component
export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AccessibilityState>({
    fontSize: 16, // Default font size
    highContrast: false,
  });

  // Function to increase font size, with a max limit
  const increaseFontSize = () => {
    setSettings(s => ({ ...s, fontSize: Math.min(s.fontSize + 2, 24) }));
  };

  // Function to decrease font size, with a min limit
  const decreaseFontSize = () => {
    setSettings(s => ({ ...s, fontSize: Math.max(s.fontSize - 2, 12) }));
  };

  // Function to toggle high contrast mode
  const toggleHighContrast = () => {
    setSettings(s => ({ ...s, highContrast: !s.highContrast }));
  };
  
  // Apply the font size to the root HTML element
  React.useEffect(() => {
    document.documentElement.style.fontSize = `${settings.fontSize}px`;
  }, [settings.fontSize]);
  
  // Toggle a class on the body for high contrast
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

// Create a custom hook for easy access to the context
export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
