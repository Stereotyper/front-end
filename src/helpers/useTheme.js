import { useEffect, useState } from "react";
import { saveToLocalStorage, getFromLocalStorage } from "./storage";

export const useTheme = () => {
  const themes = getFromLocalStorage("all-themes");

  const [theme, setTheme] = useState(themes.data.light);

  const [themeLoaded, setThemeLoaded] = useState(false);

  const saveTheme = (mode) => {
    saveToLocalStorage("theme", mode);
    setTheme(mode);
  };

  useEffect(() => {
    const localTheme = getFromLocalStorage("theme");
    localTheme ? setTheme(localTheme) : setTheme(themes.data.light);
    setThemeLoaded(true);
  }, []);

  return { theme, themeLoaded, saveTheme, themes };
};
