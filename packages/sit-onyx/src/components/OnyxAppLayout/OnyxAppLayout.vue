<script lang="ts" setup>
import type { OnyxAppLayoutProps } from "./types.js";

const props = withDefaults(defineProps<OnyxAppLayoutProps>(), {
  navBarAlignment: "top",
});

const slots = defineSlots<{
  /**
   * Page content area of the application. Recommended component: [OnyxPageLayout](https://storybook.onyx.schwarz/?path=/docs/layout-pagelayout--docs).
   *
   * For semantic HTML, it is recommend to use HTML elements like `<main>`
   */
  default(): unknown;
  /**
   * Navigation area of the application. Recommended components:
   * - for top alignment: [OnyxNavBar](https://storybook.onyx.schwarz/?path=/docs/navigation-navbar--docs)
   * - for left alignment: no onyx component yet, create your own custom one
   *
   * For implementing page-level sidebars, please use the [OnyxPageLayout](https://onyx.schwarz/?path=/story/layout-pagelayout--sidebar).
   * For semantic HTML, it is recommended to use HTML elements like `<header>` and `<nav>` here, which is already the case when using the above recommended components.
   */
  navBar?(): unknown;
}>();
</script>

<template>
  <div
    class="onyx-component onyx-app"
    :class="{ 'onyx-app--horizontal': props.navBarAlignment === 'left' }"
  >
    <div v-if="slots.navBar" class="onyx-app__nav">
      <slot name="navBar"></slot>
    </div>

    <div class="onyx-app__page">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-app {
  @include layers.component() {
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: max-content 1fr;

    &--horizontal {
      grid-template-rows: none;
      grid-template-columns: max-content 1fr;
    }

    &:not(:has(> &__nav)) {
      grid-template-rows: 1fr;
    }

    &__nav {
      z-index: var(--onyx-z-index-navigation);
    }

    &__page {
      overflow: hidden auto;
    }
  }
}
</style>
