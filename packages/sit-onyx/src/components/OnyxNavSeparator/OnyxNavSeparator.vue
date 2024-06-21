<script lang="ts" setup>
import { inject } from "vue";
import { mobileNavBarInjectionKey } from "../OnyxNavBar/types";
import type { OnyxNavSeparatorProps } from "./types";

const props = withDefaults(defineProps<OnyxNavSeparatorProps>(), {
  orientation: "vertical",
});

const isMobile = inject(mobileNavBarInjectionKey);
</script>

<template>
  <div
    class="onyx-separator"
    :class="{ 'onyx-separator--horizontal': props.orientation === 'horizontal' || isMobile }"
    role="separator"
    :aria-orientation="props.orientation"
  ></div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-separator {
  @include layers.component() {
    background-color: var(--onyx-color-base-neutral-300);
    margin: 0 var(--onyx-spacing-2xs);
    width: var(--onyx-1px-in-rem);
    min-height: 2rem;
    height: 100%;
    max-height: 100%;

    &--horizontal {
      min-height: var(--onyx-1px-in-rem);
      width: 100%;
      margin: var(--onyx-spacing-xs) 0;
    }
  }
}
</style>
