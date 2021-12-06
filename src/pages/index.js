import * as React from "react";

import * as themes from "../json/themes.json";
import * as fonts from "../json/fonts.json";
import { saveToLocalStorage } from "../helpers/storage";
import { App } from "../components/App";

const IndexPage = () => {
  saveToLocalStorage("all-themes", themes.default);
  saveToLocalStorage("all-fonts", fonts.default);

  return (
    <main>
      <title>Stereotyper</title>
      <App />
    </main>
  );
};

export default IndexPage;
