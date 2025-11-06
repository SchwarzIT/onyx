<script setup lang="ts">
import bannerImg from "~/assets/images/banner.webp";

import { OnyxImage } from "sit-onyx";
</script>

<template>
  <OnyxImage class="banner" alt="Hero banner" :src="bannerImg" :width="1920" :height="280" />
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
