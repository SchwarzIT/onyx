const REQUIRED_MODE = ["optional", "required"] as const;
export type RequiredModeType = (typeof REQUIRED_MODE)[number];

export type RequiredModeProp = {
  /**
   * Required mode: `optional` will show an `(optional)` text after the label for optional inputs.
   * `required` will show an `*` indicator for required inputs after the label instead.
   */
  requiredMode?: RequiredModeType;
};
