import type { NullableBoolean } from "../../types/utils.js";
import type { OnyxTagProps } from "../OnyxTag/types.js";

export type OnyxFilterTagProps = Omit<OnyxTagProps, "color" | "clickable"> & {
  /**
   * If `true` the filter is selected, shows an 'x' icon and can be removed on click.
   */
  active?: NullableBoolean;
};
