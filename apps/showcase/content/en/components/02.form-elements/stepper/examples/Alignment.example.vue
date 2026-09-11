<script lang="ts" setup>
import { OnyxStepper } from "sit-onyx";
import { ref } from "vue";

const value = ref<number>(42);
</script>

<template>
  <OnyxStepper v-model="value" label="Centered" />
  <OnyxStepper v-model="value" class="stepper--left" label="Left aligned" />
  <OnyxStepper v-model="value" class="stepper--right" label="Right aligned" />
</template>

<style lang="scss" scoped>
.stepper {
  &--left {
    --onyx-stepper-text-align: left;
  }

  &--right {
    --onyx-stepper-text-align: right;
  }
}
</style>
