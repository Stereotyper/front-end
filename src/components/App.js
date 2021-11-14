import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../helpers/globalStyle";
import { useTheme } from "../helpers/useTheme";

import { ThemeControl } from "./themeControl";

export const App = () => {
  const { theme, themeLoaded } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  useEffect(() => {
    setSelectedTheme(theme);
  }, [themeLoaded]);

  return (
    <>
      {themeLoaded && (
        <ThemeProvider theme={selectedTheme}>
          <GlobalStyles />
          <div>
            <h1>StereoTyper</h1>

            <ThemeControl changeTheme={setSelectedTheme} />
          </div>
        </ThemeProvider>
      )}
    </>
  );
};
