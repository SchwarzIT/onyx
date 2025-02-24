import type { OnyxButtonProps } from "../OnyxButton/types";

export type OnyxSystemButtonProps = Pick<
  OnyxButtonProps,
  "disabled" | "autofocus" | "skeleton" | "link"
> & {
  /**
   * Button label / text to show. Is always required (even if `icon` is set) for screen readers / accessibility.
   */
  label: string;
  /**
   * Icon to show. Will visually hide the label if set.
   */
  icon?: string;
  /**
   * Button color.
   */
  color?: SystemButtonColor;
};

export const SYSTEM_BUTTON_COLORS = ["intense", "soft", "medium"] as const;
export type SystemButtonColor = (typeof SYSTEM_BUTTON_COLORS)[number];
