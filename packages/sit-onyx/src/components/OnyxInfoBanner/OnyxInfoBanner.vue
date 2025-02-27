<script lang="ts" setup>
import xSmall from "@sit-onyx/icons/x-small.svg?raw";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import { type OnyxInfoBannerProps } from "./types";

const props = withDefaults(defineProps<OnyxInfoBannerProps>(), {
  title: undefined,
  icon: false,
  closable: false,
  hasAction: false,
  type: "cozy",
});

const emit = defineEmits<{
  (e: "close"): void;
  (e: "action"): void;
}>();
</script>

<template>
  <div
    class="onyx-component onyx-info-banner"
    :class="[`onyx-info-banner--${props.color}`, `onyx-info-banner--${props.type}`]"
  >
    <div class="onyx-info-banner__content">
      <OnyxIcon v-if="props.icon" :icon="props.icon" data-testid="priority-icon" />
      <div>
        <span v-if="props.title" class="onyx-info-banner__title" data-testid="headline">{{
          props.title
        }}</span>
        <p class="onyx-info-banner__description">{{ props.description }}</p>

        <OnyxButton
          v-if="props.hasAction && props.buttonText"
          color="neutral"
          density="compact"
          :label="props.buttonText"
          @click="emit('action')"
        />
      </div>
    </div>
    <div v-if="props.closable">
      <OnyxIcon
        class="onyx-info-banner__close-icon"
        data-testid="close-icon-button"
        :icon="xSmall"
        @click="emit('close')"
      />
    </div>
  </div>
</template>

<style lang="scss">
.onyx-info-banner {
  background-color: var(--onyx-info-banner-background-color);
  padding: 0.3125rem 1rem 0 1rem;
  display: flex;
  color: var(--onyx-info-banner-headline-text-color);
  font-family: var(--onyx-font-family);
  justify-content: space-between;

  &--cozy {
    border-color: var(--onyx-info-banner-border-color);
    border-width: 0.0625rem;
    border-radius: 0.625rem;
    border-style: solid;
    padding: 1rem 1rem 1rem 1rem;
  }

  &--compact {
    padding: 0.3125rem 1rem 0 1rem;
  }

  &__content {
    display: flex;

    div:nth-child(2) {
      padding-left: 0.9375rem;
    }
  }

  &__header {
    justify-content: space-between;
  }

  &__title {
    font-weight: 600;
  }

  &__close-icon {
    color: var(--onyx-color-text-icons-neutral-intense);
    cursor: pointer;
  }

  &__description {
    color: var(--onyx-color-text-icons-neutral-intense);

    + button {
      margin-top: 0.625rem;
    }
  }

  $colors: primary, secondary, neutral, danger, warning, success, info;

  @each $color in $colors {
    &--#{$color} {
      --onyx-info-banner-background-color: var(--onyx-color-base-#{$color}-200);
      --onyx-info-banner-headline-text-color: var(--onyx-color-base-#{$color}-600);
      --onyx-info-banner-border-color: var(--onyx-color-base-#{$color}-400);
    }
  }
}
</style>
