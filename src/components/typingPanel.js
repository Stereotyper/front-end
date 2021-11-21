import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

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

export const TypingPanel = () => {
  const [textInput, setTextInput] = useState("");
  const index = useRef(0);
  const words = ["test", "this", "and", "also", "something", "else"];
  const [word, setWord] = useState(words[index.current]);

  const onSpacePress = (event) => {
    if (event.charCode == 32) {
      if (textInput === word) console.log("cool");
      else console.log("uncool");
      index.current += 1;
      setWord(words[index.current]);
      clearText(event);
    }
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
      <div>{words.join(" ")}</div>
      <div>{word}</div>
      {/* <div>{words[index.current + 1]}</div> */}
      <TextInput
        type="text"
        value={textInput.trim()}
        onKeyPress={(key) => onSpacePress(key)}
        onChange={handleChange}
      />
    </Panel>
  );
};
