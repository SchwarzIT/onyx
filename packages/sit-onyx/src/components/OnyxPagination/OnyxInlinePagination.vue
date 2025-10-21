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
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import OnyxVisuallyHidden from "../OnyxVisuallyHidden/OnyxVisuallyHidden.vue";
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

const hasReachedMin = computed(() => props.modelValue <= 1);
const hasReachedMax = computed(() => props.modelValue >= props.pages);

const displayPagesNumbers = computed<Array<number | string>>(() => {
  const currentPage = props.modelValue;
  const totalPages = props.pages;

  const pagesToShow = new Set<number>();

  pagesToShow.add(1);
  pagesToShow.add(totalPages);

  pagesToShow.add(currentPage);
  pagesToShow.add(currentPage - 1);
  pagesToShow.add(currentPage + 1);

  if (currentPage === 1) pagesToShow.add(3);
  if (currentPage === totalPages) pagesToShow.add(totalPages - 2);

  const uniqueSortedPages = Array.from(pagesToShow)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  const finalPages: Array<number | string> = [];
  let lastPageAdded: number | null = null;

  for (const page of uniqueSortedPages) {
    if (lastPageAdded !== null && page > lastPageAdded + 1) {
      finalPages.push("ellipsis");
    }
    finalPages.push(page);
    lastPageAdded = page;
  }
  return finalPages;
});
</script>

<template>
  <OnyxSkeleton v-if="skeleton" :class="['onyx-pagination-skeleton', 'onyx-text', densityClass]" />

  <div
    v-else
    :class="[
      'onyx-component',
      'onyx-pagination',
      'onyx-pagination__inline',
      'onyx-text',
      densityClass,
    ]"
    role="group"
    :aria-label="t('pagination.label')"
    :style="{ '--onyx-pagination-character-count': props.modelValue.toString().length }"
  >
    <button
      class="onyx-pagination__inline__button"
      :aria-label="t('pagination.previous')"
      type="button"
      :disabled="props.disabled || hasReachedMin"
      @click="emit('update:modelValue', props.modelValue - 1)"
    >
      <OnyxIcon :icon="iconChevronLeftSmall" />
    </button>
    <template v-for="pageNumber in displayPagesNumbers" :key="`page-${pageNumber}`">
      <button
        v-if="typeof pageNumber === 'number'"
        :class="[
          'onyx-pagination__inline__button',
          { 'onyx-pagination__inline__button--active': pageNumber === props.modelValue },
        ]"
        :aria-label="t('pagination.buttonLabel', { page: pageNumber })"
        type="button"
        :disabled="props.disabled"
        @click="emit('update:modelValue', pageNumber)"
      >
        {{ pageNumber }}
      </button>
      <div
        v-else
        :class="['onyx-pagination__inline__ellipsis']"
        :aria-label="t('pagination.ellipsis')"
      >
        <span aria-hidden="true">&hellip;</span>
        <OnyxVisuallyHidden>
          {{ t("pagination.ellipsis") }}
        </OnyxVisuallyHidden>
      </div>
    </template>

    <button
      class="onyx-pagination__inline__button"
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

.onyx-pagination__inline {
  @include layers.component() {
    background-color: var(--onyx-color-base-background-blank);

    &__button,
    &__ellipsis {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: var(--onyx-pagination-padding-vertical);
      height: var(--onyx-pagination-height);
      border: var(--onyx-pagination-border-size) solid var(--onyx-color-component-border-neutral);
      border-left: none;
      background-color: inherit;
      color: inherit;
      aspect-ratio: 1;
    }
    &__ellipsis {
      cursor: default;
    }
    &__button {
      cursor: pointer;
      color: var(--onyx-color-text-icons-neutral-medium);

      &:first-of-type {
        border-radius: var(--onyx-radius-sm) 0 0 var(--onyx-radius-sm);
        border-left: var(--onyx-pagination-border-size) solid
          var(--onyx-color-component-border-neutral);
      }
      &:last-of-type {
        border-radius: 0 var(--onyx-radius-sm) var(--onyx-radius-sm) 0;
      }

      &:hover,
      &:focus-visible {
        color: var(--onyx-color-text-icons-neutral-intense);
      }

      &:hover {
        background-color: var(--onyx-color-base-neutral-200);
      }

      &:focus-visible {
        z-index: 1;
        background-color: var(--onyx-color-base-neutral-200);
        outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
      }
      &:active {
        background-color: var(--onyx-color-base-background-blank);
      }

      &--active {
        background-color: var(--onyx-color-base-primary-100);
        color: var(--onyx-color-text-icons-primary-intense);

        &:hover {
          background-color: var(--onyx-color-base-primary-200);
          color: var(--onyx-color-text-icons-primary-intense);
        }
        &:focus-visible {
          background-color: var(--onyx-color-base-primary-300);
          color: var(--onyx-color-text-icons-neutral-inverted);
        }
        &:active {
          background-color: var(--onyx-color-base-primary-100);
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
