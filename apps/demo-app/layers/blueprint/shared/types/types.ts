import type { OnyxSidebarItemProps } from "sit-onyx";

export type SidebarItem = OnyxSidebarItemProps & {
  /**
   * Label to show.
   */
  label: string;
  /**
   * Optional icon to show.
   */
  icon?: string;
};
