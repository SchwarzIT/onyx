import { onMounted, watch, type Ref } from "vue";
import type { Nullable } from "../types/utils.js";
import { userConsole } from "../utils/console.js";

const anyInputFocused = () => {
  if (!document.activeElement) {
    return false;
  }
  const { isContentEditable, tagName } = document.activeElement as HTMLElement;
  const isInputOrTextarea = ["INPUT", "TEXTAREA"].includes(tagName);
  return isInputOrTextarea || isContentEditable;
};

/**
 * Performs manual autofocus on the target, when the component is mounted and not loading anymore.
 * Autofocus will not be performed if any other input element is already focused or the target
 * element is not visible.
 *
 * @param ref The ref of the target element.
 * @param props The reactive props of the component.
 * @returns
 */
export const useAutofocus = (
  ref: Ref<HTMLElement | HTMLElement[] | null>,
  props: { autofocus: boolean; loading?: boolean },
) => {
  if (!props.autofocus) {
    return;
  }

  const performAutoFocus = () => {
    const elem: Ref<Nullable<HTMLElement>> = Array.isArray(ref) ? ref[0] : ref;
    if (elem.value === document.activeElement) {
      return;
    }
    const isVisible = elem.value?.checkVisibility({
      checkOpacity: true,
      checkVisibilityCSS: true,
      contentVisibilityAuto: true,
    });
    if (!isVisible) {
      return userConsole?.warn(
        "Did not perform autofocus on Element ",
        elem.value,
        ". The element is not visible!",
      );
    }
    if (anyInputFocused()) {
      return userConsole?.warn(
        "Did not perform autofocus on Element ",
        elem.value,
        ". Because the ",
        document.activeElement,
        " is already focused!",
      );
    }
    elem.value?.focus();
  };

  onMounted(() => {
    if (!props.loading) {
      performAutoFocus();
      return;
    }

    watch(
      () => !!props.loading,
      () => performAutoFocus(),
      { once: true },
    );
  });
};
