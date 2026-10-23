<script lang="ts" setup>
import { OnyxTableOfContents, OnyxTableOfContentsItem } from "sit-onyx";
</script>

<template>
  <ClientOnly>
    <OnyxTableOfContents class="layout__toc">
      <OnyxTableOfContentsItem link="#section-1"> Section 1 </OnyxTableOfContentsItem>
      <OnyxTableOfContentsItem link="#section-2">
        Section 2

        <template #children>
          <OnyxTableOfContentsItem link="#section-2-1"> Sub section 2.1 </OnyxTableOfContentsItem>
          <OnyxTableOfContentsItem link="#section-2-2"> Sub section 2.2 </OnyxTableOfContentsItem>
        </template>
      </OnyxTableOfContentsItem>
      <OnyxTableOfContentsItem link="#section-3" active> Section 3 </OnyxTableOfContentsItem>
    </OnyxTableOfContents>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.onyx-toc {
  zoom: 0.5;
}
</style>
