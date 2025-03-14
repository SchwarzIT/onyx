import type { Nullable } from "../../../../composables/useVModel";
import type { WithLinkProp } from "../../../OnyxRouterLink/types";

export type OnyxNavButtonProps = WithLinkProp<true> & {
  /**
   * Label to show inside the Nav item.
   * You can use the `default` slot to display custom content.
   */
  label: string;
  /**
   * Whether the nav item is currently active.
   * If any nested option is active, the parent nav item will also be marked as active.
   * If "auto" and a [router](https://onyx.schwarz/development/router.html) is provided, the active state will be determined automatically based on the current route.
   */
  active?: boolean | "auto";
  /**
   * Controls whether child elements are open on mobile devices.
   */
  modelValue?: Nullable<boolean>;
};
