import React from "react";
import { useTheme } from "../helpers/useTheme";
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

export const ThemeButton = ({ changeTheme, theme }) => {
  const { saveTheme } = useTheme();

  const themeSwitcher = (selectedTheme) => {
    saveTheme(selectedTheme);
    changeTheme(selectedTheme);
  };

  return (
    <Button
      onClick={() => themeSwitcher(theme)}
      style={{
        backgroundColor: `${theme.colors.button.background}`,
        color: `${theme.colors.button.text}`,
      }}
    >
      {theme.name}
    </Button>
  );
};
