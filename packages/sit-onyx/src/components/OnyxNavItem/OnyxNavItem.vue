<script lang="ts" setup>
import { computed, ref } from "vue";
import type { OnyxNavItemProps } from "./types";
import OnyxListbox from "../OnyxListbox/OnyxListbox.vue";
import type { ListboxOption } from "../OnyxListbox/types";

const props = withDefaults(defineProps<OnyxNavItemProps>(), {
  active: false,
});

const emit = defineEmits<{
  /**
   * Emitted when the navItem is clicked (via click or keyboard).
   */
  navigate: [href: string];
}>();

defineSlots<{
  /**
   * A default slot that can be used for OnyxBadge.
   */
  default(): unknown;
}>();

const listboxVisible = ref(false);

const nestedOptions = computed(() => {
  return props.options?.map((opt) => {
    return { id: opt.href, label: opt.label };
  }) satisfies ListboxOption[] | undefined;
});

function hideListbox() {
  setTimeout(() => {
    listboxVisible.value = false;
  }, 500);
}
</script>

<template>
  <li
    role="menuitem"
    tabindex="0"
    :aria-label="props.label"
    :class="[
      'onyx-nav-item',
      'onyx-text',
      { 'onyx-nav-item--active': props.active || props.options?.find((opt) => opt.active) },
    ]"
    @click="props.href && !props.options && emit('navigate', props.href)"
    @keydown.enter="props.href && !props.options && emit('navigate', props.href)"
    @mouseover="listboxVisible = true"
    @focusin="() => {}"
    @mouseleave="hideListbox()"
    @blur="() => {}"
  >
    <span>{{ props.label }}</span>
    <slot></slot>
  </li>
  <OnyxListbox
    v-if="nestedOptions"
    :class="['onyx-nav-item-listbox', { 'onyx-nav-item-listbox--visible': listboxVisible }]"
    label="Listbox"
    :options="nestedOptions"
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
    height: 40px;
    padding: var(--onyx-spacing-2xs) var(--onyx-spacing-md);
    justify-content: center;
    align-items: center;
    gap: var(--onyx-spacing-2xs);
    flex-shrink: 0;
    border-radius: var(--onyx-radius-sm);
    background: var(--onyx-color-base-background-blank);
    text-decoration: none;
    color: var(--onyx-color-text-icons-neutral-medium);

    &:hover {
      background-color: var(--onyx-color-base-neutral-200);
      cursor: pointer;
    }

    &--active {
      color: var(--onyx-color-text-icons-secondary-intense);

      &::after {
        content: " ";
        position: absolute;
        width: 100%;
        height: 0.125rem;
        bottom: -0.5rem;
        border-radius: var(--onyx-radius-full) var(--onyx-radius-full) 0 0;
        background: var(--onyx-color-base-secondary-500);
      }
    }

    &:focus-visible {
      outline: 0.25rem solid var(--onyx-color-base-secondary-200);
    }
  }
}

.onyx-nav-item-listbox {
  @include layers.component() {
    margin-top: 0.75rem;
    display: none;

    &--visible,
    &:hover {
      display: block;
    }
  }
}
</style>
