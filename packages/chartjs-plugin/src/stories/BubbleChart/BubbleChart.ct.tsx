import { test } from "@playwright/experimental-ct-vue";
import { executeChartScreenshotTest } from "../playwright-utils.js";
import BubbleChart from "./BubbleChart.vue";

test("should render bubble chart", async ({ mount, page }) => {
  const component = await mount(BubbleChart);
  await executeChartScreenshotTest(page, component, "bubble");
});
