import { onBeforeMount, onBeforeUnmount, watchEffect, type Ref } from "vue";

export type UseOutsideClickOptions = {
  /**
   * Function that returns the HTML element of the component where outside clicks should be listened to.
   */
  queryComponent: () => ReturnType<typeof document.querySelector> | undefined;
  /**
   * Callback when an outside click occurred.
   */
  onOutsideClick: () => void;
  /**
   * If `true`, event listeners will be removed and no outside clicks will be captured.
   */
  disabled?: Ref<boolean>;
};

/**
 * Composable for listening to click events that occur outside of a component.
 * Useful to e.g. close flyouts or tooltips.
 */
export const useOutsideClick = (options: UseOutsideClickOptions) => {
  /**
   * Document click handle that closes then tooltip when clicked outside.
   * Should only be called when trigger is "click".
   */
  const handleDocumentClick = (event: MouseEvent) => {
    const component = options.queryComponent();
    if (!component || !(event.target instanceof Node)) return;

    const isOutsideClick = !component.contains(event.target);
    if (isOutsideClick) options.onOutsideClick();
  };

  // add global document event listeners only on/before mounted to also work in server side rendering
  onBeforeMount(() => {
    watchEffect(() => {
      if (options.disabled?.value) {
        document.removeEventListener("click", handleDocumentClick);
      } else {
        document.addEventListener("click", handleDocumentClick);
      }
    });
  });

  /**
   * Clean up global event listeners to prevent dangling events.
   */
  onBeforeUnmount(() => {
    document.removeEventListener("click", handleDocumentClick);
  });
};
