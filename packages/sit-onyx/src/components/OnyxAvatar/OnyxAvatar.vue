<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import type { OnyxAvatarProps } from "./types";

const props = withDefaults(defineProps<OnyxAvatarProps>(), {
  size: "48px",
});

const initials = computed(() => {
  if (props.initials) return props.initials;

  const names = props.label.trim().toUpperCase().split(" ");
  if (names.length === 1) return names[0].substring(0, 2);

  return `${names[0].charAt(0)}${names.at(-1)?.charAt(0)}`;
});

const hasImageError = ref(false);

// reset image error if image changes
watch(
  () => props.src,
  () => (hasImageError.value = false),
);
</script>

<template>
  <figure
    class="onyx-component onyx-avatar"
    :class="[`onyx-avatar--${props.size}`, props.initials ? 'onyx-avatar--custom' : '']"
    :title="props.label"
  >
    <img
      v-if="props.src && !hasImageError"
      class="onyx-avatar__svg"
      :src="props.src"
      :alt="props.label"
      @error="hasImageError = true"
    />

    <div v-else class="onyx-avatar__initials">
      {{ initials }}
    </div>
  </figure>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/sizes.scss";

.onyx-avatar {
  @include layers.component() {
    width: var(--onyx-avatar-size);
    height: var(--onyx-avatar-size);
    min-width: var(--onyx-avatar-size);
    border-radius: var(--onyx-radius-full);

    &:has(.onyx-avatar__initials) {
      background-color: var(--onyx-color-base-primary-200);
    }

    &--custom {
      --onyx-avatar-padding: var(--onyx-spacing-sm);
      width: max-content; // allow avatar to get pill-shaped if longer custom text is passed
      padding: var(--onyx-avatar-padding);
    }

    &__svg {
      border-radius: inherit;
      height: 100%;
      width: 100%;
      background-color: var(--onyx-color-base-neutral-100);
      object-fit: cover;
    }

    &__initials {
      color: var(--onyx-color-text-icons-primary-bold);
      font-family: var(--onyx-font-family);
      line-height: normal;
      font-weight: 600;
      height: 100%;
      width: 100%;
      border-radius: inherit;

      display: flex;
      align-items: center;
      justify-content: center;
    }

    @include sizes.define-rem-sizes using ($name, $size) {
      @if $name != 12px {
        &--#{$name} {
          --onyx-avatar-size: #{$size};

          @if $name == 16px {
            font-size: 0.5rem;
            --onyx-avatar-padding: var(--onyx-spacing-4xs);
          }
          @if $name == 24px {
            font-size: 0.625rem;
            --onyx-avatar-padding: var(--onyx-spacing-3xs);
          }
          @if $name == 32px {
            font-size: 0.875rem;
            --onyx-avatar-padding: var(--onyx-spacing-2xs);
          }
          @if $name == 48px {
            font-size: 1.25rem;
          }
          @if $name == 64px {
            font-size: 1.75rem;
          }
          @if $name == 96px {
            font-size: 3rem;
          }
        }
      }
    }
  }
}
</style>
