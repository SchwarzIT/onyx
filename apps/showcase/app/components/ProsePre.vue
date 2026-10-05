<script setup lang="ts">
import { ProsePre } from "@sit-onyx/mdc";

const props = withDefaults(
  defineProps<{
    /**
     * Raw code snippet.
     */
    code?: string;
    /**
     * Code language
     *
     * @example
     *   js, ts, html, css, etc.
     */
    language?: string;
    /**
     * Filename.
     */
    filename?: string;
    /**
     * Highlighted code line numbers.
     */
    highlights?: number[];
    meta?: string;
    class?: string;
  }>(),
  {
    code: "",
  },
);

defineSlots<{
  /**
   * Renderer code snippet.
   */
  default(): unknown;
}>();

const metaProps = computed<Record<string, string>>(() => {
  const parts = props.meta?.split(" ").map((part) => part.split("=")) || [];
  const cleaned = parts.map(([key, value]) => [key, value?.replaceAll(/^"|"$/g, "")]); // remove leading and trailing quotes from value
  return Object.fromEntries(cleaned);
});

const previewComponent = computed(
  () => "previewComponent" in metaProps.value && metaProps.value.previewComponent,
);
</script>

<template>
  <ComponentExample v-if="previewComponent" :preview-component v-bind="metaProps">
    <ProsePre v-bind="props"><slot></slot></ProsePre>
  </ComponentExample>
  <ProsePre v-else v-bind="props"><slot></slot></ProsePre>
</template>

<style lang="scss" scoped>
.code {
  margin-block: var(--onyx-markdown-renderer-margin-block);
}
</style>
