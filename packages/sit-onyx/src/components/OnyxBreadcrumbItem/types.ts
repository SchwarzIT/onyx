import type { DensityProp } from "../../composables/density";

export type OnyxBreadcrumbItem = DensityProp & {
  /**
   * Label to show inside the Nav item.
   * You can use the `default` slot to display custom content.
   */
  label: string;
  /**
   * Link to the corresponding page.
   */
  link: string;
  /**
   * Whether the nav item is currently active.
   * If any nested option is active, the parent nav item will also be marked as active.
   * If "auto" and a [router](https://onyx.schwarz/development/router.html) is provided, the active state will be determined automatically based on the current route.
   */
  active?: boolean | "auto";
  first?: boolean;
  last?: boolean;
};
