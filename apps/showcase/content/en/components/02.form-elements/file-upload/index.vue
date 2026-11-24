<script lang="ts" setup>
import { OnyxFileUpload } from "sit-onyx";
</script>

<template>
  <OnyxFileUpload max-size="4MiB" />
</template>

<style scoped>
.onyx-file-upload-wrapper {
  width: 100%;
  zoom: 0.5;
}
</style>
