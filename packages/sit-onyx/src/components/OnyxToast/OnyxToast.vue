<script lang="ts" setup>
import xSmall from "@sit-onyx/icons/x-small.svg?raw";
import { computed } from "vue";
import { injectI18n } from "../../i18n";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxToastProgressBar from "../OnyxToastProgressBar/OnyxToastProgressBar.vue";
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

const { t } = injectI18n();

const hasProgressBar = computed(() => props.duration > 0);
</script>

<template>
  <component
    :is="props.clickable ? 'button' : 'div'"
    class="onyx-toast"
    :class="[`onyx-toast--${props.color}`]"
    role="alert"
    @click="props.clickable && emit('click')"
  >
    <div class="onyx-toast__content">
      <OnyxIcon v-if="props.icon" :icon="props.icon" />

      <div class="onyx-truncation-ellipsis">
        <div class="onyx-toast__headline onyx-text">
          <span class="onyx-truncation-ellipsis"> {{ props.headline }}</span>

          <button
            v-if="!hasProgressBar && !props.clickable"
            :aria-label="t('close')"
            class="onyx-toast__close"
            @click="emit('close')"
          >
            <OnyxIcon :icon="xSmall" />
          </button>
        </div>

        <p
          v-if="props.description"
          class="onyx-toast__description onyx-text--small onyx-truncation-multiline"
        >
          <slot> {{ props.description }}</slot>
        </p>
      </div>
    </div>

    <OnyxToastProgressBar
      v-if="hasProgressBar"
      :color="props.color"
      :duration="props.duration"
      @timer-ended="emit('close')"
    />
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
    --onyx-toast-progress-bar-color: var(--onyx-color-base-primary-300);

    font-family: var(--onyx-font-family);
    min-width: 18rem;
    width: max-content;
    max-width: 40rem;

    border-radius: var(--onyx-radius-md);
    overflow: hidden;
    box-shadow: var(--onyx-shadow-soft-bottom);
    color: var(--onyx-toast-color);
    background-color: var(--onyx-toast-background-color);
    position: relative;
    z-index: var(--onyx-z-index-notification);

    .onyx-toast-progress-bar {
      position: absolute;
      bottom: 0;
      left: 0;
    }

    &:is(button) {
      text-align: left;
      cursor: pointer;
      border: none;
      padding: 0;

      &:focus-visible {
        outline: 0.25rem solid var(--onyx-toast-outline-color);
        // TODO: fix outline cut off by overflow
      }
    }

    &__content {
      display: flex;
      gap: var(--onyx-spacing-md); // TODO: use density
      padding: var(--onyx-spacing-xs) var(--onyx-spacing-md); // TODO: use density
      border: var(--onyx-1px-in-rem) solid var(--onyx-toast-border-color);
      border-radius: inherit;
    }

    &__headline {
      font-weight: 600;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    &__close {
      background: none;
      padding: 0;
      font: inherit;
      border: none;
      color: inherit;
      cursor: pointer;
      display: flex;

      &:focus-visible {
        border-radius: var(--onyx-radius-md);
        outline: var(--onyx-spacing-5xs) solid var(--onyx-toast-outline-color);
      }
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
        --onyx-toast-progress-bar-color: var(--onyx-color-base-#{$color}-400);
      }
    }
  }
}
</style>
