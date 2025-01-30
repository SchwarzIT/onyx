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
   */
  active?: boolean;
};
