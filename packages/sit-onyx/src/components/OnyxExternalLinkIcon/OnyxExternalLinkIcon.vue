<script lang="ts" setup>
import { iconArrowSmallUpRight } from "@sit-onyx/icons";
import { computed } from "vue";
import { isInternalLink } from "../../utils/index.js";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxExternalLinkIconProps } from "./types.js";

const props = withDefaults(defineProps<OnyxExternalLinkIconProps>(), {
  withExternalIcon: "auto",
});

const isVisible = computed(() => {
  const withExternalIcon = props.withExternalIcon;
  if (withExternalIcon !== "auto") return withExternalIcon;
  return !isInternalLink(props.href ?? "");
});
</script>

<!-- eslint-disable-next-line vue/no-root-v-if -->
<template>
  <OnyxIcon
    v-if="isVisible"
    class="onyx-component onyx-external-link-icon"
    :icon="iconArrowSmallUpRight"
    size="16px"
  />
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-external-link-icon {
  @include layers.component() {
    vertical-align: text-top;
    place-self: baseline;
  }
}
</style>
