<script lang="ts" setup>
import { useForwardProps } from "../../utils/props.js";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import type { OnyxDatePickerProps } from "../OnyxDatePicker/types.js";
import { FORM_INJECTED_SYMBOL } from "../OnyxForm/OnyxForm.core.js";
import OnyxDatePicker from "./OnyxDatePicker.vue";

const props = withDefaults(defineProps<OnyxDatePickerProps & { bottomBar: boolean }>(), {
  showError: FORM_INJECTED_SYMBOL,
});

const datePickerProps = useForwardProps(props, OnyxDatePicker);
</script>

<template>
  <OnyxDatePicker v-bind="datePickerProps">
    <template v-if="props.bottomBar" #bottomBar>
      <OnyxButton label="Close" mode="plain" color="neutral" />
      <OnyxButton label="Save" />
    </template>
  </OnyxDatePicker>
</template>
