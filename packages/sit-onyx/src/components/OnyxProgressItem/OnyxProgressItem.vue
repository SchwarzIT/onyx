<script lang="ts" setup>
import checkSmall from "@sit-onyx/icons/check-small.svg?raw";
import notificationFlag from "@sit-onyx/icons/notification-flag.svg?raw";
import { computed } from "vue";
import { useDensity } from "../../composables/density.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxProgressItemProps } from "./types.js";

const props = withDefaults(defineProps<OnyxProgressItemProps>(), {
  status: "default",
  skeleton: SKELETON_INJECTED_SYMBOL,
});

const { densityClass } = useDensity(props);
const skeleton = useSkeletonContext(props);

const icon = computed(() => {
  if (props.status === "completed" || props.status === "visited") return checkSmall;
  if (props.status === "invalid") return notificationFlag;
  return props.icon;
});
</script>

<template>
  <OnyxSkeleton
    v-if="skeleton"
    :class="['onyx-progress-item-skeleton', 'onyx-text', densityClass]"
  />

  <button
    v-else
    :class="[
      'onyx-component',
      'onyx-progress-item',
      densityClass,
      'onyx-text',
      `onyx-progress-item--${props.status}`,
    ]"
    type="button"
    :disabled="props.disabled"
  >
    <span class="onyx-progress-item__indicator">
      <OnyxIcon v-if="icon" :icon="icon" />
      <template v-else>{{ props.value }}</template>
    </span>

    <span> {{ props.label }} </span>
  </button>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-progress-item,
.onyx-progress-item-skeleton {
  @include layers.component() {
    --onyx-progress-item-padding: var(--onyx-density-2xs);
    --onyx-progress-item-gap: var(--onyx-density-sm);
  }
}

.onyx-progress-item-skeleton {
  @include layers.component() {
    height: calc(1lh + 2 * var(--onyx-progress-item-padding));
    width: calc(2 * 1lh + 2 * var(--onyx-progress-item-padding) + var(--onyx-progress-item-gap));
  }
}

.onyx-progress-item {
  @include layers.component() {
    --onyx-progress-outline-color: var(--onyx-color-component-focus-neutral);
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    display: inline-flex;
    align-items: center;
    gap: var(--onyx-progress-item-gap);
    font-weight: 600;

    // reset button styles
    border: none;
    background: none;
    padding: 0;
    min-width: max-content;
    max-width: 100%;

    &:enabled {
      cursor: pointer;
    }

    &__indicator {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: var(--onyx-progress-item-padding);
      border-radius: var(--onyx-radius-full);
      border: 0.125rem solid var(--onyx-progress-item-border-color);
      background-color: var(--onyx-progress-item-background-color);
      color: var(--onyx-progress-item-color);
      min-width: 1.5rem;
      box-sizing: content-box;
    }

    &:focus-visible {
      outline: none;

      .onyx-progress-item__indicator {
        outline: var(--onyx-outline-width) solid var(--onyx-progress-outline-color);
      }
    }

    &--default,
    &--visited {
      --onyx-progress-item-background-color: transparent;
      --onyx-progress-item-border-color: var(--onyx-color-component-border-neutral);
      --onyx-progress-item-color: var(--onyx-color-text-icons-neutral-intense);

      &:enabled {
        &:hover {
          --onyx-progress-item-background-color: var(--onyx-color-base-neutral-200);
          --onyx-progress-item-border-color: var(--onyx-color-component-border-neutral-hover);
        }

        &:focus-visible {
          --onyx-progress-item-background-color: transparent;
          --onyx-progress-item-border-color: var(--onyx-color-component-border-neutral-hover);
        }
      }
    }

    &--active {
      --onyx-progress-item-background-color: var(--onyx-color-base-neutral-800);
      --onyx-progress-item-border-color: var(--onyx-progress-item-background-color);
      --onyx-progress-item-color: var(--onyx-color-text-icons-neutral-inverted);

      &:enabled {
        &:hover {
          --onyx-progress-item-background-color: var(--onyx-color-base-neutral-600);
        }

        &:focus-visible {
          --onyx-progress-item-background-color: var(--onyx-color-base-neutral-800);
        }
      }
    }

    &--completed {
      --onyx-progress-item-background-color: var(--onyx-color-component-cta-default);
      --onyx-progress-item-border-color: var(--onyx-progress-item-background-color);
      --onyx-progress-item-color: var(--onyx-color-text-icons-neutral-inverted);
      --onyx-progress-outline-color: var(--onyx-color-component-focus-primary);

      &:enabled {
        &:hover {
          --onyx-progress-item-background-color: var(--onyx-color-component-cta-default-hover);
        }

        &:focus-visible {
          --onyx-progress-item-background-color: var(--onyx-color-component-cta-default);
        }
      }
    }

    &--invalid {
      --onyx-progress-item-background-color: var(--onyx-color-base-danger-200);
      --onyx-progress-item-border-color: var(--onyx-progress-item-background-color);
      --onyx-progress-item-color: var(--onyx-color-text-icons-danger-intense);
      --onyx-progress-outline-color: var(--onyx-color-component-focus-danger);

      &:enabled {
        &:hover {
          --onyx-progress-item-background-color: var(--onyx-color-base-danger-100);
        }

        &:focus-visible {
          --onyx-progress-item-background-color: var(--onyx-color-base-danger-200);
          --onyx-progress-item-color: var(--onyx-color-text-icons-danger-bold);
        }
      }
    }
  }
}
</style>
