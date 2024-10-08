<script lang="ts" setup>
import chevronRightSmall from "@sit-onyx/icons/chevron-right-small.svg?raw";
import { computed, inject, ref } from "vue";
import OnyxExternalLinkIcon from "../../../OnyxExternalLinkIcon/OnyxExternalLinkIcon.vue";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
import { MOBILE_NAV_BAR_INJECTION_KEY } from "../../types";
import NavButtonLayout from "./NavButtonLayout.vue";
import type { OnyxNavButtonProps } from "./types";

const props = withDefaults(defineProps<OnyxNavButtonProps>(), {
  active: false,
  withExternalIcon: "auto",
});

const emit = defineEmits<{
  /**
   * Emitted when the nav button is clicked (via click or keyboard).
   */
  navigate: [href: string, event: MouseEvent];
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

const isMobile = inject(MOBILE_NAV_BAR_INJECTION_KEY);
const isMobileChildrenOpen = ref(false);
const hasChildren = computed(() => !!slots.children);

const handleParentClick = (event: MouseEvent) => {
  if (isMobile?.value && hasChildren.value && !isMobileChildrenOpen.value) {
    isMobileChildrenOpen.value = true;
  } else if (props.href) {
    emit("navigate", props.href, event);
  }
};
</script>

<template>
  <NavButtonLayout
    v-bind="props"
    v-model:mobile-children-open="isMobileChildrenOpen"
    class="onyx-nav-button"
    :class="{
      'onyx-nav-button--mobile': isMobile,
      'onyx-nav-button--active': props.active,
    }"
    :is-mobile="isMobile ?? false"
  >
    <template #button>
      <button
        class="onyx-nav-button__trigger onyx-text"
        :class="{ 'onyx-nav-button__link': props.href != undefined }"
        role="menuitem"
        :aria-label="props.label"
        type="button"
        @click="handleParentClick"
      >
        <slot>
          <span class="onyx-truncation-ellipsis">{{ props.label }}</span>
          <OnyxExternalLinkIcon v-bind="props" />
        </slot>

        <OnyxIcon
          v-if="isMobile && hasChildren && !isMobileChildrenOpen"
          class="onyx-nav-button__mobile-chevron"
          :icon="chevronRightSmall"
        />
      </button>
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
      color: var(--onyx-color-text-icons-neutral-medium);
      border: none;

      &:focus-visible {
        outline: 0.25rem solid var(--onyx-color-base-secondary-200);
      }
    }

    &__link {
      cursor: pointer;
    }

    &--active,
    &:has(.onyx-list-item--active):not(:has(.onyx-nav-button__mobile-children--open)) {
      .onyx-nav-button__trigger {
        color: var(--onyx-color-text-icons-secondary-intense);
        font-weight: 600;

        &::after {
          content: " ";
          position: absolute;
          width: 100%;
          height: 0.125rem;
          bottom: calc(-1 * var(--onyx-spacing-2xs));
          border-radius: var(--onyx-radius-full) var(--onyx-radius-full) 0 0;
          background: var(--onyx-color-base-secondary-500);
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

      > .onyx-nav-button__trigger,
      .onyx-menu-item {
        width: 100%;
        justify-content: flex-start;
        border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
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
          border-color: var(--onyx-color-base-primary-500);
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
        --onyx-list-item-color-selected: var(--onyx-color-text-icons-secondary-intense);
        background-color: var(--onyx-list-item-background-selected);
        border-color: var(--onyx-color-base-primary-200);
        font-weight: 600;

        &:hover {
          border-color: var(--onyx-color-base-primary-500);
          background-color: var(--onyx-list-item-background-selected);
        }
      }
    }
  }
}
</style>
