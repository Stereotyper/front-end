import { useEffect, useState } from "react";
import { saveToLocalStorage, getFromLocalStorage } from "./storage";

export const useFont = () => {
  const fonts = getFromLocalStorage("all-fonts");

  const [font, setFont] = useState(fonts.data.basic);

  const [fontLoaded, setFontLoaded] = useState(false);

  const saveFont = (mode) => {
    saveToLocalStorage("font", mode);
    setFont(mode);
  };

  useEffect(() => {
    const localFont = getFromLocalStorage("font");
    localFont ? setFont(localFont) : setFont(fonts.data.basic);
    setFontLoaded(true);
  });

  return { font, fontLoaded, saveFont, fonts };
};
