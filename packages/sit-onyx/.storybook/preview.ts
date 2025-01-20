import { createPreview } from "@sit-onyx/storybook-utils";
import { setup, type Preview } from "@storybook/vue3";
import { createToastProvider, TOAST_PROVIDER_INJECTION_KEY } from "../src";
import docsTemplate from "./docs-template.mdx";
import { onyxThemeGlobalType, withOnyxTheme } from "./theme-switch";

import "@fontsource-variable/source-code-pro";
import "@fontsource-variable/source-sans-3";
import "@sit-onyx/storybook-utils/style.css";
import { getRules, Spec } from "axe-core";
import { a11yTags } from "../src/a11yConfig";
import "../src/styles/index.scss";
import "./docs-template.scss";
import { enhanceFormInjectedSymbol } from "./formInjected";
import { enhanceManagedSymbol } from "./managed";
import brandImage from "./public/onyx-logo-long.svg";
import { withOnyxVModelDecorator } from "./vModel";
const enabledRules = getRules(a11yTags).map((ruleMetadata) => ({
  id: ruleMetadata.ruleId,
  enabled: true,
}));

const axeConfig: Spec = { rules: enabledRules };

const basePreview = createPreview(
  {
    argTypesEnhancers: [enhanceManagedSymbol, enhanceFormInjectedSymbol],
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
    decorators: [withOnyxTheme, withOnyxVModelDecorator],
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
          "Navigation",
          ["*", "modules"], // sort navigation module folder last
          "Layout",
          "Examples",
          "Support",
        ],
      },
    },
  },
};

export default preview;

setup((app) => {
  // provide toasts so they can be used in all Storybook examples
  app.provide(TOAST_PROVIDER_INJECTION_KEY, createToastProvider());
});
