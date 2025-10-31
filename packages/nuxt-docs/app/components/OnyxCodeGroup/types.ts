import type { OnyxTabProps } from "sit-onyx";

export type OnyxCodeGroupProps = {
  tabs: CodeGroupTab[];
};

export type CodeGroupTab = Pick<OnyxTabProps, "disabled" | "skeleton"> & {
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
