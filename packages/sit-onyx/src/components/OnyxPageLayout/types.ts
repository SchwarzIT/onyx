import type { SkeletonProvidedProp } from "../../composables/useSkeletonState.js";

export type OnyxPageLayoutProps = Partial<SkeletonProvidedProp> & {
  /**
   * How the footer is aligned when used together with a sidebar.
   * - full: footer will span the full screen width below the sidebar/page.
   * - page: footer will be restricted to the page width and is placed aside the sidebar.
   */
  footerAlignment?: "full" | "page";
  /**
   * If `true`, the default responsive page content padding will be removed.
   * You can use the `onyx-grid-layout` CSS class on your own which is used internally for the padding.
   * Useful when e.g. implementing a page with a full width hero image at the top, followed by content below.
   */
  noPadding?: boolean;
};
