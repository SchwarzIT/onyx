import type { Component } from "vue";
import type { ComponentExposed } from "vue-component-type-helpers";

/**
 * Picks the emits from an components property type.
 * e.g.:
 * ```ts
 * import MyInput from "./MyInput.vue";
 * import type { ComponentExposed } from "vue-component-type-helpers";
 *
 * type MyInputPublicProps = ComponentExposed<typeof MyInput>["$props"];
 * type MyInputVModelEmits = VModelEmits<MyInputPublicProps>; // => { 'onUpdate:modelValue': (newValue: string) => void }
 *
 * ```
 */
export type PickEmitsFromProps<T> = {
  // component emits start with `on`
  -readonly [key in keyof T as key extends `on${string}`
    ? // exclude onVnode emits
      key extends `onVnode${string}`
      ? never
      : key
    : never]: NonNullable<T[key]>;
};

/**
 * Unwraps the declared emits from a Vue component.
 */
export type ComponentEmitHandler<C extends Component> = PickEmitsFromProps<
  ComponentExposed<C>["$props"]
>;
