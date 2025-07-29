<script lang="ts" setup>
import circleAttention from "@sit-onyx/icons/circle-attention.svg?raw";
import { computed } from "vue";
import { useDensity } from "../../composables/density.js";
import { useFileSize } from "../../composables/useFileSize.js";
import { extractLinkProps } from "../../utils/router.js";
import OnyxCard from "../OnyxCard/OnyxCard.vue";
import OnyxFileTypeIcon from "../OnyxFileTypeIcon/OnyxFileTypeIcon.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxLink from "../OnyxLink/OnyxLink.vue";
import type { OnyxFileCardProps } from "./types.js";

const props = defineProps<OnyxFileCardProps>();

const slots = defineSlots<{
  /**
   * Optional actions to show on the right side of the card.
   * Recommended to use the OnyxIconButton component here.
   */
  actions?(): unknown;
}>();

const { densityClass } = useDensity(props);
const { formatFileSize } = useFileSize();

const link = computed(() => {
  if (!props.link) return;
  return extractLinkProps(props.link);
});
</script>

<template>
  <OnyxCard :class="['onyx-component', 'onyx-file-card', densityClass]">
    <div class="onyx-file-card__wrapper onyx-truncation-ellipsis">
      <div class="onyx-file-card__icon" aria-hidden="true">
        <OnyxIcon v-if="props.icon" :icon="props.icon" />
        <OnyxIcon v-else-if="props.status?.color === 'danger'" :icon="circleAttention" />
        <OnyxFileTypeIcon v-else :type="props.type" />
      </div>

      <div class="onyx-text--small onyx-truncation-ellipsis">
        <div class="onyx-file-card__name onyx-truncation-ellipsis">
          <OnyxLink
            v-if="link"
            :href="link?.href"
            :target="link?.target ?? '_blank'"
            :with-external-icon="false"
            class="onyx-truncation-ellipsis"
          >
            {{ props.filename }}
          </OnyxLink>
          <template v-else>{{ props.filename }}</template>
        </div>

        <div class="onyx-file-card__details onyx-truncation-ellipsis">
          <div class="onyx-file-card__size">
            {{ formatFileSize(props.size) }}
          </div>

          <span
            v-if="props.status"
            :class="[
              'onyx-file-card__status',
              `onyx-file-card__status--${props.status.color}`,
              'onyx-truncation-ellipsis',
            ]"
          >
            {{ props.status.text }}
          </span>
        </div>
      </div>
    </div>

    <div v-if="!!slots.actions" class="onyx-file-card__actions">
      <slot name="actions"></slot>
    </div>
  </OnyxCard>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-file-card {
  @include layers.component() {
    --onyx-card-padding: var(--onyx-density-xs);
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--onyx-card-gap) var(--onyx-density-xl);
    justify-content: space-between;

    &__icon {
      border-radius: var(--onyx-radius-sm);
      border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
      background-color: var(--onyx-color-base-neutral-200);
      padding: var(--onyx-density-xs);
    }

    &:has(.onyx-file-card__status--danger) {
      .onyx-file-card__icon {
        background-color: var(--onyx-color-base-danger-100);
        border-color: var(--onyx-color-base-danger-300);
        color: var(--onyx-color-text-icons-danger-intense);
      }
    }

    &__name {
      font-weight: var(--onyx-font-weight-semibold);

      .onyx-link {
        display: block;

        &:not(:hover, :focus-visible) {
          text-decoration: none;
          color: inherit;
        }
      }
    }

    &__wrapper {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--onyx-density-md);
    }

    &:has(&__name .onyx-link:focus-within) {
      outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);

      .onyx-file-card__name {
        .onyx-link {
          outline: none;
        }
      }
    }

    &__size {
      color: var(--onyx-color-text-icons-neutral-medium);
    }

    &__details {
      display: flex;
      align-items: center;
      gap: var(--onyx-card-gap);
    }

    &__status {
      $colors: primary, neutral, danger, warning, success, info;

      @each $color in $colors {
        &--#{$color} {
          color: var(--onyx-color-text-icons-#{$color}-intense);
        }
      }
    }

    &__actions {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--onyx-spacing-2xs);
    }

    &:hover {
      background-color: var(--onyx-color-base-background-tinted);
    }
  }
}
</style>
