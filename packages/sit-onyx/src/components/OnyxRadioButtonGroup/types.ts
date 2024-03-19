import type { RequiredMarkerProp } from "../../composables/required";
import type { DensityProp } from "../../composables/density";
import type { SelectionOption } from "../OnyxRadioButton/types";

export type OnyxRadioButtonGroupProps<TValue> = DensityProp &
  RequiredMarkerProp & {
    /**
     * Unique name for the radio button group form element.
     * Will automatically filled, when it is not given.
     * Warning: Never use a name for form elements twice!
     */
    name?: string;
    /**
     * The selected radio button option.
     */
    modelValue?: SelectionOption<TValue>;
    /**
     * Headline shown above the radio button group, which is also the fieldset legend.
     * It will also show the required indicator, if `require` is set to `true`
     */
    headline?: string;
    /**
     * Disable the radio button group.
     */
    disabled?: boolean;
    /**
     * Set the radio button group into the error state with the given error message.
     */
    errorMessage?: string;
    /**
     * Direction of the checkboxes. Can be vertical (default) or horizontal.
     */
    direction?: RadioButtonGroupDirection;
    /**
     * Options for the individual radio buttons of the group.
     */
    options: SelectionOption<TValue>[];
    /**
     * If set, the specified number of skeleton radio buttons will be shown.
     */
    skeleton?: number;
  };

export const RADIO_BUTTON_GROUP_DIRECTIONS = ["horizontal", "vertical"] as const;
export type RadioButtonGroupDirection = (typeof RADIO_BUTTON_GROUP_DIRECTIONS)[number];
