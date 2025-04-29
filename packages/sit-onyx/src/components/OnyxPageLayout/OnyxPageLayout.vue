<script lang="ts" setup>
import { provideSkeletonContext } from "../../composables/useSkeletonState";
import type { OnyxPageLayoutProps } from "./types";

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
      <slot v-if="props.noPadding"></slot>

      <div v-else class="onyx-grid-container">
        <slot></slot>
      </div>
    </main>

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
    grid-template-columns: max-content 1fr;
    grid-template-areas:
      "side main"
      "footer footer";

    &--footer-page {
      grid-template-columns: max-content 1fr;
      grid-template-rows: 1fr max-content;
      grid-template-areas:
        "side main"
        "side footer";
    }

    &__sidebar {
      grid-area: side;
      overflow: hidden auto;
    }

    &__main {
      grid-area: main;
      overflow: hidden auto;
      position: relative;
    }

    &__footer {
      grid-area: footer;
    }
  }
}
</style>
