import { test } from "@playwright/experimental-ct-vue";
import { executeChartScreenshotTest } from "../playwright-utils.js";
import BarChart from "./BarChart.vue";

test("should render bar chart", async ({ mount, page }) => {
  const component = await mount(BarChart);
  await executeChartScreenshotTest(page, component, "bar");
});
