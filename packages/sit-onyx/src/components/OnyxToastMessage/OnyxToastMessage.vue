<script lang="ts" setup>
import circleAttention from "@sit-onyx/icons/circle-attention.svg?raw";
import circleCheck from "@sit-onyx/icons/circle-check.svg?raw";
import circleInformation from "@sit-onyx/icons/circle-information.svg?raw";
import circleX from "@sit-onyx/icons/circle-x.svg?raw";
import xSmall from "@sit-onyx/icons/x-small.svg?raw";
import { computed } from "vue";
import { useDensity } from "../../composables/density.js";
import { injectI18n } from "../../i18n/index.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxToastMessageProps } from "./types.js";

const props = withDefaults(defineProps<OnyxToastMessageProps>(), {
  color: "neutral",
  duration: 5000,
  clickable: false,
  icon: undefined, // needed to prevent default value being "false"
});

const emit = defineEmits<{
  /**
   * Emitted when the toast should be closed.
   */
  close: [];
}>();

const { t } = injectI18n();
const { densityClass } = useDensity(props);

const hasProgressBar = computed(() => props.duration > 0);

const DEFAULT_ICONS: Record<typeof props.color, string> = {
  neutral: circleInformation,
  danger: circleX,
  warning: circleAttention,
  success: circleCheck,
};

const icon = computed(() => {
  if (props.icon === false) return;
  return props.icon || DEFAULT_ICONS[props.color];
});
</script>

<template>
  <component
    :is="props.clickable ? 'button' : 'div'"
    class="onyx-component onyx-toast-message"
    :class="[`onyx-toast-message--${props.color}`, densityClass]"
    :role="props.color === 'danger' || props.color === 'warning' ? 'alert' : 'status'"
    :aria-label="props.clickable ? props.headline : undefined"
  >
    <div class="onyx-toast-message__wrapper">
      <OnyxIcon v-if="icon" :icon="icon" />

      <div class="onyx-toast-message__content onyx-truncation-ellipsis">
        <div class="onyx-toast-message__headline onyx-text">
          <span class="onyx-truncation-ellipsis"> {{ props.headline }}</span>

          <button
            v-if="!props.clickable"
            type="button"
            :aria-label="t('close')"
            class="onyx-toast-message__close"
            @click="emit('close')"
          >
            <OnyxIcon :icon="xSmall" />
          </button>
        </div>

        <p
          v-if="props.description"
          class="onyx-toast-message__description onyx-text--small onyx-truncation-multiline"
          tabindex="0"
        >
          {{ props.description }}
        </p>
      </div>
    </div>

    <!-- key is used to restart the animation when the duration changes -->
    <time
      v-if="hasProgressBar"
      :key="props.duration"
      aria-hidden="true"
      class="onyx-toast-message__progress-bar"
      :style="{ animationDuration: `${props.duration}ms` }"
      @animationend="emit('close')"
    ></time>
  </component>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-toast-message {
  --onyx-toast-message-padding-vertical: var(--onyx-density-sm);
  --onyx-toast-message-padding-horizontal: var(--onyx-density-md);

  @include layers.component() {
    --onyx-toast-message-color: var(--onyx-color-text-icons-neutral-inverted);
    --onyx-toast-message-background-color: var(--onyx-color-base-neutral-700);
    --onyx-toast-message-border-color: transparent;
    --onyx-toast-message-outline-color: var(--onyx-color-component-focus-primary);
    --onyx-toast-message-progress-bar-color: var(--onyx-color-base-primary-300);
    --onyx-toast-message-close-button-size: 1.5rem;

    font-family: var(--onyx-font-family);
    width: 40rem;
    max-width: 100%;
    flex-shrink: 0; // needed so toasts do not shrink if they exceed the max height of the toast provider

    border-radius: var(--onyx-radius-md);
    overflow: hidden;
    box-shadow: var(--onyx-shadow-soft-bottom);
    color: var(--onyx-toast-message-color);
    background-color: var(--onyx-toast-message-background-color);
    position: relative;
    z-index: var(--onyx-z-index-notification);

    &:hover,
    &:focus,
    &:has(&__description:focus-visible) {
      .onyx-toast-message__progress-bar {
        animation-play-state: paused;
      }
    }

    &:is(button) {
      text-align: left;
      cursor: pointer;
      border: none;
      padding: 0;

      &:focus-within {
        outline: var(--onyx-outline-width) solid var(--onyx-toast-message-outline-color);
      }
    }

    &:has(&__description:focus-visible) {
      outline: var(--onyx-outline-width) solid var(--onyx-toast-message-outline-color);
    }

    &__wrapper {
      display: flex;
      gap: var(--onyx-density-md);
      padding: var(--onyx-toast-message-padding-vertical)
        var(--onyx-toast-message-padding-horizontal);
      border: var(--onyx-1px-in-rem) solid var(--onyx-toast-message-border-color);
      border-radius: inherit;
    }

    &__content {
      width: 100%;
    }

    &__headline {
      font-weight: var(--onyx-font-weight-semibold);
      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      &:has(.onyx-toast-message__close) {
        max-width: calc(100% - var(--onyx-toast-message-close-button-size));
      }
    }

    &__progress-bar {
      display: block;
      height: var(--onyx-spacing-5xs);
      background-color: var(--onyx-toast-message-progress-bar-color);
      animation: onyx-toast-message-progress-bar linear;
      width: 0;

      position: absolute;
      bottom: 0;
      left: 0;

      @keyframes onyx-toast-message-progress-bar {
        0% {
          width: 100%;
        }
        100% {
          width: 0%;
        }
      }
    }

    &__close {
      background: none;
      padding: 0;
      font: inherit;
      border: none;
      color: inherit;
      cursor: pointer;
      display: flex;

      // close button is position absolute so the outline is not cut off by the overflow: hidden of the toast
      position: absolute;
      right: var(--onyx-toast-message-padding-horizontal);
      top: var(--onyx-toast-message-padding-vertical);

      &:focus-visible {
        border-radius: var(--onyx-radius-md);
        outline: var(--onyx-spacing-5xs) solid var(--onyx-toast-message-outline-color);
      }
    }

    // only show close button on hover if it closes automatically
    &:has(.onyx-toast-message__progress-bar) {
      &:not(:hover) .onyx-toast-message__close {
        display: none;
      }
    }

    &__description {
      margin-top: var(--onyx-density-2xs);
      white-space: pre-line;
      max-height: 3lh;
      overflow-y: auto;

      &:focus-visible {
        outline: none;
      }
    }

    $colors: danger, warning, success;

    @each $color in $colors {
      &--#{$color} {
        --onyx-toast-message-color: var(--onyx-color-text-icons-#{$color}-bold);
        --onyx-toast-message-background-color: var(--onyx-color-base-#{$color}-100);
        --onyx-toast-message-border-color: var(--onyx-color-base-#{$color}-300);
        --onyx-toast-message-outline-color: var(--onyx-color-component-focus-#{$color});
        --onyx-toast-message-progress-bar-color: var(--onyx-color-base-#{$color}-400);
      }
    }
  }
}
</style>
