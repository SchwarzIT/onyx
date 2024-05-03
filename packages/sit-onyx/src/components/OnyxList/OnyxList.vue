<script lang="ts" setup>
import { OnyxListProps } from "./types";
import OnyxListItem from "../OnyxListItem/OnyxListItem.vue";

const props = defineProps<OnyxListProps>();
</script>

<template>
  <div class="onyx-list">
    <div class="onyx-list__wrapper">
      <ul class="onyx-list__group">
        <OnyxListItem v-for="item in props.items" :key="item.label" class="onyx-list-item">
          {{ item.label }}
        </OnyxListItem>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";
@use "../../styles/mixins/list";

.onyx-list {
  @include layers.component() {
    @include list.styles();
  }
}
</style>
