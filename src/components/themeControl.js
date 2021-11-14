import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../helpers/globalStyle";
import { useTheme } from "../helpers/useTheme";

export const ThemeControl = () => {
  const { theme, themeLoaded, mappableThemes, themes } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  console.log(themes.data);

  useEffect(() => {
    setSelectedTheme(theme);
  }, [themeLoaded]);

  return (
    <div>
      {themeLoaded && (
        <ThemeProvider theme={selectedTheme}>
          <GlobalStyles />
          {Object.keys(themes.data).map((theme) => (
            <div>{theme}</div>
          ))}
        </ThemeProvider>
      )}
    </div>
  );
};
