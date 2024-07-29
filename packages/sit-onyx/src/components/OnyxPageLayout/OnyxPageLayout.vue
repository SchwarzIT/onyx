<script lang="ts" setup>
import { computed } from "vue";
import { useRootAttrs } from "../../utils/attrs";
import type { OnyxPageLayoutProps } from "./types";

const props = defineProps<OnyxPageLayoutProps>();

const slots = defineSlots<{
  /** Main content area of the page */
  default(): unknown;
  /** Optional sidebar of the page */
  sidebar?(): unknown;
  /** Optional footer of the page*/
  footer?(): unknown;
}>();

/**
 * Determines whether the footer should be below or next to the sidebar.
 * Does not make a difference when a sidebar is hidden/not filled.
 */
const pageModifier = computed(() => {
  if (props.footerAsideSidebar) {
    return "onyx-page--footer-partial";
  }
  return "onyx-page--footer-full";
});

defineOptions({ inheritAttrs: false });
const { rootAttrs, restAttrs } = useRootAttrs();
</script>

<template>
  <div v-bind="restAttrs" :class="['onyx-page', pageModifier]">
    <aside v-if="slots.sidebar && !props.hideSidebar" class="onyx-page__sidebar">
      <slot name="sidebar"></slot>
    </aside>

    <main v-bind="rootAttrs" class="onyx-page__main">
      <slot></slot>
    </main>

    <footer v-if="slots.footer" class="onyx-page__footer">
      <slot name="footer"></slot>
    </footer>
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
      width: 100%;
    }
    &__footer {
      grid-area: footer;
      background-color: var(--background-color-footer);
    }
  }
}
</style>
