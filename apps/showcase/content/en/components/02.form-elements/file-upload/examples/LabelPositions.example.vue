<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxFileUpload } from "sit-onyx";
import { ref } from "vue";
</script>

<template>
  <OnyxFileUpload label="Top" />
  <OnyxFileUpload :label="{ label: 'Left', position: 'left' }" />
  <OnyxFileUpload :label="{ label: 'Right', position: 'right' }" />
  <OnyxFileUpload :label="{ label: 'Hidden', hidden: true }" />
</template>
