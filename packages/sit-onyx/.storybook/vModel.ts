import { withVModelDecorator } from "@sit-onyx/storybook-utils";
import type { StrictInputType } from "storybook/internal/types";

const isManaged = (argType: StrictInputType) =>
  argType.table?.defaultValue?.summary === "MANAGED_SYMBOL";

/**
 * Custom `withVModelDecorator` filter function, because we want don't want to override values that are managed.
 */
export const withOnyxVModelDecorator = withVModelDecorator({
  filter: ({ table, name }, _, argTypes) => {
    if (table?.category !== "events" || !name.startsWith("update:")) return false;
    const propName = name.replace(/^update:/, "");
    return !argTypes.some((argType) => argType.name === propName && isManaged(argType));
  },
});
