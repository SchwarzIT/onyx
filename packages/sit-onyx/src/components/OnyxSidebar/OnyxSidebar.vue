<script lang="ts" setup>
import { computed, ref, useTemplateRef } from "vue";
import { useDensity } from "../../composables/density.js";
import OnyxModalDialog from "../OnyxModalDialog/OnyxModalDialog.vue";
import OnyxResizeHandle from "../OnyxResizeHandle/OnyxResizeHandle.vue";
import type { OnyxSidebarProps } from "./types.js";

const props = withDefaults(defineProps<OnyxSidebarProps>(), {
  alignment: "left",
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
   * Description slot of the `OnyxDrawer`. Only available if the `drawer` property is set.
   */
  description?(): unknown;
}>();

const { densityClass } = useDensity(props);

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
</script>

<template>
  <aside
    v-if="!props.temporary"
    ref="sidebarRef"
    :class="[
      'onyx-component',
      'onyx-sidebar',
      'onyx-grid-container',
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

  <OnyxModalDialog
    v-else
    ref="modalRef"
    v-bind="props.temporary"
    :class="[
      'onyx-sidebar',
      'onyx-sidebar--temporary',
      props.alignment === 'right' ? 'onyx-sidebar--right' : '',
      props.temporary.floating ? 'onyx-sidebar--floating' : '',
    ]"
    :label="props.label"
    :density="props.density"
    :style="widthStyle"
    :alignment="props.alignment"
    @close="emit('close')"
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
  </OnyxModalDialog>
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
      --onyx-modal-dialog-padding-inline: var(--onyx-density-md);

      &:not(.onyx-sidebar--floating) {
        --onyx-dialog-screen-gap: 0;
        --onyx-dialog-border-radius: 0;
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
