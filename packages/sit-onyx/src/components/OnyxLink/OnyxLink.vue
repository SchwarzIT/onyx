<script lang="ts" setup>
import { injectI18n } from "../../i18n";
import OnyxExternalLinkIcon from "../OnyxExternalLinkIcon/OnyxExternalLinkIcon.vue";
import OnyxRouterLink from "../OnyxRouterLink/OnyxRouterLink.vue";
import OnyxVisuallyHidden from "../OnyxVisuallyHidden/OnyxVisuallyHidden.vue";
import type { OnyxLinkProps } from "./types";

const props = withDefaults(defineProps<OnyxLinkProps>(), {
  target: "_self",
  withExternalIcon: "auto",
});

defineSlots<{
  /**
   * Link label.
   */
  default(): unknown;
}>();

const { t } = injectI18n();
</script>

<template>
  <OnyxRouterLink class="onyx-component onyx-link" :href="props.href" :target="props.target">
    <slot></slot>

    <OnyxVisuallyHidden v-if="props.target === '_blank'">
      {{ t("link.opensExternally") }}
    </OnyxVisuallyHidden>

    <OnyxExternalLinkIcon v-bind="props" />
  </OnyxRouterLink>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-link {
  @include layers.component() {
    text-decoration: underline;
    color: var(--onyx-color-text-icons-primary-intense);
    display: inline-block;

    // other styles like size, font family etc. should be inherited
    // so we don't define them here

    &:hover {
      color: var(--onyx-color-text-icons-primary-medium);
    }

    &:focus-visible {
      color: var(--onyx-color-text-icons-primary-intense);
      border-radius: var(--onyx-radius-sm);
      outline: var(--onyx-1px-in-rem) solid var(--onyx-color-component-focus-primary);
    }

    &:active {
      color: var(--onyx-color-text-icons-primary-bold);
    }

    &:visited {
      color: var(--onyx-color-text-icons-primary-bold);

      &:hover {
        color: var(--onyx-color-text-icons-primary-intense);
      }
    }

    .onyx-external-link-icon {
      margin-left: var(--onyx-density-3xs);
    }
  }
}
</style>
