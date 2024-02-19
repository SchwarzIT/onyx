<script lang="ts" setup>
import chevronRightSmall from "@sit-onyx/icons/chevron-right-small.svg?raw";
import type { OnyxIcon } from "sit-onyx";
import { ref } from "vue";
import LayersDemoOptionsMolecule from "../components/molecules/LayersDemoOptionsMolecule.vue";

const options = ref({
  showTempOverlay: false, // todo needs different page structure
  showMobileFlyIn: false,
  showFlyout: false,
  showNotification: false, // todo
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
      Scrollable page content

      <div v-if="options.showTempOverlay" class="backdrop">
        <span class="demo temp-overlay">
          >>
          <!-- todo find out why onyxicon does not work -->
          <OnyxIcon :icon="chevronRightSmall" />
        </span>
      </div>
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
      <div v-if="options.showNotification" class="demo notification">info tile / notification</div>
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
</style>
