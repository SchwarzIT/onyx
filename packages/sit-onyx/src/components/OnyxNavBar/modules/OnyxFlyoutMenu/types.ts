import type { MANAGED_SYM } from "../../../../composables/useManagedState";

export type OnyxFlyoutMenuProps = {
  /**
   * If the flyout is expanded or not.
   * If `undefined`, the state will be managed internally.
   */
  open?: boolean | MANAGED_SYM;
  /**
   * Aria label for the flyout.
   */
  label: string;
};
