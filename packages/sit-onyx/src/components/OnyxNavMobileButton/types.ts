export type OnyxNavMobileButtonProps = {
  /**
   * Aria label that describes the action when clicking the button.
   */
  label: string;
  /**
   * Icon to show when closed.
   */
  icon: string;
  /**
   * Whether the button is considered open / is connected to an open menu/flyout.
   * If `true`, an "x" icon will be displayed.
   */
  open?: boolean;
};
