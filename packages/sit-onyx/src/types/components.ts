import type { FormInjectedProps } from "../components/OnyxForm/OnyxForm.core.js";
import type { DensityProp } from "../composables/density.js";
import type { RequiredProp } from "../composables/required.js";
import type { CustomValidityProp } from "../composables/useCustomValidity.js";
import type { SkeletonInjected } from "../composables/useSkeletonState.js";
import type { TruncationType } from "./fonts.js";

// IMPORTANT: When changing this type, make sure to implement the feature
// for the following components:
// - Checkbox / Checkbox group
// - Radio button / Radio group
// - Select
// - ...

/**
 * Base select option that is e.g. used inside the select, radio / checkbox group.
 */
export type BaseSelectOption<TValue extends SelectOptionValue = SelectOptionValue> =
  FormInjectedProps &
    AutofocusProp &
    RequiredProp &
    DensityProp &
    CustomValidityProp & {
      /**
       * Value of the option when it is selected.
       * Must be unique in the current list of options.
       */
      value: TValue;
      /**
       * Label to show. Required due to accessibility / screen readers.
       * If you want to visually hide the label, use the `hideLabel` property.
       */
      label: string;
      /**
       * If `true`, the label will be visually hidden and the `title` attribute will be set.
       * For accessibility / screen readers, the aria-label will still be set.
       */
      hideLabel?: boolean;
      /**
       * Shows a loading indicator.
       */
      loading?: boolean;
      /**
       * Whether to show a skeleton.
       */
      skeleton?: SkeletonInjected;
      /**
       * How to truncate the label if it exceeds the max width.
       */
      truncation?: TruncationType;
    };

export type SelectOptionValue = string | number | boolean;

export type AutofocusProp = {
  /**
   * Whether to focus the component on page load or inside a dialog/popover once it opens.
   * Can only be enabled for one element inside a page/dialog/popover.
   * Note: Has no effect when set after the component has been mounted.
   *
   * **UX / Accessibility**: autofocus should be used carefully since it can reduce usability and accessibility for users.
   */
  autofocus?: boolean;
};
