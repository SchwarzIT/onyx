import { createPreview } from "@sit-onyx/storybook-utils";
import { setup } from "@storybook/vue3";
import { Chart as ChartJS, registerables } from "chart.js";
import { registerOnyxPlugin } from "../src";

import "@sit-onyx/storybook-utils/style.css";
import "sit-onyx/src/styles/index.scss";

const preview = {
  // we need to destructure here because as of Storybook 7.6
  // it can not statically analyze that the `preview` variable is an object
  ...createPreview(),
};

export default preview;

setup(() => {
  ChartJS.register(...registerables);
  registerOnyxPlugin(ChartJS);
});
