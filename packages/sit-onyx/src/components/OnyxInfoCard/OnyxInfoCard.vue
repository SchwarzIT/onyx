<script lang="ts" setup>
import { iconCircleAttention, iconMoreVertical, iconXSmall } from "@sit-onyx/icons";
import { computed } from "vue";
import { useDensity } from "../../composables/density.js";
import { injectI18n } from "../../i18n/index.js";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxFlyoutMenu from "../OnyxNavBar/modules/OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxSystemButton from "../OnyxSystemButton/OnyxSystemButton.vue";
import type { OnyxInfoCardProps } from "./types.js";

const props = withDefaults(defineProps<OnyxInfoCardProps>(), {
  color: "info",
  closable: false,
  icon: iconCircleAttention,
});

const emit = defineEmits<{
  /**
   * Emitted when the close button is clicked (`closable` property must be enabled).
   */
  close: [];
}>();

const slots = defineSlots<{
  /**
   * Slot to provide description / further information.
   */
  default?(): unknown;
  /**
   * Slot to provide optional buttons/actions.
   */
  buttons?(): unknown;
  /**
   * Optional custom header actions to display inside a flyout menu.
   * Note that the `closable` property will not have any effect when custom header actions are set.
   * Please provide a close menu item manually via the header actions then.
   * You must only put [OnyxMenuItem](https://storybook.onyx.schwarz/?path=/docs/basic-menuitem--docs) components here.
   */
  headerActions?(): unknown;
}>();

const { t } = injectI18n();
const { densityClass } = useDensity(props);

const systemButtonColor = computed(() => (props.color === "neutral" ? "soft" : "medium"));
</script>

<template>
  <div
    :class="['onyx-component', 'onyx-info-card', `onyx-info-card--${props.color}`, densityClass]"
  >
    <OnyxIcon v-if="props.icon" class="onyx-info-card__icon" :icon="props.icon" />

    <div class="onyx-info-card__content">
      <OnyxHeadline
        is="h3"
        v-if="props.headline"
        class="onyx-info-card__headline onyx-truncation-multiline"
      >
        {{ props.headline }}
      </OnyxHeadline>

      <OnyxFlyoutMenu
        v-if="slots.headerActions"
        class="onyx-info-card__action"
        :label="t('notificationCard.moreActions')"
        trigger="click"
        alignment="right"
      >
        <template #button="{ trigger }">
          <OnyxSystemButton
            v-bind="trigger"
            :label="t('notificationCard.toggleActions')"
            :icon="iconMoreVertical"
            :color="systemButtonColor"
          />
        </template>

        <template #options>
          <slot name="headerActions"></slot>
        </template>
      </OnyxFlyoutMenu>

      <OnyxSystemButton
        v-else-if="props.closable"
        class="onyx-info-card__close onyx-info-card__action"
        :icon="iconXSmall"
        :label="t('close')"
        :color="systemButtonColor"
        @click="emit('close')"
      />

      <p v-if="!!slots.default" class="onyx-info-card__description onyx-text--small">
        <slot></slot>
      </p>

      <div v-if="!!slots.buttons" class="onyx-info-card__buttons onyx-density-compact">
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-info-card {
  @include layers.component() {
    --onyx-info-card-padding: var(--onyx-density-md);
    display: flex;
    gap: var(--onyx-density-md);
    padding: var(--onyx-info-card-padding) var(--onyx-density-2xl) var(--onyx-info-card-padding)
      var(--onyx-info-card-padding);

    border-radius: var(--onyx-radius-md);
    border: var(--onyx-1px-in-rem) solid var(--onyx-info-card-border-color);
    background-color: var(--onyx-info-card-background);
    color: var(--onyx-color-text-icons-neutral-intense);
    font-family: var(--onyx-font-family);
    max-width: 100%;
    position: relative;

    &__headline,
    &__icon {
      color: var(--onyx-info-card-headline-color);
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: var(--onyx-density-2xs);
      white-space: pre-line;
    }

    &__buttons {
      display: flex;
      flex-wrap: wrap;
      gap: var(--onyx-density-xs);
    }

    &__action {
      position: absolute;
      top: var(--onyx-info-card-padding);
      right: var(--onyx-info-card-padding);
    }

    $colors: info, neutral, success, warning, danger, primary;

    @each $color in $colors {
      &--#{$color} {
        --onyx-info-card-background: var(--onyx-color-base-#{$color}-200);
        --onyx-info-card-border-color: var(--onyx-color-base-#{$color}-300);

        @if $color == "neutral" {
          --onyx-info-card-headline-color: var(--onyx-color-text-icons-#{$color}-intense);
        } @else {
          --onyx-info-card-headline-color: var(--onyx-color-text-icons-#{$color}-bold);
        }
      }
    }
  }
}
</style>
