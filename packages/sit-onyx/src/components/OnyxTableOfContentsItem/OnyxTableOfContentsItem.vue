<script lang="ts" setup>
import { computed } from "vue";
import { useDensity } from "../../composables/density.js";
import { extractLinkProps } from "../../utils/router.js";
import OnyxRouterLink from "../OnyxRouterLink/OnyxRouterLink.vue";
import type { OnyxTableOfContentsItemProps } from "./types.js";

const props = withDefaults(defineProps<OnyxTableOfContentsItemProps>(), {
  active: "auto",
  level: 1,
});

const { densityClass } = useDensity(props);

const link = computed(() => extractLinkProps(props.link));
</script>

<template>
  <li
    :class="[
      'onyx-component',
      'onyx-toc-item',
      densityClass,
      'onyx-text',
      { [`onyx-toc-item--${props.level}`]: props.level > 1 },
    ]"
  >
    <OnyxRouterLink
      :class="[
        'onyx-toc-item__link',
        'onyx-truncation-ellipsis',
        { 'onyx-router-link--active': props.active !== 'auto' && props.active },
      ]"
      :href="link.href"
      :target="link.target"
    >
      {{ props.label }}
    </OnyxRouterLink>
  </li>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-toc-item {
  @include layers.component() {
    --onyx-toc-item-background-hover: var(--onyx-color-base-neutral-200);
    --onyx-toc-item-background-focus: transparent;
    --onyx-toc-item-color: var(--onyx-color-text-icons-neutral-medium);
    --onyx-toc-item-color-hover: var(--onyx-color-text-icons-neutral-intense);
    --onyx-toc-item-color-outline: var(--onyx-color-component-focus-neutral);
    --onyx-toc-item-indicator-color: var(--onyx-color-component-border-neutral);
    --onyx-toc-item-indicator-width: var(--onyx-1px-in-rem);
    --onyx-toc-item-indentation: var(--onyx-density-xs);
    list-style: none;
    position: relative;

    &__link {
      display: block;
      padding: var(--onyx-density-2xs) var(--onyx-density-xs);
      border-radius: var(--onyx-radius-sm);
      font-family: var(--onyx-font-family-paragraph);
      color: var(--onyx-toc-item-color);

      &:hover {
        background-color: var(--onyx-toc-item-background-hover);
        color: var(--onyx-toc-item-color-hover);
      }

      &:focus-visible {
        background-color: var(--onyx-toc-item-background-focus);
        color: var(--onyx-toc-item-color-hover);
        outline: var(--onyx-outline-width) solid var(--onyx-toc-item-color-outline);
      }

      &.onyx-router-link--active {
        --onyx-toc-item-background-hover: var(--onyx-color-base-primary-100);
        --onyx-toc-item-background-focus: var(--onyx-toc-item-background-hover);
        --onyx-toc-item-color: var(--onyx-color-text-icons-primary-intense);
        --onyx-toc-item-color-hover: var(--onyx-color-text-icons-primary-bold);
        --onyx-toc-item-color-outline: var(--onyx-color-component-focus-primary);
        --onyx-toc-item-indicator-color: var(--onyx-color-component-border-primary);
        font-family: var(--onyx-font-family-h3);
        font-weight: var(--onyx-font-weight-semibold);
      }
    }

    &--2 {
      .onyx-toc-item__link {
        padding-left: calc(var(--onyx-density-xs) + var(--onyx-toc-item-indentation));

        &::before {
          content: "";
          width: var(--onyx-toc-item-indicator-width);
          height: calc(100% + var(--onyx-toc-list-gap, 0rem));
          background-color: var(--onyx-toc-item-indicator-color);
          display: block;
          position: absolute;
          left: calc(
            var(--onyx-toc-item-indicator-width) + var(--onyx-1px-in-rem) +
              var(--onyx-toc-item-indentation)
          );
          top: calc(-0.5 * var(--onyx-toc-list-gap, 0rem));
        }
      }
    }
  }
}
</style>
