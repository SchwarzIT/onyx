import { createSymbolArgTypeEnhancer } from "@sit-onyx/storybook-utils";

export const enhanceManagedSymbol = createSymbolArgTypeEnhancer(
  "MANAGED_SYMBOL",
  "If no value (or `undefined`) is passed, `MANAGED_SYMBOL` is the internal default value for this prop.\n" +
    "It signals the component that the prop is managed and it's state tracked internally.\n" +
    "So in that case no prop binding or `v-model` is necessary.\n" +
    "Updates for the prop will still be emitted.\n",
);
