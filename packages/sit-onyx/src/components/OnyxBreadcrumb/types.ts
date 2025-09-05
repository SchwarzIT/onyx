import type { InjectionKey, Ref, TeleportProps } from "vue";
import type { DensityProp } from "../../composables/density.js";
import type { MoreListInjectionKey } from "../../composables/useMoreList.js";

export const BREADCRUMB_MORE_LIST_INJECTION_KEY = Symbol() as MoreListInjectionKey;
export const BREADCRUMB_MORE_LIST_TARGET_INJECTION_KEY = Symbol() as InjectionKey<
  Ref<TeleportProps["to"]>
>;

export type OnyxBreadcrumbProps = DensityProp & {
  /**
   * If `true`, the component will be shown inside a styled container.
   * Recommended when used together with a nav bar or sidebar.
   */
  container?: boolean;
  /**
   * Custom home item.
   */
  home?: BreadcrumbHomeItem;
  /**
   * Whether to show all nested breadcrumb items as skeleton.
   */
  skeleton?: boolean;
};

export type BreadcrumbHomeItem = {
  /**
   * Text label for the home item. Will show the passed label instead of an icon.
   */
  label?: string;
  /**
   * Link of the home item.
   *
   * @default "/"
   */
  link?: string;
};
