import type { DensityProp } from "../../composables/density";
import type { RequiredMarkerProp } from "../../composables/required";
import type { CustomValidityProp } from "../../composables/useCustomValidity";
import type { AutofocusProp } from "../../types";
import type { FormInjectedProps } from "../OnyxForm/OnyxForm.core";
import type { OnyxFormElementProps } from "../OnyxFormElement/types";

export const MULTISELECT_TEXT_MODE = ["summary", "preview"] as const;
export type MultiselectTextMode = (typeof MULTISELECT_TEXT_MODE)[number];

export type OnyxSelectInputProps = FormInjectedProps &
  DensityProp &
  RequiredMarkerProp &
  CustomValidityProp &
  AutofocusProp &
  Omit<OnyxFormElementProps, "modelValue" | "maxlength" | "withCounter"> & {
    /**
     * Current label(s) of the select.
     */
    modelValue?: string[];
    /**
     * How multiselect labels will be displayed in the input.
     * - summary (default): will show "x Selected" if more than 1 is selected.
     * - preview: will show the names of the selection as a truncated list.
     *            A number-badge appears next to it including a tooltip with all selected names.
     */
    textMode?: MultiselectTextMode;
    /**
     * Whether to show a skeleton select.
     */
    skeleton?: boolean;
    /**
     * Whether the select should be readonly.
     */
    readonly?: boolean;
    /**
     * Shows a loading indicator.
     */
    loading?: boolean;
    /**
     * Placeholder to show when the value is empty.
     */
    placeholder?: string;
    /**
     * Highlight input as if it has focus.
     */
    showFocus?: boolean;
  };
