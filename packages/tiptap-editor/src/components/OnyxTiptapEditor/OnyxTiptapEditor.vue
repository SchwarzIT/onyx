<script lang="ts" setup>
import { FORM_INJECTED_SYMBOL, OnyxTextarea, SKELETON_INJECTED_SYMBOL } from "sit-onyx";
import { computed, useTemplateRef } from "vue";
import type { OnyxTiptapEditorProps } from "./types.js";

const props = withDefaults(defineProps<OnyxTiptapEditorProps>(), {
  required: false,
  autocapitalize: "sentences",
  readonly: false,
  requiredMarker: FORM_INJECTED_SYMBOL,
  disabled: FORM_INJECTED_SYMBOL,
  showError: FORM_INJECTED_SYMBOL,
  skeleton: SKELETON_INJECTED_SYMBOL,
  disableManualResize: false,
});

const textarea = useTemplateRef("textareaRef");
defineExpose({ input: computed(() => textarea.value?.input) });
</script>

<template>
  <OnyxTextarea ref="textareaRef" class="onyx-tiptap-editor" v-bind="props" />
</template>

<style lang="scss">
@use "sit-onyx/src/styles/mixins/layers.scss";

.onyx-tiptap-editor {
  @include layers.component() {
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
  }
}
</style>
