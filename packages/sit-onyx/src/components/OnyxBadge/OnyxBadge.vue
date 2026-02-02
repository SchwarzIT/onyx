<script lang="ts" setup>
import { computed } from "vue";
import { useDensity } from "../../composables/density.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxTooltip from "../OnyxTooltip/OnyxTooltip.vue";
import type { OnyxBadgeProps } from "./types.js";

const props = withDefaults(defineProps<OnyxBadgeProps>(), {
  color: "primary",
  dot: false,
});

const { densityClass } = useDensity(props);

const clickable = computed(() => {
  if (!props.clickable) return;
  if (typeof props.clickable === "object") return props.clickable;
  return { label: props.clickable };
});

const badgeClasses = computed(() => [
  "onyx-component",
  "onyx-badge",
  "onyx-truncation-ellipsis",
  "onyx-text",
  `onyx-badge--${props.color}`,
  { "onyx-badge--active": clickable.value?.active },
  { "onyx-badge--dot": props.dot },
  densityClass.value,
]);

defineSlots<{
  /**
   * Badge content.
   */
  default?(): unknown;
}>();
</script>

<template>
  <OnyxTooltip v-if="clickable" :text="clickable.label">
    <template #default="{ trigger }">
      <button v-bind="trigger" :class="badgeClasses" type="button" :aria-pressed="clickable.active">
        <template v-if="!props.dot">
          <OnyxIcon v-if="props.icon" class="onyx-badge__icon" :icon="props.icon" />
          <slot v-else></slot>

          <OnyxIcon
            v-if="clickable.actionIcon"
            class="onyx-badge__action-icon"
            :icon="clickable.actionIcon"
          />
        </template>
      </button>
    </template>
  </OnyxTooltip>

  <div v-else :class="badgeClasses">
    <template v-if="!props.dot">
      <OnyxIcon v-if="props.icon" class="onyx-badge__icon" :icon="props.icon" />
      <slot v-else></slot>
    </template>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/density.scss";

.onyx-badge {
  @include density.compact {
    --onyx-badge-icon-padding: var(--onyx-spacing-4xs);
    --onyx-badge-icon-size: 1rem;
  }

  @include density.default {
    --onyx-badge-icon-padding: var(--onyx-spacing-3xs);
    --onyx-badge-icon-size: 1rem;
  }

  @include density.cozy {
    --onyx-badge-icon-padding: var(--onyx-spacing-4xs);
    --onyx-badge-icon-size: 1.5rem;
  }

  @include layers.component() {
    --onyx-badge-background-color: var(--onyx-color-component-cta-default);
    --onyx-badge-hover-background-color: var(--onyx-color-component-cta-default-hover);
    --onyx-badge-focus-color: var(--onyx-color-component-focus-primary);
    --onyx-badge-active-background-color: var(--onyx-color-base-primary-700);

    display: inline-block;
    max-width: 100%;
    padding: var(--onyx-density-3xs) var(--onyx-density-sm);
    border-radius: var(--onyx-radius-full);
    background-color: var(--onyx-badge-background-color);
    color: var(--onyx-color-text-icons-neutral-inverted);
    font-family: var(--onyx-font-family-paragraph);
    font-style: normal;
    vertical-align: middle;
    max-height: max-content;
    border: none;
    text-align: center;
    cursor: default;

    &:has(&__icon) {
      padding: var(--onyx-badge-icon-padding);

      .onyx-icon {
        --icon-size: var(--onyx-badge-icon-size);
      }
    }

    &:is(button) {
      cursor: pointer;
      outline: none;
      transition:
        background-color var(--onyx-duration-sm),
        box-shadow var(--onyx-duration-sm);

      &:hover {
        background-color: var(--onyx-badge-hover-background-color);
      }

      &:focus-visible {
        outline: var(--onyx-outline-width) solid var(--onyx-badge-focus-color);
      }

      &:active {
        filter: brightness(0.9);
      }
    }

    &--active {
      background-color: var(--onyx-badge-active-background-color);
    }

    &--neutral {
      --onyx-badge-background-color: var(--onyx-color-base-neutral-700);
      --onyx-badge-hover-background-color: var(--onyx-color-base-neutral-400);
      --onyx-badge-focus-color: var(--onyx-color-component-focus-neutral);
      --onyx-badge-active-background-color: var(--onyx-color-base-neutral-900);
    }

    &--danger {
      --onyx-badge-background-color: var(--onyx-color-base-danger-500);
      --onyx-badge-hover-background-color: var(--onyx-color-base-danger-200);
      --onyx-badge-focus-color: var(--onyx-color-component-focus-danger);
      --onyx-badge-active-background-color: var(--onyx-color-base-danger-700);
    }

    &--warning {
      --onyx-badge-background-color: var(--onyx-color-base-warning-500);
      --onyx-badge-hover-background-color: var(--onyx-color-base-warning-200);
      --onyx-badge-focus-color: var(--onyx-color-component-focus-warning);
      --onyx-badge-active-background-color: var(--onyx-color-base-warning-700);
    }

    &--success {
      --onyx-badge-background-color: var(--onyx-color-base-success-500);
      --onyx-badge-hover-background-color: var(--onyx-color-base-success-200);
      --onyx-badge-focus-color: var(--onyx-color-component-focus-success);
      --onyx-badge-active-background-color: var(--onyx-color-base-success-700);
    }

    &--info {
      --onyx-badge-background-color: var(--onyx-color-base-info-500);
      --onyx-badge-hover-background-color: var(--onyx-color-base-info-200);
      --onyx-badge-focus-color: var(--onyx-color-base-info-200);
      --onyx-badge-active-background-color: var(--onyx-color-base-info-700);
    }

    &__icon {
      display: flex;
    }

    &--dot {
      height: max-content;
      width: max-content;
      padding: var(--onyx-density-2xs);
    }
  }
}
</style>
