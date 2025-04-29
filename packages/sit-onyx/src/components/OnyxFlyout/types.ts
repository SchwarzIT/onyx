import type { Nullable } from "../../composables/useVModel";

export type OnyxFlyoutProps = {
  /**
   * Aria label for the flyout.
   */
  label: string;
  /**
   * Indicates whether the element is expanded or collapsed.
   */
  expanded?: Nullable<boolean>;
  position?: FlyoutPosition;
};

export type FlyoutPosition =
  | "top"
  | "top right"
  | "top left"
  | "right"
  | "bottom"
  | "bottom right"
  | "bottom left"
  | "left";
