<script lang="ts" setup>
const props = defineProps<{
  code: string;
  language: string;
  filename?: string;
  highlights?: number[];
  meta?: string;
}>();

defineSlots<{
  /** Highlighted source code */
  default(): unknown;
}>();

const handleCopy = async () => {
  await navigator.clipboard.writeText(props.code);
};
</script>

<template>
  <div>
    <div>I am the "ProsePre" component.</div>
    <div>Code language: {{ props.language }}</div>
    <div>Filename: {{ props.filename }}</div>
    <div>Highlighted lines: {{ props.highlights }}</div>

    <OnyxButton label="Copy code" color="neutral" @click="handleCopy" />

    <div>Code:</div>

    <slot></slot>
  </div>
</template>

<style>
pre code .line {
  display: block;
}
</style>
