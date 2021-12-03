import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../helpers/globalStyle";
import { useTheme } from "../helpers/useTheme";
import { useFont } from "../helpers/useFont";
import { FontControl } from "./fontControl";

import { ThemeControl } from "./themeControl";
import { TypingPanel } from "./typingPanel";
import { createRandomWordList } from "../helpers/wordsHelper";

const Header = styled.div`
  text-align: center;
  font-family: "Nixie One", cursive;
  font-size: 48px;
  padding-bottom: 20px;
`;

export const App = () => {
  const NUM_WORDS = 75;
  const { theme, themeLoaded } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const { font, fontLoaded } = useFont();
  const [selectedFont, setSelectedFont] = useState(font);
  const [list] = useState(createRandomWordList(NUM_WORDS));

  useEffect(() => {
    setSelectedFont(font);
    setSelectedTheme(theme);
  }, [themeLoaded, fontLoaded]);

  return (
    <div>
      {themeLoaded && (
        <ThemeProvider theme={selectedTheme}>
          <GlobalStyles font={selectedFont} />
          <div>
            <Header>StereoTyper.io</Header>
            <TypingPanel
              numWords={NUM_WORDS}
              list={list}
              theme={selectedTheme}
            />
            <ThemeControl changeTheme={setSelectedTheme} />
            <FontControl changeFont={setSelectedFont} />
          </div>
        </ThemeProvider>
      )}
    </div>
  );
};
