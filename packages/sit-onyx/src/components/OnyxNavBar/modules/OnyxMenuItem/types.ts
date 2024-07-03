import type { createMenuButton } from "@sit-onyx/headless";
import type { InjectionKey } from "vue";
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

/**
 * [Vue injection key](https://vuejs.org/guide/components/provide-inject) that is provided by the flyout menu
 * to provide child components with correct aria attributes.
 *
 * @returns all the elements that createMenuButton composable provides
 */
export const MENU_BUTTON_ITEM_INJECTION_KEY = Symbol() as InjectionKey<
  Pick<ReturnType<typeof createMenuButton>["elements"], "listItem" | "menuItem">
>;
