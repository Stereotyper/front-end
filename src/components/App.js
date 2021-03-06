import React, { useState, useEffect, useRef } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../helpers/globalStyle";
import { useTheme } from "../helpers/useTheme";
import { useFont } from "../helpers/useFont";

import { ThemeControl } from "../components/themeControl";
import { FontControl } from "../components/fontControl";
import { TypingPanel } from "./typingPanel";
import { createRandomWordList } from "../helpers/wordsHelper";

import { FaAngleLeft } from "react-icons/fa";

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
  padding: 10px;
  width: 25%;

  &:hover {
    cursor: pointer;
  }
`;

const WPM = styled.p`
  font-size: 1.4rem;
`;

const Mistakes = styled.p`
  font-size: 1.4rem;
`;

const TopButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const App = () => {
  const NUM_WORDS = 10;
  const { theme, themeLoaded } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const { font, fontLoaded } = useFont();
  const [selectedFont, setSelectedFont] = useState(font);
  const [list, setList] = useState(createRandomWordList(NUM_WORDS));
  const [wpm, setWPM] = useState("");
  const [incorrectWords, setIncorrectWords] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  const [showTheme, setShowTheme] = useState("hidden");
  const [showFont, setShowFont] = useState("hidden");
  const [showTyper, setShowTyper] = useState("");
  const [showBack, setShowBack] = useState("hidden");

  useEffect(() => {
    setSelectedFont(font);
    setSelectedTheme(theme);
  }, [themeLoaded, fontLoaded, theme]);

  const updateList = () => {
    setList(createRandomWordList(NUM_WORDS));
    setWPM(0);
    setIncorrectWords(0);
    setAccuracy(0);
  };

  const showThemes = () => {
    setShowTheme("");
    setShowTyper("hidden");
    setShowBack("");
  };

  const showFonts = () => {
    setShowFont("");
    setShowTyper("hidden");
    setShowBack("");
  };

  const goBack = () => {
    setShowTyper("");
    setShowFont("hidden");
    setShowTheme("hidden");
    setShowBack("hidden");
  };

  const updateWPM = (seconds) => {
    setWPM(((NUM_WORDS / seconds) * 60).toFixed(2));
  };

  const updateMistakes = (count) => {
    setIncorrectWords(incorrectWords + count);
  };

  const updateAccuracy = (errors) => {
    let count = 0;

    for (let i = 0; i < NUM_WORDS; i++) {
      count += list[i].length;
    }

    setAccuracy((((count - errors) / count) * 100).toFixed(2));
  };

  return (
    <div className="app">
      {themeLoaded && fontLoaded && (
        <ThemeProvider theme={selectedTheme} font={selectedFont}>
          <GlobalStyles font={selectedFont} />
          <Header>StereoTyper.io</Header>

          <PanelWrapper>
            <TopButton className={showBack} onClick={() => goBack()}>
              <FaAngleLeft />
            </TopButton>

            <FontControl show={showFont} changeFont={setSelectedFont} />
            <ThemeControl show={showTheme} changeTheme={setSelectedTheme} />

            <div className={showTyper}>
              <TopButtonsWrapper>
                <TopButton onClick={() => showThemes()}>Theme</TopButton>

                <TopButton onClick={() => showFonts()}>Font</TopButton>
              </TopButtonsWrapper>

              <TypingPanel
                onReset={updateList}
                numWords={NUM_WORDS}
                list={list}
                calculateWPM={updateWPM}
                calculateMistakes={updateMistakes}
                calculateAccuracy={updateAccuracy}
              />
              <BottomWrapper>
                <WPM>WPM: {wpm == 0 ? "-" : wpm}</WPM>
                <Mistakes>
                  Errors: {incorrectWords == 0 ? "0" : incorrectWords}
                </Mistakes>
                <Mistakes>Acc: {accuracy == 0 ? "0" : accuracy}</Mistakes>
              </BottomWrapper>
            </div>
          </PanelWrapper>
        </ThemeProvider>
      )}
    </div>
  );
};
