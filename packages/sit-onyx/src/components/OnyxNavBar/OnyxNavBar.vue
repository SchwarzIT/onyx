<script setup lang="ts" generic="T extends NavBarOrientation">
import { computed, useTemplateRef } from "vue";
import { useVModel } from "../../composables/useVModel.js";
import { useForwardProps } from "../../utils/props.js";
import OnyxHorizontalNavBar from "./OnyxHorizontalNavBar.vue";
import OnyxVerticalNavBar from "./OnyxVerticalNavBar.vue";
import { type NavBarOrientation, type OnyxNavBarProps, type OnyxNavBarSlots } from "./types.js";

const props = withDefaults(defineProps<OnyxNavBarProps<T>>(), {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- for simplicity we use any here
  orientation: "horizontal" as any,
  mobile: "sm",
  expanded: undefined,
});

const slots = defineSlots<OnyxNavBarSlots>();

const emit = defineEmits<{
  /**
   * Emitted when the back button is clicked.
   */
  navigateBack: [event: MouseEvent];
  /**
   * Emitted when the expanded state changes.
   */
  "update:expanded": [expanded: boolean];
}>();

const isExpanded = useVModel({
  props,
  emit,
  key: "expanded",
  default: false,
});

const activeNavBar = computed(() =>
  props.orientation === "horizontal" ? OnyxHorizontalNavBar : OnyxVerticalNavBar,
);
const restAttr = useForwardProps(props, activeNavBar);

const navBar = useTemplateRef("navBarRef");

const closeMobileMenus = () => {
  if (navBar.value && "closeMobileMenus" in navBar.value) {
    navBar.value.closeMobileMenus();
  }
};

defineExpose({
  /**
   * Closes the mobile burger and context menu.
   * Useful if you want to e.g. close them when a nav item is clicked.
   * Will be automatically done if a router is provided.
   *
   * Example usage:
   *
   * ```ts
   * const route = useRoute();
   * const navBar = useTemplateRef("navBarRef");
   *
   * watch(() => route.path, () => navBar.value?.closeMobileMenus());
   * ```
   */
  closeMobileMenus,
});
</script>

<template>
  <component
    :is="activeNavBar"
    ref="navBarRef"
    v-bind="restAttr"
    v-model:expanded="isExpanded"
    class="onyx-component"
    @navigate-back="emit('navigateBack', $event)"
  >
    <template v-for="(_, name) in slots" #[name]>
      <slot :name="name"></slot>
    </template>
  </component>
</template>
