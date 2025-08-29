<script lang="ts" setup>
import {
  createFeature,
  DataGridFeatures,
  OnyxBadge,
  type ColumnConfig,
  type ColumnGroupConfig,
  type TypeRenderMap,
} from "sit-onyx";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

type SystemEntry = {
  id: number;
  component_name: string;
  status: string;
  last_check_at: Date;
  metric_name: string;
  value: number;
  unit: string;
  description: string;
};

const systemData = ref<SystemEntry[]>([
  {
    id: 1,
    component_name: "Webserver-A",
    status: "running",
    last_check_at: new Date("2023-01-28T10:00:00Z"),
    metric_name: "CPU_usage",
    value: 15.5,
    unit: "percent",
    description: "Standard logging level.",
  },
  {
    id: 2,
    component_name: "DB-1",
    status: "degraded",
    last_check_at: new Date("2024-02-28T10:05:00Z"),
    metric_name: "connection_pool_size",
    value: 90,
    unit: "connections",
    description: "Maximum database connections.",
  },
  {
    id: 3,
    component_name: "API-Gateway",
    status: "running",
    last_check_at: new Date("2025-08-28T10:10:00Z"),
    metric_name: "request_latency",
    value: 50.2,
    unit: "ms",
    description: "API request timeout.",
  },
  {
    id: 4,
    component_name: "Webserver-A",
    status: "pending",
    last_check_at: new Date("2025-08-28T10:15:00Z"),
    metric_name: "memory_available",
    value: 512,
    unit: "MB",
    description: "Cache time-to-live in seconds.",
  },
]);

const systemColumns: ColumnConfig<
  SystemEntry,
  ColumnGroupConfig,
  keyof ReturnType<typeof systemCustomType>["typeRenderer"]
>[] = [
  { key: "component_name", label: t("dataGrid.systemTable.component_name") },
  { key: "status", label: t("dataGrid.systemTable.status"), type: "status" },
  { key: "last_check_at", label: t("dataGrid.systemTable.last_check_at"), type: "date" },
  { key: "metric_name", label: t("dataGrid.systemTable.metric_name") },
  { key: "value", label: t("dataGrid.systemTable.value") },
  { key: "unit", label: t("dataGrid.systemTable.unit") },
  { key: "description", label: t("dataGrid.systemTable.description") },
];
const systemCustomType = createFeature(() => ({
  name: Symbol("System Types"),
  typeRenderer: {
    status: DataGridFeatures.createTypeRenderer({
      cell: {
        component: ({ modelValue }) => {
          return h(
            OnyxBadge,
            {
              color:
                modelValue === "running"
                  ? "success"
                  : modelValue === "pending"
                    ? "warning"
                    : "danger",
            },
            modelValue?.toString(),
          );
        },
      },
    }),
  } satisfies TypeRenderMap<SystemEntry>,
}));

const systemSorting = DataGridFeatures.useSorting<SystemEntry>({
  columns: {
    unit: { enabled: false },
    description: { enabled: false },
    last_check_at: { sortFunc: (a, b) => a.getTime() - b.getTime() },
  },
});
const systemResizing = DataGridFeatures.useResizing<SystemEntry>();
const systemFeatures = [systemCustomType, systemSorting, systemResizing];
</script>

<template>
  <OnyxDataGrid :columns="systemColumns" :data="systemData" :features="systemFeatures" />
</template>

<style lang="scss" scoped></style>
