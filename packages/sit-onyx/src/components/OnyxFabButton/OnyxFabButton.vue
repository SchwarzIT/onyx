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
    <template v-if="!props.hideLabel">{{ props.label }}</template>
  </ButtonOrLinkLayout>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-fab-button {
  @include layers.component() {
    font-family: var(--onyx-font-family);
    background: var(--onyx-color-base-neutral-800);
    border: none;
    cursor: pointer;
    color: var(--onyx-color-text-icons-neutral-inverted);
    padding: var(--onyx-density-md);

    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: var(--onyx-density-xs);
    border-radius: var(--onyx-radius-full);
    box-shadow: var(--onyx-shadow-soft-bottom);
    width: max-content;
    max-width: 100%;

    &:hover {
      background: var(--onyx-color-base-neutral-500);
    }

    &:focus-visible {
      outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
    }
  }
}
</style>
