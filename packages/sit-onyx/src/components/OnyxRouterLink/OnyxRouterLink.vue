<script lang="ts" setup>
import { useLink } from "../../composables/useLink";
import { injectI18n } from "../../i18n";
import OnyxVisuallyHidden from "../OnyxVisuallyHidden/OnyxVisuallyHidden.vue";
import type { OnyxRouterLinkProps } from "./types";

const props = withDefaults(defineProps<OnyxRouterLinkProps>(), {
  target: "_self",
});

defineSlots<{
  default(): unknown;
}>();

const { t } = injectI18n();
const { navigate, isActive } = useLink();
</script>

<template>
  <a
    :class="[
      'onyx-component',
      'onyx-router-link',
      isActive(props.href) ? 'onyx-router-link--active' : '',
    ]"
    :href="props.href"
    :target="props.target"
    :rel="props.target === '_blank' ? 'noreferrer' : undefined"
    @click="navigate($event, props.href)"
  >
    <slot></slot>

    <OnyxVisuallyHidden v-if="props.target === '_blank'">
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
