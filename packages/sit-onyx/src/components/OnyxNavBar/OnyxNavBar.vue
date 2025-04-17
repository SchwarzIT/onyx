<script lang="ts" setup>
import { createNavigationMenu } from "@sit-onyx/headless";
import chevronLeftSmall from "@sit-onyx/icons/chevron-left-small.svg?raw";
import menu from "@sit-onyx/icons/menu.svg?raw";
import moreVertical from "@sit-onyx/icons/more-vertical.svg?raw";
import { ONYX_BREAKPOINTS } from "@sit-onyx/shared/breakpoints";
import { computed, provide, ref, toRef, useId, useTemplateRef, watch } from "vue";
import { useLink } from "../../composables/useLink";
import { useResizeObserver } from "../../composables/useResizeObserver";
import { injectI18n } from "../../i18n";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxMobileNavButton from "../OnyxMobileNavButton/OnyxMobileNavButton.vue";
import OnyxMoreList from "../OnyxMoreList/OnyxMoreList.vue";
import OnyxNavAppArea from "../OnyxNavAppArea/OnyxNavAppArea.vue";
import OnyxFlyoutMenu from "./modules/OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxNavItemFacade from "./modules/OnyxNavItemFacade/OnyxNavItemFacade.vue";
import {
  MOBILE_NAV_BAR_INJECTION_KEY,
  NAV_BAR_MORE_LIST_INJECTION_KEY,
  NAV_BAR_MORE_LIST_TARGET_INJECTION_KEY,
  type OnyxNavBarProps,
} from "./types";

const props = withDefaults(defineProps<OnyxNavBarProps>(), {
  mobileBreakpoint: "sm",
});

const emit = defineEmits<{
  /**
   * Emitted when the back button is clicked.
   */
  navigateBack: [event: MouseEvent];
}>();

const slots = defineSlots<{
  /**
   * [`OnyxNavItem`](/docs/navigation-modules-navitem--docs) components should be placed and nested here to build the navigation.
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
  /**
   * Same as `contextArea` slot on desktop (will be placed next to it) but on mobile, the components inside will stay
   * in the mobile nav bar itself and will not be collapsed into the context menu button.
   *
   * Global actions like e.g. search or notification center can be placed here that should always be directly accessible on mobile.
   */
  globalContextArea?: () => unknown;
  /**
   * Label for displaying the currently active page in mobile mode.
   * If a child of a nav item is active, it should displayed the child label instead of the parent.
   */
  mobileActivePage?: () => unknown;
}>();

const navBar = useTemplateRef("navBarRef");
const { width } = useResizeObserver(navBar);
const { t } = injectI18n();
const { currentRoute } = useLink();

const {
  elements: { nav },
} = createNavigationMenu({ navigationName: toRef(() => props.appName) });

const isBurgerOpen = ref(false);
const isContextOpen = ref(false);

const isMobile = computed(() => {
  const mobileWidth =
    typeof props.mobileBreakpoint === "number"
      ? props.mobileBreakpoint
      : ONYX_BREAKPOINTS[props.mobileBreakpoint];
  return width.value !== 0 && width.value < mobileWidth;
});
const moreListTargetId = useId();
provide(MOBILE_NAV_BAR_INJECTION_KEY, isMobile);
provide(NAV_BAR_MORE_LIST_TARGET_INJECTION_KEY, `#${moreListTargetId}`);

const closeMobileMenus = () => {
  isBurgerOpen.value = false;
  isContextOpen.value = false;
};

watch(currentRoute, () => closeMobileMenus(), { deep: true });

defineExpose({
  /**
   * Closes the mobile burger and context menu.
   * Useful if you want to e.g. close them when a nav item is clicked.
   * Will be automatically done if a router is provided.
   *
   * Example usage:
   *
   * ```ts
   * const route = useRoute();
   * const navBar = useTemplateRef("navBarRef");
   *
   * watch(() => route.path, () => navBar.value?.closeMobileMenus());
   * ```
   */
  closeMobileMenus,
});
</script>

<template>
  <header
    ref="navBarRef"
    class="onyx-component onyx-nav-bar"
    :class="{ 'onyx-nav-bar--mobile': isMobile }"
  >
    <div class="onyx-nav-bar__content">
      <span
        v-if="isMobile && slots.mobileActivePage && !isBurgerOpen && !isContextOpen"
        class="onyx-nav-bar__mobile-page onyx-truncation-ellipsis"
      >
        <slot name="mobileActivePage"></slot>
      </span>

      <OnyxNavAppArea
        v-else-if="props.appName || props.logoUrl || slots.appArea"
        class="onyx-nav-bar__app"
        :app-name="props.appName"
        :logo-url="props.logoUrl"
        v-bind="props.appArea"
      >
        <slot name="appArea"></slot>
      </OnyxNavAppArea>

      <OnyxIconButton
        v-if="props.withBackButton"
        class="onyx-nav-bar__back"
        :label="t('navigation.goBack')"
        :icon="chevronLeftSmall"
        color="neutral"
        @click="emit('navigateBack', $event)"
      />

      <template v-if="slots.default">
        <OnyxMobileNavButton
          v-if="isMobile"
          v-model:open="isBurgerOpen"
          class="onyx-nav-bar__burger"
          :icon="menu"
          :label="t('navigation.toggleBurgerMenu')"
          :headline="t('navigation.navigationHeadline')"
          @update:open="isContextOpen = false"
        >
          <nav class="onyx-nav-bar__nav--mobile" v-bind="nav">
            <ul role="menubar">
              <slot></slot>
            </ul>
          </nav>
        </OnyxMobileNavButton>

        <nav v-else class="onyx-nav-bar__nav" v-bind="nav">
          <OnyxMoreList is="ul" role="menubar" :injection-key="NAV_BAR_MORE_LIST_INJECTION_KEY">
            <template #default="{ attributes }">
              <div v-bind="attributes">
                <slot></slot>
              </div>
            </template>
            <template #more="{ attributes }">
              <OnyxFlyoutMenu :label="t('navigation.moreNavItems')" v-bind="attributes">
                <template #button="{ trigger }">
                  <OnyxNavItemFacade v-bind="trigger" label="more" context="navbar" />
                </template>

                <template #options>
                  <div :id="moreListTargetId"></div>
                </template>
              </OnyxFlyoutMenu>
            </template>
          </OnyxMoreList>
        </nav>
      </template>

      <template v-if="slots.contextArea || slots.globalContextArea">
        <div v-if="isMobile" class="onyx-nav-bar__mobile-context">
          <div v-if="slots.globalContextArea" class="onyx-nav-bar__mobile-global-context">
            <slot name="globalContextArea"></slot>
          </div>

          <OnyxMobileNavButton
            v-if="slots.contextArea"
            v-model:open="isContextOpen"
            :icon="moreVertical"
            :label="t('navigation.toggleContextMenu')"
            @update:open="isBurgerOpen = false"
          >
            <div class="onyx-nav-bar__mobile-context-content">
              <slot name="contextArea"></slot>
            </div>
          </OnyxMobileNavButton>
        </div>

        <div v-else class="onyx-nav-bar__context">
          <slot v-if="slots.globalContextArea" name="globalContextArea"></slot>
          <slot v-if="slots.contextArea" name="contextArea"></slot>
        </div>
      </template>
    </div>
  </header>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

$gap: var(--onyx-spacing-md);

.onyx-nav-bar {
  @include layers.component() {
    .onyx-flyout-menu {
      --onyx-flyout-menu-gap: var(--onyx-spacing-md);
    }

    background-color: var(--onyx-color-base-background-blank);
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    height: var(--onyx-nav-bar-height);
    z-index: var(--onyx-z-index-navigation);
    position: relative;
    container-type: size;

    // implement bottom border with ::after so it does not add to the height
    &::after {
      content: " ";
      background-color: var(--onyx-color-component-border-neutral);
      height: var(--onyx-1px-in-rem);
      width: 100%;
      position: absolute;
      bottom: 0;
    }

    &__content {
      display: grid;
      grid-template-columns: max-content 1fr auto;
      grid-template-areas: "app nav context";
      align-items: center;
      gap: $gap;
      height: 100%;
      padding-inline: var(--onyx-grid-margin);

      // sync with grid
      max-width: var(--onyx-grid-max-width);
      margin-inline: var(--onyx-grid-margin-inline);

      &:has(.onyx-nav-bar__back) {
        grid-template-columns: max-content max-content 1fr auto;
        grid-template-areas: "app back nav context";
      }
    }

    &__back {
      grid-area: back;
    }

    &__nav {
      grid-area: nav;

      > ul {
        display: flex;
        align-items: center;
        gap: var(--onyx-spacing-4xs);
        padding: 0;
      }

      &--mobile {
        display: flex;
        flex-direction: column;
        gap: var(--onyx-spacing-2xs);

        > ul {
          display: contents;
        }
      }
    }

    // fix outline being cut-off by the clipping
    .onyx-more-list__elements {
      padding-inline: 0.25rem;
    }

    &__context {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--onyx-spacing-4xs);
      grid-area: context;
    }

    &__app {
      border-right: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
      grid-area: app;
    }

    &--mobile {
      .onyx-nav-bar__content {
        grid-template-columns: max-content max-content auto auto;
        grid-template-areas: "burger back nav mobile-context";
        gap: 0;
        padding-inline: 0;

        .onyx-nav-bar__back {
          margin-left: $gap;
        }
      }

      .onyx-nav-bar__app {
        border-right: none;
        grid-area: nav;
      }
    }

    &__burger {
      border-right: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
      grid-area: burger;
    }

    &__mobile-context {
      grid-area: mobile-context;
      display: flex;
      align-items: center;
      margin-left: auto;
      gap: var(--onyx-spacing-4xs);
    }

    &__mobile-global-context {
      display: flex;
      flex-direction: row-reverse;
      gap: inherit;
    }

    &__mobile-context-content {
      display: flex;
      flex-direction: row-reverse;
      flex-wrap: wrap-reverse;
      align-items: center;
      justify-content: flex-end;
      gap: var(--onyx-spacing-2xs);

      // add extra spacing after the user menu if it is not immediately followed by a nav separator
      // since we are in a row-reverse layout, we need to "separator + user menu" as selector
      // to check if a nav separator exists "visually" after the user menu
      &:not(:has(.onyx-nav-separator + .onyx-user-menu)) {
        .onyx-user-menu {
          margin-bottom: var(--onyx-spacing-md);
        }
      }
    }

    &__mobile-page {
      grid-area: nav;
      color: var(--onyx-color-text-icons-primary-intense);
      padding-inline: $gap;
      font-weight: 600;
    }

    .onyx-mobile-nav-button {
      --top-position: var(--onyx-nav-bar-height);
    }
  }
}
</style>
