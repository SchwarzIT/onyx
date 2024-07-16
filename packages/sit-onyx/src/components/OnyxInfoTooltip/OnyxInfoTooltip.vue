<script lang="ts" setup>
import circleInformation from "@sit-onyx/icons/circle-information.svg?raw";
import { computed } from "vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxTooltip from "../OnyxTooltip/OnyxTooltip.vue";
import type { OnyxInfoTooltipProps } from "./types";

const props = withDefaults(defineProps<OnyxInfoTooltipProps>(), { open: "click" });

const type = computed(() => {
  if (typeof props.open === "object") return props.open.type;
  if (typeof props.open === "string") return props.open;
  return "hover";
});
</script>

<template>
  <span class="onyx-info-tooltip">
    <template v-if="type === 'click'">
      <OnyxTooltip :text="props.text" :open="props.open" :position="props.position">
        <template #default="{ trigger }">
          <button type="button" class="onyx-info-tooltip__trigger" v-bind="trigger">
            <OnyxIcon :icon="circleInformation" />
          </button>
        </template>
      </OnyxTooltip>
    </template>
    <template v-else>
      <!-- The info tooltip is not accessible when it's triggered on hover. Its trigger element ist not focusable, so instead we provide it's text visually hidden -->
      <OnyxTooltip
        aria-hidden="true"
        :text="props.text"
        :open="props.open"
        :position="props.position"
      >
        <template #default="{ trigger }">
          <span class="onyx-info-tooltip__trigger" v-bind="trigger">
            <OnyxIcon :icon="circleInformation" />
          </span>
        </template>
      </OnyxTooltip>
      <OnyxVisuallyHidden>{{ props.text }}</OnyxVisuallyHidden>
    </template>
  </span>
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
