<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxIcon, OnyxSelect, OnyxFormElementAction, type SelectOption } from "sit-onyx";
import { ref } from "vue";

const value = ref<string>();
const options = [] satisfies SelectOption[];

const unitOptions = [
  { label: "kg", value: "kg" },
  { label: "g", value: "g" },
] satisfies SelectOption[];

const unit = ref("kg");

const handleActionClick = () => {
  // your logic here
};
</script>

<template>
  <OnyxSelect
    v-model="value"
    label="Example label"
    list-label="Available options"
    :options
    disable-slot-padding
  >
    <template #leading>
      <OnyxFormElementAction
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
  </OnyxSelect>
</template>
