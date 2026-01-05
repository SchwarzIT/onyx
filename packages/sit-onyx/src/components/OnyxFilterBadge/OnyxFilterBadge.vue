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
  actionIcon: iconXSmall,
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
    :clickable="{ label: tooltipLabel, actionIcon: active ? props.actionIcon : undefined }"
    :class="{ 'onyx-filter-badge': true, 'onyx-filter-badge--active': active }"
    @click="active = !active"
  >
    <slot>
      {{ props.label }}
    </slot>
  </OnyxBadge>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-filter-badge--active .onyx-badge {
  @include layers.component() {
    --onyx-badge-active-background-color: var(--onyx-color-base-secondary-700);
    &--neutral {
      --onyx-badge-active-background-color: var(--onyx-color-base-neutral-700);
    }

    &--danger {
      --onyx-badge-active-background-color: var(--onyx-color-base-danger-700);
    }

    &--warning {
      --onyx-badge-active-background-color: var(--onyx-color-base-warning-700);
    }

    &--success {
      --onyx-badge-active-background-color: var(--onyx-color-base-success-700);
    }

    &--info {
      --onyx-badge-active-background-color: var(--onyx-color-base-info-700);
    }
    background-color: var(--onyx-badge-active-background-color);
  }
}
</style>
