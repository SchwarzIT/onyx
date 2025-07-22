<script lang="ts" setup>
import chevronUpSmall from "@sit-onyx/icons/chevron-up-small.svg?raw";
import { ONYX_BREAKPOINTS } from "@sit-onyx/shared/breakpoints";
import { computed, provide, ref, type Ref } from "vue";
import { getWindowInnerSize } from "../../composables/useResizeObserver.js";
import { provideSkeletonContext } from "../../composables/useSkeletonState.js";
import OnyxFab from "../OnyxFab/OnyxFab.vue";
import OnyxFabItem from "../OnyxFabItem/OnyxFabItem.vue";
import { SIDEBAR_INJECTION_KEY, type OnyxPageLayoutProps, type SidebarItem } from "./types.js";

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
   * Optional (right) sidebar.
   * Recommended component: [OnyxSidebar](https://storybook.onyx.schwarz/?path=/docs/navigation-sidebar--docs)
   *
   * For semantic HTML, it is recommended to use HTML elements like `<aside>` here, which is already the case when using the [OnyxSidebar](https://storybook.onyx.schwarz/?path=/docs/navigation-sidebar--docs).
   */
  sidebarRight?(): unknown;
  /**
   * Optional page footer.
   * For semantic HTML, it is recommended to use HTML elements like `<footer>` here.
   */
  footer?(): unknown;
}>();

provideSkeletonContext(props);

const sidebarItems: Ref<SidebarItem[]> = ref([]);

const updateItems = (sidebar: SidebarItem) => {
  const existingItemIndex = sidebarItems.value.findIndex((item) => item.id === sidebar.id);
  if (existingItemIndex !== -1) {
    sidebarItems.value[existingItemIndex] = sidebar;
  } else {
    sidebarItems.value.push(sidebar);
  }
};

provide(SIDEBAR_INJECTION_KEY, {
  sidebarItems,
  updateItems,
});

const fabAlignment = computed(() => {
  // Check if any sidebar item has 'left' alignment
  const hasLeftSidebar = sidebarItems.value.some((item) => item.alignment === "left");
  return hasLeftSidebar ? "left" : "right";
});
const { width: windowWidth } = getWindowInnerSize();
const dispaySidebarFab = computed(
  () =>
    sidebarItems.value.some((sidebar) => !sidebar.isDrawer) &&
    windowWidth.value <= ONYX_BREAKPOINTS.sm,
);
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

    <div v-if="slots.sidebarRight" class="onyx-page__sidebar onyx-page__sidebar--right">
      <slot name="sidebarRight"></slot>
    </div>

    <div v-if="slots.footer" class="onyx-page__footer">
      <slot name="footer"></slot>
    </div>
    <OnyxFab
      v-if="
        dispaySidebarFab &&
        sidebarItems.length === 1 &&
        !sidebarItems.some((sidebar) => sidebar.isDrawer)
      "
      label="Open Sidebar"
      :icon="chevronUpSmall"
      hide-label
      :alignment="fabAlignment"
      @click="updateItems({ ...sidebarItems[0], open: true })"
    />
    <OnyxFab
      v-if="
        dispaySidebarFab &&
        sidebarItems.length > 1 &&
        !sidebarItems.some((sidebar) => sidebar.isDrawer)
      "
      label="Open Sidebar"
      :icon="chevronUpSmall"
      hide-label
      :alignment="fabAlignment"
    >
      <OnyxFabItem
        v-for="sidebar in sidebarItems"
        :key="sidebar.id"
        label="open sidebar"
        :icon="chevronUpSmall"
        @click="updateItems({ ...sidebar, open: true })"
        >Toggle
      </OnyxFabItem>
    </OnyxFab>
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
    grid-template-columns: max-content 1fr max-content;
    grid-template-areas:
      "side main side-right"
      "footer footer footer";

    &--footer-page {
      grid-template-areas:
        "side main side-right"
        "side footer side-right";
    }

    &__sidebar {
      grid-area: side;
      overflow: hidden auto;

      &--right {
        grid-area: side-right;
      }
    }

    &__main {
      grid-area: main;
      overflow: hidden auto;
      position: relative;
    }

    &__footer {
      grid-area: footer;
    }

    &:has(&__sidebar) {
      // disable centering of the onyx-grid-container when a sidebar exists
      // because centering does not work here / is not aligned with the nav bar
      .onyx-page__main > .onyx-grid-container,
      &.onyx-page--footer-page {
        --onyx-grid-margin-inline: 0;
      }
    }
  }
}
</style>
