<script lang="ts" setup>
import { OnyxAccordionItem } from "sit-onyx";
</script>

<template>
  <OnyxAccordionItem value="item-1">
    <template #header>Accordion item</template>
    Accordion content...
  </OnyxAccordionItem>
</template>
