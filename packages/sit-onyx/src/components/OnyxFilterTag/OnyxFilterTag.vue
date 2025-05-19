<script lang="ts" setup>
import xSmall from "@sit-onyx/icons/x-small.svg?raw";
import { computed } from "vue";
import { SKELETON_INJECTED_SYMBOL, useSkeletonContext } from "../../composables/useSkeletonState";
import { useVModel, type Nullable } from "../../composables/useVModel";
import { injectI18n } from "../../i18n";
import OnyxTag from "../OnyxTag/OnyxTag.vue";
import type { OnyxTagProps } from "../OnyxTag/types";

const props = withDefaults(
  defineProps<
    Omit<OnyxTagProps, "color" | "clickable"> & {
      /**
       * If `true` the filter is selected, shows an 'x' icon and can be removed on click.
       */
      active?: Nullable<boolean>;
    }
  >(),
  {
    skeleton: SKELETON_INJECTED_SYMBOL,
  },
);

const emit = defineEmits<{
  /** Emitted when the active state changes. */
  "update:active": [value: Nullable<boolean>];
}>();

const { t } = injectI18n();

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
    v-bind="props"
    :clickable="{ label: tooltipLabel, actionIcon: active ? xSmall : undefined }"
    class="onyx-filter-tag"
    :skeleton="skeleton"
    @click="
      () => {
        active = !active;
      }
    "
  />
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-filter-tag .onyx-tag {
  @include layers.component() {
    --onyx-tag-background-color: var(--onyx-color-base-neutral-600);
    border: none;
    --onyx-tag-color: var(--onyx-color-text-icons-neutral-inverted);
    --onyx-tag-hover-background-color: var(--onyx-color-base-neutral-900);
    --onyx-tag-focus-color: var(--onyx-color-component-focus-neutral);
    --onyx-tag-focus-background-color: var(--onyx-color-base-neutral-600);
  }
}
</style>
