<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    src?: string;
    alt?: string;
    width?: string | number;
    height?: string | number;
  }>(),
  {
    src: "",
    alt: "",
  },
);
</script>

<template>
  <!-- do NOT use "<NuxtImg />" here since it can lead to performance / out-of-memory issues -->
  <img
    :src="props.src"
    :alt="props.alt"
    :width="props.width"
    :height="props.height"
    loading="lazy"
  />
</template>

<style lang="scss" scoped>
img {
  display: inline-block;
  max-width: 100%;
}
</style>
