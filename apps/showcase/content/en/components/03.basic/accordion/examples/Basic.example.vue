<script lang="ts" setup>
import { OnyxAccordion, OnyxAccordionItem } from "sit-onyx";
import { ref } from "vue";

// for this example, we open the first accordion initially
// but you can also leave the array empty if not needed
const openAccordions = ref<string[]>(["item-1"]);
</script>

<template>
  <OnyxAccordion v-model="openAccordions">
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
