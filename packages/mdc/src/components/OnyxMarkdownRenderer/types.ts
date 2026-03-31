import type { MDCParseOptions } from "@nuxtjs/mdc";
import type { DensityProp } from "sit-onyx";

export type OnyxMarkdownRendererProps = DensityProp & {
  /**
   * Markdown content to render.
   */
  markdown: string;
  /**
   * Options for parsing the markdown.
   */
  options?: MDCParseOptions;
};
