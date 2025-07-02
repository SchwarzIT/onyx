<script lang="ts" setup>
import user from "@sit-onyx/icons/user.svg?raw";
import { computed, ref, watch } from "vue";
import { injectI18n } from "../../i18n/index.js";
import { getInitials } from "../../utils/strings.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxAvatarProps } from "./types.js";

const props = withDefaults(defineProps<OnyxAvatarProps>(), {
  size: "48px",
});

const { locale, t } = injectI18n();

const username = computed(() => {
  if (typeof props.fullName === "object") return props.fullName;
  return { name: props.fullName, locale: locale.value };
});

const initials = computed(() => {
  if (props.initials) return props.initials;
  return getInitials(username.value.name, username.value.locale);
});

const ariaLabel = computed(() => t.value("avatar.ariaLabel", { fullName: username.value.name }));

const hasImageError = ref(false);
watch(
  // reset image error if image changes
  () => props.src,
  () => (hasImageError.value = false),
);
</script>

<template>
  <figure
    :class="[
      'onyx-component',
      'onyx-avatar',
      `onyx-avatar--${props.size}`,
      props.initials ? 'onyx-avatar--custom' : '',
    ]"
    :title="ariaLabel"
    :aria-label="ariaLabel"
  >
    <img
      v-if="props.src && !hasImageError"
      class="onyx-avatar__image"
      :src="props.src"
      :alt="ariaLabel"
      @error="hasImageError = true"
    />

    <template v-else>
      <div v-if="initials" class="onyx-avatar__initials">{{ initials }}</div>
      <OnyxIcon v-else :icon="user" class="onyx-avatar__icon" />
    </template>
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
    background-color: var(--onyx-color-base-primary-200);

    color: var(--onyx-color-text-icons-primary-bold);
    font-family: var(--onyx-font-family);
    line-height: normal;
    font-weight: var(--onyx-font-weight-semibold);

    display: flex;
    align-items: center;
    justify-content: center;

    &--custom {
      --onyx-avatar-padding: var(--onyx-spacing-sm);
      width: max-content; // allow avatar to get pill-shaped if longer custom text is passed
      padding: var(--onyx-avatar-padding);
    }

    &__image {
      border-radius: inherit;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    &__icon {
      --icon-size: 1em;
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
