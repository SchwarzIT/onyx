import type { OnyxModalDialogProps } from "../OnyxModalDialog/types";

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
  modelValue?: TValue;
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
   * Image to display next to the label.
   */
  image?: string;
  /**
   * Optional option description.
   */
  description?: string;
};
