<script lang="ts" setup>
import { OnyxAppLayout, OnyxDialog, OnyxHeadline, OnyxPageLayout, useToast } from "sit-onyx";
import { ref, watch } from "vue";
import {
  FlyoutDemo,
  FooterDemo,
  LayoutSettings,
  NavBarDemo,
  PageDemo,
  SidebarDemo,
  TooltipDemo,
  type SettingsSections,
} from "../components/layout-demo/index.js";

const settings = ref<SettingsSections>({
  content: { showLongPageContent: true },
  sidebar: { showSidebar: true },
  footer: { showDetailFooter: true },
  overlay: { none: true },
});

const toast = useToast();

const navBarLeft = ref(false);
const isSidebarOpen = ref(true);

watch(
  () => settings.value.content.showToast,
  (showToast) => {
    if (showToast) {
      toast.show({
        headline: "Example toast 1",
        description: "This is a test description",
        duration: 0,
      });

      toast.show({ headline: "Example toast 2", color: "success" });
    } else {
      toast.toasts.value.forEach(({ id }) => toast.remove(id));
    }
  },
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
        <TooltipDemo class="tooltip" :force-tooltip="settings.content.forceTooltip" />
      </NavBarDemo>
    </template>

    <!-- key is not needed in a real application where the slots aren't constantly hidden and revealed -->
    <OnyxPageLayout :footer-alignment="settings.footer.showDetailFooter ? 'page' : 'full'">
      <template
        v-if="
          settings.sidebar.showSidebar || (settings.sidebar.showSidebarCollapse && isSidebarOpen)
        "
        #sidebar
      >
        <SidebarDemo v-model="isSidebarOpen" :is-closable="settings.sidebar.showSidebarCollapse">
          <LayoutSettings v-model="settings" :show="['content', 'footer', 'sidebar']" />
          <TooltipDemo :force-tooltip="settings.content.forceTooltip" />
        </SidebarDemo>
      </template>

      <PageDemo v-model="settings" v-model:is-sidebar-open="isSidebarOpen" />

      <template v-if="settings.footer.showDetailFooter || settings.footer.showFullFooter" #footer>
        <FooterDemo :detail-footer="settings.footer.showDetailFooter" />
      </template>
    </OnyxPageLayout>

    <OnyxDialog
      label="Example dialog"
      :open="settings.overlay.showModal"
      modal
      @close="settings.overlay.showModal = false"
    >
      <OnyxHeadline is="h2">Modal content</OnyxHeadline>
      <p>Press "Escape" to close the modal.</p>

      <LayoutSettings v-model="settings" :show="['overlay']" />
      <TooltipDemo :force-tooltip="settings.content.forceTooltip" />
    </OnyxDialog>

    <OnyxDialog
      label="Example dialog"
      :open="settings.overlay.showPopover"
      @close="settings.overlay.showPopover = false"
    >
      <OnyxHeadline is="h2">Modal content</OnyxHeadline>
      <p>Press "Escape" to close the modal.</p>

      <LayoutSettings v-model="settings" :show="['overlay']" />
      <TooltipDemo :force-tooltip="settings.content.forceTooltip" />
    </OnyxDialog>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.tooltip {
  display: inline-block;
}
</style>
