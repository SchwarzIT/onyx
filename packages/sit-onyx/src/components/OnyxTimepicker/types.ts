import type { AutofocusProp } from "../../types/components.js";
import type { SharedFormElementProps } from "../OnyxFormElement/types.js";
import type { OnyxInputProps } from "../OnyxInput/types.js";
import type { SelectOption } from "../OnyxSelect/types.js";

export const TIMEPICKER_TYPES = ["default", "select"] as const;
export type TimepickerType = (typeof TIMEPICKER_TYPES)[number];

export type TimepickerSelectOptions = {
  /**
   * The step size, in seconds, used for generating the time options.
   * @default 1800 // 30 min
   */
  stepSize?: number;
  /**
   * A function that provides custom time options.
   */
  customTimes?: () => SelectOption<string>[];
};

export type OnyxTimepickerProps<TType extends TimepickerType = "default"> = Omit<
  SharedFormElementProps,
  "placeholder"
> &
  Pick<OnyxInputProps, "hideClearIcon"> &
  AutofocusProp & {
    /**
     * Specifies the type of timepicker input.
     * - 'default': Free text input with validation.
     * - 'select': Displays a dropdown list with pre-generated time options.
     * @default 'default'
     */
    type?: TType;

    /**
     * Configuration options for the timepicker's option generation.
     * This property is ONLY available when `type` is set to 'select'.
     */
    options?: TType extends "select" ? TimepickerSelectOptions : never;

    /**
     * Time in Seconds since midnight.
     */
    modelValue?: string;

    /**
     * Minimum time to input in 24-hour format (including the minimum time).
     * @format HH:MM:SS (e.g., "08:00:00")
     */
    min?: `${number}:${number}`;

    /**
     * Maximum time to input in 24-hour format (including the maximum time).
     * @format HH:MM:ss (e.g., "17:30:00")
     */
    max?: `${number}:${number}`;

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
  };
