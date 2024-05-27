import type { SelectOptionValue } from "../../types";
import type { OnyxAvatarProps } from "../OnyxAvatar/types";
import type { SelectOption } from "../OnyxSelect/types";

export type OnyxUserMenuProps<TValue extends SelectOptionValue = SelectOptionValue> = {
  /**
   * User name.
   */
  username: string;
  /**
   * Option to show when the menu is opened.
   */
  options: SelectOption<TValue>[];
  /**
   * User avatar.
   */
  avatar?: string | Omit<OnyxAvatarProps, "label" | "size">;
  /**
   * Optional user description that is displayed when the menu is opened.
   */
  description?: string;
};
