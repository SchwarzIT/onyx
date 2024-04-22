import type { IconSize, IconSizeProp } from "../OnyxIcon/types";

export type OnyxAvatarProps = IconSizeProp<Exclude<IconSize, "12px">> & {
  /**
   * Label (e.g. the user name), required for accessibility.
   * For `type="initials"`, the label will determine the displayed initials.
   */
  label: string;
  /**
   * Image URL to show. If unset or an error occurs while loading, a fallback will be displayed
   * depending on the `type` property.
   */
  src?: string;
  /**
   * Avatar type to use.
   */
  type?: AvatarType;
};

export const AVATAR_TYPES = ["initials", "female", "male"] as const;
export type AvatarType = (typeof AVATAR_TYPES)[number];
