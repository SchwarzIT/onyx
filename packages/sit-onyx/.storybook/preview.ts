import "@fontsource-variable/source-code-pro";
import "@fontsource-variable/source-sans-3";
import "@sit-onyx/storybook-utils/style.css";
import "../src/styles/index.scss";
import "./docs-template.scss";

import { createPreview, withVModelDecorator } from "@sit-onyx/storybook-utils";
import { setup, type Preview } from "@storybook/vue3";
import { getRules, Spec } from "axe-core";
import { createOnyx } from "../src";
import { a11yTags } from "../src/a11yConfig";
import docsTemplate from "./docs-template.mdx";
import { enhanceFormInjectedSymbol } from "./formInjected";
import brandImage from "./public/onyx-logo-long.svg";
import { enhanceSkeletonInjectedSymbol } from "./skeletonInjected";
import { onyxThemeGlobalType, withOnyxTheme } from "./theme-switch";

const enabledRules = getRules(a11yTags).map((ruleMetadata) => ({
  id: ruleMetadata.ruleId,
  enabled: true,
}));

const axeConfig: Spec = { rules: enabledRules };

const basePreview = createPreview(
  {
    argTypesEnhancers: [enhanceSkeletonInjectedSymbol, enhanceFormInjectedSymbol],
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
      a11y: {
        config: axeConfig,
      },
    },
    globalTypes: {
      ...onyxThemeGlobalType,
    },
    decorators: [withOnyxTheme, withVModelDecorator()],
  },
  {
    brandImage,
    brandTitle: "onyx Storybook",
    brandUrl: "https://onyx.schwarz",
  },
);

const preview: Preview = {
  ...basePreview,
  tags: ["autodocs"],
  parameters: {
    ...basePreview.parameters,
    options: {
      storySort: {
        order: [
          "Introduction",
          "Buttons",
          "Form Elements",
          "Basic",
          "Data",
          "Feedback",
          "Notifications",
          "Navigation",
          "Progress",
          ["*", "modules"], // sort navigation module folder last
          "Layout",
          "Examples",
          "Illustrations",
          "Support",
        ],
      },
    },
  },
};

export default preview;

setup((app) => {
  // provide onyx plugin so e.g. toast, notifications etc. can be used in all Storybook examples
  app.use(createOnyx());
});
