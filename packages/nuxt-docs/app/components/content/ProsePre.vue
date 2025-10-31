<script setup lang="ts">
import type { CodeGroupTab } from "../OnyxCodeGroup/types.js";

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
    filename: "Code",
  },
);

defineSlots<{
  /**
   * Renderer code snippet.
   */
  default(): unknown;
}>();

const tab = computed<CodeGroupTab>(() => ({
  code: props.code,
  label: props.filename,
  language: props.language,
  attributes: { class: props.class },
}));
</script>

<template>
  <OnyxCodeGroup :tabs="[tab]">
    <slot></slot>
  </OnyxCodeGroup>
</template>
