<script lang="ts" setup>
import { OnyxAccordion, OnyxAccordionItem, OnyxSidebar } from "../../../index.js";
</script>

<template>
  <OnyxSidebar label="Example headline" :temporary="{ open: true }">
    <template #description>
      The "nested-small" accordion type is intended to be used inside parent components like e.g.
      the OnyxSidebar.
    </template>

    <OnyxAccordion type="nested-small">
      <OnyxAccordionItem value="general">
        <template #header>General settings</template>
        Content...
      </OnyxAccordionItem>

      <OnyxAccordionItem value="user">
        <template #header>User settings</template>
        Content...
      </OnyxAccordionItem>

      <OnyxAccordionItem value="notifications">
        <template #header>Notification settings</template>
        Content...
      </OnyxAccordionItem>
    </OnyxAccordion>
  </OnyxSidebar>
</template>
