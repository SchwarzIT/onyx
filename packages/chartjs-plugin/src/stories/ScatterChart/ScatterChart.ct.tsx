import { test } from "@playwright/experimental-ct-vue";
import { executeChartScreenshotTest } from "../playwright-utils.js";
import ScatterChart from "./ScatterChart.vue";

test("should render scatter chart", async ({ mount, page }) => {
  const component = await mount(ScatterChart);
  await executeChartScreenshotTest(page, component, "scatter");
});
