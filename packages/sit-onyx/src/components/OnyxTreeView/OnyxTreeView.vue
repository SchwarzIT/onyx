<script lang="ts" setup>
import { createTreeView } from "@sit-onyx/headless";
import { provide, toRef } from "vue";
import { useDensity } from "../../composables/density.js";
import { TREE_VIEW_INJECTION_KEY, type OnyxTreeViewProps } from "./types.js";

const props = defineProps<OnyxTreeViewProps>();

defineSlots<{
  /**
   * Tree view items. Recommended to use the `OnyxTreeViewItem` component here.
   */
  default(): unknown;
}>();

const { densityClass } = useDensity(props);

const {
  elements: { tree },
} = createTreeView({
  label: toRef(() => props.label),
});

provide(TREE_VIEW_INJECTION_KEY, { level: 0 });
</script>

<template>
  <ul v-bind="tree" :class="['onyx-component', 'onyx-tree-view', densityClass]">
    <slot></slot>
  </ul>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-tree-view {
  @include layers.component() {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0;
  }
}
</style>
