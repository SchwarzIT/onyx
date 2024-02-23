<script lang="ts" setup>
import chevronLeftSmall from "@sit-onyx/icons/chevron-left-small.svg?raw";
import chevronRightSmall from "@sit-onyx/icons/chevron-right-small.svg?raw";
import { OnyxIcon } from "sit-onyx";
import { ref } from "vue";
import {
  FlyoutDemo,
  LayoutDemoOptions,
  TooltipDemo,
  SidebarDemo,
  StickyDemo,
  FooterDemo,
  ToastDemo,
  BusyIndicatorDemo,
  // FloatingActionButtonDemo,
  MobileNavFlyoutDemo,
  // MobileBottomFlyoutDemo,
  PopoverDemo,
  // TempOverlayDemo,
} from "../components/layout-demo";

const options = ref({
  title0: "Page length:",
  longPageContent: true,

  title1: "Small overlays:",
  showFlyout: false,
  forceTooltip: false,

  title3: "Docking content:",
  showSideBar: true,
  showStickyContent: false,
  showToast: false,
  detailFooter: true,
  fullFooter: false,

  title2: "Full overlays:",
  showPopover: false,
  showTempOverlay: false,
  showMobileFlyIn: false,
  showPageLoader: false,
  topBarFlyout: false,
});

const tempOverlayOpen = ref(true);

const muchContent = new Array(100).fill("").map((_, index) => `Lorem ipsum dolor ${index}`);
</script>

<template>
  <div
    class="app"
    :class="{
      'app--detail-footer': options.detailFooter,
      'app--full-footer': options.fullFooter,
      'app--sidebar': options.showSideBar,
    }"
  >
    <!----------- GRID top row ----------->
    <div class="demo nav-bar">
      <strong>Top nav bar</strong> |

      <FlyoutDemo v-model="options.showFlyout">
        <LayoutDemoOptions v-model="options" highlight-label="showFlyout" />
      </FlyoutDemo>

      |
      <TooltipDemo :force-tooltip="options.forceTooltip" style="display: inline-block" />
    </div>

    <!----------- GRID sidebar (left col) ----------->
    <SidebarDemo v-if="options.showSideBar">
      <LayoutDemoOptions v-model="options" highlight-label="showSideBar" />
      <TooltipDemo :force-tooltip="options.forceTooltip" />
    </SidebarDemo>

    <!----------- GRID main (right col) ----------->
    <div class="page" :class="{ 'page--full-height': !options.fullFooter }">
      <div class="page__content">
        <h2>Scrollable page content</h2>

        <!-- demo sticky content -->
        <StickyDemo v-if="options.showStickyContent" />

        <p>
          <FlyoutDemo v-model="options.showFlyout">
            <LayoutDemoOptions v-model="options" highlight-label="showFlyout" />
          </FlyoutDemo>
        </p>

        <TooltipDemo :force-tooltip="options.forceTooltip" />

        <LayoutDemoOptions v-if="!options.showSideBar" v-model="options" />

        <!-- demo page content -->
        <template v-if="options.longPageContent">
          <p v-for="content in muchContent" :key="content">{{ content }}</p>
        </template>
      </div>
    </div>

    <!----------- GRID bottom row ----------->
    <FooterDemo
      v-if="options.detailFooter || options.fullFooter"
      :detail-footer="options.detailFooter"
    />

    <!----------- GRID content overlays ----------->
    <ToastDemo v-if="options.showToast" />

    <BusyIndicatorDemo v-if="options.showPageLoader">
      <LayoutDemoOptions v-model="options" highlight-label="showPageLoader" />
    </BusyIndicatorDemo>

    <MobileNavFlyoutDemo v-if="options.topBarFlyout">
      <LayoutDemoOptions v-model="options" highlight-label="topBarFlyout" />
      <TooltipDemo :force-tooltip="options.forceTooltip" />
    </MobileNavFlyoutDemo>
  </div>

  <!----------- APP cover overlays ----------->
  <PopoverDemo v-if="options.showPopover">
    <LayoutDemoOptions v-model="options" highlight-label="showPopover" />
    <TooltipDemo :force-tooltip="options.forceTooltip" />
    <button @click="options.showPopover = false">Close</button>
  </PopoverDemo>

  <!-- demo mobile fly-in -->
  <Teleport v-if="options.showMobileFlyIn" to="body">
    <div class="backdrop">
      <div class="demo mobile-fly-in" :class="{ 'mobile-fly-in--split': options.fullFooter }">
        <div class="mobile-fly-in__content">
          <h3>Mobile fly-in</h3>

          <LayoutDemoOptions v-model="options" highlight-label="showMobileFlyIn" />
        </div>
        <FooterDemo v-if="options.fullFooter" />
      </div>
    </div>
  </Teleport>

  <!-- demo temporary overlay from right -->
  <Teleport v-if="options.showTempOverlay" to="body">
    <div v-if="tempOverlayOpen" class="backdrop"></div>
    <div class="temp-overlay">
      <button class="demo temp-overlay__hinge" @click="tempOverlayOpen = !tempOverlayOpen">
        <OnyxIcon v-if="tempOverlayOpen" :icon="chevronRightSmall" />
        <OnyxIcon v-else :icon="chevronLeftSmall" />
      </button>
      <div v-if="tempOverlayOpen" class="demo temp-overlay__content">
        <h3>Temp overlay</h3>
        <LayoutDemoOptions v-model="options" highlight-label="showTempOverlay" />

        <TooltipDemo :force-tooltip="options.forceTooltip" />
      </div>
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

// *** GRID top (nav bar)
.nav-bar {
  grid-area: top;
  z-index: var(--onyx-z-index-navigation);
}

// *** GRID side (left col)
.side-bar {
  grid-area: side;
  overflow: hidden auto;
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
.page-loader,
.top-bar-fly-out {
  grid-row: 1 / -1;
  grid-column: 1 / -1;
  z-index: var(--onyx-z-index-content-overlay);
}
.top-bar-fly-out {
  top: unset;
  position: unset;
  grid-row: 2 / -1;
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

// *** local overlays
.flyout-parent {
  position: relative;
}
.flyout {
  position: absolute;
  z-index: var(--onyx-z-index-flyout);
  height: fit-content;
  min-width: 100px;
  right: 0;
  left: 0;
}
.sticky-content {
  position: sticky;
  top: 0;
  z-index: var(--onyx-z-index-sticky-content);
}
.tooltip {
  position: relative;

  &:hover,
  &--forced {
    .tooltip__text {
      visibility: inherit;
    }
  }

  &__text {
    position: absolute;
    top: 28px;
    left: 0;
    z-index: var(--onyx-z-index-flyout);
    visibility: hidden;
  }
}

// *** APP cover overlays
.popover {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  max-width: 400px;
  max-height: fit-content;
  margin: auto;
}
.mobile-fly-in {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  max-height: fit-content;
  margin: auto;
  display: grid;
  &--split {
    grid-template-rows: auto 50px;
  }
}
.backdrop {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: var(--onyx-z-index-overlay);
  position: absolute;
}
.full-size-popup {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: var(--onyx-z-index-overlay);
  position: absolute;
  display: grid;
  grid-template-rows: 1fr 50px;
  &__content {
    overflow: auto;
  }
}
.temp-overlay {
  position: absolute;
  z-index: var(--onyx-z-index-overlay);
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;

  &__content {
    width: 250px;
  }

  &__hinge {
    max-height: 50px;
    margin: auto 0;
  }
}

.dialog {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: var(--onyx-z-index-overlay);
  position: absolute;
}

dialog::backdrop {
  background-color: salmon;
}
// ::backdrop {
// background-color: rgba(0, 0, 0, 0.5);
// top: 0;
// left: 0;
// bottom: 0;
// right: 0;
// z-index: var(--onyx-z-index-overlay);
// position: absolute;
// }

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
.backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}
.sticky-content {
  border: 1px solid #eee;
  background-color: #f9f9f9;
  padding: 24px;
}
.toast-controller {
  width: 60%;
  min-width: min(500px, 100%);
  height: fit-content;
}
.toast {
  background-color: rgba(0, 0, 0, 0.6);
  outline: 1px solid #efefef;
  color: white;
  padding: 16px;
}
.nav-bar,
.bottom-bar {
  height: 50px;
}
.tooltip {
  padding: 4px;
  width: fit-content;
  &__text {
    padding: 4px;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    width: 150px;
  }
}
.side-bar,
.page__content,
.page-loader {
  padding: 16px;
  box-sizing: border-box;
}
.page-loader {
  background-color: rgba(212, 212, 212, 0.78);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.top-bar-fly-out__content,
.full-size-popup {
  background-color: white;
  padding: 4px;
}
</style>
