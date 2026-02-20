<script lang="ts" setup>
import { type OnyxStarterKitOptions, OnyxStarterKit } from "./extensions/starterKit.js";
import OnyxTextEditor from "./OnyxTextEditor.vue";
import type { OnyxTextEditorProps } from "./types.js";

const props = defineProps<
  OnyxTextEditorProps & {
    options?: OnyxStarterKitOptions;
  }
>();
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
}
</style>
