<script lang="ts" setup>
import { computed, inject } from "vue";
import { useDensity } from "../../composables/density.js";
import { useLink } from "../../composables/useLink.js";
import { useMoreListChild } from "../../composables/useMoreList.js";
import {
  SKELETON_INJECTED_SYMBOL,
  useSkeletonContext,
} from "../../composables/useSkeletonState.js";
import { useRootAttrs } from "../../utils/attrs.js";
import {
  BREADCRUMB_MORE_LIST_INJECTION_KEY,
  BREADCRUMB_MORE_LIST_TARGET_INJECTION_KEY,
} from "../OnyxBreadcrumb/types.js";
import ButtonOrLinkLayout from "../OnyxButton/ButtonOrLinkLayout.vue";
import OnyxMenuItem from "../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxSkeleton from "../OnyxSkeleton/OnyxSkeleton.vue";
import type { OnyxBreadcrumbItemProps } from "./types.js";

const props = withDefaults(defineProps<OnyxBreadcrumbItemProps>(), {
  active: "auto",
  skeleton: SKELETON_INJECTED_SYMBOL,
});

defineSlots<{
  /**
   * Item content / page name.
   */
  default(): unknown;
}>();

defineOptions({ inheritAttrs: false });
const { restAttrs, rootAttrs } = useRootAttrs();

const { densityClass } = useDensity(props);
const { currentRoute } = useLink();
const skeleton = useSkeletonContext(props);

const { componentRef, isVisible } = useMoreListChild(BREADCRUMB_MORE_LIST_INJECTION_KEY);
const moreListTargetRef = inject(BREADCRUMB_MORE_LIST_TARGET_INJECTION_KEY, undefined);

const isActive = computed(() => {
  return props.href && props.active === "auto"
    ? props.href === currentRoute.value?.path
    : props.active;
});
</script>

<template>
  <li
    v-if="isVisible || isActive"
    ref="componentRef"
    :class="[
      'onyx-component',
      'onyx-breadcrumb-item',
      'onyx-text--small',
      densityClass,
      { 'onyx-breadcrumb-item--active': isActive },
    ]"
    role="menuitem"
    v-bind="rootAttrs"
  >
    <OnyxSkeleton
      v-if="skeleton"
      class="onyx-breadcrumb-item__link onyx-breadcrumb-item__skeleton"
    />

    <ButtonOrLinkLayout
      v-else
      class="onyx-breadcrumb-item__link"
      :link="props.href"
      :aria-current="isActive ? 'page' : undefined"
      v-bind="restAttrs"
    >
      <slot></slot>
    </ButtonOrLinkLayout>
  </li>
  <Teleport :to="moreListTargetRef" :disabled="!moreListTargetRef">
    <OnyxMenuItem v-if="!isVisible" :link="props.href" :active="isActive" v-bind="restAttrs">
      <slot></slot>
    </OnyxMenuItem>
  </Teleport>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-breadcrumb-item {
  @include layers.component() {
    --onyx-breadcrumb-item-color: var(--onyx-color-text-icons-neutral-medium);
    --onyx-breadcrumb-item-color-hover: var(--onyx-color-text-icons-neutral-intense);
    --onyx-breadcrumb-item-background: transparent;
    --onyx-breadcrumb-item-background-hover: var(--onyx-color-base-neutral-200);
    --onyx-breadcrumb-item-outline-color: var(--onyx-color-component-focus-neutral);
    --onyx-breadcrumb-item-padding-vertical: var(--onyx-density-3xs);
    --onyx-breadcrumb-item-padding-inline: var(--onyx-density-xs);
    list-style: none;
    font-family: var(--onyx-font-family);
    color: var(--onyx-breadcrumb-item-color);
    background-color: var(--onyx-breadcrumb-item-background);
    display: inline-flex;
    justify-content: center;
    align-items: center;

    &__link {
      display: inherit;
      justify-content: inherit;
      align-items: inherit;
      gap: var(--onyx-density-3xs);
      padding: var(--onyx-breadcrumb-item-padding-vertical)
        var(--onyx-breadcrumb-item-padding-inline);
      border-radius: var(--onyx-radius-sm);
      border: none;
      background-color: transparent;
      cursor: pointer;

      &:hover {
        color: var(--onyx-breadcrumb-item-color-hover);
        background-color: var(--onyx-breadcrumb-item-background-hover);
      }

      &:focus-visible {
        outline: var(--onyx-outline-width) solid var(--onyx-breadcrumb-item-outline-color);
      }
    }

    &--active {
      --onyx-breadcrumb-item-color: var(--onyx-color-text-icons-primary-intense);
      --onyx-breadcrumb-item-color-hover: var(--onyx-color-text-icons-primary-bold);
      --onyx-breadcrumb-item-background-hover: var(--onyx-color-base-primary-200);
      --onyx-breadcrumb-item-outline-color: var(--onyx-color-component-focus-primary);
    }

    &::before {
      content: "/";
      margin-right: var(--onyx-density-xs);
      color: var(--onyx-color-text-icons-neutral-medium);
    }

    &:has(.onyx-icon:only-child) {
      --onyx-breadcrumb-item-padding-vertical: var(--onyx-density-2xs);
      --onyx-breadcrumb-item-padding-inline: var(--onyx-breadcrumb-item-padding-vertical);
    }

    &__skeleton {
      padding: 0;
      cursor: initial;
      height: calc(1lh + 2 * var(--onyx-breadcrumb-item-padding-vertical));
      width: calc(1.5rem + 2 * var(--onyx-breadcrumb-item-padding-inline));
    }
  }
}
</style>
