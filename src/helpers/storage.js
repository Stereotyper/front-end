const isBrowser = typeof window !== "undefined";

export const saveToLocalStorage = (key, value) => {
  if (isBrowser) window.localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key) => {
  if (isBrowser) {
    const value = window.localStorage.getItem(key);

    if (value) {
      return JSON.parse(value);
    }
  }
};
