<script lang="ts">
/**
 * @experimental
 * @deprecated This component is still under active development and its API might change in patch releases.
 */
export default {};
</script>

<script lang="ts" setup generic="TType extends TimePickerType">
import { computed, useTemplateRef } from "vue";
import { SKELETON_INJECTED_SYMBOL } from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import { useForwardProps } from "../../utils/props.js";
import { FORM_INJECTED_SYMBOL } from "../OnyxForm/OnyxForm.core.js";
import DefaultTimePicker from "./DefaultTimePicker.vue";
import RangeTimePicker from "./RangeTimePicker.vue";
import SelectTimePicker from "./SelectTimePicker.vue";
import type { OnyxTimePickerProps, OnyxTimePickerSlots, TimePickerType } from "./types.js";

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
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
}>();

const slots = defineSlots<OnyxTimePickerSlots>();

const modelValue = useVModel({ props, emit, key: "modelValue" });
const open = useVModel({ props, emit, key: "open", default: false });

const { locale } = injectI18n();

const defaultProps = useForwardProps(props, DefaultTimePicker);
const selectProps = useForwardProps(props, SelectTimePicker);
const rangeProps = useForwardProps(props, RangeTimePicker);

const showAmPm = computed(() => {
  if (props.showAmPm !== "auto") return props.showAmPm;
  return new Intl.DateTimeFormat(locale.value, { hour: "numeric" }).resolvedOptions().hour12;
});

const timePicker = useTemplateRef("timePicker");
const select = useTemplateRef("select");
const range = useTemplateRef("range");
const input = computed(() => timePicker.value?.input || select.value?.input || range.value?.input);
defineExpose({ input });
</script>

<!-- eslint-disable sitOnyx/require-root-class -- added internally -->
<template>
  <!-- TODO: check validityChange event -->
  <DefaultTimePicker
    v-if="props.type === 'default'"
    ref="timePicker"
    v-bind="defaultProps"
    v-model="modelValue"
    :label="props.label"
    :show-am-pm
    @validity-change="emit('validityChange', $event)"
  >
    <template v-for="(slot, slotName) in slots" :key="slotName" #[slotName]>
      <slot :name="slotName">
        <component :is="slot"></component>
      </slot>
    </template>
  </DefaultTimePicker>

  <SelectTimePicker
    v-else-if="props.type === 'select'"
    ref="select"
    v-bind="selectProps"
    v-model="modelValue"
    v-model:open="open"
    :label="props.label"
    :show-am-pm
    @validity-change="emit('validityChange', $event)"
  >
    <template v-for="(slot, slotName) in slots" :key="slotName" #[slotName]>
      <slot :name="slotName">
        <component :is="slot"></component>
      </slot>
    </template>
  </SelectTimePicker>

  <RangeTimePicker
    v-else-if="props.type === 'range'"
    ref="range"
    v-bind="rangeProps"
    v-model="modelValue"
    v-model:open="open"
    :label="props.label"
    :show-am-pm
    @validity-change="emit('validityChange', $event)"
  >
    <template v-for="(slot, slotName) in slots" :key="slotName" #[slotName]>
      <slot :name="slotName">
        <component :is="slot"></component>
      </slot>
    </template>
  </RangeTimePicker>
</template>
