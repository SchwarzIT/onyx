import type { SharedFormElementProps } from "../OnyxFormElement/types";

export const MULTISELECT_TEXT_MODE = ["summary", "preview"] as const;
export type MultiselectTextMode = (typeof MULTISELECT_TEXT_MODE)[number];

export type OnyxSelectInputProps = Omit<SharedFormElementProps, "maxlength" | "withCounter"> & {
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
  hideSuccessIcon?: boolean;
  /**
   * Highlight input as if it has focus.
   */
  showFocus?: boolean;
};
