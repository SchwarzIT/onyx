<script lang="ts" setup>
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import type { OnyxNotificationDotProps } from "./types";

const props = withDefaults(defineProps<OnyxNotificationDotProps>(), {
  color: "warning",
  hidden: false,
});

defineSlots<{
  /**
   * Main content where the dot will be positioned in relation to.
   */
  default(): unknown;
}>();
</script>

<template>
  <div class="onyx-component onyx-notification-dot">
    <slot></slot>
    <OnyxBadge class="onyx-notification-dot__badge" :color="props.color" dot />
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-notification-dot {
  @include layers.component() {
    --onyx-notification-dot-position: calc(
      var(--onyx-notification-dot-offset, 0rem) - var(--onyx-density-3xs)
    );
    position: relative;
    width: max-content;
    max-width: 100%;

    &__badge {
      position: absolute;
      top: var(--onyx-notification-dot-position);
      right: var(--onyx-notification-dot-position);
    }

    &:has(> .onyx-icon-button) {
      // density-xs = icon button padding
      --onyx-notification-dot-offset: var(--onyx-density-xs);
    }
  }
}
</style>
