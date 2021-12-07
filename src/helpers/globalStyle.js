import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

  html, body, #___gatsby, #gatsby-focus-wrapper {
    height: 100%;
  }

  main {
    height: 100%;
  }

  .app{
    height: 100%;
  }

  .button{
    font-family: ${({ font }) => font.name};
    font-size: ${({ font }) => font.size};
  }

  body {
    background: ${({ theme }) => theme.colors.body};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ font }) => font.name};
    font-size: ${({ font }) => font.size};
    transition: all 0.35s linear;
    margin: 0px;
  }

  .hidden {
    display: none !important;
  }

  input {
    background: ${({ theme }) => theme.colors.body};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ font }) => font.name};
    font-size: ${({ font }) => font.size};
    transition: all 0.35s linear;
  }

  .current {
    color: ${({ theme }) => theme.colors.word.current};
  }

  .correct {
    color: ${({ theme }) => theme.colors.word.correct};
  }

  .incorrect {
    color: ${({ theme }) => theme.colors.word.incorrect};
  }

`;
