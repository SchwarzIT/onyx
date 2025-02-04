import type { OnyxColor } from "../../../../types";
import type { WithLinkProp } from "../../../OnyxRouterLink/types";

export type OnyxMenuItemProps = WithLinkProp & {
  /**
   * Whether the item is currently active.
   * This is the case if the page of the given link is currently open.
   * If "auto" and a [router](https://onyx.schwarz/development/router.html) is provided, the active state will be determined automatically based on the current route.
   */
  active?: boolean | "auto";
  /**
   * Whether the menu item is disabled.
   */
  disabled?: boolean;
  /**
   * Main color of the item content.
   */
  color?: Extract<OnyxColor, "primary" | "danger">;
};
