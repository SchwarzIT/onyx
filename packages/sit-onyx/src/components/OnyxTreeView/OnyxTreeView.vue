<script lang="ts" setup>
import { provide } from "vue";
import { useDensity } from "../../composables/density.js";
import type { OnyxTreeViewProps } from "./types.js";

const props = defineProps<OnyxTreeViewProps>();
defineSlots<{
  /**
   * TreeView content.
   */
  default(): unknown;
}>();
const { densityClass } = useDensity(props);

provide("onyx-tree-depth", 0);
</script>

<template>
  <ul
    :class="['onyx-component', 'onyx-tree-view', densityClass]"
    role="tree"
    aria-label="Tree Structure"
  >
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
