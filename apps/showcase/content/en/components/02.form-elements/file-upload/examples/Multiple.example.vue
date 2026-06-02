<script lang="ts" setup>
import { OnyxFileUpload } from "sit-onyx";
import { ref } from "vue";

const files = ref<File[]>([]);
</script>

<template>
  <OnyxFileUpload
    v-model="files"
    :accept="['.jpg', '.png', '.svg']"
    max-size="4MiB"
    max-total-size="12MiB"
    :max-count="4"
    multiple
  />
</template>
