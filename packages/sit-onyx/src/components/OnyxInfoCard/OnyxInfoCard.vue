<script lang="ts" setup>
import circleAttention from "@sit-onyx/icons/circle-attention.svg?raw";
import xSmall from "@sit-onyx/icons/x-small.svg?raw";
import { useDensity } from "../../composables/density.js";
import { injectI18n } from "../../i18n/index.js";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSystemButton from "../OnyxSystemButton/OnyxSystemButton.vue";
import type { OnyxInfoCardProps } from "./types.js";

const props = withDefaults(defineProps<OnyxInfoCardProps>(), {
  color: "info",
  closable: false,
  icon: circleAttention,
});

const emit = defineEmits<{
  /**
   * Emitted when the close button is clicked (`closable` property must be enabled).
   */
  close: [];
}>();

const slots = defineSlots<{
  /**
   * Slot to provide description / further information.
   */
  default?(): unknown;
  /**
   * Slot to provide optional buttons/actions.
   */
  buttons?(): unknown;
}>();

const { t } = injectI18n();
const { densityClass } = useDensity(props);
</script>

<template>
  <div
    :class="['onyx-component', 'onyx-info-card', `onyx-info-card--${props.color}`, densityClass]"
  >
    <OnyxIcon v-if="props.icon" class="onyx-info-card__icon" :icon="props.icon" />

    <div class="onyx-info-card__content">
      <OnyxHeadline
        is="h3"
        v-if="props.headline"
        class="onyx-info-card__headline onyx-truncation-multiline"
      >
        {{ props.headline }}
      </OnyxHeadline>

      <OnyxSystemButton
        v-if="props.closable"
        class="onyx-info-card__close"
        :icon="xSmall"
        :label="t('close')"
        :color="props.color === 'neutral' ? 'soft' : 'medium'"
        @click="emit('close')"
      />

      <p v-if="!!slots.default" class="onyx-info-card__description onyx-text--small">
        <slot></slot>
      </p>

      <div v-if="!!slots.buttons" class="onyx-info-card__buttons onyx-density-compact">
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-info-card {
  @include layers.component() {
    --onyx-info-card-padding: var(--onyx-density-md);
    display: flex;
    gap: var(--onyx-density-md);
    padding: var(--onyx-info-card-padding) var(--onyx-density-2xl) var(--onyx-info-card-padding)
      var(--onyx-info-card-padding);

    border-radius: var(--onyx-radius-md);
    border: var(--onyx-1px-in-rem) solid var(--onyx-info-card-border-color);
    background-color: var(--onyx-info-card-background);
    color: var(--onyx-color-text-icons-neutral-intense);
    font-family: var(--onyx-font-family);
    max-width: 100%;
    position: relative;

    &__headline,
    &__icon {
      color: var(--onyx-info-card-headline-color);
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: var(--onyx-density-2xs);
      white-space: pre-line;
    }

    &__headline + &__description {
      padding-top: 0;
    }

    &__description {
      padding-top: var(--onyx-density-3xs);
    }

    &__buttons {
      display: flex;
      flex-wrap: wrap;
      gap: var(--onyx-density-xs);
    }

    &__close {
      position: absolute;
      top: var(--onyx-info-card-padding);
      right: var(--onyx-info-card-padding);
    }

    $colors: info, neutral, success, warning, danger, primary;

    @each $color in $colors {
      &--#{$color} {
        --onyx-info-card-background: var(--onyx-color-base-#{$color}-200);
        --onyx-info-card-border-color: var(--onyx-color-base-#{$color}-300);

        @if $color == "neutral" {
          --onyx-info-card-headline-color: var(--onyx-color-text-icons-#{$color}-intense);
        } @else {
          --onyx-info-card-headline-color: var(--onyx-color-text-icons-#{$color}-bold);
        }
      }
    }
  }
}
</style>
