import type { IconSize, IconSizeProp } from "../OnyxIcon/types";

export type OnyxAvatarProps = IconSizeProp<Exclude<IconSize, "12px">> & {
  /**
   * Label (e.g. the user name), required for accessibility.
   * Will also determine the displayed initials.
   */
  label: string;
  /**
   * Image URL to show. If unset or an error occurs while loading, a fallback will be displayed
   * with the initials.
   */
  src?: string;
};
