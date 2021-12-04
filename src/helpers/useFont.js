import { useEffect, useState } from "react";
import { saveToLocalStorage, getFromLocalStorage } from "./storage";

const isBrowser = typeof window !== "undefined" && window.localStorage;

export const useFont = () => {
  const fonts = isBrowser && getFromLocalStorage("all-fonts");

  const defaultValue = isBrowser && fonts.data.Montserrat;

  const [font, setFont] = useState(defaultValue);

  const [fontLoaded, setFontLoaded] = useState(false);

  const saveFont = (mode) => {
    saveToLocalStorage("font", mode);
    setFont(mode);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const localFont = getFromLocalStorage("font");
      localFont ? setFont(localFont) : setFont(fonts.data.Montserrat);
      setFontLoaded(true);
    }
  }, []);

  return { font, fontLoaded, saveFont, fonts };
};
