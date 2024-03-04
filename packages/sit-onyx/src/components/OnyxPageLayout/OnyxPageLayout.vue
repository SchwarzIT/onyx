<script lang="ts" setup>
import { computed, useSlots } from "vue";

const props = defineProps<{
  /** When the page includes a sidebar as well as a footer,
   * footerAsideSidebar will restrict the footer to span
   * the main area next to the sidebar.
   */
  footerAsideSidebar?: boolean;
}>();

defineSlots<{
  default(props: Record<string, never>): unknown;
  sidebar(props: Record<string, never>): unknown;
  footer(props: Record<string, never>): unknown;
  mainOverlay(props: Record<string, never>): unknown;
  toasts(props: Record<string, never>): unknown;
}>();
const slots = useSlots();

const pageModifier = computed(() => {
  let mode = "";
  if (!slots.footer && slots.sidebar) mode = "onyx-page--side-main";
  if (slots.footer && !slots.sidebar) mode = "onyx-page--main-footer";
  if (slots.footer && slots.sidebar) {
    if (props.footerAsideSidebar) {
      mode = "onyx-page--side-main-footer-partial";
    } else {
      mode = "onyx-page--side-main-footer-full";
    }
  }
  return mode;
});
</script>

<template>
  <div class="onyx-page" :class="pageModifier">
    <aside v-if="slots.sidebar" class="onyx-page__sidebar">
      <slot name="sidebar"></slot>
    </aside>
    <main class="onyx-page__main">
      <slot></slot>
    </main>
    <footer v-if="slots.footer" class="onyx-page__footer">
      <slot name="footer"></slot>
    </footer>
    <div v-if="slots.toasts" class="onyx-page__toasts">
      <slot name="toasts"></slot>
    </div>
    <div v-if="slots.mainOverlay" class="onyx-page__overlay">
      <slot name="mainOverlay"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.onyx-page {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto;
  grid-template-areas: "main";

  &--side-main {
    grid-template-columns: max-content 1fr;
    grid-template-areas: "side main";
  }
  &--main-footer {
    grid-template-rows: 1fr max-content;
    grid-template-areas:
      "main"
      "footer";
  }
  &--side-main-footer-full {
    grid-template-columns: max-content 1fr;
    grid-template-rows: 1fr max-content;
    grid-template-areas:
      "side main"
      "footer footer";
  }
  &--side-main-footer-partial {
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

    // todo need design token from UX
    background-color: var(--onyx-color-universal-grayscale-white);
  }
  &__main {
    grid-area: main;
    overflow: hidden auto;
    position: relative;

    background-color: var(--onyx-color-base-neutral-100);
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
  }
}
</style>
