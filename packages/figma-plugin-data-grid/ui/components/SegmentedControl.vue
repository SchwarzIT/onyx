<script lang="ts" setup generic="TValue extends SelectOptionValue">
import {
  OnyxSegmentedControl,
  type OnyxSegmentedControlOption,
  type SelectOptionValue,
} from "sit-onyx";

const props = defineProps<{
  label: string;
  options: OnyxSegmentedControlOption<TValue>[];
}>();

const value = defineModel<TValue>({ required: true });
</script>

<template>
  <div class="wrapper">
    <span class="label onyx-text--small">{{ props.label }}</span>
    <OnyxSegmentedControl v-model="value" class="control" :options="props.options" />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--onyx-density-lg);
}

.label {
  color: var(--onyx-color-text-icons-neutral-medium);
  min-width: 3rem;
}

.control {
  flex-grow: 1;
}
</style>
