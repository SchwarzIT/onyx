<script lang="ts" setup>
import { computed } from "vue";
import FemaleAvatar from "./FemaleAvatar.vue";
import MaleAvatar from "./MaleAvatar.vue";
import type { OnyxAvatarProps } from "./types";

const props = withDefaults(defineProps<OnyxAvatarProps>(), {
  size: "48px",
  type: "diverse",
});

const initials = computed(() => {
  const names = props.label.split(" ");
  const initials =
    names.length > 1 ? `${names[0].charAt(0)}${names[1].charAt(0)}` : names[0].substring(0, 2);
  return initials.toUpperCase();
});
</script>

<template>
  <figure class="onyx-avatar" :class="[`onyx-avatar--${props.size}`]" :aria-label="props.label">
    <FemaleAvatar v-if="props.type === 'female'" class="onyx-avatar__svg" />
    <MaleAvatar v-else-if="props.type === 'male'" class="onyx-avatar__svg" />
    <div v-else class="onyx-avatar__initials">{{ initials }}</div>
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
    box-sizing: content-box;
    border-radius: var(--onyx-radius-full);
    border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);

    &__svg {
      border-radius: inherit;
      height: 100%;
      width: 100%;
      background-color: var(--onyx-color-base-neutral-100);
    }

    &__initials {
      background-color: var(--onyx-color-base-primary-200);
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

    @include sizes.define-icon-sizes using ($name, $size) {
      @if $name != 12px {
        &--#{$name} {
          --onyx-avatar-size: #{$size};

          @if $name == 16px {
            font-size: 0.625rem;
          }
          @if $name == 24px {
            font-size: 0.8125rem;
          }
          @if $name == 32px {
            font-size: 1rem;
          }
          @if $name == 48px {
            font-size: 1.25rem;
          }
          @if $name == 64px {
            font-size: 1.75rem;
          }
          @if $name == 96px {
            font-size: 2.25rem;
          }
        }
      }
    }
  }
}
</style>
