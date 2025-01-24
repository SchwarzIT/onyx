<script setup lang="ts">
import OnyxExternalLinkIcon from "../../../OnyxExternalLinkIcon/OnyxExternalLinkIcon.vue";
import OnyxMenuItem from "../OnyxMenuItem/OnyxMenuItem.vue";
import type { OnyxNavItemProps } from "./types";

const props = withDefaults(defineProps<OnyxNavItemProps>(), {
  withExternalIcon: "auto",
});

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
</script>

<template>
  <OnyxMenuItem
    class="onyx-component onyx-nav-item"
    :active="props.active"
    :href="props.href ?? 'javascript:void(0)'"
    :target="props.target"
    @click="props.href && emit('navigate', props.href, $event)"
  >
    <slot>
      <span>{{ props.label }}</span>
      <OnyxExternalLinkIcon v-bind="props" />
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
