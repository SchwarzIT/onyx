import { DENSITIES } from "../../../composables/density";
import { test } from "../../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../../playwright/screenshots";
import DefaultTestWrapper from "./playwright/DefaultTestWrapper.ct.vue";
import GroupedDataTestWrapper from "./playwright/GroupedDataTestWrapper.ct.vue";

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Data grid renderer",
    columns: DENSITIES,
    rows: ["default"],
    component: (column) => <DefaultTestWrapper density={column} />,
  });
});

test.describe("Screenshot tests (grouped data)", () => {
  executeMatrixScreenshotTest({
    name: "Data grid renderer (grouped data)",
    columns: ["default"],
    rows: ["default", "row-hover", "column-hover"],
    component: (column) => <GroupedDataTestWrapper density={column} />,
    hooks: {
      beforeEach: async (component, page, column, row) => {
        if (row === "row-hover") {
          await component.getByText("Row 1, cell 2").hover();
        }
        if (row === "column-hover") {
          await component.getByRole("columnheader", { name: "Column 3" }).hover();
        }
      },
    },
  });
});
