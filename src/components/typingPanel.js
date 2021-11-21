import React, { useState } from "react";
import styled from "styled-components";

const Panel = styled.div`
  display: flex;
  border: 1.2rem;
  justify-content: center;
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

  const onSpacePress = (event) => {
    if (event.charCode == 32) clearText(event);
  };

  const handleChange = (event) => {
    setTextInput(event.target.value);
  };

  const clearText = (event) => {
    setTextInput("");
  };

  return (
    <Panel>
      <TextInput
        type="text"
        value={textInput}
        onKeyPress={(key) => onSpacePress(key)}
        onChange={handleChange}
      />
    </Panel>
  );
};
