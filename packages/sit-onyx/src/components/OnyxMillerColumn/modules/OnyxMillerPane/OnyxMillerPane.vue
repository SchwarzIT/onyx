<script lang="ts" setup>
import { useDensity } from "../../../../composables/density.js";
import { useRootAttrs } from "../../../../utils/attrs.js";
import type { OnyxMillerPaneProps } from "./types.js";

const props = withDefaults(defineProps<OnyxMillerPaneProps>(), {});

defineSlots<{
  default?(): unknown;
}>();

const { densityClass } = useDensity(props);
const { rootAttrs } = useRootAttrs();

defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <div :class="['onyx-component', 'onyx-miller-pane', densityClass]">
    <h4 class="onyx-miller-pane__label">{{ props.label }}</h4>
    <ul v-bind="rootAttrs" class="onyx-miller-pane__list-box">
      <slot />
    </ul>
  </div>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers";

.onyx-miller-pane {
  @include layers.component() {
    font-family: var(--onyx-font-family-paragraph), var(--onyx-font-family-mono), sans-serif;
    font-weight: var(--onyx-font-weight-regular);
    font-style: normal;
    font-size: var(--onyx-font-size-lg);
    line-height: var(--onyx-font-line-height-md);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--onyx-color-base-background-blank);
    color: var(--onyx-color-text-icons-neutral-intense);
    border-left: 0.0625rem solid var(--onyx-color-component-border-neutral);
    border-top: 0.0625rem solid var(--onyx-color-component-border-neutral);
    border-bottom: 0.0625rem solid var(--onyx-color-component-border-neutral);

    &:first-child {
      border-bottom-left-radius: var(--onyx-radius-md);
      border-top-left-radius: var(--onyx-radius-md);
    }
    &:last-child {
      border-bottom-right-radius: var(--onyx-radius-md);
      border-top-right-radius: var(--onyx-radius-md);
      border-right: 0.0625rem solid var(--onyx-color-component-border-neutral);
    }

    &__label {
      flex: 0 0 auto;
      display: flex;
      margin: 0;
      font-family: var(--onyx-font-family-design-h4), var(--onyx-font-family-mono), sans-serif;
      font-weight: var(--onyx-font-weight-semibold);
      font-size: var(--onyx-font-size-sm);
      line-height: var(--onyx-font-line-height-sm);
      background-color: var(--onyx-color-base-neutral-200);
      padding: var(--onyx-density-xs) var(--onyx-density-md);
      border-bottom: 0.0625rem solid var(--onyx-color-component-border-neutral);
    }

    &__list-box {
      padding: var(--onyx-density-xs) var(--onyx-density-md);
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
    }
  }
}
</style>
