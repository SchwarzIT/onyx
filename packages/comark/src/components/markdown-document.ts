import { defineMarkdownDocumentComponent } from "@comark/vue";
import { components } from "./comark.js";

export const OnyxMarkdownDocument = defineMarkdownDocumentComponent({
  components,
  class: "onyx-component onyx-markdown-document",
});
