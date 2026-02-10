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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- for simplicity we use any here
  orientation: "horizontal" as any,
  mobile: "sm",
  collapsed: undefined,
});

const slots = defineSlots<OnyxNavBarSlots>();

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
const restAttr = useForwardProps(props, activeNavBar);
</script>

<template>
  <component
    :is="activeNavBar"
    v-bind="restAttr"
    v-model:collapsed="isCollapsed"
    class="onyx-component"
    @navigate-back="emit('navigateBack')"
  >
    <template v-for="(_, name) in slots" #[name]>
      <slot :name="name"></slot>
    </template>
  </component>
</template>
