<script lang="ts" setup>
import {
  OnyxAppLayout,
  OnyxHeadline,
  OnyxPageLayout,
  OnyxTableOfContents,
  OnyxTableOfContentsItem,
} from "sit-onyx";
</script>

<template>
  <OnyxAppLayout>
    <OnyxPageLayout>
      <div class="layout">
        <div class="layout__content">
          <OnyxHeadline is="h1">Page content</OnyxHeadline>
        </div>

        <OnyxTableOfContents class="layout__toc">
          <OnyxTableOfContentsItem link="#section-1"> Section 1 </OnyxTableOfContentsItem>
          <OnyxTableOfContentsItem link="#section-2">
            Section 2

            <template #children>
              <OnyxTableOfContentsItem link="#section-2-1">
                Sub section 2.1
              </OnyxTableOfContentsItem>
              <OnyxTableOfContentsItem link="#section-2-2">
                Sub section 2.2
              </OnyxTableOfContentsItem>
            </template>
          </OnyxTableOfContentsItem>
          <OnyxTableOfContentsItem link="#section-3"> Section 3 </OnyxTableOfContentsItem>
        </OnyxTableOfContents>
      </div>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
@use "sit-onyx/breakpoints.scss";

.layout {
  display: grid;
  // gap between page content and TOC. Equivalent to one grid column + 2 * grid gutter/gap
  gap: calc(2 * var(--onyx-grid-gutter) + (100 / var(--onyx-grid-columns)) * 1%);
  grid-template-columns: 1fr minmax(8rem, 15rem);

  &__toc {
    position: sticky;
    top: var(--onyx-grid-margin-vertical);
    max-height: calc(100vh - var(--onyx-nav-bar-height) - 2 * var(--onyx-grid-margin-vertical));
  }

  &__content {
    // when using a grid inside the content, it should reflect only the available
    // content width as breakpoint instead of the whole page (including the TOC)
    container-type: inline-size;
  }

  // hide TOC on smaller screens
  @include breakpoints.container(max, md) {
    display: flex;
    flex-direction: column;

    .layout__toc {
      display: none;
    }
  }
}
</style>
