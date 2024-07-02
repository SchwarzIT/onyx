<script lang="ts">
/**
 *  @deprecated
 * Will be replaced by OnyxNavButton
 */
export default {};
</script>
<script lang="ts" setup>
import arrowSmallLeft from "@sit-onyx/icons/arrow-small-left.svg?raw";
import arrowSmallUpRight from "@sit-onyx/icons/arrow-small-up-right.svg?raw";
import chevronRightSmall from "@sit-onyx/icons/chevron-right-small.svg?raw";
import { computed, inject, ref } from "vue";
import { injectI18n } from "../../../../i18n";
import { isExternalLink } from "../../../../utils";
import OnyxButton from "../../../OnyxButton/OnyxButton.vue";
import OnyxFlyoutMenu from "../OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
import OnyxListItem from "../../../OnyxListItem/OnyxListItem.vue";
import OnyxNavSeparator from "../OnyxNavSeparator/OnyxNavSeparator.vue";
import { type OnyxNavItemProps } from "./types";
import { MOBILE_NAV_BAR_INJECTION_KEY } from "../../types";

const props = withDefaults(defineProps<OnyxNavItemProps>(), {
  active: false,
  withExternalIcon: "auto",
});

const emit = defineEmits<{
  /**
   * Emitted when the nav item is clicked (via click or keyboard).
   */
  click: [href: string];
}>();

defineSlots<{
  /**
   * An optional slot to override the label content.
   */
  default?(): unknown;
}>();

const { t } = injectI18n();

const shouldShowExternalIcon = (args: OnyxNavItemProps) => {
  const withExternalIcon = args.withExternalIcon ?? "auto";
  if (withExternalIcon !== "auto") return args.withExternalIcon;
  return isExternalLink(args.href ?? "");
};

const isMobile = inject(MOBILE_NAV_BAR_INJECTION_KEY);
const isMobileChildrenOpen = ref(false);
const hasChildren = computed(() => !!props.options?.length);

const handleParentClick = () => {
  if (isMobile?.value && hasChildren.value && !isMobileChildrenOpen.value) {
    isMobileChildrenOpen.value = true;
  } else if (props.href) {
    emit("click", props.href);
  }
};
</script>

<template>
  <li class="onyx-nav-item" role="presentation" :class="{ 'onyx-nav-item--mobile': isMobile }">
    <OnyxButton
      v-if="isMobile && isMobileChildrenOpen"
      :label="t('back')"
      mode="plain"
      color="neutral"
      :icon="arrowSmallLeft"
      @click="isMobileChildrenOpen = false"
    />

    <!-- parent nav item should be hidden in mobile view when it does not have a link itself -->
    <div
      v-if="!isMobileChildrenOpen || props.href"
      role="menuitem"
      tabindex="0"
      :aria-label="props.label"
      class="onyx-nav-item__trigger onyx-text"
      :class="{
        'onyx-nav-item__trigger--active': props.active || props.options?.find((opt) => opt.active),
      }"
      @click="handleParentClick"
      @keydown.enter="handleParentClick"
    >
      <slot>
        <span>{{ props.label }}</span>
        <OnyxIcon
          v-if="shouldShowExternalIcon(props)"
          class="onyx-nav-item__icon"
          :icon="arrowSmallUpRight"
          size="16px"
        />
      </slot>

      <OnyxIcon
        v-if="isMobile && hasChildren && !isMobileChildrenOpen"
        class="onyx-nav-item__mobile-chevron"
        :icon="chevronRightSmall"
      />
    </div>

    <OnyxFlyoutMenu
      v-if="!isMobile && hasChildren"
      class="onyx-nav-item__flyout"
      :aria-label="t('navItemOptionsLabel', { label: props.label })"
    >
      <OnyxListItem
        v-for="option in props.options"
        :key="option.label"
        :aria-selected="option.active"
        @click="emit('click', option.href)"
      >
        {{ option.label }}
        <OnyxIcon
          v-if="shouldShowExternalIcon(option)"
          class="onyx-nav-item__icon"
          :icon="arrowSmallUpRight"
          size="16px"
        />
      </OnyxListItem>
    </OnyxFlyoutMenu>

    <div v-else-if="hasChildren && isMobileChildrenOpen" class="onyx-nav-item__mobile-children">
      <OnyxNavSeparator v-if="props.href" orientation="horizontal" />

      <ul role="menu">
        <OnyxNavItem
          v-for="option in props.options"
          :key="option.label"
          v-bind="option"
          @click="emit('click', $event)"
        />
      </ul>
    </div>
  </li>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers";

$border-radius: var(--onyx-radius-sm);

.onyx-nav-item {
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
      &:focus-within:has(.onyx-nav-item__flyout) {
        > .onyx-nav-item__trigger {
          background-color: var(--onyx-color-base-neutral-200);
        }

        .onyx-nav-item__flyout {
          opacity: 1;
          visibility: visible;
        }
      }
    }

    &__icon {
      align-self: flex-start;
      margin-left: calc(-1 * $gap);
    }

    &__flyout {
      margin-top: var(--onyx-spacing-sm);
      position: absolute;
      opacity: 0;
      visibility: hidden;
      transition-duration: var(--onyx-duration-sm);
      transition-property: opacity, visibility;

      &:hover,
      &:focus-within {
        opacity: 1;
      }
    }

    &__mobile-chevron {
      margin-left: auto;
    }

    &__mobile-children {
      display: contents;

      > ul {
        display: contents;
      }
    }

    &--mobile {
      width: 100%;
      border-radius: $border-radius;

      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--onyx-spacing-xs);

      > .onyx-nav-item__trigger {
        width: 100%;
        justify-content: flex-start;
        padding-inline: var(--onyx-spacing-sm);
        border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
        height: 3rem;

        &::after {
          display: none;
        }

        &:hover {
          background-color: var(--onyx-color-base-background-tinted);
          border-color: var(--onyx-color-base-primary-500);
        }

        &--active {
          background-color: var(--onyx-color-base-primary-100);
          border-color: var(--onyx-color-base-primary-200);

          &:hover {
            background-color: var(--onyx-color-base-primary-100);
          }
        }
      }
    }
  }
}
</style>
