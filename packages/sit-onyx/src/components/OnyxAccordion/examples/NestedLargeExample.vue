<script lang="ts" setup>
import { OnyxAccordion, OnyxAccordionItem, OnyxSidebar } from "../../../index.js";
</script>

<template>
  <OnyxSidebar label="Example headline" :temporary="{ open: true }">
    <template #description>
      The "nested-large" accordion type is intended to be used inside parent components like e.g.
      the OnyxSidebar.
    </template>

    <OnyxAccordion type="nested-large">
      <OnyxAccordionItem value="item-1">
        <template #header>Accordion 1</template>
        Content...
      </OnyxAccordionItem>

      <OnyxAccordionItem value="item-2">
        <template #header>Accordion 2</template>
        Content...
      </OnyxAccordionItem>

      <OnyxAccordionItem value="item-3">
        <template #header>Accordion 3</template>
        Content...
      </OnyxAccordionItem>
    </OnyxAccordion>
  </OnyxSidebar>
</template>
