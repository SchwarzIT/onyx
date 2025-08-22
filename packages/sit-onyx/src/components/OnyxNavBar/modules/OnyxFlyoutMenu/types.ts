import type { Nullable } from "../../../../types/index.js";
import type { OnyxSupportPopoverProps } from "../../../OnyxSupportPopover/types.js";

export type OnyxFlyoutMenuProps = Pick<OnyxSupportPopoverProps, "position"> & {
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
   * Whether the flyout is disabled and can not be opened.
   */
  disabled?: boolean;
};
