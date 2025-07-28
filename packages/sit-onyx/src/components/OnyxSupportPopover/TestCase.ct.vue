<script lang="ts" setup>
import { onBeforeUnmount } from "vue";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxSupportPopover from "./OnyxSupportPopover.vue";
import type { OnyxSupportPopoverProps } from "./types.js";

const props = defineProps<
  OnyxSupportPopoverProps & { forceUnsupported?: boolean; forceHeight?: boolean }
>();

const globalCSS = window.CSS;

if (props.forceUnsupported) {
  Object.defineProperty(window, "CSS", { value: undefined });
}

onBeforeUnmount(() => {
  window.CSS = globalCSS;
});
</script>

<template>
  <div class="wrapper">
    <OnyxSupportPopover v-bind="props">
      <template #trigger="{ trigger }">
        <OnyxButton v-bind="trigger" label="Trigger" />
      </template>

      <div class="dialog" :style="{ height: props.forceHeight ? '24rem' : undefined }">
        This is example content
      </div>
    </OnyxSupportPopover>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  padding: 4rem 12rem;
}

.dialog {
  background-color: var(--onyx-color-base-info-200);
}
</style>
