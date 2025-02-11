import type { Arrayable } from "vitest"; // For an unknown reason removing this import will break the build of "demo-app" and "playground"
import { toValue, type MaybeRefOrGetter, type Ref } from "vue";
import type { Nullable } from "../../utils/types";
import { useGlobalEventListener } from "./useGlobalListener";

export type UseOutsideClickOptions = {
  /**
   * HTML element of the component where clicks should be ignored
   */
  inside: MaybeRefOrGetter<Arrayable<Nullable<HTMLElement>>>;
  /**
   * Callback when an outside click occurred.
   */
  onOutsideClick: (event: MouseEvent) => void;
  /**
   * If `true`, event listeners will be removed and no outside clicks will be captured.
   */
  disabled?: Ref<boolean>;
};

/**
 * Composable for listening to click events that occur outside of a component.
 * Useful to e.g. close flyouts or tooltips.
 */
export const useOutsideClick = ({ inside, onOutsideClick, disabled }: UseOutsideClickOptions) => {
  /**
   * Document click handle that closes then tooltip when clicked outside.
   * Should only be called when trigger is "click".
   */
  const listener = (event: MouseEvent) => {
    const raw = toValue(inside);
    const elements = Array.isArray(raw) ? raw : [raw];
    const isOutsideClick = !elements.some((element) =>
      element?.contains(event.target as HTMLElement),
    );
    if (isOutsideClick) onOutsideClick(event);
  };

  useGlobalEventListener({ type: "click", listener, disabled });
};
