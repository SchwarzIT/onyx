<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import {
  OnyxIcon,
  OnyxSelect,
  OnyxDatePickerV2,
  OnyxFormElementAction,
  type SelectOption,
} from "sit-onyx";
import { ref } from "vue";

const date = ref<Date>();

const selectOptions = [
  { label: "Foo", value: "foo" },
  { label: "Bar", value: "bar" },
] satisfies SelectOption[];

const selectedOption = ref("foo");

const handleActionClick = () => {
  // your logic here
};
</script>

<template>
  <OnyxDatePickerV2 v-model="date" label="Date">
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
        v-model="selectedOption"
        label="Unit"
        list-label="Available units"
        alignment="right"
        :options="selectOptions"
        hide-clear-icon
        hide-label
      />
    </template>
  </OnyxDatePickerV2>
</template>
