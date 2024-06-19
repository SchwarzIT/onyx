<script lang="ts">
/**
 *  @deprecated
 * Will be replaced by OnyxNavButton
 */
export default {};
</script>
<script lang="ts" setup>
import arrowSmallUpRight from "@sit-onyx/icons/arrow-small-up-right.svg?raw";
import { injectI18n } from "../../i18n";
import { isExternalLink } from "../../utils";
import OnyxFlyoutMenu from "../OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxListItem from "../OnyxListItem/OnyxListItem.vue";
import type { OnyxNavItemProps } from "./types";

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
   * An optional slot to show additional content behind the label (e.g. a `OnyxBadge`).
   */
  default?(): unknown;
}>();

const { t } = injectI18n();

const shouldShowExternalIcon = (args: OnyxNavItemProps) => {
  const withExternalIcon = args.withExternalIcon ?? "auto";

  if (withExternalIcon !== "auto") return args.withExternalIcon;
  return isExternalLink(args.href ?? "");
};
</script>

<template>
  <div class="onyx-nav-item">
    <li
      role="menuitem"
      tabindex="0"
      :aria-label="props.label"
      class="onyx-nav-item__trigger onyx-text"
      :class="{ 'onyx-nav-item--active': props.active || props.options?.find((opt) => opt.active) }"
      @click="props.href && emit('click', props.href)"
      @keydown.enter="props.href && emit('click', props.href)"
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
    </li>
    <OnyxFlyoutMenu
      v-if="props.options?.length"
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
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-nav-item {
  @include layers.component() {
    width: max-content;
    position: relative;
    $gap: var(--onyx-spacing-2xs);

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
      border-radius: var(--onyx-radius-sm);
      background: var(--onyx-color-base-background-blank);
      text-decoration: none;
      font-family: var(--onyx-font-family);
      color: var(--onyx-color-text-icons-neutral-medium);
      cursor: pointer;

      &:focus-visible {
        outline: 0.25rem solid var(--onyx-color-base-secondary-200);
      }
    }

    &:hover,
    &:focus-within:has(.onyx-nav-item__flyout) {
      .onyx-nav-item__trigger {
        background-color: var(--onyx-color-base-neutral-200);
      }

      .onyx-nav-item__flyout {
        opacity: 1;
        visibility: visible;
      }
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
  }
}
</style>
