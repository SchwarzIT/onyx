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

const gridLabelStyles = {
  textAlign: "center",
} as const;
</script>

<template>
  <!-- eslint-disable vue/no-static-inline-styles -->
  <div :style="{ width: 'max-content', fontFamily: 'Arial, sans-serif' }">
    <div :style="{ marginBottom: '2rem' }">
      <h1 :style="{ fontSize: '1.25rem', lineHeight: '1.75rem', margin: '0' }">
        Screenshot test: {{ props.name }}
      </h1>
      <div>Browser: {{ props.browserName }}</div>
    </div>

    <div
      :style="{
        display: 'grid',
        gap: '2rem',
        gridTemplateRows: 'auto',
        width: 'max-content',
        alignItems: 'center',
        justifyContent: 'center',
        gridTemplateColumns: `auto repeat(${props.columns.length}, 1fr)`,
        gridTemplateAreas,
      }"
    >
      <div
        v-for="column of props.columns"
        :key="column"
        :style="{ ...gridLabelStyles, gridArea: `column-${escapeGridAreaName(column)}` }"
      >
        {{ column }}
      </div>

      <div
        v-for="row of props.rows"
        :key="row"
        :style="{ ...gridLabelStyles, gridArea: `row-${escapeGridAreaName(row)}` }"
      >
        {{ row }}
      </div>

      <!-- blank / placeholder element for the first column/row to align the matrix correctly -->
      <div :style="{ gridArea: 'blank' }"></div>

      <slot></slot>
    </div>
  </div>
</template>
