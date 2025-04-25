<script lang="ts" setup>
import moreVertical from "@sit-onyx/icons/more-vertical.svg?raw";
import { toRef } from "vue";
import { useDensity } from "../../composables/density";
import { useRelativeTimeFormat } from "../../composables/useRelativeTimeFormat";
import { injectI18n } from "../../i18n";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxFlyoutMenu from "../OnyxNavBar/modules/OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxSystemButton from "../OnyxSystemButton/OnyxSystemButton.vue";
import type { OnyxNotificationCardProps } from "./types";

const props = defineProps<OnyxNotificationCardProps>();

const slots = defineSlots<{
  /**
   * Notification content/description.
   */
  default(): unknown;
  /**
   * Optional custom footer actions/buttons.
   */
  actions?(): unknown;
  /**
   * Optional custom header actions to display inside a flyout menu.
   * Will only be shown when hovering the notification card or focussing via keyboard.
   * You must only put [OnyxMenuItem](http://localhost:6006/?path=/docs/navigation-modules-menuitem--docs) components here.
   */
  headerActions?: unknown;
}>();

const { densityClass } = useDensity(props);
const { d, t } = injectI18n();
const { timeAgo } = useRelativeTimeFormat({
  time: toRef(props, "createdAt"),
  options: { numeric: "auto" },
});
</script>

<template>
  <div :class="['onyx-component', 'onyx-notification-card', densityClass]">
    <div class="onyx-notification-card__content">
      <div>
        <div class="onyx-notification-card__header">
          <div class="onyx-notification-card__header-container">
            <OnyxIcon v-if="props.icon" class="onyx-notification-card__icon" :icon="props.icon" />
            <OnyxHeadline is="h3">{{ props.headline }}</OnyxHeadline>
          </div>

          <div class="onyx-notification-card__header-container">
            <OnyxBadge v-if="props.unread" dot />

            <OnyxFlyoutMenu
              v-if="!!slots.headerActions"
              class="onyx-notification-card__more-actions"
              :label="t('notificationCard.moreActions')"
              trigger="click"
            >
              <template #button="{ trigger }">
                <OnyxSystemButton
                  v-bind="trigger"
                  :label="t('notificationCard.toggleActions')"
                  :icon="moreVertical"
                />
              </template>

              <template #options>
                <slot name="headerActions"></slot>
              </template>
            </OnyxFlyoutMenu>
          </div>
        </div>

        <div class="onyx-notification-card__created-at onyx-text--small">
          <span>{{ d(props.createdAt, "datetime-local") }}</span>
          <span>{{ timeAgo }}</span>
        </div>
      </div>

      <p class="onyx-notification-card__description onyx-text onyx-truncation-multiline">
        <slot></slot>
      </p>

      <div v-if="!!slots.actions" class="onyx-notification-card__actions onyx-density-compact">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/mixins/visibility.scss";

.onyx-notification-card {
  @include layers.component() {
    --onyx-notification-card-padding: var(--onyx-density-md);
    font-family: var(--onyx-font-family);
    padding: var(--onyx-notification-card-padding);
    background-color: var(--onyx-color-base-background-blank);
    max-width: 100%;

    &__content {
      display: flex;
      flex-direction: column;
      gap: var(--onyx-density-md);
    }

    &:not(:first-of-type) {
      padding-top: 0;

      .onyx-notification-card__content {
        border-top: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
        padding-top: var(--onyx-notification-card-padding);
      }
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--onyx-density-md);
      margin-bottom: var(--onyx-density-2xs);
    }

    &__header-container {
      display: flex;
      gap: var(--onyx-density-xs);
      align-items: center;
      flex-wrap: wrap;
    }

    &__icon {
      color: var(--onyx-color-text-icons-neutral-medium);
    }

    &__more-actions {
      .onyx-flyout-menu__list {
        right: 0;
      }
    }

    &:not(&:hover, &:focus-within) {
      .onyx-notification-card__more-actions {
        @include visibility.visually-hidden();
      }
    }

    &__description {
      color: var(--onyx-color-text-icons-neutral-medium);
      white-space: pre-line;
    }

    &__actions {
      display: flex;
      align-items: center;
      gap: var(--onyx-density-xs);
      flex-wrap: wrap;
    }

    &__created-at {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--onyx-density-md);
      flex-wrap: wrap;
      color: var(--onyx-color-text-icons-neutral-soft);
    }
  }
}
</style>
