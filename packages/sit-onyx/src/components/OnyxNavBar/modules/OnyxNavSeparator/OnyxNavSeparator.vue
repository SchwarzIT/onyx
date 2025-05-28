<script lang="ts" setup>
import { computed, inject } from "vue";
import { MOBILE_NAV_BAR_INJECTION_KEY } from "../../../OnyxNavBar/types";
import type { OnyxNavSeparatorProps } from "./types";

const props = withDefaults(defineProps<OnyxNavSeparatorProps>(), {
  orientation: "vertical",
});

const isMobile = inject(
  MOBILE_NAV_BAR_INJECTION_KEY,
  computed(() => false),
);
</script>

<template>
  <div
    class="onyx-component onyx-nav-separator"
    :class="{ 'onyx-nav-separator--horizontal': props.orientation === 'horizontal' || isMobile }"
    role="separator"
    :aria-orientation="props.orientation"
  ></div>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers";

.onyx-nav-separator {
  @include layers.component() {
    background-color: var(--onyx-color-component-border-neutral);
    margin: 0 var(--onyx-spacing-2xs);
    width: var(--onyx-1px-in-rem);
    min-height: 2rem;
    height: 100%;
    max-height: 100%;

    &--horizontal {
      min-height: unset;
      height: var(--onyx-1px-in-rem);
      width: 100%;
      margin: var(--onyx-spacing-2xs) 0;
    }
  }
}
</style>
