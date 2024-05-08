export type OnyxNavigationBarProps = {
  /**
   * Logo / app icon URl to display. Slot `logo` can be used to place custom content.
   */
  logoUrl?: string;
  /**
   * Application name to show on the left.
   */
  appName?: string;
  /**
   * Whether to show a back button.
   */
  showBackButton?: boolean;
};
