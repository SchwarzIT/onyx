<script lang="ts" setup>
import circleInformation from "@sit-onyx/icons/circle-information.svg?raw";
import { injectI18n } from "../../i18n";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxTooltip from "../OnyxTooltip/OnyxTooltip.vue";
import type { OnyxInfoTooltipProps } from "./types";

const props = defineProps<OnyxInfoTooltipProps>();
const { t } = injectI18n();
</script>

<template>
  <OnyxTooltip class="onyx-info-tooltip" :text="props.text" :position="props.position">
    <button
      type="button"
      :aria-label="props.label || t('showTooltip.info')"
      class="onyx-info-tooltip__trigger"
    >
      <OnyxIcon :icon="circleInformation" />
    </button>
  </OnyxTooltip>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-info-tooltip {
  @include layers.component() {
    &__trigger {
      border: none;
      background-color: transparent;
      padding: 0;
      color: inherit;
      display: flex;
      height: 1lh;
      align-items: center;

      &:focus-visible {
        // unset the icon button outline for now until
        // https://github.com/SchwarzIT/onyx/issues/1272
        // is defined
        outline: none;
      }

      .onyx-icon {
        --icon-size: 1em;
      }
    }
  }
}
</style>
