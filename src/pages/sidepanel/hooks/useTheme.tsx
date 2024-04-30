import { useState, useEffect } from 'react';
import themeStorage from '@pages/sidepanel/storage/themeStorage';

export const useTheme = (): [string,() =>  Promise<void>] => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Use an immediately-invoked async function inside useEffect
    (async () => {
      try {
        const storedTheme = await themeStorage.get();
        console.log("This is the stored theme: ",storedTheme);
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
    console.log("Toggling theme from", theme, "to", newTheme);
    await themeStorage.set(newTheme);
    setTheme(newTheme);
  };

  return [theme, toggleTheme];

};
