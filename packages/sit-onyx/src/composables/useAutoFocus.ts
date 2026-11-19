import { onMounted, watch, type Ref } from "vue";

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
    const elem = Array.isArray(ref.value) ? ref.value[0] : ref.value;
    if (!elem || elem === document.activeElement) {
      return;
    }

    if (anyInputFocused()) {
      return;
    }

    if ("checkVisibility" in elem) {
      const isVisible = elem.checkVisibility({
        opacityProperty: true,
        visibilityProperty: true,
        contentVisibilityAuto: true,
      });

      if (!isVisible) {
        return;
      }
    }

    elem.focus();
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
