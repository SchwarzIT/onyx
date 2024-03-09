<script lang="ts" setup>
import { Bar } from "vue-chartjs";

const data = {
  labels: ["January", "February", "March"],
  datasets: [{ data: [40, 20, 12] }],
};

const options = { responsive: true, maintainAspectRatio: false };
</script>

<template>
  <Bar :data="data" :options="options" class="chart" />
</template>

<style lang="scss" scoped>
.chart {
  height: 32rem;
}
</style>
