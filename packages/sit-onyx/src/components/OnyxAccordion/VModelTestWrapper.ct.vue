<script lang="ts" setup>
import { ref } from "vue";
import OnyxAccordionItem from "../OnyxAccordionItem/OnyxAccordionItem.vue";
import OnyxAccordion from "./OnyxAccordion.vue";

// we force item-1 to be open here so even when interacting with the component, item-2 should never be open
const openItems = ref(["item-1"]);
</script>

<template>
  <OnyxAccordion :model-value="openItems">
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
