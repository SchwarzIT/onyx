import { createPreview } from "@sit-onyx/storybook-utils";
import docsTemplate from "./docs-template.mdx";

import "../src/styles/index.scss";
import "@sit-onyx/storybook-utils/style.css";
import "./docs-template.scss";

const preview = {
  // we need to destructure here because as of Storybook 7.6
  // it can not statically analyze that the `preview` variable is an object
  ...createPreview({
    parameters: {
      docs: {
        page: docsTemplate,
        toc: {
          title: "Table of Contents",
          // add our custom "Properties, Events and Slots" headline from docs-template.mdx to the table of contents
          headingSelector: ".sb-anchor > h3, #properties-events-and-slots, #examples",
        },
      },
    },
  }),
};

export default preview;
