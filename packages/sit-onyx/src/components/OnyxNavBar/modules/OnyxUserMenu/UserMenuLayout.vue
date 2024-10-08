<script lang="ts" setup generic="TValue extends SelectOptionValue = SelectOptionValue">
// this layout component is only used internally for the user menu component
// to easily switch between mobile and desktop layout
import { useModel } from "vue";
import { MANAGED_SYMBOL, type ManagedProp } from "../../../../composables/useManagedState";
import { injectI18n } from "../../../../i18n";
import type { SelectOptionValue } from "../../../../types";
import OnyxListItem from "../../../OnyxListItem/OnyxListItem.vue";
import OnyxFlyoutMenu from "../OnyxFlyoutMenu/OnyxFlyoutMenu.vue";

const props = withDefaults(defineProps<{ isMobile: boolean; flyoutOpen: ManagedProp<boolean> }>(), {
  flyoutOpen: MANAGED_SYMBOL,
});

defineEmits<{
  "update:flyoutOpen": [isOpen: boolean];
}>();

const flyoutOpen = useModel(props, "flyoutOpen");

const slots = defineSlots<{
  button?(): unknown;
  header?(): unknown;
  options?(): unknown;
  footer?(): unknown;
}>();

const { t } = injectI18n();
</script>

<template>
  <div>
    <template v-if="props.isMobile">
      <slot name="header"></slot>
      <slot name="options"></slot>
      <OnyxListItem v-if="!!slots.footer" class="onyx-user-menu__mobile-footer" disabled>
        <slot name="footer"> </slot>
      </OnyxListItem>
    </template>

    <template v-else>
      <OnyxFlyoutMenu v-model:open="flyoutOpen" :label="t('navigation.userMenuLabel')">
        <slot name="button"></slot>

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
      border-top: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
      padding: var(--onyx-spacing-4xs) var(--onyx-spacing-md);
    }
    &__mobile-footer {
      margin-top: var(--onyx-spacing-xs);
      border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
      border-radius: var(--onyx-radius-sm);
      font-size: 0.8125rem;
      line-height: 1.25rem;
    }
  }
}
</style>
