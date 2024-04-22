<script lang="ts" setup>
import chevronRightSmall from "@sit-onyx/icons/chevron-right-small.svg?raw";
import { computed } from "vue";
import OnyxAvatar from "../OnyxAvatar/OnyxAvatar.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxListbox from "../OnyxListbox/OnyxListbox.vue";
import type { OnyxUserMenuProps } from "./types";

const props = defineProps<OnyxUserMenuProps>();

const avatar = computed(() => {
  if (typeof props.avatar === "object") return { ...props.avatar, label: props.username };
  return { src: props.avatar, label: props.username };
});
</script>

<template>
  <div class="onyx-user-menu">
    <button class="onyx-user-menu__button onyx-text">
      <OnyxAvatar v-bind="avatar" size="24px" />
      <span> {{ props.username }}</span>
      <OnyxIcon :icon="chevronRightSmall" />
    </button>

    <OnyxListbox class="onyx-user-menu__listbox" label="User options" :options="[]" />
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-user-menu {
  @include layers.component() {
    --onyx-user-menu-height: 2.5rem;

    font-family: var(--onyx-font-family);
    width: max-content;
    position: relative;

    &__button {
      border-radius: var(--onyx-radius-sm);
      background: var(--onyx-color-base-background-blank);
      border: none;
      padding: var(--onyx-spacing-2xs) var(--onyx-spacing-md);
      display: flex;
      align-items: center;
      gap: var(--onyx-spacing-2xs);
      color: var(--onyx-color-text-icons-neutral-medium);
      cursor: pointer;
      margin-left: auto;

      &:hover,
      &:focus {
        background: var(--onyx-color-base-neutral-200);
      }

      &:focus {
        outline: 0.25rem solid var(--onyx-color-base-secondary-200);
      }
    }

    &__listbox {
      display: none;

      position: absolute;
      right: 0;
      top: calc(var(--onyx-user-menu-height) + var(--onyx-spacing-sm));
    }

    &:has(.onyx-user-menu__button:focus) {
      .onyx-user-menu__listbox {
        display: block;
      }
    }
  }
}
</style>
