<script lang="ts" setup>
import { computed } from "vue";
import { useRequired } from "../../composables/required.js";
import { useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxInfoTooltip from "../OnyxInfoTooltip/OnyxInfoTooltip.vue";
import type { FormElementV2Tooltip, OnyxFormElementV2Props } from "./types.js";

const props = defineProps<OnyxFormElementV2Props>();

const { requiredMarker } = useFormContext(props);
const { requiredMarkerClass, requiredTypeClass } = useRequired(props, requiredMarker);

const data = computed<FormElementV2Tooltip>(() => {
  if (typeof props.label === "object") return props.label;
  return { label: props.label };
});
</script>

<template>
  <div
    :class="['onyx-component', 'onyx-form-element-v2__top', 'onyx-text--small', requiredTypeClass]"
  >
    <label :for="props.id">{{ data.label }}</label>

    <span v-if="props.required" :class="[props.required ? requiredMarkerClass : undefined]"></span>

    <OnyxInfoTooltip
      v-if="data.tooltipText"
      class="onyx-form-element-v2__tooltip"
      trigger="hover"
      :text="data.tooltipText"
    />

    <span
      v-if="!props.required"
      :class="[!props.required ? requiredMarkerClass : undefined]"
    ></span>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-form-element-v2__top {
  @include layers.component() {
    display: flex;
    align-items: center;
    max-width: 100%;
    width: 100%;
    color: var(--onyx-color-text-icons-neutral-medium);

    // optional marker should be displayed at the very end of the label
    & .onyx-optional-marker {
      flex-grow: 1;
      text-align: end;
    }
  }
}
</style>
