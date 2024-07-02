<script lang="ts" setup>
import circleAttention from "@sit-onyx/icons/circle-attention.svg?raw";
import circleCheck from "@sit-onyx/icons/circle-check.svg?raw";
import circleInformation from "@sit-onyx/icons/circle-information.svg?raw";
import circleX from "@sit-onyx/icons/circle-x.svg?raw";
import xSmall from "@sit-onyx/icons/x-small.svg?raw";
import { computed } from "vue";
import { useDensity } from "../../composables/density";
import { injectI18n } from "../../i18n";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxToastProps } from "./types";

const props = withDefaults(defineProps<OnyxToastProps>(), {
  color: "neutral",
  duration: 5000,
  clickable: false,
  icon: undefined, // needed to prevent default value being "false"
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
    class="onyx-toast"
    :class="[`onyx-toast--${props.color}`, densityClass]"
    :role="props.color === 'danger' || props.color === 'warning' ? 'alert' : 'status'"
    :aria-label="props.clickable ? props.headline : undefined"
    @click="props.clickable && emit('click')"
  >
    <div class="onyx-toast__wrapper">
      <OnyxIcon v-if="icon" :icon="icon" />

      <div class="onyx-toast__content onyx-truncation-ellipsis">
        <div class="onyx-toast__headline onyx-text">
          <span class="onyx-truncation-ellipsis"> {{ props.headline }}</span>

          <button
            v-if="!props.clickable"
            type="button"
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
      class="onyx-toast__progress-bar"
      :style="{ animationDuration: `${props.duration}ms` }"
      @animationend="emit('close')"
    ></time>
  </component>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/density.scss";

.onyx-toast {
  @include density.compact {
    --onyx-toast-padding-vertical: var(--onyx-spacing-4xs);
    --onyx-toast-padding-horizontal: var(--onyx-spacing-xs);
    --onyx-toast-gap: var(--onyx-spacing-xs);
  }

  @include density.default {
    --onyx-toast-padding-vertical: var(--onyx-spacing-xs);
    --onyx-toast-padding-horizontal: var(--onyx-spacing-md);
    --onyx-toast-gap: var(--onyx-spacing-md);
  }

  @include density.cozy {
    --onyx-toast-padding-vertical: var(--onyx-spacing-sm);
    --onyx-toast-padding-horizontal: var(--onyx-spacing-lg);
    --onyx-toast-gap: var(--onyx-spacing-lg);
  }

  @include layers.component() {
    --onyx-toast-color: var(--onyx-color-text-icons-neutral-inverted);
    --onyx-toast-background-color: var(--onyx-color-base-neutral-700);
    --onyx-toast-border-color: transparent;
    --onyx-toast-outline-color: var(--onyx-color-base-primary-200);
    --onyx-toast-progress-bar-color: var(--onyx-color-base-primary-300);
    --onyx-toast-close-button-size: 1.5rem;

    font-family: var(--onyx-font-family);
    width: 40rem;
    max-width: 100%;
    flex-shrink: 0; // needed so toasts do not shrink if they exceed the max height of the toast provider

    border-radius: var(--onyx-radius-md);
    overflow: hidden;
    box-shadow: var(--onyx-shadow-soft-bottom);
    color: var(--onyx-toast-color);
    background-color: var(--onyx-toast-background-color);
    position: relative;
    z-index: var(--onyx-z-index-notification);

    &:hover,
    &:focus,
    &:has(&__description:focus-visible) {
      .onyx-toast__progress-bar {
        animation-play-state: paused;
      }
    }

    &:is(button) {
      text-align: left;
      cursor: pointer;
      border: none;
      padding: 0;

      &:focus-within {
        outline: 0.25rem solid var(--onyx-toast-outline-color);
      }
    }

    &:has(&__description:focus-visible) {
      outline: 0.25rem solid var(--onyx-toast-outline-color);
    }

    &__wrapper {
      display: flex;
      gap: var(--onyx-toast-gap);
      padding: var(--onyx-toast-padding-vertical) var(--onyx-toast-padding-horizontal);
      border: var(--onyx-1px-in-rem) solid var(--onyx-toast-border-color);
      border-radius: inherit;
    }

    &__content {
      width: 100%;
    }

    &__headline {
      font-weight: 600;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      &:has(.onyx-toast__close) {
        max-width: calc(100% - var(--onyx-toast-close-button-size));
      }
    }

    &__progress-bar {
      display: block;
      height: var(--onyx-spacing-5xs);
      background-color: var(--onyx-toast-progress-bar-color);
      animation: onyx-toast-progress-bar linear;
      width: 0;

      position: absolute;
      bottom: 0;
      left: 0;

      @keyframes onyx-toast-progress-bar {
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
      right: var(--onyx-toast-padding-horizontal);
      top: var(--onyx-toast-padding-vertical);

      &:focus-visible {
        border-radius: var(--onyx-radius-md);
        outline: var(--onyx-spacing-5xs) solid var(--onyx-toast-outline-color);
      }
    }

    // only show close button on hover if it closes automatically
    &:has(.onyx-toast__progress-bar) {
      &:not(:hover) .onyx-toast__close {
        display: none;
      }
    }

    &__description {
      margin-top: var(--onyx-spacing-2xs);
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
