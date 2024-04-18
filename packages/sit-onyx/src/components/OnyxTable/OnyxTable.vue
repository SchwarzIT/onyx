<script lang="ts" setup>
import type { OnyxTableProps } from "./types";

defineProps<OnyxTableProps>();
</script>

<template>
  <table class="onyx-table">
    <slot></slot>
  </table>
</template>

<style lang="scss">
@use "../../styles/mixins/density.scss";
@use "../../styles/mixins/layers";

.onyx-table {
  @include density.compact {
    // TODO: define variables
  }
  @include density.default {
    // TODO: define variables
  }
  @include density.cozy {
    // TODO: define variables
  }

  @include layers.component() {
    // TODO: style the table
  }
}
</style>
