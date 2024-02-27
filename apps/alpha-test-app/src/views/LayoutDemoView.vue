<script lang="ts" setup>
import chevronRightSmall from "@sit-onyx/icons/chevron-right-small.svg?raw";
import chevronLeftSmall from "@sit-onyx/icons/chevron-left-small.svg?raw";
import { OnyxIcon } from "sit-onyx";
import { ref } from "vue";
import LayoutSettings, {
  type SettingsSections,
} from "../components/layout-demo/LayoutSettings.vue";
import { OnyxHeadline } from "sit-onyx";

const settings = ref<SettingsSections>({
  content: { longPageContent: true },
  sideBar: { showSideBar: true },
  footer: { detailFooter: true },
  overlay: {},
});

const tempOverlayOpen = ref(true);

const muchContent = new Array(100).fill("").map((_, index) => `Lorem ipsum dolor ${index}`);
</script>

<template>
  <div
    class="app"
    :class="{
      'app--detail-footer': settings.footer.detailFooter,
      'app--full-footer': settings.footer.fullFooter,
      'app--sidebar': settings.sideBar.showSideBar,
    }"
  >
    <!----------- GRID top row ----------->
    <div class="demo nav-bar">
      <strong>Top nav bar</strong> |

      <!-- demo flyout -->
      <label>
        Demo Drop Down:
        <span class="flyout-parent">
          <input @click="settings.content.showFlyout = !settings.content.showFlyout" />
          <div v-if="settings.content.showFlyout" class="demo flyout">
            <LayoutSettings v-model="settings" :show="['content']" />
          </div>
        </span>
      </label>

      |
      <!-- demo tooltip -->
      <span class="demo tooltip" :class="{ 'tooltip--forced': settings.content.forceTooltip }">
        Tooltip parent
        <div class="tooltip__text">Hello world Hello world Hello world Hello world</div>
      </span>
    </div>

    <!----------- GRID sidebar (left col) ----------->
    <div v-if="settings.sideBar.showSideBar" class="demo side-bar">
      <LayoutSettings v-model="settings" :show="['content', 'footer', 'sideBar']" />

      <!-- demo tooltip -->
      <div class="demo tooltip" :class="{ 'tooltip--forced': settings.content.forceTooltip }">
        Tooltip parent
        <div class="tooltip__text">Hello world Hello world Hello world Hello world</div>
      </div>
    </div>

    <!----------- GRID main (right col) ----------->
    <div class="page" :class="{ 'page--full-height': !settings.footer.fullFooter }">
      <div class="page__content">
        <OnyxHeadline is="h1">Scrollable page content</OnyxHeadline>

        <LayoutSettings v-model="settings" horizontal />
        <!-- <LayoutDemoOptions /> -->
        <!-- demo sticky content -->
        <div v-if="settings.content.showStickyContent" class="demo sticky-content">
          Sticky content. Example: Breadcrumb bar, Table header, Headlines
        </div>

        <!-- demo flyout -->
        <p>
          <label>
            Drop Down:
            <span class="flyout-parent">
              <input @click="settings.content.showFlyout = !settings.content.showFlyout" />
              <div v-if="settings.content.showFlyout" class="demo flyout">
                <LayoutSettings v-model="settings" :show="['content']" />
              </div>
            </span>
          </label>
        </p>

        <!-- demo tooltip -->
        <div class="demo tooltip" :class="{ 'tooltip--forced': settings.content.forceTooltip }">
          Tooltip parent
          <div class="tooltip__text">Hello world Hello world Hello world Hello world</div>
        </div>

        <!-- demo page content -->
        <template v-if="settings.content.longPageContent">
          <p v-for="content in muchContent" :key="content">{{ content }}</p>
        </template>
      </div>
    </div>

    <!----------- GRID bottom row ----------->
    <div
      v-if="settings.footer.detailFooter || settings.footer.fullFooter"
      class="demo footer bottom-bar"
      :class="{ 'footer--detail': settings.footer.detailFooter }"
    >
      <span v-if="settings.footer.fullFooter">Full </span><span v-else>Detail</span> footer
    </div>

    <!----------- GRID page overlay ----------->
    <!-- demo toast -->
    <div v-if="settings.content.showToast" class="toast-controller">
      <div class="demo toast">Toast message 1</div>
      <div v-if="settings.content.showToast" class="demo toast">Toast message 2</div>
    </div>

    <!----------- GRID full overlay excluding top bar ----------->
    <div v-if="settings.overlay.showPageLoader" class="page-loader">
      <section>
        <OnyxHeadline is="h3">Page loader overlay</OnyxHeadline>

        <LayoutSettings v-model="settings" :show="['overlay']" />
      </section>
    </div>
    <div v-if="settings.overlay.topBarFlyout" class="backdrop top-bar-fly-out">
      <section class="top-bar-fly-out__content">
        <OnyxHeadline is="h3">Mobile Top Bar Flyout</OnyxHeadline>

        <LayoutSettings v-model="settings" :show="['overlay']" />

        <!-- demo tooltip -->
        <div class="demo tooltip" :class="{ 'tooltip--forced': settings.content.forceTooltip }">
          Tooltip parent
          <div class="tooltip__text">Hello world Hello world Hello world Hello world</div>
        </div>
      </section>
    </div>
  </div>

  <!----------- APP cover overlays ----------->
  <!-- demo popover / modal -->
  <Teleport v-if="settings.overlay.showPopover" to="body">
    <div class="backdrop">
      <div class="demo popover">
        <OnyxHeadline is="h3">Popover / Modal content</OnyxHeadline>

        <LayoutSettings v-model="settings" :show="['overlay']" />

        <!-- demo tooltip -->
        <div class="demo tooltip" :class="{ 'tooltip--forced': settings.content.forceTooltip }">
          Tooltip parent
          <div class="tooltip__text">Hello world Hello world Hello world Hello world</div>
        </div>
      </div>
    </div>
  </Teleport>

  <!-- demo mobile fly-in -->
  <Teleport v-if="settings.overlay.showMobileFlyIn" to="body">
    <div class="backdrop">
      <div
        class="demo mobile-fly-in"
        :class="{ 'mobile-fly-in--split': settings.footer.fullFooter }"
      >
        <div class="mobile-fly-in__content">
          <OnyxHeadline is="h3">Mobile fly-in</OnyxHeadline>

          <LayoutSettings v-model="settings" :show="['overlay']" />
        </div>
        <div v-if="settings.footer.fullFooter" class="demo bottom-bar">full footer</div>
      </div>
    </div>
  </Teleport>

  <!-- demo temporary overlay from right -->
  <Teleport v-if="settings.sideBar.showTempOverlay" to="body">
    <div v-if="tempOverlayOpen" class="backdrop"></div>
    <div class="temp-overlay">
      <button class="demo temp-overlay__hinge" @click="tempOverlayOpen = !tempOverlayOpen">
        <OnyxIcon v-if="tempOverlayOpen" :icon="chevronRightSmall" />
        <OnyxIcon v-else :icon="chevronLeftSmall" />
      </button>
      <div v-if="tempOverlayOpen" class="demo temp-overlay__content">
        <OnyxHeadline is="h3">Temp overlay</OnyxHeadline>

        <LayoutSettings v-model="settings" :show="['sideBar']" />

        <!-- demo tooltip -->
        <div class="demo tooltip" :class="{ 'tooltip--forced': settings.content.forceTooltip }">
          Tooltip parent
          <div class="tooltip__text">Hello world Hello world Hello world Hello world</div>
        </div>
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
