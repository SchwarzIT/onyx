<script lang="ts" setup></script>

<template>
  <div class="page">
    Base layer of the application
    <div class="top-nav">Top nav bar</div>
    <div class="page-content">
      Scrollable page content

      <div class="backdrop">
        <div class="temp-overlay">temporary overlay</div>
      </div>
      <div class="backdrop">
        <div class="mobile-flyin">mobile flyin</div>
      </div>
      <div class="flyout">flyout</div>
      <div class="notification">info tile / notification</div>
      <div class="toast">toast</div>
      <div class="footer">footer</div>
      <div class="tooltip">tooltip</div>
    </div>

    <div class="backdrop">
      <div class="popover"></div>
    </div>
    <div class="page-overlay">loading page overlay</div>
  </div>
</template>

<style lang="scss" scoped></style>
