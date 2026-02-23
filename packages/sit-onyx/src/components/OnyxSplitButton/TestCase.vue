<script setup lang="ts">
import { SKELETON_INJECTED_SYMBOL } from "../../composables/useSkeletonState.js";
import { FORM_INJECTED_SYMBOL } from "../OnyxForm/OnyxForm.core.js";
import OnyxMenuItem from "../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxSplitButton from "./OnyxSplitButton.vue";
import type { OnyxSplitButtonProps } from "./types.js";

const props = withDefaults(defineProps<OnyxSplitButtonProps>(), {
  color: "primary",
  mode: "default",
  skeleton: SKELETON_INJECTED_SYMBOL,
  disabled: FORM_INJECTED_SYMBOL,
  loading: false,
  trigger: "click",
  open: undefined,
});

const emit = defineEmits<{
  clicked: [name: string];
}>();
</script>

<template>
  <OnyxSplitButton v-bind="props" label="Option 1" @click="emit('clicked', 'Option 1')">
    <template #options>
      <OnyxMenuItem label="Option 2" @click="emit('clicked', 'Option 2')" />
      <OnyxMenuItem label="Option 3" @click="emit('clicked', 'Option 3')" />
    </template>
  </OnyxSplitButton>
</template>
