export type OnyxFlyoutMenuProps = {
  /**
   * If the flyout is expanded on click or hover.
   * The default value is 'hover' which will expand the flyout on hover.
   */
  trigger?: "hover" | "click";
  /**
   * Aria label for the flyout.
   */
  label: string;
};
