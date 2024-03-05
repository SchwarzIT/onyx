<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    /** Whether the nav bar will stick to the left or to the top of the app */
    navBarAlignment?: "top" | "left";
  }>(),
  { navBarAlignment: "top" },
);
const slots = defineSlots<{
  /** Navigation area of the application */
  navBar?(props: Record<string, never>): unknown;
  /** Page content area of the application */
  default(props: Record<string, never>): unknown;
  /** Overlays that cover the page and exclude the nav area */
  pageOverlay?(props: Record<string, never>): unknown;
  /** Overlays that cover the complete page */
  appOverlay?(props: Record<string, never>): unknown;
}>();
</script>

<template>
  <div class="onyx-app" :class="{ 'onyx-app--horizontal': props.navBarAlignment === 'left' }">
    <nav v-if="slots.navBar" class="onyx-app__nav">
      <slot name="navBar"></slot>
    </nav>
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
.onyx-app {
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

    background-color: var(--onyx-color-base-background-blank);
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
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: var(--onyx-z-index-app-overlay);
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
