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
  <!-- <pre :class="[props.class, 'pre']">
    <slot />
  </pre> -->

  <OnyxCodeGroup
    :tabs="[
      {
        code: props.code,
        label: props.filename ?? 'Code',
        language: props.language,
      },
    ]"
  />
</template>

<style lang="scss" scoped>
.pre code .line {
  display: block;
}
</style>
