<script lang="ts" setup>
import { computed, useTemplateRef } from "vue";
import { type FormMessages, getFormMessageText } from "../../composables/useCustomValidity";
import OnyxTooltip from "../OnyxTooltip/OnyxTooltip.vue";

const props = defineProps<{
  /**
   * The given component will be shown inside a tooltip when
   * errorMessages are provided. Without errorMessages, the
   * component will not be rendered inside a slot.
   */
  errorMessages?: FormMessages;
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

const tooltipError = computed(() => getFormMessageText(props.errorMessages));

const target = useTemplateRef("targetRef");
</script>

<template>
  <div class="onyx-component">
    <!-- component will be placed in here if no tooltip should be rendered -->
    <div v-if="!tooltipError || props.disabled" ref="targetRef"></div>

    <!-- component will be placed inside the tooltip if it gets rendered -->
    <OnyxTooltip
      v-if="tooltipError && !props.disabled"
      class="onyx-error-tooltip"
      open="hover"
      :text="tooltipError"
      color="danger"
    >
      <template #default="{ trigger }">
        <div ref="targetRef" v-bind="trigger"></div>
      </template>
    </OnyxTooltip>

    <!--
      sends the given component to the desired target without destroying the component
      the "v-if" is needed to support server side rendering
    -->
    <Teleport v-if="target" :to="target" defer>
      <slot></slot>
    </Teleport>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-error-tooltip {
  @include layers.component() {
    max-width: 100%;
  }
}
</style>
