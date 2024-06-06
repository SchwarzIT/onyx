import type { OnyxBreakpoint } from "../../types";
import type { OnyxNavAppAreaProps } from "../OnyxNavAppArea/types";

export type OnyxNavBarProps = OnyxNavAppAreaProps & {
  /**
   * Whether to show a back button.
   */
  withBackButton?: boolean;
  /**
   * Custom (aria) label for the app click area.
   * @default Translated "Go to home" depending on the current locale.
   */
  appAreaLabel?: string;
  /**
   * Breakpoint name when the nav bar should switch into mobile mode.
   * Will switch if smaller or equal to the given breakpoint.
   * Can be either a pre-defined onyx breakpoint or custom width in pixels.
   *
   * @see [onyx docs](https://onyx.schwarz/development/breakpoints.html) for more information.
   */
  mobileBreakpoint?: OnyxBreakpoint | number;
};
