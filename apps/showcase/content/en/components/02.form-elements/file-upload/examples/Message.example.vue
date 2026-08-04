<script lang="ts" setup>
import { OnyxFileUpload } from "sit-onyx";
</script>

<template>
  <OnyxFileUpload :message="{ shortMessage: 'Message', longMessage: 'Message tooltip content' }" />
  <OnyxFileUpload
    :error="{ shortMessage: 'Custom error', longMessage: 'Error tooltip content' }"
    show-error
  />
  <OnyxFileUpload :success="{ shortMessage: 'Success', longMessage: 'Success tooltip content' }" />
</template>
