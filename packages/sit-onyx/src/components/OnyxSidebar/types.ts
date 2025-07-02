import type { DensityProp } from "../../composables/density.js";
import type { OnyxDrawerProps } from "../OnyxDrawer/types.js";

export type OnyxSidebarProps = DensityProp & {
  /**
   * (Aria) label that describes the dialog. Required for accessibility / screen readers.
   * When the `drawer` is set, the label will be used as the drawer label/headline by default.
   */
  label: string;
  /**
   * If set, the sidebar will be shown as overlay above the page content instead of in-place.
   * Will use the [OnyxDrawer](https://storybook.onyx.schwarz/?path=/docs/feedback-drawer--docs) under the hood.
   */
  drawer?: Omit<OnyxDrawerProps, "label" | "density" | "alignment">;
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
