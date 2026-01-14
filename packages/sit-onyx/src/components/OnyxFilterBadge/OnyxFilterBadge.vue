<script lang="ts" setup>
import { iconXSmall } from "@sit-onyx/icons";
import { computed } from "vue";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import { useForwardProps } from "../../utils/props.js";
import OnyxBadge from "../OnyxBadge/OnyxBadge.vue";
import type { OnyxFilterBadgeProps } from "./types.js";

const props = withDefaults(defineProps<OnyxFilterBadgeProps>(), {
  active: undefined,
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

const { t } = injectI18n();
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
  <OnyxBadge
    v-bind="badgeProps"
    :clickable="{
      label: tooltipLabel,
      actionIcon: active ? iconXSmall : undefined,
      selected: active,
    }"
    @click="active = !active"
  >
    <slot> {{ props.label }} </slot>
  </OnyxBadge>
</template>
