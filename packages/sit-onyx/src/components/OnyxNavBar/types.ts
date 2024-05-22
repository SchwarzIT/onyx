import type { OnyxNavAppAreaProps } from "../OnyxNavAppArea/types";

export type OnyxNavBarProps = OnyxNavAppAreaProps & {
  /**
   * Whether to show a back button.
   */
  withBackButton?: boolean;
  /**
   * Custom label for the app click area.
   * @default "Go to Home"
   */
  appAreaLabel?: string;
};
