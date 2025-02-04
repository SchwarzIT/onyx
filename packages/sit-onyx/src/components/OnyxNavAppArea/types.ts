import type { WithLinkProp } from "../OnyxRouterLink/types";

export type OnyxNavAppAreaProps = WithLinkProp & {
  /**
   * Logo / app icon URl to display. Slot `logo` can be used to place custom content.
   */
  logoUrl?: string;
  /**
   * Application name to show on the left.
   */
  appName?: string;
  /**
   * Describes the action that is taken on click.
   */
  label?: string;
};
