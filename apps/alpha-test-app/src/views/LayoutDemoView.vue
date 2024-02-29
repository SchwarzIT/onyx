<script lang="ts" setup>
import { OnyxButton, OnyxHeadline } from "sit-onyx";
import { computed, ref } from "vue";
import {
  BusyIndicatorDemo,
  FlyoutDemo,
  FooterDemo,
  LayoutSettings,
  MobileBottomFlyInDemo,
  MobileNavFlyoutDemo,
  PopoverDemo,
  SidebarDemo,
  StickyDemo,
  TempOverlayDemo,
  ToastDemo,
  TooltipDemo,
  type SettingsSections,
  FloatingButtonDemo,
} from "../components/layout-demo";

const settings = ref<SettingsSections>({
  content: { showLongPageContent: true },
  sideBar: { showSideBar: false, showSideBarCollapse: true },
  footer: { showDetailFooter: true },
  overlay: { none: true },
});

const muchContent = Array.from({ length: 100 }, (_, index) => `Lorem ipsum dolor ${index}`);

const isSidebarOpen = ref(true);
const showSideBarOpen = computed<boolean>(() => {
  const { showSideBar, showSideBarCollapse } = settings.value.sideBar;
  return showSideBar || (isSidebarOpen.value && showSideBarCollapse) || false;
});
const showTempSideBarOpen = computed<boolean>(() => {
  const { showTempOverlayTransparent, showTempOverlay } = settings.value.sideBar;
  return (isSidebarOpen.value && (showTempOverlay || showTempOverlayTransparent)) || false;
});
</script>

<template>
  <div
    class="app"
    :class="{
      'app--detail-footer': settings.footer.showDetailFooter,
      'app--full-footer': settings.footer.showFullFooter,
      'app--sidebar': showSideBarOpen,
    }"
  >
    <!----------- GRID top row ----------->
    <div class="demo nav-bar">
      <strong>Top nav bar</strong> |

      <FlyoutDemo v-model="settings.content.showFlyout">
        <LayoutSettings v-model="settings" :show="['content']" />
      </FlyoutDemo>

      |
      <TooltipDemo :force-tooltip="settings.content.forceTooltip" style="display: inline-block" />
    </div>

    <!----------- GRID sidebar (left col) ----------->
    <SidebarDemo v-if="showSideBarOpen">
      <LayoutSettings v-model="settings" :show="['content', 'footer', 'sideBar']" />

      <TooltipDemo :force-tooltip="settings.content.forceTooltip" />
    </SidebarDemo>

    <!----------- GRID main (right col) ----------->
    <div class="page" :class="{ 'page--full-height': !settings.footer.showFullFooter }">
      <div class="page__content">
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
    </div>

    <!----------- GRID bottom row ----------->
    <FooterDemo
      v-if="settings.footer.showDetailFooter || settings.footer.showFullFooter"
      :detail-footer="settings.footer.showDetailFooter"
    />

    <!----------- GRID content overlays ----------->
    <ToastDemo v-if="settings.content.showToast" />

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
      v-if="showTempSideBarOpen"
      :transparent="settings.sideBar.showTempOverlayTransparent"
    >
      <LayoutSettings v-model="settings" :show="['sideBar']" />
      <TooltipDemo :force-tooltip="settings.content.forceTooltip" />
    </TempOverlayDemo>

    <FloatingButtonDemo
      v-if="
        settings.sideBar.showTempOverlay ||
        settings.sideBar.showTempOverlayTransparent ||
        settings.sideBar.showSideBarCollapse
      "
      v-model="isSidebarOpen"
    />
  </div>

  <!----------- APP cover overlays ----------->
  <Teleport v-if="settings.overlay.showPopover || settings.overlay.showMobileFlyIn" to="body">
    <div class="backdrop">
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
    </div>
  </Teleport>
</template>

<style lang="scss">
// ****** POSITIONS ******
.app {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: max-content 1fr max-content;
  grid-template-columns: 200px auto;
  grid-template-areas:
    "top top"
    "main main"
    "main main";

  &--detail-footer,
  &--full-footer {
    grid-template-areas:
      "top top"
      "main main"
      "footer footer";
  }

  &--sidebar {
    grid-template-areas:
      "top top"
      "side main"
      "side main";

    &.app--detail-footer {
      grid-template-areas:
        "top top"
        "side main"
        "side footer";
    }
    &.app--full-footer {
      grid-template-areas:
        "top top"
        "side main"
        "footer footer";
    }
  }
}

// *** APP cover overlays
.backdrop {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: var(--onyx-z-index-overlay);
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
}

// *** GRID top (nav bar)
.nav-bar {
  grid-area: top;
  z-index: var(--onyx-z-index-navigation);
}

// *** GRID side (left col)
.side-bar {
  grid-area: side;
}

.floating-button {
  // todo!
}

// *** GRID main (right col)
.page {
  grid-area: main;
  overflow: hidden auto;
  position: relative;
}

// *** GRID footer (bottom row)
.footer {
  grid-area: footer;
}

// *** GRID partial overlays
.page-loader {
  grid-row: 1 / -1;
  grid-column: 1 / -1;
  z-index: var(--onyx-z-index-content-overlay);
}
.top-bar-fly-out {
  grid-column: 1 / -1;
  grid-row: 2 / -1;
  z-index: var(--onyx-z-index-content-overlay);
  top: unset;
  position: unset;
}
.temp-overlay {
  grid-column: 1 / -1;
  grid-row: 2 / -1;
  z-index: var(--onyx-z-index-content-overlay);
  top: unset;
  position: unset;
}
.app--full-footer .toast-controller,
.toast-controller {
  grid-row: 2 / 3;
  grid-column: 1 / -1;
  z-index: var(--onyx-z-index-notification);
  align-self: end;
  justify-self: center;
}
.app--detail-footer .toast-controller {
  grid-row: 2 / 3;
  grid-column: 2 / -1;
}

// ****** DECORATIONS ******
body {
  margin: 0;
}
.demo {
  outline: 1px solid lightgrey;
  background-color: white;
}
.page {
  background-color: #efefef;
}
.nav-bar {
  height: 50px;
}
.page__content {
  padding: 16px;
  box-sizing: border-box;
}
</style>
