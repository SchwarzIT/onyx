import type { ManagedProp } from "../../../../composables/useManagedState";
import type { OnyxExternalLinkIcon } from "../../../OnyxExternalLinkIcon/types";

export type OnyxNavButtonProps = OnyxExternalLinkIcon & {
  /**
   * Controls the open state for the mobile children.
   * Is managed internally if not provided.
   */
  mobileChildrenOpen?: ManagedProp<boolean>;
  /**
   * Label to show inside the Nav item.
   * You can use the `default` slot to display custom content.
   */
  label: string;
  /**
   * Whether the nav item is currently active.
   * If any nested option is active, the parent nav item will also be marked as active.
   */
  active?: boolean;
};
