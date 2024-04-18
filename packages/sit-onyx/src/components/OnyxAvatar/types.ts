import type { IconSize, IconSizeProp } from "../OnyxIcon/types";

export type OnyxAvatarProps = IconSizeProp<Exclude<IconSize, "12px">> & {
  /**
   * Label (e.g. the user name), required for accessibility.
   * For `type="diverse"`, the label will determine the displayed initials.
   */
  label: string;
  /**
   * Avatar type to use.
   */
  type?: AvatarType;
};

export const AVATAR_TYPES = ["diverse", "female", "male"] as const;
export type AvatarType = (typeof AVATAR_TYPES)[number];
