import type { TruncationType } from "../../types";
import type { OnyxListItemProps } from "../OnyxListItem/types";

export type OnyxSelectOptionProps = Pick<OnyxListItemProps, "active" | "density"> & {
  /**
   * Adds a checkbox to the option
   */
  multiple?: boolean;
  /**
   * If `true`, an indeterminate indicator is shown.
   * Only in combination with `multiple`
   */
  indeterminate?: boolean;
  /**
   * Optional icon.
   */
  icon?: string;
  /**
   * How to truncate the option label / text content if it exceeds the max width.
   */
  truncation?: TruncationType;
};
