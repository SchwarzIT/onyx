import type { OnyxButtonProps } from "../OnyxButton/types";

export type OnyxSystemButtonProps = Pick<
  OnyxButtonProps,
  "density" | "disabled" | "autofocus" | "skeleton"
> & {
  /**
   * Button label / text to show. Is always required (even if `icon` is set) for screen readers / accessibility.
   */
  label: string;
  /**
   * Icon to show. Will visually hide the label if set.
   */
  icon?: string;
};
