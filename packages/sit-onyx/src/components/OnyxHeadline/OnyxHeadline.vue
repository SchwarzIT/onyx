<script lang="ts" setup>
import type { OnyxHeadlineProps } from "./types";

const props = defineProps<OnyxHeadlineProps>();

defineSlots<{
  /**
   * Headline content.
   */
  default(): unknown;
}>();

const copyTarget = async (target: string) => {
  const { origin, pathname, search } = window.location;
  const fullUrl = `${origin}${pathname}${search}#${target}`;
  await navigator.clipboard.writeText(fullUrl);
};
</script>

<template>
  <component
    :is="props.is"
    :id="props.target"
    :class="['onyx-component', 'onyx-headline', `onyx-headline--${props.is}`]"
  >
    <a
      v-if="props.target"
      :href="`#${props.target}`"
      target="_self"
      class="onyx-headline__target"
      @click="copyTarget(props.target)"
    >
      <slot />
    </a>

    <slot v-else />
  </component>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";
@use "../../styles/mixins/sizes";

.onyx-headline {
  @include layers.component() {
    --border-radius: var(--onyx-radius-sm);

    font-weight: 600;
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    position: relative;
    width: max-content;
    border-radius: var(--border-radius);

    @include sizes.define-headline-sizes();

    &__target {
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
}
</style>
