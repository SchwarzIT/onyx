import type { AutofocusProp } from "../../types/components.js";
import type { OnyxCalendarProps, OnyxCalendarSelectionMode } from "../OnyxCalendar/types.js";
import type { SharedFormElementProps } from "../OnyxFormElement/types.js";
import type { OnyxFormElementV2Props } from "../OnyxFormElementV2/types.js";
import type { OnyxInputProps } from "../OnyxInput/types.js";

export type OnyxDatePickerV2Props<TSelection extends OnyxCalendarSelectionMode = "single"> =
  OnyxFormElementV2Props &
    Pick<SharedFormElementProps, "name" | "placeholder" | "readonly" | "disabled"> &
    AutofocusProp &
    Omit<OnyxCalendarProps<TSelection>, "size" | "disabled"> &
    Pick<OnyxInputProps, "hideClearIcon"> & {
      /**
       * Whether to show two calendars in range mode.
       */
      multiView?: TSelection extends "range" ? boolean : never;
      /**
       * Disable specific dates to select individually.
       *
       * @example
       * `(date: Date) => date.getDay() === 0 || date.getDay() === 6`
       */
      disabledDays?: (date: Date) => boolean;
    };
