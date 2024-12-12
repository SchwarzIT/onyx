import type { ManagedProp } from "../../../../composables/useManagedState";

export type OnyxFlyoutMenuProps = {
  /**
   * If the flyout is expanded or not.
   * If `undefined`, the state will be managed internally.
   */
  open?: ManagedProp<boolean>;
  /**
   * If the flyout is expanded on click.
   * The default value is false which will expand the flyout on hover.
   */
  expandOnClick?: boolean;
  /**
   * Aria label for the flyout.
   */
  label: string;
};
