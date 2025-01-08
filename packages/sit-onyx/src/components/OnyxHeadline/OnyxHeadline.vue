<script lang="ts" setup>
import { SKELETON_INJECTED_SYMBOL, useSkeletonContext } from "../../composables/useSkeletonState";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxHeadlineProps } from "./types";

const props = withDefaults(defineProps<OnyxHeadlineProps>(), {
  skeleton: SKELETON_INJECTED_SYMBOL,
});

defineSlots<{
  /**
   * Headline content.
   */
  default(): unknown;
}>();

const skeleton = useSkeletonContext(props);

const copyHash = async (hash: string) => {
  const { origin, pathname, search } = window.location;
  const fullUrl = `${origin}${pathname}${search}#${hash}`;
  await navigator.clipboard.writeText(fullUrl);
};
</script>

<template>
  <OnyxSkeleton
    v-if="skeleton"
    :class="['onyx-headline-skeleton', `onyx-headline-skeleton--${props.is}`]"
  />

  <component
    :is="props.is"
    v-else
    :id="props.hash"
    :class="['onyx-component', 'onyx-headline', `onyx-headline--${props.is}`]"
  >
    <a
      v-if="props.hash"
      :href="`#${props.hash}`"
      target="_self"
      class="onyx-headline__hash"
      @click="copyHash(props.hash)"
    >
      <slot />
    </a>

    <slot v-else />
  </component>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";
@use "../../styles/mixins/sizes";

.onyx-headline,
.onyx-headline-skeleton {
  @include layers.component() {
    @include sizes.define-headline-sizes();
  }
}

.onyx-headline {
  @include layers.component() {
    --onyx-headline-scroll-margin: var(--onyx-spacing-xl);
    --border-radius: var(--onyx-radius-sm);

    font-weight: 600;
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    position: relative;
    border-radius: var(--border-radius);
    scroll-margin-top: var(--onyx-headline-scroll-margin);

    &__hash {
      color: inherit;
      text-decoration: none;
      border-radius: 0 var(--border-radius) var(--border-radius) 0;
      outline: none;
      display: inline-block;

      &:hover,
      &:focus-visible {
        background-color: var(--onyx-color-base-neutral-200);
        padding-right: var(--onyx-density-xs);

        &::before {
          $width: 1.5rem;
          content: "#";
          position: absolute;
          width: $width;
          left: -$width;
          text-align: center;
          color: var(--onyx-color-text-icons-primary-intense);
          cursor: pointer;
          background-color: inherit;
          line-height: inherit;
          border-radius: var(--border-radius) 0 0 var(--border-radius);
        }
      }

      &:focus-visible {
        outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
        outline-offset: 0;

        &::before {
          // we apply the visual outline as box-shadow here instead of native outline because we need to cut off the right side
          box-shadow: 0 0 0 var(--onyx-outline-width) var(--onyx-color-component-focus-primary);

          // remove right box shadow since its applied by the parent outline
          $offset: calc(-1 * var(--onyx-outline-width));
          clip-path: inset($offset 0 $offset $offset);
        }
      }
    }
  }

  &-skeleton {
    height: 1lh;
    width: 10rem;
    max-width: 100%;
  }
}
</style>
