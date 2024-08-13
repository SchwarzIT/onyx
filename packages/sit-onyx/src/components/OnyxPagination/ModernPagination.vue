<script lang="ts" setup>
import chevronLeftSmall from "@sit-onyx/icons/chevron-left-small.svg?raw";
import chevronRightSmall from "@sit-onyx/icons/chevron-right-small.svg?raw";
import { computed } from "vue";
import { useDensity } from "../../composables/density";
import { injectI18n } from "../../i18n";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSelect from "../OnyxSelect/OnyxSelect.vue";
import type { SelectOption } from "../OnyxSelect/types";
import type { OnyxPaginationProps } from "./types";

const props = defineProps<OnyxPaginationProps>();

const emit = defineEmits<{
  /**
   * Emitted when the selected page changes.
   */
  "update:modelValue": [page: number];
}>();

const { t } = injectI18n();
const { densityClass } = useDensity(props);

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
  <div
    :class="['onyx-pagination', 'onyx-text', densityClass]"
    role="group"
    :aria-label="t('pagination.label')"
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
      :disabled="props.pages <= 1"
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
      :disabled="hasReachedMin"
      @click="emit('update:modelValue', props.modelValue - 1)"
    >
      <OnyxIcon :icon="chevronLeftSmall" />
    </button>

    <button
      class="onyx-pagination__button"
      :aria-label="t('pagination.next')"
      type="button"
      :disabled="hasReachedMax"
      @click="emit('update:modelValue', props.modelValue + 1)"
    >
      <OnyxIcon :icon="chevronRightSmall" />
    </button>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-pagination {
  @include layers.component() {
    --onyx-pagination-padding-vertical: var(--onyx-density-xs);
    --onyx-pagination-border-size: var(--onyx-1px-in-rem);
    --onyx-pagination-height: calc(1lh + 2 * var(--onyx-pagination-padding-vertical));

    display: flex;
    align-items: center;
    color: var(--onyx-color-text-icons-neutral-intense);
    font-family: var(--onyx-font-family);
    height: var(--onyx-pagination-height);

    &__select {
      width: 5rem;

      .onyx-select-input__wrapper {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }

    &__count {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: var(--onyx-pagination-padding-vertical);
      height: var(--onyx-pagination-height);
      border: 0 solid var(--onyx-color-base-neutral-300);
      border-width: var(--onyx-pagination-border-size) 0;
      text-align: center;
      color: var(--onyx-color-text-icons-neutral-soft);
      background-color: var(--onyx-color-base-background-tinted);
    }

    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: var(--onyx-pagination-padding-vertical);
      height: var(--onyx-pagination-height);
      background-color: var(--onyx-color-base-background-blank);
      border: var(--onyx-pagination-border-size) solid var(--onyx-color-base-neutral-300);
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

        &:hover {
          background-color: var(--onyx-color-base-neutral-200);
        }

        &:focus-visible {
          background-color: var(--onyx-color-base-neutral-200);
          outline: 0.25rem solid var(--onyx-color-base-primary-200);
          border-color: var(--onyx-color-base-primary-500);
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
