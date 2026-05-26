<script lang="ts" setup>
import { OnyxAccordion, OnyxAccordionItem } from "sit-onyx";
import { ref } from "vue";

const openAccordions = ref<string[]>([]);
</script>

<template>
  <OnyxAccordion v-model="openAccordions" type="nested-small">
    <OnyxAccordionItem value="item-1">
      <template #header>Header 1</template>
      Content of the first accordion...
    </OnyxAccordionItem>

    <OnyxAccordionItem value="item-2">
      <template #header>Header 2</template>
      Content of the second accordion...
    </OnyxAccordionItem>

    <OnyxAccordionItem value="item-3">
      <template #header>Header 3</template>
      Content of the third accordion...
    </OnyxAccordionItem>
  </OnyxAccordion>
</template>
