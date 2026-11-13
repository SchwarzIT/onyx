<script setup lang="ts">
import { iconChevronRightSmall } from "@sit-onyx/icons";
import { extractLinkProps } from "../../../../utils/router.js";
import ButtonOrLinkLayout from "../../../OnyxButton/ButtonOrLinkLayout.vue";
import OnyxExternalLinkIcon from "../../../OnyxExternalLinkIcon/OnyxExternalLinkIcon.vue";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
import type { OnyxMenuItemProps } from "./types.js";

const props = defineProps<
  Pick<OnyxMenuItemProps, "label" | "icon" | "link" | "disabled"> & {
    /**
     * Weather the MenuItem has children
     */
    hasChildren?: boolean;
  }
>();

defineSlots<{
  /**
   * Button/link text and additional inline content.
   */
  default?(): unknown;
}>();

const truncationClass = "onyx-truncation-ellipsis";
</script>

<template>
  <ButtonOrLinkLayout
    :class="['onyx-component', 'onyx-menu-item__trigger', truncationClass]"
    :disabled="props.disabled"
    :link="props.link"
  >
    <slot>
      <OnyxIcon v-if="props.icon" :icon="props.icon" size="24px" />
      <span :class="truncationClass">
        <span> {{ props.label }} </span>
        <OnyxExternalLinkIcon v-bind="props.link ? extractLinkProps(props.link) : undefined" />
      </span>
    </slot>

    <div v-if="props.hasChildren" class="onyx-menu-item__chevron">
      <OnyxIcon :icon="iconChevronRightSmall" size="24px" />
    </div>
  </ButtonOrLinkLayout>
</template>
