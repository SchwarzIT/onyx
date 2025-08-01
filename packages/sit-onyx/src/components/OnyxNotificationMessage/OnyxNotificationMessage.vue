<script lang="ts" setup>
import OnyxInfoCard from "../OnyxInfoCard/OnyxInfoCard.vue";
import type { OnyxNotificationMessageProps } from "./types.js";

const props = withDefaults(defineProps<OnyxNotificationMessageProps>(), {
  color: "neutral",
  duration: 8000,
});

const emit = defineEmits<{
  /**
   * Emitted when the notification should be closed, e.g. when the duration has elapsed or the close "x" icon has been clicked.
   */
  close: [];
}>();

const slots = defineSlots<{
  /**
   * Description/preview of the notification content.
   */
  default(): unknown;
  /**
   * Slot to provide optional buttons/actions.
   */
  buttons?(): unknown;
}>();
</script>

<template>
  <OnyxInfoCard
    class="onyx-component onyx-notification-message"
    :class="[
      'onyx-component',
      'onyx-notification-message',
      { 'onyx-notification-message--permanent': !props.duration },
    ]"
    :headline="props.headline"
    color="neutral"
    :icon="props.icon ?? false"
    closable
    tabindex="0"
    :style="{ animationDuration: props.duration ? `${props.duration}ms` : undefined }"
    role="status"
    :aria-label="props.headline"
    @close="emit('close')"
    @animationend="emit('close')"
  >
    <slot></slot>

    <template v-if="!!slots.buttons" #buttons>
      <slot name="buttons"></slot>
    </template>
  </OnyxInfoCard>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-notification-message {
  @include layers.component() {
    --onyx-info-card-background: var(--onyx-color-base-neutral-900);
    --onyx-info-card-border-color: var(--onyx-info-card-background);
    --onyx-info-card-headline-color: var(--onyx-color-text-icons-neutral-inverted);
    color: var(--onyx-info-card-headline-color);
    width: 24rem;

    &:focus-visible {
      outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
    }

    &:not(:hover, :focus-within) {
      .onyx-info-card__close {
        display: none;
      }
    }

    .onyx-info-card__close {
      --color: var(--onyx-info-card-headline-color);
    }

    .onyx-info-card__description {
      line-clamp: 2;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      overflow: hidden;
    }

    // timer/duration: we use a no-op empty animation here so we can listen for the "animationend" event to close the notification
    // and pause it on hover via plain CSS
    animation: onyx-notification-message-animation linear;
    @keyframes onyx-notification-message-animation {
    }

    &:hover,
    &:focus-within {
      animation-play-state: paused;
    }

    &--permanent {
      animation: none;
    }
  }
}
</style>
