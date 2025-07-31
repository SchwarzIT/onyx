import type { DensityProp } from "../../composables/density.js";
import type { OnyxModalDialogProps } from "../OnyxModalDialog/types.js";

export type OnyxSidebarProps = DensityProp & {
  /**
   * (Aria) label that describes the dialog. Required for accessibility / screen readers.
   * When the `temporary` property is set, the label will be used as the displayed label/headline by default.
   */
  label: string;
  /**
   * If set, the sidebar will be shown as an temporary overlay above the page content instead of in-place.
   */
  temporary?: TemporarySidebar;
  /**
   * Whether the sidebar should be manually resizable by the user by dragging the right border.
   */
  resizable?: boolean;
  /**
   * Where the sidebar is positioned on the page.
   * Note: When using the non-drawer sidebar (default), you need to do the actual positioning on the page manually. You can use the [OnyxPageLayout](https://storybook.onyx.schwarz/?path=/story/layout-pagelayout--sidebar-right) for this.
   */
  alignment?: SidebarAlignment;
};

export const SIDEBAR_ALIGNMENT = ["left", "right"] as const;
export type SidebarAlignment = (typeof SIDEBAR_ALIGNMENT)[number];

export type TemporarySidebar = Pick<
  OnyxModalDialogProps,
  "open" | "disableClosingOnBackdropClick"
> & {
  /**
   * If `true`, the sidebar will have a small gap from the viewport and have rounded corners.
   */
  floating?: boolean;
};
