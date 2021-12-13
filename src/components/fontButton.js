import React from "react";
import { useFont } from "../helpers/useFont";
import styled from "styled-components";

const Button = styled.div`
  background: ${({ theme }) => theme.colors.button.background};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.text};
  padding: 10px;
  text-align: center;
  line-height: normal;
  margin-right: 10px;
  margin-top: 10px;
  border-radius: 5px;
  width: 25%;

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
