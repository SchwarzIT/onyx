<script lang="ts" setup>
import { iconXSmall } from "@sit-onyx/icons";
import { ref } from "vue";
import OnyxBadge from "../OnyxBadge.vue";
const selected = ref(false);
</script>

<template>
  <OnyxBadge
    :clickable="{
      label: 'Toggle Selected',
      selected,
      actionIcon: selected ? iconXSmall : undefined,
    }"
    @click="selected = !selected"
  >
    {{ selected ? "Selected" : "Deselected" }}
  </OnyxBadge>
</template>
