import { withGlobalVModelDecorator } from "@sit-onyx/storybook-utils";

export const withOnyxVModelDecorator = withGlobalVModelDecorator({
  filter: ({ table, name }) =>
    table?.category === "event" &&
    name.startsWith("update:") &&
    table.defaultValue?.summary !== "MANAGED_SYMBOL",
});
