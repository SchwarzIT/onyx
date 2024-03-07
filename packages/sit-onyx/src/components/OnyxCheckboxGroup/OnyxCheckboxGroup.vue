<script lang="ts" setup generic="TValue extends string | number | boolean">
import { injectI18n } from "@/i18n";
import { OnyxHeadline, type OnyxCheckboxProps } from "@/index";
import { computed } from "vue";
import OnyxCheckbox from "../OnyxCheckbox/OnyxCheckbox.vue";
import type { OnyxCheckboxGroupProps } from "./types";

const props = withDefaults(defineProps<OnyxCheckboxGroupProps<TValue>>(), {
  modelValue: () => [],
  direction: "vertical",
  withCheckAll: false,
  disabled: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the checked checkboxes change.
   */
  "update:modelValue": [value: TValue[]];
}>();

const { t } = injectI18n();

const handleUpdate = (id: TValue, isChecked: boolean) => {
  const newValue = isChecked ? [...props.modelValue, id] : props.modelValue.filter((i) => i !== id);
  emit("update:modelValue", newValue);
};

const enabledOptions = computed(() => props.options.filter((i) => !i.disabled && !i.skeleton));

const handleMasterCheckboxChange = (isChecked: boolean) => {
  const newValue = isChecked ? enabledOptions.value.map(({ id }) => id) : [];
  emit("update:modelValue", newValue);
};

/**
 * Current master checkbox state.
 * - checked if all options are checked
 * - indeterminate if at least one but not all options are checked
 * - unchecked if no options are checked
 */
const masterCheckboxState = computed<Partial<OnyxCheckboxProps>>(() => {
  const availableOptionIds = enabledOptions.value.map(({ id }) => id);
  const currentValues = props.modelValue.filter((i) => availableOptionIds.includes(i));

  if (!availableOptionIds.length || !currentValues.length) return { modelValue: false };
  if (currentValues.length === availableOptionIds.length) return { modelValue: true };
  return { indeterminate: true, modelValue: false };
});
</script>

<template>
  <fieldset class="onyx-checkbox-group" :disabled="props.disabled">
    <legend v-if="props.headline" class="onyx-checkbox-group__label">
      <OnyxHeadline is="h3">{{ props.headline }}</OnyxHeadline>
    </legend>

    <div
      class="onyx-checkbox-group__content"
      :class="{ 'onyx-checkbox-group__content--horizontal': props.direction === 'horizontal' }"
    >
      <template v-if="props.skeleton === undefined">
        <OnyxCheckbox
          v-if="props.withCheckAll"
          v-bind="masterCheckboxState"
          :label="props.checkAllLabel || t('selectAll')"
          @update:model-value="handleMasterCheckboxChange" />

        <OnyxCheckbox
          v-for="option in props.options"
          :key="option.id.toString()"
          v-bind="option"
          :model-value="props.modelValue.includes(option.id)"
          @update:model-value="handleUpdate(option.id, $event)"
      /></template>

      <template v-else>
        <OnyxCheckbox v-for="i in props.skeleton" :key="i" :label="`Skeleton ${i}`" skeleton />
      </template>
    </div>
  </fieldset>
</template>

<style lang="scss">
.onyx-checkbox-group {
  margin: 0;
  padding: 0;
  border: none;
  max-width: max-content;
  min-width: unset;

  &__label {
    margin-bottom: var(--onyx-spacing-2xs);
  }

  &__content {
    display: flex;
    flex-direction: column;

    &--horizontal {
      flex-direction: row;
      flex-wrap: wrap;
      column-gap: var(--onyx-spacing-xl);
    }
  }
}
</style>
