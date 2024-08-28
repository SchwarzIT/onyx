<script lang="ts" setup>
import { computed } from "vue";
import OnyxInput from "../OnyxInput/OnyxInput.vue";
import type { InputType, OnyxInputProps } from "../OnyxInput/types";
import type { DatepickerType, OnyxDatepickerProps } from "./types";

const props = withDefaults(defineProps<OnyxDatepickerProps>(), {
  modelValue: "",
  type: "date",
  required: false,
  readonly: false,
  disabled: false,
  loading: false,
  skeleton: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the current value changes.
   */
  "update:modelValue": [value?: string];
  /**
   * Emitted when the current value changes but only when the input is blurred.
   */
  change: [value?: string];
  /**
   * Emitted when the input is focussed.
   */
  focus: [];
  /**
   * Emitted when the input is blurred.
   */
  blur: [];
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
}>();

const TYPE_CONVERTERS: Record<
  DatepickerType,
  {
    toDate: (value: string) => string;
    toString: (value: string) => string;
  }
> = {
  date: {
    toDate: (value: string) => new Date(value).toISOString(),
    toString: (value: string) => new Date(value).toISOString().split("T")[0],
  },
  month: {
    toDate: (value) => {
      const [year, month] = value.split("-").map((i) => +i);
      const date = new Date();
      date.setFullYear(year, month - 1, 1);
      date.setHours(0, 0, 0, 0);
      return date.toISOString();
    },
    toString: (value) => {
      const date = new Date(value);
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
    },
  },
  "datetime-local": {
    toDate: (value) => value,
    toString: (value) => value,
  },
  time: {
    toDate: (value) => {
      const [hours, minutes] = value.split(":").map((i) => +i);
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return date.toISOString();
    },
    toString: (value) => {
      const date = new Date(value);
      return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    },
  },
  week: {
    toDate: (value) => value,
    toString: (value) => value,
  },
};

const convertInputValueToString = (value: string, method: "toDate" | "toString") => {
  return TYPE_CONVERTERS[props.type][method](value);
};

const inputProps = computed(() => {
  return {
    ...props,
    type: props.type as InputType,
    modelValue: props.modelValue
      ? convertInputValueToString(props.modelValue, "toString")
      : undefined,
  } satisfies OnyxInputProps;
});
</script>

<template>
  <OnyxInput
    v-bind="inputProps"
    @update:model-value="emit('update:modelValue', convertInputValueToString($event, 'toDate'))"
    @change="emit('change', convertInputValueToString($event, 'toDate'))"
    @focus="emit('focus')"
    @blur="emit('blur')"
    @validity-change="emit('validityChange', $event)"
  />
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-datepicker {
  @include layers.component() {
  }
}
</style>
