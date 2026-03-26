import type { InjectionKey, TemplateRef } from "vue";

export const PROSE_DETAILS_INJECTION_KEY = Symbol() as InjectionKey<{
  /**
   * Vue template ref for the details / accordion header.
   * Should be used by the `ProseSummary` to teleport the summary content to the header.
   */
  headerRef: TemplateRef;
}>;
