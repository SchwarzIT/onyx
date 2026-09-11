<script lang="ts" setup>
import { CheckboxGroupOption, OnyxCheckboxGroup } from "sit-onyx";
import { ref } from "vue";

const selectedOptions = ref<number[]>([]);

const options = [
  { label: "Very long label that should be truncated 1", value: 1 },
  { label: "Very long label that should be truncated 2", value: 2 },
  { label: "Very long label that should be truncated 3", value: 3 },
] satisfies CheckboxGroupOption[];
</script>

<template>
  <OnyxCheckboxGroup v-model="selectedOptions" class="group" label="Example label" :options />
  <OnyxCheckboxGroup
    v-model="selectedOptions"
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
