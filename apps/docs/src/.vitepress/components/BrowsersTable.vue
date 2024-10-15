<script lang="ts" setup>
import OnyxTable from "~components/OnyxTable/OnyxTable.vue";
import type { Browser } from "../browser-loader.data";

defineProps<{
  browsers: Browser[];
}>();
</script>

<template>
  <OnyxTable>
    <template #head>
      <tr>
        <th>Name</th>
        <th>Version</th>
        <th>Coverage</th>
      </tr>
    </template>
    <tr v-for="b in browsers">
      <td>{{ b.name }} ({{ b.coverage }}%)</td>
      <td>
        <p v-for="(_value, key) in b.versions" :key="key">{{ key }}</p>
      </td>
      <td>
        <p v-for="value in b.versions" :key="value">{{ value }} %</p>
      </td>
    </tr>
  </OnyxTable>
</template>
