import type { ComponentPropsAndSlots, Meta } from "@storybook/vue3";

/**
 * Extracts all event names defined by e.g. `defineEmits()` from the given Vue component.
 *
 * @example
 * ```ts
 * import Input from "./Input.vue";
 * type InputEvents = ExtractVueEventNames<typeof Input>; // e.g. "input" | "change"
 * ```
 */
export type ExtractVueEventNames<VueComponent> =
  Extract<
    // extract all props/events of the vue component that are functions
    ExtractKeysByValueType<
      // this generic type will extract ALL props and events from the given Vue component
      ComponentPropsAndSlots<VueComponent>,
      // emits are declared as functions, so we only take props/events that are functions and ignore the rest
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- We must use any here to match the type defined by Vue
      ((...args: any) => any) | undefined
    >,
    // filter out potential function properties by just picking events that start with "on"
    `on${string}`
  > extends `on${infer EventName}`
    ? // until now the extracted event names still start with "on" but we want to have the plain event name
      // so we will remove the "on" prefix and uncapitalized the first letter so e.g. "onClick" becomes "click"
      Uncapitalize<EventName>
    : never;

/**
 * Extracts only the keys from T whose value type satisfies U.
 *
 * @example
 * ```ts
 * type Test = ExtractKeysByValueType<{ a: boolean, b: number, c: boolean }, boolean>
 * // result: "a" | "c"
 * ```
 */
export type ExtractKeysByValueType<T, U> = { [P in keyof T]: T[P] extends U ? P : never }[keyof T] &
  keyof T;

/**
 * Options for defining Storybook actions and v-models.
 */
export type DefineStorybookActionsAndVModelsOptions<T> = Meta<T> & {
  component: NonNullable<T>;
  events: (ExtractVueEventNames<T> | "click" | "change")[];
};

export type StorybookGlobalType<TValue> = {
  name: string;
  description: string;
  defaultValue?: TValue;
  toolbar: {
    icon: string;
    items: { value: TValue; right?: string; title: string }[];
    title?: string;
    dynamicTitle?: boolean;
  };
};
