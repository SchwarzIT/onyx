<script lang="ts" setup>
import { FileType, OnyxFileUpload } from "sit-onyx";
import { ref } from "vue";

const file = ref<File>();

const accept: FileType[] = [".jpg", ".png", ".svg"];
</script>

<template>
  <OnyxFileUpload v-model="file" :accept />
  <OnyxFileUpload v-model="file" size="medium" :accept />
  <OnyxFileUpload v-model="file" size="small" :accept />
</template>
