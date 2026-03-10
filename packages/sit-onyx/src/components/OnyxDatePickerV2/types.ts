import type { AutofocusProp } from "../../types/components.js";
import type { OnyxBasicPopoverProps } from "../OnyxBasicPopover/types.js";
import type { OnyxCalendarProps, OnyxCalendarSelectionMode } from "../OnyxCalendar/types.js";
import type { OnyxFormElementV2Props } from "../OnyxFormElementV2/types.js";

export type OnyxDatePickerV2Props<TSelection extends OnyxCalendarSelectionMode = "single"> = Omit<
  OnyxFormElementV2Props,
  "modelValue" | "showError" | "requiredMarker" | "reserveMessageSpace"
> &
  Pick<
    OnyxCalendarProps<TSelection>,
    | "min"
    | "max"
    | "weekStartDay"
    | "showCalendarWeeks"
    | "disabled"
    | "selectionMode"
    | "modelValue"
  > &
  AutofocusProp &
  Pick<OnyxBasicPopoverProps, "open" | "alignment" | "position" | "fitParent"> & {
    /**
     * Whether the date picker is loading.
     */
    loading?: boolean;

    /**
     * Whether to show 2 Calendars.
     */
    multiView?: TSelection extends "range" ? boolean : never;
  };
