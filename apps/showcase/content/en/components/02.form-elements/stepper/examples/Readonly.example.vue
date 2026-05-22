<script lang="ts" setup>
import { OnyxStepper } from "sit-onyx";
import { ref } from "vue";

const value = ref(42);
</script>

<template>
  <OnyxStepper v-model="value" label="Readonly" readonly />
  <OnyxStepper v-model="value" label="Disabled" disabled />
</template>
