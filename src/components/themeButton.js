import React from "react";
import { useTheme } from "../helpers/useTheme";
import styled from "styled-components";

const Button = styled.div`
  padding: 15px 32px;
  text-align: center;
  font-size: 1.2rem;
  margin-right: 10px;
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 5px;

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
