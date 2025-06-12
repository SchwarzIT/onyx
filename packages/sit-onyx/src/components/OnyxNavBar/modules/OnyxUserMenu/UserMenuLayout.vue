<script lang="ts" setup generic="TValue extends SelectOptionValue = SelectOptionValue">
// this layout component is only used internally for the user menu component
// to easily switch between mobile and desktop layout
import { useVModel } from "../../../../composables/useVModel";
import { injectI18n } from "../../../../i18n";
import type { Nullable, SelectOptionValue } from "../../../../types";
import OnyxListItem from "../../../OnyxListItem/OnyxListItem.vue";
import OnyxFlyoutMenu from "../OnyxFlyoutMenu/OnyxFlyoutMenu.vue";

const props = withDefaults(
  defineProps<{
    /**
     * If the mobile layout should be used instead of the desktop layout.
     */
    isMobile: boolean;
    /**
     * Controls whether the flyout menu is open.
     */
    flyoutOpen?: Nullable<boolean>;
    /**
     * Whether the flyout is disabled and can not be opened.
     */
    disabled?: boolean;
  }>(),
  // eslint-disable-next-line vue/no-boolean-default -- to support 'useVModel' we need to know if a value was set or not
  { flyoutOpen: undefined },
);

const emit = defineEmits<{
  /**
   * Emitted when the state of flyoutOpen changes.
   */
  "update:flyoutOpen": [value?: Nullable<boolean>];
}>();

/**
 * Controls the open state of the user menu flyout.
 */
const flyoutOpen = useVModel({
  props,
  emit,
  key: "flyoutOpen",
  default: false,
});
const slots = defineSlots<{
  /**
   * The trigger for the flyout menu. Must be an interactive component like a button or link.
   */
  button?(params: {
    /**
     * Attributes and event listeners that must be bound to the interactive element, that should act as the flyout trigger.
     */
    trigger: object;
  }): unknown;
  header?(): unknown;
  options?(): unknown;
  footer?(): unknown;
}>();

const { t } = injectI18n();
</script>

<template>
  <div class="onyx-component">
    <template v-if="props.isMobile">
      <slot name="header"></slot>
      <slot name="options"></slot>
      <!-- we use list item here instead of menu item since the footer is not interactive -->
      <OnyxListItem v-if="!!slots.footer" class="onyx-user-menu__mobile-footer" disabled>
        <slot name="footer"> </slot>
      </OnyxListItem>
    </template>

    <template v-else>
      <OnyxFlyoutMenu
        v-model:open="flyoutOpen"
        :label="t('navigation.userMenuLabel')"
        alignment="right"
        :disabled="disabled"
      >
        <template #button="{ trigger }">
          <slot name="button" :trigger="trigger"></slot>
        </template>

        <template #header>
          <slot name="header"></slot>
        </template>

        <template #options>
          <slot name="options"></slot>
        </template>

        <template v-if="!!slots.footer" #footer>
          <div class="onyx-user-menu__footer onyx-text--small">
            <slot name="footer"></slot>
          </div>
        </template>
      </OnyxFlyoutMenu>
    </template>
  </div>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers.scss";

.onyx-user-menu {
  @include layers.component() {
    &__footer,
    &__mobile-footer {
      color: var(--onyx-color-text-icons-neutral-soft);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--onyx-spacing-2xs);
    }

    &__footer {
      border-top: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
      padding: var(--onyx-spacing-4xs) var(--onyx-spacing-md);
    }

    &__mobile-footer {
      margin-top: var(--onyx-spacing-2xs);
      border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
      border-radius: var(--onyx-radius-sm);
      font-size: var(--onyx-font-size-sm);
      line-height: var(--onyx-font-line-height-sm);
    }
  }
}
</style>
