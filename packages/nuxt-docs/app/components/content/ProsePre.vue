<script setup lang="ts">
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
</script>

<template>
  <OnyxCodeGroup>
    <OnyxCodeGroupTab :code="props.code" :label="props.filename" :class="props.class">
      <slot />
    </OnyxCodeGroupTab>
  </OnyxCodeGroup>
</template>

<style lang="scss" scoped>
:deep(.onyx-code-group-tab__snippet code .line) {
  display: block;
}
</style>
