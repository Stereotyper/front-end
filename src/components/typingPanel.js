import React, { useEffect, useRef, useState } from "react";
import { useTime } from "../helpers/useTime";
import styled from "styled-components";

const Panel = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.text};
  border-radius: 7px;
  padding: 15px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  margin: 0 auto;
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
  border-radius: 5px;
`;

const ResetButton = styled.button`
  background: ${({ theme }) => theme.colors.button.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  font-size: inherit;
  width: 20%;
  margin-left: 10px;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
  }
`;

export const TypingPanel = ({ numWords, list, onReset, calculateWPM }) => {
  const [wordList, setWordList] = useState(list);
  const NUM_WORDS = numWords;
  const [textInput, setTextInput] = useState("");
  const currentWordIndex = useRef(0);
  const [complete, setComplete] = useState(false);
  const [word, setWord] = useState(list[0]);
  const wordRef = useRef(list[0]);
  const [letterIndex, setLetterIndex] = useState(0);
  const errorCount = useRef(0);
  const [started, setStarted] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const focus = useRef();

  const now = useTime(1000);

  useEffect(() => {
    setWordList(list);
    setWord(list[0]);

    wordRef.current.children[currentWordIndex.current].className = `current`;
  }, [list, wordRef, currentWordIndex]);

  const startGame = () => {
    setSeconds(now);
    setStarted(true);
  };

  const resetGame = () => {
    setSeconds(0);
    setStarted(false);
  };

  const onKeyPress = (event) => {
    if (event.charCode == 32) {
      focus.current.className = `reset-error`;

      if (!complete) {
        // Check if word was typed correctly
        if (textInput == word) updateWord(currentWordIndex.current, true);
        else updateWord(currentWordIndex.current, false);

        // Set to next word and highlight
        currentWordIndex.current += 1;

        if (currentWordIndex.current == NUM_WORDS) {
          calculateWPM(Math.floor((now - seconds) / 1000));

          setComplete(true);
          setLetterIndex(0);
          errorCount.current = 0;
          resetGame();
        }

        if (currentWordIndex.current < NUM_WORDS) {
          highlightNext(currentWordIndex.current);
          setWord(wordList[currentWordIndex.current]);
          setLetterIndex(0);
          errorCount.current = 0;
          clearText();
        }
      }
      clearText();
    } else if (event.charCode != 13) {
      if (!started) startGame();
      checkCorrectLetter(event.charCode);
      setLetterIndex(letterIndex + 1);
    }
  };

  const checkCorrectLetter = (charCode) => {
    let letter = String.fromCharCode(charCode);

    if (letter !== wordList[currentWordIndex.current][letterIndex]) {
      errorCount.current += 1;

      focus.current.className = `typing-error`;
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
    if (!event.target.value) {
      focus.current.className = `reset-error`;
    }

    if (event.charCode == 32) clearText();
    setTextInput(event.target.value);
  };

  const clearText = () => {
    setTextInput("");
  };

  const handleClick = (event) => {
    for (let i = 0; i < NUM_WORDS; i++) {
      wordRef.current.children[i].className = ``;
    }
    currentWordIndex.current = 0;
    focus.current.focus();
    setComplete(false);
    clearText();
    onReset();
  };

  return (
    <Panel className="typing-panel">
      <TextDisplay ref={wordRef}>
        {wordList.map((word, index) => (
          <span key={index}>{`${word} `}</span>
        ))}
      </TextDisplay>

      <TextInputWrapper>
        <TextInput
          type="text"
          value={textInput.trim()}
          onKeyPress={(key) => onKeyPress(key)}
          onKeyDown={(e) => {
            if (e.key === "Backspace") {
              if (letterIndex != 0) {
                setLetterIndex(letterIndex - 1);
              }

              if (errorCount.current != 0) {
                errorCount.current -= 1;
              }

              if (errorCount.current === 0)
                focus.current.className = `reset-error`;
            }
          }}
          onChange={handleChange}
          ref={focus}
          autoFocus
        />
        <ResetButton onClick={() => handleClick()}>reset</ResetButton>
      </TextInputWrapper>
      <p>{now}</p>
    </Panel>
  );
};
