<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import {
  OnyxIcon,
  OnyxSelect,
  OnyxStepper,
  OnyxUnstableFormElementAction,
  SelectOption,
} from "sit-onyx";
import { ref } from "vue";

const value = ref<number>();

const unitOptions = [
  { label: "kg", value: "kg" },
  { label: "g", value: "g" },
] satisfies SelectOption[];

const unit = ref(unitOptions[0].value);

const handleActionClick = () => {
  // your logic here
};
</script>

<template>
  <OnyxStepper v-model="value" label="Example label">
    <template #leading>
      <OnyxUnstableFormElementAction
        label="Example action"
        :icon="iconPlaceholder"
        size="lg"
        @click="handleActionClick"
      />
    </template>

    <template #leadingIcons>
      <OnyxIcon :icon="iconPlaceholder" />
    </template>

    <template #trailingIcons>
      <OnyxIcon :icon="iconPlaceholder" />
    </template>

    <template #trailing>
      <OnyxSelect
        v-model="unit"
        label="Unit"
        list-label="Available units"
        alignment="right"
        :options="unitOptions"
        hide-clear-icon
        hide-label
      />
    </template>
  </OnyxStepper>
</template>
