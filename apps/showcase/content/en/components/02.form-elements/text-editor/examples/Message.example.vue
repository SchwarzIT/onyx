<script lang="ts" setup>
import { OnyxTextEditor } from "@sit-onyx/tiptap";
import { ref } from "vue";

const value = ref<string>();
</script>

<template>
  <OnyxTextEditor
    v-model="value"
    label="Example label"
    :message="{ label: 'Message', tooltipText: 'Message tooltip content' }"
  />
  <!--
    "show-error" is only set for this example so the error is displayed immediately.
    Remove it if not needed so the error is only displayed after user interaction.
  -->
  <OnyxTextEditor
    v-model="value"
    label="Example label"
    :error="{ label: 'Custom error', tooltipText: 'Error tooltip content' }"
    show-error
  />
  <OnyxTextEditor
    v-model="value"
    label="Example label"
    :success="{ label: 'Success', tooltipText: 'Success tooltip content' }"
  />
</template>
