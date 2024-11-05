<script lang="ts" setup generic="TValue extends PropertyKey = PropertyKey">
import { createTabs } from "@sit-onyx/headless";
import { provide, ref, toRef } from "vue";
import { useDensity } from "../../composables/density";
import { TABS_INJECTION_KEY, type OnyxTabsProps } from "./types";

const props = defineProps<OnyxTabsProps<TValue>>();

const emit = defineEmits<{
  /**
   * Emitted when the currently active tab changes.
   */
  "update:modelValue": [value: TValue];
}>();

const { densityClass } = useDensity(props);

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
  <div
    ref="panelRef"
    :class="['onyx-tabs', densityClass, props.stretched ? 'onyx-tabs--stretched' : '']"
  >
    <div v-bind="headless.elements.tablist.value" class="onyx-tabs__tablist">
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

    &--stretched {
      .onyx-tabs__tablist {
        justify-content: space-between;
      }

      .onyx-tab {
        width: 100%;
      }
    }
  }
}
</style>
