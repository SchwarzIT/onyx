import type { OnyxColor } from "../../../../types";

export type OnyxMenuItemProps = {
  /**
   * URL that the menu item points to.
   * If the property is set an anchor tag will be rendered, if not a button will be shown instead
   */
  href?: string;
  /**
   * Whether the menu item is currently active.
   * This is the case if the given link is currently opened.
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
