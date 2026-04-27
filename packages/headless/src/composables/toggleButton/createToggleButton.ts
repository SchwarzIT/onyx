import { computed, toValue, type ButtonHTMLAttributes, type MaybeRefOrGetter } from "vue";
import { createBuilder, type VBindAttributes } from "../../utils/builder.js";

type CreateToggleButtonOptions = {
  /**
   * The current state of the toggle button.
   */
  isPressed: MaybeRefOrGetter<boolean>;
  /**
   * Triggered when the toggle button is clicked and the `isPressed` state should be toggled.
   */
  onToggle: () => void;
};

/**
 * Based on https://www.w3.org/WAI/ARIA/apg/patterns/button/#:~:text=Toggle%20button
 */
export const createToggleButton = createBuilder((options: CreateToggleButtonOptions) => {
  return {
    elements: {
      /**
       * A html button element that is supposed to act as a toggle button.
       */
      button: computed(
        () =>
          ({
            "aria-pressed": toValue(options.isPressed),
            onClick: options.onToggle,
          }) satisfies VBindAttributes<ButtonHTMLAttributes>,
      ),
    },
  };
});
