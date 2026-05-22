<script lang="ts" setup>
import { OnyxStepper } from "sit-onyx";
import { ref } from "vue";

const value = ref<number>();
</script>

<template>
  <OnyxStepper v-model="value" label="Default" placeholder="Placeholder..." required />
  <OnyxStepper
    v-model="value"
    label="Without buttons"
    placeholder="Placeholder..."
    required
    hide-buttons
  />
</template>
