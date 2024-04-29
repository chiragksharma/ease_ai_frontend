import { useState, useEffect } from 'react';
import themeStorage from '@pages/sidepanel/storage/themeStorage';

export const useTheme = (): [string,() =>  Promise<void>] => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Use an immediately-invoked async function inside useEffect
    (async () => {
      try {
        const storedTheme = await themeStorage.get();
        // If storedTheme is null or undefined, default to 'light'
        setTheme(storedTheme || 'light');
      } catch (error) {
        // Handle error, for example, by logging or setting an error state
        console.error(error);
      }
    })();
  }, []);
  
  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    await themeStorage.set(newTheme);
    setTheme(newTheme);
  };

  return [theme, toggleTheme];

};
