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

const previewComponent = computed(() =>
  props.meta
    ?.split(" ")
    .find((p) => p.startsWith("previewComponent="))
    ?.replace("previewComponent=", ""),
);
console.log("previewComponent ==> ", previewComponent);
</script>

<template>
  <ComponentExample v-if="previewComponent" :preview-component>
    <ProsePre v-bind="props"><slot></slot></ProsePre>
  </ComponentExample>
  <ProsePre v-else v-bind="props"><slot></slot></ProsePre>
</template>

<style lang="scss" scoped>
.code {
  margin-block: var(--onyx-markdown-renderer-margin-block);
}
</style>
