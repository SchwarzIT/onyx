<script lang="ts" setup>
import chevronDownSmall from "@sit-onyx/icons/chevron-down-small.svg?raw";
import chevronLeftSmall from "@sit-onyx/icons/chevron-left-small.svg?raw";
import { ref, watch } from "vue";
import { useDensity } from "../../composables/density";
import { SKELETON_INJECTED_SYMBOL, useSkeletonContext } from "../../composables/useSkeletonState";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxSupportAccordionProps } from "./types";

defineSlots<{
  /**
   * Displays the header content.
   */
  header(): unknown;

  /**
   * Displays the panel content.
   */
  default(): unknown;
}>();

const props = withDefaults(defineProps<OnyxSupportAccordionProps>(), {
  color: "neutral",
  openIconType: chevronDownSmall,
  closeIconType: chevronLeftSmall,
  iconPosition: "end",
  openByDefault: false,
  disabled: false,
  skeleton: SKELETON_INJECTED_SYMBOL,
});

const skeleton = useSkeletonContext(props);
const { densityClass } = useDensity(props);

const isOpen = ref(false);

const toggle = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value;
  }
};

watch(
  () => props.openByDefault,
  (newState) => {
    isOpen.value = newState;
  },
  { immediate: true },
);
</script>

<template>
  <div v-if="skeleton" :class="['onyx-component', 'onyx-support-accordion-skeleton', densityClass]">
    <OnyxSkeleton class="onyx-support-accordion-skeleton" />
  </div>
  <div
    v-else
    :class="[
      'onyx-component',
      'onyx-support-accordion',
      densityClass,
      { disabled: props.disabled },
    ]"
  >
    <div :class="['onyx-component', 'onyx-support-accordion__header', props.color, iconPosition]">
      <slot name="header">
        <div class="title">
          <span>{{ label }}</span>
        </div>
        <div
          class="icon"
          data-testid="toggle-icon"
          role="button"
          tabindex="0"
          @click="toggle"
          @keydown.enter="toggle"
        >
          <OnyxIcon v-if="isOpen" :icon="openIconType" />
          <OnyxIcon v-else :icon="closeIconType" />
        </div>
      </slot>
    </div>
    <transition name="accordion">
      <div v-if="isOpen" class="onyx-support-accordion__panel">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
.onyx-support-accordion {
  @include layers.component() {
    &__header {
      font-family: var(--onyx-font-family);
      padding: 0.625rem 1rem;
      display: flex;

      :nth-child(2) {
        display: flex;
      }

      &.end {
        justify-content: space-between;
      }

      &.next {
        :nth-child(2) {
          margin-left: 0.5rem;
        }
      }
    }

    &__panel {
      padding: 1rem;
    }

    &:hover {
      .onyx-support-accordion__header {
        background-color: var(--onyx-color-base-neutral-200);
      }
    }

    &:focus {
      .onyx-support-accordion__header {
        background-color: var(--onyx-color-base-neutral-300);
      }
    }

    .neutral {
      background-color: var(--onyx-color-base-neutral-100);
    }

    .primary {
      background-color: var(--onyx-color-base-primary-100);
    }

    .secondary {
      background-color: var(--onyx-color-base-secondary-100);
    }

    .danger {
      background-color: var(--onyx-color-base-danger-100);
    }

    .warning {
      background-color: var(--onyx-color-base-warning-100);
    }

    .success {
      background-color: var(--onyx-color-base-success-100);
    }

    .info {
      background-color: var(--onyx-color-base-info-100);
    }

    .disabled {
      color: var(--onyx-color-text-icons-neutral-soft);
      pointer-events: none;
    }

    .icon {
      cursor: pointer;
    }
  }
}
</style>
