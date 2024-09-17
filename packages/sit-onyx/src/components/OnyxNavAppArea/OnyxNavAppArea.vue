<script lang="ts" setup>
import { computed } from "vue";
import { injectI18n } from "../../i18n";
import type { OnyxNavAppAreaProps } from "./types";

const props = defineProps<OnyxNavAppAreaProps>();

defineSlots<{
  /**
   * Optional slot to override the content.
   */
  default?(): unknown;
}>();

const { t } = injectI18n();

const buttonLabel = computed(() => props.label ?? t.value("navigation.goToHome"));
</script>

<template>
  <button type="button" class="onyx-nav-app-area" :aria-label="buttonLabel">
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
  </button>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-nav-app-area {
  @include layers.component() {
    // reset button styles
    background: none;
    border: none;

    display: flex;
    align-items: center;
    gap: var(--onyx-spacing-md);
    padding: var(--onyx-spacing-md);
    font-weight: 600;
    white-space: pre-line;
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
      background-color: var(--onyx-color-base-secondary-100);
      outline: none;
    }

    &:active {
      background-color: var(--onyx-color-base-secondary-200);
    }

    &__logo {
      width: auto;
      height: 1.5rem;
    }
  }
}
</style>
