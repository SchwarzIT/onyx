<script setup lang="ts">
import { ref } from "vue";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxFlyout from "./OnyxFlyout.vue";
import type { OnyxFlyoutProps } from "./types";

const props = defineProps<
  OnyxFlyoutProps & {
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
  <OnyxFlyout
    :label="props.label"
    :open="props.open ? isExpanded : undefined"
    :alignment="props.alignment"
    :position="props.position"
    :disabled="props.disabled"
  >
    <template #default="{ trigger, disabled: _disabled }">
      <OnyxButton v-bind="trigger" label="button" type="button" :disabled="_disabled">
        Open</OnyxButton
      >
    </template>
    <template #content>
      <div label="content">Flyout Content</div>
    </template>
  </OnyxFlyout>
</template>
