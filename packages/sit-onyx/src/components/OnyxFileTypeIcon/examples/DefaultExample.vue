<script lang="ts" setup>
import { OnyxFileTypeIcon, type MediaType } from "../../../index.js";

const types: MediaType[] = [
  "application/octet-stream",
  "application/pdf",
  "text/csv",
  "audio/mp3",
  "video/mp4",
  "image/png",
  "application/rtf",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/html",
  "application/zip",
  "application/vnd.rar",
  "application/x-7z-compressed",
  "application/x-tar",
  "application/gzip",
  "application/x-bzip2",
];
</script>

<template>
  <div class="layout">
    <div v-for="type in types" :key="type">
      <OnyxFileTypeIcon :type />
      ({{ type }})
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-sm);
  font-family: var(--onyx-font-family);
  color: var(--onyx-color-text-icons-neutral-intense);
}
</style>
