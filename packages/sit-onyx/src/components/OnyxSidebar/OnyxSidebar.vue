<script lang="ts" setup>
import { useDensity } from "../../composables/density";
import OnyxDrawer from "../OnyxDrawer/OnyxDrawer.vue";
import type { OnyxSidebarProps } from "./types";

const props = defineProps<OnyxSidebarProps>();

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
</script>

<template>
  <aside
    v-if="!props.drawer"
    :class="['onyx-component', 'onyx-sidebar', densityClass]"
    :aria-label="props.label"
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
  </aside>

  <OnyxDrawer
    v-else
    class="onyx-sidebar"
    v-bind="props.drawer"
    :label="props.label"
    :density="props.density"
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
  </OnyxDrawer>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-sidebar {
  @include layers.component() {
    --onyx-sidebar-border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
    --onyx-sidebar-padding: var(--onyx-density-md);
    --onyx-sidebar-width: 20rem;
    --onyx-sidebar-header-gap: var(--onyx-density-md);
    --onyx-sidebar-footer-gap: var(--onyx-density-xs);
    width: var(--onyx-sidebar-width);

    &:not(:is(.onyx-drawer)) {
      font-family: var(--onyx-font-family);
      color: var(--onyx-color-text-icons-neutral-intense);
      background-color: var(--onyx-color-base-background-blank);
      border-right: var(--onyx-sidebar-border);
      max-width: 100%;
      height: 100%;
      max-height: 100%;
      display: flex;
      flex-direction: column;
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
