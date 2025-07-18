<script lang="ts" setup>
import { provideSkeletonContext } from "../../composables/useSkeletonState.js";
import type { OnyxPageLayoutProps } from "./types.js";

const props = withDefaults(defineProps<OnyxPageLayoutProps>(), {
  footerAlignment: "full",
});

const slots = defineSlots<{
  /**
   * Main content area of the page.
   */
  default(): unknown;
  /**
   * Optional (left) sidebar.
   * Recommended component: [OnyxSidebar](https://storybook.onyx.schwarz/?path=/docs/navigation-sidebar--docs)
   *
   * For semantic HTML, it is recommended to use HTML elements like `<aside>` here, which is already the case when using the [OnyxSidebar](https://storybook.onyx.schwarz/?path=/docs/navigation-sidebar--docs).
   */
  sidebar?(): unknown;
  /**
   * Optional (right) sidebar.
   * Recommended component: [OnyxSidebar](https://storybook.onyx.schwarz/?path=/docs/navigation-sidebar--docs)
   *
   * For semantic HTML, it is recommended to use HTML elements like `<aside>` here, which is already the case when using the [OnyxSidebar](https://storybook.onyx.schwarz/?path=/docs/navigation-sidebar--docs).
   */
  sidebarRight?(): unknown;
  /**
   * Optional page footer.
   * For semantic HTML, it is recommended to use HTML elements like `<footer>` here.
   */
  footer?(): unknown;
}>();

provideSkeletonContext(props);
</script>

<template>
  <div
    class="onyx-component onyx-page"
    :class="[
      'onyx-component',
      'onyx-page',
      props.footerAlignment === 'page' ? 'onyx-page--footer-page' : '',
    ]"
  >
    <div v-if="slots.sidebar" class="onyx-page__sidebar">
      <slot name="sidebar"></slot>
    </div>

    <main class="onyx-page__main">
      <slot v-if="props.noPadding" class="onyx-grid-container"></slot>

      <div v-else class="onyx-grid-layout">
        <slot></slot>
      </div>
    </main>

    <div v-if="slots.sidebarRight" class="onyx-page__sidebar onyx-page__sidebar--right">
      <slot name="sidebarRight"></slot>
    </div>

    <div v-if="slots.footer" class="onyx-page__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-page {
  @include layers.component() {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: 1fr max-content;
    grid-template-columns: max-content 1fr max-content;
    grid-template-areas:
      "side main side-right"
      "footer footer footer";
    container-type: inline-size;

    &--footer-page {
      grid-template-areas:
        "side main side-right"
        "side footer side-right";
    }

    &__sidebar {
      grid-area: side;
      overflow: hidden auto;

      &--right {
        grid-area: side-right;
      }
    }

    &__main {
      grid-area: main;
      overflow: hidden auto;
      position: relative;
    }

    &__footer {
      grid-area: footer;
    }

    &:has(&__sidebar) {
      // disable centering of the onyx-grid-layout when a sidebar exists
      // because centering does not work here / is not aligned with the nav bar
      .onyx-page__main > .onyx-grid-layout,
      &.onyx-page--footer-page {
        --onyx-grid-margin-inline: 0;
      }
    }
  }
}
</style>
