<script lang="ts" setup>
import { OnyxAccordion, OnyxAccordionItem } from "sit-onyx";
</script>

<template>
  <OnyxAccordion>
    <OnyxAccordionItem value="item-1">
      <template #header>Accordion 1</template>
    </OnyxAccordionItem>

    <OnyxAccordionItem value="item-2">
      <template #header>Accordion 2</template>
    </OnyxAccordionItem>

    <OnyxAccordionItem value="item-3">
      <template #header>Accordion 3</template>
    </OnyxAccordionItem>
  </OnyxAccordion>
</template>

<style lang="scss" scoped>
.onyx-accordion {
  zoom: 0.6;
}
</style>
