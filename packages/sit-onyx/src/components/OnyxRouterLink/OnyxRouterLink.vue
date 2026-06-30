<script lang="ts" setup>
import { computed } from "vue";
import { useLink } from "../../composables/useLink.js";
import { injectI18n } from "../../i18n/index.js";
import OnyxVisuallyHidden from "../OnyxVisuallyHidden/OnyxVisuallyHidden.vue";
import type { LinkTarget, OnyxRouterLinkProps } from "./types.js";
import { isInternalLink } from "../../utils/router.js";

const props = withDefaults(defineProps<OnyxRouterLinkProps>(), {
  target: "auto",
});

defineSlots<{
  default(): unknown;
}>();

const { t } = injectI18n();
const { navigate, isActive } = useLink();

const computedTarget = computed<LinkTarget>(() => {
  if (props.target !== "auto") return props.target;
  return isInternalLink(props.href) ? "_self" : "_blank";
});
</script>

<template>
  <a
    :class="[
      'onyx-component',
      'onyx-router-link',
      { 'onyx-router-link--active': isActive(props.href) },
    ]"
    :href="props.href"
    :target="computedTarget"
    :rel="computedTarget === '_blank' ? 'noreferrer' : undefined"
    @click="navigate($event, props.href)"
  >
    <slot></slot>

    <OnyxVisuallyHidden v-if="computedTarget === '_blank'">
      {{ t("link.opensExternally") }}
    </OnyxVisuallyHidden>
  </a>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-router-link {
  @include layers.component() {
    cursor: pointer;

    // reset styles
    outline-offset: inherit;
    text-decoration: inherit;
    color: inherit;
  }
}
</style>
