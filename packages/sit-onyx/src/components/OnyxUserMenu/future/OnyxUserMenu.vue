<script lang="ts" setup generic="TValue extends SelectOptionValue = SelectOptionValue">
import chevronLeftSmall from "@sit-onyx/icons/chevron-left-small.svg?raw";
import { computed } from "vue";
import { injectI18n } from "../../../i18n";
import type { SelectOptionValue } from "../../../types";
import OnyxAvatar from "../../OnyxAvatar/OnyxAvatar.vue";
import OnyxFlyoutMenu from "../../OnyxFlyoutMenu/future/OnyxFlyoutMenu.vue";
import OnyxIcon from "../../OnyxIcon/OnyxIcon.vue";
import OnyxListItem from "../../OnyxListItem/OnyxListItem.vue";
import type { OnyxUserMenuProps } from "../types";

const props = defineProps<OnyxUserMenuProps<TValue>>();

const emit = defineEmits<{
  /**
   * Emitted when an option is clicked.
   */
  optionClick: [value: TValue];
}>();

const slots = defineSlots<{
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
    <OnyxFlyoutMenu class="onyx-user-menu__flyout" :aria-label="t('navigation.userMenuLabel')">
      <button class="onyx-user-menu__trigger onyx-text">
        <OnyxAvatar v-bind="avatar" size="24px" />
        <span class="onyx-truncation-ellipsis"> {{ props.username }}</span>
        <OnyxIcon class="onyx-user-menu__chevron" :icon="chevronLeftSmall" />
      </button>
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

      <template #options>
        <OnyxListItem
          v-for="item in props.options"
          :key="item.value.toString()"
          :class="{
            'onyx-user-menu-item--danger': item.color === 'danger',
          }"
          :color="item.color"
          @click="emit('optionClick', item.value)"
        >
          <OnyxIcon v-if="item.icon" :icon="item.icon" />{{ item.label }}
        </OnyxListItem>
      </template>

      <template v-if="!!slots.footer" #footer>
        <div class="onyx-user-menu__footer onyx-text--small">
          <slot name="footer"></slot>
        </div>
      </template>
    </OnyxFlyoutMenu>
  </div>
</template>

<style lang="scss">
@use "../../../styles/mixins/layers.scss";

.onyx-user-menu {
  @include layers.component() {
    --onyx-user-menu-height: 2.5rem;

    font-family: var(--onyx-font-family);
    width: max-content;
    position: relative;

    &:focus-within,
    &:hover {
      outline: 0;

      .onyx-user-menu__trigger[aria-expanded="true"] {
        outline: 0.25rem solid var(--onyx-color-base-secondary-200);
        background-color: var(--onyx-color-base-neutral-200);

        .onyx-user-menu__chevron {
          transform: rotate(-90deg);
        }
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

      &:focus {
        outline: 0;
      }
    }

    &__flyout {
      .onyx-future-flyout-menu__list {
        right: 0;
      }
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
