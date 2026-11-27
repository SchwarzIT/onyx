<script lang="ts" setup generic="TValue extends SelectOptionValue">
import { computed, provide, ref, useTemplateRef } from "vue";
import { useCheckAll } from "../../composables/checkAll.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import type { SelectOptionValue } from "../../types/index.js";
import { asArray } from "../../utils/objects.js";
import OnyxCheckbox from "../OnyxCheckbox/OnyxCheckbox.vue";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxFormElementV2 from "../OnyxFormElementV2/OnyxFormElementV2.vue";
import type { FormElementV2Tooltip } from "../OnyxFormElementV2/types.js";
import { useLegacyFormElementProps } from "../OnyxFormElementV2/useLegacyFormElementProps.js";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxInfoTooltip from "../OnyxInfoTooltip/OnyxInfoTooltip.vue";
import { CHECKBOX_GROUP_INJECTION_KEY, type OnyxCheckboxGroupProps } from "./types.js";

const props = withDefaults(defineProps<OnyxCheckboxGroupProps<TValue>>(), {
  orientation: "vertical",
  withCheckAll: false,
  disabled: FORM_INJECTED_SYMBOL,
  skeleton: SKELETON_INJECTED_SYMBOL,
  requiredMarker: FORM_INJECTED_SYMBOL,
  showError: FORM_INJECTED_SYMBOL,
  reserveMessageSpace: FORM_INJECTED_SYMBOL,
  truncation: "ellipsis",
});

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
  default: () => [],
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

const childErrors = ref(new Map<string, string | FormElementV2Tooltip>());

provide(CHECKBOX_GROUP_INJECTION_KEY, {
  reportError: (id, error) => {
    if (error) {
      childErrors.value.set(id, error);
    } else {
      childErrors.value.delete(id);
    }
  },
  unregister: (id) => {
    childErrors.value.delete(id);
  },
});

const groupError = computed(() => Array.from(childErrors.value.values())[0]);

const { formElementV2Props: legacyFormElementProps } = useLegacyFormElementProps({
  props: computed(() => ({
    ...props,
    message: undefined,
    success: undefined,
  })),
  errorMessages: computed(() => undefined),
});

const formElementV2Props = computed(() => ({
  ...legacyFormElementProps.value,
  message: props.message,
  success: props.success,
  error: groupError.value,
  skeleton: false,
  label: { label: props.label, hidden: true },
}));

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

const checkboxes = useTemplateRef("checkboxes");

defineExpose({
  inputs: computed<HTMLInputElement[]>(() => {
    const array = asArray(checkboxes.value);
    return array.flatMap((checkbox) => checkbox?.input).filter((checkbox) => !!checkbox);
  }),
});
</script>

<template>
  <OnyxFormElementV2
    v-bind="formElementV2Props"
    class="onyx-component onyx-checkbox-group"
    unstyled
    role="group"
    :aria-label="props.label"
    :aria-invalid="groupError ? 'true' : undefined"
  >
    <fieldset class="onyx-checkbox-group__fieldset" :disabled="disabled">
      <legend v-if="!props.hideLabel" class="onyx-checkbox-group__label">
        <OnyxHeadline is="h3">
          {{ props.label }}
        </OnyxHeadline>
        <OnyxInfoTooltip v-if="props.labelTooltip" trigger="hover" :text="props.labelTooltip" />
      </legend>

      <div
        class="onyx-checkbox-group__content"
        :class="{
          'onyx-checkbox-group__content--horizontal': props.orientation === 'horizontal',
          'onyx-checkbox-group__content--vertical': props.orientation === 'vertical',
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
            ref="checkboxes"
            :error="option.error || props.error"
            :required-marker
            :disabled="disabled || option.disabled"
            :truncation="option.truncation ?? props.truncation"
            :model-value="modelValue.includes(option.value)"
            class="onyx-checkbox-group__option"
            @update:model-value="handleUpdate(option.value, $event)"
          />
        </template>

        <template v-else-if="typeof skeleton === 'number'">
          <OnyxCheckbox
            v-for="i in skeleton"
            :id="`skeleton-${i}`"
            :key="i"
            :label="`Skeleton ${i}`"
            :value="`skeleton-${i}`"
            skeleton
          />
        </template>
      </div>
    </fieldset>
  </OnyxFormElementV2>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-checkbox-group {
  @include layers.component() {
    --onyx-form-element-v2-padding-block: 0;
    $check-all-border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);

    &__fieldset {
      padding: 0;
      border: none;
      width: max-content;
      max-width: 100%;
      min-width: unset;
    }

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

        .onyx-checkbox-group__check-all {
          width: 100%;
          border-bottom: $check-all-border;
        }
      }

      &--horizontal {
        flex-flow: row wrap;
        column-gap: var(--onyx-density-xl);

        .onyx-checkbox-group__check-all {
          border-right: $check-all-border;

          // the horizontal "Select all" checkbox label needs an additional padding-right
          .onyx-form-element-v2__label {
            padding-right: var(--onyx-density-md);
          }
        }
      }
    }
  }
}
</style>
