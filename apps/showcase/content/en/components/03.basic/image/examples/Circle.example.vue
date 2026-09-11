<script lang="ts" setup>
import { OnyxImage } from "sit-onyx";
</script>

<template>
  <OnyxImage
    src="https://picsum.photos/id/16/256/256"
    alt="Alt text that describes the content of the image..."
    :width="256"
    :height="256"
    shape="circle"
  />
</template>
