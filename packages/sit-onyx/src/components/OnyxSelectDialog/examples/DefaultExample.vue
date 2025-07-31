<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { ref } from "vue";
import { OnyxButton, OnyxSelectDialog, type SelectDialogOption } from "../../../index.js";

const isOpen = ref(false);

const options: SelectDialogOption[] = [
  { label: "Option 1", value: "option-1" },
  { label: "Option 2", value: "option-2", icon: iconPlaceholder },
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
