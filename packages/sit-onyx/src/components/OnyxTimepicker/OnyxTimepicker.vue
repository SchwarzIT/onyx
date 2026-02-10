<script lang="ts" setup>
import { SKELETON_INJECTED_SYMBOL } from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import { useForwardProps } from "../../utils/props.js";
import { FORM_INJECTED_SYMBOL } from "../OnyxForm/OnyxForm.core.js";
import OnyxTimeInput from "./OnyxTimeInput.vue";
import OnyxTimeSelect from "./OnyxTimeSelect.vue";
import type { OnyxTimepickerProps, TimepickerType } from "./types.js";

const props = withDefaults(defineProps<OnyxTimepickerProps<TimepickerType>>(), {
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
  type: "default" as TimepickerType,
});

const emit = defineEmits<{
  "update:modelValue": [value?: string];
}>();
const modelValue = useVModel({ props, emit, key: "modelValue" });
const input = useForwardProps(props, OnyxTimeInput);
const select = useForwardProps(props, OnyxTimeSelect);
</script>

<template>
  <div class="onyx-component">
    <OnyxTimeInput v-if="props.type === 'default'" v-bind="input" v-model="modelValue" />
    <OnyxTimeSelect v-else v-bind="select" v-model="modelValue" />
  </div>
</template>
