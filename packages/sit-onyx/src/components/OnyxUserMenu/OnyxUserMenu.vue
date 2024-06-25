<script lang="ts" setup>
import chevronLeftSmall from "@sit-onyx/icons/chevron-left-small.svg?raw";
import { computed } from "vue";
import { injectI18n } from "../../i18n";
import OnyxAvatar from "../OnyxAvatar/OnyxAvatar.vue";
import OnyxFlyoutMenu from "../OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxUserMenuProps } from "./types";

const props = defineProps<OnyxUserMenuProps>();

const slots = defineSlots<{
  /**
   * Slot for the menu options. Its recommended to use the `OnyxListItem` component here.
   */
  default?(): unknown;
  /**
   * Optional footer content to display at the bottom.
   */
  footer?(): unknown;
}>();

const { t } = injectI18n();

const avatar = computed(() => {
  if (typeof props.avatar === "object") return { ...props.avatar, label: props.username };
  return { src: props.avatar, label: props.username };
});
</script>

<template>
  <div class="onyx-user-menu">
    <button class="onyx-user-menu__trigger onyx-text">
      <OnyxAvatar v-bind="avatar" />
      <span class="onyx-truncation-ellipsis"> {{ props.username }}</span>
      <OnyxIcon class="onyx-user-menu__chevron" :icon="chevronLeftSmall" />
    </button>

    <OnyxFlyoutMenu class="onyx-user-menu__flyout" :aria-label="t('navigation.userMenuLabel')">
      <template #header>
        <div class="onyx-user-menu__header">
          <OnyxAvatar v-bind="avatar" />

          <div class="onyx-truncation-ellipsis">
            <div class="onyx-user-menu__username onyx-text onyx-truncation-ellipsis">
              {{ props.username }}
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

      <slot></slot>

      <template v-if="!!slots.footer" #footer>
        <div class="onyx-user-menu__footer onyx-text--small">
          <slot name="footer"></slot>
        </div>
      </template>
    </OnyxFlyoutMenu>
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

    &:focus-within {
      outline: 0;

      .onyx-user-menu__trigger {
        outline: 0.25rem solid var(--onyx-color-base-secondary-200);
        background-color: var(--onyx-color-base-neutral-200);
      }

      .onyx-user-menu__flyout {
        opacity: 1;
        visibility: visible;
      }

      .onyx-user-menu__chevron {
        transform: rotate(-90deg);
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
      color: var(--onyx-color-text-icons-neutral-medium);
      cursor: pointer;
      margin-left: auto;
      font-weight: 600;

      &:hover {
        background-color: var(--onyx-color-base-neutral-200);
      }
    }

    &__flyout {
      opacity: 0;
      visibility: hidden;
      transition-duration: var(--onyx-duration-sm);
      transition-property: opacity, visibility;
      position: absolute;
      right: 0;
      top: calc(var(--onyx-user-menu-height) + var(--onyx-spacing-sm));
    }

    &__chevron {
      transition: transform var(--onyx-duration-sm);
    }

    &__header {
      border-bottom: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
      padding: var(--onyx-spacing-md);
      color: var(--onyx-color-text-icons-neutral-intense);

      display: flex;
      align-items: center;
      gap: var(--onyx-spacing-md);
      text-align: left;
    }

    &__username {
      font-weight: 600;
    }

    &__description {
      color: var(--onyx-color-text-icons-neutral-soft);
      font-weight: 600;
    }

    &__footer {
      border-top: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
      padding: var(--onyx-spacing-4xs) var(--onyx-spacing-md);
      color: var(--onyx-color-text-icons-neutral-soft);

      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--onyx-spacing-2xs);
    }
  }
}
</style>
