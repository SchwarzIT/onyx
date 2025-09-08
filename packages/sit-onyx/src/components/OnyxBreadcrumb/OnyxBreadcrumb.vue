<script lang="ts" setup>
import { iconHome, iconMoreHorizontal } from "@sit-onyx/icons";
import { provide, useTemplateRef } from "vue";
import { useDensity } from "../../composables/density.js";
import { provideSkeletonContext } from "../../composables/useSkeletonState.js";
import { injectI18n } from "../../i18n/index.js";
import OnyxBreadcrumbItem from "../OnyxBreadcrumbItem/OnyxBreadcrumbItem.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxMoreList from "../OnyxMoreList/OnyxMoreList.vue";
import OnyxFlyoutMenu from "../OnyxNavBar/modules/OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import {
  BREADCRUMB_MORE_LIST_INJECTION_KEY,
  BREADCRUMB_MORE_LIST_TARGET_INJECTION_KEY,
  type OnyxBreadcrumbProps,
} from "./types.js";

const props = withDefaults(defineProps<OnyxBreadcrumbProps>(), {
  container: false,
});

defineSlots<{
  /**
   * Breadcrumb items (see `OnyxBreadcrumbItem` component).
   */
  default(): unknown;
}>();

const { t } = injectI18n();
const { densityClass } = useDensity(props);

provideSkeletonContext(props);

provide(BREADCRUMB_MORE_LIST_TARGET_INJECTION_KEY, useTemplateRef("moreListRef"));
</script>

<template>
  <nav
    :class="[
      'onyx-component',
      'onyx-breadcrumb',
      densityClass,
      { 'onyx-breadcrumb--container': props.container },
    ]"
    :aria-label="t('breadcrumb.label')"
  >
    <ol class="onyx-breadcrumb__list onyx-grid-container" role="menu">
      <OnyxBreadcrumbItem
        class="onyx-breadcrumb__home"
        :href="props.home?.link ?? '/'"
        :aria-label="props.home?.label ?? t('breadcrumb.home')"
        :skeleton="skeleton"
      >
        <OnyxIcon v-if="!props.home?.label" :icon="iconHome" size="16px" />
        <template v-else>{{ props.home.label }}</template>
      </OnyxBreadcrumbItem>

      <OnyxMoreList :injection-key="BREADCRUMB_MORE_LIST_INJECTION_KEY" direction="ltr">
        <template #default="{ attributes }">
          <div v-bind="attributes">
            <slot></slot>
          </div>
        </template>
        <template #more="{ attributes }">
          <OnyxFlyoutMenu
            v-bind="attributes"
            :label="t('navigation.moreNavItemsLabel')"
            trigger="click"
          >
            <template #button="{ trigger }">
              <OnyxBreadcrumbItem
                v-bind="trigger"
                :aria-label="t('navigation.showMoreNavItemsLabel')"
                :title="t('navigation.showMoreNavItemsLabel')"
                :icon="iconMoreHorizontal"
              >
                <OnyxIcon :icon="iconMoreHorizontal" size="16px" />
              </OnyxBreadcrumbItem>
            </template>

            <template #options>
              <div ref="moreListRef"></div>
            </template>
          </OnyxFlyoutMenu>
        </template>
      </OnyxMoreList>
    </ol>
  </nav>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-breadcrumb {
  @include layers.component() {
    &--container {
      border-bottom: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
      background-color: var(--onyx-color-base-background-blank);

      .onyx-breadcrumb__list {
        padding: var(--onyx-density-xs) var(--onyx-grid-margin);
      }
    }

    &__list {
      list-style: none;
      padding: 0;
      font-family: var(--onyx-font-family);
      display: flex;
      align-items: center;
      gap: var(--onyx-density-xs);
    }

    &__home {
      .onyx-breadcrumb-item__skeleton {
        width: 1.5rem;
      }

      &::before {
        display: none;
      }
    }
  }
}
</style>
