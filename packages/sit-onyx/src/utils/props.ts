import { computed, type ConcreteComponent } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";
import type { Data, MaybePick } from "../types/utils.js";

// region docs
/**
 * The computed value is an object, that only contains properties that are defined by the target component.
 * Is useful to forward only a matching subset of properties from a parent component to a wrapped child component.
 *
 * This is necessary when the parent defines props, which are not defined in the child component.
 * Otherwise, the child component will set the extraneous props as attributes, which bloats the DOM and can lead to unexpected side-effects.
 *
 * @example
 *
 * ```vue
 * <script setup lang="ts">
 * import { useForwardProps } from "sit-onyx";
 * import MyChildComponent from "./MyChildComponent.vue";
 *
 * const props = defineProps<ParentProps & ChildProps>();
 * const childProps = useForwardProps(props, MyChildComponent);
 * </script>
 * <template>
 *   <!-- childProps only includes props that exist on MyChildComponent -->
 *   <MyChildComponent v-bind="childProps" />
 * </template>
 * ```
 *
 * @param props The reactive props object of the parent component.
 * @param target Component for which the properties are to be forwarded.
 * @returns computed value with properties that are also defined the target component.
 */
export const useForwardProps = <
  T extends Data,
  TComponent,
  TProps = ComponentProps<TComponent>,
  R = MaybePick<T, keyof TProps>,
>(
  props: T,
  target: TComponent,
) => {
  // endregion docs
  const keys = new Set(Object.keys((target as ConcreteComponent).props));
  return computed(
    () => Object.fromEntries(Object.entries(props).filter(([key]) => keys.has(key))) as R,
  );
};
