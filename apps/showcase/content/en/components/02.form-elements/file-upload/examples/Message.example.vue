<script lang="ts" setup>
import { OnyxFileUpload } from "sit-onyx";
</script>

<template>
  <OnyxFileUpload :message="{ shortMessage: 'Message', longMessage: 'Message tooltip content' }" />
  <!--
    "show-error" is only set for this example so the error is displayed immediately.
    Remove it if not needed so the error is only displayed after user interaction.
  -->
  <OnyxFileUpload
    :error="{ shortMessage: 'Custom error', longMessage: 'Error tooltip content' }"
    show-error
  />
  <OnyxFileUpload :success="{ shortMessage: 'Success', longMessage: 'Success tooltip content' }" />
</template>
