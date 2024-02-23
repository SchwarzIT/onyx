<script lang="ts" setup></script>

<template>
  <div class="toast-controller">
    <div class="demo toast">Toast message 1</div>
    <div class="demo toast">Toast message 2</div>
  </div>
</template>

<style lang="scss" scoped>
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
</style>
