<script lang="ts" setup>
import { computed } from "vue";
import type { GridElementSettings } from "./GridPlayground.vue";

const props = defineProps<{ settings: GridElementSettings; selected?: boolean }>();

const gridElementClasses = computed(() =>
  props.settings
    .map((props) =>
      ["onyx", "grid", props.breakpoint, "span", `${props.spans}`].filter(Boolean).join("-"),
    )
    .join(" "),
);
</script>

<template>
  <button
    :class="{
      'onyx-grid-playground-element': true,
      'onyx-grid-playground-element--selected': props.selected,
      [gridElementClasses]: true,
    }"
    type="button"
  >
    <span v-for="(setting, i) in settings" :key="i">
      {{ setting.breakpoint }}
      {{ setting.spans }}
    </span>
  </button>
</template>

<style lang="scss">
.onyx-grid-playground-element {
  height: 100px;
  border: 0.125rem dashed var(--onyx-color-base-primary-500);
  background-color: var(--onyx-color-base-primary-200);
  border-radius: var(--onyx-radius-sm);
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--onyx-color-text-icons-neutral-intense);

  &:hover {
    background-color: var(--onyx-color-base-primary-500);
    color: var(--onyx-color-text-icons-neutral-inverted);
  }

  &--selected {
    border-style: solid;
    background-color: var(--onyx-color-base-primary-400);
    border-color: var(--onyx-color-base-primary-500);
    color: var(--onyx-color-text-icons-neutral-inverted);
  }
}
</style>
