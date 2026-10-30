<script lang="ts" setup>
import OnyxGlobalFAB from "../OnyxGlobalFAB/OnyxGlobalFAB.vue";
import OnyxNotifications from "../OnyxNotifications/OnyxNotifications.vue";
import OnyxToast from "../OnyxToast/OnyxToast.vue";
import type { OnyxAppLayoutProps } from "./types.js";

const props = withDefaults(defineProps<OnyxAppLayoutProps>(), {
  navBarAlignment: "top",
});

const slots = defineSlots<{
  /**
   * Page content area of the application. Recommended component:
   * [OnyxPageLayout](https://onyx.schwarz/components/layouts/page-layout).
   *
   * For semantic HTML, it is recommend to use HTML elements like `<main>`
   */
  default(): unknown;
  /**
   * Navigation area of the application. Recommended components:
   *
   * - For top alignment: [OnyxNavBar](https://onyx.schwarz/components/navigation/nav-bar)
   * - For left alignment: no onyx component yet, create your own custom one
   *
   * For implementing page-level sidebars, please use the
   * [OnyxPageLayout](https://onyx.schwarz/components/layouts/page-layout). For semantic
   * HTML, it is recommended to use HTML elements like `<header>` and `<nav>` here, which is already
   * the case when using the above recommended components.
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
    <OnyxToast />
    <OnyxGlobalFAB />
    <OnyxNotifications />
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-app {
  @include layers.component() {
    height: 100dvh;
    width: 100vw;
    display: grid;
    grid-template-rows: max-content 1fr;
    container-type: inline-size;

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
