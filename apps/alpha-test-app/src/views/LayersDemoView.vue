<script lang="ts" setup>
import chevronRightSmall from "@sit-onyx/icons/chevron-right-small.svg?raw";
import chevronLeftSmall from "@sit-onyx/icons/chevron-left-small.svg?raw";
import { OnyxIcon } from "sit-onyx";
import { ref } from "vue";
import LayersDemoOptionsMolecule from "../components/molecules/LayersDemoOptionsMolecule.vue";

const options = ref({
  longPageContent: true,

  showTempOverlay: false,
  showMobileFlyIn: false,
  showFlyout: false,
  showNotification: false,
  showToast: false,
  showTooltip: false, // todo
  showPopover: false,
  showLoadingPage: false, // todo
  fullSizePopup: false, // todo

  // don't combine with detail footer
  fullFooter: false,
  // don't combine with full footer
  detailFooter: true,
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
    <!-- grid top row -->
    <div class="demo top-nav">
      Top nav bar |

      <label>
        Demo Drop Down:
        <span class="flyout-parent">
          <input @click="options.showFlyout = !options.showFlyout" />
          <div v-if="options.showFlyout" class="demo flyout">
            <LayersDemoOptionsMolecule v-model="options" />
          </div>
        </span>
      </label>
    </div>

    <!-- grid left col -->
    <div class="demo side-bar">
      Sidebar
      <LayersDemoOptionsMolecule v-model="options" />
    </div>

    <!-- grid right col -->
    <div class="page" :class="{ 'page--full-height': !options.fullFooter }">
      <div v-if="options.showNotification" class="demo notification">
        Global Info Tile / Notification
      </div>

      Scrollable page content

      <p>
        <label>
          Demo Drop Down:
          <span class="flyout-parent">
            <input @click="options.showFlyout = !options.showFlyout" />
            <div v-if="options.showFlyout" class="demo flyout">
              <LayersDemoOptionsMolecule v-model="options" />
            </div>
          </span>
        </label>
      </p>
      <div v-if="options.showTooltip" class="demo tooltip">tooltip</div>
      <template v-if="options.longPageContent">
        <p v-for="content in muchContent" :key="content">{{ content }}</p>
      </template>
    </div>

    <!-- grid bottom row -->
    <div
      v-if="options.detailFooter || options.fullFooter || options.showToast"
      class="footer"
      :class="{ 'footer--detail': options.detailFooter }"
    >
      <template v-if="options.showToast">
        <div class="demo toast">Toast message 1</div>
        <div v-if="options.showToast" class="demo toast">Toast message 2</div>
      </template>
      <div v-if="options.detailFooter || options.fullFooter" class="demo bottom-bar">
        detail footer
      </div>
    </div>

    <!-- grid full overlay except top bar -->
    <div v-if="options.showLoadingPage" class="demo page-overlay">Loading page overlay</div>
  </div>

  <Teleport v-if="options.showPopover" to="body">
    <div class="backdrop">
      <div class="demo popover">
        Popover content

        <LayersDemoOptionsMolecule v-model="options" />
      </div>
    </div>
  </Teleport>

  <Teleport v-if="options.showMobileFlyIn" to="body">
    <div class="backdrop">
      <div class="demo mobile-fly-in" :class="{ 'mobile-fly-in--split': options.fullFooter }">
        <div class="mobile-fly-in__content">
          Mobile fly-in

          <LayersDemoOptionsMolecule v-model="options" />
        </div>
        <div v-if="options.fullFooter" class="demo bottom-bar">full footer</div>
      </div>
    </div>
  </Teleport>

  <Teleport v-if="options.showTempOverlay" class="backdrop" to="body">
    <div v-if="tempOverlayOpen" class="backdrop"></div>
    <div class="temp-overlay">
      <button class="demo temp-overlay__hinge" @click="tempOverlayOpen = !tempOverlayOpen">
        <OnyxIcon v-if="tempOverlayOpen" :icon="chevronRightSmall" />
        <OnyxIcon v-else :icon="chevronLeftSmall" />
      </button>
      <div v-if="tempOverlayOpen" class="demo temp-overlay__content">
        Temp overlay
        <LayersDemoOptionsMolecule v-model="options" />
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss">
// decorations
body {
  margin: 0;
}
.demo {
  outline: 1px solid lightgrey;
  background-color: white;
}
.app {
  background-color: #efefef;
}
.notification {
  border: 1px solid #eee;
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

// positions
.app {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 50px auto max-content;
  grid-template-columns: 150px auto;
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
  z-index: 20;
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
  z-index: 10;
  position: absolute;
}

.flyout-parent {
  position: relative;
}

.flyout {
  position: absolute;
  z-index: 10;
  height: fit-content;
  min-width: 100px;
  right: 0;
  left: 0;
}

.temp-overlay {
  position: absolute;
  z-index: 10;
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
  z-index: 20;
}
</style>
