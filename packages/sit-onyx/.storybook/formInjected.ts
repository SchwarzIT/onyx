import { createSymbolArgTypeEnhancer } from "@sit-onyx/storybook-utils";

export const enhanceFormInjectedSymbol = createSymbolArgTypeEnhancer(
  "FORM_INJECTED_SYMBOL",
  "If no value (or `undefined`) is provided, `FORM_INJECTED_SYMBOL` is the internal default value for this prop.\n" +
    "In that case the props value will be derived from it's parent form (if it exists).\n",
);
