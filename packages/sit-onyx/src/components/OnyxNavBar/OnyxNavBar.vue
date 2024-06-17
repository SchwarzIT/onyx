<script lang="ts" setup>
import chevronLeftSmall from "@sit-onyx/icons/chevron-left-small.svg?raw";
import menu from "@sit-onyx/icons/menu.svg?raw";
import moreVertical from "@sit-onyx/icons/more-vertical.svg?raw";
import { computed, provide, ref } from "vue";
import { useResizeObserver } from "../../composables/useResizeObserver";
import { injectI18n } from "../../i18n";
import { ONYX_BREAKPOINTS } from "../../types";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxIconButton from "../OnyxIconButton/OnyxIconButton.vue";
import OnyxMobileNavButton from "../OnyxMobileNavButton/OnyxMobileNavButton.vue";
import OnyxNavAppArea from "../OnyxNavAppArea/OnyxNavAppArea.vue";
import { mobileNavBarInjectionKey, type OnyxNavBarProps } from "./types";

const props = withDefaults(defineProps<OnyxNavBarProps>(), {
  mobileBreakpoint: "sm",
});

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
  /**
   * Label for displaying the currently active page in mobile mode.
   * If a child of a nav item is active, it should displayed the child label instead of the parent.
   */
  mobileActivePage?: () => unknown;
}>();

const navBarRef = ref<HTMLElement>();
const { width } = useResizeObserver(navBarRef);

const isBurgerOpen = ref(false);
const isContextOpen = ref(false);

const isMobile = computed(() => {
  const mobileWidth =
    typeof props.mobileBreakpoint === "number"
      ? props.mobileBreakpoint
      : ONYX_BREAKPOINTS[props.mobileBreakpoint];
  return width.value !== 0 && width.value <= mobileWidth;
});

provide(mobileNavBarInjectionKey, isMobile);

const { t } = injectI18n();
</script>

<template>
  <div>
    <header ref="navBarRef" class="onyx-nav-bar" :class="{ 'onyx-nav-bar--mobile': isMobile }">
      <div class="onyx-nav-bar__content">
        <span
          v-if="isMobile && !isBurgerOpen && slots.mobileActivePage"
          class="onyx-nav-bar__mobile-page"
        >
          <slot name="mobileActivePage"></slot>
        </span>

        <OnyxNavAppArea
          v-else-if="props.appName || props.logoUrl || slots.appArea"
          class="onyx-nav-bar__app"
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

        <OnyxIconButton
          v-if="props.withBackButton"
          class="onyx-nav-bar__back"
          :label="t('navigation.goBack')"
          :icon="chevronLeftSmall"
          color="neutral"
          @click="emit('backButtonClick')"
        />

        <template v-if="slots.default">
          <OnyxMobileNavButton
            v-if="isMobile"
            v-model:open="isBurgerOpen"
            class="onyx-nav-bar__burger"
            :icon="menu"
            :label="t('navigation.toggleBurgerMenu')"
            @update:open="isContextOpen = false"
          />

          <nav v-else class="onyx-nav-bar__nav">
            <ul role="menubar">
              <slot></slot>
            </ul>
          </nav>
        </template>

        <template v-if="slots.contextArea">
          <OnyxMobileNavButton
            v-if="isMobile"
            v-model:open="isContextOpen"
            class="onyx-nav-bar__mobile-context"
            :icon="moreVertical"
            :label="t('navigation.toggleContextMenu')"
            @update:open="isBurgerOpen = false"
          />

          <div v-else class="onyx-nav-bar__context">
            <slot name="contextArea"></slot>
          </div>
        </template>
      </div>
    </header>

    <!-- TODO: implement mobile burger/context flyouts -->
    <div v-if="isMobile && isBurgerOpen" class="onyx-nav-bar__mobile-flyout">
      <div class="onyx-nav-bar__mobile-flyout-content">
        <OnyxHeadline is="h2">{{ t("navigation.navigationHeadline") }}</OnyxHeadline>

        <nav>
          <ul role="menubar">
            <slot></slot>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";
@use "../../styles/breakpoints.scss";

$gap: var(--onyx-spacing-md);

.onyx-nav-bar {
  @include layers.component() {
    background-color: var(--onyx-color-base-background-blank);
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);
    height: 3.5rem;
    z-index: var(--onyx-z-index-navigation);
    position: relative;
    container-type: size;

    // implement bottom border with ::after so it does not add to the height
    &::after {
      content: " ";
      background-color: var(--onyx-color-base-neutral-300);
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
      padding-inline: var(--onyx-spacing-3xl);

      &:has(.onyx-nav-bar__back) {
        grid-template-columns: max-content max-content 1fr auto;
        grid-template-areas: "app back nav context";
      }

      // sync with grid
      max-width: var(--onyx-grid-max-width);
      margin-inline: var(--onyx-grid-margin-inline);

      @include breakpoints.container(max, sm) {
        padding-inline: var(--onyx-spacing-xl);
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
    }

    &__context {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--onyx-spacing-4xs);
      grid-area: context;
    }

    &__app {
      border-right: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
      grid-area: app;
    }

    &--mobile {
      .onyx-nav-bar__content {
        grid-template-columns: max-content max-content max-content auto;
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
      border-right: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
      grid-area: burger;
    }

    &__mobile-context {
      grid-area: mobile-context;
      margin-left: auto;
    }

    &__mobile-page {
      grid-area: nav;
      color: var(--onyx-color-text-icons-secondary-intense);
      padding-inline: $gap;
      font-weight: 600;
    }

    &__mobile-flyout {
      width: 100%;
      background-color: var(--onyx-color-base-background-tinted);
      box-shadow: var(--onyx-shadow-medium-bottom);
    }

    &__mobile-flyout-content {
      max-width: 34rem;
      padding: var(--onyx-spacing-xl) var(--onyx-spacing-md);
      display: flex;
      flex-direction: column;
      margin-inline: auto;
      gap: var(--onyx-spacing-2xs);

      nav {
        display: contents;

        > ul {
          display: contents;
        }
      }

      &:has(.onyx-nav-item__mobile-children) {
        .onyx-headline {
          display: none;
        }
      }

      :has(.onyx-nav-item__mobile-children) {
        > .onyx-nav-item:not(:has(.onyx-nav-item__mobile-children)) {
          display: none;
        }
      }
    }
  }
}
</style>
