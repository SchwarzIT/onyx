<script lang="ts" setup>
import circleInformation from "@sit-onyx/icons/circle-information.svg?raw";
import { computed } from "vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSystemButton from "../OnyxSystemButton/OnyxSystemButton.vue";
import OnyxTooltip from "../OnyxTooltip/OnyxTooltip.vue";
import OnyxVisuallyHidden from "../OnyxVisuallyHidden/OnyxVisuallyHidden.vue";
import type { OnyxInfoTooltipProps } from "./types";

const props = withDefaults(defineProps<OnyxInfoTooltipProps>(), {
  open: "click",
  color: "neutral",
});

const type = computed(() => {
  if (typeof props.open === "object") return props.open.type;
  if (typeof props.open === "string") return props.open;
  return "click";
});
</script>

<template>
  <span class="onyx-component onyx-info-tooltip">
    <template v-if="type === 'click'">
      <OnyxTooltip v-bind="props">
        <template #default="{ trigger }">
          <OnyxSystemButton
            :label="trigger['aria-label'] ?? ''"
            :icon="circleInformation"
            class="onyx-info-tooltip__trigger"
            color="soft"
            v-bind="trigger"
          />
        </template>
      </OnyxTooltip>
    </template>
    <template v-else>
      <!-- The info tooltip is not accessible when it's triggered on hover. Its trigger element ist not focusable, so instead we provide it's text visually hidden -->
      <OnyxTooltip aria-hidden="true" v-bind="props">
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
      display: inline-flex;
      height: 1lh;
      align-items: center;
      font-size: inherit;
      --height: 1em;

      .onyx-icon {
        --icon-size: 1em;
      }
    }
  }
}
</style>
