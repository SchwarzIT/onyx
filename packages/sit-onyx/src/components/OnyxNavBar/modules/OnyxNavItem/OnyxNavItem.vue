<script setup lang="ts">
import { computed } from "vue";
import { extractLinkProps } from "../../../../utils/router";
import OnyxExternalLinkIcon from "../../../OnyxExternalLinkIcon/OnyxExternalLinkIcon.vue";
import OnyxMenuItem from "../OnyxMenuItem/OnyxMenuItem.vue";
import type { OnyxNavItemProps } from "./types";

const props = defineProps<OnyxNavItemProps>();

const emit = defineEmits<{
  /**
   * Emitted when the nav item is clicked.
   */
  navigate: [href: string, event: MouseEvent];
}>();

defineSlots<{
  /**
   * Content of the nav item.
   */
  default?(): unknown;
}>();

const extractedLinkProps = computed(() => {
  return props.link ? extractLinkProps(props.link) : undefined;
});
</script>

<template>
  <OnyxMenuItem
    class="onyx-component onyx-nav-item"
    :active="props.active"
    :link="props.link"
    @click="extractedLinkProps && emit('navigate', extractedLinkProps.href, $event)"
  >
    <slot>
      <span>{{ props.label }}</span>
      <OnyxExternalLinkIcon v-bind="extractedLinkProps" />
    </slot>
  </OnyxMenuItem>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers.scss";

.onyx-nav-item {
  @include layers.component() {
    .onyx-external-link-icon {
      margin-left: calc(-1 * var(--onyx-menu-item-gap));
    }
  }
}
</style>
