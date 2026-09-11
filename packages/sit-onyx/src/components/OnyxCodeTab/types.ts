import type { OnyxTabProps } from "../OnyxTab/types.js";

export type OnyxCodeTabProps = Omit<OnyxTabProps, "density"> & {
  /**
   * Raw source code snippet. Will be used for the copy functionality and as default slot content
   * (without syntax highlighting). For custom highlighting or content, use the `default` slot. If
   * `code` is left empty the
   * [`innerText`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText) of the
   * `default` slot is used for the copy functionality instead.
   */
  code: string;
  /**
   * Icon to display next to the label.
   */
  icon?: string;
  /**
   * Language of the code snippet.
   *
   * @example
   *   ("ts", "vue", "html", "css");
   */
  language?: string;
};
