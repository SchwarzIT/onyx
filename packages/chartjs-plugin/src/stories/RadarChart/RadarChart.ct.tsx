import { test } from "@playwright/experimental-ct-vue";
import { executeChartScreenshotTest } from "../playwright-utils";
import RadarChart from "./RadarChart.vue";

test("should render radar chart", async ({ mount, page }) => {
  const component = await mount(RadarChart);
  await executeChartScreenshotTest(page, component, "radar");
});
