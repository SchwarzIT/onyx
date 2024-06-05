<script lang="ts" setup>
import { computed, ref } from "vue";
import { useResizeObserver } from "../../composables/useResizeObserver";
import { ONYX_BREAKPOINTS } from "../../types";
import DesktopNavBar from "./DesktopNavBar.vue";
import MobileNavBar from "./MobileNavBar.vue";
import type { OnyxNavBarProps } from "./types";

const props = withDefaults(defineProps<OnyxNavBarProps>(), {
  mobileBreakpoint: "xs",
});

const emit = defineEmits<{
  /**
   * Emitted when the app area (where logo and app name are placed) is clicked.
   * Usually the user should be redirected to the home page then.
   */
  appAreaClick: [];
  /**
   * Emitted when the back button is clicked.
   */
  backButtonClick: [];
}>();

defineSlots<{
  /**
   * Nav items, only `OnyxNavItem` components should be placed here.
   */
  default?: () => unknown;
  /**
   * Optional slot to override the app area content (logo and app name, e.g. with a custom icon / `OnyxIcon` component).
   */
  appArea?: () => unknown;
  /**
   * Optional context area on the right to display additional (global) components, like user login, global settings etc.
   */
  contextArea?: () => unknown;
}>();

const navBarRef = ref<HTMLElement>();

const { width } = useResizeObserver(navBarRef);
const isMobile = computed(() => width.value <= ONYX_BREAKPOINTS[props.mobileBreakpoint]);
</script>

<template>
  <div ref="navBarRef">
    <DesktopNavBar
      v-if="!isMobile"
      v-bind="props"
      @app-area-click="emit('appAreaClick')"
      @back-button-click="emit('backButtonClick')"
    >
      <slot></slot>

      <template #appArea>
        <slot name="appArea"></slot>
      </template>

      <template #contextArea>
        <slot name="contextArea"></slot>
      </template>
    </DesktopNavBar>

    <MobileNavBar
      v-else
      v-bind="props"
      @app-area-click="emit('appAreaClick')"
      @back-button-click="emit('backButtonClick')"
    >
      <slot></slot>

      <template #appArea>
        <slot name="appArea"></slot>
      </template>

      <template #contextArea>
        <slot name="contextArea"></slot>
      </template>
    </MobileNavBar>
  </div>
</template>
