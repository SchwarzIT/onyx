export type OnyxRouterLinkProps = SharedLinkProps;

export type SharedLinkProps = {
  /**
   * The URL/link to point to.
   * Will use the projects router for internal links if provided, see [OnyxRouterLink](https://storybook.onyx.schwarz/?path=/docs/support-routerlink--docs) for further details.
   */
  href: string;
  /**
   * Where to display the linked URL (same tab, new tab etc.).
   * For `_blank`, the `rel="noreferrer"` will be set automatically.
   */
  target?: LinkTarget;
};

export const LINK_TARGETS = ["_self", "_blank", "_parent", "_top"] as const;
export type LinkTarget = (typeof LINK_TARGETS)[number];
