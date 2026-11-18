<script lang="ts" setup>
import { OnyxFileUpload } from "sit-onyx";
</script>

<template>
  <OnyxFileUpload :message="{ label: 'Message', tooltipText: 'Message tooltip content' }" />
  <!--
    "show-error" is only set for this example so the error is displayed immediately.
    Remove it if not needed so the error is only displayed after user interaction.
  -->
  <OnyxFileUpload
    :error="{ label: 'Custom error', tooltipText: 'Error tooltip content' }"
    show-error
  />
  <OnyxFileUpload :success="{ label: 'Success', tooltipText: 'Success tooltip content' }" />
</template>
