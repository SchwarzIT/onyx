import fs from "node:fs/promises";

/**
 * Transforms the given icon SVG to a vue single-file-component.
 */
export async function transformSvgToVueSfc(iconName: string, content: string) {
  return `<!-- eslint-disable -->
<script lang="ts" setup>
defineProps<{
  size?: number;
  color?: string;
}>();
</script>

<!-- eslint-disable -->
<template>${content}</template>`;
}

/**
 * Create the given directory if it does not exist or clears it if it exists.
 */
export async function createOrClearDirectory(path: string) {
  try {
    const stats = await fs.stat(path);
    if (stats.isDirectory()) await fs.rm(path, { recursive: true });
  } catch {
    // noop, directory does not exist
  }

  await fs.mkdir(path, { recursive: true });
}

/**
 * Converts the given value to pascal case.
 *
 * @see https://stackoverflow.com/a/53952925
 */
export function toPascalCase(value: string): string {
  return value
    .toLowerCase()
    .replace(new RegExp(/[-_]+/, "g"), " ")
    .replace(new RegExp(/[^\w\s]/, "g"), "")
    .replace(new RegExp(/\s+(.)(\w*)/, "g"), ($1, $2, $3) => `${$2.toUpperCase() + $3}`)
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());
}
