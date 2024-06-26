import type { createMenuButton } from "@sit-onyx/headless";
import type { InjectionKey } from "vue";

export type OnyxNavItemProps = {
  href?: string;
  active?: boolean;
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
