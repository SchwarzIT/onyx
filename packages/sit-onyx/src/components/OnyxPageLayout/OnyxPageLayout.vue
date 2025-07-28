<script lang="ts" setup>
import sidebarArrowLeft from "@sit-onyx/icons/sidebar-arrow-left.svg?raw";
import sidebarArrowRight from "@sit-onyx/icons/sidebar-arrow-right.svg?raw";
import { ONYX_BREAKPOINTS } from "@sit-onyx/shared/breakpoints";
import { computed, provide, ref, type Ref } from "vue";
import { useWindowInnerSize } from "../../composables/useResizeObserver.js";
import { provideSkeletonContext } from "../../composables/useSkeletonState.js";
import OnyxFAB from "../OnyxFAB/OnyxFAB.vue";
import OnyxFABItem from "../OnyxFABItem/OnyxFABItem.vue";
import { SIDEBAR_INJECTION_KEY, type OnyxPageLayoutProps, type SidebarItem } from "./types.js";

const props = withDefaults(defineProps<OnyxPageLayoutProps>(), {
  footerAlignment: "full",
  disableSidebarMinimize: false,
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
const disableSidebarMinimize = computed(() => props.disableSidebarMinimize);
provide(SIDEBAR_INJECTION_KEY, {
  sidebarItems,
  disableSidebarMinimize,
  updateItems,
});

const fabAlignment = computed(() => {
  // Check if any sidebar item has 'left' alignment
  const hasLeftSidebar = sidebarItems.value.some((item) => item.alignment === "left");
  return hasLeftSidebar ? "left" : "right";
});
const { width: windowWidth } = useWindowInnerSize();
const dispaySidebarFab = computed(
  () =>
    !props.disableSidebarMinimize &&
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
    <OnyxFAB
      v-if="
        dispaySidebarFab &&
        sidebarItems.length === 1 &&
        !sidebarItems.some((sidebar) => sidebar.isDrawer)
      "
      class="onyx-page__sidebar-fab"
      label="Open Sidebar"
      :icon="sidebarArrowRight"
      hide-label
      :alignment="fabAlignment"
      @click="updateItems({ ...sidebarItems[0], open: true })"
    />
    <OnyxFAB
      v-if="
        dispaySidebarFab &&
        sidebarItems.length > 1 &&
        !sidebarItems.some((sidebar) => sidebar.isDrawer)
      "
      class="onyx-page__sidebar-fab"
      label="Open Sidebar"
      :icon="sidebarArrowRight"
      :closing-icon="sidebarArrowLeft"
      hide-label
      :alignment="fabAlignment"
    >
      <OnyxFABItem
        v-for="sidebar in sidebarItems"
        :key="sidebar.id"
        :label="sidebar.label"
        @click="updateItems({ ...sidebar, open: true })"
      />
    </OnyxFAB>
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
      &-fab {
        &.onyx-fab--right .onyx-icon {
          transform: rotate(180deg);
        }
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
