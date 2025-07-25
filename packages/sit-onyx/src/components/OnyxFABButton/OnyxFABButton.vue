<script lang="ts" setup>
import { useDensity } from "../../composables/density.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import ButtonOrLinkLayout from "../OnyxButton/ButtonOrLinkLayout.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxFABButtonProps } from "./types.js";

const props = withDefaults(defineProps<OnyxFABButtonProps>(), {
  skeleton: SKELETON_INJECTED_SYMBOL,
});

const { densityClass } = useDensity(props);
const skeleton = useSkeletonContext(props);
</script>

<template>
  <OnyxSkeleton v-if="skeleton" :class="['onyx-fab-button-skeleton', densityClass]" />

  <ButtonOrLinkLayout
    v-else
    :class="['onyx-component', 'onyx-fab-button', densityClass, 'onyx-text']"
    :title="props.hideLabel ? props.label : undefined"
    :aria-label="props.label"
    :link="props.link"
  >
    <OnyxIcon v-if="props.icon" :icon="props.icon" />
    <span v-if="!props.hideLabel" class="onyx-fab-button__label">{{ props.label }}</span>
  </ButtonOrLinkLayout>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-fab-button,
.onyx-fab-button-skeleton {
  @include layers.component() {
    --onyx-fab-button-background: var(--onyx-color-base-neutral-800);
    --onyx-fab-button-background-hover: var(--onyx-color-base-neutral-500);
    --onyx-fab-button-padding: var(--onyx-density-md);
    --onyx-fab-button-gap: var(--onyx-density-xs);
    box-shadow: var(--onyx-shadow-soft-bottom);
  }
}

.onyx-fab-button-skeleton {
  @include layers.component() {
    width: calc(1.5rem + 2 * var(--onyx-fab-button-padding));
    height: calc(1.5rem + 2 * var(--onyx-fab-button-padding));
    border-radius: var(--onyx-radius-full);
  }
}

.onyx-fab-button {
  @include layers.component() {
    font-family: var(--onyx-font-family);
    background: var(--onyx-fab-button-background);
    border: none;
    cursor: pointer;
    color: var(--onyx-color-text-icons-neutral-inverted);

    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: var(--onyx-fab-button-gap);
    border-radius: var(--onyx-radius-full);
    width: max-content;
    max-width: 100%;
    padding: var(--onyx-fab-button-padding);

    &:hover {
      background: var(--onyx-fab-button-background-hover);
    }

    &:focus-visible {
      background: var(--onyx-fab-button-background);
      outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
    }
  }
}
</style>
