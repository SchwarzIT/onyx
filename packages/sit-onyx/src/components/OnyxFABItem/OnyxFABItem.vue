<script lang="ts" setup>
import { createMenuItems } from "@sit-onyx/headless";
import { useDensity } from "../../composables/density.js";
import { mergeVueProps } from "../../utils/attrs.js";
import OnyxFABButton from "../OnyxFABButton/OnyxFABButton.vue";
import type { OnyxFABItemProps } from "./types.js";

const props = defineProps<OnyxFABItemProps>();

const { densityClass } = useDensity(props);

const {
  elements: { listItem, menuItem },
} = createMenuItems();
</script>

<template>
  <li :class="['onyx-component', 'onyx-fab-item', densityClass]" v-bind="listItem">
    <OnyxFABButton v-bind="mergeVueProps(menuItem({}), props)" :label="props.label" />
  </li>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-fab-item {
  @include layers.component() {
    list-style: none;

    .onyx-fab-button {
      --onyx-fab-button-background: var(--onyx-color-base-neutral-600);
      --onyx-fab-button-background-hover: var(--onyx-color-base-neutral-800);
      --onyx-fab-button-padding: var(--onyx-density-xs);
      --onyx-fab-button-gap: var(--onyx-density-2xs);
    }
  }
}
</style>
