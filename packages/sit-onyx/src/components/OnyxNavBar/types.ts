import type { OnyxBreakpoint } from "@sit-onyx/shared/breakpoints";
import type { ComputedRef, InjectionKey } from "vue";
import type { MoreListInjectionKey } from "../../composables/useMoreList";
import type { OnyxNavAppAreaProps } from "../OnyxNavAppArea/types";

export type OnyxNavBarProps = Pick<OnyxNavAppAreaProps, "appName" | "logoUrl"> & {
  /**
   * Whether to show a back button.
   */
  withBackButton?: boolean;
  /**
   * Override app area.
   * @default Link to "/" route with a translated "Go to home" aria-label depending on the current locale.
   */
  appArea?: Omit<OnyxNavAppAreaProps, "appName" | "logoUrl">;
  /**
   * Breakpoint name when the nav bar should switch into mobile mode.
   * Will switch if **smaller** than the given breakpoint.
   * Can be either a pre-defined onyx breakpoint or custom width in pixels.
   *
   * @see [onyx docs](https://onyx.schwarz/development/breakpoints.html) for more information.
   */
  mobileBreakpoint?: OnyxBreakpoint | number;
};

/**
 * [Vue injection key](https://vuejs.org/guide/components/provide-inject) that is provided by the nav bar
 * to communicate child components whether they should render in mobile or desktop mode.
 *
 * @returns `true` if mobile, `false` otherwise
 */
export const MOBILE_NAV_BAR_INJECTION_KEY = Symbol() as InjectionKey<ComputedRef<boolean>>;

export const NAV_BAR_MORE_LIST_INJECTION_KEY = Symbol() as MoreListInjectionKey;
