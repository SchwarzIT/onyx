import type { AutofocusProp } from "../../types/components.js";
import type { OnyxCalendarProps, OnyxCalendarSelectionMode } from "../OnyxCalendar/types.js";
import type { OnyxFormElementV2Props } from "../OnyxFormElementV2/types.js";
import type { OnyxInputProps } from "../OnyxInput/types.js";

export type OnyxDatePickerV2Props<TSelection extends OnyxCalendarSelectionMode = "single"> =
  OnyxFormElementV2Props &
    Pick<OnyxInputProps, "disabled"> &
    Pick<
      OnyxCalendarProps<TSelection>,
      "min" | "max" | "weekStartDay" | "showCalendarWeeks" | "selectionMode" | "modelValue"
    > &
    AutofocusProp & {
      /**
       * Whether to show two calendars in range mode.
       */
      multiView?: TSelection extends "range" ? boolean : never;
    };
