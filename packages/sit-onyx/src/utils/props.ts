import { computed, type Component, type ConcreteComponent } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";
import type { Data, MaybePick } from "../types/utils.js";

export const useForwardProps = <
  T extends Data,
  C extends Component,
  R = MaybePick<T, keyof ComponentProps<C>>,
>(
  props: T,
  target: C,
) =>
  computed(() => {
    const keys = new Set(Object.keys((target as ConcreteComponent).props));
    return Object.fromEntries(Object.entries(props).filter(([key]) => keys.has(key))) as R;
  });
