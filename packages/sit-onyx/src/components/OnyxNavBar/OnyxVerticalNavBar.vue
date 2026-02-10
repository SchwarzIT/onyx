<script lang="ts" setup>
import { createNavigationMenu } from "@sit-onyx/headless";
import { iconChevronLeftSmall, iconSidebarArrowLeft, iconSidebarArrowRight } from "@sit-onyx/icons";
import { provide, toRef, useTemplateRef } from "vue";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import {
  OnyxIconButton,
  OnyxMoreList,
  OnyxNavAppArea,
  OnyxNavItem,
  OnyxSidebar,
} from "../../index.js";
import OnyxSeparator from "../OnyxSeparator/OnyxSeparator.vue";
import {
  NAV_BAR_isCollapsed_INJECTION_KEY,
  NAV_BAR_MORE_LIST_INJECTION_KEY,
  NAV_BAR_MORE_LIST_TARGET_INJECTION_KEY,
  type OnyxNavBarProps,
  type OnyxNavBarSlots,
} from "./types.js";

const props = withDefaults(defineProps<OnyxNavBarProps<"vertical">>(), {
  alignment: "top",
});

const emit = defineEmits<{
  /**
   * Emitted when the back button is clicked.
   */
  navigateBack: [event: MouseEvent];
  /**
   * Emitted when the collapsed state changes.
   */
  "update:collapsed": [collapsed: boolean];
}>();

const slots = defineSlots<OnyxNavBarSlots<"vertical">>();
const { t } = injectI18n();

const isCollapsed = useVModel({
  props,
  emit,
  key: "collapsed",
  default: false,
});

const {
  elements: { nav },
} = createNavigationMenu({ navigationName: toRef(() => props.appName) });

provide(NAV_BAR_MORE_LIST_TARGET_INJECTION_KEY, useTemplateRef("moreListRef"));
provide(NAV_BAR_isCollapsed_INJECTION_KEY, isCollapsed);
</script>

<template>
  <OnyxSidebar
    :label="t('navigation.navigationHeadline')"
    :class="[
      'onyx-nav-bar--vertical',
      { 'onyx-nav-bar--collapsed': isCollapsed },
      `onyx-nav-bar--alignment-${props.alignment}`,
    ]"
    :collapse-sidebar="false"
    :resizable="false"
  >
    <div class="onyx-nav-bar__content">
      <OnyxNavAppArea
        v-if="props.appName || props.logoUrl || slots.appArea"
        class="onyx-nav-bar__app"
        :app-name="isCollapsed ? '' : props.appName"
        :logo-url="props.logoUrl"
        v-bind="props.appArea"
      >
        <slot name="appArea"></slot>
      </OnyxNavAppArea>

      <div
        v-if="slots.globalContextArea || props.withBackButton"
        class="onyx-nav-bar__global-context"
        role="menubar"
      >
        <OnyxIconButton
          v-if="props.withBackButton"
          class="onyx-nav-bar__back"
          :label="t('navigation.goBack')"
          :icon="iconChevronLeftSmall"
          color="neutral"
        />
        <slot name="globalContextArea"></slot>
      </div>
      <OnyxSeparator
        v-if="slots.globalContextArea || props.withBackButton"
        class="onyx-nav-bar__separator"
      />
      <template v-if="slots.default">
        <nav class="onyx-nav-bar__nav" v-bind="nav">
          <OnyxMoreList is="ul" role="menubar" :injection-key="NAV_BAR_MORE_LIST_INJECTION_KEY">
            <template #default="{ attributes }">
              <div v-bind="attributes">
                <slot></slot>
              </div>
            </template>
          </OnyxMoreList>
        </nav>
      </template>
      <div class="onyx-nav-bar__context" role="menubar">
        <slot v-if="slots.contextArea" name="contextArea"></slot>

        <OnyxNavItem
          class="onyx-nav-bar__collapse-button"
          :label="isCollapsed ? t('navigation.expand') : t('navigation.collapse')"
          :icon="isCollapsed ? iconSidebarArrowRight : iconSidebarArrowLeft"
          @click="isCollapsed = !isCollapsed"
        />
      </div>
      <div v-if="slots.footer" class="onyx-nav-bar__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </OnyxSidebar>
</template>

<style lang="scss">
.onyx-nav-bar--vertical {
  .onyx-menu-item__trigger {
    padding: var(--onyx-spacing-2xs);
  }
  &.onyx-nav-bar--collapsed {
    width: calc(4 * var(--onyx-spacing-2xs) + 24px);
    min-width: 0;
    .onyx-nav-bar {
      &__separator {
        min-width: 0;
        width: 0;
      }
    }
    .onyx-user-menu {
      .onyx-truncation-ellipsis {
        display: none;
      }
    }
  }
  &.onyx-nav-bar--alignment-center {
    .onyx-nav-bar__nav {
      justify-content: center;
    }
  }
  .onyx-nav-bar {
    &__app {
      border-bottom: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
      border-right: none;
      width: 100%;
    }

    &__content {
      display: flex;
      flex-direction: column;
      padding-inline: initial;
      gap: initial;
    }
    &__nav {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      > ul {
        flex-direction: column;
        align-items: start;
      }
    }
    &__global-context {
      width: 100%;
      padding: var(--onyx-spacing-md) var(--onyx-spacing-2xs);
    }
    &__context,
    &__footer {
      flex-direction: column;
      width: 100%;
      padding: var(--onyx-spacing-2xs);
      align-items: start;
    }
    &__footer {
      border-top: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
    }
    &__separator {
      width: calc(100% - 2 * var(--onyx-density-md));
    }
  }
  .onyx-more-list__elements {
    display: flex;
    flex-direction: column;
    padding: var(--onyx-spacing-md) var(--onyx-spacing-2xs);
    width: 100%;
    .onyx-flyout-menu {
      width: 100%;
    }
  }

  .onyx-user-menu {
    width: 100%;

    .onyx-user-menu__trigger {
      padding: var(--onyx-spacing-2xs);
    }
    .onyx-user-menu__trigger,
    .onyx-flyout-menu {
      width: 100%;
    }
  }
}
</style>
