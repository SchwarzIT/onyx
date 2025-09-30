<script setup lang="ts">
import { ref } from "vue";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxBasicPopover from "./OnyxBasicPopover.vue";
import type { OnyxBasicPopoverProps } from "./types.js";

const props = defineProps<
  OnyxBasicPopoverProps & {
    /**
     * If Button is shown
     */
    showExpandedButton?: boolean;
  }
>();
const isExpanded = ref(true);
</script>

<template>
  <OnyxButton
    v-if="showExpandedButton"
    class="onyx-component"
    type="button"
    label="changeExpandedButton"
    @click="isExpanded = !isExpanded"
  >
    Change Expanded
  </OnyxButton>
  <OnyxBasicPopover
    :label="props.label"
    :open="props.open ? isExpanded : undefined"
    :alignment="props.alignment"
    :position="props.position"
    :disabled="props.disabled"
    :clipping="props.clipping"
  >
    <template #default="{ trigger }">
      <OnyxButton v-bind="trigger" label="button" type="button"> Open</OnyxButton>
    </template>
    <template #content>
      <div label="content">Popover Content</div>
    </template>
  </OnyxBasicPopover>
  <!-- Extra Space to test clipping -->
  <div v-if="props.clipping" class="space"></div>
</template>

<style lang="scss">
.space {
  height: 50rem;
}
</style>
