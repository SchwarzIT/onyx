import { createPreview } from "@sit-onyx/storybook-utils";

import "@sit-onyx/storybook-utils/style.css";
import "@sit-onyx/vitepress-theme/index.scss";
import "sit-onyx/style.css";
import "vitepress/dist/client/theme-default/styles/base.css";
import "../src/.vitepress/theme/theme.scss";

const preview = {
  // we need to destructure here because as of Storybook 7.6
  // it can not statically analyze that the `preview` variable is an object
  ...createPreview(),
};

export default preview;
