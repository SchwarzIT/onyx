import type { SkeletonInjected } from "../../composables/useSkeletonState";

export type OnyxHeadlineProps = {
  /**
   * Semantical headline type. Should match the page hierarchy and should not skip hierarchies (e.g. h2 should be follow by h3 etc.).
   */
  is: HeadlineType;
  /**
   * Visual size of the headline (h1-h6). Will default to but can be different from the semantical `is` property.
   * Please note that only h1-h4 are intended to be used from UX perspective, h5 and h6 will have the same styles as h4.
   */
  visualSize?: Exclude<HeadlineType, "h5" | "h6">;
  /**
   * Unique headline hash/ID (without "#") that is used to show a "#" icon on hover. Makes the headline clickable and a URL that points to this headline
   * is copied to the users clipboard. Will be automatically normalized when containing non URL-safe characters.
   *
   * @example "about-us"
   */
  hash?: string;
  /**
   * Whether to show a skeleton headline.
   */
  skeleton?: SkeletonInjected;
};

export const HEADLINE_TYPES = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;
export type HeadlineType = (typeof HEADLINE_TYPES)[number];
