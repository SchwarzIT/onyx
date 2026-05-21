<script lang="ts" setup>
import { OnyxSelect, SelectOption } from "sit-onyx";
import { ref } from "vue";

const value = ref<string>();
const options = [] satisfies SelectOption[];
</script>

<template>
  <OnyxSelect
    v-model="value"
    label="Example label"
    list-label="Available options"
    :options
    :message="{ shortMessage: 'Message', longMessage: 'Message tooltip content' }"
  />
  <!--
    "show-error" is only set for this example so the error is displayed immediately.
    Remove it if not needed so the error is only displayed after user interaction.
  -->
  <OnyxSelect
    v-model="value"
    label="Example label"
    list-label="Available options"
    :options
    :error="{ shortMessage: 'Custom error', longMessage: 'Error tooltip content' }"
    show-error
  />
  <OnyxSelect
    v-model="value"
    label="Example label"
    list-label="Available options"
    :options
    :success="{ shortMessage: 'Success', longMessage: 'Success tooltip content' }"
  />
</template>
