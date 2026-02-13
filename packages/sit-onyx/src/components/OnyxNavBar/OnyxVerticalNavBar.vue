<script lang="ts" setup>
import { createNavigationMenu } from "@sit-onyx/headless";
import { iconChevronLeftSmall, iconSidebarArrowLeft, iconSidebarArrowRight } from "@sit-onyx/icons";
import { provide, toRef } from "vue";
import { useVModel } from "../../composables/useVModel.js";
import { injectI18n } from "../../i18n/index.js";
import { OnyxMoreList, OnyxNavAppArea, OnyxNavItem, OnyxSidebar } from "../../index.js";
import OnyxSeparator from "../OnyxSeparator/OnyxSeparator.vue";
import {
  NAV_BAR_IS_EXPANDED_INJECTION_KEY,
  NAV_BAR_MORE_LIST_INJECTION_KEY,
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
   * Emitted when the expanded state changes.
   */
  "update:expanded": [expanded: boolean];
}>();

const slots = defineSlots<OnyxNavBarSlots>();
const { t } = injectI18n();

const isExpanded = useVModel({
  props,
  emit,
  key: "expanded",
  default: false,
});

const {
  elements: { nav },
} = createNavigationMenu({ navigationName: toRef(() => props.appName) });

provide(NAV_BAR_IS_EXPANDED_INJECTION_KEY, isExpanded);
</script>

<template>
  <OnyxSidebar
    :label="t('navigation.navigationHeadline')"
    :class="[
      'onyx-nav-bar--vertical',
      { 'onyx-nav-bar--expanded': isExpanded },
      `onyx-nav-bar--alignment-${props.alignment}`,
    ]"
    :collapse-sidebar="false"
    :resizable="false"
  >
    <div class="onyx-nav-bar__content">
      <OnyxNavAppArea
        v-if="props.appName || props.logoUrl || slots.appArea"
        class="onyx-nav-bar__app"
        :app-name="isExpanded ? props.appName : undefined"
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
        <OnyxNavItem
          v-if="props.withBackButton"
          class="onyx-nav-bar__back"
          :label="t('navigation.goBack')"
          :icon="iconChevronLeftSmall"
          @click="emit('navigateBack', $event)"
        />

        <slot v-if="slots.globalContextArea" name="globalContextArea"></slot>
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
      <div v-if="slots.contextArea" class="onyx-nav-bar__context">
        <slot name="contextArea"></slot>
      </div>
      <div class="onyx-nav-bar__footer" role="menubar">
        <OnyxNavItem
          class="onyx-nav-bar__collapse-button"
          :label="isExpanded ? t('navigation.collapse') : t('navigation.expand')"
          :icon="isExpanded ? iconSidebarArrowLeft : iconSidebarArrowRight"
          @click="isExpanded = !isExpanded"
        />
      </div>
    </div>
  </OnyxSidebar>
</template>

<style lang="scss">
.onyx-nav-bar--vertical {
  // 2x navItem padding + 2x verticalNavBar padding + item width
  width: calc(4 * var(--onyx-spacing-2xs) + 24px);
  min-width: 0;
  &:not(&.onyx-nav-bar--expanded) {
    .onyx-user-menu {
      .onyx-user-menu__trigger .onyx-truncation-ellipsis {
        display: none;
      }
    }
    .onyx-nav-bar {
      &__separator {
        min-width: 0;
        width: 0;
      }
    }
  }
  .onyx-menu-item__trigger {
    padding: var(--onyx-spacing-2xs);
  }
  &.onyx-nav-bar--expanded {
    width: var(--onyx-sidebar-width);
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
    &__collapse-button {
      color: var(--onyx-color-text-icons-neutral-medium);
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
