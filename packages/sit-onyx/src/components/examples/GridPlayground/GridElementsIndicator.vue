<script lang="ts" setup>
import { computed } from "vue";

export type GridSettings = {
  marginSize: string;
  gutterSize: string;
  gridTemplateColumns: string;
  maxWidth?: string;
  isCentered?: boolean;
};
const props = defineProps<{ settings: GridSettings }>();
const columns = computed(() => props.settings.gridTemplateColumns.split(" ").length);

const visualMaxWidth = props.settings.isCentered ? "" : props.settings.maxWidth;
const visualColumns = computed(() => columns.value + columns.value - 1);
const marginLabel = computed(() =>
  props.settings.isCentered ? "auto margin" : `${props.settings.marginSize} margin`,
);
const gridConfig = computed(() => {
  const margin = props.settings.isCentered ? "1fr" : props.settings.marginSize;
  return [
    margin,
    props.settings.gridTemplateColumns.split(" ").join(` ${props.settings.gutterSize} `),
    margin,
  ].join(" ");
});
</script>

<template>
  <div
    :class="{
      'onyx-grid-playground-indicator': true,
      'onyx-grid-playground-indicator--centered': props.settings.isCentered,
    }"
    :style="{
      maxWidth: visualMaxWidth,
      gridTemplateColumns: gridConfig,
    }"
  >
    <div
      class="onyx-grid-playground-indicator__element onyx-grid-playground-indicator__margin"
      :title="marginLabel"
    >
      {{ marginLabel }}
    </div>
    <template v-for="i in visualColumns" :key="i">
      <div
        v-if="i % 2 === 0"
        class="onyx-grid-playground-indicator__element onyx-grid-playground-indicator__gutter"
        :style="{ width: props.settings.gutterSize }"
        :title="`${props.settings.gutterSize} gutter`"
      >
        {{ `${props.settings.gutterSize} gutter` }}
      </div>
      <div
        v-else
        class="onyx-grid-playground-indicator__element onyx-grid-playground-indicator__column"
        title="column"
      >
        auto column
      </div>
    </template>
    <div
      class="onyx-grid-playground-indicator__element onyx-grid-playground-indicator__margin"
      :title="marginLabel"
    >
      {{ marginLabel }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.onyx-grid-playground-indicator {
  display: grid;
  color: var(--onyx-color-text-icons-neutral-inverted);

  &__element {
    color: var(--onyx-color-text-icons-neutral-inverted);
    writing-mode: vertical-rl;
    text-orientation: mixed;
    padding: 0.5rem 0;

    display: flex;
    justify-content: center;
  }

  &__margin {
    background-color: var(--onyx-color-base-quantitatives-200);
  }
  &__gutter {
    background-color: var(--onyx-color-base-quantitatives-1100);
  }
  &__column {
    background-color: var(--onyx-color-base-quantitatives-400);
    flex-grow: 1;
  }
}
</style>
