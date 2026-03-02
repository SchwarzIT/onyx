<script lang="ts" setup>
import { FORM_INJECTED_SYMBOL } from "../OnyxForm/OnyxForm.core.js";
import OnyxFormElementV2 from "./OnyxFormElementV2.vue";
import type { OnyxFormElementV2Props, OnyxFormElementV2Slots } from "./types.js";

const props = withDefaults(
  defineProps<OnyxFormElementV2Props & { placeholder?: string; modelValue?: string }>(),
  {
    showError: FORM_INJECTED_SYMBOL,
  },
);

const slots = defineSlots<OnyxFormElementV2Slots>();
</script>

<template>
  <OnyxFormElementV2 v-bind="props">
    <template #default="inputProps">
      <input v-bind="inputProps" :placeholder="props.placeholder" :value="props.modelValue" />
    </template>

    <template v-if="slots.leading" #leading>
      <slot name="leading"></slot>
    </template>

    <template v-if="slots.leadingIcons" #leadingIcons>
      <slot name="leadingIcons"></slot>
    </template>

    <template v-if="slots.trailingIcons" #trailingIcons>
      <slot name="trailingIcons"></slot>
    </template>

    <template v-if="slots.trailing" #trailing>
      <slot name="trailing"></slot>
    </template>

    <template v-if="slots.bottomRight" #bottomRight>
      <slot name="bottomRight"></slot>
    </template>

    <template v-if="slots.popover" #popover>
      <slot name="popover"></slot>
    </template>
  </OnyxFormElementV2>
</template>
