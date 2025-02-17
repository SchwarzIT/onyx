<script lang="ts" setup>
import picture from "@sit-onyx/icons/picture.svg?raw";
import { computed, ref, watch } from "vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxImageProps } from "./types";

const props = withDefaults(defineProps<OnyxImageProps>(), {
  loading: "lazy",
});

const isError = ref(false);
watch(
  () => props.src,
  () => (isError.value = false),
);

const imageSrc = computed(() => {
  if (typeof props.src === "string") return { light: props.src, dark: undefined };
  return props.src;
});
</script>

<template>
  <figure
    :class="[
      'onyx-component',
      'onyx-image',
      `onyx-image--${props.shape}`,
      isError ? 'onyx-image--error' : undefined,
    ]"
    :style="isError ? { height: `${props.height}px`, width: `${props.width}px` } : undefined"
    :title="isError ? props.alt : undefined"
  >
    <img
      class="onyx-image__content"
      :class="{ 'onyx-image__content--light': imageSrc.dark }"
      v-bind="props"
      :src="imageSrc.light"
      :alt="props.alt"
      @error="isError = true"
    />
    <img
      v-if="imageSrc.dark"
      class="onyx-image__content onyx-image__content--dark"
      v-bind="props"
      :src="imageSrc.dark"
      :alt="props.alt"
      @error="isError = true"
    />

    <div v-if="isError" class="onyx-image__error">
      <OnyxIcon :icon="picture" size="48px" />
      <div>{{ props.alt }}</div>
    </div>
  </figure>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-image {
  @include layers.component() {
    --onyx-image-clip-size: min(var(--onyx-spacing-3xl), 25%);
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: var(--onyx-color-base-neutral-300);
    font-family: var(--onyx-font-family);

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

    &--error {
      .onyx-image__content {
        display: none;
      }
    }

    &__content {
      display: inline-block;
      width: 100%;
      max-width: 100%;
      height: 100%;
      max-height: 100%;
      object-fit: cover;
      border-radius: inherit;

      &--dark {
        display: none;
      }

      .dark & {
        &--dark {
          display: inline-block;
        }

        &--light {
          display: none;
        }
      }
    }

    &__error {
      color: var(--onyx-color-text-icons-neutral-medium);
      padding: var(--onyx-density-sm);
    }
  }
}
</style>
