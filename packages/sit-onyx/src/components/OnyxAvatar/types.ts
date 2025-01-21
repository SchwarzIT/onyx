import type { IconSize, IconSizeProp } from "../OnyxIcon/types";

export type OnyxAvatarProps = IconSizeProp<Exclude<IconSize, "12px">> & {
  /**
   * Username. Will determine the displayed initials.
   */
  username: DisplayName;
  /**
   * Image URL to show. If unset or an error occurs while loading, a fallback will be displayed
   * with the initials.
   */
  src?: string;
  /**
   * Initials to use. If unset, they will be inferred automatically from the `username` property.
   */
  initials?: string;
};

export type DisplayName =
  | string
  | {
      name: string;
      /**
       * Locale of the given name. Will be used for formatting.
       */
      locale: string;
    };
