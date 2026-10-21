<script lang="ts" setup>
import { OnyxImage } from "sit-onyx";
</script>

<template>
  <OnyxImage
    src="https://picsum.photos/id/16/300/100"
    alt="Example image"
    :width="300"
    :height="100"
  />
</template>
