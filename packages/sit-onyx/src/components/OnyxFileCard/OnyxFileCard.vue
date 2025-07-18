<script lang="ts" setup>
import { computed } from "vue";
import { useDensity } from "../../composables/density.js";
import { injectI18n } from "../../i18n/index.js";
import {
  type BinaryPrefixedSize,
  convertBinaryPrefixToBytes,
  formatBytesToString,
} from "../../utils/numbers.js";
import OnyxCard from "../OnyxCard/OnyxCard.vue";
import OnyxFileTypeIcon from "../OnyxFileTypeIcon/OnyxFileTypeIcon.vue";
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
const { locale } = injectI18n();

const formatFileSize = computed(() => {
  return (size: number | BinaryPrefixedSize) => {
    const bytes = typeof size === "number" ? size : convertBinaryPrefixToBytes(size);
    return formatBytesToString(locale.value, bytes);
  };
});
</script>

<template>
  <OnyxCard :class="['onyx-component', 'onyx-file-card', densityClass]">
    <div class="onyx-file-card__icon">
      <OnyxFileTypeIcon :type="props.type" />
    </div>

    <div class="onyx-text--small">
      <div class="onyx-file-card__name onyx-truncation-ellipsis">{{ props.filename }}</div>
      <div class="onyx-file-card__size">{{ formatFileSize(props.size) }}</div>
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

    &__icon {
      border-radius: var(--onyx-radius-sm);
      border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
      background-color: var(--onyx-color-base-neutral-200);
      padding: var(--onyx-density-xs);
    }

    &__name {
      font-weight: var(--onyx-font-weight-semibold);
    }

    &__size {
      color: var(--onyx-color-text-icons-neutral-medium);
    }

    &__actions {
      margin-left: auto;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: var(--onyx-card-gap);
    }
  }
}
</style>
