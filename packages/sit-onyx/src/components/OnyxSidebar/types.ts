import type { DensityProp } from "../../composables/density";
import type { OnyxDrawerProps } from "../OnyxDrawer/types";

export type OnyxSidebarProps = DensityProp & {
  /**
   * If set, the sidebar will be shown as overlay above the page content instead of in-place.
   * Will use the [OnyxDrawer](https://storybook.onyx.schwarz/?path=/docs/feedback-drawer--docs) under the hood.
   */
  drawer?: OnyxDrawerProps;
};
