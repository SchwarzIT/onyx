<script lang="ts" setup generic="TValue extends ListboxValue = ListboxValue">
import type { ListboxValue } from "@sit-onyx/headless";
import chevronLeftSmall from "@sit-onyx/icons/chevron-left-small.svg?raw";
import { computed } from "vue";
import OnyxAvatar from "../OnyxAvatar/OnyxAvatar.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import OnyxListbox from "../OnyxListbox/OnyxListbox.vue";
import type { OnyxUserMenuProps } from "./types";

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

const avatar = computed(() => {
  if (typeof props.avatar === "object") return { ...props.avatar, label: props.username };
  return { src: props.avatar, label: props.username };
});
</script>

<template>
  <button class="onyx-user-menu">
    <div class="onyx-user-menu__trigger onyx-text">
      <OnyxAvatar v-bind="avatar" size="24px" />
      <span class="onyx-truncation-ellipsis"> {{ props.username }}</span>
      <OnyxIcon class="onyx-user-menu__chevron" :icon="chevronLeftSmall" />
    </div>

    <OnyxListbox
      class="onyx-user-menu__listbox"
      label="User options"
      :options="props.options"
      @update:model-value="$event && emit('optionClick', $event)"
    >
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

      <template v-if="!!slots.footer" #footer>
        <div class="onyx-user-menu__footer onyx-text--small">
          <slot name="footer"></slot>
        </div>
      </template>
    </OnyxListbox>
  </button>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-user-menu {
  @include layers.component() {
    --onyx-user-menu-height: 2.5rem;

    font-family: var(--onyx-font-family);
    width: max-content;
    position: relative;

    border: none;
    background: none;
    padding: 0;

    &:focus-within {
      outline: 0;

      .onyx-user-menu__trigger {
        outline: 0.25rem solid var(--onyx-color-base-secondary-200);
        background-color: var(--onyx-color-base-neutral-200);
      }

      .onyx-user-menu__listbox {
        opacity: 1;
      }

      .onyx-user-menu__chevron {
        transform: rotate(-90deg);
      }
    }

    &__trigger {
      border-radius: var(--onyx-radius-sm);
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

    &__listbox {
      opacity: 0;
      transition: opacity var(--onyx-duration-sm);
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
