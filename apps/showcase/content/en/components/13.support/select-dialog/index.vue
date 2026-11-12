<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxSelectDialog, type SelectDialogOption } from "sit-onyx";
import { ref } from "vue";

const options: SelectDialogOption[] = [
  {
    label: "Option",
    value: "option-1",
    icon: iconPlaceholder,
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    label: "Option",
    value: "option-2",
    icon: iconPlaceholder,
    description: "Lorem ipsum dolor sit amet.",
  },
];

const selectedValue = ref(options[0]!.value);
</script>

<template>
  <!-- modal="false" is important so the dialog can be placed inside the overview card instead of above the while viewport -->
  <OnyxSelectDialog
    v-model="selectedValue"
    class="modal"
    label="Select dialog"
    :modal="false"
    :options
    open
  >
    <template #description> Lorem ipsum dolor sit amet consectetur. </template>
  </OnyxSelectDialog>
</template>

<style lang="scss" scoped>
.modal {
  zoom: 0.35;
}
</style>
