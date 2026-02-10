<script lang="ts" setup>
import { iconChevronDownSmall } from "@sit-onyx/icons";
import { onMounted, ref } from "vue";
import { useDensity } from "../../composables/density.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
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
const aktiveOption = ref();
const { disabled } = useFormContext(props);
const skeleton = useSkeletonContext(props);
onMounted(() => (aktiveOption.value = props.splitButtonOptions[0]));
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
      { 'onyx-split-button--disabled': disabled },
      densityClass,
    ]"
  >
    <OnyxButton
      :label="aktiveOption!.label"
      :icon="aktiveOption?.icon"
      class="onyx-split-button-left"
      :color="props.color"
      :mode="props.mode"
      :disabled="disabled"
      :loading="props.loading"
      @click="aktiveOption!.onClickFunction"
    />

    <OnyxFlyoutMenu label="Weitere Optionen" :disabled="disabled || props.loading">
      <template #button="{ trigger }">
        <OnyxButton
          class="flyout-button"
          :icon="iconChevronDownSmall"
          label=""
          aria-label="Flyout Menü öffnen"
          :color="props.color"
          :mode="props.mode"
          v-bind="trigger"
        />
      </template>

      <template #options>
        <template v-for="option in props.splitButtonOptions">
          <OnyxMenuItem
            v-if="aktiveOption!.label !== option.label"
            :key="option.label"
            @click="
              () => {
                option.onClickFunction();
                aktiveOption = option;
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
    align-items: center;

    &--primary {
      gap: var(--onyx-1px-in-rem);
    }
  }

  &--neutral {
    gap: var(--onyx-0px-in-rem);
  }

  &--danger {
    gap: var(--onyx-0px-in-rem);
  }

  &--plain {
    .onyx-split-button-left {
      border-right: var(--onyx-1px-in-rem) solid var(--onyx-button-text-color);
    }
  }
  .onyx-split-button-left {
    border-right: var(--onyx-1px-in-rem) solid var(--onyx-button-text-color-disabled);
  }

  .onyx-split-button-left {
    border-radius: var(--onyx-radius-sm) 0 0 var(--onyx-radius-sm);
  }

  .flyout-button {
    border-radius: 0 var(--onyx-radius-sm) var(--onyx-radius-sm) 0;
    aspect-ratio: 1;
    height: calc(2 * (var(--onyx-button-padding-vertical)) + var(--onyx-font-line-height-md));
  }
  .flyout-button .flyout-button-label {
    display: none;
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
