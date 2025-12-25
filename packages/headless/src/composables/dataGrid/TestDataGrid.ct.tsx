import { test } from "@playwright/experimental-ct-vue";
import { dataGridTesting } from "./createDataGrid.testing.js";
import TestDataGrid from "./TestDataGrid.vue";
import TestLazyDataGrid from "./TestLazyDataGrid.vue";

test("data-grid", async ({ mount, page }) => {
  await mount(<TestDataGrid />);

  const grid = page.getByRole("grid");
  const rows = page.getByRole("row");

  await dataGridTesting(page, grid, rows);
});

test("data-grid lazy", async ({ mount, page }) => {
  await mount(<TestLazyDataGrid />);

  const grid = page.getByRole("grid");
  const rows = page.getByRole("row");

  await dataGridTesting(page, grid, rows);
});
