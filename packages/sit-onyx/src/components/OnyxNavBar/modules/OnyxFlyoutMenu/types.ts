import type { FlyoutOpen, FlyoutPosition } from "../../../../components/OnyxFlyout/types";

export type OnyxFlyoutMenuProps = {
  /**
   * Aria label for the flyout.
   */
  label: string;
  /**
   * Indicates whether the element is expanded or collapsed.
   */
  open?: FlyoutOpen;
  position?: FlyoutPosition;
};
