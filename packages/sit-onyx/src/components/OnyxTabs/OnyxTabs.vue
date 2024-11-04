<script lang="ts" setup>
import { createTabs } from "@sit-onyx/headless";
import { provide, ref, toRef } from "vue";
import { TABS_INJECTION_KEY, type OnyxTabsProps } from "./types";

const props = defineProps<OnyxTabsProps>();

const emit = defineEmits<{
  /**
   * Emitted when the currently active tab changes.
   */
  "update:modelValue": [value: PropertyKey];
}>();

const headless = createTabs({
  label: toRef(props, "label"),
  selectedTab: toRef(() => props.modelValue),
  onSelect: (tab) => emit("update:modelValue", tab),
});

defineSlots<{
  /**
   * Slots for tab components. Only `OnyxTab` should be used here.
   */
  default(): unknown;
}>();

const panelRef = ref<HTMLElement>();

provide(TABS_INJECTION_KEY, { headless, panelRef });
</script>

<template>
  <div ref="panelRef" class="onyx-tabs">
    <div v-bind="headless.elements.tablist" class="onyx-tabs__tablist">
      <!-- TABS -->
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-tabs {
  @include layers.component() {
    &__tablist {
      display: flex;
      align-items: center;
      gap: var(--onyx-density-2xs);
      margin-bottom: var(--onyx-density-md);
    }
  }
}
</style>
