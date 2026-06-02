<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxFileUpload } from "sit-onyx";
import { ref } from "vue";

// create an initial dummy file for this example
const exampleFile = new File([iconPlaceholder], "icon-placeholder.svg", { type: "image/svg+xml" });

const file = ref<File>(exampleFile);
</script>

<template>
  <OnyxFileUpload v-model="file" :accept="['.jpg', '.png', '.svg']" max-size="4MiB" />
</template>
