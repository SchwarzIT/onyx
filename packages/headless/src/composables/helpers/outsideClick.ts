import { type Ref } from "vue";
import { useGlobalEventListener } from "./globalListener";

export type UseOutsideClickOptions = {
  /**
   * HTML element of the component where clicks should be ignored
   */
  element: Ref<HTMLElement | undefined>;
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
export const useOutsideClick = ({ element, onOutsideClick, disabled }: UseOutsideClickOptions) => {
  /**
   * Document click handle that closes then tooltip when clicked outside.
   * Should only be called when trigger is "click".
   */
  const listener = ({ target }: MouseEvent) => {
    const isOutsideClick = !element.value?.contains(target as HTMLElement);
    if (isOutsideClick) onOutsideClick();
  };

  useGlobalEventListener({ type: "click", listener, disabled });
};
