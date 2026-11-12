import type { DensityProp } from "../../../../composables/density.js";

export type OnyxMillerPaneProps = DensityProp & {
  /**
   * Label of the pane that isn't changing which ever items are displayed in it
   */
  label: string;
  /**
   * If set a icon will be displayed next to the label
   * SVG source of the icon. **Important**: Only provide trustworthy content, the SVG content will
   * not be sanitized.
   */
  labelIcon?: string;
};
