import type { AutofocusProp } from "../../types/components.js";
import type { SharedFormElementProps } from "../OnyxFormElement/types.js";
import type { SelectOption } from "../OnyxSelect/types.js";

export type OnyxTimepickerProps = Omit<SharedFormElementProps, "placeholder"> &
  AutofocusProp & {
    /**
     * Specifies the type of timepicker input.
     * 'default': Free text input with validation.
     * 'select': Displays a dropdown list with pre-generated time options.
     * @default 'default'
     */
    type?: "default" | "select";
    /**
     * Configuration options for the timepicker's option generation.
     * This property only takes effect when the `type` is set to 'select'.
     */
    options?: {
      /**
       * The starting time for generating time options (using 24-hour format).
       * @format HH:MM (e.g., "08:00")
       */
      startTime?: string;
      /**
       * The ending time for generating time options (using 24-hour format).
       * @format HH:MM (e.g., "17:30")
       */
      endTime?: string;
      /**
       * The step size, in minutes, used for generating the time options.
       * @default 30
       */
      stepSize?: number;
      /**
       * A function that provides custom time options.
       * These options will be MERGED with the automatically generated times.
       */
      customTimes?: () => SelectOption<string>[];
    };
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
