import type { AnchorPosition } from "../../composables/useAnchorPositionPolyfill";
import type { OpenAlignment } from "../../composables/useOpenAlignment";
import type { Nullable } from "../../composables/useVModel";
import type { FormInjected } from "../OnyxForm/OnyxForm.core";

export type OnyxFlyoutProps = {
  /**
   * Aria label for the flyout.
   */
  label: string;
  /**
   * Indicates whether the element is expanded or collapsed.
   */
  open?: Nullable<boolean>;
  /**
   * How to position the flyout relative to the parent element.
   */
  position?: AnchorPosition | "auto";
  /**
   * Specifies how to align the flyout relative to the parent element.
   * This is applicable only for top and bottom positioning.
   */
  alignment?: OpenAlignment | "auto";
  /**
   * If `true`, the flyout will match the width of the parent/slot element.
   */
  fitParent?: boolean;
  /**
   * If the flyout should be disabled or not.
   */
  disabled?: FormInjected<boolean>;
};
