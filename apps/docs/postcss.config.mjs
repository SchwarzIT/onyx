// @ts-check
import { postcssIsolateStyles } from "vitepress";

// see: https://vitepress.dev/guide/markdown#raw
export default {
  plugins: [postcssIsolateStyles()],
};
