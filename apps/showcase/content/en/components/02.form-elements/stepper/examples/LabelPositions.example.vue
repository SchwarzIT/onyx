<script lang="ts" setup>
import { OnyxStepper } from "sit-onyx";
import { ref } from "vue";

const value = ref<number>();
</script>

<template>
  <OnyxStepper v-model="value" label="Top" />
  <OnyxStepper v-model="value" :label="{ label: 'Left', position: 'left' }" />
  <OnyxStepper v-model="value" :label="{ label: 'Right', position: 'right' }" />
  <OnyxStepper v-model="value" :label="{ label: 'Hidden', hidden: true }" />
</template>
