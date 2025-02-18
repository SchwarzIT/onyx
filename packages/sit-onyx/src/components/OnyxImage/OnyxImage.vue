<script lang="ts" setup>
import picture from "@sit-onyx/icons/picture.svg?raw";
import { computed, ref, watch } from "vue";
import { useRootAttrs } from "../../utils/attrs";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxImageProps } from "./types";

const props = withDefaults(defineProps<OnyxImageProps>(), {
  loading: "lazy",
});

defineOptions({ inheritAttrs: false });

const isError = ref(false);
watch(
  () => props.src,
  () => (isError.value = false),
);

const imageSrc = computed(() => {
  if (typeof props.src === "string") return { light: props.src, dark: undefined };
  return props.src;
});

const emptySize = computed(() => ({
  width: typeof props.width === "number" ? `${props.width}px` : props.width,
  height: typeof props.height === "number" ? `${props.height}px` : props.height,
}));

const { restAttrs, rootAttrs } = useRootAttrs();
</script>

<template>
  <figure
    v-bind="rootAttrs"
    :class="[
      'onyx-component',
      'onyx-image',
      `onyx-image--${props.shape}`,
      isError ? 'onyx-image--error' : undefined,
    ]"
    :title="isError ? props.alt : undefined"
  >
    <img
      class="onyx-image__content"
      :class="{ 'onyx-image__content--light': imageSrc.dark }"
      v-bind="{ ...restAttrs, ...props }"
      :src="imageSrc.light"
      :alt="props.alt"
      @error="isError = true"
    />
    <img
      v-if="imageSrc.dark"
      class="onyx-image__content onyx-image__content--dark"
      v-bind="{ ...restAttrs, ...props }"
      :src="imageSrc.dark"
      :alt="props.alt"
      @error="isError = true"
    />

    <div v-if="isError" class="onyx-image__error" :style="emptySize">
      <OnyxIcon :icon="picture" size="32px" />
      <div class="onyx-image__alt">{{ props.alt }}</div>
    </div>
  </figure>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-image {
  @include layers.component() {
    --onyx-image-clip-size: min(var(--onyx-spacing-3xl), 25%);
    display: contents;
    background-color: var(--onyx-color-base-neutral-300);

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
      object-fit: cover;
      border-radius: inherit;
      background-color: inherit;
      clip-path: inherit;
      max-width: 100%;
      max-height: 100%;
      width: inherit;

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
      font-family: var(--onyx-font-family);
      background-color: inherit;
      border-radius: inherit;
      clip-path: inherit;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      gap: var(--onyx-density-xs);
      width: max-content;
    }

    &__alt {
      overflow: auto;
    }
  }
}
</style>
