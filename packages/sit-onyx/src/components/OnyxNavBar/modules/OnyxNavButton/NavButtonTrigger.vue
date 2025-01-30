<script lang="ts" setup>
import { extractLinkProps } from "../../../../utils/router";
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
  <OnyxRouterLink
    v-if="props.link"
    v-bind="extractLinkProps(props.link)"
    class="onyx-nav-button__trigger onyx-nav-button__link onyx-text"
    role="menuitem"
  >
    <slot></slot>
  </OnyxRouterLink>

  <button
    v-else
    class="onyx-component onyx-nav-button__trigger onyx-text"
    role="menuitem"
    type="button"
  >
    <slot></slot>
  </button>
</template>
