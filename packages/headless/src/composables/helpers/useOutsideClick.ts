import { toValue, type MaybeRefOrGetter, type Ref } from "vue";
import { getNativeElement, type VueTemplateRefElement } from "../../utils/builder.js";
import type { Arrayable, Nullable } from "../../utils/types.js";
import { useGlobalEventListener } from "./useGlobalListener.js";

export type UseOutsideClickOptions<TCheckOnTab extends boolean | undefined = undefined> = {
  /**
   * HTML element of the component where clicks should be ignored
   */
  inside: MaybeRefOrGetter<Arrayable<Nullable<VueTemplateRefElement<HTMLElement>>>>;
  /**
   * Callback when an outside click occurred.
   */
  onOutsideClick: (
    event: TCheckOnTab extends true ? MouseEvent | KeyboardEvent | FocusEvent : MouseEvent,
  ) => void;
  /**
   * Whether the outside focus should also be checked when pressing the Tab key.
   */
  checkOnTab?: TCheckOnTab;
  /**
   * If `true`, event listeners will be removed and no outside clicks will be captured.
   */
  disabled?: Ref<boolean>;
};

/**
 * Composable for listening to click events that occur outside of a component.
 * Useful to e.g. close flyouts or tooltips.
 */
export const useOutsideClick = <TCheckOnTab extends boolean | undefined>({
  inside,
  onOutsideClick,
  disabled,
  checkOnTab,
}: UseOutsideClickOptions<TCheckOnTab>) => {
  const isOutsideClick = (target: EventTarget | null) => {
    if (!target) return true;
    const raw = toValue(inside);
    const elements = Array.isArray(raw) ? raw : [raw];
    return !elements.some((element) => {
      const nativeEl = getNativeElement(element);
      return nativeEl?.contains(target as Node | null);
    });
  };

  /**
   * Document click handle that closes then tooltip when clicked outside.
   * Should only be called when trigger is "click".
   */
  const clickListener = (event: MouseEvent) => {
    if (isOutsideClick(event.target)) onOutsideClick(event);
  };

  useGlobalEventListener({ type: "mousedown", listener: clickListener, disabled });

  if (checkOnTab) {
    const keydownListener = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      if (isOutsideClick(document.activeElement)) {
        onOutsideClick(event as Parameters<typeof onOutsideClick>[0]);
      }

      const controller = new AbortController();
      const { signal } = controller;

      /**
       * Handles when focus enters a new element after Tab navigation.
       * Triggers outside click if focus moves outside the component.
       */
      const onFocusIn = (event: FocusEvent) => {
        const target = event.target as Node | null;
        if (isOutsideClick(target)) {
          onOutsideClick(event as Parameters<typeof onOutsideClick>[0]);
        }
        controller.abort();
      };

      /**
       * Handles when the entire window loses focus during Tab navigation.
       * This covers cases like switching to dev tools or another application.
       */
      const onWindowBlur = (event: FocusEvent) => {
        if (isOutsideClick(document.activeElement)) {
          onOutsideClick(event as Parameters<typeof onOutsideClick>[0]);
        }

        controller.abort();
      };

      /**
       * Handles the Tab key release event.
       * Cleans up temporary listeners if Tab navigation is completed.
       */
      const onKeyUp = (e: KeyboardEvent) => {
        if (e.key === "Tab") controller.abort();
      };

      document.addEventListener("focusin", onFocusIn, {
        once: true,
        capture: true, // Capture phase to handle before component focus handlers
        signal,
      });
      window.addEventListener("blur", onWindowBlur, { once: true, signal });
      document.addEventListener("keyup", onKeyUp, {
        once: true,
        capture: true, // Capture phase to prevent conflicts with prevented keydown
        signal,
      });
    };

    useGlobalEventListener({ type: "keydown", listener: keydownListener, disabled });
  }
};
