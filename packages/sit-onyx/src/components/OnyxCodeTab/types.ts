import type { OnyxTabProps } from "../OnyxTab/types.js";

export type OnyxCodeTabProps = Omit<OnyxTabProps, "density"> & {
  /**
   * Raw source code snippet. Will be used for the copy functionality and as default slot content (without syntax highlighting).
   * For custom highlighting or content, use the `default` slot.
   */
  code: string;
  /**
   * Icon to display next to the label.
   */
  icon?: string;
  /**
   * Language of the code snippet.
   *
   * @example "ts", "vue", "html", "css"
   */
  language?: string;
};
