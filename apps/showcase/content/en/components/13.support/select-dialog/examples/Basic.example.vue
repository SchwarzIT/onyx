<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxButton, OnyxSelectDialog, type SelectDialogOption } from "sit-onyx";
import { ref } from "vue";

const isOpen = ref(false);

const options: SelectDialogOption[] = [
  {
    label: "Option 1",
    value: "option-1",
    icon: iconPlaceholder,
    description: "Example description for this option.",
  },
  {
    label: "Option 2",
    value: "option-2",
    icon: iconPlaceholder,
    description: "Example description for this option.",
  },
  {
    label: "Option 3",
    value: "option-3",
    icon: iconPlaceholder,
    description: "Example description for this option.",
  },
];

const selectedValue = ref(options[0]!.value);
</script>

<template>
  <div>
    <OnyxButton label="Show modal" @click="isOpen = true" />

    <OnyxSelectDialog v-model="selectedValue" v-model:open="isOpen" label="Example modal" :options>
      <template #description> Lorem ipsum dolor sit amet consectetur. </template>
    </OnyxSelectDialog>
  </div>
</template>
