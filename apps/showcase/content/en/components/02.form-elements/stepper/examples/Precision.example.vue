<script lang="ts" setup>
import { OnyxStepper } from "sit-onyx";
import { ref } from "vue";

const value = ref<number>(42);
</script>

<template>
  <OnyxStepper v-model="value" label="Example label" :precision="2" />
</template>
