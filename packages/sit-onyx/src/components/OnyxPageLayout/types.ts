export type OnyxPageLayoutProps = {
  /** When the page includes a sidebar as well as a footer,
   * footerAsideSidebar will restrict the footer to span
   * only the page main area and not the sidebar.
   */
  footerAsideSidebar?: boolean;
  /** Hides the sidebar even if the slot is filled.
   * Useful e.g. for implementing a collapsible sidebar.
   */
  hideSidebar?: boolean;
};
