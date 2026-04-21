<script lang="ts" setup>
import { computed } from "vue";
import { SKELETON_INJECTED_SYMBOL } from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import { useForwardProps } from "../../utils/props.js";
import type { FormElementV2LabelOptions } from "../OnyxFormElementV2/types.js";
import OnyxSelect from "../OnyxSelect/OnyxSelect.vue";
import type { SelectOption } from "../OnyxSelect/types.js";
import { type OnyxItemsPerPageProps } from "./types.js";

const props = withDefaults(defineProps<OnyxItemsPerPageProps>(), {
  labelAlignment: "right",
  skeleton: SKELETON_INJECTED_SYMBOL,
});

const emit = defineEmits<{
  /**
   * Emitted when the value changes
   */
  "update:modelValue": [value: number];
}>();

const { t } = injectI18n();
const selectProps = useForwardProps(props, OnyxSelect);

/**
 * Current value of the input.
 */
const modelValue = useVModel({
  key: "modelValue",
  props,
  emit,
});

const selectOptions = computed<SelectOption<number>[]>(() =>
  props.options.map((option) => ({ label: option.toString(), value: option })),
);

const labelOptions = computed<FormElementV2LabelOptions>(() => {
  return {
    label: t.value("itemsPerPage.label"),
    position: "right",
    ...props.label,
  };
});
</script>

<template>
  <OnyxSelect
    v-bind="selectProps"
    v-model="modelValue"
    :options="selectOptions"
    :label="labelOptions"
    :list-label="t('itemsPerPage.select.listLabel')"
    class="onyx-items-per-page"
    :style="{ '--onyx-items-per-page-character-count': modelValue.toString().length }"
    hide-clear-icon
  />
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/text.scss";

.onyx-items-per-page {
  @include layers.component() {
    // support growing select based on current page character count
    --onyx-form-element-v2-input-width: #{text.ch(var(--onyx-items-per-page-character-count))};
    width: max-content;

    .onyx-form-element-v2__content-skeleton {
      width: 5rem;
    }

    .onyx-form-element-v2__body {
      width: max-content;
    }

    .onyx-form-element-v2__label {
      overflow: hidden;
    }
  }
}
</style>
