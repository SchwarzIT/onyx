import type { SkeletonInjected } from "../../composables/useSkeletonState";

export type OnyxHeadlineProps = {
  /**
   * Headline type. Please note that only h1-h4 are intended to be used from UX perspective.
   * h5 and h6 will have the same styles as h4 and should only be used for semantic reasons.
   */
  is: HeadlineType;
  /**
   * Unique headline hash/ID (without "#") that is used to show a "#" icon on hover. Makes the headline clickable and a URL that points to this headline
   * is copied to the users clipboard. Must be URL-safe, e.g. not containing whitespaces etc.
   *
   * If your headline content is dynamic, you can use our `normalizeUrlHash()` utility to generate it.
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
