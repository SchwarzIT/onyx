<script lang="ts" setup></script>

<template>
  <div class="sticky-content">Sticky content. Example: Breadcrumb bar, Table header, Headlines</div>
</template>

<style lang="scss" scoped>
.sticky-content {
  position: sticky;
  top: 0;
  z-index: var(--onyx-z-index-sticky-content);
  border: 1px solid #eee;
  background-color: #f9f9f9;
  padding: 24px;
}
</style>
