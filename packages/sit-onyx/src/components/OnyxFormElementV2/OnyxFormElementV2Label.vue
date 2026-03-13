<script lang="ts" setup>
import { computed } from "vue";
import { useRequired } from "../../composables/required.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { useFormContext } from "../OnyxForm/OnyxForm.core.js";
import OnyxInfoTooltip from "../OnyxInfoTooltip/OnyxInfoTooltip.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { FormElementV2Tooltip, OnyxFormElementV2Props } from "./types.js";

const props = withDefaults(defineProps<OnyxFormElementV2Props>(), {
  skeleton: SKELETON_INJECTED_SYMBOL,
});

const { requiredMarker } = useFormContext(props);
const { requiredMarkerClass, requiredTypeClass } = useRequired(props, requiredMarker);
const skeleton = useSkeletonContext(props);

const data = computed<FormElementV2Tooltip>(() => {
  if (typeof props.label === "object") return props.label;
  return { label: props.label };
});
</script>

<template>
  <div
    :class="[
      'onyx-component',
      'onyx-form-element-v2__label',
      'onyx-text--small',
      requiredTypeClass,
    ]"
  >
    <OnyxSkeleton v-if="skeleton" class="onyx-form-element-v2__label-skeleton" />

    <template v-else>
      <label :for="props.id" class="onyx-truncation-ellipsis">{{ data.label }}</label>

      <span
        v-if="props.required"
        :class="[props.required ? requiredMarkerClass : undefined]"
      ></span>

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
    </template>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-form-element-v2 {
  @include layers.component() {
    &__label {
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

    &__label-skeleton {
      height: var(--onyx-form-element-v2-label-skeleton-height);
      width: var(--onyx-density-3xl);
    }
  }
}
</style>
