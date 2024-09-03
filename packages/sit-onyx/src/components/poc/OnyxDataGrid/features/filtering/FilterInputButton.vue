<script setup lang="ts">
import { ref } from "vue";
import OnyxIcon from "../../../../OnyxIcon/OnyxIcon.vue";
import search from "@sit-onyx/icons/search.svg?raw";
import searchX from "@sit-onyx/icons/search-x.svg?raw";
import OnyxInput from "../../../../OnyxInput/OnyxInput.vue";

const props = defineProps<{ isFiltering?: boolean }>();

const emit = defineEmits<{
  filter: [searchTerm: string];
  reset: [];
}>();

const searchTerm = ref("");
const showInput = ref(false);
</script>
<template>
  <button v-if="props.isFiltering" type="button" @click="emit('reset')">
    <OnyxIcon :icon="searchX" size="12px" />
  </button>
  <button v-else-if="!showInput" type="button" @click="showInput = true">
    <OnyxIcon :icon="search" size="12px" />
  </button>
  <form v-else @submit="emit('filter', searchTerm)">
    <OnyxInput v-model="searchTerm" :label="'search'" />
  </form>
</template>
