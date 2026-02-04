<script lang="ts" setup>
import { useId, useTemplateRef } from "vue";
import { useDensity } from "../../composables/density.js";
import { useAutofocus } from "../../composables/useAutoFocus.js";
import { useRootAttrs } from "../../utils/attrs.js";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxVisuallyHidden from "../OnyxVisuallyHidden/OnyxVisuallyHidden.vue";
import type { OnyxSegmentedControlElement } from "./types.js";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<OnyxSegmentedControlElement>(), {
  disabled: FORM_INJECTED_SYMBOL,
});

const { densityClass } = useDensity(props);
const { disabled } = useFormContext(props);
const { rootAttrs, restAttrs } = useRootAttrs();
const id = useId();
const input = useTemplateRef<HTMLInputElement>("inputRef");

useAutofocus(input, props);
</script>

<template>
  <div
    v-bind="rootAttrs"
    :class="['onyx-component', 'onyx-segmented-control-element', densityClass]"
  >
    <OnyxVisuallyHidden
      is="input"
      v-bind="restAttrs"
      :id
      ref="inputRef"
      :name="props.name"
      type="radio"
      :value="props.value"
      :disabled="disabled"
      class="onyx-segmented-control-element__input"
      :aria-label="props.label"
      :autofocus="props.autofocus"
      :checked="props.checked"
    />
    <label :for="id" class="onyx-segmented-control-element__label">
      <OnyxIcon v-if="props.icon" :icon="props.icon" class="onyx-segmented-control-element__icon" />
      <p v-if="!props.hideLabel" class="onyx-segmented-control-element__text">
        {{ props.label }}
      </p>
    </label>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-segmented-control-element {
  @include layers.component() {
    box-sizing: border-box;
    background-color: var(--onyx-color-base-neutral-200);
    border-radius: var(--onyx-radius-sm);
    color: var(--onyx-color-text-icons-neutral-medium);
    font-weight: var(--onyx-font-weight-regular);
    font-family: var(--onyx-font-family-paragraph);
    line-height: var(--onyx-font-line-height-md);
    width: 100%;

    &__label {
      padding: var(--onyx-density-2xs);
      cursor: pointer;
      height: 100%;
      width: 100%;
      min-width: max-content;
      display: flex;
      justify-content: center;
      gap: var(--onyx-density-xs);
    }
    &:hover {
      color: var(--onyx-color-text-icons-primary-bold);
    }
    &:has(.onyx-segmented-control-element__input:checked) {
      background-color: var(--onyx-color-base-background-blank);
      font-weight: var(--onyx-font-weight-semibold);
    }
    &:has(.onyx-segmented-control-element__input:focus-visible) {
      outline: var(--onyx-outline-width) solid var(--outline-color);
    }
    &:has(.onyx-segmented-control-element__input:disabled) {
      color: var(--onyx-color-text-icons-neutral-soft);
      .onyx-segmented-control-element__label {
        cursor: default;
      }
    }
  }
}
</style>
