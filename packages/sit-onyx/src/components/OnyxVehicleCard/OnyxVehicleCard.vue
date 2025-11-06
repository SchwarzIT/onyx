<script lang="ts" setup>
import "@onyx-internal/digits-theme";
import {
  iconCalendar,
  iconChevronRightSmall,
  iconCircleCheck,
  iconClock,
  iconLocationPin,
} from "@sit-onyx/icons";
import OnyxBottomBar from "../OnyxBottomBar/OnyxBottomBar.vue";
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxCard from "../OnyxCard/OnyxCard.vue";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxImage from "../OnyxImage/OnyxImage.vue";
import OnyxTag from "../OnyxTag/OnyxTag.vue";
import bmwLogo from "./bmw.png";
import type { OnyxVehicleCardProps } from "./types.js";

const props = defineProps<OnyxVehicleCardProps>();
</script>

<template>
  <OnyxCard :density="props.density" :class="['onyx-vehicle-card']">
    <div class="onyx-vehicle-card__content">
      <div class="onyx-vehicle-card__header">
        <div class="onyx-vehicle-card__headline onyx-truncation-ellipsis">
          <OnyxIcon :icon="iconCircleCheck" color="success" />
          <OnyxHeadline is="h2" class="onyx-truncation-ellipsis"> Selected vehicle </OnyxHeadline>
        </div>

        <div class="onyx-vehicle-card__tags">
          <OnyxTag label="Performance" color="info" />
          <OnyxTag label="Sport" color="warning" />
        </div>
      </div>

      <div class="onyx-vehicle-card__body">
        <OnyxImage
          class="onyx-vehicle-card__image"
          :src="props.image"
          alt="Image of the vehicle"
          :width="290"
          :height="216"
          shape="rounded"
        />

        <div class="onyx-vehicle-card__details">
          <div class="onyx-vehicle-card__headline">
            <OnyxImage :src="bmwLogo" alt="BMW brand logo" :height="32" :width="32" />
            <OnyxHeadline is="h3" show-as="h1">{{ props.name }}</OnyxHeadline>
          </div>

          <div class="onyx-vehicle-card__lists">
            <ul>
              <li class="onyx-vehicle-card__list-label">Pickup</li>

              <li>
                <OnyxIcon :icon="iconLocationPin" />
                {{ props.pickup.location }}
              </li>

              <li>
                <OnyxIcon :icon="iconCalendar" />
                {{ props.pickup.date }}
              </li>

              <li>
                <OnyxIcon :icon="iconClock" />
                {{ props.pickup.time }}
              </li>
            </ul>

            <ul>
              <li class="onyx-vehicle-card__list-label">Return</li>

              <li>
                <OnyxIcon :icon="iconLocationPin" />
                {{ props.return.location }}
              </li>

              <li>
                <OnyxIcon :icon="iconCalendar" />
                {{ props.return.date }}
              </li>

              <li>
                <OnyxIcon :icon="iconClock" />
                {{ props.return.time }}
              </li>
            </ul>

            <ul></ul>
          </div>
        </div>
      </div>
    </div>

    <OnyxBottomBar class="onyx-vehicle-card__footer" density="compact">
      <template #left>
        <OnyxButton
          class="onyx-vehicle-card__details-btn"
          label="Show details"
          :icon="iconChevronRightSmall"
          icon-position="right"
          color="neutral"
          mode="plain"
        />
      </template>

      <OnyxButton label="Cancel" color="neutral" mode="plain" />
      <OnyxButton label="Reservation" mode="outline" />
    </OnyxBottomBar>
  </OnyxCard>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "../../styles/breakpoints.scss";

.onyx-vehicle-card {
  @include layers.component() {
    padding: 0;
    --onyx-card-gap: 0;
    max-width: 52rem;
    container-type: inline-size;
    border-radius: var(--onyx-radius-lg);
    background-color: var(--onyx-color-base-background-tinted);

    &__content {
      padding: var(--onyx-card-padding);
      display: flex;
      flex-direction: column;
      gap: var(--onyx-density-lg);

      @include breakpoints.container(max, xs) {
        .onyx-vehicle-card {
          &__body {
            flex-direction: column;
          }

          &__lists {
            flex-wrap: wrap;
          }

          &__image {
            width: 100%;
          }
        }
      }
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--onyx-density-sm);
    }

    &__tags {
      display: flex;
      align-items: center;
      gap: var(--onyx-density-xs);
    }

    &__headline {
      display: flex;
      align-items: center;
      gap: var(--onyx-density-xs);

      .onyx-image {
        background-color: transparent;
      }
    }

    &__body {
      display: flex;
      gap: var(--onyx-density-lg);
    }

    &__details {
      display: flex;
      flex-direction: column;
      gap: var(--onyx-density-lg);
      flex-grow: 1;
    }

    &__image {
      width: 33%;
    }

    &__footer {
      border-bottom-left-radius: inherit;
      border-bottom-right-radius: inherit;

      .onyx-bottom-bar__content {
        padding-inline: var(--onyx-card-padding);
      }
    }

    &__lists {
      display: flex;
      justify-content: space-between;
      gap: var(--onyx-density-md) var(--onyx-density-sm);

      ul {
        padding: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: var(--onyx-density-sm);
      }

      li {
        display: flex;
        align-items: center;
        gap: var(--onyx-density-xs);

        .onyx-icon {
          color: var(--onyx-color-text-icons-neutral-medium);
        }
      }
    }

    &__list-label {
      color: var(--onyx-color-text-icons-neutral-medium);
      color: var(--onyx-color-text-icons-neutral-medium, #697985);
      font-size: var(--onyx-font-size-sm);
      line-height: var(--onyx-font-line-height-sm);
    }

    &__details-btn {
      color: var(--onyx-color-text-icons-neutral-medium);

      .onyx-button__icon {
        --icon-size: 1rem;
      }

      .onyx-button__label {
        font-size: var(--onyx-font-size-sm);
        line-height: var(--onyx-font-line-height-sm);
      }
    }
  }
}
</style>
