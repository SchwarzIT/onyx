import { test } from "@playwright/experimental-ct-vue";
import { executeChartScreenshotTest } from "../playwright-utils.js";
import PolarAreaChart from "./PolarAreaChart.vue";

test("should render polar area chart", async ({ mount, page }) => {
  const component = await mount(PolarAreaChart);
  await executeChartScreenshotTest(page, component, "polar-area");
});
