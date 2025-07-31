<script lang="ts" setup>
import { iconChevronLeftSmall, iconChevronRightSmall } from "@sit-onyx/icons";
import { computed } from "vue";
import { useDensity } from "../../composables/density.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { injectI18n } from "../../i18n/index.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSelect from "../OnyxSelect/OnyxSelect.vue";
import type { SelectOption } from "../OnyxSelect/types.js";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxPaginationProps } from "./types.js";

const props = withDefaults(defineProps<OnyxPaginationProps>(), {
  skeleton: SKELETON_INJECTED_SYMBOL,
});

const emit = defineEmits<{
  /**
   * Emitted when the selected page changes.
   */
  "update:modelValue": [page: number];
}>();

const { t } = injectI18n();
const { densityClass } = useDensity(props);
const skeleton = useSkeletonContext(props);

const selectOptions = computed(() => {
  return Array.from({ length: props.pages }, (_, index) => {
    const pageNumber = index + 1;
    return {
      label: pageNumber.toString(),
      value: pageNumber,
    } satisfies SelectOption;
  });
});

const hasReachedMin = computed(() => props.modelValue <= 1);
const hasReachedMax = computed(() => props.modelValue >= props.pages);
</script>

<template>
  <OnyxSkeleton v-if="skeleton" :class="['onyx-pagination-skeleton', 'onyx-text', densityClass]" />

  <div
    v-else
    :class="['onyx-component', 'onyx-pagination', 'onyx-text', densityClass]"
    role="group"
    :aria-label="t('pagination.label')"
    :style="{ '--onyx-pagination-character-count': props.modelValue.toString().length }"
  >
    <!-- value label is used to still show the current page if its grater than the page count -->
    <OnyxSelect
      class="onyx-pagination__select"
      :label="t('pagination.select.label')"
      :list-label="t('pagination.select.listLabel')"
      :options="selectOptions"
      :model-value="props.modelValue"
      :value-label="props.modelValue.toString()"
      hide-label
      :disabled="props.disabled || props.pages <= 1"
      alignment="left"
      with-search
      @update:model-value="
        emit('update:modelValue', $event as (typeof selectOptions)[number]['value'])
      "
    />

    <div class="onyx-pagination__count">
      {{ t("pagination.ofPages", { n: props.pages }) }}
    </div>

    <button
      class="onyx-pagination__button"
      :aria-label="t('pagination.previous')"
      type="button"
      :disabled="props.disabled || hasReachedMin"
      @click="emit('update:modelValue', props.modelValue - 1)"
    >
      <OnyxIcon :icon="iconChevronLeftSmall" />
    </button>

    <button
      class="onyx-pagination__button"
      :aria-label="t('pagination.next')"
      type="button"
      :disabled="props.disabled || hasReachedMax"
      @click="emit('update:modelValue', props.modelValue + 1)"
    >
      <OnyxIcon :icon="iconChevronRightSmall" />
    </button>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-pagination,
.onyx-pagination-skeleton {
  @include layers.component() {
    --onyx-pagination-padding-vertical: var(--onyx-density-xs);
    --onyx-pagination-height: calc(1lh + 2 * var(--onyx-pagination-padding-vertical));
  }
}

.onyx-pagination-skeleton {
  @include layers.component() {
    height: var(--onyx-pagination-height);
    width: 16rem;
  }
}

.onyx-pagination {
  @include layers.component() {
    --onyx-pagination-border-size: var(--onyx-1px-in-rem);
    --onyx-pagination-character-count: 1;

    display: flex;
    align-items: flex-start;
    color: var(--onyx-color-text-icons-neutral-intense);
    font-family: var(--onyx-font-family);
    height: var(--onyx-pagination-height);
    width: max-content;
    max-width: 100%;

    &__select {
      min-width: 5rem;

      .onyx-select-input__wrapper {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        justify-content: space-between;

        $hover-selector: "&:has(.onyx-select-input__native:enabled:read-write):hover";
        $focus-selector: "&:has(.onyx-select-input__native:enabled:focus, .onyx-select-input__native--show-focus)";

        #{$focus-selector},
        #{$hover-selector} {
          background-color: var(--onyx-color-base-neutral-200);
          --border-color: unset;
        }

        // select input chevron icon color
        .onyx-select-input__button {
          color: var(--onyx-color-text-icons-neutral-medium);
        }

        #{$hover-selector},
        #{$focus-selector} {
          .onyx-select-input__button {
            color: var(--onyx-color-text-icons-neutral-intense);
          }
        }
      }

      .onyx-select-input__native {
        // support growing select based on current page character count
        width: calc(var(--onyx-pagination-character-count) * 1ch);
      }
    }

    &__count {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: var(--onyx-pagination-padding-vertical) var(--onyx-density-sm);
      height: var(--onyx-pagination-height);
      border: 0 solid var(--onyx-color-component-border-neutral);
      border-width: var(--onyx-pagination-border-size) 0;
      text-align: center;
      color: var(--onyx-color-text-icons-neutral-soft);
      background-color: var(--onyx-color-base-background-tinted);
      width: max-content;
      max-width: 100%;
    }

    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: var(--onyx-pagination-padding-vertical);
      height: var(--onyx-pagination-height);
      background-color: var(--onyx-color-base-background-blank);
      border: var(--onyx-pagination-border-size) solid var(--onyx-color-component-border-neutral);
      color: inherit;

      &:first-of-type {
        &:not(:focus-visible) {
          border-right: none;
        }

        &:focus-visible + .onyx-pagination__button {
          border-left: none;
        }
      }

      &:last-of-type {
        border-radius: 0 var(--onyx-radius-sm) var(--onyx-radius-sm) 0;
      }

      &:enabled {
        cursor: pointer;
        color: var(--onyx-color-text-icons-neutral-medium);

        &:hover,
        &:focus-visible {
          color: var(--onyx-color-text-icons-neutral-intense);
        }

        &:hover {
          background-color: var(--onyx-color-base-neutral-200);
        }

        &:focus-visible {
          background-color: var(--onyx-color-base-neutral-200);
          outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);

          // the right outline of the first button would be cut off / not visible
          // so we use this little trick here to add margin-right and reduce the left padding
          // of the second button so it does not change in size visually
          &:first-of-type {
            margin-right: var(--onyx-outline-width);

            + .onyx-pagination__button {
              padding-left: calc(
                var(--onyx-pagination-padding-vertical) - var(--onyx-outline-width)
              );
            }
          }
        }

        &:active {
          background-color: var(--onyx-color-base-background-blank);
        }
      }

      &:disabled {
        background-color: var(--onyx-color-base-background-tinted);
        color: var(--onyx-color-text-icons-neutral-soft);
      }
    }
  }
}
</style>
