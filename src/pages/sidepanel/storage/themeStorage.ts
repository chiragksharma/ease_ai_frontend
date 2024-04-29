const THEME_KEY = 'user-theme';

interface ThemeStorage {
  get: () => Promise<string | null>; // Function to get the current theme, returns a promise
  set: (theme: string) => Promise<void>; // Function to set a new theme, returns a promise
}

const themeStorage: ThemeStorage = {
  get: () => {
    // Wrap chrome.storage.local.get in a Promise
    return new Promise((resolve) => {
      chrome.storage.local.get([THEME_KEY], (result) => {
        resolve(result[THEME_KEY] || null); // Return the stored value or null
      });
    });
  },
  set: (theme: string) => {
    // Wrap chrome.storage.local.set in a Promise
    return new Promise((resolve) => {
      chrome.storage.local.set({ [THEME_KEY]: theme }, () => {
        resolve(); // Resolve the promise after setting the value
      });
    });
  }
};

export default themeStorage;
