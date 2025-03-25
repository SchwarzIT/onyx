<script lang="ts" setup>
import moreVertical from "@sit-onyx/icons/more-vertical.svg?raw";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import OnyxFlyoutMenu from "../OnyxNavBar/modules/OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxMenuItem from "../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxSystemButton from "../OnyxSystemButton/OnyxSystemButton.vue";
import type { NotificationCardMoleculeProps } from "./types";

const { t } = useI18n();

defineSlots<{
  default(): unknown;
}>();

const emit = defineEmits<{
  markedAsRead: [];
  delete: [];
}>();

const props = defineProps<NotificationCardMoleculeProps>();

// eslint-disable-next-line vue/no-setup-props-reactivity-loss
const isRead = ref(props.isRead);

const markAsRead = () => {
  emit("markedAsRead");
  isRead.value = true;
};
</script>

<template>
  <div
    class="onyx-component notification-card"
    role="button"
    tabindex="0"
    :class="{ 'is-read': isRead }"
    @keydown.enter="markAsRead()"
    @click="markAsRead()"
  >
    <div class="headline">
      <div>{{ props.subject }}</div>
      <div class="headline-notification">
        <div class="notification-indicator"></div>
        <OnyxFlyoutMenu label="Actions">
          <template #button="{ trigger }">
            <OnyxSystemButton v-bind="trigger" label="Toggle actions" :icon="moreVertical" />
          </template>

          <template #options>
            <OnyxMenuItem @click="emit('delete')">{{ t("delete") }}</OnyxMenuItem>
          </template>
        </OnyxFlyoutMenu>
      </div>
    </div>
    <div class="sub-headline">
      <div>{{ props.createdAtFormatted }}</div>
      <div>{{ props.createdTimeAgoFormatted }}</div>
    </div>
    <slot></slot>
    <div class="divider"></div>
  </div>
</template>

<style lang="scss">
.notification-card {
  width: 100%;

  &:hover {
    .headline {
      .headline-notification {
        .notification-indicator {
          margin-right: 0.5rem;
        }

        :nth-child(2) {
          display: block;
          flex-direction: column;
        }
      }
    }
  }
}

.notification-card:not(:last-child) > .divider {
  height: 1px;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: var(--onyx-color-base-neutral-200);
}

.notification-card.is-read {
  .headline-notification {
    .notification-indicator {
      display: none;
    }
  }
}

.headline {
  display: flex;
  justify-content: space-between;

  div {
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.5rem;
    color: var(--onyx-color-text-icons-neutral-intense);
  }

  .headline-notification {
    display: flex;
    align-items: center;

    .notification-indicator {
      border-radius: var(--onyx-radius-full);
      background-color: var(--onyx-color-base-primary-500);
      width: 0.5rem;
      height: 0.5rem;
    }

    :nth-child(2) {
      display: none;
    }
  }
}

.sub-headline {
  color: var(--onyx-color-text-icons-neutral-soft);
  padding: 0.25rem 0 1rem 0;
  display: flex;
  font-size: 0.8125rem;
  line-height: 1.25rem;
  justify-content: space-between;
}

.notification-actions {
  display: flex;
  margin-top: 1rem;
}
</style>

<i18n>
{
  "en": {
    "delete": "Delete"
  },
  "de": {
    "delete": "Löschen"
  }
}
</i18n>
