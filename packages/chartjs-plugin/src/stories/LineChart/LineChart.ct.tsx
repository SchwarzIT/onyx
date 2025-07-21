import { test } from "@playwright/experimental-ct-vue";
import { executeChartScreenshotTest } from "../playwright-utils.js";
import LineChart from "./LineChart.vue";

test("should render line chart", async ({ mount, page }) => {
  const component = await mount(LineChart);
  await executeChartScreenshotTest(page, component, "line");
});
