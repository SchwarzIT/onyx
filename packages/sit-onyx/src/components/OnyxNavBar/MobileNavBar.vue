<script lang="ts" setup>
import chevronLeftSmall from "@sit-onyx/icons/chevron-left-small.svg?raw";
import menu from "@sit-onyx/icons/menu.svg?raw";
import moreVertical from "@sit-onyx/icons/more-vertical.svg?raw";
import { computed, ref, type VNode } from "vue";
import { injectI18n } from "../../i18n";
import { filterVNodesByComponent } from "../../utils/vue";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxMobileNavButton from "../OnyxMobileNavButton/OnyxMobileNavButton.vue";
import OnyxNavAppArea from "../OnyxNavAppArea/OnyxNavAppArea.vue";
import OnyxNavItem from "../OnyxNavItem/OnyxNavItem.vue";
import OnyxUserMenu from "../OnyxUserMenu/OnyxUserMenu.vue";
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
  default?: () => VNode[];
  /**
   * Optional slot to override the app area content (logo and app name, e.g. with a custom icon / `OnyxIcon` component).
   */
  appArea?: () => VNode[];
  /**
   * Optional context area on the right to display additional (global) components, like user login, global settings etc.
   */
  contextArea?: () => VNode[];
}>();

const { t } = injectI18n();

const isBurgerOpen = ref(false);
const isContextOpen = ref(false);

const allNavItems = computed(() => {
  const vnodes = slots.default?.() ?? [];
  return filterVNodesByComponent(vnodes, OnyxNavItem);
});

const activeNavItemLabel = computed(() => {
  // TODO: check what to display if item has active child
  const activeItem = allNavItems.value.find(
    (i) => i.props?.active || i.props?.options?.some((j) => j.active),
  );
  if (!activeItem?.props) return;
  const activeNestedItem = activeItem.props.options?.find((i) => i.active);
  return activeNestedItem?.label ?? activeItem.props.label;
});

const contextAreaComponents = computed(() => slots.contextArea?.() ?? []);

const userMenu = computed(() => {
  return filterVNodesByComponent(contextAreaComponents.value, OnyxUserMenu).at(0);
});

const contextAreaFooter = computed(() => {
  const children = userMenu.value?.children;
  if (!children || typeof children !== "object" || Array.isArray(children)) return;
  return children.footer;
});
</script>

<template>
  <header class="onyx-mobile-nav-bar">
    <div class="onyx-mobile-nav-bar__content">
      <OnyxMobileNavButton
        v-model:open="isBurgerOpen"
        :icon="menu"
        :label="t('navigation.toggleBurgerMenu')"
        class="onyx-mobile-nav-bar__burger"
        @update:open="isContextOpen = false"
      />

      <div class="onyx-mobile-nav-bar__main">
        <OnyxIconButton
          v-if="props.withBackButton"
          class="onyx-mobile-nav-bar__back"
          :label="t('navigation.goBack')"
          :icon="chevronLeftSmall"
          color="neutral"
          @click="emit('backButtonClick')"
        />

        <span v-if="activeNavItemLabel && !isBurgerOpen" class="onyx-mobile-nav-bar__page">
          {{ activeNavItemLabel }}
        </span>

        <OnyxNavAppArea
          v-else-if="props.appName || props.logoUrl || slots.appArea"
          :app-name="props.appName"
          :logo-url="props.logoUrl"
          :label="props.appAreaLabel"
          @click="
            emit('appAreaClick');
            isBurgerOpen = false;
          "
        >
          <slot name="appArea"></slot>
        </OnyxNavAppArea>
      </div>

      <OnyxMobileNavButton
        v-model:open="isContextOpen"
        :icon="moreVertical"
        :label="t('navigation.toggleContextMenu')"
        @update:open="isBurgerOpen = false"
      />
    </div>

    <div v-if="isBurgerOpen" class="onyx-mobile-nav-bar__flyout">
      <div class="onyx-mobile-nav-bar__flyout-content">
        <OnyxHeadline is="h2">{{ t("navigation.navigationHeadline") }}</OnyxHeadline>

        <nav v-if="slots.default">
          <ul class="onyx-mobile-nav-bar__nav" role="menubar">
            <!-- TODO: add nav items -->
          </ul>
        </nav>
      </div>
    </div>

    <div v-if="isContextOpen" class="onyx-mobile-nav-bar__flyout">
      <div class="onyx-mobile-nav-bar__flyout-content">
        <!-- TODO: add avatar and user menu options -->

        <OnyxHeadline is="h2">{{ t("navigation.optionsHeadline") }}</OnyxHeadline>

        <div class="onyx-mobile-nav-bar__context">
          <!-- TODO: add context options -->
        </div>
      </div>

      <div class="onyx-mobile-nav-bar__footer">
        <component :is="contextAreaFooter" v-if="contextAreaFooter" />
      </div>
    </div>
  </header>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

$height: 3.5rem;

.onyx-mobile-nav-bar {
  @include layers.component() {
    background: var(--onyx-color-base-background-blank);
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    z-index: var(--onyx-z-index-navigation);
    position: relative;

    &:has(&__flyout) {
      &::after {
        height: calc(100vh - $height);
        width: 100%;
        content: "";
        display: block;
        position: absolute;
        top: $height;
        z-index: -1;

        // TODO: check color (also with dark mode)
        background-color: rgba(0, 0, 0, 0.2);
      }
    }

    &__content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: $height;

      // implement bottom border with :.after so it does not add to the height
      &::after {
        content: "";
        background-color: var(--onyx-color-base-neutral-300);
        height: var(--onyx-1px-in-rem);
        width: 100%;
        display: block;
        position: absolute;
        bottom: 0;
      }
    }

    &__main {
      font-size: 1rem;
      line-height: 1.5rem;
      font-weight: 600;
      flex-grow: 1;

      display: flex;
      align-items: center;

      &:has(.onyx-mobile-nav-bar__back) {
        padding-left: var(--onyx-spacing-md);
      }
    }

    &__burger {
      border-right: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
    }

    &__page {
      color: var(--onyx-color-text-icons-secondary-intense);
      padding-inline: var(--onyx-spacing-md);
    }

    &__flyout {
      position: absolute;
      top: $height;
      width: 100%;
      background-color: var(--onyx-color-base-background-tinted);

      .onyx-user-menu {
        &__flyout {
          visibility: visible;
          opacity: 1;
          position: initial;
        }

        &__trigger {
          display: none;
        }
      }
    }

    &__flyout-content {
      padding: var(--onyx-spacing-xl) var(--onyx-spacing-md);
      display: flex;
      flex-direction: column;
      gap: var(--onyx-spacing-2xs);
    }

    &__context {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--onyx-spacing-2xs);
    }

    &__footer {
      border-top: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
      padding: var(--onyx-spacing-4xs) var(--onyx-spacing-md);
      color: var(--onyx-color-text-icons-neutral-soft);
      background-color: var(--onyx-color-base-background-blank);

      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--onyx-spacing-2xs);
    }

    &__nav {
      padding: 0;
    }
  }
}
</style>
