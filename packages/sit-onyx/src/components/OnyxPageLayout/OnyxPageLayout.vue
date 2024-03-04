<script lang="ts" setup>
import { computed, useSlots } from "vue";

const props = defineProps<{
  footerAsideSidebar?: boolean;
}>();

defineSlots<{
  default(props: Record<string, never>): unknown;
  sidebar(props: Record<string, never>): unknown;
  footer(props: Record<string, never>): unknown;
  mainOverlay(props: Record<string, never>): unknown;
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
  }

  &__sidebar {
    grid-area: side;
  }
  &__main {
    grid-area: main;
    overflow: hidden auto;
    position: relative;

    background-color: #efefef;
  }
  &__footer {
    grid-area: footer;
  }
}
</style>
