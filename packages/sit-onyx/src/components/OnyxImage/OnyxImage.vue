<script lang="ts" setup>
import type { OnyxImageProps } from "./types";

const props = withDefaults(defineProps<OnyxImageProps>(), {
  loading: "lazy",
});
</script>

<template>
  <figure :class="['onyx-component', 'onyx-image', `onyx-image--${props.shape}`]">
    <img class="onyx-image__content" v-bind="props" :alt="props.alt" />
  </figure>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-image {
  @include layers.component() {
    --onyx-image-clip-size: min(var(--onyx-spacing-3xl), 25%);
    display: inline-flex;
    background-color: var(--onyx-color-base-neutral-200);

    &--rounded {
      border-radius: var(--onyx-radius-sm);
    }

    &--circle {
      border-radius: var(--onyx-radius-full);
    }

    &--clip {
      // see: https://bennettfeely.com/clippy/
      clip-path: polygon(
        var(--onyx-image-clip-size) 0,
        100% 0,
        100% calc(100% - var(--onyx-image-clip-size)),
        calc(100% - var(--onyx-image-clip-size)) 100%,
        0 100%,
        0 var(--onyx-image-clip-size)
      );
    }

    &--clip-inverted {
      // see: https://bennettfeely.com/clippy/
      clip-path: polygon(
        0 0,
        calc(100% - var(--onyx-image-clip-size)) 0,
        100% var(--onyx-image-clip-size),
        100% 100%,
        var(--onyx-image-clip-size) 100%,
        0 calc(100% - var(--onyx-image-clip-size))
      );
    }

    &__content {
      display: inline-block;
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
  }
}
</style>
