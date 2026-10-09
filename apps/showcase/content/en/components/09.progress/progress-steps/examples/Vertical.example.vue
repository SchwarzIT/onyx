<script lang="ts" setup>
import { OnyxProgressSteps, type ControlledProgressStep } from "sit-onyx";
import { ref } from "vue";

const activeStep = ref(3);

const steps: ControlledProgressStep[] = [
  { label: "Cart" },
  { label: "Shipping" },
  { label: "Payment" },
  { label: "Checkout" },
];
</script>

<template>
  <OnyxProgressSteps v-model="activeStep" :steps="steps" orientation="vertical" />
</template>
