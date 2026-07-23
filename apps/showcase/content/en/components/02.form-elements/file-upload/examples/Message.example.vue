<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxFileUpload } from "sit-onyx";
import { ref } from "vue";
</script>

<template>
  <OnyxFileUpload :message="{ shortMessage: 'Message', longMessage: 'Message tooltip content' }" />
  <OnyxFileUpload
    :error="{ shortMessage: 'Custom error', longMessage: 'Error tooltip content' }"
    show-error
  />
  <OnyxFileUpload :success="{ shortMessage: 'Success', longMessage: 'Success tooltip content' }" />
</template>
