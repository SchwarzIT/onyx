<script lang="ts" setup>
import { computed, ref } from "vue";
import { type FormErrorMessages, getCustomErrorText } from "../../composables/useCustomValidity";
import OnyxTooltip from "../OnyxTooltip/OnyxTooltip.vue";

const props = defineProps<{
  /**
   * The given component will be shown inside a tooltip when
   * errorMessages are provided. Without errorMessages, the
   * component will not be rendered inside a slot.
   */
  errorMessages?: FormErrorMessages;
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
  <div>
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
    <Teleport v-if="targetRef" :to="targetRef" defer>
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
