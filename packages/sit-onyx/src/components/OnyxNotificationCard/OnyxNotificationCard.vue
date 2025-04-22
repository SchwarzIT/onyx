<script lang="ts" setup>
import moreVerticalSmall from "@sit-onyx/icons/more-vertical-small.svg?raw";
import { toRef } from "vue";
import { useDensity } from "../../composables/density";
import { useRelativeTimeFormat } from "../../composables/useRelativeTimeFormat";
import { injectI18n } from "../../i18n";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxFlyoutMenu from "../OnyxNavBar/modules/OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxMenuItem from "../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxSystemButton from "../OnyxSystemButton/OnyxSystemButton.vue";
import type { OnyxNotificationCardProps } from "./types";

const props = defineProps<OnyxNotificationCardProps>();

const emit = defineEmits<{
  /**
   * Emitted when the dialog should be closed.
   */
  option: [string];
}>();

const slots = defineSlots<{
  /**
   * Notification content/description.
   */
  default(): unknown;
  /**
   * Optional custom actions/buttons.
   */
  actions?(): unknown;
}>();

const { densityClass } = useDensity(props);
const { d } = injectI18n();
const { timeAgo } = useRelativeTimeFormat({
  time: toRef(props, "createdAt"),
  options: { numeric: "auto" },
});
</script>

<template>
  <div :class="['onyx-component', 'onyx-notification-card', densityClass]">
    <div class="onyx-notification-card__content">
      <div class="onyx-notification-card__header">
        <div class="onyx-notification-card__headline">
          <OnyxHeadline is="h3">{{ props.headline }}</OnyxHeadline>
          <div class="onyx-notification-card__system-button">
            <OnyxBadge v-if="props.unread" dot />
            <OnyxFlyoutMenu v-if="!!props.options" label="">
              <template #button="{ trigger }">
                <OnyxSystemButton v-bind="trigger" :icon="moreVerticalSmall" label="" />
              </template>

              <template #options>
                <OnyxMenuItem
                  v-for="menuItem in props.options"
                  :key="menuItem.key"
                  @click="emit('option', menuItem.key)"
                  >{{ menuItem.label }}</OnyxMenuItem
                > </template
              >4
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

.onyx-notification-card:hover {
  .onyx-notification-card__system-button {
    > .onyx-flyout-menu {
      display: block;
      height: 1.4375rem;

      .onyx-flyout-menu__list {
        right: 0;
      }
    }
  }
}

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
      flex-direction: column;
      gap: var(--onyx-density-2xs);
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

    &__headline {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--onyx-density-md);
    }
  }

  &__system-button {
    display: flex;
    align-items: center;

    .onyx-flyout-menu {
      display: none;
    }
  }
}
</style>
