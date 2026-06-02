<script lang="ts" setup>
import type { TocLink } from "@nuxtjs/mdc";

const props = defineProps<{
  toc: TocLink[];
  /**
   * Whether the TOC should be hidden completely.
   * By default, the content space is still limited even when the TOC is empty
   * so the layout width is the same when switching between pages with and without a TOC.
   *
   * When set to `true`, the content will be full width.
   */
  hidden?: boolean;
}>();

defineSlots<{
  /**
   * Page content.
   */
  default(): unknown;
}>();
</script>

<template>
  <div v-if="props.hidden" class="layout__content">
    <slot></slot>
  </div>

  <div v-else class="layout">
    <div class="layout__content">
      <slot></slot>
    </div>

    <TableOfContents v-if="props.toc.length" class="layout__toc" :links="props.toc" />
  </div>
</template>

<style lang="scss" scoped>
@use "sit-onyx/breakpoints.scss";

.layout {
  /** Gap between page content and TOC. Equivalent to one grid column + 2 * grid gutter/gap */
  --onyx-content-toc-gap: calc(2 * var(--onyx-grid-gutter) + (100 / var(--onyx-grid-columns)) * 1%);
  display: grid;
  gap: var(--onyx-content-toc-gap);

  // see: https://storybook.onyx.schwarz/?path=/docs/navigation-tableofcontents--docs
  grid-template-columns: 1fr minmax(8rem, 15rem);

  &__toc {
    position: sticky;
    top: var(--onyx-grid-margin-vertical);
    height: calc(100vh - var(--onyx-nav-bar-height) - 2 * var(--onyx-grid-margin-vertical));
  }

  // hide TOC on smaller screens
  @include breakpoints.container(max, md) {
    display: flex;
    flex-direction: column;

    .layout__toc {
      display: none;
    }
  }

  &__content {
    // remove the top margin of the first child since its redundant to the page padding
    :deep(> div > :first-child) {
      margin-top: 0;
    }
  }
}
</style>
