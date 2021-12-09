import React from "react";
import { useFont } from "../helpers/useFont";
import styled from "styled-components";

const Button = styled.div`
  background: ${({ theme }) => theme.colors.button.background};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  padding: 15px 32px;
  text-align: center;
  margin-right: 10px;
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 5px;

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
      }}
    >
      {font.name}
    </Button>
  );
};
