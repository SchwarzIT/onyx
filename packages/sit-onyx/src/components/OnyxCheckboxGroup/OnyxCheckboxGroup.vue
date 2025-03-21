<script lang="ts" setup generic="TValue extends SelectOptionValue">
import { computed, useTemplateRef } from "vue";
import { useCheckAll } from "../../composables/checkAll";
import { useDensity } from "../../composables/density";
import { SKELETON_INJECTED_SYMBOL, useSkeletonContext } from "../../composables/useSkeletonState";
import { useVModel } from "../../composables/useVModel";
import { injectI18n } from "../../i18n";
import type { SelectOptionValue } from "../../types";
import OnyxCheckbox from "../OnyxCheckbox/OnyxCheckbox.vue";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxInfoTooltip from "../OnyxInfoTooltip/OnyxInfoTooltip.vue";
import type { OnyxCheckboxGroupProps } from "./types";

const props = withDefaults(defineProps<OnyxCheckboxGroupProps<TValue>>(), {
  direction: "vertical",
  withCheckAll: false,
  disabled: FORM_INJECTED_SYMBOL,
  skeleton: SKELETON_INJECTED_SYMBOL,
  requiredMarker: FORM_INJECTED_SYMBOL,
  truncation: "ellipsis",
});

const { densityClass } = useDensity(props);

const emit = defineEmits<{
  /**
   * Emitted when the checked checkboxes change.
   */
  "update:modelValue": [value: TValue[]];
}>();

const { t } = injectI18n();
const modelValue = useVModel({
  props,
  emit,
  key: "modelValue",
  initialValue: [],
});
const handleUpdate = (value: TValue, isChecked: boolean) => {
  modelValue.value = isChecked
    ? [...modelValue.value, value]
    : modelValue.value.filter((i) => i !== value);
};

const enabledOptionValues = computed(() =>
  props.options.filter((i) => !i.disabled && !i.skeleton).map(({ value }) => value),
);

const { disabled, requiredMarker } = useFormContext(props);
const skeleton = useSkeletonContext(props);

const checkAll = useCheckAll(
  enabledOptionValues,
  computed(() => modelValue.value),
  (newValue) => (modelValue.value = newValue),
);

const checkAllLabel = computed(() => {
  const defaultText = t.value("selections.selectAll");
  if (typeof props.withCheckAll === "boolean") return defaultText;
  return props.withCheckAll?.label ?? defaultText;
});

const checkboxes = useTemplateRef("checkboxesRef");

defineExpose({
  inputs: computed<HTMLInputElement[]>(() => {
    const array = Array.isArray(checkboxes.value) ? checkboxes.value : [checkboxes.value];
    return array.flatMap((checkbox) => checkbox?.input).filter((checkbox) => !!checkbox);
  }),
});
</script>

<template>
  <fieldset
    :class="['onyx-component', 'onyx-checkbox-group', densityClass]"
    :disabled="disabled"
    :aria-label="props.label"
  >
    <legend v-if="!props.hideLabel" class="onyx-checkbox-group__label">
      <OnyxHeadline is="h3">{{ props.label }}</OnyxHeadline>
      <OnyxInfoTooltip v-if="props.labelTooltip" open="hover" :text="props.labelTooltip" />
    </legend>

    <div
      class="onyx-checkbox-group__content"
      :class="{
        'onyx-checkbox-group__content--horizontal': props.direction === 'horizontal',
        'onyx-checkbox-group__content--vertical': props.direction === 'vertical',
      }"
    >
      <template v-if="!skeleton">
        <OnyxCheckbox
          v-if="props.withCheckAll"
          :required-marker
          v-bind="checkAll.state.value"
          :label="checkAllLabel"
          value="all"
          class="onyx-checkbox-group__option onyx-checkbox-group__check-all"
          @update:model-value="checkAll.handleChange"
        />

        <OnyxCheckbox
          v-for="option in props.options"
          :key="option.value.toString()"
          v-bind="option"
          ref="checkboxesRef"
          :required-marker
          :truncation="option.truncation ?? props.truncation"
          :model-value="modelValue.includes(option.value)"
          class="onyx-checkbox-group__option"
          @update:model-value="handleUpdate(option.value, $event)"
        />
      </template>

      <template v-else-if="typeof skeleton === 'number'">
        <OnyxCheckbox
          v-for="i in skeleton"
          :key="i"
          :label="`Skeleton ${i}`"
          :value="`skeleton-${i}`"
          skeleton
        />
      </template>
    </div>
  </fieldset>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-checkbox-group {
  @include layers.component() {
    padding: 0;
    border: none;
    max-width: max-content;
    min-width: unset;
    $check-all-border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);

    &__label {
      display: flex;
      gap: var(--onyx-spacing-2xs);
      align-items: center;
      margin-bottom: var(--onyx-density-xs);
    }

    &__content {
      display: flex;

      &--vertical {
        flex-direction: column;

        .onyx-checkbox-group {
          &__option {
            width: 100%;
          }

          &__check-all {
            border-bottom: $check-all-border;
          }
        }
      }

      &--horizontal {
        flex-flow: row wrap;
        column-gap: var(--onyx-density-xl);

        .onyx-checkbox-group__check-all {
          border-right: $check-all-border;

          // the horizontal "Select all" checkbox label needs an additional padding-right
          .onyx-checkbox__label {
            padding-right: var(--onyx-density-md);
          }
        }
      }
    }
  }
}
</style>
