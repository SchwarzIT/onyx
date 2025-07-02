<script lang="ts" setup generic="TValue extends PropertyKey = PropertyKey">
import { createTabs } from "@sit-onyx/headless";
import { provide, toRef, useTemplateRef } from "vue";
import { useDensity } from "../../composables/density.js";
import { provideSkeletonContext } from "../../composables/useSkeletonState.js";
import { useVModel } from "../../composables/useVModel.js";
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

const modelValue = useVModel<TValue, "modelValue", Props, undefined>({
  props,
  emit,
  key: "modelValue",
});

const headless = createTabs({
  label: toRef(props, "label"),
  selectedTab: toRef(() => modelValue.value),
  onSelect: (tab) => (modelValue.value = tab),
});

defineSlots<{
  /**
   * Slots for tab components. Only `OnyxTab` should be used here.
   */
  default(): unknown;
}>();

const panel = useTemplateRef("panelRef");
provideSkeletonContext(props);

provide(TABS_INJECTION_KEY as TabsInjectionKey<TValue>, {
  headless,
  panel,
  size: toRef(props, "size"),
});
</script>

<template>
  <div
    ref="panelRef"
    :class="[
      'onyx-component',
      'onyx-tabs',
      densityClass,
      props.stretched ? 'onyx-tabs--stretched' : '',
    ]"
  >
    <div v-bind="headless.elements.tablist.value" class="onyx-tabs__tablist">
      <!-- TABS -->
      <slot></slot>
    </div>
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
    margin-bottom: calc(var(--onyx-tabs-tablist-margin-bottom) - var(--onyx-outline-width));
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
      margin-bottom: var(--onyx-tabs-tablist-margin-bottom);
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
