<script lang="ts" setup>
import { OnyxInput, OnyxSwitch } from "sit-onyx";
import { ref } from "vue";
</script>

<template>
  <OnyxSwitch
    label="Example label"
    :message="{ shortMessage: 'Message', longMessage: 'Message tooltip content' }"
  />
  <!--
    "show-error" is only set for this example so the error is displayed immediately.
    Remove it if not needed so the error is only displayed after user interaction.
  -->
  <OnyxSwitch
    label="Example label"
    :error="{ shortMessage: 'Custom error', longMessage: 'Error tooltip content' }"
    show-error
  />
  <OnyxSwitch
    label="Example label"
    :success="{ shortMessage: 'Success', longMessage: 'Success tooltip content' }"
  />
</template>
