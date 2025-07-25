import { createPreview } from "@sit-onyx/storybook-utils";
import { setup } from "@storybook/vue3-vite";
import { Chart, registerables } from "chart.js";
import { registerOnyxPlugin } from "../src";

import "@fontsource-variable/source-code-pro";
import "@fontsource-variable/source-sans-3";
import "@sit-onyx/storybook-utils/style.css";
import "sit-onyx/src/styles/index.scss";

const preview = {
  // we need to destructure here because as of Storybook 7.6
  // it can not statically analyze that the `preview` variable is an object
  ...createPreview(),
};

export default preview;

setup(() => {
  Chart.register(...registerables);
  registerOnyxPlugin(Chart);
});
