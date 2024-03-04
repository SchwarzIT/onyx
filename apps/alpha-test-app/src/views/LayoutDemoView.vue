<script lang="ts" setup>
import { OnyxAppLayout, OnyxHeadline, OnyxPageLayout, OnyxButton } from "sit-onyx";
import { computed, ref } from "vue";
import {
  // BusyIndicatorDemo,
  FlyoutDemo,
  FooterDemo,
  LayoutSettings,
  MobileBottomFlyInDemo,
  // MobileNavFlyoutDemo,
  NavBarDemo,
  PopoverDemo,
  SidebarDemo,
  StickyDemo,
  // TempOverlayDemo,
  // ToastDemo,
  TooltipDemo,
  type SettingsSections,
  // FloatingButtonDemo,
} from "../components/layout-demo";

const settings = ref<SettingsSections>({
  content: { showLongPageContent: true },
  sidebar: { showSidebar: true },
  footer: { showDetailFooter: true },
  overlay: { none: true },
});

const navBarLeft = ref(false);

const muchContent = Array.from({ length: 100 }, (_, index) => `Lorem ipsum dolor ${index}`);

const isSidebarOpen = ref(true);
const showSidebarOpen = computed<boolean>(() => {
  const { showSidebar, showSidebarCollapse } = settings.value.sidebar;
  return showSidebar || (isSidebarOpen.value && showSidebarCollapse) || false;
});
// const showTempSidebarOpen = computed<boolean>(() => {
//   const { showTempOverlayTransparent, showTempOverlay } = settings.value.sidebar;
//   return (isSidebarOpen.value && (showTempOverlay || showTempOverlayTransparent)) || false;
// });

const sidebarBehavior = computed(() => {
  const { showSidebar, showSidebarCollapse, showTempOverlayTransparent, showTempOverlay } =
    settings.value.sidebar;
  if (showSidebar) return "sticky";
  if (showSidebarCollapse) return "collapsible";
  if (showTempOverlayTransparent || showTempOverlay) return "overlay";
  return undefined;
});
const footerBehavior = computed(() => {
  const { showFullFooter, showDetailFooter } = settings.value.footer;
  if (showFullFooter) return "full";
  if (showDetailFooter) return "main";
  return undefined;
});
</script>

<template>
  <OnyxAppLayout :nav-bar-alignment="navBarLeft ? 'left' : 'top'">
    <template #navBar>
      <NavBarDemo v-model="navBarLeft">
        <FlyoutDemo v-model="settings.content.showFlyout" :small="navBarLeft">
          <LayoutSettings v-model="settings" :show="['content']" />
        </FlyoutDemo>
        |
        <TooltipDemo :force-tooltip="settings.content.forceTooltip" style="display: inline-block" />
      </NavBarDemo>
    </template>

    <OnyxPageLayout :sidebar-behavior="sidebarBehavior" :footer-behavior="footerBehavior">
      <template v-if="showSidebarOpen" #sidebar>
        <SidebarDemo>
          <LayoutSettings v-model="settings" :show="['content', 'footer', 'sidebar']" />
          <TooltipDemo :force-tooltip="settings.content.forceTooltip" />
        </SidebarDemo>
      </template>

      <div class="page">
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
      </div>

      <template v-if="settings.footer.showDetailFooter || settings.footer.showFullFooter" #footer>
        <FooterDemo :detail-footer="settings.footer.showDetailFooter" />
      </template>
    </OnyxPageLayout>

    <template v-if="settings.overlay.showPopover || settings.overlay.showMobileFlyIn" #overlay>
      <PopoverDemo v-if="settings.overlay.showPopover">
        <OnyxButton label="Close" @click="settings.overlay.showPopover = false" />
        <LayoutSettings v-model="settings" :show="['overlay']" />
        <TooltipDemo :force-tooltip="settings.content.forceTooltip" />
      </PopoverDemo>

      <MobileBottomFlyInDemo
        v-if="settings.overlay.showMobileFlyIn"
        :show-footer="settings.footer.showFullFooter || settings.footer.showDetailFooter"
      >
        <OnyxButton label="Close" @click="settings.overlay.showMobileFlyIn = false" />
        <LayoutSettings v-model="settings" :show="['overlay']" />
      </MobileBottomFlyInDemo>
    </template>
  </OnyxAppLayout>
</template>

<style lang="scss">
body {
  margin: 0;
}

.page {
  padding: 2rem;
  box-sizing: border-box;
}
</style>
