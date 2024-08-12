import type { ManagedProp } from "../../../../composables/useManagedState";

export type OnyxFlyoutMenuProps = {
  /**
   * If the flyout is expanded or not.
   * If `undefined`, the state will be managed internally.
   */
  open?: ManagedProp<boolean>;
  /**
   * Aria label for the flyout.
   */
  label: string;
};
