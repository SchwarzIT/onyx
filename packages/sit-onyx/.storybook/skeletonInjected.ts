import { createSymbolArgTypeEnhancer } from "@sit-onyx/storybook-utils";

export const enhanceSkeletonInjectedSymbol = createSymbolArgTypeEnhancer(
  "SKELETON_INJECTED_SYMBOL",
  "If no value (or `undefined`) is provided, `SKELETON_INJECTED_SYMBOL` is the internal default value for this prop.\n" +
    "In that case the props value will be derived from it's parent form or page layout. Defaults to false.\n",
);
