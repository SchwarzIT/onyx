<script lang="ts" setup>
import { computed, inject } from "vue";
import { MOBILE_NAV_BAR_INJECTION_KEY } from "../OnyxNavBar/types";
import type { OnyxSeparatorProps } from "./types";

const props = withDefaults(defineProps<OnyxSeparatorProps>(), {
  orientation: "horizontal",
});

const isMobileNavBar = inject(MOBILE_NAV_BAR_INJECTION_KEY);

const isVertical = computed(() => {
  return props.orientation === "vertical" && !isMobileNavBar?.value;
});
</script>

<template>
  <div
    class="onyx-component onyx-separator"
    :class="{ 'onyx-separator--vertical': isVertical }"
    role="separator"
    :aria-orientation="props.orientation"
  ></div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-separator {
  @include layers.component() {
    --onyx-separator-size: var(--onyx-1px-in-rem);
    --onyx-separator-min-size: 2rem;
    background-color: var(--onyx-color-component-border-neutral);
    height: var(--onyx-separator-size);
    width: 100%;
    min-width: var(--onyx-separator-min-size);

    &--vertical {
      width: var(--onyx-separator-size);
      min-width: unset;
      min-height: var(--onyx-separator-min-size);
      height: 100%;
      max-height: 100%;
    }
  }
}
</style>
