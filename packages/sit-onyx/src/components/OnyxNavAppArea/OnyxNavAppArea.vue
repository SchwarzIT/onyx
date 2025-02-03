<script lang="ts" setup>
import { computed } from "vue";
import { injectI18n } from "../../i18n";
import { extractLinkProps } from "../../utils/router";
import OnyxRouterLink from "../OnyxRouterLink/OnyxRouterLink.vue";
import type { OnyxNavAppAreaProps } from "./types";

const props = withDefaults(defineProps<OnyxNavAppAreaProps>(), {
  link: "/",
});

defineSlots<{
  /**
   * Optional slot to override the content.
   */
  default?(): unknown;
}>();

const { t } = injectI18n();

const buttonLabel = computed(() => props.label ?? t.value("navigation.goToHome"));
const linkProps = computed(() => extractLinkProps(props.link));
</script>

<template>
  <OnyxRouterLink
    v-bind="linkProps"
    class="onyx-component onyx-nav-app-area"
    :aria-label="buttonLabel"
  >
    <slot>
      <!--
        the width/height here is only to prevent layout shifts on initial load.
        the "real" size is set via CSS below
       -->
      <img
        v-if="props.logoUrl"
        :src="props.logoUrl"
        :alt="t('navigation.appLogo', { appName: props.appName })"
        class="onyx-nav-app-area__logo"
        width="24"
        height="24"
      />

      <span v-if="props.appName" class="onyx-text-small onyx-truncation-ellipsis">
        {{ props.appName }}
      </span>
    </slot>
  </OnyxRouterLink>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-nav-app-area {
  @include layers.component() {
    display: flex;
    align-items: center;
    gap: var(--onyx-spacing-md);
    padding: var(--onyx-spacing-md);
    font-weight: 600;
    white-space: pre-line;
    max-width: 100%;
    // Full container height as maximum
    max-height: 100cqh;
    cursor: pointer;
    text-align: left;
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    background-color: var(--onyx-color-base-background-blank);
    overflow-x: hidden;

    &:hover {
      background-color: var(--onyx-color-base-background-tinted);
    }

    &:focus-visible {
      background-color: var(--onyx-color-base-primary-100);
      outline: none;
    }

    &:active {
      background-color: var(--onyx-color-base-primary-200);
    }

    &__logo {
      width: auto;
      height: 1.5rem;
    }
  }
}
</style>
