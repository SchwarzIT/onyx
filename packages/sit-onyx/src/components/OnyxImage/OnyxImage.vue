<script lang="ts" setup>
import type { OnyxImageProps } from "./types";

const props = withDefaults(defineProps<OnyxImageProps>(), {
  loading: "lazy",
});
</script>

<template>
  <img
    :class="['onyx-component', 'onyx-image', `onyx-image--${props.shape}`]"
    v-bind="props"
    :alt="props.alt"
  />
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-image {
  @include layers.component() {
    display: inline-block;
    background-color: var(--onyx-color-base-neutral-200);
    object-fit: cover;

    &--rounded {
      border-radius: var(--onyx-radius-sm);
    }

    &--circle {
      border-radius: var(--onyx-radius-full);
    }

    &--clipped-corners {
      //  TODO: implement
    }
  }
}
</style>
