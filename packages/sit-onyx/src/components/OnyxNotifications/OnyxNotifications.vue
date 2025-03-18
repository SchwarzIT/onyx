<script lang="ts" setup>
import OnyxNotificationMessage from "../OnyxNotificationMessage/OnyxNotificationMessage.vue";
import { useNotification } from "./useNotification";

const notificationProvider = useNotification();
</script>

<!-- eslint-disable vue/no-root-v-if -->
<template>
  <dialog
    v-if="notificationProvider.notifications.value.length"
    class="onyx-component onyx-notifications"
    role="presentation"
    aria-live="polite"
    open
  >
    <OnyxNotificationMessage
      v-for="{ id, ...notification } in notificationProvider.notifications.value"
      :key="id"
      v-bind="notification"
    />
  </dialog>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-notifications {
  @include layers.component() {
    $margin-bottom: var(--onyx-spacing-xl);

    padding: 0;
    border: none;
    background: none;
    z-index: var(--onyx-z-index-notification);

    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    overflow: auto;

    width: max-content;
    max-width: 100%;
    max-height: calc(100% - $margin-bottom);

    // we are using margin on the individual toasts instead of gap/margin on the parent
    // so the box shadows of the toasts are not cut off
    // .onyx-toast-message {
    //   $margin-inline: var(--onyx-grid-margin);
    //   margin: var(--onyx-spacing-2xs) $margin-inline;
    //   max-width: calc(100% - 2 * $margin-inline);

    //   &:last-child {
    //     margin-bottom: $margin-bottom;
    //   }
    // }
  }
}
</style>
