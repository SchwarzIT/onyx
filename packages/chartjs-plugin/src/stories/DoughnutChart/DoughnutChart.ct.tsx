import { test } from "@playwright/experimental-ct-vue";
import { executeChartScreenshotTest } from "../playwright-utils.js";
import DoughnutChart from "./DoughnutChart.vue";

test("should render doughnut chart", async ({ mount, page }) => {
  const component = await mount(DoughnutChart);
  await executeChartScreenshotTest(page, component, "doughnut");
});
