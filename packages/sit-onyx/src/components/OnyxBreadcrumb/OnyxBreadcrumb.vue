<script lang="ts" setup>
import { iconHome } from "@sit-onyx/icons";
import { useDensity } from "../../composables/density.js";
import { provideSkeletonContext } from "../../composables/useSkeletonState.js";
import { injectI18n } from "../../i18n/index.js";
import OnyxBreadcrumbItem from "../OnyxBreadcrumbItem/OnyxBreadcrumbItem.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxBreadcrumbProps } from "./types.js";

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
      'onyx-grid-container',
      densityClass,
      { 'onyx-breadcrumb--container': props.container },
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
        <OnyxIcon v-if="!props.home?.label" :icon="iconHome" size="16px" />
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
    }
  }
}
</style>
