<script lang="ts" setup>
import { OnyxTextarea } from "sit-onyx";
import { ref } from "vue";

const value = ref("");
</script>

<template>
  <OnyxTextarea
    v-model="value"
    label="Example label"
    :message="{ shortMessage: 'Message', longMessage: 'Message tooltip content' }"
  />
  <!--
    "show-error" is only set for this example so the error is displayed immediately.
    Remove it if not needed so the error is only displayed after user interaction.
  -->
  <OnyxTextarea
    v-model="value"
    label="Example label"
    :error="{ shortMessage: 'Custom error', longMessage: 'Error tooltip content' }"
    show-error
  />
  <OnyxTextarea
    v-model="value"
    label="Example label"
    :success="{ shortMessage: 'Success', longMessage: 'Success tooltip content' }"
  />
</template>
