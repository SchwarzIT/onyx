import { withVModelDecorator } from "@sit-onyx/storybook-utils";

/**
 * Custom `withVModelDecorator` filter function, because we want don't want to override values that are managed.
 */
export const withOnyxVModelDecorator = withVModelDecorator({
  filter: ({ table, name }, _, array) => {
    if (table?.category !== "events" || !name.startsWith("update:")) return false;
    const propName = name.replace(/^update:/, "");
    return !array.some(
      (argType) =>
        argType.name === propName && argType.table?.defaultValue?.summary === "MANAGED_SYMBOL",
    );
  },
});
