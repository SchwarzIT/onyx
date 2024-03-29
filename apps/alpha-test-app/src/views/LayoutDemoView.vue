<script lang="ts" setup>
import { OnyxAppLayout, OnyxButton, OnyxPageLayout } from "sit-onyx";
import { computed, ref } from "vue";
import {
  BusyIndicatorDemo,
  FlyoutDemo,
  FooterDemo,
  LayoutSettings,
  MobileBottomFlyInDemo,
  MobileNavFlyoutDemo,
  NavBarDemo,
  PageDemo,
  PopoverDemo,
  SidebarDemo,
  TempOverlayDemo,
  ToastDemo,
  TooltipDemo,
  type SettingsSections,
} from "../components/layout-demo";

const settings = ref<SettingsSections>({
  content: { showLongPageContent: true },
  sidebar: { showSidebar: true },
  footer: { showDetailFooter: true },
  overlay: { none: true },
});

const navBarLeft = ref(false);

const isSidebarOpen = ref(true);

const showTempSidebarOpen = computed<boolean>(() => {
  const { showTempOverlayTransparent, showTempOverlay } = settings.value.sidebar;
  return (isSidebarOpen.value && (showTempOverlay || showTempOverlayTransparent)) ?? false;
});

const footerAsideSidebar = computed<boolean>(
  () => (settings.value.footer.showDetailFooter && isSidebarOpen.value) ?? false,
);
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

    <!-- key is not needed in a real application where the slots aren't constantly hidden and revealed -->
    <OnyxPageLayout
      :key="JSON.stringify(settings)"
      :footer-aside-sidebar="footerAsideSidebar"
      :hide-sidebar="!isSidebarOpen && !settings.sidebar.showSidebar"
    >
      <template
        v-if="settings.sidebar.showSidebar || settings.sidebar.showSidebarCollapse"
        #sidebar
      >
        <SidebarDemo v-model="isSidebarOpen" :is-closable="settings.sidebar.showSidebarCollapse">
          <LayoutSettings v-model="settings" :show="['content', 'footer', 'sidebar']" />
          <TooltipDemo :force-tooltip="settings.content.forceTooltip" />
        </SidebarDemo>
      </template>

      <PageDemo v-model="settings" v-model:is-sidebar-open="isSidebarOpen" />

      <template v-if="settings.content.showToast" #toasts>
        <ToastDemo />
      </template>

      <template v-if="settings.footer.showDetailFooter || settings.footer.showFullFooter" #footer>
        <FooterDemo :detail-footer="footerAsideSidebar" />
      </template>
    </OnyxPageLayout>

    <template
      v-if="
        settings.overlay.showPageLoader || settings.overlay.showTopBarFlyout || showTempSidebarOpen
      "
      #pageOverlay
    >
      <BusyIndicatorDemo v-if="settings.overlay.showPageLoader">
        <OnyxButton label="Close" @click="settings.overlay.showPageLoader = false" />
        <LayoutSettings v-model="settings" :show="['overlay']" />
      </BusyIndicatorDemo>

      <MobileNavFlyoutDemo v-if="settings.overlay.showTopBarFlyout">
        <OnyxButton label="Close" @click="settings.overlay.showTopBarFlyout = false" />
        <LayoutSettings v-model="settings" :show="['overlay']" />
        <TooltipDemo :force-tooltip="settings.content.forceTooltip" />
      </MobileNavFlyoutDemo>

      <TempOverlayDemo
        v-if="showTempSidebarOpen"
        v-model="isSidebarOpen"
        :transparent="settings.sidebar.showTempOverlayTransparent"
      >
        <LayoutSettings v-model="settings" :show="['sidebar']" />
        <TooltipDemo :force-tooltip="settings.content.forceTooltip" />
      </TempOverlayDemo>
    </template>

    <template v-if="settings.overlay.showPopover || settings.overlay.showMobileFlyIn" #appOverlay>
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
