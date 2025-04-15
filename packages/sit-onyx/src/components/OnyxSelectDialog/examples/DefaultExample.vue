<script lang="ts" setup>
import placeholder from "@sit-onyx/icons/placeholder.svg?raw";
import { ref } from "vue";
import { OnyxButton, OnyxSelectDialog } from "../../..";
import type { SelectDialogOption } from "../types";

const isOpen = ref(false);

const options: SelectDialogOption[] = [
  { label: "Option 1", value: "option-1" },
  { label: "Option 2", value: "option-2", icon: placeholder },
  { label: "Option 3", value: "option-3", description: "Example description for this option." },
];

const selectedValue = ref(options[0].value);
</script>

<template>
  <div>
    <OnyxButton label="Open dialog" @click="isOpen = true" />

    <OnyxSelectDialog
      v-model="selectedValue"
      label="Example select dialog"
      :options="options"
      :open="isOpen"
      @close="isOpen = false"
    >
      <template #description> Lorem ipsum dolor sit amet consectetur. </template>
    </OnyxSelectDialog>
  </div>
</template>
