<script lang="ts" setup>
import xSmall from "@sit-onyx/icons/x-small.svg?raw";
import { ref } from "vue";
import type { OnyxNotificationProps } from "./types";

const props = withDefaults(defineProps<OnyxNotificationProps>(), {
  color: "neutral",
  duration: 5000,
});

const durationKey = ref(0);

const emit = defineEmits<{
  close: [];
}>();

const onClose = () => {
  durationKey.value += 1;
  emit("close");
};
</script>

<template>
  <div class="onyx-component onyx-notification" :class="[`onyx-notification--${props.color}`]">
    <div class="onyx-notification__header">
      <div>
        <OnyxIcon v-if="props.icon" :icon="props.icon" data-testid="priority-icon" />
        <span data-testid="headline">{{ props.headline }}</span>
      </div>
      <div>
        <OnyxIcon data-testid="close-icon-button" :icon="xSmall" @click="onClose" />
      </div>
    </div>

    <div class="onyx-notification__content">
      <span data-testid="description">{{ props.description }}</span>
    </div>
    <time
      v-if="props.duration"
      :key="durationKey"
      aria-hidden="true"
      class="hidden-progress-bar"
      :style="{ animationDuration: `${props.duration}ms` }"
      @animationend="onClose"
    ></time>
    <template v-else></template>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-notification {
  @include layers.component() {
    background-color: var(--notification-message-background-color);
    position: absolute;
    top: 1rem;
    right: 1rem;
    margin-left: 1rem;
    width: 25.5625rem;
    border-radius: 0.5rem;
    font-family: var(--onyx-font-family);

    &:hover > .header > :nth-child(2) {
      display: flex;
    }

    &:hover,
    &:focus {
      .hidden-progress-bar {
        animation-play-state: paused;
      }
    }

    .hidden-progress-bar {
      animation: notification-progress-bar linear;

      @keyframes notification-progress-bar {
        0% {
          width: 100%;
        }

        100% {
          width: 0%;
        }
      }
    }

    $colors: primary, secondary, neutral, danger, warning, success, info;

    @each $color in $colors {
      &--#{$color} {
        --notification-message-background-color: var(--onyx-color-base-#{$color}-900);
      }
    }

    &__header {
      display: flex;
      padding: 1rem 1rem 0.5rem 1rem;
      justify-content: space-between;
      color: var(--onyx-color-base-grayscale-white);
      font-weight: 600;

      div {
        display: flex;
        gap: 0.5rem;
      }

      div:nth-child(2) {
        display: none;
        color: var(--onyx-color-base-grayscale-white);
        cursor: pointer;
      }
    }

    &__content {
      padding: 0 1rem 1rem 1rem;
      font-size: 1rem;
      line-height: 1.5rem;
      color: var(--onyx-color-base-grayscale-white);
    }
  }
}

@media screen and (max-width: 767px) {
  .onyx-notification {
    width: -moz-available;
    /* WebKit-based browsers will ignore this. */
    width: -webkit-fill-available;
    /* Mozilla-based browsers will ignore this. */
  }
}
</style>
