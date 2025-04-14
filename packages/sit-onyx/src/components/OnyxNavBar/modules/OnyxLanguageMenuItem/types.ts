import type { SelectDialogOption } from "../../../OnyxSelectDialog/types";

export type OnyxCountryMenuItemProps<TValue extends string> = {
  /**
   * Currently selected country.
   */
  modelValue: TValue;
  /**
   * List of available countries.
   * If only strings/locale codes are provided, the names will be automatically detected using the native `Intl.DisplayNames` API.
   */
  options: SelectDialogOption<TValue>[];
};
