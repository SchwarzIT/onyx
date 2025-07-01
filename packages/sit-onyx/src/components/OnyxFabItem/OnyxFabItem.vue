<script lang="ts" setup>
import { useDensity } from "../../composables/density";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxMenuItem from "../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
import type { OnyxFabItemProps } from "./types";

const props = defineProps<OnyxFabItemProps>();

const { densityClass } = useDensity(props);
</script>

<template>
  <OnyxMenuItem
    :class="['onyx-fab-item', densityClass]"
    :aria-label="props.hideLabel ? props.label : undefined"
    :title="props.hideLabel ? props.label : undefined"
    :link="props.link"
  >
    <OnyxIcon v-if="props.icon" :icon="props.icon" />
    <template v-if="!props.hideLabel"> {{ props.label }}</template>
  </OnyxMenuItem>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-fab-item {
  @include layers.component() {
    --onyx-menu-item-gap: var(--onyx-density-2xs);
    --onyx-list-item-padding: var(--onyx-density-xs);

    --onyx-list-item-color: var(--onyx-color-text-icons-neutral-inverted);
    --onyx-list-item-background: var(--onyx-color-base-neutral-600);
    --onyx-list-item-background-hover: var(--onyx-color-base-neutral-800);
    border-radius: var(--onyx-radius-full);
    width: max-content;
    max-width: 100%;

    .onyx-menu-item__trigger:focus-visible {
      background-color: var(--onyx-color-base-neutral-600);
      outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
    }
  }
}
</style>
