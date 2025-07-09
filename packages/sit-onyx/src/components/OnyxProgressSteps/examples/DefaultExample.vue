<script lang="ts" setup>
import { ref } from "vue";
import { OnyxProgressSteps, type ControlledProgressStep } from "../../../index.js";

const activeStep = ref(3);

const steps: ControlledProgressStep[] = [
  { label: "Cart" },
  { label: "Shipping" },
  { label: "Payment" },
  { label: "Checkout" },
];
</script>

<template>
  <OnyxProgressSteps v-model="activeStep" :steps="steps" />
</template>
