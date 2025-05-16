import type { OnyxFlyoutProps } from "../../../../components/OnyxFlyout/types";
import type { Nullable } from "../../../../composables/useVModel";

export type OnyxFlyoutMenuProps = Pick<OnyxFlyoutProps, "alignment"> & {
  /**
   * Aria label for the flyout.
   */
  label: string;
  /**
   * If the flyout is expanded on click or hover.
   * The default value is 'hover' which will expand the flyout on hover.
   */
  trigger?: "hover" | "click";
  /**
   * Indicates whether the element is expanded or collapsed.
   */
  open?: Nullable<boolean>;
  /**
   * If the flyout should be disabled or not.
   */
  disabled?: boolean;
};
