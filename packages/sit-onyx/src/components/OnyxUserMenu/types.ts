import type { ListboxValue } from "@sit-onyx/headless";
import type { OnyxAvatarProps } from "../OnyxAvatar/types";
import type { ListboxOption } from "../OnyxListbox/types";

export type OnyxUserMenuProps<TValue extends ListboxValue = ListboxValue> = {
  /**
   * User name.
   */
  username: string;
  /**
   * Listbox option to show when the menu is opened.
   */
  options: ListboxOption<TValue>[];
  /**
   * User avatar.
   */
  avatar?: string | Omit<OnyxAvatarProps, "label" | "size">;
  /**
   * Optional user description that is displayed when the menu is opened.
   */
  description?: string;
};
