import * as words from "./words.json";

export function getRandomIndex(MAX_LENGTH) {
  return Math.floor(Math.random() * MAX_LENGTH);
}

export function createRandomWordList(MAX_LENGTH) {
  let wordList = [];
  for (let i = 0; i < MAX_LENGTH; i++) {
    wordList.push(words[getRandomIndex(MAX_LENGTH)]);
  }

  return wordList;
}
