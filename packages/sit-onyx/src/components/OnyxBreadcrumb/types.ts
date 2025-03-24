import type { DensityProp } from "../../composables/density";

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
