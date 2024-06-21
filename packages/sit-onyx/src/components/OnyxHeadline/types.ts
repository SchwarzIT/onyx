export type OnyxHeadlineProps = {
  /**
   * Headline type. Please note that only h1-h4 are intended to be used from UX perspective.
   * h5 and h6 will have the same styles as h4 and should only be used for semantic reasons.
   */
  is: HeadlineType;
};

export const HEADLINE_TYPES = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;
export type HeadlineType = (typeof HEADLINE_TYPES)[number];
