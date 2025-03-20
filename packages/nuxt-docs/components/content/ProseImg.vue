<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    src?: string;
    alt?: string;
  }>(),
  {
    src: "",
    alt: "",
  },
);
</script>

<template>
  <NuxtImg :src="props.src" :alt="props.alt" :format="src?.endsWith('.svg') ? undefined : 'webp'" />
</template>
