<script lang="ts" setup>
import chevronRightSmall from "@sit-onyx/icons/chevron-right-small.svg?raw";
import chevronLeftSmall from "@sit-onyx/icons/chevron-left-small.svg?raw";
import { OnyxIcon } from "sit-onyx";
import { ref } from "vue";
import LayersDemoOptionsMolecule from "../components/molecules/LayersDemoOptionsMolecule.vue";

const options = ref({
  showTempOverlay: false,
  showMobileFlyIn: false,
  showFlyout: false,
  showNotification: false,
  showToast: false, // todo
  showTooltip: false, // todo
  showPopover: false,
  showLoadingPage: false, // todo
  longPageContent: true,

  // don't combine with detail footer
  fullFooter: false,
  // don't combine with full footer
  detailFooter: true,
});

const tempOverlayOpen = ref(true);

const muchContent = new Array(100).fill("").map((_, index) => `Lorem ipsum dolor ${index}`);
</script>

<template>
  <div class="app">
    <div class="demo top-nav">Top nav bar</div>
    <div class="demo side-bar" :class="{ 'side-bar--cut': !options.fullFooter }">
      Sidebar
      <LayersDemoOptionsMolecule v-model="options" />
    </div>
    <div class="page">
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
      <div v-if="options.showToast" class="demo toast">toast</div>
      <div v-if="options.detailFooter" class="demo footer">detail footer</div>
      <div v-if="options.showTooltip" class="demo tooltip">tooltip</div>

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
            <div v-if="options.fullFooter" class="demo footer">full footer</div>
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

      <template v-if="options.longPageContent">
        <p v-for="content in muchContent" :key="content">{{ content }}</p>
      </template>
    </div>

    <div v-if="options.fullFooter" class="demo footer">full footer</div>
  </div>

  <div v-if="options.showLoadingPage" class="demo page-overlay">loading page overlay</div>
</template>

<style lang="scss">
body {
  margin: 0;
}

.demo {
  outline: 1px solid lightgrey;
  background-color: white;
}

.app {
  background-color: #efefef;
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 50px auto 50px;
  grid-template-columns: 150px auto;
}

.page {
  overflow: hidden auto;
  position: relative;
}

.footer {
  position: fixed;
  bottom: 0;
  z-index: 10;
  width: 100%;
  height: 50px;
}

.top-nav {
  grid-column: 1 / -1;
}

.side-bar--cut {
  grid-row: 2 / -1;
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

  border: 1px solid #eee;
  padding: 24px;
}
</style>
