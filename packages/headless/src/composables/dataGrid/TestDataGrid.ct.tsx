import { test } from "@playwright/experimental-ct-vue";
import TestDataGrid from "./TestDataGrid.vue";
import { dataGridTesting } from "./createDataGrid.testing.js";

test("data-grid", async ({ mount, page }) => {
  await mount(<TestDataGrid />);

  const grid = page.getByRole("grid");
  const rows = page.getByRole("row");

  await dataGridTesting(page, grid, rows);
});
