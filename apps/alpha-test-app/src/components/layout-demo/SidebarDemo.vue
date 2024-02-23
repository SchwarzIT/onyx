<script lang="ts" setup>
import { defineModel } from "vue";

const showSideBar = defineModel<boolean>();
</script>

<template>
  <div v-if="showSideBar" class="demo side-bar">
    <h3>Sidebar</h3>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped></style>
