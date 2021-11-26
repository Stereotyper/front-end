import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.body};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ font }) => font.name};
    font-size: ${({ font }) => font.size};
    transition: all 0.35s linear;
    }

  .hidden {
    display: none !important;
  }

  input {
    font-family: ${({ font }) => font.name};
    font-size: ${({ font }) => font.size};
  }

  span {
    white-space: nowrap;
    display: inline-block;
    margin-right:5px;
    padding: 1px;
    /* background-color: ${({ theme }) => theme.colors.word.correct}; */

  }
`;
