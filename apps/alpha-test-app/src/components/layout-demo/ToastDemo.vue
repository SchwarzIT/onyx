<script lang="ts" setup></script>

<template>
  <div class="toast-controller">
    <div class="demo toast">Toast message 1</div>
    <div class="demo toast">Toast message 2</div>
  </div>
</template>

<style lang="scss" scoped>
.toast-controller {
  width: min(500px, calc(100% - 6rem));
  height: fit-content;
  position: absolute;
  bottom: 0;
  left: 3rem;
  right: 3rem;
  margin: auto;
}
.toast {
  background-color: rgba(0, 0, 0, 0.7);
  outline: 1px solid #efefef;
  color: white;
  padding: 16px;
}
</style>
