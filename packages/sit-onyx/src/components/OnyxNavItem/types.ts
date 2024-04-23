export type OnyxNavItemProps = {
  /**
   * Label to show inside the NavItem. Required due to accessibility / screen readers.
   */
  label: string;
  /**
   * The href of the underlying anchor element.
   * This is used if there are no child elements.
   */
  href?: string;
  /**
   * Set active state.
   * If the navItem has children, the active state will depend on the child's active state.
   */
  active?: boolean;
  /** Options to render in a listbox. */
  options?: (Omit<OnyxNavItemProps, "options"> & { href: string })[];
};
