<script lang="ts" setup>
import arrowSmallUpRight from "@sit-onyx/icons/arrow-small-up-right.svg?raw";
import { computed } from "vue";
import { isExternalLink } from "../../utils";
import { injectI18n } from "../../i18n";
import OnyxListbox from "../OnyxListbox/OnyxListbox.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { ListboxOption } from "../OnyxListbox/types";
import type { OnyxNavItemProps } from "./types";

const props = withDefaults(defineProps<OnyxNavItemProps>(), {
  active: false,
  withExternalIcon: "auto",
});

const emit = defineEmits<{
  /**
   * Emitted when the nav item is clicked (via click or keyboard).
   */
  navigate: [href: string];
}>();

defineSlots<{
  /**
   * An optional slot to show additional content behind the label (e.g. a `OnyxBadge`).
   */
  default?(): unknown;
}>();

const listboxOptions = computed<ListboxOption<string>[]>(() => {
  return props.options?.map((opt) => ({ value: opt.href, label: opt.label })) ?? [];
});

const { t } = injectI18n();

const shouldShowExternalIcon = computed(() => {
  if (props.withExternalIcon !== "auto") return props.withExternalIcon;
  return isExternalLink(props.href ?? "");
});
</script>

<template>
  <li
    role="menuitem"
    tabindex="0"
    :aria-label="props.label"
    class="onyx-nav-item onyx-text"
    :class="{ 'onyx-nav-item--active': props.active || props.options?.find((opt) => opt.active) }"
    @click="props.href && emit('navigate', props.href)"
    @keydown.enter="props.href && emit('navigate', props.href)"
  >
    <span>{{ props.label }}</span>
    <OnyxIcon
      v-if="shouldShowExternalIcon"
      class="onyx-nav-item__icon"
      :icon="arrowSmallUpRight"
      size="16px"
    />
    <slot></slot>
  </li>
  <OnyxListbox
    v-if="listboxOptions.length > 0"
    class="onyx-nav-item__listbox"
    :label="t('navItemOptionsLabel', { label: props.label })"
    :options="listboxOptions"
    :model-value="props.options?.find((opt) => opt.active)?.href"
    @update:model-value="$event && emit('navigate', $event)"
  />
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-nav-item {
  @include layers.component() {
    display: inline-flex;
    position: relative;
    height: 2.5rem;
    width: max-content;
    padding: var(--onyx-spacing-2xs) var(--onyx-spacing-md);
    justify-content: center;
    align-items: center;
    gap: var(--onyx-spacing-2xs);
    flex-shrink: 0;
    border-radius: var(--onyx-radius-sm);
    background: var(--onyx-color-base-background-blank);
    text-decoration: none;
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-medium);
    cursor: pointer;

    &:hover,
    &:focus-visible {
      background-color: var(--onyx-color-base-neutral-200);

      + .onyx-nav-item__listbox {
        opacity: 1;
      }
    }

    &--active {
      color: var(--onyx-color-text-icons-secondary-intense);

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
    }

    &:focus-visible {
      outline: 0.25rem solid var(--onyx-color-base-secondary-200);
    }

    + .onyx-nav-item__listbox {
      margin-top: var(--onyx-spacing-sm);
      opacity: 0;
      transition: opacity var(--onyx-duration-sm);

      &:hover,
      &:focus-within {
        opacity: 1;
      }
    }
  }
}
</style>
