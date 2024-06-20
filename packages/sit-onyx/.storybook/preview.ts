import { createPreview } from "@sit-onyx/storybook-utils";
import type { Preview } from "@storybook/vue3";
import docsTemplate from "./docs-template.mdx";

import "@sit-onyx/storybook-utils/style.css";
import "../src/styles/index.scss";
import "./docs-template.scss";

const basePreview = createPreview({
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
});

const preview: Preview = {
  ...basePreview,
  parameters: {
    ...basePreview.parameters,
    options: {
      storySort: {
        // TODO: fix order not completely working
        order: [
          "Introduction",
          "Buttons",
          "Form",
          "Basic",
          "Data",
          "Feedback",
          "Navigation",
          ["*", "modules"],
          "Layout",
          "Examples",
          "support",
        ],
      },
    },
  },
};

export default preview;
