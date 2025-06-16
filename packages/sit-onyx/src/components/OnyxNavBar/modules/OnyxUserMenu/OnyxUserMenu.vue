<script lang="ts" setup>
import { computed, inject } from "vue";
import { useVModel } from "../../../../composables/useVModel";
import type { Nullable } from "../../../../types";
import OnyxAvatar from "../../../OnyxAvatar/OnyxAvatar.vue";
import { MOBILE_NAV_BAR_INJECTION_KEY } from "../../types";
import type { OnyxUserMenuProps } from "./types";
import UserMenuLayout from "./UserMenuLayout.vue";

const props = withDefaults(defineProps<OnyxUserMenuProps>(), {
  flyoutOpen: undefined,
});

const emit = defineEmits<{
  /**
   * Emitted when the state of flyoutOpen changes.
   */
  "update:flyoutOpen": [value: Nullable<boolean>];
}>();

const slots = defineSlots<{
  /**
   * Slot for the menu options. Its recommended to use the `OnyxMenuItem` component here.
   */
  default?(): unknown;
  /**
   * Optional footer content to display at the bottom.
   */
  footer?(): unknown;
}>();

/**
 * If the flyout is expanded or not. Only has an effect in desktop (non-mobile) mode.
 */
const flyoutOpen = useVModel({
  props,
  emit,
  key: "flyoutOpen",
  default: false,
});

const avatar = computed(() => {
  if (typeof props.avatar === "object") return props.avatar;
  return { src: props.avatar, fullName: props.fullName };
});

const isMobile = inject(
  MOBILE_NAV_BAR_INJECTION_KEY,
  computed(() => false),
);
</script>

<template>
  <UserMenuLayout
    v-model:flyout-open="flyoutOpen"
    class="onyx-component onyx-user-menu"
    :class="{ 'onyx-user-menu--mobile': isMobile }"
    :is-mobile="isMobile"
    :disabled="disabled"
  >
    <template #button="{ trigger }">
      <button class="onyx-user-menu__trigger onyx-text" type="button" v-bind="trigger">
        <OnyxAvatar v-bind="avatar" size="24px" />
        <span class="onyx-truncation-ellipsis"> {{ props.fullName }}</span>
      </button>
    </template>

    <template #header>
      <div class="onyx-user-menu__header">
        <OnyxAvatar v-bind="avatar" size="48px" />

        <div class="onyx-truncation-ellipsis">
          <div class="onyx-user-menu__username onyx-text onyx-truncation-ellipsis">
            {{ props.fullName }}
          </div>
          <div
            v-if="props.description"
            class="onyx-user-menu__description onyx-text--small onyx-truncation-ellipsis"
          >
            {{ props.description }}
          </div>
        </div>
      </div>
    </template>

    <template #options>
      <div class="onyx-user-menu__options">
        <slot></slot>
      </div>
    </template>

    <template v-if="slots.footer" #footer>
      <slot name="footer"></slot>
    </template>
  </UserMenuLayout>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers.scss";

.onyx-user-menu {
  @include layers.component() {
    --onyx-user-menu-height: 2.5rem;

    font-family: var(--onyx-font-family);
    width: max-content;
    position: relative;

    &:focus-within,
    &:hover {
      outline: 0;

      .onyx-user-menu__trigger {
        outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
        background-color: var(--onyx-color-base-neutral-200);
      }
    }

    &__trigger {
      border-radius: var(--onyx-radius-sm);
      border: none;
      background: var(--onyx-color-base-background-blank);

      padding: var(--onyx-spacing-2xs) var(--onyx-spacing-md);
      display: flex;
      align-items: center;
      gap: var(--onyx-spacing-2xs);
      color: var(--onyx-color-text-icons-neutral-intense);
      margin-left: auto;
      font-weight: var(--onyx-font-weight-semibold);

      &:disabled {
        color: var(--onyx-color-text-icons-neutral-soft);
      }
      &:hover {
        &:disabled {
          background-color: var(--onyx-color-base-background-blank);
          outline: 0;
        }
        background-color: var(--onyx-color-base-neutral-200);
      }

      &:focus {
        outline: 0;
      }
    }

    .onyx-flyout-menu__list {
      right: 0;
    }

    &__header {
      border-bottom: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
      padding: var(--onyx-spacing-md);
      color: var(--onyx-color-text-icons-neutral-intense);

      display: flex;
      align-items: center;
      gap: var(--onyx-spacing-md);
      text-align: left;
    }

    &__username {
      font-weight: var(--onyx-font-weight-semibold);
    }

    &__description {
      color: var(--onyx-color-text-icons-neutral-soft);
      font-weight: var(--onyx-font-weight-semibold);
    }

    &--mobile {
      width: 100%;
      position: static;

      .onyx-user-menu__header {
        border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
        background-color: var(--onyx-color-base-background-blank);
        border-radius: var(--onyx-radius-sm);
        margin-bottom: var(--onyx-spacing-2xs);
      }

      .onyx-user-menu__options {
        .onyx-list-item {
          border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
          border-bottom: none;

          &:first-of-type {
            border-radius: var(--onyx-radius-sm) var(--onyx-radius-sm) 0 0;
          }

          &:last-of-type {
            border-bottom: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
            border-radius: 0 0 var(--onyx-radius-sm) var(--onyx-radius-sm);
          }
        }
      }
    }
  }
}
</style>
