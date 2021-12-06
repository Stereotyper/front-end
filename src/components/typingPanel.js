import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Panel = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.text};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 7px;
  padding: 15px;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  margin: 0 auto;
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

const TextDisplay = styled.div`
  text-align: justify;
  width: 50ch;
  margin: 0 auto;
  transition: all 0.35s linear;
`;

const TextInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

const TextInput = styled.input`
  padding: 10px;
  text-align: left;
  font-family: inherit;
  width: 80%;
  margin: 0 auto;
`;

const ResetButton = styled.button`
  background: ${({ theme }) => theme.colors.button.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  font-size: inherit;
  width: 20%;
`;

export const TypingPanel = ({ numWords, list, onReset }) => {
  const [wordList, setWordList] = useState(list);
  const NUM_WORDS = numWords;

  const [textInput, setTextInput] = useState("");

  const currentWordIndex = useRef(0);

  const [complete, setComplete] = useState(false);

  const [word, setWord] = useState(list[0]);

  const wordRef = useRef(list[0]);

  useEffect(() => {
    setWordList(list);
    setWord(list[0]);

    wordRef.current.children[currentWordIndex.current].className = `current`;
  }, [list, wordRef, currentWordIndex]);

  const onSpacePress = (event) => {
    if (event.charCode == 32) {
      if (!complete) {
        // Check if word was typed correctly

        if (textInput == word) updateWord(currentWordIndex.current, true);
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

  const handleClick = () => {
    for (let i = 0; i < NUM_WORDS; i++) {
      wordRef.current.children[i].className = ``;
    }
    currentWordIndex.current = 0;

    onReset();
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

      <TextInputWrapper>
        <TextInput
          type="text"
          value={textInput.trim()}
          onKeyPress={(key) => onSpacePress(key)}
          onChange={handleChange}
          autoFocus
        />
        <ResetButton onClick={() => handleClick()}>Reset</ResetButton>
      </TextInputWrapper>
    </Panel>
  );
};
