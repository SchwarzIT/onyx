<script lang="ts" setup generic="TValue extends PropertyKey = PropertyKey">
import { createTabs } from "@sit-onyx/headless";
import { provide, toRef } from "vue";
import { useDensity } from "../../composables/density.js";
import { usePortalOutlet } from "../../composables/usePortal.js";
import { provideSkeletonContext } from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
import OnyxTabPanel from "../OnyxTabPanel/OnyxTabPanel.vue";
import { TABS_INJECTION_KEY, type OnyxTabsProps, type TabsInjectionKey } from "./types.js";

type Props = OnyxTabsProps<TValue>;
const props = withDefaults(defineProps<Props>(), {
  size: "h2",
});

const emit = defineEmits<{
  /**
   * Emitted when the currently active tab changes.
   */
  "update:modelValue": [value: TValue];
}>();

const { densityClass } = useDensity(props);

const modelValue = useVModel<Props, "modelValue">({
  props,
  emit,
  key: "modelValue",
});

const headless = createTabs({
  label: toRef(() => props.label),
  selectedTab: toRef(() => modelValue.value),
  onSelect: (tab) => (modelValue.value = tab),
});

const slots = defineSlots<{
  /**
   * Slots for tab components. Only `OnyxTab` should be used here.
   */
  default(): unknown;
  /**
   * Optional actions to display in the top right.
   */
  actions?(): unknown;
}>();

provideSkeletonContext(props);

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- false positive
provide(TABS_INJECTION_KEY as TabsInjectionKey<TValue>, {
  headless,
  size: toRef(() => props.size),
});

const { PortalOutlet } = usePortalOutlet({ activeKey: modelValue });
</script>

<template>
  <div
    :class="[
      'onyx-component',
      'onyx-tabs',
      densityClass,
      { 'onyx-tabs--stretched': props.stretched },
    ]"
  >
    <div class="onyx-tabs__header">
      <div v-bind="headless.elements.tablist.value" class="onyx-tabs__tablist">
        <!-- TABS -->
        <slot></slot>
      </div>

      <div v-if="slots.actions" class="onyx-tabs__actions">
        <slot name="actions"></slot>
      </div>
    </div>
    <OnyxTabPanel v-bind="headless.elements.tabpanel.value({ value: modelValue })">
      <PortalOutlet />
    </OnyxTabPanel>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

@mixin define-tablist-overflow-behavior() {
  $negative-outline-width: calc(-1 * var(--onyx-outline-width));
  overflow-x: auto;

  // we set the overflow to auto to allow horizontal scrolling but this will cut off the focus outline
  // therefore, we use this little trick to still show the full outline
  &:has(.onyx-tab:focus-visible) {
    padding-top: var(--onyx-outline-width);
    margin-top: $negative-outline-width;

    padding-bottom: var(--onyx-outline-width);
    margin-bottom: $negative-outline-width;
  }

  &:has(.onyx-tab:focus-visible:first-of-type) {
    padding-left: var(--onyx-outline-width);
    margin-left: $negative-outline-width;
  }

  &:has(.onyx-tab:focus-visible:last-of-type) {
    padding-right: var(--onyx-outline-width);
    margin-right: $negative-outline-width;
  }
}

.onyx-tabs {
  @include layers.component() {
    --onyx-tabs-tablist-margin-bottom: var(--onyx-density-md);

    &__tablist {
      @include define-tablist-overflow-behavior();
      display: flex;
      align-items: center;
      gap: var(--onyx-density-2xs);
      flex-grow: 1;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--onyx-density-md);
      margin-bottom: var(--onyx-tabs-tablist-margin-bottom);
    }

    &__actions {
      display: flex;
      align-items: center;
      gap: var(--onyx-density-xs);
    }

    &--stretched {
      .onyx-tabs__tablist {
        justify-content: space-between;
      }

      .onyx-tab,
      .onyx-tab-skeleton {
        width: 100%;
      }
    }
  }
}
</style>
