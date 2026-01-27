import type { AutofocusProp } from "../../types/components.js";
import type { SharedFormElementProps } from "../OnyxFormElement/types.js";
import type { OnyxInputProps } from "../OnyxInput/types.js";
import type { SelectOption } from "../OnyxSelect/types.js";

export const TIMEPICKER_TYPES = ["default", "select"] as const;
type RfcTimeValue =
  | `${number}:${number}` // HH:MM
  | `${number}:${number}:${number}` // HH:MM:SS
  | `${number}:${number}:${number}${string}`; // HH:MM:SS.ssss | HH:MM:SS:ssssZ | HH:MM:SS:ssss+002
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
  customTimes?: SelectOption<string>[];
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
     * Current time value in 24-hour format (RFC 9557).
     * While milliseconds (`.123`) and timezones (`Z`, `+01:00`) are accepted as input,
     * they are **ignored** (truncated) by the component logic and display.
     * @example "14:30"
     * @example "14:30:00"
     * @example "14:30:00.500Z" (Treated as "14:30:00")
     */
    modelValue?: string;
    /**
     * Minimum allowed time (inclusive).
     * Accepts RFC 9557 formats. Milliseconds and timezones are ignored during validation.
     * @example "08:00:00"
     * @example "08:00:00.000Z" (Valid, treated as "08:00:00")
     */
    min?: RfcTimeValue;
    /**
     * Maximum allowed time (inclusive).
     * Accepts RFC 9557 formats. Milliseconds and timezones are ignored during validation.
     * @example "08:00:00"
     * @example "08:00:00.000Z" (Valid, treated as "08:00:00")
     */
    max?: RfcTimeValue;

    /**
     * Whether to show the seconds segment (:SS).
     * If true, the format is HH:MM:SS. If false, the format is HH:MM.
     */
    showSeconds?: boolean;
    /**
     * Text describing the timepicker. Will be displayed at the bottom of the flyout.
     */
    infoLabel?: TType extends "select" ? string : never;
    /**
     * Whether to hide the info label.
     */
    hideInfoLabelIcon?: boolean;
  };
