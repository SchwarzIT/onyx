import OnyxTheme from "@sit-onyx/vitepress-theme";
import type { Theme } from "vitepress";
import TopicOverviewCard from "../components/TopicOverviewCard.vue";
import TheLayout from "./TheLayout.vue";

// custom styles must be imported after the theme
import "./theme.scss";

const theme: Theme = {
  extends: OnyxTheme,
  enhanceApp: (ctx) => {
    // register commonly used custom components globally so they can
    // be used without needing to import them
    ctx.app.component("TopicOverviewCard", TopicOverviewCard);
  },
  Layout: TheLayout,
};

export default theme;
