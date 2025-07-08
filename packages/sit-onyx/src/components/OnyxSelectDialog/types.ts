import type { OnyxModalDialogProps } from "../OnyxModalDialog/types.js";

export type OnyxSelectDialogProps<TValue extends string = string> = Pick<
  OnyxModalDialogProps,
  "open" | "density" | "label"
> & {
  /**
   * List of available options.
   */
  options: SelectDialogOption<TValue>[];
  /**
   * Value of the currently selected option.
   */
  modelValue: TValue;
};

export type SelectDialogOption<TValue extends string = string> = {
  /**
   * Value to use when the option is selected.
   */
  value: TValue;
  /**
   * Visual label.
   */
  label: string;
  /**
   * Icon to display next to the label. Must be a valid SVG string.
   * **Will be render using `v-html` so make sure to trust or sanitize the content!**
   */
  icon?: string;
  /**
   * Optional option description.
   */
  description?: string;
};
