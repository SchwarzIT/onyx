<script lang="ts" setup>
import OnyxAccordionItem from "../OnyxAccordionItem/OnyxAccordionItem.vue";
import OnyxAccordion from "./OnyxAccordion.vue";
import type { OnyxAccordionProps } from "./types";

const props = defineProps<
  OnyxAccordionProps & {
    /** Currently opened items */
    modelValue?: string[];
  }
>();

const emit = defineEmits<{
  "update:modelValue": [value: string[]];
}>();
</script>

<template>
  <OnyxAccordion v-bind="props" @update:model-value="emit('update:modelValue', $event)">
    <OnyxAccordionItem value="item-1">
      <template #header>Accordion Header 1</template>
      Accordion Panel 1
    </OnyxAccordionItem>

    <OnyxAccordionItem value="item-2">
      <template #header>Accordion Header 2</template>
      Accordion Panel 2
    </OnyxAccordionItem>
  </OnyxAccordion>
</template>
