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
  /**
   * Initials to use. If unset, they will be inferred automatically from the `label` property
   * by using the first character of the first and last word.
   */
  initials?: string;
};
