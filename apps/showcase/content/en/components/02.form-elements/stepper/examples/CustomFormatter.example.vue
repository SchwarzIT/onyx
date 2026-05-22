<script lang="ts" setup>
import { OnyxStepper } from "sit-onyx";
import { ref } from "vue";

const value = ref<number>(12.34);
</script>

<template>
  <OnyxStepper
    v-model="value"
    label="Example label"
    :format-number="(value) => `Value: ${value}%`"
  />
</template>
