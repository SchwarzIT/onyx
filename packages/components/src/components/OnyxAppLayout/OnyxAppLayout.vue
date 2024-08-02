<script lang="ts" setup>
import type { OnyxAppLayoutProps } from "./types";

const props = withDefaults(defineProps<OnyxAppLayoutProps>(), { navBarAlignment: "top" });

const slots = defineSlots<{
  /** Navigation area of the application */
  navBar?(): unknown;
  /** Page content area of the application */
  default(): unknown;
  /** Overlays that cover the page and exclude the nav area */
  pageOverlay?(): unknown;
  /** Overlays that cover the complete page */
  appOverlay?(): unknown;
}>();
</script>

<template>
  <div class="onyx-app" :class="{ 'onyx-app--horizontal': props.navBarAlignment === 'left' }">
    <div v-if="slots.navBar" class="onyx-app__nav">
      <slot name="navBar"></slot>
    </div>

    <div class="onyx-app__page">
      <slot></slot>
    </div>

    <div v-if="slots.pageOverlay" class="onyx-app__page-overlay">
      <slot name="pageOverlay"></slot>
    </div>

    <div v-if="slots.appOverlay" class="onyx-app__app-overlay">
      <slot name="appOverlay"></slot>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-app {
  @include layers.component() {
    --background-color-nav: var(--onyx-color-base-background-blank);
    // TODO: we need a rgba css variable in figma
    --background-color-overlay-backdrop: rgba(125, 125, 125, 0.9);

    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: max-content 1fr;
    grid-template-areas:
      "nav"
      "page";

    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);

    &--horizontal {
      grid-template-rows: none;
      grid-template-columns: max-content 1fr;
      grid-template-areas: "nav page";
    }

    &__nav {
      grid-area: nav;
      z-index: var(--onyx-z-index-navigation);
      background-color: var(--background-color-nav);
    }
    &__page {
      grid-area: page;
      overflow: hidden auto;
      position: relative;
    }
    &__page-overlay {
      grid-area: page;
      z-index: var(--onyx-z-index-page-overlay);
    }
    &__app-overlay {
      grid-column: 1 / -1;
      grid-row: 1 / -1;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: var(--onyx-z-index-app-overlay);
      background-color: var(--background-color-overlay-backdrop);
    }
  }
}
</style>
