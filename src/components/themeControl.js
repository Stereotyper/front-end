import React from "react";
import styled from "styled-components";
import { useTheme } from "../helpers/useTheme";
import { ThemeButton } from "./themeButton";

const ThemeContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ThemeControl = ({ changeTheme, show }) => {
  const { themes } = useTheme();

  return (
    <ThemeContainer className={show}>
      {Object.keys(themes.data).map((theme) => (
        <ThemeButton
          changeTheme={changeTheme}
          theme={themes.data[theme]}
          key={themes.data[theme].name}
        />
      ))}
    </ThemeContainer>
  );
};
