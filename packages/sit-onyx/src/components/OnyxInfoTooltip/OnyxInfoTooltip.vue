<script lang="ts" setup>
import { iconCircleInformation } from "@sit-onyx/icons";
import { computed } from "vue";
import { useVModel } from "../../composables/useVModel.js";
import type { Nullable } from "../../types/utils.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxSystemButton from "../OnyxSystemButton/OnyxSystemButton.vue";
import OnyxTooltip from "../OnyxTooltip/OnyxTooltip.vue";
import OnyxVisuallyHidden from "../OnyxVisuallyHidden/OnyxVisuallyHidden.vue";
import type { OnyxInfoTooltipProps } from "./types.js";

const props = withDefaults(defineProps<OnyxInfoTooltipProps>(), {
  trigger: "click",
  color: "neutral",
});

const emit = defineEmits<{
  /**
   * Emitted when the open state of the tooltip changes.
   */
  "update:open": [open: Nullable<boolean>];
}>();

const isVisible = useVModel({
  props,
  emit,
  key: "open",
});

const triggerType = computed(() => {
  if (typeof props.trigger === "object") return props.trigger.type;
  return props.trigger;
});
</script>

<template>
  <span class="onyx-component onyx-info-tooltip">
    <OnyxTooltip v-if="triggerType === 'click'" v-bind="props" v-model:open="isVisible">
      <template #default="{ trigger }">
        <!--  -->
        <OnyxSystemButton
          :label="
            // if type is `click` aria-label will always be defined
            trigger['aria-label']!
          "
          :icon="iconCircleInformation"
          class="onyx-info-tooltip__trigger"
          color="soft"
          v-bind="trigger"
        />
      </template>
    </OnyxTooltip>

    <!-- The info tooltip is not accessible when it's triggered on hover. Its trigger element ist not focusable, so instead we provide it's text visually hidden -->
    <template v-else>
      <OnyxTooltip v-bind="props" v-model:open="isVisible" aria-hidden="true">
        <template #default="{ trigger }">
          <span class="onyx-info-tooltip__trigger" v-bind="trigger">
            <OnyxIcon :icon="iconCircleInformation" />
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
      align-items: center;
      font-size: inherit;
      vertical-align: middle;

      --height: 1em;

      .onyx-icon {
        --icon-size: 1em;
      }
    }
  }
}
</style>
