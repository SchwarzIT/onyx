import type { DensityProp } from "../../composables/density.js";
import type { SkeletonInjected } from "../../composables/useSkeletonState.js";
import type { OnyxColor } from "../../types/colors.js";
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
    label: string | FormElementV2Tooltip;
    /**
     * If `true`, the label will be visually hidden.
     * For accessibility / screen readers, the aria-label will still be set.
     */
    hideLabel?: boolean;
    /**
     * Whether the element is loading. User interaction will be disabled.
     */
    loading?: boolean;
    /**
     * Whether to show as skeleton.
     */
    skeleton?: SkeletonInjected;
    /**
     * Optional message to show below the form element.
     */
    message?: string | FormElementV2Message;
    /**
     * Whether the a value for this form element is required.
     */
    required?: boolean;
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

export type FormElementV2Message = FormElementV2Tooltip & {
  /**
   * The color / semantic type of the message.
   */
  // TODO: also support the other colors
  color?: Extract<OnyxColor, "neutral" | "danger" | "success">;
};
