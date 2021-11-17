import React from "react";
import { useFont } from "../helpers/useFont";
import styled from "styled-components";

const Button = styled.div`
  border: none;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-right: 10px;
  border: 1px solid black;
  border-radius: 5px;
  width: 100%;

  &:hover {
    cursor: pointer;
  }
`;

export const FontButton = ({ changeFont, font }) => {
  const { saveFont } = useFont();

  const fontSwitcher = (selectedFont) => {
    saveFont(selectedFont);
    changeFont(selectedFont);
  };
  return (
    <Button
      onClick={() => fontSwitcher(font)}
      style={{
        fontFamily: `${font.name}`,
        // backgroundColor: `${theme.colors.button.background}`,
        // color: `${theme.colors.button.text}`,
      }}
    >
      {font.name}
    </Button>
  );
};
