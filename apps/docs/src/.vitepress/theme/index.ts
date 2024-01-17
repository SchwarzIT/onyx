import OnyxTheme from "@sit-onyx/vitepress-theme";
import type { Theme } from "vitepress";
import ColorPalette from "../components/ColorPalette.vue";

// custom styles must be imported after the theme
import "./theme.scss";

const theme: Theme = {
  extends: OnyxTheme,
  enhanceApp: (ctx) => {
    // globally provide frequently used custom components so
    // they can be used without importing them individually
    ctx.app.component("ColorPalette", ColorPalette);
  },
};

export default theme;
