<script lang="ts" setup>
import circleInformation from "@sit-onyx/icons/circle-information.svg?raw";
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

const defaultRef = ref();
const errorRef = ref();

const teleportTarget = computed(() =>
  !tooltipError.value || props.disabled ? defaultRef.value : errorRef.value,
);
</script>

<template>
  <div v-if="!tooltipError || props.disabled" ref="defaultRef"></div>
  <OnyxTooltip
    v-else
    class="onyx-error-tooltip"
    :icon="circleInformation"
    open="hover"
    :text="tooltipError"
    color="danger"
  >
    <template #default="{ trigger }">
      <div ref="errorRef" v-bind="trigger"></div>
    </template>
  </OnyxTooltip>

  <Teleport :disabled="!teleportTarget" :to="teleportTarget">
    <slot></slot>
  </Teleport>
</template>

<style lang="scss"></style>
