<script lang="ts" setup></script>

<template>
  <section class="page-loader">
    <h3>Page loader overlay</h3>

    <slot></slot>
  </section>
</template>

<style lang="scss" scoped>
.page-loader {
  background-color: rgba(212, 212, 212, 0.78);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
