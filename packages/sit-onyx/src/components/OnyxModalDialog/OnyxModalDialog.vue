<script lang="ts" setup>
import { useDensity } from "../../composables/density";
import OnyxDialog from "../OnyxDialog/OnyxDialog.vue";
import type { OnyxModalDialogProps } from "./types";

const props = defineProps<OnyxModalDialogProps>();

const { densityClass } = useDensity(props);
</script>

<template>
  <OnyxDialog v-bind="props" :class="['onyx-modal-dialog', densityClass]" modal></OnyxDialog>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-modal-dialog {
  @include layers.component() {
  }
}
</style>
