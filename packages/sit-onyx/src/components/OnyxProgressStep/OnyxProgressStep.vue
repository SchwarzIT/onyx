<script lang="ts" setup>
import checkSmall from "@sit-onyx/icons/check-small.svg?raw";
import notificationFlag from "@sit-onyx/icons/notification-flag.svg?raw";
import { computed } from "vue";
import { useDensity } from "../../composables/density";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxProgressStepProps } from "./types";

const props = withDefaults(defineProps<OnyxProgressStepProps>(), {
  status: "default",
});

const { densityClass } = useDensity(props);

const icon = computed(() => {
  if (props.status === "completed" || props.status === "visited") return checkSmall;
  if (props.status === "invalid") return notificationFlag;
  return props.icon;
});
</script>

<template>
  <button
    :class="[
      'onyx-component',
      'onyx-progress-step',
      densityClass,
      'onyx-text',
      `onyx-progress-step--${props.status}`,
    ]"
    type="button"
    :disabled="props.disabled"
  >
    <span class="onyx-progress-step__indicator">
      <OnyxIcon v-if="icon" :icon="icon" />
      <template v-else>{{ props.value }}</template>
    </span>

    <span> {{ props.label }}</span>
  </button>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-progress-step {
  @include layers.component() {
    --onyx-progress-outline-color: var(--onyx-color-component-focus-neutral);
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    list-style: none;
    display: inline-flex;
    align-items: center;
    gap: var(--onyx-density-sm);
    font-weight: 600;

    // reset button styles
    border: none;
    background: none;
    padding: 0;

    &:enabled {
      cursor: pointer;
    }

    &__indicator {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: var(--onyx-density-2xs);
      border-radius: var(--onyx-radius-full);
      border: 0.125rem solid var(--onyx-progress-step-border-color);
      background-color: var(--onyx-progress-step-background-color);
      color: var(--onyx-progress-step-color);
      min-width: 1.5rem;
      box-sizing: content-box;
    }

    &:focus-visible {
      outline: none;

      .onyx-progress-step__indicator {
        outline: var(--onyx-outline-width) solid var(--onyx-progress-outline-color);
      }
    }

    &--default,
    &--visited {
      --onyx-progress-step-background-color: transparent;
      --onyx-progress-step-border-color: var(--onyx-color-component-border-neutral);
      --onyx-progress-step-color: var(--onyx-color-text-icons-neutral-intense);

      &:enabled {
        &:hover {
          --onyx-progress-step-background-color: var(--onyx-color-base-neutral-200);
          --onyx-progress-step-border-color: var(--onyx-color-component-border-neutral-hover);
        }

        &:focus-visible {
          --onyx-progress-step-background-color: transparent;
          --onyx-progress-step-border-color: var(--onyx-color-component-border-neutral-hover);
        }
      }
    }

    &--active {
      --onyx-progress-step-background-color: var(--onyx-color-base-neutral-800);
      --onyx-progress-step-border-color: var(--onyx-progress-step-background-color);
      --onyx-progress-step-color: var(--onyx-color-text-icons-neutral-inverted);

      &:enabled {
        &:hover {
          --onyx-progress-step-background-color: var(--onyx-color-base-neutral-600);
        }

        &:focus-visible {
          --onyx-progress-step-background-color: var(--onyx-color-base-neutral-800);
        }
      }
    }

    &--completed {
      --onyx-progress-step-background-color: var(--onyx-color-component-cta-default);
      --onyx-progress-step-border-color: var(--onyx-progress-step-background-color);
      --onyx-progress-step-color: var(--onyx-color-text-icons-neutral-inverted);
      --onyx-progress-outline-color: var(--onyx-color-component-focus-primary);

      &:enabled {
        &:hover {
          --onyx-progress-step-background-color: var(--onyx-color-component-cta-default-hover);
        }

        &:focus-visible {
          --onyx-progress-step-background-color: var(--onyx-color-component-cta-default);
        }
      }
    }

    &--invalid {
      --onyx-progress-step-background-color: var(--onyx-color-base-danger-200);
      --onyx-progress-step-border-color: var(--onyx-progress-step-background-color);
      --onyx-progress-step-color: var(--onyx-color-text-icons-danger-intense);
      --onyx-progress-outline-color: var(--onyx-color-component-focus-danger);

      &:enabled {
        &:hover {
          --onyx-progress-step-background-color: var(--onyx-color-base-danger-100);
        }

        &:focus-visible {
          --onyx-progress-step-background-color: var(--onyx-color-base-danger-200);
          --onyx-progress-step-color: var(--onyx-color-text-icons-danger-bold);
        }
      }
    }
  }
}
</style>
