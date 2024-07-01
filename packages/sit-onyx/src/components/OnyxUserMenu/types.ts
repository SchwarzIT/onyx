import type { OnyxAvatarProps } from "../OnyxAvatar/types";

export type OnyxUserMenuProps = {
  /**
   * User name.
   */
  username: string;
  /**
   * User avatar.
   */
  avatar?: string | Omit<OnyxAvatarProps, "label" | "size">;
  /**
   * Optional user description that is displayed when the menu is opened.
   */
  description?: string;
  /**
   * If the flyout is expanded or not.
   */
  open?: boolean;
};
