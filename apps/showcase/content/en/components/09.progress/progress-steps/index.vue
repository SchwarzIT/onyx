<script lang="ts" setup>
import { OnyxProgressSteps, type ControlledProgressStep } from "sit-onyx";
import { ref } from "vue";

const activeStep = ref(2);

const steps: ControlledProgressStep[] = [{ label: "Step" }, { label: "Step" }, { label: "Step" }];
</script>

<template>
  <OnyxProgressSteps v-model="activeStep" :steps />
</template>

<style lang="scss" scoped>
.onyx-progress-steps {
  zoom: 0.75;
}
</style>
