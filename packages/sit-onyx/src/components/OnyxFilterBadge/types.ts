import type { Nullable } from "../../types/utils.js";
import type { OnyxBadgeProps } from "../OnyxBadge/types.js";

export type OnyxFilterBadgeProps = Omit<
  OnyxBadgeProps,
  "dot" | "icon" | "clickable" | "selected"
> & {
  /**
   * The label for the badge. Will be displayed in the tooltip.
   */
  label: string;
  /**
   * If `true` the filter is selected, shows an 'x' icon and can be removed on click.
   */
  active?: Nullable<boolean>;
};
