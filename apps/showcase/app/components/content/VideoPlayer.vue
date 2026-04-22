<script lang="ts" setup>
const props = defineProps<{
  src: string;
}>();

const type = computed(() => {
  const extension = props.src.split(".").at(-1)!;
  return `video/${extension}`;
});
</script>

<!-- eslint-disable vuejs-accessibility/media-has-caption -->
<template>
  <video :key="props.src" loading="lazy" controls>
    <source :src="props.src" :type />
    <p>{{ $t("videoNotSupportedByBrowser") }}</p>
  </video>
</template>

<style lang="scss" scoped>
video {
  width: max-content;
  height: max-content;
  max-width: 100%;
  max-height: 100%;
  border-radius: var(--onyx-radius-md);
  border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  object-fit: cover;
  margin-block: var(--onyx-markdown-renderer-margin-block);
}
</style>
