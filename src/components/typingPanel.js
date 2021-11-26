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

const WordSpanWrapper = styled.span`
  white-space: nowrap;
`;
const WordSpan = styled.span`
  ${({ current }) =>
    current &&
    `
    // background-color: blue;
  `}
  ${({ correct }) =>
    correct &&
    `
    background-color: green;
  `}
    ${({ incorrect }) =>
    incorrect &&
    `
    background-color: red;
  `}
`;

export const TypingPanel = () => {
  const NUM_WORDS = 100;
  const [textInput, setTextInput] = useState("");
  const currentWordIndex = useRef(0);
  const words = ["test", "this", "and", "also", "something", "else"];
  const [word, setWord] = useState(words[currentWordIndex.current]);

  const wordRef = React.useRef(word);

  // const wordRef = useRef(
  //   Array.from({ length: NUM_WORDS }, () => React.createRef())
  // );

  // let refs = useRef([React.createRef(), React.createRef()]);

  // console.log(wordRef.current);

  useEffect(() => {
    wordRef.current.children[currentWordIndex.current].focus();
  }, []);

  const randomIndexes = () => {
    for (let i = 0; i < NUM_WORDS; i++) {
      console.log(words);
    }
  };

  const onSpacePress = (event) => {
    if (event.charCode == 32) {
      // Check if word was typed correctly
      if (textInput === word) updateWord(currentWordIndex.current, true);
      else updateWord(currentWordIndex.current, false);

      // Set to next word and highlight
      currentWordIndex.current += 1;
      setWord(words[currentWordIndex.current]);
      highlightNext(currentWordIndex.current);
      clearText(event);
    }
  };

  const updateWord = (current, status) => {
    console.log(current);
    // incorrect/correct highlighting after space event
    console.log(`${status}: ${words[current]}`);
    console.log(`Current Index: ${current}`);
    console.log(wordRef.current.children[current]);
    if (status)
      wordRef.current.children[current].style.backgroundColor = "green";
    else wordRef.current.children[current].style.backgroundColor = "red";
  };

  const highlightNext = (index) => {
    console.log(`highlight => ${words[index]}`);
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
        {words.map((n, index) => (
          <WordSpan key={index} correct={""} incorrect={""}>
            {`${n}`}
          </WordSpan>
        ))}
      </div>
      <div>{word}</div>
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
