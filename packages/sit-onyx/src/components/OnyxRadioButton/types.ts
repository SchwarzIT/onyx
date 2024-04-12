import type { DensityProp } from "../../composables/density";
import type { CustomValidityProp } from "../../composables/useCustomValidity";
import type { SelectOption, SelectOptionValue } from "../../types";

export type OnyxRadioButtonProps<TValue extends SelectOptionValue = SelectOptionValue> = Omit<
  SelectOption<TValue>,
  "hideLabel"
> &
  DensityProp &
  CustomValidityProp & {
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
  };
