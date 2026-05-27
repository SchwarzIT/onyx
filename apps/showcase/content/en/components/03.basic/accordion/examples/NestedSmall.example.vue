<script lang="ts" setup>
import {
  OnyxAccordion,
  OnyxAccordionItem,
  OnyxAppLayout,
  OnyxNavBar,
  OnyxPageLayout,
  OnyxSidebar,
} from "sit-onyx";
import { ref } from "vue";

// for this example, we open the first accordion initially
// but you can also leave the array empty if not needed
const openAccordions = ref<string[]>(["item-1"]);
</script>

<template>
  <OnyxAppLayout>
    <template #navBar>
      <OnyxNavBar logo-url="/onyx-logo.svg" />
    </template>

    <OnyxPageLayout>
      <template #sidebar>
        <OnyxSidebar label="Example sidebar label">
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
        </OnyxSidebar>
      </template>

      Page content...
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>
