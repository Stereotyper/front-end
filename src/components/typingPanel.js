import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import * as words from "../helpers/words.json";

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
  text-align: center;
`;
const TextInput = styled.input`
  text-align: left;
  font-family: inherit;
`;

const WordSpan = styled.span``;

export const TypingPanel = (props) => {
  const NUM_WORDS = 6;
  const [textInput, setTextInput] = useState("");
  const currentWordIndex = useRef(0);
  const wordList = ["test", "this", "and", "also", "something", "else"];
  const [word, setWord] = useState(wordList[currentWordIndex.current]);

  const wordRef = React.useRef(word);

  useEffect(() => {
    if (currentWordIndex.current == 0) {
      wordRef.current.children[currentWordIndex.current].className = `current`;
    }
  }, []);

  const randomIndexes = () => {
    for (let i = 0; i < NUM_WORDS; i++) {
      console.log(wordList);
    }
  };

  const onSpacePress = (event) => {
    if (event.charCode == 32) {
      // Check if word was typed correctly
      if (textInput === word) updateWord(currentWordIndex.current, true);
      else updateWord(currentWordIndex.current, false);

      // Set to next word and highlight
      if (currentWordIndex.current < NUM_WORDS) {
        currentWordIndex.current += 1;
        highlightNext(currentWordIndex.current);
        setWord(wordList[currentWordIndex.current]);
        clearText(event);
      }
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
      <div ref={wordRef}>
        {wordList.map((n, index) => (
          <WordSpan key={index}>{`${n}`}</WordSpan>
        ))}
      </div>

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
