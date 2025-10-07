<script lang="ts" setup>
import { useDensity } from "sit-onyx";
import type { OnyxTiptapEditorProps } from "./types.js";

const props = defineProps<OnyxTiptapEditorProps>();

const { densityClass } = useDensity(props);
</script>

<template>
  <div :class="['onyx-component', 'onyx-tiptap-editor', densityClass]">
    OnyxTiptapEditor.vue works!
  </div>
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
