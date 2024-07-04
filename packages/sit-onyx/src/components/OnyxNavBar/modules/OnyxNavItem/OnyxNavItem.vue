<script setup lang="ts">
import arrowSmallUpRight from "@sit-onyx/icons/arrow-small-up-right.svg?raw";
import { isExternalLink } from "../../../../utils";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
import OnyxMenuItem from "../OnyxMenuItem/OnyxMenuItem.vue";
import type { OnyxNavItemProps } from "./types";

const props = withDefaults(defineProps<OnyxNavItemProps>(), {
  withExternalIcon: "auto",
});

const emit = defineEmits<{
  /**
   * Emitted when the nav item is clicked.
   */
  click: [href: string];
}>();

defineSlots<{
  /**
   * Content of the nav item.
   */
  default?(): unknown;
}>();

const shouldShowExternalIcon = (args: typeof props) => {
  const withExternalIcon = args.withExternalIcon ?? "auto";
  if (withExternalIcon !== "auto") return args.withExternalIcon;
  return isExternalLink(args.href ?? "");
};
</script>

<template>
  <OnyxMenuItem
    :active="props.active"
    :href="props.href ?? 'javascript:void(0)'"
    @click="props.href && emit('click', props.href)"
  >
    <slot>
      <span>{{ props.label }}</span>
      <OnyxIcon
        v-if="shouldShowExternalIcon(props)"
        class="onyx-nav-item__external-icon"
        :icon="arrowSmallUpRight"
        size="16px"
      />
    </slot>
  </OnyxMenuItem>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers.scss";

.onyx-nav-item {
  @include layers.component() {
    &__external-icon {
      align-self: flex-start;
      margin-left: calc(-1 * var(--onyx-spacing-sm));
    }
  }
}
</style>
