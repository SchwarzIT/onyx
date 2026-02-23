import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { FormInjectedProps } from "../OnyxForm/OnyxForm.core.js";

export type OnyxFormElementV2Props = DensityProp &
  Pick<FormInjectedProps, "requiredMarker" | "reserveMessageSpace" | "showError"> & {
    /**
     * The id of a labelled form-related element.
     * Will be auto-generated if unset and be passed to the `default` slot.
     */
    id?: string;
    /**
     * Label to show above the element. Required due to accessibility / screen readers.
     * If you want to visually hide the label, use the `hideLabel` property.
     */
    label: string | FormElementV2LabelOptions;
    /**
     * Whether to show as skeleton.
     */
    skeleton?: SkeletonInjected;
    /**
     * Optional message to show below the form element.
     */
    message?: string | FormElementV2Tooltip;
    /**
     * Optional error message to show below the form element.
     */
    error?: string | FormElementV2Tooltip;
    /**
     * Optional success message to show below the form element.
     */
    success?: string | FormElementV2Tooltip;
    /**
     * Whether the a value for this form element is required.
     */
    required?: boolean;
  };

export type FormElementV2LabelOptions = FormElementV2Tooltip & {
  /**
   * How to position the label relative to the main content.
   */
  position?: "top" | "left" | "right";
  /**
   * If `true`, the label will be visually hidden.
   * For accessibility / screen readers, the aria-label will still be set.
   */
  hidden?: boolean;
};

export type FormElementV2Tooltip = {
  /**
   * Label displayed outside of the tooltip.
   */
  label: string;
  /**
   * Actual tooltip text.
   */
  tooltipText?: string;
};
