<script lang="ts" setup>
import arrowSmallLeft from "@sit-onyx/icons/arrow-small-left.svg?raw";
import arrowSmallRight from "@sit-onyx/icons/arrow-small-right.svg?raw";
import sidebarArrowLeft from "@sit-onyx/icons/sidebar-arrow-left.svg?raw";
import sidebarArrowRight from "@sit-onyx/icons/sidebar-arrow-right.svg?raw";
import { ONYX_BREAKPOINTS } from "@sit-onyx/shared/breakpoints";
import { computed, onUnmounted, ref, useId, useTemplateRef, watch } from "vue";
import { useDensity } from "../../composables/density.js";
import { useResizeObserver } from "../../composables/useResizeObserver.js";
import { useGlobalFAB } from "../OnyxGlobalFAB/useGlobalFAB.js";
import OnyxModal from "../OnyxModal/OnyxModal.vue";
import OnyxResizeHandle from "../OnyxResizeHandle/OnyxResizeHandle.vue";
import type { OnyxSidebarProps } from "./types.js";

const props = withDefaults(defineProps<OnyxSidebarProps>(), {
  alignment: "left",
  collapseSidebar: "sm",
  resizable: true,
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
   * Description slot of the `OnyxModalDialog`. Only available if the `temporary` property is set.
   */
  description?(): unknown;
}>();

const { densityClass } = useDensity(props);
const globalFAB = useGlobalFAB();

const sidebarElement = useTemplateRef("sidebarRef");
const modalElement = useTemplateRef("modalRef");
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
const { width: windowWidth } = useResizeObserver();

const shouldCollapse = computed(() => {
  if (!props.collapseSidebar) return false;
  const breakpointWidth =
    typeof props.collapseSidebar === "number"
      ? props.collapseSidebar
      : ONYX_BREAKPOINTS[props.collapseSidebar];
  return windowWidth.value <= breakpointWidth;
});

const _isModalOpen = ref(false);
const isModalOpen = computed<boolean>({
  get: () => {
    if (typeof props.temporary?.open === "boolean") {
      return props.temporary.open;
    }
    return _isModalOpen.value;
  },
  set: (newVal: boolean) => {
    _isModalOpen.value = newVal;
    if (!newVal) {
      emit("close");
    }
  },
});

const id = useId();

watch(
  [shouldCollapse, () => props.temporary],
  () => {
    if (!shouldCollapse.value || props.temporary) {
      globalFAB.remove(id);
      return;
    }

    globalFAB.add(
      computed(() => ({
        id,
        label: props.label,
        hideLabel: true,
        icon: props.alignment === "right" ? sidebarArrowLeft : sidebarArrowRight,
        ifOption: {
          hideLabel: false,
          icon: props.alignment === "right" ? arrowSmallLeft : arrowSmallRight,
        },
        alignment: props.alignment,
        onClick: () => {
          isModalOpen.value = !isModalOpen.value;
        },
      })),
    );
  },
  { immediate: true },
);

onUnmounted(() => {
  globalFAB.remove(id);
});
</script>

<template>
  <aside
    v-if="!props.temporary && !shouldCollapse"
    ref="sidebarRef"
    :class="[
      'onyx-component',
      'onyx-sidebar',
      'onyx-grid-container',
      densityClass,
      { 'onyx-sidebar--right': props.alignment === 'right' },
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

  <OnyxModal
    v-else
    v-bind="props.temporary"
    ref="modalRef"
    v-model:open="isModalOpen"
    :class="[
      'onyx-sidebar',
      'onyx-sidebar--temporary',
      {
        'onyx-sidebar--right': props.alignment === 'right',
        'onyx-sidebar--floating': props.temporary?.floating,
      },
    ]"
    :label="props.label"
    :density="props.density"
    :style="widthStyle"
    :alignment="props.alignment"
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

    <OnyxResizeHandle v-if="props.resizable" :element="modalElement" v-bind="resizeHandleProps" />
  </OnyxModal>
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

    &:not(&--temporary) {
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

    &--temporary {
      --onyx-modal-padding-inline: var(--onyx-density-md);

      &:not(.onyx-sidebar--floating) {
        --onyx-basic-dialog-screen-gap: 0;
        --onyx-basic-dialog-border-radius: 0;
        border-top: none;
        border-left: none;
        border-bottom: none;
      }
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
