import type { InjectionKey, TemplateRef } from "vue";

export const PROSE_TABLE_INJECTION_KEY = Symbol() as InjectionKey<{
  /**
   * Vue template ref for the table head (`<thead>`) element.
   * Should be used by the `ProseThead` to teleport the head content to the `ProseTable`.
   */
  headRef: TemplateRef;
  /**
   * Vue template ref for the table body (`<tbody>`) element.
   * Should be used by the `ProseTbody` to teleport the head content to the `ProseTable`.
   */
  bodyRef: TemplateRef;
}>;

export const PROSE_DETAILS_INJECTION_KEY = Symbol() as InjectionKey<{
  /**
   * Vue template ref for the details / accordion header.
   * Should be used by the `ProseSummary` to teleport the summary content to the `ProseDetails`.
   */
  headerRef: TemplateRef;
}>;
