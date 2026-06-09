<script lang="ts" setup>
import { createTreeView } from "@sit-onyx/headless";
import { provide } from "vue";
import { useDensity } from "../../composables/density.js";
import { TREE_DEPTH_INJECTION_KEY, type OnyxTreeViewProps } from "./types.js";

const props = defineProps<OnyxTreeViewProps>();
defineSlots<{
  /**
   * TreeView content.
   */
  default(): unknown;
}>();

const { densityClass } = useDensity(props);

const {
  elements: { tree },
} = createTreeView({
  label: () => props.label,
});

provide(TREE_DEPTH_INJECTION_KEY, 0);
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
