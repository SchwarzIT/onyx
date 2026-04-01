<script setup lang="ts">
import { OnyxCodeTab, OnyxCodeTabs } from "sit-onyx";

const props = withDefaults(
  defineProps<{
    /**
     * Raw code snippet.
     */
    code?: string;
    /**
     * Code language
     *
     * @example js, ts, html, css, etc.
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

const value = "code";
</script>

<template>
  <OnyxCodeTabs class="code" :model-value="value">
    <OnyxCodeTab :value :code="props.code" :language="props.language" :label="props.filename">
      <pre :class="props.class"><slot></slot></pre>
    </OnyxCodeTab>
  </OnyxCodeTabs>
</template>

<style lang="scss" scoped>
.code {
  margin-block: var(--onyx-markdown-renderer-margin-block);
}
</style>
