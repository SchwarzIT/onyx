<script lang="ts" setup>
import chevronLeftSmall from "@sit-onyx/icons/chevron-left-small.svg?raw";
import { OnyxNavAppArea } from "../..";
import { injectI18n } from "../../i18n";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import type { OnyxNavBarProps } from "./types";

const props = defineProps<OnyxNavBarProps>();

const emit = defineEmits<{
  /**
   * Emitted when the app area (where logo and app name are placed) is clicked.
   * Usually the user should be redirected to the home page then.
   */
  appAreaClick: [];
  /**
   * Emitted when the back button is clicked.
   */
  backButtonClick: [];
}>();

const slots = defineSlots<{
  /**
   * Nav items, only `OnyxNavItem` components should be placed here.
   */
  default?: () => unknown;
  /**
   * Optional slot to override the app area content (logo and app name, e.g. with a custom icon / `OnyxIcon` component).
   */
  appArea?: () => unknown;
  /**
   * Optional context area on the right to display additional (global) components, like user login, global settings etc.
   */
  contextArea?: () => unknown;
}>();

const { t } = injectI18n();
</script>

<template>
  <header class="onyx-nav-bar">
    <div class="onyx-nav-bar__content">
      <OnyxNavAppArea
        v-if="props.appName || props.logoUrl || slots.appArea"
        :app-name="props.appName"
        :logo-url="props.logoUrl"
        @click="emit('appAreaClick')"
      >
        <slot name="appArea"></slot>
      </OnyxNavAppArea>

      <OnyxIconButton
        v-if="props.showBackButton"
        :label="t('navigation.goBack')"
        :icon="chevronLeftSmall"
        variation="secondary"
        @click="emit('backButtonClick')"
      />

      <nav v-if="slots.default" class="onyx-nav-bar__nav" role="menubar">
        <slot></slot>
      </nav>

      <div v-if="slots.contextArea" class="onyx-nav-bar__context">
        <slot name="contextArea"></slot>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";
@use "../../styles/breakpoints.scss";

.onyx-nav-bar {
  @include layers.component() {
    border-bottom: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
    background-color: var(--onyx-color-base-background-blank);
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    height: 3.5rem;
    container-type: size;

    &__content {
      display: flex;
      align-items: center;
      gap: var(--onyx-spacing-md);
      height: 100%;
      max-width: var(--onyx-grid-max-width);
      padding: 0 var(--onyx-spacing-3xl);

      // sync grid centered
      margin-left: var(--onyx-grid-center-margin);
      margin-right: var(--onyx-grid-center-margin);

      @include breakpoints.container(max, sm) {
        padding: 0 var(--onyx-spacing-xl);
      }

      @include breakpoints.container(max, xs) {
        padding: 0 var(--onyx-spacing-md);
      }
    }

    &__nav {
      display: flex;
      align-items: center;
      gap: var(--onyx-spacing-4xs);
    }

    &__context {
      display: flex;
      align-items: center;
      gap: var(--onyx-spacing-4xs);
      margin-left: auto;
    }
  }
}
</style>
