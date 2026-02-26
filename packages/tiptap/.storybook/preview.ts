import "@fontsource-variable/source-code-pro";
import "@fontsource-variable/source-sans-3";
import "@sit-onyx/storybook-utils/style.css";
import "sit-onyx/style.css";
import "../../sit-onyx/.storybook/docs-template.scss";

import { createPreview, withVModelDecorator } from "@sit-onyx/storybook-utils";
import { Preview } from "@storybook/vue3-vite";
import docsTemplate from "../../sit-onyx/.storybook/docs-template.mdx";

const basePreview = createPreview({
  parameters: {
    docs: {
      page: docsTemplate,
      toc: {
        title: "Table of Contents",
        // add our custom "Properties, Events and Slots" headline from docs-template.mdx to the table of contents
        headingSelector: ".sb-anchor > h3, #properties-events-and-slots, #examples",
      },
      codePanel: true,
    },
  },
});

const preview: Preview = {
  // we need to destructure here because as of Storybook 7.6
  // it can not statically analyze that the `preview` variable is an object
  ...basePreview,
  tags: ["autodocs"],
  decorators: [withVModelDecorator()],
  parameters: {
    ...basePreview.parameters,
    options: {
      storySort: {
        order: ["Getting Started", "Form Elements", "Support"],
      },
    },
    docs: {
      ...basePreview.parameters.docs,
      source: {
        ...basePreview.parameters.docs.source,
        /**
         * Use a custom transformer for the story source code to better fit to our
         * Vue.js code because storybook per default does not render it exactly how
         * we want it to look.
         * @see https://storybook.js.org/docs/react/api/doc-block-source
         */
        transform: async (raw: string) => {
          // prevent duplicate transforms
          if (raw.includes("@sit-onyx/tiptap")) return raw;

          // fix code snippets that show components imported from "sit-onyx" instead of "@sit-onyx/tiptap"
          const code = await basePreview.parameters.docs.source.transform(raw);
          return code.replace('from "sit-onyx";', 'from "@sit-onyx/tiptap";');
        },
      },
    },
  },
};

export default preview;
