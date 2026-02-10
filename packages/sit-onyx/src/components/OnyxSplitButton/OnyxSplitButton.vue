<script lang="ts" setup>
import { iconChevronDownSmall } from "@sit-onyx/icons";
import { ref } from "vue";
import { useDensity } from "../../composables/density.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { injectI18n } from "../../i18n/index.js";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxFlyoutMenu from "../OnyxNavBar/modules/OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxMenuItem from "../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxSplitButtonProps } from "./types.js";

const props = withDefaults(defineProps<OnyxSplitButtonProps>(), {
  type: "button",
  color: "primary",
  mode: "default",
  skeleton: SKELETON_INJECTED_SYMBOL,
  disabled: FORM_INJECTED_SYMBOL,
  loading: false,
});

const { densityClass } = useDensity(props);
// eslint-disable-next-line vue/no-setup-props-reactivity-loss -- don't need to be reactive
const activeOption = ref(props.splitButtonOptions[0]);
const { disabled } = useFormContext(props);
const skeleton = useSkeletonContext(props);
const { t } = injectI18n();
</script>

<template>
  <div v-if="skeleton" :class="['onyx-split-button-skeleton', 'onyx-component', densityClass]">
    <OnyxSkeleton class="onyx-split-button-skeleton__left" />
    <OnyxSkeleton class="onyx-split-button-skeleton__right" />
  </div>

  <div
    v-else
    :class="[
      'onyx-split-button',
      'onyx-component',
      `onyx-split-button--${props.color}`,
      `onyx-split-button--${props.mode}`,
      densityClass,
    ]"
  >
    <OnyxButton
      :label="activeOption!.label"
      :icon="activeOption?.icon"
      class="onyx-split-button__left"
      :color="props.color"
      :mode="props.mode"
      :disabled="disabled"
      :loading="props.loading"
      @click="activeOption!.onClickFunction"
    />

    <OnyxFlyoutMenu :label="t('flyoutMenu.moreActions')" :disabled="disabled || props.loading">
      <template #button="{ trigger }">
        <OnyxButton
          class="flyout-button"
          :icon="iconChevronDownSmall"
          :label="t('flyoutMenu.toggleActions.hover')"
          :aria-label="t('flyoutMenu.toggleActions.hover')"
          :color="props.color"
          :mode="props.mode"
          v-bind="trigger"
        />
      </template>

      <template #options>
        <template v-for="option in props.splitButtonOptions">
          <OnyxMenuItem
            v-if="activeOption!.label !== option.label"
            :key="option.label"
            @click="
              () => {
                option.onClickFunction();
                activeOption = option;
              }
            "
          >
            <OnyxIcon v-if="option.icon" :icon="option.icon" />
            {{ option.label }}
          </OnyxMenuItem>
        </template>
      </template>
    </OnyxFlyoutMenu>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-split-button {
  @include layers.component() {
    display: flex;
    &--primary {
      gap: var(--onyx-1px-in-rem);
    }

    &--plain,
    &--outline,
    &--danger,
    &--neutral {
      gap: 0px;

      .flyout-button {
        border-left: none;
      }
    }

    &--plain {
      --disabled-border-color: var(--onyx-color-base-primary-200);

      &.onyx-split-button {
        &--danger {
          --disabled-border-color: var(--onyx-color-base-danger-200);
        }
        &--neutral {
          --disabled-border-color: var(--onyx-color-base-neutral-200);
        }
      }
      .onyx-button--loading {
        border-right: var(--onyx-1px-in-rem) solid var(--onyx-button-text-color);
      }
      .flyout-button {
        border-left: var(--onyx-1px-in-rem) solid var(--onyx-button-text-color);
        &:disabled {
          border-left: var(--onyx-1px-in-rem) solid var(--disabled-border-color);
        }
      }
    }
    :focus-visible {
      z-index: 1;
      border-color: transparent;
    }
    &--plain .flyout-button:enabled:hover {
      border-left: var(--onyx-1px-in-rem) solid var(--onyx-button-text-color);
    }
    .onyx-split-button__left {
      border-radius: var(--onyx-radius-sm) 0 0 var(--onyx-radius-sm);
    }

    .flyout-button {
      border-radius: 0 var(--onyx-radius-sm) var(--onyx-radius-sm) 0;
      padding-inline: var(--onyx-density-xs);
      .onyx-button__label {
        display: none;
      }
    }
  }
}

.onyx-split-button-skeleton {
  @include layers.component() {
    display: flex;
    align-items: center;
    gap: var(--onyx-1px-in-rem);

    &__left {
      width: var(--onyx-density-4xl);
      height: calc(1.5rem + 2 * var(--onyx-density-xs));
      border-radius: var(--onyx-radius-sm) 0 0 var(--onyx-radius-sm);
    }

    &__right {
      width: calc(1.5rem + 2 * var(--onyx-density-xs));
      height: calc(1.5rem + 2 * var(--onyx-density-xs));
      border-radius: 0 var(--onyx-radius-sm) var(--onyx-radius-sm) 0;
    }
  }
}
</style>
