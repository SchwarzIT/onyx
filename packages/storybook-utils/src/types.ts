import type { GlobalTypes } from "storybook/internal/csf";

type ToolbarArgType = GlobalTypes[number];
type ToolbarConfig = NonNullable<ToolbarArgType["toolbar"]>;
type ToolbarItem = Exclude<ToolbarConfig["items"][number], string>;

/**
 * Same as Storybook's `ToolbarArgType` but with support for generically typed value.
 */
export type StorybookGlobalType<TValue> = Omit<ToolbarArgType, "defaultValue" | "toolbar"> & {
  defaultValue?: TValue;
  toolbar: Omit<ToolbarConfig, "items"> & {
    items: (Omit<ToolbarItem, "value"> & { value?: TValue })[];
  };
};
