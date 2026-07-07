<script lang="ts" setup>
import { iconXSmall } from "@sit-onyx/icons";
import { computed } from "vue";
import { useDensity } from "../../composables/density.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import { useForwardProps } from "../../utils/props.js";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxFilterBadgeProps } from "./types.js";

const props = withDefaults(defineProps<OnyxFilterBadgeProps>(), {
  active: undefined,
  skeleton: SKELETON_INJECTED_SYMBOL,
});

const emit = defineEmits<{
  /** Emitted when the active state changes. */
  "update:active": [value: boolean];
}>();

defineSlots<{
  /**
   * Badge content.
   */
  default?(): unknown;
}>();

const skeleton = useSkeletonContext(props);

const { t } = injectI18n();
const { densityClass } = useDensity(props);

const badgeProps = useForwardProps(props, OnyxBadge);

const active = useVModel({
  props,
  emit,
  key: "active",
  default: false,
});

const tooltipLabel = computed(() =>
  active.value
    ? t.value("filterTag.clickToRemove", { label: props.label })
    : t.value("filterTag.clickToAdd", { label: props.label }),
);
</script>

<template>
  <OnyxSkeleton v-if="skeleton" :class="['onyx-filter-badge-skeleton', densityClass]" />
  <OnyxBadge
    v-else
    v-bind="badgeProps"
    :clickable="{
      label: tooltipLabel,
      actionIcon: active ? iconXSmall : undefined,
      active,
    }"
    @click="active = !active"
  >
    <slot> {{ props.label }} </slot>
  </OnyxBadge>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-filter-badge-skeleton {
  @include layers.component() {
    width: var(--onyx-density-4xl);
    height: calc(1.5rem + 2 * var(--onyx-density-3xs));

    border-radius: var(--onyx-radius-component-badge);
  }
}
</style>
