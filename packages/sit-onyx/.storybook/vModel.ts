import { withVModelDecorator } from "@sit-onyx/storybook-utils";

export const withOnyxVModelDecorator = withVModelDecorator({
  filter: ({ table, name }) =>
    table?.category === "events" &&
    name.startsWith("update:") &&
    table.defaultValue?.summary !== "MANAGED_SYMBOL",
});
