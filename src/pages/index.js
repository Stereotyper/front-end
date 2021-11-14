import * as React from "react";

import * as themes from "../helpers/themes.json";
import { saveToLocalStorage } from "../helpers/storage";
import { ThemeControl } from "../components/themeControl";

const IndexPage = () => {
  saveToLocalStorage("all-themes", themes.default);

  return (
    <main>
      <title>Stereotyper</title>
      <ThemeControl />
    </main>
  );
};

export default IndexPage;
