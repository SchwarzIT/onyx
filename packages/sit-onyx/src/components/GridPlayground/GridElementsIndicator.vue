<script lang="ts" setup>
import { computed } from "vue";

export type GridSettings = {
  marginSize: string;
  gutterSize: string;
  columns: number;
};
const props = defineProps<{ settings: GridSettings }>();
const visualColumns = computed(() => 2 + props.settings.columns + props.settings.columns - 1);
</script>

<template>
  <div class="onyx-grid-playground-indicator">
    <template v-for="i in visualColumns" :key="i">
      <div
        v-if="i === 1 || i === visualColumns"
        class="onyx-grid-playground-indicator__margin"
        :style="{ width: props.settings.marginSize }"
        :title="`margin - ${props.settings.marginSize}`"
      >
        {{ props.settings.marginSize }}
      </div>
      <div
        v-else-if="i % 2 === 1"
        class="onyx-grid-playground-indicator__gutter"
        :style="{ width: props.settings.gutterSize }"
        :title="`gutter - ${props.settings.gutterSize}`"
      >
        {{ props.settings.gutterSize }}
      </div>
      <div v-else class="onyx-grid-playground-indicator__column" title="column"></div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.onyx-grid-playground-indicator {
  display: flex;
  max-width: 100%;
  color: var(--onyx-color-text-neutral-inverted);

  &__margin {
    height: 1rem;
    background-color: var(--onyx-color-base-quantitatives-200);
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
  &__gutter {
    height: 1rem;
    background-color: var(--onyx-color-base-quantitatives-1100);
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
  &__column {
    height: 1rem;
    background-color: var(--onyx-color-base-quantitatives-400);
    flex-grow: 1;
  }
}
</style>
