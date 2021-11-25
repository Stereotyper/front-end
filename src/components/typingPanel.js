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
    background-color: blue;
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
  const index = useRef(0);
  const words = ["test", "this", "and", "also", "something", "else"];
  const [word, setWord] = useState(words[index.current]);

  const randomIndexes = () => {
    for (let i = 0; i < NUM_WORDS; i++) {
      console.log(words);
    }
  };

  const onSpacePress = (event) => {
    if (event.charCode == 32) {
      if (textInput === word) console.log("cool");
      else console.log("uncool");
      index.current += 1;
      setWord(words[index.current]);
      updateWord(index.current);
      clearText(event);
    }
  };

  const updateWord = (index) => {
    // incorrect/correct highlighting after space event
    // highlight next word to type
    console.log(index);
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
      <div>
        {words.map((n, index) => (
          <WordSpanWrapper key={index}>
            <WordSpan key={index} current={index == 0} correct="" incorrect="">
              {`${n}`}
            </WordSpan>
            {` `}
          </WordSpanWrapper>
        ))}
      </div>
      <div>{word}</div>
      <TextInput
        type="text"
        value={textInput.trim()}
        onKeyPress={(key) => onSpacePress(key)}
        onChange={handleChange}
      />
    </Panel>
  );
};
