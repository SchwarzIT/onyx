<script lang="ts">
/**
 * @experimental
 * @deprecated This component is still under active development and its API might change in patch releases.
 */
export default {};
</script>

<script lang="ts" setup>
import { computed, useId } from "vue";
import { useDensity } from "../../composables/density.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import OnyxSelect from "../OnyxSelect/OnyxSelect.vue";
import type { SelectOption } from "../OnyxSelect/types.js";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import { type OnyxItemsPerPageProps } from "./types.js";

const props = withDefaults(defineProps<OnyxItemsPerPageProps>(), {
  labelAlignment: "right",
  skeleton: SKELETON_INJECTED_SYMBOL,
});

const emit = defineEmits<{
  /**
   * Emitted when the value changes
   */
  "update:modelValue": [value: number];
}>();

const { t } = injectI18n();
const { densityClass } = useDensity(props);
const skeleton = useSkeletonContext(props);

/**
 * Current value of the input.
 */
const modelValue = useVModel({
  key: "modelValue",
  props,
  emit,
});

const selectOptions = computed<SelectOption<number>[]>(() =>
  props.options.map((option) => ({ label: option.toString(), value: option })),
);

const id = useId();
</script>

<template>
  <OnyxSkeleton
    v-if="skeleton"
    :class="['onyx-items-per-page-skeleton', 'onyx-text', densityClass]"
  />
  <div
    v-else
    :class="[
      'onyx-component',
      'onyx-items-per-page',
      { 'onyx-items-per-page--reverse': props.labelAlignment === 'left' },
      densityClass,
    ]"
    :style="{ '--onyx-items-per-page-character-count': modelValue.toString().length }"
  >
    <OnyxSelect
      :id="id"
      v-model="modelValue"
      :options="selectOptions"
      :disabled="props.disabled"
      hide-label
      with-search
      :label="t('itemsPerPage.label')"
      :list-label="t('itemsPerPage.select.listLabel')"
      class="onyx-items-per-page__select"
      :alignment="props.labelAlignment === 'right' || props.hideLabel ? 'left' : 'right'"
    />
    <label
      v-if="!props.hideLabel"
      :for="id"
      :class="['onyx-items-per-page__label', 'onyx-truncation-ellipsis']"
    >
      {{ t("itemsPerPage.label") }}
    </label>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-items-per-page-skeleton {
  @include layers.component() {
    --onyx-items-per-page-padding-vertical: var(--onyx-density-xs);
    --onyx-items-per-page-height: calc(1lh + 2 * var(--onyx-items-per-page-padding-vertical));
  }
}

.onyx-items-per-page-skeleton {
  @include layers.component() {
    height: var(--onyx-items-per-page-height);
    // 6.5rem for the label width
    // 5rem for the select minimum width
    width: calc(6.5rem + 5rem);
  }
}

.onyx-items-per-page {
  @include layers.component() {
    display: inline-flex;
    align-items: center;
    gap: var(--onyx-density-xs);

    &__label {
      color: var(--onyx-color-text-icons-neutral-medium);
      font-size: var(--onyx-font-size-md);
      font-family: var(--onyx-font-family-paragraph);
      line-height: var(--onyx-font-line-height-md);
    }

    &__select {
      width: auto;

      .onyx-select-input__native {
        // support growing select based on current page character count
        width: calc(var(--onyx-items-per-page-character-count) * 1ch + 1ch);
      }
    }

    &--reverse {
      flex-direction: row-reverse;
    }
  }
}
</style>
