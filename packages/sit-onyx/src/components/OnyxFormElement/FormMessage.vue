<script setup lang="ts">
import type { FormMessages } from "../../composables/useCustomValidity.js";
import OnyxInfoTooltip from "../OnyxInfoTooltip/OnyxInfoTooltip.vue";
import OnyxVisuallyHidden from "../OnyxVisuallyHidden/OnyxVisuallyHidden.vue";

const props = defineProps<{
  /**
   * Message to display.
   */
  messages: FormMessages;
  /**
   * How the message should be colored and displayed.
   */
  type: "danger" | "success" | "neutral";
}>();
</script>

<template>
  <component
    :is="messages.hidden ? OnyxVisuallyHidden : 'span'"
    :class="['onyx-component', 'onyx-form-message', `onyx-form-message__${props.type}`]"
  >
    <span :class="['onyx-truncation-ellipsis']">
      {{ props.messages.shortMessage }}
    </span>
    <OnyxInfoTooltip
      v-if="props.messages.longMessage"
      class="onyx-form-message__tooltip"
      position="bottom"
      open="hover"
      :color="props.type"
      :text="props.messages.longMessage"
    />
  </component>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-form-message {
  @include layers.component() {
    display: inline-flex;
    gap: var(--onyx-spacing-2xs);
  }
}
</style>
