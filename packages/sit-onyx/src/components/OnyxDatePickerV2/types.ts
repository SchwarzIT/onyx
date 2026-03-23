import type { AutofocusProp } from "../../types/components.js";
import type { OnyxCalendarProps, OnyxCalendarSelectionMode } from "../OnyxCalendar/types.js";
import type { OnyxFormElementV2Props } from "../OnyxFormElementV2/types.js";
import type { OnyxInputProps } from "../OnyxInput/types.js";

export type OnyxDatePickerV2Props<TSelection extends OnyxCalendarSelectionMode = "single"> =
  OnyxFormElementV2Props &
    Pick<OnyxInputProps, "name" | "placeholder" | "readonly" | "disabled"> &
    Pick<
      OnyxCalendarProps<TSelection>,
      "min" | "max" | "weekStartDay" | "showCalendarWeeks" | "selectionMode" | "modelValue"
    > &
    AutofocusProp & {
      /**
       * Whether to show two calendars in range mode.
       */
      multiView?: TSelection extends "range" ? boolean : never;
      /**
       * Disable specific dates to select individually.
       *
       *   * @example
       * ```ts
       * // Disables only weekends (Saturday and Sunday)
       * { disabled: (date: Date) => date.getDay() === 0 || date.getDay() === 6 }
       * ```
       */
      disabledDays?: (date: Date) => boolean;
    };
