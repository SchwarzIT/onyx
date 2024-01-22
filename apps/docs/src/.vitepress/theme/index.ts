import OnyxTheme from "@sit-onyx/vitepress-theme";
import type { Theme } from "vitepress";
import TopicOverviewCard from "../components/TopicOverviewCard.vue";

// custom styles must be imported after the theme
import "./theme.scss";

const theme: Theme = {
  extends: OnyxTheme,
  enhanceApp: (ctx) => {
    ctx.app.component("TopicOverviewCard", TopicOverviewCard);
  },
};

export default theme;
