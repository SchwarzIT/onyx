<script lang="ts" setup>
import homeIcon from "@sit-onyx/icons/home.svg?raw";
import { useDensity } from "../../composables/density";
import { provideSkeletonContext } from "../../composables/useSkeletonState";
import { injectI18n } from "../../i18n";
import OnyxBreadcrumbItem from "../OnyxBreadcrumbItem/OnyxBreadcrumbItem.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxBreadcrumbProps } from "./types";

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
</script>

<template>
  <nav
    :class="[
      'onyx-component',
      'onyx-breadcrumb',
      densityClass,
      props.container ? 'onyx-breadcrumb--container' : '',
    ]"
    :aria-label="t('breadcrumb.label')"
  >
    <ol class="onyx-breadcrumb__list">
      <OnyxBreadcrumbItem
        class="onyx-breadcrumb__home"
        :href="props.home?.link ?? '/'"
        :aria-label="props.home?.label ?? t('breadcrumb.home')"
        :skeleton="skeleton"
      >
        <OnyxIcon v-if="!props.home?.label" :icon="homeIcon" size="16px" />
        <template v-else>{{ props.home.label }}</template>
      </OnyxBreadcrumbItem>

      <slot></slot>
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
      padding: var(--onyx-density-xs) var(--onyx-density-xl);
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
    }
  }
}
</style>
