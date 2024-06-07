<script setup lang="ts" generic="TValue extends SelectOptionValue = SelectOptionValue">
// import { createFlyoutMenu } from "@sit-onyx/headless";
import type { SelectOptionValue } from "../../types";
import OnyxListItem from "../OnyxListItem/OnyxListItem.vue";

// const props = defineProps<OnyxFlyoutMenuProps<TValue>>();

const slots = defineSlots<{
  /**
   * OnyxFlyoutMenuItem to show
   */
  default?(): typeof OnyxListItem;
  /**
   * Optional header content to display above the options.
   */
  header?(): unknown;
  /**
   * Optional footer content to display below the options (will replace `message` property).
   */
  footer?(): unknown;
}>();

/**
 * Currently (visually) active item.
 */
// const activeListItem = ref<TValue>();

// const enabledOptionValues = computed(() => {
//   if (slots.default != undefined) {
//     const defaultSlot = Array.from(slots.default) ?? [];
//     slots.default.length
//     slots.default.forEach(element => {

//     });
//     return slots.default.filter<HTMLElement[]>((i) => !i.disabled).map(({ value }) => value),
//   }
// });

/**
 * Sync the active item with the selected item on single select.
 */
// watch(
//   () => props.modelValue,
//   (newValue) => {
//     activeListItem.value = newValue as typeof activeListItem.value;
//   },
// );

// const {
//   elements: { flyoutMenu },
// } = createFlyoutMenu({
//   label: "Flyout Menu",
//   selectedListItem: computed(() => props.modelValue),
//   activeListItem,
//   // onActivateFirst: () => (activeListItem.value = allKeyboardOptionIds.value.at(0)),
//   // onActivateLast: () => (activeListItem.value = allKeyboardOptionIds.value.at(-1)),
//   // onActivateNext: (currentValue) => {
//   //   const currentIndex = allKeyboardOptionIds.value.findIndex((i) => i === currentValue);
//   //   if (currentIndex < allKeyboardOptionIds.value.length - 1) {
//   //     activeListItem.value = allKeyboardOptionIds.value[currentIndex + 1];
//   //   }
//   // },
//   // onActivatePrevious: (currentValue) => {
//   //   const currentIndex = allKeyboardOptionIds.value.findIndex((i) => i === currentValue);
//   //   if (currentIndex > 0) activeListItem.value = allKeyboardOptionIds.value[currentIndex - 1];
//   // },
//   // onTypeAhead: (label) => {
//   //   const firstMatch = props.options.find((i) => {
//   //     return i.label.toLowerCase().trim().startsWith(label.toLowerCase());
//   //   });
//   //   if (!firstMatch) return;
//   //   activeListItem.value = firstMatch.value;
//   // },
// });
</script>

<template>
  <div
    :class="{
      'onyx-flyout-menu': true,
      'onyx-flyout-menu--with-header': !!slots.header,
      'onyx-flyout-menu--with-footer': !!slots.footer,
    }"
  >
    <slot name="header"></slot>
    <ul class="onyx-flyout-menu__wrapper onyx-flyout-menu__group">
      <slot></slot>
    </ul>
    <slot name="footer"></slot>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";
@use "../../styles/mixins/list";

.onyx-flyout-menu {
  @include layers.component() {
    @include list.styles();

    &--with-header {
      padding-top: 0;
    }

    &--with-footer {
      padding-bottom: 0;
    }
  }
}
</style>
