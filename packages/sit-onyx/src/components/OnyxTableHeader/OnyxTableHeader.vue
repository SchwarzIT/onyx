<script lang="ts" setup>
import OnyxSortButton from "../OnyxSortButton/OnyxSortButton.vue";
import type { SortValue } from "../OnyxSortButton/types";
import type { OnyxTableHeaderProps } from "./types";

const props = defineProps<OnyxTableHeaderProps>();

const emit = defineEmits<{
  /**
   * Emitted when the current sort changes.
   * Requires `sortable` property to be enabled.
   */
  "update:sort": [value?: SortValue];
}>();

defineSlots<{
  /**
   * Table header content.
   */
  default(): unknown;
}>();
</script>

<template>
  <th class="onyx-table-header" scope="col">
    <div class="onyx-table-header__content">
      <slot></slot>

      <OnyxSortButton
        v-if="props.sortable"
        class="onyx-table-header__sort"
        :class="{ 'onyx-table-header__sort--default': !props.sort }"
        :model-value="props.sort"
        property="test"
        @update:model-value="emit('update:sort', $event)"
      />
    </div>
  </th>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-table-header {
  @include layers.component() {
    &__content {
      display: flex;
      align-items: center;
      width: 100%;
    }

    &__sort {
      margin-left: auto;
    }

    &:not(:hover) {
      .onyx-table-header__sort--default {
        display: none;
      }
    }
  }
}
</style>
