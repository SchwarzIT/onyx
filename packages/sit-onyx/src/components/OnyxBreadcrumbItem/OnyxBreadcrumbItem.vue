<script lang="ts" setup>
import { useDensity } from "../../composables/density";
import OnyxRouterLink from "../OnyxRouterLink/OnyxRouterLink.vue";
import type { OnyxBreadcrumbItem } from "./types";

const props = defineProps<OnyxBreadcrumbItem>();
const { densityClass } = useDensity(props);
</script>

<template>
  <OnyxRouterLink
    :class="['onyx-component', 'onyx-breadcrumb-item', densityClass]"
    :href="props.link"
  >
    <div v-if="props.first" class="onyx-breadcrumb-item__separator">/</div>
    <div
      class="onyx-breadcrumb-item__label"
      :class="{ 'onyx-breadcrumb-item__label--active': props.last && props.link !== '/' }"
    >
      {{ props.label }}
    </div>
    <div v-if="!props.last" class="onyx-breadcrumb-item__separator">/</div>
  </OnyxRouterLink>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-breadcrumb-item {
  @include layers.component() {
    text-decoration: none;
    display: flex;
    color: var(--onyx-color-base-neutral-200);

    &__label {
      font-family: var(--onyx-font-family);
      padding-top: var(--onyx-density-3xs);
      padding-right: var(--onyx-density-xs);
      padding-bottom: var(--onyx-density-3xs);
      padding-left: var(--onyx-density-xs);
      height: 25px;
      line-height: 20px;
      border: 1px solid transparent;
      color: var(--onyx-color-text-icons-neutral-medium);

      &:hover {
        cursor: pointer;
        color: var(--onyx-color-text-icons-neutral-intense);
        background: var(--onyx-color-base-neutral-200);
        border: 1px solid #c9d6e0;
        border-radius: var(--onyx-radius-sm);
      }

      &--active {
        cursor: pointer;
        background: #bbeaed;
        border: 1px solid #c9d6e0;
        color: var(--onyx-color-text-icons-primary-bold);
        border-radius: var(--onyx-radius-sm);
      }
    }

    &__separator {
      font-size: 20px;
      padding-top: var(--onyx-density-3xs);
      padding-right: var(--onyx-density-xs);
      padding-bottom: var(--onyx-density-3xs);
      padding-left: var(--onyx-density-xs);
    }
  }
}
</style>
