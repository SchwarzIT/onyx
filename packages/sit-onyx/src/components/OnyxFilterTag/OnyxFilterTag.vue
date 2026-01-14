<script lang="ts" setup>
import { iconXSmall } from "@sit-onyx/icons";
import { computed } from "vue";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import { useForwardProps } from "../../utils/props.js";
import OnyxTag from "../OnyxTag/OnyxTag.vue";
import type { OnyxFilterTagProps } from "./types.js";

const props = withDefaults(defineProps<OnyxFilterTagProps>(), {
  skeleton: SKELETON_INJECTED_SYMBOL,
  active: undefined,
});

const emit = defineEmits<{
  /** Emitted when the active state changes. */
  "update:active": [value: boolean];
}>();

const { t } = injectI18n();
const tagProps = useForwardProps(props, OnyxTag);

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
const skeleton = useSkeletonContext(props);
</script>

<template>
  <OnyxTag
    v-bind="tagProps"
    :clickable="{ label: tooltipLabel, actionIcon: active ? iconXSmall : undefined }"
    class="onyx-filter-tag"
    :skeleton="skeleton"
    @click="active = !active"
  />
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-filter-tag .onyx-tag {
  @include layers.component() {
    --onyx-tag-background-color: var(--onyx-color-base-neutral-600);
    --onyx-tag-color: var(--onyx-color-text-icons-neutral-inverted);
    --onyx-tag-hover-background-color: var(--onyx-color-base-neutral-900);
    --onyx-tag-focus-color: var(--onyx-color-component-focus-neutral);
    --onyx-tag-focus-background-color: var(--onyx-color-base-neutral-600);
    border: none;
  }
}
</style>
