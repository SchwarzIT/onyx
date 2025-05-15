import type { Nullable } from "../../../../composables/useVModel";
import type { OnyxAvatarProps } from "../../../OnyxAvatar/types";
import type { FormInjected } from "../../../OnyxForm/OnyxForm.core";

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
   * If the flyout should be disabled or not.
   */
  disabled?: FormInjected<boolean>;
};
