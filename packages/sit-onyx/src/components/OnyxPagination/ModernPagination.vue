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
   * Emitted when the selected page changes. Value is the zero-based page index.
   */
  "update:modelValue": [pageIndex: number];
}>();

const { t } = injectI18n();
const { densityClass } = useDensity(props);

const selectOptions = computed(() => {
  return Array.from({ length: props.pages }, (_, index) => {
    return {
      label: (index + 1).toString(),
      value: index,
    } satisfies SelectOption;
  });
});

const hasReachedMin = computed(() => props.modelValue <= 0);
const hasReachedMax = computed(() => props.modelValue >= props.pages - 1);
</script>

<template>
  <div :class="['onyx-pagination', densityClass]" role="group" :aria-label="t('pagination.label')">
    <!-- value label is used to still show the current page if its grater than the page count -->
    <OnyxSelect
      class="onyx-pagination__select"
      label="Page selection"
      list-label="Available pages"
      :options="selectOptions"
      :model-value="props.modelValue"
      :value-label="(props.modelValue + 1).toString()"
      hide-label
      :disabled="props.pages <= 1"
      @update:model-value="
        emit('update:modelValue', $event as (typeof selectOptions)[number]['value'])
      "
    />

    <div class="onyx-pagination__count onyx-text">
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
    display: flex;
    align-items: center;
    color: var(--onyx-color-text-icons-neutral-intense);
    font-family: var(--onyx-font-family);

    &__select {
      width: 5rem;

      .onyx-select-input__wrapper {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }

    $border-size: var(--onyx-1px-in-rem);

    &__count {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: calc(var(--onyx-density-xs) - $border-size) var(--onyx-density-sm);
      border: $border-size solid var(--onyx-color-base-neutral-300);
      border-left: none;
      text-align: center;
      color: var(--onyx-color-text-icons-neutral-soft);
      background-color: var(--onyx-color-base-background-tinted);
    }

    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: calc(var(--onyx-density-xs) - $border-size) var(--onyx-density-xs);
      background-color: var(--onyx-color-base-background-blank);
      border: $border-size solid var(--onyx-color-base-neutral-300);
      border-left: none;
      color: inherit;

      &:enabled {
        cursor: pointer;

        &:hover {
          background-color: var(--onyx-color-base-neutral-200);
        }

        &:focus-visible {
          background-color: var(--onyx-color-base-neutral-200);
        }
      }

      &:disabled {
        background-color: var(--onyx-color-base-background-tinted);
        color: var(--onyx-color-text-icons-neutral-soft);
      }

      &:last-child {
        border-radius: 0 var(--onyx-radius-sm) var(--onyx-radius-sm) 0;
      }
    }
  }
}
</style>
