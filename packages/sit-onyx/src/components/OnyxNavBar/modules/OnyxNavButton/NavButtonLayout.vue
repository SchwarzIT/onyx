<script lang="ts" setup>
// this layout component is only used internally for the nav button component
// to easily switch between mobile and desktop layout
import arrowSmallLeft from "@sit-onyx/icons/arrow-small-left.svg?raw";
import { computed } from "vue";
import { useLink } from "../../../../composables/useLink";
import { useVModel, type Nullable } from "../../../../composables/useVModel";
import { injectI18n } from "../../../../i18n";
import OnyxButton from "../../../OnyxButton/OnyxButton.vue";
import OnyxFlyoutMenu from "../OnyxFlyoutMenu/OnyxFlyoutMenu.vue";
import OnyxNavItemMobile from "../OnyxNavItemMobile/OnyxNavItemMobile.vue";
import OnyxNavSeparator from "../OnyxNavSeparator/OnyxNavSeparator.vue";
import OnyxNavItemDesktop from "./NavItemDesktop.vue";
import NavListItemDesktop from "./NavListItemDesktop.vue";
import type { OnyxNavButtonProps } from "./types";

const props = withDefaults(
  defineProps<
    OnyxNavButtonProps & {
      /**
       * If the mobile layout should be used.
       */
      isMobile: boolean;
      /**
       * If the layout is the outer most item.
       */
      isTopLevel: boolean;
    }
  >(),
  { open: undefined },
);

const emit = defineEmits<{
  /**
   * Emitted when the state of mobile children visibility changes.
   */
  "update:open": [value: Nullable<boolean>];
}>();

const slots = defineSlots<{
  /**
   * The trigger for the flyout menu. Should be an interactive component like a button or link.
   */
  button?(params: {
    /**
     * Attributes and event listeners that must be bound to an interactive element (button or link), that should act as the flyout trigger.
     */
    trigger: object;
  }): unknown;
  options?(): unknown;
}>();

const { t } = injectI18n();

const open = useVModel({
  props,
  emit,
  key: "open",
  initialValue: false,
});

const hasChildren = computed(() => !!slots.options);

const { isActive } = useLink();
const active = computed(() => {
  if (props.active !== "auto") return props.active;
  return isActive.value(props.link);
});
</script>

<template>
  <li
    v-if="props.isMobile"
    :class="{
      'onyx-component': true,
      'onyx-nav-button-layout': true,
      'onyx-nav-button-layout--mobile': props.isMobile,
      'onyx-nav-button-layout--open': open,
    }"
    role="presentation"
  >
    <template v-if="open">
      <div class="onyx-nav-button-layout__controls" role="presentation">
        <OnyxButton
          :label="t('back')"
          mode="plain"
          color="neutral"
          :icon="arrowSmallLeft"
          @click="open = false"
        />

        <OnyxNavItemMobile v-bind="props" :has-children="false" :active="active" />
        <OnyxNavSeparator orientation="horizontal" />
      </div>
      <ul role="menu" class="onyx-nav-button-layout__mobile-children">
        <slot name="options"></slot>
      </ul>
    </template>
    <OnyxNavItemMobile
      v-else
      v-bind="props"
      :has-children="hasChildren"
      :active="active"
      @click="hasChildren && (open = true)"
    />
  </li>
  <template v-else>
    <li v-if="props.isTopLevel" class="onyx-component onyx-nav-button-layout">
      <OnyxFlyoutMenu v-if="hasChildren" :label="t('navItemOptionsLabel', { label: props.label })">
        <template #button="{ trigger }">
          <OnyxNavItemDesktop v-bind="{ ...props, ...trigger, active }" />
        </template>

        <template #options>
          <slot name="options"></slot>
        </template>
      </OnyxFlyoutMenu>
      <OnyxNavItemDesktop v-else v-bind="props" :active="active" />
    </li>
    <NavListItemDesktop v-else v-bind="props" :active />
  </template>
</template>

<style lang="scss">
.onyx-nav-button-layout {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--onyx-spacing-xs);

  &__mobile-children {
    padding: 0;
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: var(--onyx-spacing-2xs);
  }

  &__controls {
    display: contents;
  }

  &:has(~ .onyx-nav-button-layout--open),
  &--open ~ .onyx-nav-button-layout {
    display: none;
  }

  &--open:has(.onyx-nav-button-layout--open) > &__controls {
    display: none;
  }
}
</style>
