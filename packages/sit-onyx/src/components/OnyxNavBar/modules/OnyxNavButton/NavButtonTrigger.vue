<script lang="ts" setup>
import { extractLinkProps } from "../../../../utils/router";
import OnyxRouterLink from "../../../OnyxRouterLink/OnyxRouterLink.vue";
import type { OnyxNavButtonProps } from "./types";

const props = defineProps<
  OnyxNavButtonProps & {
    /**
     * Whether to force rendering a button, even if a link is provided.
     * Useful for mobile nav button where the parent should open the child view instead of navigating.
     */
    forceButton?: boolean;
  }
>();

defineSlots<{
  /**
   * Trigger of the nav button (e.g. a native button or link component).
   */
  default(): unknown;
}>();
</script>

<template>
  <button
    v-if="!props.link || props.forceButton"
    class="onyx-component onyx-nav-button__trigger onyx-text"
    role="menuitem"
    type="button"
  >
    <slot></slot>
  </button>

  <OnyxRouterLink
    v-else
    v-bind="extractLinkProps(props.link)"
    class="onyx-nav-button__trigger onyx-nav-button__link onyx-text"
    role="menuitem"
  >
    <slot></slot>
  </OnyxRouterLink>
</template>
