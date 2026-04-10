import type { InjectionKey, MaybeRefOrGetter } from "vue";
import type { Nullable, OnyxColor } from "../../../../types/index.js";
import type { WithLinkProp } from "../../../OnyxRouterLink/types.js";

export const MENU_ITEM_INJECTION_KEY = Symbol() as InjectionKey<{
  onHoverEnter: () => void;
  onHoverLeave: () => void;
  nestedMode: "internal";
  openDirection: "right";
}>;

export type OnyxMenuItemProps = WithLinkProp & {
  /**
   * If the children of the menu item are visible.
   */
  open?: Nullable<boolean>;
  /**
   * Label text for the menu item.
   */
  label?: string;
  /**
   * Icon to be displayed next to the label.
   */
  icon?: string;
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
  /**
   * Defines how nested menu items are rendered and behave.
   * * - `internal`: Nested items expand within current menu.
   * - `external`: Nested items open in a separate, adjacent flyout menu.
   */
  nested?: "internal" | "external";
};

export type NestedMenuContext = {
  onHoverEnter: () => void;
  onHoverLeave: () => void;
  nestedMode?: MaybeRefOrGetter<"internal" | "external">;
  openDirection?: MaybeRefOrGetter<"left" | "right">;
};
