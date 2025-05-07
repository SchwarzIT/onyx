<script lang="ts" setup>
import { OnyxHeadline } from "sit-onyx";
import { computed } from "vue";
import type { SettingsSections } from ".";
import { FloatingButtonDemo, FlyoutDemo, LayoutSettings, StickyDemo, TooltipDemo } from ".";

const settings = defineModel<SettingsSections>({ required: true });
const isSidebarOpen = defineModel<boolean>("isSidebarOpen");

const muchContent = Array.from({ length: 100 }, (_, index) => `Lorem ipsum dolor ${index}`);

const showSidebarOpenButton = computed<boolean>(() => {
  if (!settings.value) return false;
  const { showSidebarCollapse, showTempOverlayTransparent, showTempOverlay } =
    settings.value.sidebar;
  return (
    (!isSidebarOpen.value &&
      (showSidebarCollapse || showTempOverlayTransparent || showTempOverlay)) ??
    false
  );
});
</script>

<template>
  <div>
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
