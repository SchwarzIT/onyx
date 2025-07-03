<script lang="ts" setup>
import { useDensity } from "../../composables/density";
import ButtonOrLinkLayout from "../OnyxButton/ButtonOrLinkLayout.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxFabButtonProps } from "./types";

const props = defineProps<OnyxFabButtonProps>();

const { densityClass } = useDensity(props);
</script>

<template>
  <ButtonOrLinkLayout
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

.onyx-fab-button {
  @include layers.component() {
    --onyx-fab-button-background: var(--onyx-color-base-neutral-800);
    --onyx-fab-button-background-hover: var(--onyx-color-base-neutral-500);
    --onyx-fab-button-padding: var(--onyx-density-md);
    --onyx-fab-button-gap: var(--onyx-density-xs);

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
    box-shadow: var(--onyx-shadow-soft-bottom);
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
