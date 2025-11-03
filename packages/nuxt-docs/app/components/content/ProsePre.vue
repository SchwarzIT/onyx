<script setup lang="ts">
import { UnstableOnyxCodeTab, UnstableOnyxCodeTabs } from "sit-onyx";

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

const value = "tab-1";
</script>

<template>
  <UnstableOnyxCodeTabs :model-value="value">
    <UnstableOnyxCodeTab
      :value
      :code="props.code"
      :language="props.language"
      :label="props.filename"
    >
      <pre :class="props.class"><slot></slot></pre>
    </UnstableOnyxCodeTab>
  </UnstableOnyxCodeTabs>
</template>
