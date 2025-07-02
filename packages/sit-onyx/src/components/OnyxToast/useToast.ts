import { computed, inject, ref, type ComputedRef, type InjectionKey } from "vue";
import { userConsole } from "../../utils/console.js";
import type { OnyxToastMessageProps } from "../OnyxToastMessage/types.js";

export type ToastProvider = {
  /**
   * Readonly list of currently active toasts.
   */
  toasts: ComputedRef<ProvidedToast[]>;
  /**
   * Shows a single toast.
   */
  show: (toast: ShowToastOptions) => void;
  /**
   * Removes the toast with the given `id`.
   */
  remove: (id: ProvidedToast["id"]) => void;
};

export type ProvidedToast = ShowToastOptions & {
  /**
   * Unique toast id used to identify the toast.
   */
  id: number;
  /**
   * Handler that should remove the toast. Will be called when the toast closes.
   * Is only used for internal onyx usage.
   */
  onClose: () => void;
};

export type ShowToastOptions = OnyxToastMessageProps & {
  /**
   * Callback when the toast is clicked. Requires `clickable` to be enabled.
   */
  onClick?: () => void;
};

export const TOAST_PROVIDER_INJECTION_KEY = Symbol() as InjectionKey<ToastProvider>;

/**
 * Creates a new toast provider that can be used with `useToast()`.
 * Should be provided once on global app level with:
 *
 * @example
 * ```ts
 * import { createToastProvider, TOAST_PROVIDER_INJECTION_KEY } from "sit-onyx";
 *
 * app.provide(TOAST_PROVIDER_INJECTION_KEY, createToastProvider());
 * ```
 */
export const createToastProvider = (): ToastProvider => {
  let nextId = 1;
  const toasts = ref<ProvidedToast[]>([]);

  const show: ToastProvider["show"] = (toast: ShowToastOptions) => {
    const id = nextId++;

    toasts.value.push({
      ...toast,
      id,
      onClose: () => remove(id),
    });
  };

  const remove: ToastProvider["remove"] = (id) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  };

  return {
    // make toasts readonly so they can not be modified from the outside
    toasts: computed(() => toasts.value),
    show,
    remove,
  };
};

/**
 * Composable for showing toasts.
 */
export const useToast = () => {
  const logWarning = () => {
    userConsole?.warn(
      'Trying to use "useToast()" before the toast provider has been provided. Make sure to "provide" it first.',
    );
  };

  const toastProvider = inject(
    TOAST_PROVIDER_INJECTION_KEY,
    // provide fallback so "useToast()" does not return "undefined"
    () => {
      return {
        toasts: computed(() => []),
        show: logWarning,
        remove: logWarning,
      } satisfies ToastProvider;
    },
    true,
  );

  return toastProvider;
};
