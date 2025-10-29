import type { DensityProp } from "sit-onyx";

export type OnyxCodeGroupProps = DensityProp & {
  /**
   * A list of code tabs / files.
   */
  tabs: CodeGroupTab[];
};

export type CodeGroupTab = {
  /**
   * Raw source code. Will be used for copying.
   */
  code: string;
  /**
   * Tab label (e.g. the filename).
   */
  label: string;
  /**
   * Optional icon to display next to the label.
   */
  icon?: string;
  /**
   * Code language
   *
   * @example js, ts, html, css, etc.
   */
  language?: string;
};
