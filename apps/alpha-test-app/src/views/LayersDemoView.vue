<script lang="ts" setup>
import chevronRightSmall from "@sit-onyx/icons/chevron-right-small.svg?raw";
import chevronLeftSmall from "@sit-onyx/icons/chevron-left-small.svg?raw";
import { OnyxIcon } from "sit-onyx";
import { ref } from "vue";
import LayersDemoOptionsMolecule from "../components/molecules/LayersDemoOptionsMolecule.vue";

/** TASK LIST
 * - try alternative approach without grid?
 */

const options = ref({
  longPageContent: true,

  showFlyout: false,
  forceTooltip: false,

  showPopover: false,
  showTempOverlay: false,
  showMobileFlyIn: false,
  fullSizePopup: false,
  showLoadingPage: true,

  showNotification: false,
  showToast: false,
  detailFooter: true,
  fullFooter: false,
});

const tempOverlayOpen = ref(true);

const muchContent = new Array(100).fill("").map((_, index) => `Lorem ipsum dolor ${index}`);
</script>

<template>
  <div
    class="app"
    :class="{
      'app--full-footer': options.fullFooter || (options.showToast && !options.detailFooter),
      'app--detail-footer': options.detailFooter,
    }"
  >
    <!----------- GRID top row ----------->
    <div class="demo top-nav">
      <strong>Top nav bar</strong> |

      <!-- demo flyout -->
      <label>
        Demo Drop Down:
        <span class="flyout-parent">
          <input @click="options.showFlyout = !options.showFlyout" />
          <div v-if="options.showFlyout" class="demo flyout">
            <LayersDemoOptionsMolecule v-model="options" highlight-label="showFlyout" />
          </div>
        </span>
      </label>

      |
      <!-- demo tooltip -->
      <span class="demo tooltip" :class="{ 'tooltip--forced': options.forceTooltip }">
        Tooltip parent
        <div class="tooltip__text">Hello world Hello world Hello world Hello world</div>
      </span>
    </div>

    <!----------- GRID left col ----------->
    <div class="demo side-bar">
      <h3>Sidebar</h3>
      <LayersDemoOptionsMolecule v-model="options" />

      <!-- demo tooltip -->
      <div class="demo tooltip" :class="{ 'tooltip--forced': options.forceTooltip }">
        Tooltip parent
        <div class="tooltip__text">Hello world Hello world Hello world Hello world</div>
      </div>
    </div>

    <!----------- GRID right col ----------->
    <div class="page" :class="{ 'page--full-height': !options.fullFooter }">
      <!-- demo global info tile -->
      <div v-if="options.showNotification" class="demo notification">
        Global Info Tile / Notification
      </div>

      <div class="page__content">
        <h2>Scrollable page content</h2>

        <!-- demo flyout -->
        <p>
          <label>
            Demo Drop Down:
            <span class="flyout-parent">
              <input @click="options.showFlyout = !options.showFlyout" />
              <div v-if="options.showFlyout" class="demo flyout">
                <LayersDemoOptionsMolecule v-model="options" highlight-label="showFlyout" />
              </div>
            </span>
          </label>
        </p>

        <!-- demo tooltip -->
        <div class="demo tooltip" :class="{ 'tooltip--forced': options.forceTooltip }">
          Tooltip parent
          <div class="tooltip__text">Hello world Hello world Hello world Hello world</div>
        </div>

        <!-- demo page content -->
        <template v-if="options.longPageContent">
          <p v-for="content in muchContent" :key="content">{{ content }}</p>
        </template>
      </div>
    </div>

    <!----------- GRID bottom row ----------->
    <div
      v-if="options.detailFooter || options.fullFooter || options.showToast"
      class="footer"
      :class="{ 'footer--detail': options.detailFooter }"
    >
      <!-- demo toast -->
      <template v-if="options.showToast">
        <div class="demo toast">Toast message 1</div>
        <div v-if="options.showToast" class="demo toast">Toast message 2</div>
      </template>

      <!-- demo bottom-bar -->
      <div v-if="options.detailFooter || options.fullFooter" class="demo bottom-bar">
        detail footer
      </div>
    </div>
  </div>

  <!----------- GRID full overlay excluding top bar ----------->
  <div v-if="options.showLoadingPage" class="loading-page">
    <section>
      <h3>Loading page overlay</h3>

      <LayersDemoOptionsMolecule v-model="options" highlight-label="showLoadingPage" />
    </section>
  </div>

  <!----------- APP cover overlays ----------->
  <!-- demo popover / modal -->
  <Teleport v-if="options.showPopover" to="body">
    <div class="backdrop">
      <div class="demo popover">
        <h3>Popover / Modal content</h3>

        <LayersDemoOptionsMolecule v-model="options" highlight-label="showPopover" />

        <!-- demo tooltip -->
        <div class="demo tooltip" :class="{ 'tooltip--forced': options.forceTooltip }">
          Tooltip parent
          <div class="tooltip__text">Hello world Hello world Hello world Hello world</div>
        </div>
      </div>
    </div>
  </Teleport>

  <!-- full size popup -->
  <Teleport v-if="options.fullSizePopup" to="body">
    <div class="demo full-size-popup">
      <div>
        <h3>This is a full size popup. Usually used in mobile apps</h3>
        Try it with "fullFooter".

        <LayersDemoOptionsMolecule v-model="options" highlight-label="fullSizePopup" />
      </div>

      <div v-if="options.fullFooter" class="demo bottom-bar">full footer</div>
    </div>
  </Teleport>

  <!-- demo mobile fly-in -->
  <Teleport v-if="options.showMobileFlyIn" to="body">
    <div class="backdrop">
      <div class="demo mobile-fly-in" :class="{ 'mobile-fly-in--split': options.fullFooter }">
        <div class="mobile-fly-in__content">
          <h3>Mobile fly-in</h3>

          <LayersDemoOptionsMolecule v-model="options" highlight-label="showMobileFlyIn" />
        </div>
        <div v-if="options.fullFooter" class="demo bottom-bar">full footer</div>
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
        <LayersDemoOptionsMolecule v-model="options" highlight-label="showTempOverlay" />

        <!-- demo tooltip -->
        <div class="demo tooltip" :class="{ 'tooltip--forced': options.forceTooltip }">
          Tooltip parent
          <div class="tooltip__text">Hello world Hello world Hello world Hello world</div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss">
:root {
  --onyx-layer-temp-overlay: 50;
  --onyx-layer-overlay: 50;
  --onyx-layer-top-nav: 40;
  --onyx-layer-notification: 30;
  --onyx-layer-flyout: 20;
  --onyx-layer-tooltip: 10;
  --onyx-layer-loading-page: 10;
}

// decorations
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
.notification {
  border: 1px solid #eee;
  background-color: #f9f9f9;
  padding: 24px;
}
.toast {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  outline: 1px solid #efefef;
  color: white;
  padding: 16px;
}
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
    width: 250px;
  }
}
.side-bar,
.page__content,
.loading-page {
  padding: 16px;
  box-sizing: border-box;
}
.loading-page {
  display: flex;
  justify-content: center;
  align-items: center;
}

// positions
.app {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 50px 1fr max-content;
  grid-template-columns: 200px auto;
  grid-template-areas:
    "top top"
    "side main"
    "side main";

  &--detail-footer {
    grid-template-areas:
      "top top"
      "side main"
      "side footer";
  }
  &--full-footer {
    grid-template-areas:
      "top top"
      "side main"
      "footer footer";
  }
}

.page {
  grid-area: main;
  overflow: hidden auto;
  position: relative;
}

.side-bar {
  grid-area: side;
}

.footer {
  grid-area: footer;
  display: flex;
  flex-direction: column;
}

.top-nav {
  grid-area: top;
  z-index: var(--onyx-layer-top-nav);
}

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
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: var(--onyx-layer-overlay);
  position: absolute;
}

.full-size-popup {
  background-color: white;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: var(--onyx-layer-overlay);
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.flyout-parent {
  position: relative;
}

.flyout {
  position: absolute;
  z-index: var(--onyx-layer-flyout);
  height: fit-content;
  min-width: 100px;
  right: 0;
  left: 0;
}

.temp-overlay {
  position: absolute;
  z-index: var(--onyx-layer-temp-overlay);
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

.notification {
  position: sticky;
  top: 0;
  z-index: var(--onyx-layer-notification);
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
    z-index: var(--onyx-layer-tooltip);
    visibility: hidden;
  }
}

.loading-page {
  background-color: rgba(212, 212, 212, 0.78);
  position: fixed;
  top: 50px;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: var(--onyx-layer-loading-page);
  backdrop-filter: blur(4px);
}
</style>
