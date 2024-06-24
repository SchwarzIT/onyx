import type { createMenuButton } from "@sit-onyx/headless";
import type { InjectionKey } from "vue";

export type OnyxNavItemProps = {
  href?: string;
  active?: boolean;
};

/**
 * [Vue injection key](https://vuejs.org/guide/components/provide-inject) that is provided by the nav bar
 * to communicate child components whether they should render in mobile or desktop mode.
 *
 * @returns `true` if mobile, `false` otherwise
 */
export const MENU_BUTTON_ITEM_INJECTION_KEY = Symbol() as InjectionKey<
  Pick<ReturnType<typeof createMenuButton>["elements"], "listItem" | "menuItem">
>;
