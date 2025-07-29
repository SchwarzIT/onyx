import { computed, inject, ref, type ComputedRef, type InjectionKey } from "vue";
import { userConsole } from "../../utils/console.js";
import type { OnyxFABItemProps } from "../OnyxFABItem/types.js";

export type GlobalFABProvider = {
  /**
   * Readonly list of currently active toasts.
   */
  items: ComputedRef<ProvidedFABItems[]>;
  /**
   * add the FABOption.
   */
  add: (fabItem: ProvidedFABItems) => void;
  /**
   * removes the FABOption with the given `id`.
   */
  remove: (id: ProvidedFABItems["id"]) => void;
};

export type ProvidedFABItems = OnyxFABItemProps & {
  /**
   * Unique FABItem id used to identify the FABItem.
   */
  id: symbol | number | string;
  /**
   * default is right but if all fabItems have right alignment it will be aligned to the right.
   */
  alignment?: "left" | "right";
  /**
   * if all fabItems have hideLabel true, it will not show labels.
   */
  hideLabel?: boolean;
  /**
   * if the Label should be displayed if it's an option of an FAB.
   */
  hideLabelIfOption?: boolean;
  /**
   * Controls the icon if it's an option of an FAB.
   * - If set to an icon, this icon will be displayed.
   * - If set to a `false`,  no icon will be displayed.
   * - If set to `true`, the "normal" icon will be displayed.
   */
  iconIfOption?: boolean | string;
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
 * Creates a new FABItem provider that can be used with `useFAB()`.
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
  const items = ref<ProvidedFABItems[]>([]);

  const add: GlobalFABProvider["add"] = (item: ProvidedFABItems) => {
    items.value.push(item);
  };

  const remove: GlobalFABProvider["remove"] = (id) => {
    items.value = items.value.filter((item) => item.id !== id);
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
