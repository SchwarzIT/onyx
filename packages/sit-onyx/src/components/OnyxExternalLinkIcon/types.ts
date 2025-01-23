export type OnyxExternalLinkIcon = {
  /**
   * The URL/link to point to.
   */
  href: string;
  /**
   * Whether to show the external link icon.
   * If set to `auto`, it will be shown when the `href` leads to another website
   * (starting with "http://" or "https://") and will be hidden otherwise.
   */
  withExternalIcon?: boolean | "auto";
};
