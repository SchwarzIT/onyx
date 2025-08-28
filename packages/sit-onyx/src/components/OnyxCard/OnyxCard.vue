<script lang="ts" setup>
import { computed } from "vue";
import { useDensity } from "../../composables/density.js";
import { extractLinkProps } from "../../utils/router.js";
import OnyxRouterLink from "../OnyxRouterLink/OnyxRouterLink.vue";
import type { OnyxCardProps } from "./types.js";

const props = withDefaults(defineProps<OnyxCardProps>(), {
  clickable: false,
});

defineSlots<{
  /**
   * Card content.
   */
  default(): unknown;
}>();

const { densityClass } = useDensity(props);

const linkProps = computed(() =>
  props.link != undefined ? extractLinkProps(props.link) : undefined,
);
</script>

<template>
  <component
    :is="linkProps ? OnyxRouterLink : props.clickable ? 'button' : 'div'"
    v-bind="linkProps"
    :class="['onyx-component', 'onyx-card', densityClass, 'onyx-truncation-multiline', 'onyx-text']"
  >
    <slot></slot>
  </component>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-card {
  @include layers.component() {
    --onyx-card-padding: var(--onyx-density-md);
    --onyx-card-gap: var(--onyx-density-xs);

    display: flex;
    flex-direction: column;
    padding: var(--onyx-card-padding);
    gap: var(--onyx-card-gap);
    border-radius: var(--onyx-radius-md);
    border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
    background-color: var(--onyx-color-base-background-blank);
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    max-width: 100%;

    &:is(button, a) {
      cursor: pointer;
      text-align: initial;

      &:focus-visible {
        border-color: var(--onyx-color-component-focus-primary);
        outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
      }
    }
  }
}
</style>
