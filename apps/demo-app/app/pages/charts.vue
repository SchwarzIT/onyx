<script lang="ts" setup>
import { registerOnyxPlugin } from "@sit-onyx/chartjs-plugin";
import { iconArrowSmallDown, iconArrowSmallUp } from "@sit-onyx/icons";
import { Chart, registerables } from "chart.js";
import { OnyxHeadline } from "sit-onyx";
import { useI18n } from "vue-i18n";

Chart.register(...registerables);
registerOnyxPlugin(Chart);

const { t } = useI18n();

const selectOptions = computed(() => [
  { value: "all", label: t("charts.selectOptions.all") },
  { value: "products", label: t("charts.selectOptions.products") },
  { value: "services", label: t("charts.selectOptions.services") },
]);
</script>

<template>
  <OnyxHeadline is="h1">{{ t("charts.pageName") }}</OnyxHeadline>
  <OnyxHeadline is="h3" class="headline">{{ t("charts.rangeAndType") }}</OnyxHeadline>

  <OnyxForm class="form onyx-grid" @submit.prevent>
    <OnyxDatePicker class="onyx-grid-span-4 onyx-grid-lg-span-3" :label="t('charts.range')" />
    <OnyxSelect
      class="onyx-grid-span-4 onyx-grid-lg-span-3"
      :label="t('charts.type')"
      :list-label="t('charts.type')"
      :options="selectOptions"
      :placeholder="t('charts.selectOptions.placeholder')"
    />
    <OnyxButton class="onyx-grid-span-4" :label="t('charts.submit')" type="submit" />
  </OnyxForm>

  <OnyxHeadline is="h2" class="headline">{{ t("charts.kpi.title") }}</OnyxHeadline>
  <div class="onyx-grid">
    <KPICard
      class="onyx-grid-span-4 onyx-grid-lg-span-3"
      :headline="t('charts.kpi.roi')"
      color="success"
      :value="100"
      :percent="3.8"
      :icon="iconArrowSmallUp"
    />
    <KPICard
      class="onyx-grid-span-4 onyx-grid-lg-span-3"
      :headline="t('charts.kpi.clv')"
      color="danger"
      :value="0.8"
      :percent="4.3"
      :icon="iconArrowSmallDown"
    />
  </div>

  <OnyxHeadline is="h2" class="headline">{{ t("charts.trends") }}</OnyxHeadline>
  <div class="onyx-grid">
    <div
      class="onyx-grid-span-8 onyx-grid-md-span-6 onyx-grid-lg-span-6 onyx-grid-xl-span-6 chart-wrapper"
    >
      <ChartCard :headline="$t('charts.productLines.title')" class="chart">
        <BarChart />
      </ChartCard>
    </div>
    <div
      class="onyx-grid-span-8 onyx-grid-md-span-6 onyx-grid-lg-span-6 onyx-grid-xl-span-6 chart-wrapper"
    >
      <ChartCard :headline="$t('charts.customerDistribution')" class="chart chart__pie">
        <PieChart />
      </ChartCard>

      <ChartCard :headline="$t('charts.revenue')" class="chart chart__line">
        <LineChart />
      </ChartCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.headline {
  margin-top: var(--onyx-grid-gutter);
  margin-bottom: var(--onyx-density-sm);
}

.form {
  align-items: end;
}

.chart-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-grid-gutter);
  height: 40rem;
}

.chart {
  &__line,
  &__pie {
    height: calc(50% - var(--onyx-grid-gutter) / 2);
  }
}
</style>
