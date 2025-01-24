<script lang="ts" setup>
import arrowSmallUpRight from "@sit-onyx/icons/arrow-small-up-right.svg?raw";
import { computed } from "vue";
import { isExternalLink } from "../../utils";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxExternalLinkIconProps } from "./types";

const props = withDefaults(defineProps<OnyxExternalLinkIconProps>(), {
  withExternalIcon: "auto",
});

const isVisible = computed(() => {
  const withExternalIcon = props.withExternalIcon;
  if (withExternalIcon !== "auto") return withExternalIcon;
  return isExternalLink(props.href ?? "");
});
</script>

<!-- eslint-disable-next-line vue/no-root-v-if -->
<template>
  <OnyxIcon
    v-if="isVisible"
    class="onyx-component onyx-external-link-icon"
    :icon="arrowSmallUpRight"
    size="16px"
  />
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-external-link-icon {
  @include layers.component() {
    align-self: flex-start;
  }
}
</style>
