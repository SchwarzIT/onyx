<script lang="ts" setup>
import circleInformation from "@sit-onyx/icons/circle-information.svg?raw";
import { computed } from "vue";
import { type FormErrorMessages, getCustomErrorText } from "../../composables/useCustomValidity";
import OnyxTooltip from "../OnyxTooltip/OnyxTooltip.vue";

// TODO: should this component be exported for onyx users?

const props = defineProps<{
  // TODO: explain
  errorMessages?: FormErrorMessages;
  // TODO: clarify if this feature is wanted
  /** don't show an error if the content is not interactive */
  disabled?: boolean;
}>();
defineSlots<{
  /**
   * Any component. Will be wrapped in an OnyxTooltip showing
   * an  error message if an error message is set.
   */
  default(): unknown;
}>();

const tooltipError = computed(() => getCustomErrorText(props.errorMessages));
</script>

<template>
  <slot v-if="!tooltipError || disabled"></slot>

  <!-- TODO: open="trigger" -->
  <OnyxTooltip
    v-else
    class="onyx-error-tooltip"
    :icon="circleInformation"
    :open="true"
    :text="tooltipError"
    color="danger"
  >
    <template #default="{ trigger }">
      <slot v-bind="trigger"></slot>
    </template>
  </OnyxTooltip>
</template>

<style lang="scss"></style>
