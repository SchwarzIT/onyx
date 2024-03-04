<script lang="ts" setup>
import { computed, useSlots } from "vue";

const props = withDefaults(
  defineProps<{
    sidebarBehavior: "sticky" | "collapsible" | "overlay";
    footerBehavior: "main" | "full";
  }>(),
  { sidebarBehavior: "sticky", footerBehavior: "full" },
);
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
    if (props.footerBehavior === "full" || props.sidebarBehavior === "overlay") {
      mode = "onyx-page--side-main-full-footer";
    } else {
      mode = "onyx-page--side-main-part-footer";
    }
  }

  return mode;
});
</script>

<template>
  <div class="onyx-page" :class="pageModifier">
    <nav v-if="slots.sidebar" class="onyx-page__sidebar">
      <slot name="sidebar"></slot>
    </nav>
    <main class="onyx-page__main">
      <slot></slot>
    </main>
    <footer v-if="slots.footer" class="onyx-page__footer">
      <slot name="footer"></slot>
    </footer>
    <div v-if="slots.mainOverlay" class="main-overlay">
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
    grid-template-columns: max-content auto;
    grid-template-areas: "side main";
  }
  &--main-footer {
    grid-template-rows: auto max-content;
    grid-template-areas:
      "main"
      "footer";
  }
  &--side-main-full-footer {
    grid-template-columns: max-content auto;
    grid-template-rows: auto max-content;
    grid-template-areas:
      "side main"
      "footer footer";
  }
  &--side-main-part-footer {
    grid-template-columns: max-content auto;
    grid-template-rows: auto max-content;
    grid-template-areas:
      "side main"
      "side footer";
  }
}
</style>
