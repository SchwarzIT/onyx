<script lang="ts" setup>
import circleAttention from "@sit-onyx/icons/circle-attention.svg?raw";
import { computed } from "vue";
import { useDensity } from "../../composables/density.js";
import { useCustomValidity } from "../../composables/useCustomValidity.js";
import { useFileSize } from "../../composables/useFileSize.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { applyLimits } from "../../utils/numbers.js";
import { extractLinkProps } from "../../utils/router.js";
import OnyxCard from "../OnyxCard/OnyxCard.vue";
import OnyxFileTypeIcon from "../OnyxFileTypeIcon/OnyxFileTypeIcon.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxLink from "../OnyxLink/OnyxLink.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxFileCardProps } from "./types.js";

const props = withDefaults(defineProps<OnyxFileCardProps>(), {
  skeleton: SKELETON_INJECTED_SYMBOL,
});

const emit = defineEmits<{
  /**
   * Emitted when the validity state of the input changes.
   */
  validityChange: [validity: ValidityState];
}>();

const slots = defineSlots<{
  /**
   * Optional actions to show on the right side of the card.
   * Recommended to use the OnyxIconButton component here.
   */
  actions?(): unknown;
}>();

const { densityClass } = useDensity(props);
const { formatFileSize } = useFileSize();
const skeleton = useSkeletonContext(props);

const customError = computed(() =>
  props.status?.color === "danger" ? props.status.text : undefined,
);
const { vCustomValidity } = useCustomValidity({ props: {}, emit, customError });

const link = computed(() => {
  if (!props.link) return;
  return extractLinkProps(props.link);
});
</script>

<template>
  <OnyxSkeleton v-if="skeleton" :class="['onyx-file-card-skeleton', densityClass]" />

  <OnyxCard v-else :class="['onyx-component', 'onyx-file-card', densityClass]">
    <input
      v-custom-validity
      :aria-label="props.filename"
      tabindex="-1"
      class="onyx-file-card__show-error"
    />
    <div class="onyx-file-card__content">
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
    </div>
    <div v-if="props.status?.progress" class="onyx-file-card__progress">
      <div
        :class="[
          'onyx-file-card__progress-bar',
          `onyx-file-card__progress-bar--${props.status.color}`,
        ]"
        :style="{ width: applyLimits(props.status.progress, 0, 100) + '%' }"
      ></div>
    </div>
  </OnyxCard>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";
@use "./OnyxFileCard.scss";

.onyx-file-card,
.onyx-file-card-skeleton {
  @include layers.component() {
    // when changing these variables in the future, make sure to
    // also change them inside the OnyxFileUpload where OnyxFileCard.height() is used
    --onyx-card-padding: var(--onyx-density-xs);
    --onyx-file-card-icon-padding: var(--onyx-density-xs);
  }
}

.onyx-file-card-skeleton {
  @include layers.component() {
    width: 16rem;
    height: OnyxFileCard.height(
      $icon-padding: var(--onyx-file-card-icon-padding),
      $card-padding: var(--onyx-card-padding)
    );
  }
}

.onyx-file-card {
  @include layers.component() {
    position: relative;
    &__show-error {
      // position the input for the native error message & make it visually hidden
      bottom: var(--onyx-file-card-icon-padding);
      left: 50%;
      pointer-events: none;
      position: absolute;
      border: 0;
      height: 0;
      width: 0;
      outline: none;
    }
    &__content {
      display: flex;
      flex-direction: row;
      gap: var(--onyx-card-gap) var(--onyx-density-xl);
      justify-content: space-between;
    }

    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--onyx-radius-sm);
      border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
      background-color: var(--onyx-color-base-neutral-200);
      padding: var(--onyx-file-card-icon-padding);
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
      gap: var(--onyx-card-gap);
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
      gap: var(--onyx-density-md);
    }

    &__actions {
      display: flex;
      align-items: center;
      gap: var(--onyx-spacing-2xs);
    }

    &:hover {
      background-color: var(--onyx-color-base-background-tinted);
    }

    $colors: primary, neutral, danger, warning, success, info;
    &__status {
      @each $color in $colors {
        &--#{$color} {
          @if ($color == "neutral") {
            color: var(--onyx-color-text-icons-neutral-medium);
          } @else {
            color: var(--onyx-color-text-icons-#{$color}-intense);
          }
        }
      }
    }

    &:has(.onyx-file-card__progress) {
      padding-bottom: var(--onyx-density-md);
    }
    &__progress {
      height: calc(2 * var(--onyx-1px-in-rem));
      width: calc(100% + 2 * var(--onyx-file-card-icon-padding));
      transform: translateX(calc(-1 * var(--onyx-file-card-icon-padding)));
      background: var(--onyx-color-base-neutral-200);
      &-bar {
        height: 100%;
        transition: width 0.1s ease;
        @each $color in $colors {
          &--#{$color} {
            @if ($color == "neutral") {
              background-color: var(--onyx-color-base-neutral-400);
            } @else {
              background-color: var(--onyx-color-text-icons-#{$color}-intense);
            }
          }
        }
      }
    }
  }
}
</style>
