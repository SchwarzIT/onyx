import { addons } from "storybook/manager-api";

addons.setConfig({
  toolbar: {
    // Per onyx storybook configuration, there is only a single, default (dynamic) theme.
    // Therefore the background select is redundant.
    "storybook/background": { hidden: true },
  },
});
