<script lang="ts" setup generic="TValue extends string | number | boolean">
import { computed } from "vue";
import { useDensity } from "../../composables/density";
import { useCheckAll } from "../../composables/checkAll";
import { injectI18n } from "../../i18n";
import { OnyxHeadline } from "../../index";
import OnyxCheckbox from "../OnyxCheckbox/OnyxCheckbox.vue";
import type { OnyxCheckboxGroupProps } from "./types";

const props = withDefaults(defineProps<OnyxCheckboxGroupProps<TValue>>(), {
  modelValue: () => [],
  direction: "vertical",
  withCheckAll: false,
  disabled: false,
});

const { densityClass } = useDensity(props);

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

const enabledOptionValues = computed(() =>
  props.options.filter((i) => !i.disabled && !i.skeleton).map(({ id }) => id),
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
      :class="{ 'onyx-checkbox-group__content--horizontal': props.direction === 'horizontal' }"
    >
      <template v-if="props.skeleton === undefined">
        <OnyxCheckbox
          v-if="props.withCheckAll"
          v-bind="checkAll.state.value"
          :label="checkAllLabel"
          @update:model-value="checkAll.handleChange"
        />

        <OnyxCheckbox
          v-for="option in props.options"
          :key="option.id.toString()"
          v-bind="option"
          :model-value="props.modelValue.includes(option.id)"
          @update:model-value="handleUpdate(option.id, $event)"
        />
      </template>

      <template v-else>
        <OnyxCheckbox v-for="i in props.skeleton" :key="i" :label="`Skeleton ${i}`" skeleton />
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
}
</style>
