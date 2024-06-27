import type { OnyxColor } from "../../types";

export type OnyxMenuItemProps = {
  /**
   * URL that the menu item points to.
   */
  href?: string;
  /**
   * Whether the menu item is (visually) active.
   */
  active?: boolean;
  /**
   * Whether the menu item is disabled.
   */
  disabled?: boolean;
  /**
   * Main color of the item content.
   */
  color?: Extract<OnyxColor, "primary" | "danger">;
};
