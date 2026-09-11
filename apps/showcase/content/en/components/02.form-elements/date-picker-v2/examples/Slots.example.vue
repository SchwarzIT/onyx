<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import {
  OnyxIcon,
  OnyxSelect,
  OnyxUnstableDatePickerV2,
  OnyxUnstableFormElementAction,
  SelectOption,
} from "sit-onyx";
import { ref } from "vue";

const date = ref<Date>();

const selectOptions = [
  { label: "Foo", value: "foo" },
  { label: "Bar", value: "bar" },
] satisfies SelectOption[];

const selectedOption = ref(selectOptions[0].value);

const handleActionClick = () => {
  // your logic here
};
</script>

<template>
  <OnyxUnstableDatePickerV2 v-model="date" label="Date">
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
        v-model="selectedOption"
        label="Unit"
        list-label="Available units"
        alignment="right"
        :options="selectOptions"
        hide-clear-icon
        hide-label
      />
    </template>
  </OnyxUnstableDatePickerV2>
</template>
