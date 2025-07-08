import type { Arrayable } from "vitest"; // For an unknown reason removing this import will break the build of "demo-app" and "playground"
import { toValue, type MaybeRefOrGetter, type Ref } from "vue";
import type { Nullable } from "../../utils/types";
import { useGlobalEventListener } from "./useGlobalListener";

export type UseOutsideClickOptions<TCheckOnTab extends boolean | undefined = undefined> = {
  /**
   * HTML element of the component where clicks should be ignored
   */
  inside: MaybeRefOrGetter<Arrayable<Nullable<HTMLElement>>>;
  /**
   * Callback when an outside click occurred.
   */
  onOutsideClick: (
    event: TCheckOnTab extends true ? MouseEvent | KeyboardEvent : MouseEvent,
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
    return !elements.some((element) => element?.contains(target as Node | null));
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
    const keydownListener = async (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      // using setTimeout here to guarantee that side effects that might change the document.activeElement have run before checking
      // the activeElement
      await new Promise((resolve) => setTimeout(resolve));

      if (isOutsideClick(document.activeElement)) {
        onOutsideClick(event as Parameters<typeof onOutsideClick>[0]);
      }
    };

    useGlobalEventListener({ type: "keydown", listener: keydownListener, disabled });
  }
};
