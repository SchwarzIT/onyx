<script lang="ts" setup>
import OnyxRouterLink from "../../../OnyxRouterLink/OnyxRouterLink.vue";
import type { OnyxNavButtonProps } from "./types";

const props = defineProps<OnyxNavButtonProps>();

defineSlots<{
  /**
   * Trigger of the nav button (e.g. a native button or link component).
   */
  default(): unknown;
}>();
</script>

<template>
  <button
    v-if="props.href == undefined"
    class="onyx-component onyx-nav-button__trigger onyx-text"
    role="menuitem"
    type="button"
  >
    <slot></slot>
  </button>

  <OnyxRouterLink
    v-else
    v-bind="props"
    :href="props.href"
    class="onyx-nav-button__trigger onyx-nav-button__link onyx-text"
    role="menuitem"
  >
    <slot></slot>
  </OnyxRouterLink>
</template>
