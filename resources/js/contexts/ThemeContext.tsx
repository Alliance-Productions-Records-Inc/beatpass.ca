import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  applyDarkTheme,
  applyLightTheme,
  isDarkMode,
  syncThemeLogos,
} from '@/hooks/useTheme';
import { applyTheme } from '@/utils/colorExtraction';

interface ThemeContextValue {
  isDark: boolean;
  toggleTheme: () => void;
  setDominantColor: (color: [number, number, number]) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  isDark: true,
  toggleTheme: () => {},
  setDominantColor: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(() => isDarkMode());
  const dominantColorRef = useRef<[number, number, number] | null>(null);

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
    if (dominantColorRef.current) {
      applyTheme(dominantColorRef.current);
    }
    syncThemeLogos(nextIsDark);
    setIsDark(nextIsDark);
  }, []);

  const setDominantColor = useCallback((color: [number, number, number]) => {
    dominantColorRef.current = color;
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, setDominantColor }}>
      {children}
    </ThemeContext.Provider>
  );
};
