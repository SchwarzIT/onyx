<script lang="ts" setup>
import { iconFileDisabled } from "@sit-onyx/icons";
import { computed, ref, watch } from "vue";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { useRootAttrs } from "../../utils/attrs.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxImageProps } from "./types.js";

const props = withDefaults(defineProps<OnyxImageProps>(), {
  loading: "lazy",
  skeleton: SKELETON_INJECTED_SYMBOL,
});

defineOptions({ inheritAttrs: false });
const skeleton = useSkeletonContext(props);

const isError = ref(false);
watch(
  () => props.src,
  () => (isError.value = false),
  { deep: true },
);

const imageSrc = computed(() => {
  if (typeof props.src === "string") return { light: props.src, dark: undefined };
  return props.src;
});

const size = computed(() => {
  const width = props.shape === "circle" ? Math.min(props.width, props.height) : props.width;
  const height = props.shape === "circle" ? Math.min(props.width, props.height) : props.height;
  return { width: `${width}px`, height: `${height}px` };
});

const { restAttrs, rootAttrs } = useRootAttrs();
</script>

<template>
  <figure
    v-bind="rootAttrs"
    :class="[
      'onyx-component',
      'onyx-image',
      { 'onyx-image--error': isError, [`onyx-image--${props.shape}`]: props.shape },
    ]"
  >
    <OnyxSkeleton v-if="skeleton" class="onyx-image__source" :style="size" v-bind="restAttrs" />

    <template v-else>
      <img
        class="onyx-image__source"
        :class="{ 'onyx-image__source--light': imageSrc.dark }"
        v-bind="{ ...restAttrs, ...props }"
        :src="imageSrc.light"
        :alt="props.alt"
        @error="isError = true"
      />
      <img
        v-if="imageSrc.dark"
        class="onyx-image__source onyx-image__source--dark"
        v-bind="{ ...restAttrs, ...props }"
        :src="imageSrc.dark"
        :alt="props.alt"
        @error="isError = true"
      />

      <div v-if="isError" class="onyx-image__error" :style="size" v-bind="restAttrs">
        <OnyxIcon :icon="iconFileDisabled" size="32px" />
        <div class="onyx-image__alt onyx-text--small">{{ props.alt }}</div>
      </div>
    </template>
  </figure>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-image {
  @include layers.component() {
    --onyx-image-clip-size: var(--onyx-spacing-2xl);
    display: contents;
    background-color: var(--onyx-color-base-neutral-300);

    &--rounded {
      border-radius: var(--onyx-radius-md);
    }

    &--circle {
      border-radius: var(--onyx-radius-full);
      aspect-ratio: 1;
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
      .onyx-image__source {
        display: none;
      }
    }

    &__source {
      display: inline-block;
      object-fit: cover;
      border-radius: inherit;
      background-color: inherit;
      clip-path: inherit;
      max-width: 100%;
      max-height: 100%;
      width: inherit;
      aspect-ratio: inherit;

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
      padding: var(--onyx-density-xs);
      font-family: var(--onyx-font-family);
      background-color: inherit;
      border-radius: inherit;
      clip-path: inherit;

      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      gap: var(--onyx-density-2xs);
      width: max-content;
      aspect-ratio: inherit;
    }

    &__alt {
      overflow: auto;
      color: var(--onyx-color-text-icons-neutral-soft);
    }
  }
}
</style>
