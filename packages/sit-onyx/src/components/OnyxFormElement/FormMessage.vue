<script setup lang="ts">
import type { FormMessages } from "../../composables/useCustomValidity";
import OnyxInfoTooltip from "../OnyxInfoTooltip/OnyxInfoTooltip.vue";

const props = defineProps<{
  /**
   * Message to display.
   */
  messages: FormMessages;
  /**
   * How the message should be colored and displayed.
   */
  type: "error" | "success" | "info";
}>();
</script>

<template>
  <span
    :class="['onyx-form-message', `onyx-form-message__${props.type}`, 'onyx-truncation-ellipsis']"
  >
    {{ props.messages.shortMessage }}
  </span>
  <OnyxInfoTooltip
    v-if="props.messages.longMessage"
    class="onyx-form-message__tooltip"
    position="bottom"
    open="hover"
    :text="props.messages.longMessage"
  />
</template>

<style lang="scss">
.onyx-form-message {
  &__tooltip {
    margin-left: var(--onyx-spacing-2xs);
  }
}
</style>
