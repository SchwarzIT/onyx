import { DENSITIES } from "../../../composables/density";
import { test } from "../../../playwright/a11y";
import { executeMatrixScreenshotTest } from "../../../playwright/screenshots";
import DefaultTestWrapper from "./playwright/DefaultTestWrapper.vue";
import GroupedDataTestWrapper from "./playwright/GroupedDataTestWrapper.vue";

// TODO: remove when contrast issues are fixed in https://github.com/SchwarzIT/onyx/issues/410
const disabledAccessibilityRules = ["color-contrast"];

test.describe("Screenshot tests", () => {
  executeMatrixScreenshotTest({
    name: "Data grid renderer",
    columns: DENSITIES,
    rows: ["default"],
    disabledAccessibilityRules,
    component: (column) => <DefaultTestWrapper density={column} />,
  });
});

test.describe("Screenshot tests (grouped data)", () => {
  executeMatrixScreenshotTest({
    name: "Data grid renderer (grouped data)",
    columns: ["default"],
    rows: ["default", "row-hover", "column-hover"],
    disabledAccessibilityRules,
    component: (column) => <GroupedDataTestWrapper density={column} />,
    beforeScreenshot: async (component, page, column, row) => {
      if (row === "row-hover") {
        await component.getByText("Row 1, cell 2").hover();
      }
      if (row === "column-hover") {
        await component.getByRole("columnheader", { name: "Column 3" }).hover();
      }
    },
  });
});
