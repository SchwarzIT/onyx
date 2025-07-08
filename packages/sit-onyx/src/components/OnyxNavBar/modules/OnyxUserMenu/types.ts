import type { Nullable } from "../../../../types/index.js";
import type { OnyxAvatarProps } from "../../../OnyxAvatar/types.js";

export type OnyxUserMenuProps = {
  /**
   * Full user name.
   *
   * @example "John Doe"
   */
  fullName: string;
  /**
   * User avatar. If unset or an error occurs while loading, a fallback will be displayed with the username initials.
   */
  avatar?: string | Omit<OnyxAvatarProps, "size">;
  /**
   * Optional user description that is displayed when the menu is opened.
   */
  description?: string;
  /**
   * Controls whether the flyout menu is open.
   */
  flyoutOpen?: Nullable<boolean>;
  /**
   * Whether the user menu is disabled and can not be opened.
   */
  disabled?: boolean;
};
