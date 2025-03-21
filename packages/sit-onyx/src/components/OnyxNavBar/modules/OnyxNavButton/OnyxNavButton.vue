<script lang="ts" setup>
import chevronRightSmall from "@sit-onyx/icons/chevron-right-small.svg?raw";
import { computed, inject } from "vue";
import { useLink } from "../../../../composables/useLink";
import { useMoreListChild } from "../../../../composables/useMoreList";
import { useVModel, type Nullable } from "../../../../composables/useVModel";
import { extractLinkProps } from "../../../../utils/router";
import OnyxExternalLinkIcon from "../../../OnyxExternalLinkIcon/OnyxExternalLinkIcon.vue";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
import { MOBILE_NAV_BAR_INJECTION_KEY, NAV_BAR_MORE_LIST_INJECTION_KEY } from "../../types";
import NavButtonLayout from "./NavButtonLayout.vue";
import NavButtonTrigger from "./NavButtonTrigger.vue";
import type { OnyxNavButtonProps } from "./types";

const props = withDefaults(defineProps<OnyxNavButtonProps>(), {
  active: "auto",
});

const emit = defineEmits<{
  /**
   * Emitted when the state of mobile children visibility changes.
   */
  "update:mobileChildrenOpen": [value: Nullable<boolean>];
}>();

const slots = defineSlots<{
  /**
   * An optional slot to override the label content.
   */
  default?(): unknown;
  /**
   * An optional slot to render nested children.
   */
  children?(): unknown;
}>();

/**
 * Controls the open state for the mobile children.
 */
const mobileChildrenOpen = useVModel({
  props,
  emit,
  key: "mobileChildrenOpen",
  initialValue: false,
});
const isMobile = inject(
  MOBILE_NAV_BAR_INJECTION_KEY,
  computed(() => false),
);
const hasChildren = computed(() => !!slots.children);
const { componentRef, isVisible } = useMoreListChild(NAV_BAR_MORE_LIST_INJECTION_KEY);

const { isActive: isPathActive } = useLink();
const isActive = computed(() => {
  if (props.active !== "auto") return props.active;
  return isPathActive.value(props.link);
});

const handleParentClick = () => {
  if (isMobile?.value && hasChildren.value && !mobileChildrenOpen.value) {
    mobileChildrenOpen.value = true;
  }
};
</script>

<template>
  <NavButtonLayout
    v-show="isMobile || isVisible"
    ref="componentRef"
    v-bind="props"
    v-model:mobile-children-open="mobileChildrenOpen"
    class="onyx-component onyx-nav-button"
    :class="{
      'onyx-nav-button--mobile': isMobile,
      'onyx-nav-button--active': isActive,
    }"
    :is-mobile="isMobile ?? false"
  >
    <template #button="{ trigger }">
      <NavButtonTrigger
        :aria-label="props.label"
        v-bind="{ ...props, ...trigger }"
        :force-button="isMobile && hasChildren && !mobileChildrenOpen"
        @click="handleParentClick"
      >
        <slot>
          <span class="onyx-truncation-ellipsis">{{ props.label }}</span>
          <OnyxExternalLinkIcon v-bind="props.link ? extractLinkProps(props.link) : undefined" />
        </slot>

        <OnyxIcon
          v-if="isMobile && hasChildren && !mobileChildrenOpen"
          class="onyx-nav-button__mobile-chevron"
          :icon="chevronRightSmall"
        />
      </NavButtonTrigger>
    </template>

    <template v-if="slots.children" #options>
      <slot name="children"></slot>
    </template>
  </NavButtonLayout>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers";

$border-radius: var(--onyx-radius-sm);

.onyx-nav-button {
  @include layers.component() {
    width: max-content;
    position: relative;
    $gap: var(--onyx-spacing-2xs);
    list-style: none;

    &__trigger {
      display: inline-flex;
      position: relative;
      height: 2.5rem;
      width: max-content;
      padding: var(--onyx-spacing-2xs) var(--onyx-spacing-md);
      justify-content: center;
      align-items: center;
      gap: $gap;
      flex-shrink: 0;
      border-radius: $border-radius;
      background: var(--onyx-color-base-background-blank);
      text-decoration: none;
      font-family: var(--onyx-font-family);
      color: var(--onyx-color-text-icons-neutral-intense);
      border: none;

      &:focus-visible {
        outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
      }
    }

    &__link {
      cursor: pointer;
    }

    &--active,
    &:has(.onyx-list-item--active):not(:has(.onyx-nav-button__mobile-children--open)) {
      .onyx-nav-button__trigger {
        color: var(--onyx-color-text-icons-primary-intense);
        font-weight: 600;

        &::after {
          content: " ";
          position: absolute;
          width: 100%;
          height: 0.125rem;
          bottom: calc(-1 * var(--onyx-spacing-2xs));
          border-radius: var(--onyx-radius-full) var(--onyx-radius-full) 0 0;
          background: var(--onyx-color-base-primary-500);
          z-index: 1; // needed to display underline above the nav bar bottom border
        }
      }
    }

    &:not(&--mobile) {
      &:hover,
      &:focus-within:has(.onyx-flyout-menu__list) {
        .onyx-nav-button__trigger {
          background-color: var(--onyx-color-base-neutral-200);
        }
      }
    }

    .onyx-external-link-icon {
      margin-left: calc(-1 * $gap);
    }

    &__mobile-chevron {
      margin-left: auto;
    }

    &__mobile-children {
      display: contents;
      padding: 0;
    }

    &--mobile {
      width: 100%;
      border-radius: $border-radius;

      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--onyx-spacing-xs);

      $mobile-padding: var(--onyx-spacing-sm);

      .onyx-nav-button__trigger {
        padding-inline: $mobile-padding;
      }

      &:not(.onyx-nav-button--active) .onyx-nav-button__trigger {
        color: var(--onyx-color-text-icons-neutral-intense);
      }

      > .onyx-nav-button__trigger,
      .onyx-menu-item {
        width: 100%;
        justify-content: flex-start;
        border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
        height: 3rem;
        border-radius: $border-radius;

        .onyx-menu-item__trigger {
          --onyx-list-item-padding: #{$mobile-padding};
        }

        &::after {
          display: none;
        }

        &:hover {
          background-color: var(--onyx-color-base-background-tinted);
        }
      }

      // for an active nav button
      &.onyx-nav-button--active .onyx-nav-button__trigger,
      // for nav button (only in the overview) that has an active child
      &:has(.onyx-list-item--active):not(:has(.onyx-nav-button__mobile-children--open))
      .onyx-nav-button__trigger,
      // for an active child
      .onyx-list-item--active {
        --onyx-list-item-background-selected: var(--onyx-color-base-primary-100);
        --onyx-list-item-color-selected: var(--onyx-color-text-icons-primary-intense);
        background-color: var(--onyx-list-item-background-selected);
        border-color: var(--onyx-color-base-primary-200);
        font-weight: 600;

        &:hover {
          border-color: var(--onyx-color-component-border-primary);
          background-color: var(--onyx-list-item-background-selected);
        }
      }
    }
  }
}
</style>
