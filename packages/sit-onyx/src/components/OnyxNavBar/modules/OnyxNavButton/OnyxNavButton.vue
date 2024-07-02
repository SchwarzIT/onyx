<script lang="ts" setup>
import arrowSmallUpRight from "@sit-onyx/icons/arrow-small-up-right.svg?raw";
import { isExternalLink } from "../../../../utils";
import OnyxIcon from "../../../OnyxIcon/OnyxIcon.vue";
import OnyxFlyoutMenu from "../OnyxFlyoutMenu/future/OnyxFlyoutMenu.vue";
import { type OnyxNavButtonProps } from "./types";

const props = withDefaults(defineProps<OnyxNavButtonProps>(), {
  active: false,
  withExternalIcon: "auto",
});

const slots = defineSlots<{
  /**
   * An optional slot to override the label content (e.g. an `OnyxBadge`).
   */
  default?(): unknown;
  /**
   * An optional slot to render nested children.
   */
  children?(): unknown;
}>();

const emit = defineEmits<{
  /**
   * Emitted when the nav button is clicked (via click or keyboard).
   */
  click: [href: string];
}>();

const shouldShowExternalIcon = (args: OnyxNavButtonProps) => {
  const withExternalIcon = args.withExternalIcon ?? "auto";

  if (withExternalIcon !== "auto") return args.withExternalIcon;
  return isExternalLink(args.href ?? "");
};
</script>

<template>
  <OnyxFlyoutMenu class="onyx-nav-button">
    <button
      type="button"
      class="onyx-nav-button__trigger onyx-text"
      :class="{
        'onyx-nav-button--active': props.active,
      }"
      @click="props.href && emit('click', props.href)"
    >
      <slot>
        <span>{{ props.label }}</span>
        <OnyxIcon
          v-if="shouldShowExternalIcon(props)"
          class="onyx-nav-button__icon"
          :icon="arrowSmallUpRight"
          size="16px"
        />
      </slot>
    </button>
    <template v-if="slots.children" #options>
      <slot name="children"></slot>
    </template>
  </OnyxFlyoutMenu>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers.scss";

.onyx-nav-button {
  @include layers.component() {
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
      border: none;
      cursor: pointer;

      &:focus-visible {
        outline: 0.25rem solid var(--onyx-color-base-secondary-200);
        background-color: var(--onyx-color-base-neutral-200);
      }
    }

    &:hover {
      .onyx-nav-button__trigger {
        background-color: var(--onyx-color-base-neutral-200);
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
      }
    }

    &__icon {
      align-self: flex-start;
      margin-left: calc(-1 * $gap);
    }
  }
}
</style>
