import type { AutofocusProp } from "../../types/components.js";
import type { SharedFormElementProps } from "../OnyxFormElement/types.js";

export type OnyxTimepickerProps = Omit<SharedFormElementProps, "placeholder"> &
  AutofocusProp & {
    /**
     * Whether to show the seconds segment (:SS).
     * If true, the format is HH:MM:SS. If false, the format is HH:MM.
     */
    showSeconds?: boolean;
    /**
     * Text describing the timepicker. Will be displayed at the bottom of the flyout.
     */
    infoLabel?: string;
    /**
     * Whether to hide the info label.
     */
    hideInfoLabelIcon?: boolean;
    /**
     * Time in Seconds since midnight.
     */
    modelValue?: string;
  };
