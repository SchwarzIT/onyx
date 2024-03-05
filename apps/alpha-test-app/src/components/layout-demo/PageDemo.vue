<script lang="ts" setup>
import { OnyxHeadline } from "sit-onyx";
import { FloatingButtonDemo, FlyoutDemo, LayoutSettings, StickyDemo, TooltipDemo } from ".";
import type { SettingsSections } from ".";
import { computed } from "vue";

const settings = defineModel<SettingsSections>();

const props = defineProps<{
  isSidebarOpen: boolean;
}>();
const emit = defineEmits<{
  isSidebarOpen: [value: boolean];
}>();
const isSidebarOpen = computed({
  get: () => props.isSidebarOpen,
  set: (value) => emit("isSidebarOpen", value),
});

const muchContent = Array.from({ length: 100 }, (_, index) => `Lorem ipsum dolor ${index}`);

const showSidebarOpenButton = computed<boolean>(() => {
  if (!settings.value) return false;
  const { showSidebarCollapse, showTempOverlayTransparent, showTempOverlay } =
    settings.value.sidebar;
  return (
    (!props.isSidebarOpen &&
      (showSidebarCollapse || showTempOverlayTransparent || showTempOverlay)) ??
    false
  );
});
</script>

<template>
  <div v-if="settings" class="page">
    <OnyxHeadline is="h1">Scrollable page content</OnyxHeadline>

    <LayoutSettings v-model="settings" horizontal />

    <StickyDemo v-if="settings.content.showStickyContent" />

    <p>
      <FlyoutDemo v-model="settings.content.showFlyout">
        <LayoutSettings v-model="settings" :show="['content']" />
      </FlyoutDemo>
    </p>

    <TooltipDemo :force-tooltip="settings.content.forceTooltip" />

    <template v-if="settings.content.showLongPageContent">
      <p v-for="content in muchContent" :key="content">{{ content }}</p>
    </template>

    <FloatingButtonDemo
      v-if="showSidebarOpenButton"
      v-model="isSidebarOpen"
      :is-overlay="
        settings.sidebar.showTempOverlay || settings.sidebar.showTempOverlayTransparent || false
      "
    />
  </div>
</template>

<style lang="scss" scoped>
.page {
  padding: var(--onyx-spacing-xl);
  box-sizing: border-box;
}
</style>
