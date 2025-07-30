import {
  computed,
  inject,
  ref,
  type ComputedRef,
  type InjectionKey,
  type MaybeRefOrGetter,
  type Ref,
} from "vue";
import { userConsole } from "../../utils/console.js";
import type { OnyxFABItemProps } from "../OnyxFABItem/types.js";

export type GlobalFABProvider = {
  /**
   * Readonly list of currently active items.
   */
  items: ComputedRef<Ref<ProvidedFABItem>[]>;
  /**
   * add the FABOption.
   */
  add: (item: MaybeRefOrGetter<ProvidedFABItem>) => void;
  /**
   * removes the FABOption with the given `id`.
   */
  remove: (id: ProvidedFABItem["id"]) => void;
};

export type ProvidedFABItem = OnyxFABItemProps & {
  /**
   * Unique FABItem id used to identify the FABItem.
   */
  id: symbol | number | string;
  /**
   * default is right but if all fabItems have right alignment it will be aligned to the right.
   */
  alignment?: "left" | "right";
  /**
   * Overrides properties of this FAB item if it's not the only available option.
   * If there are multiple FAB items displayed, the properties defined here will
   * take precedence for *this specific item*.
   */
  ifOption?: Omit<ProvidedFABItem, "ifOption" | "id" | "label"> & {
    label?: string;
  };
  /**
   * Custom class for the OnyxFABItem.
   */
  class?: string;
  /**
   * Callback when the FABIteom is clicked.
   */
  onClick?: () => void;
};

export const GLOBAL_FAB_PROVIDER_INJECTION_KEY = Symbol() as InjectionKey<GlobalFABProvider>;

/**
 * Creates a new FABItem provider that can be used with `useGlobalFAB()`.
 * Should be provided once on global app level with:
 *
 * @example
 * ```ts
 * import { createGlobalFABProvider, GLOBAL_FAB_PROVIDER_INJECTION_KEY } from "sit-onyx";
 *
 * app.provide(GLOBAL_FAB_PROVIDER_INJECTION_KEY, createGlobalFABProvider());
 * ```
 */
export const createGlobalFABProvider = (): GlobalFABProvider => {
  const items = ref<Ref<ProvidedFABItem>[]>([]);

  const add: GlobalFABProvider["add"] = (item: MaybeRefOrGetter<ProvidedFABItem>) => {
    items.value.push(ref(item) as Ref<ProvidedFABItem>);
  };

  const remove: GlobalFABProvider["remove"] = (id) => {
    items.value = items.value.filter((itemRef) => itemRef.value.id !== id);
  };

  return {
    // make items readonly so they can not be modified from the outside
    items: computed(() => items.value),
    add,
    remove,
  };
};

/**
 * Composable for showing FABItems.
 */
export const useGlobalFAB = () => {
  const logWarning = () => {
    userConsole?.warn(
      'Trying to use "useGlobalFAB()" before the global FAB provider has been provided. Make sure to "provide" it first.',
    );
  };

  const globalFABProvider = inject(
    GLOBAL_FAB_PROVIDER_INJECTION_KEY,
    // provide fallback so "useGlobalFAB()" does not return "undefined"
    () => {
      return {
        items: computed(() => []),
        add: logWarning,
        remove: logWarning,
      } satisfies GlobalFABProvider;
    },
    true,
  );

  return globalFABProvider;
};
