<script lang="ts" setup>
import { OnyxRadioGroup, RadioButtonOption } from "sit-onyx";
import { ref } from "vue";

const selectedOption = ref<number>();

const options = [
  { label: "Very long label that should be truncated 1", value: 1 },
  { label: "Very long label that should be truncated 2", value: 2 },
  { label: "Very long label that should be truncated 3", value: 3 },
] satisfies RadioButtonOption[];
</script>

<template>
  <OnyxRadioGroup v-model="selectedOption" class="group" label="Example label" :options />
  <OnyxRadioGroup
    v-model="selectedOption"
    class="group"
    label="Example label"
    truncation="multiline"
    :options
  />
</template>

<style lang="scss" scoped>
// these styles are only used for this example, remove them when copying
.group {
  width: 16rem;
}
</style>
