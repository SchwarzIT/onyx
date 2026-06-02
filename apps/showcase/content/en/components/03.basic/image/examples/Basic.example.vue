<script lang="ts" setup>
import { OnyxImage } from "sit-onyx";
</script>

<template>
  <OnyxImage
    src="https://picsum.photos/id/16/512/256"
    alt="Alt text that describes the content of the image..."
    :width="512"
    :height="256"
  />
</template>
