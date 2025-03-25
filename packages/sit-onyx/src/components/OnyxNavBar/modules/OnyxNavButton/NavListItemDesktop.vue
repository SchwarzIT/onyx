<script lang="ts" setup>
import { extractLinkProps } from "../../../../utils/router";
import ButtonOrLinkLayout from "../../../OnyxButton/ButtonOrLinkLayout.vue";
import OnyxExternalLinkIcon from "../../../OnyxExternalLinkIcon/OnyxExternalLinkIcon.vue";
import OnyxListItem from "../../../OnyxListItem/OnyxListItem.vue";
import type { OnyxNavButtonProps } from "./types";

const props = defineProps<
  OnyxNavButtonProps & {
    /**
     * displays an arrow
     */
    hasChildren?: boolean;
    /**
     *
     */
    active?: boolean;
  }
>();

defineSlots<{
  /**
   *
   */
  default(): unknown;
}>();
</script>

<template>
  <OnyxListItem v-bind="props" class="onyx-nav-list-item-desktop">
    <ButtonOrLinkLayout v-bind="props" role="menuitem">
      <span class="onyx-truncation-ellipsis">{{ props.label }}</span>
      <OnyxExternalLinkIcon v-bind="props.link ? extractLinkProps(props.link) : undefined" />
    </ButtonOrLinkLayout>
  </OnyxListItem>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers.scss";

@include layers.component() {
  .onyx-nav-list-item-desktop {
    button {
      all: unset;
    }
  }
}
</style>
