<script lang="ts" setup>
import chevronLeftSmall from "@sit-onyx/icons/chevron-left-small.svg?raw";
import { injectI18n } from "../../i18n";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import type { OnyxNavigationBarProps } from "./types";

const props = defineProps<OnyxNavigationBarProps>();

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
   * Optional context area on the right to display additional (global) components, like user login, global settings etc.
   */
  contextArea?: () => unknown;
  /**
   * Optional slot to override the logo (e.g. with a custom icon / `OnyxIcon` component).
   */
  logo?: () => unknown;
}>();

const { t } = injectI18n();
</script>

<template>
  <div class="onyx-navigation-bar">
    <div class="onyx-navigation-bar__content">
      <button
        v-if="props.appName || props.logoUrl || slots.logo"
        class="onyx-navigation-bar__app"
        @click="emit('appAreaClick')"
      >
        <slot name="logo">
          <img
            v-if="props.logoUrl"
            :src="props.logoUrl"
            :alt="t('navigation.appLogo')"
            class="onyx-navigation-bar__logo"
            width="24"
            height="24"
          />
        </slot>

        <span v-if="props.appName" class="onyx-text-small">{{ props.appName }}</span>
      </button>

      <OnyxIconButton
        v-if="props.showBackButton"
        :label="t('navigation.goBack')"
        :icon="chevronLeftSmall"
        variation="secondary"
        @click="emit('backButtonClick')"
      />

      <div v-if="slots.default" class="onyx-navigation-bar__items">
        <slot></slot>
      </div>

      <div v-if="slots.contextArea" class="onyx-navigation-bar__context">
        <slot name="contextArea"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";
@use "../../styles/breakpoints.scss";

.onyx-navigation-bar {
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
      margin: 0 auto;
      height: 100%;
      max-width: var(--onyx-grid-max-width);
      padding: 0 var(--onyx-spacing-3xl);

      @include breakpoints.container(max, sm) {
        padding: 0 var(--onyx-spacing-xl);
      }

      @include breakpoints.container(max, xs) {
        padding: 0 var(--onyx-spacing-md);
      }
    }

    &__app {
      // reset button styles
      background: none;
      border: none;
      color: inherit;

      display: flex;
      align-items: center;
      gap: var(--onyx-spacing-md);
      padding: var(--onyx-spacing-md);
      border-right: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
      font-weight: 600;
      white-space: pre-line;
      max-height: 100%;
      cursor: pointer;
      text-align: left;

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
    }

    &__logo {
      width: max-content;
      height: max-content;
      max-width: 1.5rem;
      max-height: 1.5rem;
    }

    &__items {
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
