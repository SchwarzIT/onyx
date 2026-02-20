// @ts-check
import { postcssIsolateStyles } from "vitepress";

// see: https://vitepress.dev/guide/markdown#raw
// enable support for "vp-raw" class to prevent VitePress styles for custom components that use onyx
export default {
  plugins: [
    postcssIsolateStyles({
      // see: https://vitepress.dev/guide/markdown#raw
      includeFiles: [/vp-doc\.css/, /base\.css/, "@sit-onyx/tiptap/style.css"],
    }),
  ],
};
