import type { SelectDialogOption } from "../../../OnyxSelectDialog/types";

export type OnyxCountryMenuItemProps<TValue extends string> = {
  /**
   * Currently selected country.
   */
  modelValue: TValue;
  /**
   * List of available countries.
   */
  options: SelectDialogOption<TValue>[];
};
