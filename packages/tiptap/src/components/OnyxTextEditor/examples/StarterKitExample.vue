<script lang="ts" setup>
import { OnyxStarterKit, OnyxTextEditor } from "../../../index.js";

const extensions = [
  OnyxStarterKit.configure({
    blockquote: false, // e.g. disable specific extensions
    heading: {
      levels: [1, 2], // or customize existing ones
    },
  }),
];
</script>

<template>
  <OnyxTextEditor label="Example label" :extensions />
</template>
