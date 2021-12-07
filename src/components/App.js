import React, { useState, useEffect, useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../helpers/globalStyle";
import { useTheme } from "../helpers/useTheme";
import { useFont } from "../helpers/useFont";

import { ThemeControl } from "../components/themeControl";
import { FontControl } from "../components/fontControl";
import { TypingPanel } from "./typingPanel";
import { createRandomWordList } from "../helpers/wordsHelper";

const Header = styled.div`
  text-align: center;
  font-family: "Nixie One", cursive;
  font-size: 48px;
  padding-bottom: 20px;
`;

const PanelWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const TopButton = styled.button`
  background: ${({ theme }) => theme.colors.button.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  font-size: inherit;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
  }
`;

const TopButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const App = () => {
  const NUM_WORDS = 45;
  const { theme, themeLoaded } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const { font, fontLoaded } = useFont();
  const [selectedFont, setSelectedFont] = useState(font);
  const [list, setList] = useState(createRandomWordList(NUM_WORDS));

  const [showTheme, setShowTheme] = useState("hidden");
  const [showFont, setShowFont] = useState("hidden");

  useEffect(() => {
    setSelectedFont(font);
    setSelectedTheme(theme);
  }, [themeLoaded, fontLoaded]);

  const updateList = () => {
    setList(createRandomWordList(NUM_WORDS));
  };

  const showThemes = () => {
    if (showTheme === "hidden") setShowTheme("");
    else setShowTheme("hidden");
  };

  const randomize = () => {
    console.log("randomize");
  };

  const showFonts = () => {
    if (showFont === "hidden") setShowFont("");
    else setShowFont("hidden");
  };

  return (
    <div className="app">
      {themeLoaded && fontLoaded && (
        <ThemeProvider theme={selectedTheme} font={selectedFont}>
          <GlobalStyles font={selectedFont} />
          <Header>StereoTyper.io</Header>

          <PanelWrapper>
            <TopButtonsWrapper>
              <TopButton onClick={() => showThemes()}>Theme</TopButton>
              <TopButton onClick={() => randomize()}>Randomize</TopButton>
              <TopButton onClick={() => showFonts()}>Font</TopButton>
            </TopButtonsWrapper>

            <TypingPanel
              onReset={updateList}
              numWords={NUM_WORDS}
              list={list}
              font={selectedFont}
            />
          </PanelWrapper>
          <ThemeControl show={showTheme} changeTheme={setSelectedTheme} />
          <FontControl show={showFont} changeFont={setSelectedFont} />
        </ThemeProvider>
      )}
    </div>
  );
};
