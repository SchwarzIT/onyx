<script lang="ts" setup>
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxNotificationMessage from "../OnyxNotificationMessage/OnyxNotificationMessage.vue";
import { useNotification } from "./useNotification.js";

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
    >
      {{ notification.description }}

      <template v-if="notification.buttons?.length" #buttons>
        <OnyxButton v-for="button in notification.buttons" :key="button.label" v-bind="button" />
      </template>
    </OnyxNotificationMessage>
  </dialog>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-notifications {
  @include layers.component() {
    --onyx-notifications-viewport-distance: var(--onyx-spacing-md);
    --onyx-notifications-gap: var(--onyx-spacing-2xs);
    --onyx-notifications-top: 0;
    padding: 0;
    border: none;
    background: none;
    z-index: var(--onyx-z-index-notification);

    position: fixed;
    top: var(--onyx-notifications-top);
    left: 100%;
    transform: translateX(-100%);
    overflow: auto;

    width: max-content;
    max-width: 100%;
    max-height: calc(
      100% - var(--onyx-notifications-viewport-distance) - var(--onyx-notifications-top)
    );

    // we are using margin on the individual notifications instead of gap/margin on the parent
    // so the box shadows of the notifications are not cut off
    .onyx-notification-message {
      margin: var(--onyx-notifications-gap) var(--onyx-notifications-viewport-distance);
      max-width: calc(100% - 2 * var(--onyx-notifications-viewport-distance));

      &:last-child {
        margin-bottom: 0;
      }
    }

    .onyx-component:has(.onyx-nav-bar):has(.onyx-notifications) & {
      --onyx-notifications-top: var(--onyx-nav-bar-height);
    }
  }
}
</style>
