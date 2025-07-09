<script lang="ts" setup>
import { computed } from "vue";
import { useDensity } from "../../../../composables/density.js";
import { useLink } from "../../../../composables/useLink.js";
import { extractLinkProps } from "../../../../utils/router.js";
import OnyxRouterLink from "../../../OnyxRouterLink/OnyxRouterLink.vue";
import type { OnyxSidebarItemProps } from "./types.js";

const props = withDefaults(defineProps<OnyxSidebarItemProps>(), {
  active: "auto",
});

defineSlots<{
  /**
   * Content of the sidebar item.
   */
  default(): unknown;
}>();

const { densityClass } = useDensity(props);
const { isActive } = useLink();

const active = computed(() => {
  if (typeof props.active === "boolean") return props.active;
  return isActive.value(props.link);
});

const link = computed(() => (props.link ? extractLinkProps(props.link) : undefined));

const classes = computed(() => [
  "onyx-component",
  "onyx-sidebar-item",
  densityClass.value,
  active.value ? "onyx-sidebar-item--active" : "",
]);
</script>

<template>
  <OnyxRouterLink v-if="link" :class="classes" v-bind="link">
    <slot></slot>
  </OnyxRouterLink>

  <button v-else :class="classes" type="button">
    <slot></slot>
  </button>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers.scss";

.onyx-sidebar-item {
  @include layers.component() {
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    background-color: var(--onyx-color-base-background-blank);
    border-radius: var(--onyx-radius-md);
    padding: var(--onyx-density-xs);
    display: flex;
    align-items: center;
    gap: var(--onyx-density-xs);
    max-width: 100%;
    cursor: pointer;

    &:is(button) {
      border: none;
    }

    &:hover {
      background-color: var(--onyx-color-base-neutral-200);
    }

    &:focus-visible {
      outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
    }

    &--active {
      color: var(--onyx-color-text-icons-primary-bold);
      background-color: var(--onyx-color-base-primary-100);

      &:hover {
        background-color: var(--onyx-color-base-primary-200);
      }
    }
  }
}
</style>
