import type { DensityProp } from "../../styles/density";
import type { TruncationType } from "../../types/fonts";

export type SelectionOptionValue = string | number | boolean;

/**
 * TODO: move to dedicated file
 */
export type SelectionOption<
  T extends SelectionOptionValue = SelectionOptionValue,
  TValue = unknown,
> = {
  /**
   * id of the selection option, not of the radio button input
   */
  id: T;
  label: string;
  /**
   * An optional value.
   * It's not actually used by the selection controls, but can be used to associate data with this option.
   */
  value?: TValue;
  disabled?: boolean;
  /**
   * How to truncate the label if it exceeds the max width.
   */
  truncation?: TruncationType;
  /**
   * Whether to show a skeleton button.
   */
  skeleton?: boolean;
};

export type RadioButtonProps<TValue extends SelectionOptionValue = SelectionOptionValue> =
  SelectionOption<TValue> &
    DensityProp & {
      /**
       * Identifier for the radio buttons in the group.
       * All radio buttons that should belong to the same radio group must have the same name.
       * See also: https://html.spec.whatwg.org/multipage/input.html#radio-button-group
       */
      name: string;
      /**
       * Whether the radio button is selected.
       */
      selected?: boolean;
      /**
       * If any radio button of a group is required, a radio button of the group must be checked.
       * But it doesn't have to be this particular option.
       * See also: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio#required
       */
      required?: boolean;
      errorMessage?: string;
    };
