import React, { useEffect, useRef, useState } from "react";
import { useLayoutEffect } from "react";
import styled from "styled-components";

import * as wordsArray from "../helpers/words.json";

// import *x function from ""
import { createRandomWordList } from "../helpers/wordsHelper";

const Panel = styled.div`
  display: flex;
  border: 1.2rem;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  align-content: center;
  margin: 0 auto;
`;

const TextDisplay = styled.div`
  text-align: justify;
  border: 1px solid black;
  padding: 10px;
  width: 45ch;
  margin: 0 auto;
  /* padding-bottom: 20px; */
`;

const TextInput = styled.input`
  padding: 10px;
  text-align: left;
  font-family: inherit;
  width: 45ch;
  margin: 0 auto;
  margin-bottom: 20px;
`;

export const TypingPanel = ({ numWords, list }) => {
  const NUM_WORDS = numWords;
  const [textInput, setTextInput] = useState("");

  const currentWordIndex = useRef(0);

  const [complete, setComplete] = useState(false);

  let wordList = list;
  const [word, setWord] = useState(wordList[0]);
  const wordRef = React.useRef(word);

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
    <Panel>
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
