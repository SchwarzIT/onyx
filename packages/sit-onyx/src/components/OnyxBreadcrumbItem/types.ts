import type { DensityProp } from "../../composables/density";
import type { SkeletonInjected } from "../../composables/useSkeletonState";

export type OnyxBreadcrumbItemProps = DensityProp & {
  /**
   * Link to the corresponding page.
   */
  href: string;
  /**
   * Whether the nav item is currently active.
   * If any nested option is active, the parent nav item will also be marked as active.
   * If "auto" and a [router](https://onyx.schwarz/development/router.html) is provided, the active state will be determined automatically based on the current route.
   */
  active?: boolean | "auto";
  /**
   * Whether to show a skeleton item.
   */
  skeleton?: SkeletonInjected;
};
