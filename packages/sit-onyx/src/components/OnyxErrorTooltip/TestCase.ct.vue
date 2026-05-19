<script lang="ts" setup>
import type { FormMessages } from "../../composables/useFormElementError.js";
import OnyxErrorTooltip from "./OnyxErrorTooltip.vue";

const props = defineProps<{
  errorMessages?: FormMessages;
  disabled?: boolean;
}>();
</script>

<template>
  <OnyxErrorTooltip v-bind="props">
    <template #default="{ trigger }">
      <button v-bind="trigger" type="button">Dummy button</button>
    </template>
  </OnyxErrorTooltip>
</template>
