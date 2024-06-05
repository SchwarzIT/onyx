<script lang="ts" setup>
import chevronLeftSmall from "@sit-onyx/icons/chevron-left-small.svg?raw";
import menu from "@sit-onyx/icons/menu.svg?raw";
import moreVertical from "@sit-onyx/icons/more-vertical.svg?raw";
import { computed, ref, type RendererElement, type RendererNode, type VNode } from "vue";
import { injectI18n } from "../../i18n";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxNavAppArea from "../OnyxNavAppArea/OnyxNavAppArea.vue";
import OnyxNavItem from "../OnyxNavItem/OnyxNavItem.vue";
import type { OnyxNavItemProps } from "../OnyxNavItem/types";
import OnyxNavMobileButton from "../OnyxNavMobileButton/OnyxNavMobileButton.vue";
import type { OnyxNavBarProps } from "./types";

type NavItemVNode = VNode<RendererNode, RendererElement, OnyxNavItemProps>;

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
  appArea?: () => unknown;
  /**
   * Optional context area on the right to display additional (global) components, like user login, global settings etc.
   */
  contextArea?: () => unknown;
}>();

const { t } = injectI18n();

const isBurgerOpen = ref(false);
const isContextOpen = ref(false);

const allNavItems = computed(() => {
  const vnodes = slots.default?.() ?? [];
  const possibleVnodes = vnodes
    .filter((i) => !i.children || Array.isArray(i.children))
    .flatMap((i) => [i, ...(i.children as Extract<typeof i.children, typeof Array>)]);

  return possibleVnodes.filter((i): i is NavItemVNode => {
    if (typeof i.type !== "object" || !("__name" in i.type)) return false;
    return i.type.__name === OnyxNavItem.__name;
  });
});

const activeNavItemLabel = computed(() => {
  // TODO: check what to display if item has active child
  return allNavItems.value.find((i) => i.props?.active)?.props?.label;
});
</script>

<template>
  <header class="onyx-mobile-nav-bar">
    <div class="onyx-mobile-nav-bar__content">
      <OnyxNavMobileButton
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
          @click="emit('appAreaClick')"
        >
          <slot name="appArea"></slot>
        </OnyxNavAppArea>
      </div>

      <OnyxNavMobileButton
        v-model:open="isContextOpen"
        :icon="moreVertical"
        :label="t('navigation.toggleContextMenu')"
        @update:open="isBurgerOpen = false"
      />
    </div>

    <div v-if="isBurgerOpen" class="onyx-mobile-nav-bar__flyout">
      <OnyxHeadline is="h2">{{ t("navigation.navigationHeadline") }}</OnyxHeadline>

      <component
        :is="item"
        v-for="item in allNavItems"
        :key="item.props?.href ?? item.props?.label"
      />
    </div>

    <div v-if="isContextOpen" class="onyx-mobile-nav-bar__flyout">
      <OnyxHeadline is="h2">{{ t("navigation.optionsHeadline") }}</OnyxHeadline>

      <slot name="contextArea"></slot>
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

    &__content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: $height;
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

      display: flex;
      flex-direction: column;
      gap: var(--onyx-spacing-2xs);
      background: var(--onyx-color-base-background-tinted);
      padding: var(--onyx-spacing-xl) var(--onyx-spacing-md);

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

    .onyx-nav-app-area {
      border-right: none;
    }
  }
}
</style>
