// Placeholder for theme storage logic
const themeKey = 'theme';

const getTheme = (): string | null => {
  return localStorage.getItem(themeKey);
};

const setTheme = (theme: string) => {
  localStorage.setItem(themeKey, theme);
};

const themeStorage = { get: getTheme, set: setTheme };
export default themeStorage;
