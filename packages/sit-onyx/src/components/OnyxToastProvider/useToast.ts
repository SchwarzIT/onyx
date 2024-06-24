import { inject, type InjectionKey, type Ref } from "vue";
import type { OnyxToastProps } from "../OnyxToast/types";
import type OnyxToastProvider from "./OnyxToastProvider.vue";

export type ShowToastOptions = OnyxToastProps & {
  /**
   * Callback when the toast is clicked. Requires `clickable` to be enabled.
   */
  onClick?: () => void;
};

export const toastProviderInjectionKey = Symbol() as InjectionKey<
  Ref<Pick<InstanceType<typeof OnyxToastProvider>, "show"> | undefined | null>
>;

export const useToast = () => {
  const toastProvider = inject(toastProviderInjectionKey);

  const show = (toast: ShowToastOptions) => {
    if (!toastProvider?.value) {
      // eslint-disable-next-line no-console
      console.warn(
        'Calling "showToast()" before it is being provided. Make sure to place the "OnyxToastProvider" component in the root of your application',
      );
      return;
    }

    toastProvider.value.show(toast);
  };

  return { show };
};
