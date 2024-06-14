<script lang="ts" setup>
import OnyxDialog from "../OnyxDialog/OnyxDialog.vue";
import type { ColorSchemeValue, OnyxColorSchemeDialogProps } from "./types";

const props = withDefaults(defineProps<OnyxColorSchemeDialogProps>(), {
  open: false,
});

defineEmits<{
  "update:modelValue": [value: ColorSchemeValue];
}>();
</script>

<template>
  <OnyxDialog v-bind="props">
    <p>Test</p>
    Hello world
  </OnyxDialog>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-color-scheme-dialog {
  @include layers.component() {
  }
}
</style>
