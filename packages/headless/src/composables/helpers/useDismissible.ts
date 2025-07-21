import { computed, type Ref } from "vue";
import { useGlobalEventListener } from "./useGlobalListener.js";

type UseDismissibleOptions = { isExpanded: Ref<boolean> };

/**
 * Composable that sets `isExpanded` to false, when the `Escape` key is pressed.
 * Addresses the "dismissible" aspect of https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html
 */
export const useDismissible = ({ isExpanded }: UseDismissibleOptions) =>
  useGlobalEventListener({
    type: "keydown",
    listener: (e) => {
      if (e.key === "Escape") {
        isExpanded.value = false;
      }
    },
    disabled: computed(() => !isExpanded.value),
  });
