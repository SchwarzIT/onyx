import type { OnyxNavAppAreaProps } from "../OnyxNavAppArea/types";

export type OnyxNavBarProps = OnyxNavAppAreaProps & {
  /**
   * Whether to show a back button.
   */
  withBackButton?: boolean;
  /**
   * Custom label for the app click area.
   * @default Translated "Go to home" depending on the current locale.
   */
  appAreaLabel?: string;
};
