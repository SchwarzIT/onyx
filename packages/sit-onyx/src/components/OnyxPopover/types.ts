import type { AnchorPosition } from "../../composables/useAnchorPositionPolyfill.js";
import type { OpenAlignment } from "../../composables/useOpenAlignment.js";
import type { Nullable } from "../../types/index.js";

export type OnyxPopoverProps = {
  /**
   * Aria label for the popover.
   */
  label: string;
  /**
   * Indicates whether the element is expanded or collapsed.
   */
  open?: Nullable<boolean>;
  /**
   * How to position the popover relative to the parent element.
   */
  position?: AnchorPosition | "auto";
  /**
   * Specifies how to align the popover relative to the parent element.
   * This is applicable only for top and bottom positioning.
   */
  alignment?: OpenAlignment | "auto";
  /**
   * If `true`, the popover will match the width of the parent/slot element.
   */
  fitParent?: boolean;
  /**
   * Whether the popover is disabled and can not be opened.
   */
  disabled?: boolean;
  /**
   * Role for the popover.
   * This can be used to control the ARIA role for accessibility.
   *
   * @default "dialog"
   */
  role?: "menu" | "listbox" | "tree" | "grid" | "dialog";
};
