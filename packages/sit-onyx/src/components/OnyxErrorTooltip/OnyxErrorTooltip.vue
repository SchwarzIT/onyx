<script lang="ts" setup>
import { computed, ref } from "vue";
import { type FormErrorMessages, getCustomErrorText } from "../../composables/useCustomValidity";
import OnyxTooltip from "../OnyxTooltip/OnyxTooltip.vue";

// TODO: should this component be exported for onyx users?

const props = defineProps<{
  /**
   * The given component will be shown inside a tooltip when
   * errorMessages are provided. Without errorMessages, the
   * component will not be rendered inside a slot.
   */
  errorMessages?: FormErrorMessages;
  // TODO: clarify if this feature is wanted
  /** We don't show an error if the content is not interactive */
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

const targetRef = ref<HTMLDivElement>();
</script>

<template>
  <!-- component will be placed in here if no tooltip should be rendered -->
  <div v-if="!tooltipError || props.disabled" ref="targetRef"></div>

  <!-- component will be placed inside the tooltip if it gets rendered -->
  <OnyxTooltip v-else class="onyx-error-tooltip" open="hover" :text="tooltipError" color="danger">
    <template #default="{ trigger }">
      <div ref="targetRef" v-bind="trigger"></div>
    </template>
  </OnyxTooltip>

  <!-- sends the given component to the desired target without destroying the component -->
  <Teleport :disabled="!targetRef" :to="targetRef">
    <slot></slot>
  </Teleport>
</template>
