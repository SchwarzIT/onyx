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
  <OnyxProgressSteps v-model="activeStep" :steps="steps">
    <template #step="{ step }">
      {{ step.label }}
      <div class="description">Description</div>
    </template>
  </OnyxProgressSteps>
</template>

<style lang="scss" scoped>
.description {
  color: var(--onyx-color-text-icons-neutral-soft);
  font-weight: var(--onyx-font-weight-regular);
  font-size: var(--onyx-font-size-sm);
  line-height: var(--onyx-font-line-height-sm);
}
</style>
