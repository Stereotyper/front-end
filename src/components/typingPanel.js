import React, { useEffect, useRef, useState } from "react";
import { useLayoutEffect } from "react";
import styled from "styled-components";

import * as wordsArray from "../helpers/words.json";

const Panel = styled.div`
  border: 1.2rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  margin: 0 auto;
`;

const TextDisplay = styled.div`
  text-align: justify;
  border: 1px solid black;
  padding: 10px;
  width: 50ch;
  margin: 0 auto;
  transition: all 0.35s linear;
`;

const TextInput = styled.input`
  padding: 10px;
  text-align: left;
  font-family: inherit;
  width: 50ch;
  margin: 0 auto;
  margin-bottom: 20px;
`;

const TopButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const TopButton = styled.button`
  border: none;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  border: 1px solid black;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
  }
`;

export const TypingPanel = ({ numWords, list }) => {
  const NUM_WORDS = numWords;
  const [textInput, setTextInput] = useState("");

  const currentWordIndex = useRef(0);

  const [complete, setComplete] = useState(false);

  let wordList = list;
  const [word, setWord] = useState(list[0]);
  const wordRef = React.useRef(list[0]);

  useEffect(() => {
    if (currentWordIndex.current == 0) {
      wordRef.current.children[currentWordIndex.current].className = `current`;
    }
  }, []);

  const onSpacePress = (event) => {
    if (event.charCode == 32) {
      if (!complete) {
        // Check if word was typed correctly
        if (textInput === word) updateWord(currentWordIndex.current, true);
        else updateWord(currentWordIndex.current, false);

        // Set to next word and highlight
        currentWordIndex.current += 1;

        if (currentWordIndex.current == NUM_WORDS) {
          setComplete(true);
        }

        if (currentWordIndex.current < NUM_WORDS) {
          highlightNext(currentWordIndex.current);
          setWord(wordList[currentWordIndex.current]);
          clearText(event);
        }
      }
      clearText(event);
    }
  };

  const updateWord = (current, status) => {
    // incorrect/correct highlighting after space event
    if (status) wordRef.current.children[current].className = `correct`;
    else wordRef.current.children[current].className = `incorrect`;
  };

  const highlightNext = (index) => {
    wordRef.current.children[currentWordIndex.current].className = `current`;
  };

  const handleChange = (event) => {
    if (event.charCode == 32) clearText(event);
    setTextInput(event.target.value);
  };

  const clearText = (event) => {
    setTextInput("");
  };

  return (
    <Panel className="typing-panel">
      {/* <TopButtonsWrapper>
        <TopButton>Theme</TopButton>
        <TopButton>Randomize</TopButton>
        <TopButton>Font</TopButton>
      </TopButtonsWrapper> */}

      <TextDisplay ref={wordRef}>
        {wordList.map((word, index) => (
          <span key={index}>{`${word} `}</span>
        ))}
      </TextDisplay>
      <TextInput
        type="text"
        value={textInput.trim()}
        onKeyPress={(key) => onSpacePress(key)}
        onChange={handleChange}
        autoFocus
      />
    </Panel>
  );
};
