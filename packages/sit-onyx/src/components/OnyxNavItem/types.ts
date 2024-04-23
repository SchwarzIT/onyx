export type OnyxNavItemProps = {
  /**
   * Label to show inside the Nav item.
   */
  label: string;
  /**
   * The href of the nav item.
   */
  href?: string;
  /**
   * Whether the nav item is currently active.
   * If any nested option is active, the parent nav item will also be marked as active.
   */
  active?: boolean;
  /** Options to render in a listbox. */
  options?: (Omit<OnyxNavItemProps, "options"> & { href: string })[];
};
