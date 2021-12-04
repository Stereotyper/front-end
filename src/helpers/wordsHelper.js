import * as words from "./words.json";

const MAX_WORDS = 1000;

export function getRandomIndex() {
  return Math.floor(Math.random() * MAX_WORDS);
}

export function createRandomWordList(MAX_LENGTH) {
  let wordList = [];
  while (wordList.length < MAX_LENGTH) {
    let number = getRandomIndex();
    if (wordList.indexOf(number) === -1) wordList.push(words[number]);
  }

  console.log(wordList);
  return wordList;
}
