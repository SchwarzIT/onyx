import type { DensityProp } from "../../composables/density";
import type { SkeletonInjected } from "../../composables/useSkeletonState";

export type OnyxSupportAccordionProps = DensityProp & {
  /**
   * Accordion label / text to show. Is always required for screen readers / accessibility.
   */
  label: string;
  /**
   * Icon to show, when the accordion is expanded.
   */
  openIconType?: string;
  /**
   * Icon to show, when the accordion is collapsed.
   */
  closeIconType?: string;
  /**
   * Set the position of the expand/collapse icon.
   */
  iconPosition?: SupportAccordionIconPosition;
  /**
   * Set the default behavior of the accordion.
   */
  openByDefault?: boolean;
  /**
   * Accordion color.
   */
  color?: SupportAccordionColor;
  /**
   * If the accordion should be disabled or not.
   */
  disabled?: boolean;
  /**
   * Whether to show a skeleton accordion.
   */
  skeleton?: SkeletonInjected;
};

export const SUPPORT_ACCORDION_ICON_POSITIONS = ["next", "end"];
export type SupportAccordionIconPosition = (typeof SUPPORT_ACCORDION_ICON_POSITIONS)[number];

export const SUPPORT_ACCORDION_COLORS = [
  "primary",
  "secondary",
  "neutral",
  "danger",
  "warning",
  "success",
  "info",
] as const;
export type SupportAccordionColor = (typeof SUPPORT_ACCORDION_COLORS)[number];
