<script lang="ts" setup>
import sidebarArrowRight from "@sit-onyx/icons/sidebar-arrow-right.svg?raw";
import { ONYX_BREAKPOINTS } from "@sit-onyx/shared/breakpoints";
import { computed, ref, useId, useTemplateRef, watch } from "vue";
import { useDensity } from "../../composables/density.js";
import { useWindowInnerSize } from "../../composables/useResizeObserver.js";
import OnyxDrawer from "../OnyxDrawer/OnyxDrawer.vue";
import { useGlobalFAB } from "../OnyxGlobalFAB/useGlobalFAB.js";
import OnyxResizeHandle from "../OnyxResizeHandle/OnyxResizeHandle.vue";
import type { OnyxSidebarProps } from "./types.js";

const props = withDefaults(defineProps<OnyxSidebarProps>(), {
  alignment: "left",
  collapseSidebar: "sm",
});

const emit = defineEmits<{
  /**
   * Emitted when the drawer should be closed.
   * Only available when the `drawer` property is set.
   */
  close: [];
}>();

const slots = defineSlots<{
  /**
   * Main sidebar content/body.
   */
  default(): unknown;
  /**
   * Optional header slot to show above the body.
   */
  header?(): unknown;
  /**
   * Optional footer slot to show below the body.
   */
  footer?(): unknown;
  /**
   * Description slot of the `OnyxDrawer`. Only available if the `drawer` property is set.
   */
  description?(): unknown;
}>();

const { densityClass } = useDensity(props);
const fabItems = useGlobalFAB();

const sidebarElement = useTemplateRef("sidebarRef");
const drawerElement = useTemplateRef("drawerRef");
const width = ref<number>();
const widthStyle = computed(() => {
  if (!width.value) return;
  return { "--onyx-sidebar-width": `${width.value}px` };
});

const resizeHandleProps = computed(
  () =>
    ({
      onUpdateWidth: (newWidth: number) => (width.value = newWidth),
      onAutoSize: () => (width.value = undefined),
      alignment: props.alignment === "left" ? "right" : "left",
    }) as const,
);
const { width: windowWidth } = useWindowInnerSize();

const _isDrawerOpen = ref(false);

const displayAsDrawer = computed(() => {
  // If `drawer` prop is explicitly true, it's always displayed as a drawer.
  if (props.drawer) {
    return true;
  }
  // If `collapseSidebar` is false it's never collapse
  if (!props.collapseSidebar) {
    return false;
  }
  let breakpointWidth;
  if (typeof props.collapseSidebar === "number") {
    // If it's a number, use it directly as the breakpoint width
    breakpointWidth = props.collapseSidebar;
  } else if (typeof props.collapseSidebar === "string" && ONYX_BREAKPOINTS[props.collapseSidebar]) {
    // If it's a string, try to find the corresponding breakpoint in ONYX_BREAKPOINTS
    breakpointWidth = ONYX_BREAKPOINTS[props.collapseSidebar];
  } else {
    // Fallback
    breakpointWidth = ONYX_BREAKPOINTS.sm;
  }
  return windowWidth.value <= breakpointWidth;
});

const isDrawerOpen = computed<boolean>({
  get: () => {
    if (typeof props.drawer?.open === "boolean") {
      return props.drawer.open;
    }
    return _isDrawerOpen.value;
  },
  set: (newVal: boolean) => {
    _isDrawerOpen.value = newVal;
  },
});
const id = useId();
watch(
  [() => displayAsDrawer.value],
  () => {
    if (!props.drawer && props.collapseSidebar) {
      if (windowWidth.value <= ONYX_BREAKPOINTS.sm) {
        fabItems.add({
          id,
          label: props.label,
          hideLabel: true,
          hideLabelIfOption: false,
          icon: sidebarArrowRight,
          iconIfOption: false,
          alignment: props.alignment,
          class: props.alignment === "right" ? "onyx-fab-icon--rotated" : "",
          onClick: () => {
            isDrawerOpen.value = !isDrawerOpen.value;
          },
        });
      } else {
        fabItems.remove(id);
      }
    }
  },
  { immediate: true },
);
</script>

<template>
  <aside
    v-if="!displayAsDrawer"
    ref="sidebarRef"
    :class="[
      'onyx-component',
      'onyx-sidebar',
      densityClass,
      props.alignment === 'right' ? 'onyx-sidebar--right' : '',
    ]"
    :aria-label="props.label"
    :style="widthStyle"
  >
    <header v-if="!!slots.header" class="onyx-sidebar__header">
      <slot name="header"></slot>
    </header>

    <div class="onyx-sidebar__body">
      <slot></slot>
    </div>

    <footer v-if="!!slots.footer" class="onyx-sidebar__footer">
      <slot name="footer"></slot>
    </footer>

    <OnyxResizeHandle v-if="props.resizable" :element="sidebarElement" v-bind="resizeHandleProps" />
  </aside>

  <OnyxDrawer
    v-else
    v-bind="props.drawer"
    ref="drawerRef"
    :open="isDrawerOpen"
    :label="props.label"
    :density="props.density"
    class="onyx-sidebar"
    :style="widthStyle"
    :alignment="props.alignment"
    @close="
      () => {
        isDrawerOpen = false;
        emit('close');
      }
    "
  >
    <template v-if="!!slots.header" #headline>
      <slot name="header"></slot>
    </template>

    <template v-if="!!slots.description" #description>
      <slot name="description"></slot>
    </template>

    <slot></slot>

    <template v-if="!!slots.footer" #footer>
      <div class="onyx-sidebar__footer">
        <slot name="footer"></slot>
      </div>
    </template>

    <OnyxResizeHandle v-if="props.resizable" :element="drawerElement" v-bind="resizeHandleProps" />
  </OnyxDrawer>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-sidebar {
  @include layers.component() {
    --onyx-sidebar-border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
    --onyx-sidebar-padding: var(--onyx-density-md);
    --onyx-sidebar-width: 20rem;
    --onyx-sidebar-min-width: 4rem;
    --onyx-sidebar-header-gap: var(--onyx-density-md);
    --onyx-sidebar-footer-gap: var(--onyx-density-xs);
    width: var(--onyx-sidebar-width);
    min-width: var(--onyx-sidebar-min-width);
    max-width: calc(100vw - var(--onyx-grid-margin));

    &:not(:is(.onyx-drawer)) {
      font-family: var(--onyx-font-family);
      color: var(--onyx-color-text-icons-neutral-intense);
      background-color: var(--onyx-color-base-background-blank);
      border-right: var(--onyx-sidebar-border);
      height: 100%;
      max-height: 100%;
      display: flex;
      flex-direction: column;

      &.onyx-sidebar--right {
        border-left: var(--onyx-sidebar-border);
        border-right: none;
      }
    }

    &:has(.onyx-resize-handle) {
      position: relative;
    }

    &:is(.onyx-drawer) {
      --onyx-dialog-screen-gap: 0;
      --onyx-dialog-border-radius: 0;
    }

    &__header {
      display: flex;
      flex-direction: column;
      gap: var(--onyx-sidebar-header-gap);
      padding: var(--onyx-sidebar-padding);
      border-bottom: var(--onyx-sidebar-border);
    }

    &__footer {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--onyx-sidebar-footer-gap);
      padding: var(--onyx-sidebar-padding);
      border-top: var(--onyx-sidebar-border);

      > .onyx-button {
        flex-grow: 1;
      }
    }

    &__body {
      overflow: auto;
      flex-grow: 1;
    }
  }
}
</style>
