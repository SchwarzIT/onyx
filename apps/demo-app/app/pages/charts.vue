<script lang="ts" setup>
import { registerOnyxPlugin } from "@sit-onyx/chartjs-plugin";
import { iconArrowSmallDown, iconArrowSmallRight, iconArrowSmallUp } from "@sit-onyx/icons";
import type { ChartData } from "chart.js";
import { Chart, registerables } from "chart.js";
import { OnyxHeadline } from "sit-onyx";
import { Bar, Line, Pie } from "vue-chartjs";
import { useI18n } from "vue-i18n";

Chart.register(...registerables);
registerOnyxPlugin(Chart);

const { t } = useI18n();

/**
 * Charts
 */

const barChartData: ChartData<"bar"> = {
  labels: ["01.01.2024", "01.02.2024", "01.03.2024", "01.04.2024", "01.05.2024"],
  datasets: [
    {
      label: t("charts.productLines.a"),
      data: [15000, 18000, 16500, 20000, 19500],
      borderWidth: 2,
    },
    {
      label: t("charts.productLines.b"),
      data: [12000, 13500, 14000, 11800, 15200],
      borderWidth: 2,
    },
  ],
};
const pieChartData: ChartData<"pie"> = {
  labels: [
    t("charts.customerSegments.enterprise"),
    t("charts.customerSegments.mid-sized"),
    t("charts.customerSegments.small"),
    t("charts.customerSegments.private"),
  ],
  datasets: [{ data: [55, 25, 15, 5] }],
};
const lineChartData: ChartData<"line"> = {
  labels: ["01.01.2025", "01.02.2025", "01.03.2025", "01.04.2025", "01.05.2025"],
  datasets: [
    {
      label: t("charts.metrics.revenue"),
      fill: true,
      data: [150, 165, 180, 200, 215],
    },
    {
      label: t("charts.metrics.netProfit"),
      fill: true,
      data: [25, 30, 32, 38, 102],
    },
  ],
};

/**
 * Select
 */

const options = [
  {
    value: "all",
    label: t("charts.selectOptions.all"),
  },
  {
    value: "products",
    label: t("charts.selectOptions.products"),
  },
  {
    value: "services",
    label: t("charts.selectOptions.services"),
  },
];
const chartOptions = { maintainAspectRatio: false };
</script>

<template>
  <OnyxHeadline is="h1">{{ t("charts.pageName") }}</OnyxHeadline>

  <OnyxHeadline is="h3" class="headline">{{ t("charts.rangeAndType") }}</OnyxHeadline>
  <OnyxForm>
    <OnyxDatePicker :label="t('charts.range')" />
    <OnyxSelect
      :label="t('charts.type')"
      list-label="List label"
      :options="options"
      placeholder="Placeholder..."
    />
    <OnyxButton :label="t('charts.submit')" type="submit" />
  </OnyxForm>
  <OnyxHeadline is="h2" class="headline">{{ t("charts.kpi.title") }}</OnyxHeadline>
  <div class="onyx-grid">
    <KPICard
      class="onyx-grid-span-3"
      :headline="t('charts.kpi.roi')"
      color="success"
      :value="100"
      :percent="3.8"
      :icon="iconArrowSmallUp"
    />
    <KPICard
      class="onyx-grid-span-3"
      :headline="t('charts.kpi.clv')"
      color="danger"
      :value="0.8"
      :percent="4.3"
      :icon="iconArrowSmallDown"
    />
  </div>

  <OnyxHeadline is="h2" class="headline">{{ t("charts.trends") }}</OnyxHeadline>
  <div class="onyx-grid">
    <div class="onyx-grid-span-4 onyx-grid-md-span-6 chart-wrapper">
      <OnyxCard class="chart chart--bar">
        <OnyxHeadline is="h3" class="chart__headline"
          >{{ t("charts.productLines.title") }}
          <OnyxButton
            type="button"
            color="neutral"
            :icon="iconArrowSmallRight"
            :label="t('charts.fullStats')"
          />
        </OnyxHeadline>

        <div class="chart">
          <Bar :data="barChartData" :options="chartOptions" />
        </div>
      </OnyxCard>
    </div>
    <div class="onyx-grid-span-4 onyx-grid-md-span-6 chart-wrapper">
      <OnyxCard class="card--pie">
        <OnyxHeadline is="h3" class="chart__headline"
          >{{ t("charts.customerDistribution") }}
          <OnyxButton
            type="button"
            color="neutral"
            :icon="iconArrowSmallRight"
            :label="t('charts.fullStats')"
          />
        </OnyxHeadline>

        <div class="chart">
          <Pie :data="pieChartData" :options="chartOptions" class="chart--pie" />
        </div>
      </OnyxCard>

      <OnyxCard class="card--line">
        <OnyxHeadline is="h3" class="chart__headline">
          {{ t("charts.revenue") }}
          <OnyxButton
            type="button"
            color="neutral"
            :icon="iconArrowSmallRight"
            :label="t('charts.fullStats')"
          />
        </OnyxHeadline>
        <div class="chart">
          <Line :data="lineChartData" :options="chartOptions" class="chart--line" />
        </div>
      </OnyxCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.headline {
  margin-top: var(--onyx-density-xl);
  margin-bottom: var(--onyx-density-sm);
}
.content {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-grid-gutter);
}
.onyx-form {
  display: flex;
  gap: var(--onyx-density-md);
  align-items: end;
}
.chart {
  height: 50%;
  flex-grow: 1;
  &-wrapper {
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    gap: var(--onyx-grid-gutter);
  }
  &__headline {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.card {
  &--line,
  &--pie {
    height: calc(50% - var(--onyx-grid-gutter) / 2);
  }
}
</style>
