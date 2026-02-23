<script lang="ts" setup>
import { iconChevronDownSmall } from "@sit-onyx/icons";
import { computed } from "vue";
import { useDensity } from "../../composables/density.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { injectI18n } from "../../i18n/index.js";
import { mergeVueProps, useRootAttrs } from "../../utils/attrs.js";
import { useForwardProps } from "../../utils/props.js";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import type { OnyxButtonProps } from "../OnyxButton/types.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxFlyoutMenu from "../OnyxNavBar/modules/OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxSplitButtonProps } from "./types.js";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<OnyxSplitButtonProps>(), {
  color: "primary",
  mode: "default",
  skeleton: SKELETON_INJECTED_SYMBOL,
  disabled: FORM_INJECTED_SYMBOL,
  loading: false,
  trigger: "click",
  open: undefined,
});

const emit = defineEmits<{
  /**
   * Emitted when the open state changes.
   */
  "update:open": [value: boolean];
}>();

defineSlots<{
  default?: (props: { buttonProps: OnyxButtonProps }) => unknown;
  options: () => unknown[];
}>();

const { densityClass } = useDensity(props);
const { restAttrs, rootAttrs } = useRootAttrs();
const { disabled } = useFormContext(props);
const skeleton = useSkeletonContext(props);
const _buttonProps = useForwardProps(props, OnyxButton);
const buttonProps = computed(() => mergeVueProps(_buttonProps.value, restAttrs.value));
const { t } = injectI18n();
</script>

<template>
  <div
    v-if="skeleton"
    :class="['onyx-split-button-skeleton', 'onyx-component', densityClass]"
    v-bind="rootAttrs"
  >
    <OnyxSkeleton class="onyx-split-button-skeleton__left" />
    <OnyxSkeleton class="onyx-split-button-skeleton__right" />
  </div>

  <div
    v-else
    :class="[
      'onyx-component',
      'onyx-split-button',
      `onyx-split-button--${props.color}`,
      `onyx-split-button--${props.mode}`,
      densityClass,
    ]"
    v-bind="rootAttrs"
  >
    <div class="onyx-split-button__main-button">
      <slot :button-props>
        <OnyxButton v-bind="buttonProps" />
      </slot>
    </div>

    <OnyxFlyoutMenu
      :open="props.open"
      :label="t('flyoutMenu.moreActions')"
      :trigger="props.trigger"
      :disabled="disabled || props.loading"
      alignment="right"
      @update:open="emit('update:open', $event)"
    >
      <template #button="{ trigger: flyoutTrigger }">
        <OnyxButton
          class="onyx-split-button__flyout-button"
          :icon="iconChevronDownSmall"
          :label="t(`flyoutMenu.toggleActions.${props.trigger}`)"
          :aria-label="t(`flyoutMenu.toggleActions.${props.trigger}`)"
          :color="props.color"
          :mode="props.mode"
          v-bind="flyoutTrigger"
        />
      </template>

      <template #options>
        <slot name="options"></slot>
      </template>
    </OnyxFlyoutMenu>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-split-button {
  @include layers.override() {
    &__main-button .onyx-button {
      --onyx-button-border-radius: var(--onyx-radius-sm) 0 0 var(--onyx-radius-sm);
    }

    &__flyout-button {
      --onyx-button-border-radius: 0 var(--onyx-radius-sm) var(--onyx-radius-sm) 0;
      --onyx-button-padding-inline: var(--onyx-density-xs);
      border-left: none;

      .onyx-button__label {
        display: none;
      }
    }

    &--plain {
      .onyx-split-button__main-button .onyx-button {
        --onyx-button-padding-inline: var(--onyx-density-sm) var(--onyx-density-2xs);
      }

      .onyx-split-button__flyout-button {
        --onyx-button-padding-inline: var(--onyx-density-3xs);

        &:disabled {
          border-left: var(--onyx-1px-in-rem) solid var(--disabled-border-color);
        }
      }
    }
  }

  @include layers.component() {
    display: flex;
    gap: 0rem;

    &--primary {
      gap: var(--onyx-1px-in-rem);
    }

    :focus-visible {
      z-index: 1;
      border-color: transparent;
    }

    &--plain .flyout-button:enabled:hover {
      border-left: var(--onyx-1px-in-rem) solid var(--onyx-button-text-color);
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
