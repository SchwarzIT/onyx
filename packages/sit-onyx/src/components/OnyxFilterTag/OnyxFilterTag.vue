<script lang="ts" setup>
import xSmall from "@sit-onyx/icons/x-small.svg?raw";
import { SKELETON_INJECTED_SYMBOL, useSkeletonContext } from "../../composables/useSkeletonState";
import OnyxTag from "../OnyxTag/OnyxTag.vue";
import type { OnyxTagProps } from "../OnyxTag/types";

const props = withDefaults(
  defineProps<Omit<OnyxTagProps, "color" | "icon" | "interactiveIcon">>(),
  {
    skeleton: SKELETON_INJECTED_SYMBOL,
  },
);
const skeleton = useSkeletonContext(props);
</script>

<template>
  <OnyxTag
    v-bind="props"
    :interactive-icon="xSmall"
    class="onyx-tag--filter"
    :skeleton="skeleton"
  />
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-tag--filter {
  @include layers.component() {
    --onyx-tag-background-color: var(--onyx-color-base-neutral-600);
    border: none;
    --onyx-tag-color: var(--onyx-color-text-icons-neutral-inverted);
    --onyx-tag-hover-background-color: var(--onyx-color-base-neutral-900);
    --onyx-tag-focus-color: var(--onyx-color-component-focus-neutral);
    --onyx-tag-focus-background-color: var(--onyx-color-base-neutral-600);
  }
}
</style>
