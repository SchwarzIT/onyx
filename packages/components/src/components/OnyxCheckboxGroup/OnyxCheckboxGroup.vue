<script lang="ts" setup generic="TValue extends SelectOptionValue">
import { computed } from "vue";
import { useCheckAll } from "../../composables/checkAll";
import { useDensity } from "../../composables/density";
import { injectI18n } from "../../i18n";
import type { SelectOptionValue } from "../../types";
import OnyxCheckbox from "../OnyxCheckbox/OnyxCheckbox.vue";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import type { OnyxCheckboxGroupProps } from "./types";

const props = withDefaults(defineProps<OnyxCheckboxGroupProps<TValue>>(), {
  modelValue: () => [],
  direction: "vertical",
  withCheckAll: false,
  disabled: false,
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

const handleUpdate = (value: TValue, isChecked: boolean) => {
  const newValue = isChecked
    ? [...props.modelValue, value]
    : props.modelValue.filter((i) => i !== value);
  emit("update:modelValue", newValue);
};

const enabledOptionValues = computed(() =>
  props.options.filter((i) => !i.disabled && !i.skeleton).map(({ value }) => value),
);

const checkAll = useCheckAll(
  enabledOptionValues,
  computed(() => props.modelValue),
  (newValue) => emit("update:modelValue", newValue),
);

const checkAllLabel = computed(() => {
  const defaultText = t.value("selections.selectAll");
  if (typeof props.withCheckAll === "boolean") return defaultText;
  return props.withCheckAll?.label ?? defaultText;
});
</script>

<template>
  <fieldset :class="['onyx-checkbox-group', densityClass]" :disabled="props.disabled">
    <legend v-if="props.headline" class="onyx-checkbox-group__label">
      <OnyxHeadline is="h3">{{ props.headline }}</OnyxHeadline>
    </legend>

    <div
      class="onyx-checkbox-group__content"
      :class="{
        'onyx-checkbox-group__content--horizontal': props.direction === 'horizontal',
        'onyx-checkbox-group__content--vertical': props.direction === 'vertical',
      }"
    >
      <template v-if="props.skeleton === undefined">
        <OnyxCheckbox
          v-if="props.withCheckAll"
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
          :truncation="option.truncation ?? props.truncation"
          :model-value="props.modelValue.includes(option.value)"
          class="onyx-checkbox-group__option"
          @update:model-value="handleUpdate(option.value, $event)"
        />
      </template>

      <template v-else>
        <OnyxCheckbox
          v-for="i in props.skeleton"
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
    $check-all-border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);

    &__label {
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
