<script lang="ts" setup>
import { ref } from "vue";
import OnyxBadge from "../OnyxBadge.vue";
const selected = ref(false);
</script>

<template>
  <OnyxBadge
    :clickable="selected ? 'Select' : 'Deselect'"
    :selected="selected"
    @click="selected = !selected"
  >
    {{ selected ? "Selected" : "Deselected" }}
  </OnyxBadge>
</template>
