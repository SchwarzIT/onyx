<script lang="ts" setup>
import { computed } from "vue";
import type { OnyxPageLayoutProps } from "./types";

const props = defineProps<OnyxPageLayoutProps>();

defineSlots<{
  /** Main content area of the page */
  default(): unknown;
  /** Optional sidebar of the page */
  sidebar?(): unknown;
  /** Optional footer of the page*/
  footer?(): unknown;
  /** Slot for toast messages that stick at the bottom (above footer) */
  toasts?(): unknown;
}>();

const pageModifier = computed(() => {
  let mode = "";
  if (props.footerAsideSidebar) {
    mode = "onyx-page--footer-partial";
  } else {
    mode = "onyx-page--footer-full";
  }
  return mode;
});
</script>

<template>
  <div class="onyx-page" :class="pageModifier">
    <aside v-show="!props.hideSidebar" class="onyx-page__sidebar">
      <slot name="sidebar"></slot>
    </aside>
    <main class="onyx-page__main">
      <slot></slot>
    </main>
    <footer class="onyx-page__footer">
      <slot name="footer"></slot>
    </footer>
    <div class="onyx-page__toasts">
      <slot name="toasts"></slot>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-page {
  @include layers.component() {
    --background-color-sidebar: var(--onyx-color-base-background-blank);
    --background-color-main: var(--onyx-color-base-background-tinted);
    --background-color-footer: var(--onyx-color-base-background-blank);

    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: auto;
    grid-template-areas: "main";

    &--footer-full {
      grid-template-columns: max-content 1fr;
      grid-template-rows: 1fr max-content;
      grid-template-areas:
        "side main"
        "footer footer";
    }
    &--footer-partial {
      grid-template-columns: max-content 1fr;
      grid-template-rows: 1fr max-content;
      grid-template-areas:
        "side main"
        "side footer";

      .onyx-page__toasts {
        grid-column: 2 / -1;
      }
    }

    &__sidebar {
      grid-area: side;
      overflow: hidden auto;
      background-color: var(--background-color-sidebar);
    }
    &__main {
      grid-area: main;
      overflow: hidden auto;
      position: relative;
      background-color: var(--background-color-main);
    }
    &__toasts {
      grid-row: 1 / -2;
      grid-column: 1 / -1;
      z-index: var(--onyx-z-index-notification);
      align-self: end;
      justify-self: center;
      position: relative;
      width: 100%;
    }
    &__footer {
      grid-area: footer;
      background-color: var(--background-color-footer);
    }
  }
}
</style>
