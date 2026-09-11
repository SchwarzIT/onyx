<script lang="ts" setup>
import { OnyxFileUpload } from "sit-onyx";
</script>

<template>
  <OnyxFileUpload label="Top" />
  <OnyxFileUpload :label="{ label: 'Left', position: 'left' }" />
  <OnyxFileUpload :label="{ label: 'Right', position: 'right' }" />
  <OnyxFileUpload :label="{ label: 'Hidden', hidden: true }" />
</template>
