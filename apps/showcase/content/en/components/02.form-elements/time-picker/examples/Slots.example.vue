<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import {
  OnyxIcon,
  OnyxSelect,
  OnyxUnstableFormElementAction,
  OnyxUnstableTimePicker,
  SelectOption,
} from "sit-onyx";
import { ref } from "vue";

const time = ref<string>();

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
  <OnyxUnstableTimePicker v-model="time" label="Example label">
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
  </OnyxUnstableTimePicker>
</template>
