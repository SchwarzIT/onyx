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
  onOutsideClick: (event: MouseEvent | KeyboardEvent) => void;
  /**
   * Whether the outside focus should also be checked when pressing the Tab key.
   */
  checkOnTab?: boolean;
  /**
   * If `true`, event listeners will be removed and no outside clicks will be captured.
   */
  disabled?: Ref<boolean>;
};

/**
 * Composable for listening to click events that occur outside of a component.
 * Useful to e.g. close flyouts or tooltips.
 */
export const useOutsideClick = ({
  inside,
  onOutsideClick,
  disabled,
  checkOnTab,
}: UseOutsideClickOptions) => {
  /**
   * Document click handle that closes then tooltip when clicked outside.
   * Should only be called when trigger is "click".
   */
  const listener = (event: MouseEvent | KeyboardEvent, target = event.target) => {
    const raw = toValue(inside);
    const elements = Array.isArray(raw) ? raw : [raw];
    const isOutsideClick = !elements.some((element) => element?.contains(target as Node | null));
    if (isOutsideClick) onOutsideClick(event);
  };

  useGlobalEventListener({ type: "click", listener, disabled });

  if (checkOnTab) {
    const keydownListener = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      setTimeout(() => {
        const focussedElement = document.activeElement;

        if (focussedElement) {
          listener(event, document.activeElement);
        } else {
          onOutsideClick(event);
        }
      });
    };

    useGlobalEventListener({ type: "keydown", listener: keydownListener, disabled });
  }
};
