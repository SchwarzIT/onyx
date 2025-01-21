<script lang="ts" setup>
import user from "@sit-onyx/icons/user.svg?raw";
import { computed } from "vue";
import { injectI18n } from "../../i18n";
import { getInitials } from "../../utils/strings";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxAvatarProps } from "./types";

const props = withDefaults(defineProps<OnyxAvatarProps>(), {
  size: "48px",
});

const { locale, t } = injectI18n();

const username = computed(() => {
  if (typeof props.username === "object") return props.username;
  return { name: props.username, locale: locale.value };
});

const initials = computed(() => {
  if (props.initials) return props.initials;
  return getInitials(username.value.name, username.value.locale);
});

const ariaLabel = computed(() => t.value("avatar.ariaLabel", { username: username.value.name }));
</script>

<template>
  <object
    :class="[
      'onyx-component',
      'onyx-avatar',
      `onyx-avatar--${props.size}`,
      props.initials ? 'onyx-avatar--custom' : '',
    ]"
    :data="props.src"
    :title="ariaLabel"
    :aria-label="ariaLabel"
  >
    <div v-if="initials">{{ initials }}</div>
    <OnyxIcon v-else :icon="user" class="onyx-avatar__icon" />
  </object>
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
    object-fit: cover;
    display: block;

    color: var(--onyx-color-text-icons-primary-bold);
    font-family: var(--onyx-font-family);
    line-height: normal;
    font-weight: 600;

    display: flex;
    align-items: center;
    justify-content: center;

    &--custom {
      --onyx-avatar-padding: var(--onyx-spacing-sm);
      width: max-content; // allow avatar to get pill-shaped if longer custom text is passed
      padding: var(--onyx-avatar-padding);
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
