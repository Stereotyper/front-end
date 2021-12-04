import { useEffect, useState } from "react";
import { saveToLocalStorage, getFromLocalStorage } from "./storage";

const isBrowser = typeof window !== "undefined" && window.localStorage;

export const useTheme = () => {
  const themes = isBrowser && getFromLocalStorage("all-themes");

  const defaultValue = isBrowser && themes.data.nord;

  const [theme, setTheme] = useState(defaultValue);

  const [themeLoaded, setThemeLoaded] = useState(false);

  const saveTheme = (mode) => {
    saveToLocalStorage("theme", mode);
    setTheme(mode);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const localTheme = getFromLocalStorage("theme");
      localTheme ? setTheme(localTheme) : setTheme(themes.data.nord);
      setThemeLoaded(true);
    }
  }, []);

  return { theme, themeLoaded, saveTheme, themes };
};
