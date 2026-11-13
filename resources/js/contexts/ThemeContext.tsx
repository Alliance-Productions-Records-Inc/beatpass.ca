import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  applyDarkTheme,
  applyLightTheme,
  isDarkMode,
  syncThemeLogos,
} from '@/hooks/useTheme';

interface ThemeContextValue {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  isDark: true,
  toggleTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => isDarkMode());

  // Apply base theme on mount
  useEffect(() => {
    if (isDark) {
      applyDarkTheme();
    } else {
      applyLightTheme();
    }
    syncThemeLogos(isDark);
  }, []);

  const toggleTheme = useCallback(() => {
    const nextIsDark = !isDarkMode();
    if (nextIsDark) {
      applyDarkTheme();
    } else {
      applyLightTheme();
    }
    syncThemeLogos(nextIsDark);
    setIsDark(nextIsDark);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
