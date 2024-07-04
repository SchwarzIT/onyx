export type OnyxNavButtonProps = {
  /**
   * Label to show inside the Nav item.
   * You can use the `default` slot to display custom content.
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
  /**
   * Whether to show the external link icon.
   * If set to `auto`, it will be shown when the `href` leads to another website
   * (starting with "http://" or "https://") and will be hidden otherwise.
   */
  withExternalIcon?: boolean | "auto";
};
