<script lang="ts">
/**
 * @experimental
 * @deprecated This component is still under active development and its API might change in patch releases.
 */
export default {};
</script>

<script lang="ts" setup generic="TType extends TimePickerType">
import { SKELETON_INJECTED_SYMBOL } from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import { useForwardProps } from "../../utils/props.js";
import { FORM_INJECTED_SYMBOL } from "../OnyxForm/OnyxForm.core.js";
import OnyxTimeInput from "./OnyxTimeInput.vue";
import OnyxTimeSelect from "./OnyxTimeSelect.vue";
import type { OnyxTimePickerProps, TimePickerType } from "./types.js";

const props = withDefaults(defineProps<OnyxTimePickerProps<TType>>(), {
  showSeconds: false,
  required: false,
  readonly: false,
  requiredMarker: FORM_INJECTED_SYMBOL,
  reserveMessageSpace: FORM_INJECTED_SYMBOL,
  disabled: FORM_INJECTED_SYMBOL,
  showError: FORM_INJECTED_SYMBOL,
  skeleton: SKELETON_INJECTED_SYMBOL,
  type: () => "default" as TType,
  open: undefined,
});

const emit = defineEmits<{
  /**
   * Emitted when current value changes.
   */
  "update:modelValue": [value?: string];
  /**
   * Emitted when the open state changes.
   */
  "update:open": [open: boolean];
}>();

const modelValue = useVModel({ props, emit, key: "modelValue" });
const open = useVModel({ props, emit, key: "open", default: false });

const inputProps = useForwardProps(props, OnyxTimeInput);
const selectProps = useForwardProps(props, OnyxTimeSelect);
</script>

<template>
  <div class="onyx-component">
    <OnyxTimeSelect
      v-if="props.type === 'select'"
      v-bind="selectProps"
      v-model="modelValue"
      v-model:open="open"
      :label="props.label"
    />
    <OnyxTimeInput
      v-else
      v-bind="inputProps"
      v-model="modelValue"
      v-model:open="open"
      :label="props.label"
    />
  </div>
</template>
