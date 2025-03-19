<script lang="ts" setup>
import { computed } from "vue";
import { useDensity } from "../../composables/density";
import { useLink } from "../../composables/useLink";
import OnyxRouterLink from "../OnyxRouterLink/OnyxRouterLink.vue";
import type { OnyxBreadcrumbItemProps } from "./types";

const props = withDefaults(defineProps<OnyxBreadcrumbItemProps>(), {
  active: "auto",
});

defineSlots<{
  /**
   * Item content / page name.
   */
  default(): unknown;
}>();

const { densityClass } = useDensity(props);
const { currentRoute } = useLink();

const isActive = computed(() => {
  return props.active === "auto" ? props.href === currentRoute.value?.path : props.active;
});
</script>

<template>
  <li
    :class="[
      'onyx-component',
      'onyx-breadcrumb-item',
      'onyx-text--small',
      densityClass,
      isActive ? 'onyx-breadcrumb-item--active' : '',
    ]"
  >
    <OnyxRouterLink
      class="onyx-breadcrumb-item__link"
      :href="props.href"
      :aria-current="isActive ? 'page' : undefined"
    >
      <slot></slot>
    </OnyxRouterLink>
  </li>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-breadcrumb-item {
  @include layers.component() {
    --onyx-breadcrumb-item-color: var(--onyx-color-text-icons-neutral-medium);
    --onyx-breadcrumb-item-color-hover: var(--onyx-color-text-icons-neutral-intense);
    --onyx-breadcrumb-item-background: transparent;
    --onyx-breadcrumb-item-background-hover: var(--onyx-color-base-neutral-200);
    --onyx-breadcrumb-item-outline-color: var(--onyx-color-component-focus-neutral);
    --onyx-breadcrumb-item-padding: var(--onyx-density-3xs) var(--onyx-density-xs);
    list-style: none;
    font-family: var(--onyx-font-family);
    color: var(--onyx-breadcrumb-item-color);
    background-color: var(--onyx-breadcrumb-item-background);
    display: inline-flex;
    justify-content: center;
    align-items: center;

    &__link {
      display: inherit;
      justify-content: inherit;
      align-items: inherit;
      gap: var(--onyx-density-3xs);
      padding: var(--onyx-breadcrumb-item-padding);
      border-radius: var(--onyx-radius-sm);

      &:hover {
        color: var(--onyx-breadcrumb-item-color-hover);
        background-color: var(--onyx-breadcrumb-item-background-hover);
      }

      &:focus-visible {
        outline: var(--onyx-outline-width) solid var(--onyx-breadcrumb-item-outline-color);
      }
    }

    &--active {
      --onyx-breadcrumb-item-color: var(--onyx-color-text-icons-primary-intense);
      --onyx-breadcrumb-item-color-hover: var(--onyx-color-text-icons-primary-bold);
      --onyx-breadcrumb-item-background-hover: var(--onyx-color-base-primary-200);
      --onyx-breadcrumb-item-outline-color: var(--onyx-color-component-focus-primary);
    }

    &:has(.onyx-icon:only-child) {
      --onyx-breadcrumb-item-padding: var(--onyx-density-2xs);
    }
  }
}
</style>
