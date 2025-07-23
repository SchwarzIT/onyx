import type { Nullable } from "../../types/index.js";
import type { OnyxFABButtonProps } from "../OnyxFABButton/types.js";

export type OnyxFABProps = OnyxFABButtonProps & {
  /**
   * How to align the component relative to the viewport.
   */
  alignment?: "left" | "right";
  /**
   * Whether the element is expanded or collapsed.
   * If unset, the open state is manged internally.
   */
  open?: Nullable<boolean>;

  /**
   * To display a custom closing Icon
   */
  closingIcon?: string;
};
