<script lang="ts" setup>
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxToastProps } from "./types";

const props = withDefaults(defineProps<OnyxToastProps>(), {
  color: "neutral",
  duration: 5000,
  clickable: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the toast is clicked. Requires `clickable` property to be enabled.
   */
  click: [];
  /**
   * Emitted when the toast should be closed.
   */
  close: [];
}>();

defineSlots<{
  /**
   * Optional slot to override the description content.
   * Useful if you e.g. want to add links etc.
   */
  default?(): unknown;
}>();
</script>

<template>
  <component
    :is="props.clickable ? 'button' : 'div'"
    class="onyx-toast"
    :class="[`onyx-toast--${props.color}`]"
    @click="props.clickable && emit('click')"
  >
    <OnyxIcon v-if="props.icon" :icon="props.icon" />

    <div class="onyx-truncation-ellipsis">
      <div class="onyx-toast__headline onyx-text onyx-truncation-ellipsis">
        {{ props.headline }}
      </div>

      <p
        v-if="props.description"
        class="onyx-toast__description onyx-text--small onyx-truncation-multiline"
      >
        <slot> {{ props.description }}</slot>
      </p>
    </div>
  </component>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-toast {
  @include layers.component() {
    --onyx-toast-color: var(--onyx-color-text-icons-neutral-inverted);
    --onyx-toast-background-color: var(--onyx-color-base-neutral-700);
    --onyx-toast-border-color: transparent;
    --onyx-toast-outline-color: var(--onyx-color-base-primary-200);

    font-family: var(--onyx-font-family);
    min-width: 18rem;
    max-width: 40rem;

    border-radius: var(--onyx-radius-md);
    background-color: var(--onyx-toast-background-color);
    box-shadow: var(--onyx-shadow-soft-bottom);
    color: var(--onyx-toast-color);
    border: var(--onyx-1px-in-rem) solid var(--onyx-toast-border-color);

    display: flex;
    gap: var(--onyx-spacing-md); // TODO: use density
    padding: var(--onyx-spacing-xs) var(--onyx-spacing-md); // TODO: use density

    &:is(button) {
      text-align: left;
      cursor: pointer;

      &:focus-visible {
        outline: 0.25rem solid var(--onyx-toast-outline-color);
      }
    }

    &__headline {
      font-weight: 600;
    }

    &__description {
      margin-top: var(--onyx-spacing-2xs);
      white-space: pre-line;
    }

    $colors: danger, warning, success;

    @each $color in $colors {
      &--#{$color} {
        --onyx-toast-color: var(--onyx-color-text-icons-#{$color}-bold);
        --onyx-toast-background-color: var(--onyx-color-base-#{$color}-100);
        --onyx-toast-border-color: var(--onyx-color-base-#{$color}-300);
        --onyx-toast-outline-color: var(--onyx-color-base-#{$color}-200);
      }
    }
  }
}
</style>
