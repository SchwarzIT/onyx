<script setup lang="ts" generic="T extends NavItemOrientationMode">
import { computed } from "vue";
import { useVModel } from "../../composables/useVModel.js";
import { useForwardProps } from "../../utils/props.js";
import OnyxHorizontalNavBar from "./OnyxHorizontalNavBar.vue";
import OnyxVerticalNavBar from "./OnyxVerticalNavBar.vue";
import {
  type NavItemOrientationMode,
  type OnyxNavBarProps,
  type OnyxNavBarSlots,
} from "./types.js";

const props = withDefaults(defineProps<OnyxNavBarProps<T>>(), {
  orientation: "horizontal",
  mobile: "sm",
  collapsed: undefined,
});

const slots = defineSlots<OnyxNavBarSlots<T>>();

const emit = defineEmits(["navigateBack", "update:collapsed"]);

const isCollapsed = useVModel({
  props,
  emit,
  key: "collapsed",
  default: false,
});

const activeNavBar = computed(() =>
  props.orientation === "horizontal" ? OnyxHorizontalNavBar : OnyxVerticalNavBar,
);
const restAttr = useForwardProps(activeNavBar);
</script>

<template>
  <component
    :is="activeNavBar"
    v-bind="restAttr"
    v-model:collapsed="isCollapsed"
    class="onyx-component"
    v-on="$attrs"
  >
    <template v-for="(_, name) in slots" #[name]>
      <slot :name="name"></slot>
    </template>
  </component>
</template>
