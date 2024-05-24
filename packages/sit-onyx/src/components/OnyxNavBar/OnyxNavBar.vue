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
        :label="props.appAreaLabel"
        @click="emit('appAreaClick')"
      >
        <slot name="appArea"></slot>
      </OnyxNavAppArea>

      <OnyxIconButton
        v-if="props.withBackButton"
        :label="t('navigation.goBack')"
        :icon="chevronLeftSmall"
        color="neutral"
        @click="emit('backButtonClick')"
      />

      <nav v-if="slots.default">
        <ul class="onyx-nav-bar__nav" role="menubar">
          <slot></slot>
        </ul>
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
    --padding-inline: var(--onyx-spacing-3xl);

    border-bottom: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
    background-color: var(--onyx-color-base-background-blank);
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    height: 3.5rem;
    container-type: size;
    z-index: var(--onyx-z-index-navigation);

    &__content {
      display: flex;
      align-items: center;
      gap: var(--onyx-spacing-md);
      height: 100%;
      padding-inline: var(--padding-inline);

      // sync with grid
      max-width: var(--onyx-grid-max-width);
      margin-inline: var(--onyx-grid-margin-inline);

      @include breakpoints.container(max, sm) {
        --padding-inline: var(--onyx-spacing-xl);
      }

      @include breakpoints.container(max, xs) {
        --padding-inline: var(--onyx-spacing-md);
      }
    }

    &__nav {
      display: flex;
      align-items: center;
      gap: var(--onyx-spacing-4xs);
      padding: 0;
    }

    &__context {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--onyx-spacing-4xs);
      flex-grow: 1;
    }
  }
}
</style>
