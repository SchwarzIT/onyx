<script lang="ts" setup>
import { computed, type AriaAttributes } from "vue";
import { getFormMessageText, type FormMessages } from "../../composables/useFormElementError.js";
import OnyxTooltip from "../OnyxTooltip/OnyxTooltip.vue";

const props = defineProps<{
  /**
   * The given component will be shown inside a tooltip when
   * errorMessages are provided. Without errorMessages, the
   * component will not be rendered inside a slot.
   */
  errorMessages?: FormMessages;
  /**
   * We don't show an error if the content is not interactive
   */
  disabled?: boolean;
}>();

defineSlots<{
  /**
   * Any component. Will be wrapped in an OnyxTooltip showing
   * an  error message if an error message is set.
   */
  default(props: { trigger?: AriaAttributes }): unknown;
}>();

const tooltipError = computed(() => getFormMessageText(props.errorMessages));
</script>

<template>
  <div class="onyx-component">
    <!-- component will be placed in here if no tooltip should be rendered -->
    <div v-if="!tooltipError || props.disabled">
      <slot></slot>
    </div>

    <!-- component will be placed inside the tooltip if it gets rendered -->
    <OnyxTooltip v-else trigger="hover" :text="tooltipError" color="danger">
      <template #default="{ trigger }">
        <slot :trigger></slot>
      </template>
    </OnyxTooltip>
  </div>
</template>
