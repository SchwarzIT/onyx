<script setup lang="ts">
import { iconChevronLeftSmall, iconChevronRightSmall } from "@sit-onyx/icons";
import { computed, ref, watch } from "vue";
import { useDensity } from "../../composables/density.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { injectI18n } from "../../i18n/index.js";
import { normalizedIncludes } from "../../utils/strings.js";
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

const searchTerm = ref("");

const hasReachedMin = computed(() => props.modelValue <= 1);
const hasReachedMax = computed(() => props.modelValue >= props.pages);

const allOptions = computed(() =>
  Array.from({ length: props.pages }, (_, index) => {
    const pageNumber = index + 1;
    return {
      label: pageNumber.toString(),
      value: pageNumber,
    } satisfies SelectOption;
  }),
);

const pageSize = 100;
const optionsToRender = ref(pageSize);
watch(searchTerm, () => (optionsToRender.value = pageSize));

const filteredOptions = computed(() => {
  let options = allOptions.value;

  const search = searchTerm.value.trim().toLowerCase();
  if (search) {
    options = options.filter((option) => normalizedIncludes(option.label, search));
  }

  return options.slice(0, optionsToRender.value);
});

const handleLoadMore = () => {
  optionsToRender.value = Math.min(props.pages, optionsToRender.value + pageSize);
};

const valueLabel = computed(() =>
  t.value("pagination.currentOfTotalPages", {
    current: props.modelValue,
    total: props.pages,
    n: props.pages,
  }),
);
</script>

<template>
  <OnyxSkeleton
    v-if="skeleton"
    :class="[
      'onyx-pagination-skeleton',
      'onyx-pagination-skeleton--compact',
      'onyx-text',
      densityClass,
    ]"
  />
  <div
    v-else
    :class="[
      'onyx-component',
      'onyx-pagination',
      'onyx-pagination--compact',
      'onyx-text',
      densityClass,
    ]"
    role="group"
    :aria-label="t('pagination.label')"
    :style="{ '--onyx-pagination-character-count': valueLabel.length }"
  >
    <button
      class="onyx-pagination__button"
      :aria-label="t('pagination.previous')"
      type="button"
      :disabled="props.disabled || hasReachedMin"
      @click="emit('update:modelValue', props.modelValue - 1)"
    >
      <OnyxIcon :icon="iconChevronLeftSmall" />
    </button>

    <OnyxSelect
      v-model:search-term="searchTerm"
      class="onyx-pagination__select"
      :style="{ '--onyx-pagination-character-count': valueLabel.length }"
      :label="t('pagination.select.label')"
      :list-label="t('pagination.select.listLabel')"
      :options="filteredOptions"
      :model-value="props.modelValue"
      :disabled="props.disabled || props.pages <= 1 || props.disableFlyout"
      :value-label="valueLabel"
      :lazy-loading="{ enabled: true }"
      alignment="left"
      hide-label
      with-search
      no-filter
      @update:model-value="$event != undefined && emit('update:modelValue', $event)"
      @lazy-load="handleLoadMore"
    />

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

.onyx-pagination-skeleton.onyx-pagination-skeleton--compact {
  @include layers.component() {
    // 2 buttons, each is 1.5rem wide + left/right padding + select width
    width: calc(
      2 * (1.5rem + 2 * var(--onyx-pagination-padding-vertical)) +
        (5.5rem + 2 * var(--onyx-pagination-padding-vertical))
    );
  }
}

.onyx-pagination {
  @include layers.component() {
    &--compact {
      .onyx-pagination__button:first-of-type {
        border-radius: var(--onyx-pagination-border-radius) 0 0 var(--onyx-pagination-border-radius);
      }

      .onyx-pagination__button:last-of-type {
        border-left: unset;

        &:focus-visible {
          margin-left: var(--onyx-outline-width);
          border-left: var(--onyx-pagination-border-size) solid
            var(--onyx-color-component-border-neutral);
        }
      }

      .onyx-pagination__select {
        .onyx-select-input__wrapper {
          border-radius: 0;
        }

        .onyx-select-input__button {
          display: none;
        }

        .onyx-select-input__native {
          text-align: center;
        }
      }

      // fix for button outlines
      &:has(.onyx-pagination__button:first-of-type:focus-visible) {
        .onyx-select-input__wrapper {
          border-left: none;
        }

        .onyx-select-input__native {
          margin-left: calc(-1 * var(--onyx-outline-width));
        }
      }

      &:has(.onyx-pagination__button:last-of-type:focus-visible) {
        .onyx-select-input__wrapper {
          border-right: none;
        }

        .onyx-select-input__native {
          margin-right: calc(-1 * var(--onyx-outline-width));
        }
      }
    }
  }
}
</style>
