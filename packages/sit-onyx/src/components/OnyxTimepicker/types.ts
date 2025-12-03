import type { AutofocusProp } from "../../types/components.js";
import type { SharedFormElementProps } from "../OnyxFormElement/types.js";

export type OnyxTimepickerProps = Omit<
  SharedFormElementProps,
  "placeholder" | "name" | "readonly"
> &
  AutofocusProp & {
    /**
     * Segments to display in the timepicker.
     */
    segments?: {
      /**
       * Whether to show the hour segment.
       */
      hour?: boolean;
      /**
       * Whether to show the minute segment.
       * */
      minute?: boolean;
      /**
       * Whether to show the second segment.
       */
      second?: boolean;
    };
    /**
     * Info label text.
     */
    infoLabel?: string;
    /**
     * Whether to show the info label.
     */
    hideInfoLabelIcon?: boolean;
    /**
     * Time in Seconds since midnight.
     */
    modelValue?: string;
  };
