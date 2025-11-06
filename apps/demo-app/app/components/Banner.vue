<script setup lang="ts">
import { OnyxImage, type OnyxImageProps } from "sit-onyx";

const props = defineProps<{
  src: OnyxImageProps["src"];
}>();
</script>

<template>
  <OnyxImage class="banner" alt="Hero banner" :src="props.src" :width="1920" :height="280" />
</template>

<style lang="scss" scoped>
.banner {
  width: 100%;
  display: block;

  :deep(.onyx-image__source) {
    display: inherit;
  }
}
</style>
