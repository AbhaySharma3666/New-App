import React, { createContext, useContext, useState } from 'react';
import { Appearance } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemPref = Appearance.getColorScheme() === 'dark';
  const [isDarkMode, setIsDarkMode] = useState(systemPref);
  const [isReadingMode, setIsReadingMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const toggleReadingMode = () => setIsReadingMode(prev => !prev);

  const theme = {
    isDarkMode,
    isReadingMode,
    toggleDarkMode,
    toggleReadingMode,
    colors: {
      background: isDarkMode ? '#1c1c1e' : '#fff',
      text: isDarkMode ? '#fff' : '#000',
      card: isDarkMode ? '#2c2c2e' : '#fff',
      accent: '#FF6B6B',
      subtitle: isDarkMode ? '#aaa' : '#666',
      readingFont: isReadingMode ? 'serif' : 'System',
    },
  };

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
