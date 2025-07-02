import type { Nullable } from "../../types";
import type { OnyxFabButtonProps } from "../OnyxFabButton/types";

export type OnyxFabProps = OnyxFabButtonProps & {
  /**
   * How to align the component relative to the viewport.
   */
  alignment?: "left" | "right";
  /**
   * Whether the element is expanded or collapsed.
   * If unset, the open state is manged internally.
   */
  open?: Nullable<boolean>;
};
