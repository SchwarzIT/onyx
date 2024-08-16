import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

import "@fontsource-variable/source-code-pro";
import "@fontsource-variable/source-sans-3";
import "./index.scss";

const theme: Theme = {
  extends: DefaultTheme,
};

export default theme;
