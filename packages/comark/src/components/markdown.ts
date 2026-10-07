import { defineMarkdownComponent } from "@comark/vue";
import { components } from "./comark.js";

export const OnyxMarkdown = defineMarkdownComponent({
  components,
  class: "onyx-component onyx-markdown",
});
