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

export type OnyxFormElementV2Slots = {
  /**
   * Actual native HTML form element (e.g. `<input>` or `<textarea>`).
   */
  default(props: object): unknown;
  /**
   * Optional slot to provide custom leading content before the actual input (e.g. an `OnyxSelect`).
   */
  leading?(): unknown;
  /**
   * Optional inner icons to display before the input but after the `leading` slot.
   */
  leadingIcons?(): unknown;
  /**
   * Optional inner icons to display after the input but before the `trailing` slot.
   */
  trailingIcons?(): unknown;
  /**
   * Optional slot to provide custom trailing content after the actual input (e.g. an `OnyxSelect`).
   */
  trailing?(): unknown;
  /**
   * Optional slot to display content on the bottom right (e.g. a character counter).
   */
  bottomRight?(): unknown;
  /**
   * Optional popover content. If set, a popover will be wrapped around the main input area.
   * Note: The input should typically be readonly or disabled when using a popover.
   */
  popover?(): unknown;
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
