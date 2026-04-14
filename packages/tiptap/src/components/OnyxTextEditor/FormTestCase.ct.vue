<script lang="ts" setup>
import { FORM_INJECTED_SYMBOL } from "sit-onyx";
import OnyxTextEditor from "./OnyxTextEditor.vue";
import type { OnyxTextEditorProps } from "./types.js";

const props = withDefaults(defineProps<OnyxTextEditorProps>(), {
  showError: FORM_INJECTED_SYMBOL,
});

const emit = defineEmits<{
  submit: [];
  "update:modelValue": [string];
}>();
</script>

<template>
  <form @submit.prevent="emit('submit')">
    <OnyxTextEditor v-bind="props" @update:model-value="emit('update:modelValue', $event)" />
    <button type="submit">Submit</button>
  </form>
</template>
