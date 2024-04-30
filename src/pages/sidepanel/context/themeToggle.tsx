// ThemeContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import themeStorage from '@pages/sidepanel/storage/themeStorage';
// Define the context type
interface ThemeContextType {
    theme: string;
    toggleTheme: () => Promise<void>;
  }
  
  // Create the context with a default value
  const ThemeContext = createContext<ThemeContextType>({
    theme: 'light', // Default theme
    toggleTheme: async () => {}, // Dummy function for initial context
  });

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    (async () => {
      const storedTheme = await themeStorage.get();
      setTheme(storedTheme || 'light');
    })();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    await themeStorage.set(newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
