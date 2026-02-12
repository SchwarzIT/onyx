import "@fontsource-variable/source-code-pro";
import "@fontsource-variable/source-sans-3";
import "@sit-onyx/storybook-utils/style.css";
import "sit-onyx/style.css";

import { createPreview, withVModelDecorator } from "@sit-onyx/storybook-utils";
import { Preview } from "@storybook/vue3-vite";

const preview: Preview = {
  // we need to destructure here because as of Storybook 7.6
  // it can not statically analyze that the `preview` variable is an object
  ...createPreview(),
  tags: ["autodocs"],
  decorators: [withVModelDecorator()],
};

export default preview;
