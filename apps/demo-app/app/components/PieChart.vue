<script lang="ts" setup>
import type { ChartData, ChartOptions } from "chart.js";
import { Pie } from "vue-chartjs";

const { t } = useI18n();

const data = computed<ChartData<"pie">>(() => {
  return {
    labels: [
      t("charts.customerSegments.enterprise"),
      t("charts.customerSegments.mid-sized"),
      t("charts.customerSegments.small"),
      t("charts.customerSegments.private"),
    ],
    datasets: [{ data: [55, 25, 15, 5] }],
  };
});

const options: ChartOptions<"pie"> = { maintainAspectRatio: false };
</script>

<template>
  <div class="chart">
    <ClientOnly>
      <Pie :data :options />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.chart {
  height: 50%;
  flex-grow: 1;
}
</style>
