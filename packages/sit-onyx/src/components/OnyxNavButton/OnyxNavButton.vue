<script lang="ts" setup>
import arrowSmallUpRight from "@sit-onyx/icons/arrow-small-up-right.svg?raw";
import chevronRightSmall from "@sit-onyx/icons/chevron-right-small.svg?raw";
import { computed, inject, ref } from "vue";
import { isExternalLink } from "../../utils";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import { MOBILE_NAV_BAR_INJECTION_KEY } from "../OnyxNavBar/types";
import NavButtonLayout from "./NavButtonLayout.vue";
import type { OnyxNavButtonProps } from "./types";

const props = withDefaults(defineProps<OnyxNavButtonProps>(), {
  active: false,
  withExternalIcon: "auto",
});

const emit = defineEmits<{
  /**
   * Emitted when the nav item is clicked (via click or keyboard).
   */
  click: [href: string];
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

const shouldShowExternalIcon = (args: typeof props) => {
  const withExternalIcon = args.withExternalIcon ?? "auto";
  if (withExternalIcon !== "auto") return args.withExternalIcon;
  return isExternalLink(args.href ?? "");
};

const isMobile = inject(MOBILE_NAV_BAR_INJECTION_KEY);
const isMobileChildrenOpen = ref(false);
const hasChildren = computed(() => !!slots.children);

const handleParentClick = () => {
  if (isMobile?.value && hasChildren.value && !isMobileChildrenOpen.value) {
    isMobileChildrenOpen.value = true;
  } else if (props.href) {
    emit("click", props.href);
  }
};
</script>

<template>
  <NavButtonLayout
    v-model:mobile-children-open="isMobileChildrenOpen"
    class="onyx-nav-button"
    :class="{ 'onyx-nav-button--mobile': isMobile }"
    :is-mobile="isMobile ?? false"
    v-bind="props"
  >
    <template #button>
      <button
        class="onyx-nav-button__trigger onyx-text"
        :class="{
          'onyx-nav-button__trigger--active': props.active || isMobileChildrenOpen,
        }"
        role="menuitem"
        :aria-label="props.label"
        @click="handleParentClick"
      >
        <slot>
          <span>{{ props.label }}</span>
          <OnyxIcon
            v-if="shouldShowExternalIcon(props)"
            class="onyx-nav-button__external-icon"
            :icon="arrowSmallUpRight"
            size="16px"
          />
        </slot>

        <OnyxIcon
          v-if="isMobile && hasChildren"
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
@use "../../styles/mixins/layers";

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
      cursor: pointer;
      border: none;

      &:focus-visible {
        outline: 0.25rem solid var(--onyx-color-base-secondary-200);
      }

      &--active {
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
        .onyx-nav-button__trigger[aria-expanded="true"] {
          background-color: var(--onyx-color-base-neutral-200);
        }
      }
    }

    &__external-icon {
      align-self: flex-start;
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

      > .onyx-nav-button__trigger,
      .onyx-list-item {
        width: 100%;
        justify-content: flex-start;
        --onyx-list-item-padding: var(--onyx-spacing-sm);
        border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
        height: 3rem;
        border-radius: $border-radius;

        &::after {
          display: none;
        }

        &:hover {
          background-color: var(--onyx-color-base-background-tinted);
          border-color: var(--onyx-color-base-primary-500);
        }

        &--active {
          --onyx-list-item-background-selected: var(--onyx-color-base-primary-100);
          background-color: var(--onyx-list-item-background-selected);
          border-color: var(--onyx-color-base-primary-200);

          &:hover {
            border-color: var(--onyx-color-base-primary-500);
            background-color: var(--onyx-list-item-background-selected);
          }
        }
      }
    }
  }
}
</style>
