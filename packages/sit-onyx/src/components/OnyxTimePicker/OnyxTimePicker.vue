<script lang="ts">
/**
 * @experimental
 * @deprecated This component is still under active development and its API might change in patch releases.
 */
export default {};
</script>

<script lang="ts" setup>
import { SKELETON_INJECTED_SYMBOL } from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import { useForwardProps } from "../../utils/props.js";
import { FORM_INJECTED_SYMBOL } from "../OnyxForm/OnyxForm.core.js";
import OnyxTimeInput from "./OnyxTimeInput.vue";
import OnyxTimeSelect from "./OnyxTimeSelect.vue";
import type { OnyxTimePickerProps, TimePickerType } from "./types.js";

const props = withDefaults(defineProps<OnyxTimePickerProps<TimePickerType>>(), {
  showSeconds: false,
  required: false,
  autocapitalize: "sentences",
  readonly: false,
  requiredMarker: FORM_INJECTED_SYMBOL,
  reserveMessageSpace: FORM_INJECTED_SYMBOL,
  disabled: FORM_INJECTED_SYMBOL,
  showError: FORM_INJECTED_SYMBOL,
  skeleton: SKELETON_INJECTED_SYMBOL,
  disableManualResize: false,
  type: "default" as TimePickerType,
  open: undefined,
});

const emit = defineEmits<{
  "update:modelValue": [value?: string];
  "update:open": [open: boolean];
}>();
const modelValue = useVModel({ props, emit, key: "modelValue" });
const open = useVModel({ props, emit, key: "open", default: false });

const input = useForwardProps(props, OnyxTimeInput);
const select = useForwardProps(props, OnyxTimeSelect);
</script>

<template>
  <div class="onyx-component">
    <OnyxTimeSelect
      v-if="props.type === 'select'"
      v-bind="select"
      v-model="modelValue"
      v-model:open="open"
    />
    <OnyxTimeInput v-else v-bind="input" v-model="modelValue" v-model:open="open" />
  </div>
</template>
