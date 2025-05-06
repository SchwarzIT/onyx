import type { DensityProp } from "../../composables/density";
import type { OnyxDrawerProps } from "../OnyxDrawer/types";

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
  drawer?: Omit<OnyxDrawerProps, "label" | "density">;
};
