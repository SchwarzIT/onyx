import { test } from "@playwright/experimental-ct-vue";
import { executeChartScreenshotTest } from "../playwright-utils";
import BubbleChart from "./BubbleChart.vue";

test("should render bubble chart", async ({ mount, page }) => {
  const component = await mount(BubbleChart);
  await executeChartScreenshotTest(page, component, "bubble");
});
