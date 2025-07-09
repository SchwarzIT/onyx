import { test } from "@playwright/experimental-ct-vue";
import { executeChartScreenshotTest } from "../playwright-utils.js";
import PieChart from "./PieChart.vue";

test("should render pie chart", async ({ mount, page }) => {
  const component = await mount(PieChart);
  await executeChartScreenshotTest(page, component, "pie");
});
