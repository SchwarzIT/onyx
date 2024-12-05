<script lang="ts" setup>
import { computed } from "vue";
import { escapeGridAreaName } from "./utils";

defineSlots<{
  default: () => unknown;
}>();

const props = defineProps<{
  /**
   * Test name. Will be displayed above the matrix screenshot and be used as filename.
   */
  name: string;
  /**
   * Matrix columns. Must not contain spaces.
   */
  columns: readonly string[];
  /**
   * Matrix rows. Must not contain spaces.
   */
  rows: readonly string[];
  /**
   * Current Playwright browser name.
   */
  browserName: string;
}>();

/**
 * CSS "grid-template-areas" for the current columns and rows.
 * Every grid element must have the "grid-area" set to `{row}-{column}` to place it correctly.
 */
const gridTemplateAreas = computed(() => {
  const lines: string[] = [
    `"blank ${props.columns.map((col) => `column-${escapeGridAreaName(col)}`).join(" ")}"`,
  ];

  props.rows.forEach((row) => {
    lines.push(
      `"row-${escapeGridAreaName(row)} ${props.columns.map((col) => `${escapeGridAreaName(row)}-${escapeGridAreaName(col)}`).join(" ")}"`,
    );
  });

  return lines.join("\n");
});
</script>

<template>
  <div class="wrapper">
    <div class="meta">
      <h1 class="meta__name">Screenshot test: {{ props.name }}</h1>
      <div>Browser: {{ props.browserName }}</div>
    </div>

    <div
      class="grid"
      :style="{
        gridTemplateColumns: `auto repeat(${props.columns.length}, 1fr)`,
        gridTemplateAreas,
      }"
    >
      <div
        v-for="column of props.columns"
        :key="column"
        class="grid__label"
        :style="{ gridArea: `column-${escapeGridAreaName(column)}` }"
      >
        {{ column }}
      </div>

      <div
        v-for="row of props.rows"
        :key="row"
        class="grid__label"
        :style="{ gridArea: `row-${escapeGridAreaName(row)}` }"
      >
        {{ row }}
      </div>

      <!-- blank / placeholder element for the first column/row to align the matrix correctly -->
      <div class="grid__blank"></div>

      <slot></slot>
    </div>
  </div>
</template>

<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style lang="scss" scoped>
.wrapper {
  width: max-content;
}

.meta {
  font-family: Arial, sans-serif;
  margin-bottom: 2rem;

  &__name {
    font-size: 1.25rem;
    line-height: 1.75rem;
    margin: 0;
  }
}

.grid {
  font-family: Arial, sans-serif;
  display: grid;
  gap: 2rem;
  grid-template-rows: auto;
  width: max-content;

  align-items: center;
  justify-content: center;

  &__label {
    text-align: center;
  }
  &__blank {
    grid-area: blank;
  }
}
</style>
