<script lang="ts" setup>
import { FORM_INJECTED_SYMBOL } from "sit-onyx";
import { type OnyxStarterKitOptions, OnyxStarterKit } from "./extensions/starterKit.js";
import OnyxTextEditor from "./OnyxTextEditor.vue";
import type { OnyxTextEditorProps } from "./types.js";

const props = withDefaults(
  defineProps<
    OnyxTextEditorProps & {
      options?: OnyxStarterKitOptions;
    }
  >(),
  {
    showError: FORM_INJECTED_SYMBOL,
  },
);
</script>

<template>
  <OnyxTextEditor
    class="editor"
    v-bind="props"
    :extensions="[OnyxStarterKit.configure(props.options)]"
  />
</template>

<style lang="scss" scoped>
.editor {
  width: max-content;

  // ensures tooltips / dialogs are part of the screenshots
  padding-top: 1rem;

  &:has(.onyx-basic-popover__dialog:popover-open) {
    padding-right: 10rem;
    padding-bottom: 10rem;
  }
}
</style>
