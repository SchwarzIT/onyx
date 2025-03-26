<script lang="ts" setup>
import chevronRightSmall from "@sit-onyx/icons/chevron-right-small.svg?raw";
import { useRootAttrs } from "../../../../utils/attrs";
import { extractLinkProps } from "../../../../utils/router";
import ButtonOrLinkLayout from "../../../OnyxButton/ButtonOrLinkLayout.vue";
import OnyxExternalLinkIcon from "../../../OnyxExternalLinkIcon/OnyxExternalLinkIcon.vue";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
import OnyxListItem from "../../../OnyxListItem/OnyxListItem.vue";
import type { OnyxNavItemProps } from "../OnyxNavItem/types";

defineOptions({ inheritAttrs: false });

const { rootAttrs, restAttrs } = useRootAttrs();

const props = defineProps<
  OnyxNavItemProps & {
    /**
     * displays an arrow
     */
    hasChildren?: boolean;
    /**
     *
     */
    active?: boolean;
    /**
     *
     */
    context: "mobile" | "list" | "navbar";
  }
>();

defineSlots<{
  /**
   * Button text and additional inline content
   */
  default(): unknown;
}>();
</script>

<template>
  <component
    :is="props.context === 'list' ? OnyxListItem : 'div'"
    :class="{ 'onyx-component': true, 'onyx-nav-item-facade-wrapper': true }"
    role="presentation"
    :active="props.active"
    v-bind="rootAttrs"
  >
    <ButtonOrLinkLayout
      :link="props.hasChildren ? undefined : props.link"
      :class="{
        'onyx-component': true,
        'onyx-text': true,
        'onyx-nav-item-facade': true,
        [`onyx-nav-item-facade--${props.context}`]: true,
        'onyx-nav-item-facade--active': props.active,
      }"
      v-bind="restAttrs"
      :aria-current="active ? 'page' : undefined"
      role="menuitem"
    >
      <span>
        <span class="onyx-nav-item-facade__label onyx-truncation-ellipsis">
          <slot>{{ props.label }}</slot>
        </span>
        <OnyxExternalLinkIcon v-bind="props.link ? extractLinkProps(props.link) : undefined" />
      </span>

      <OnyxIcon
        v-if="props.hasChildren && props.context !== 'navbar'"
        class="onyx-nav-item-facade__chevron"
        :icon="chevronRightSmall"
        size="24px"
      />
    </ButtonOrLinkLayout>
  </component>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers";

@layer onyx.reset {
  button.onyx-nav-item-facade,
  a.onyx-nav-item-facade {
    all: unset;
  }
}

@include layers.component() {
  .onyx-nav-item-facade-wrapper {
    display: contents;
  }
  .onyx-nav-item-facade-wrapper:has(.onyx-nav-item-facade--list) {
    display: block;
  }

  .onyx-nav-item-facade {
    box-sizing: border-box;

    display: flex;
    justify-content: space-between;
    align-items: center;

    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);

    cursor: pointer;
  }

  .onyx-nav-item-facade--list {
    width: 100%;
  }

  .onyx-nav-item-facade--navbar {
    position: relative;
    height: 2.5rem;
    width: max-content;
    padding: var(--onyx-spacing-2xs) var(--onyx-spacing-md);
    justify-content: center;
    gap: var(--onyx-spacing-2xs);
    flex-shrink: 0;
    border-radius: var(--onyx-radius-sm);
    background: var(--onyx-color-base-background-blank);

    &:hover {
      background: var(--onyx-color-base-neutral-200, #e3eaf0);
    }

    &:focus-visible {
      outline: 0.25rem solid var(--onyx-color-component-focus-primary, #bbeaed);
    }

    &.onyx-nav-item-facade--active::after {
      content: " ";
      position: absolute;
      width: 100%;
      height: 0.125rem;
      bottom: calc(-1 * var(--onyx-spacing-2xs));
      border-radius: var(--onyx-radius-full, 100rem) var(--onyx-radius-full, 100rem) 0 0;
      background: var(--onyx-color-component-cta-default, #00c3cd);
      z-index: 1;
    }
  }

  .onyx-nav-item-facade--mobile {
    padding: var(--onyx-spacing-sm);
    width: 100%;
    align-self: stretch;
    line-height: 1.5rem;
    text-align: start;
    font-size: 1rem;
    font-weight: 400;
    border-radius: var(--onyx-radius-sm, 4px);
    border: 1px solid var(--onyx-color-component-border-neutral);
    background: var(--onyx-color-base-background-blank);

    &:hover {
      background-color: var(--onyx-color-base-background-tinted);
    }

    &.onyx-nav-item-facade--active {
      --onyx-list-item-background-selected: var(--onyx-color-base-primary-100);
      --onyx-list-item-color-selected: var(--onyx-color-text-icons-primary-intense);
      background-color: var(--onyx-list-item-background-selected);
      border-color: var(--onyx-color-base-primary-200);
      color: var(--onyx-color-text-icons-primary-bold);
      font-weight: 600;
      cursor: default;
    }
  }
}
</style>
