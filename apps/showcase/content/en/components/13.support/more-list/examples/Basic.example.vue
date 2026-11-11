<script lang="ts" setup>
import { OnyxBadge, OnyxMoreList } from "sit-onyx";
import BadgeListItem from "./BadgeListItem.vue";
import { EXAMPLE_MORE_LIST_INJECTION_KEY } from "./index.js";
</script>

<template>
  <OnyxMoreList :injection-key="EXAMPLE_MORE_LIST_INJECTION_KEY">
    <template #default="{ attributes }">
      <ul class="list" v-bind="attributes">
        <li v-for="i in 24" :key="i">
          <BadgeListItem :label="`Badge ${i}`" />
        </li>
      </ul>
    </template>

    <template #more="{ attributes, hiddenElements }">
      <div v-bind="attributes">
        <OnyxBadge color="neutral"> +{{ hiddenElements }} more </OnyxBadge>
      </div>
    </template>
  </OnyxMoreList>
</template>

<style lang="scss" scoped>
.list {
  padding: 0;
  list-style: none;
}
</style>
